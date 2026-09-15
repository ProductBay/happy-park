import {
  getHappyParkDb,
} from "@/lib/db/happy-park-db";
import {
  encryptPassCredential,
} from "@/lib/security/pass-credential-encryption";
import {
  generateReplacementAdmissionCredential,
} from "@/lib/security/replacement-pass-token";

import type {
  ReissueAdmissionPassInput,
} from "@/lib/validation/pass-security";

export async function reissueAdmissionPass(
  input: ReissueAdmissionPassInput,
) {
  const db = getHappyParkDb();

  return db.transaction(
    async (tx) => {
      const pass =
        await tx.orm.public.BookingPass.first(
          {
            id: input.passId,
          },
        );

      if (!pass) {
        throw new Error(
          "Admission pass not found.",
        );
      }

      if (
        pass.status === "used"
      ) {
        throw new Error(
          "A used admission pass cannot be reissued.",
        );
      }

      if (
        pass.status === "cancelled"
      ) {
        throw new Error(
          "A cancelled admission pass cannot be reissued.",
        );
      }

      if (
        pass.status === "expired"
      ) {
        throw new Error(
          "An expired admission pass cannot be reissued.",
        );
      }

      const booking =
        await tx.orm.public.Booking.first(
          {
            id: pass.bookingId,
          },
        );

      if (!booking) {
        throw new Error(
          "Booking not found for this pass.",
        );
      }

      if (
        booking.status !==
          "confirmed" &&
        booking.status !==
          "partially_checked_in"
      ) {
        throw new Error(
          "This booking is not eligible for pass reissue.",
        );
      }

      if (
        booking.paymentStatus !==
        "paid"
      ) {
        throw new Error(
          "Only paid bookings can receive replacement passes.",
        );
      }

      const previousVersion =
        pass.tokenVersion;

      const newVersion =
        previousVersion + 1;

      const {
        credential,
        hash,
      } =
        generateReplacementAdmissionCredential();

      const encrypted =
        encryptPassCredential(
          credential,
        );

      const existingCredential =
        await tx.orm.public.BookingPassCredential.first(
          {
            passId: pass.id,
          },
        );

      /*
       * Replace the scanner hash first.
       *
       * The previous HP1 credential becomes
       * cryptographically useless immediately
       * because its SHA-256 hash is no longer
       * associated with this pass.
       */
      await tx.orm.public.BookingPass
        .where({
          id: pass.id,
        })
        .update({
          qrTokenHash: hash,
          tokenVersion:
            newVersion,
          status: "active",
          revokedAt: null,
          revokeReason: null,
        });

      if (existingCredential) {
        await tx.orm.public.BookingPassCredential
          .where({
            id:
              existingCredential.id,
          })
          .update({
            encryptedCredential:
              encrypted.ciphertext,
            initializationVector:
              encrypted.initializationVector,
            authenticationTag:
              encrypted.authenticationTag,
            keyVersion:
              encrypted.keyVersion,
          });
      } else {
        await tx.orm.public.BookingPassCredential.create(
          {
            passId: pass.id,
            encryptedCredential:
              encrypted.ciphertext,
            initializationVector:
              encrypted.initializationVector,
            authenticationTag:
              encrypted.authenticationTag,
            keyVersion:
              encrypted.keyVersion,
          },
        );
      }

      await tx.orm.public.BookingPassSecurityEvent.create(
        {
          passId: pass.id,
          bookingId:
            pass.bookingId,
          action: "reissued",
          previousVersion,
          newVersion,
          reason: input.reason,
          performedById:
            input.staffId ?? null,
          performedByName:
            input.staffName ?? null,
          metadata: {
            passNumber:
              pass.passNumber,
            guestType:
              pass.guestType,
          },
        },
      );

      return {
        passId: pass.id,
        passNumber:
          pass.passNumber,
        bookingReference:
          booking.reference,
        tokenVersion:
          newVersion,
        status: "active" as const,
      };
    },
  );
}
