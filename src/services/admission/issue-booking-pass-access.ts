import { addDays } from "date-fns";

import { getHappyParkDb } from "@/lib/db/happy-park-db";
import { createAdmissionAccessToken } from "@/lib/security/admission-access-token";
import {
  decryptAdmissionAccessToken,
  encryptAdmissionAccessToken,
} from "@/lib/security/admission-access-encryption";

export type BookingPassAccessResult = {
  token: string;
  expiresAt: string;
  reused: boolean;
};

export async function issueBookingPassAccess(
  bookingId: string,
): Promise<BookingPassAccessResult> {
  const db = getHappyParkDb();

  return db.transaction(async (tx) => {
    const booking =
      await tx.orm.public.Booking.first({
        id: bookingId,
      });

    if (!booking) {
      throw new Error(
        "Booking not found.",
      );
    }

    if (
      booking.status !== "confirmed" &&
      booking.status !== "partially_checked_in" &&
      booking.status !== "checked_in" &&
      booking.status !== "completed"
    ) {
      throw new Error(
        "Admission access can only be issued for a confirmed booking.",
      );
    }

    if (booking.paymentStatus !== "paid") {
      throw new Error(
        "Admission access can only be issued for a paid booking.",
      );
    }

    const existingAccessRows =
      await tx.orm.public.BookingPassAccess
        .where({
          bookingId,
        })
        .all();

    const now = new Date();

    const activeAccess =
      existingAccessRows
        .filter((row) => {
          return (
            !row.revokedAt &&
            new Date(row.expiresAt) > now
          );
        })
        .sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );
        })[0];

    if (activeAccess) {
      const secret =
        await tx.orm.public.BookingPassAccessSecret.first({
          accessId: activeAccess.id,
        });

      if (secret) {
        const token =
          decryptAdmissionAccessToken({
            ciphertext:
              secret.encryptedToken,
            initializationVector:
              secret.initializationVector,
            authenticationTag:
              secret.authenticationTag,
            keyVersion:
              secret.keyVersion,
          });

        return {
          token,
          expiresAt:
            new Date(
              activeAccess.expiresAt,
            ).toISOString(),
          reused: true,
        };
      }

      await tx.orm.public.BookingPassAccess
        .where({
          id: activeAccess.id,
        })
        .update({
          revokedAt: now,
        });
    }

    const {
      token,
      hash,
    } =
      createAdmissionAccessToken();

    const encrypted =
      encryptAdmissionAccessToken(token);

    const expiresAt =
      addDays(
        new Date(
          `${booking.visitDate}T23:59:59-05:00`,
        ),
        30,
      );

    const access =
      await tx.orm.public.BookingPassAccess.create({
        bookingId,
        tokenHash: hash,
        expiresAt,
      });

    await tx.orm.public.BookingPassAccessSecret.create({
      accessId: access.id,
      encryptedToken:
        encrypted.ciphertext,
      initializationVector:
        encrypted.initializationVector,
      authenticationTag:
        encrypted.authenticationTag,
      keyVersion:
        encrypted.keyVersion,
    });

    return {
      token,
      expiresAt:
        expiresAt.toISOString(),
      reused: false,
    };
  });
}
