import {
  getHappyParkDb,
} from "@/lib/db/happy-park-db";
import {
  databaseDateToDateString,
} from "@/lib/booking/jamaica-date";
import {
  hashAdmissionAccessToken,
  isAdmissionAccessTokenFormat,
} from "@/lib/security/admission-access-token";
import {
  decryptPassCredential,
} from "@/lib/security/pass-credential-encryption";

import type {
  SecureCustomerAdmissionBooking,
} from "@/types/secure-customer-admission";

export async function getCustomerAdmissionPasses(
  accessToken: string,
): Promise<SecureCustomerAdmissionBooking | null> {
  if (
    !isAdmissionAccessTokenFormat(
      accessToken,
    )
  ) {
    return null;
  }

  const db = getHappyParkDb();

  const tokenHash =
    hashAdmissionAccessToken(
      accessToken,
    );

  const access =
    await db.orm.public.BookingPassAccess.first(
      {
        tokenHash,
      },
    );

  if (!access) {
    return null;
  }

  if (access.revokedAt) {
    return null;
  }

  const now = new Date();

  if (
    new Date(access.expiresAt) <= now
  ) {
    return null;
  }

  const booking =
    await db.orm.public.Booking.first({
      id: access.bookingId,
    });

  if (!booking) {
    return null;
  }

  if (
    booking.status !== "confirmed" &&
    booking.status !==
      "partially_checked_in" &&
    booking.status !== "checked_in"
  ) {
    return null;
  }

  if (
    booking.paymentStatus !== "paid"
  ) {
    return null;
  }

  const passes =
    await db.orm.public.BookingPass
      .where({
        bookingId: booking.id,
      })
      .all();

  const credentials =
    await db.orm.public.BookingPassCredential.all();

  const credentialByPassId =
    new Map(
      credentials.map(
        (credential) => [
          credential.passId,
          credential,
        ],
      ),
    );

  const securePasses =
    passes
      .sort(
        (a, b) =>
          a.sequenceNumber -
          b.sequenceNumber,
      )
      .map((pass) => {
        const credential =
          credentialByPassId.get(
            pass.id,
          );

        if (!credential) {
          throw new Error(
            `Encrypted credential missing for pass ${pass.passNumber}.`,
          );
        }

        return {
          id: pass.id,
          passNumber:
            pass.passNumber,
          credential:
            decryptPassCredential(
              {
                ciphertext:
                  credential.encryptedCredential,
                initializationVector:
                  credential.initializationVector,
                authenticationTag:
                  credential.authenticationTag,
                keyVersion:
                  credential.keyVersion,
              },
            ),
          guestType:
            pass.guestType,
          sequenceNumber:
            pass.sequenceNumber,
          status: pass.status,
          validDate:
            databaseDateToDateString(
              pass.validDate,
            ),
        };
      });

  await db.orm.public.BookingPassAccess
    .where({
      id: access.id,
    })
    .update({
      lastAccessedAt: now,
      accessCount:
        access.accessCount + 1,
    });

  return {
    reference:
      booking.reference,
    visitDate:
      databaseDateToDateString(
        booking.visitDate,
      ),
    customerName:
      `${booking.customerFirstName} ${booking.customerLastName}`.trim(),
    location:
      "Southfield, St. Elizabeth",
    passes: securePasses,
  };
}
