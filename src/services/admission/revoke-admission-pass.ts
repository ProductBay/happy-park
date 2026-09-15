import {
  getHappyParkDb,
} from "@/lib/db/happy-park-db";

import type {
  RevokeAdmissionPassInput,
} from "@/lib/validation/pass-security";

export async function revokeAdmissionPass(
  input: RevokeAdmissionPassInput,
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
          "A used admission pass cannot be revoked.",
        );
      }

      if (
        pass.status ===
        "cancelled"
      ) {
        throw new Error(
          "This pass is already cancelled.",
        );
      }

      if (
        pass.status ===
        "expired"
      ) {
        throw new Error(
          "This pass has already expired.",
        );
      }

      if (
        pass.status ===
        "revoked"
      ) {
        throw new Error(
          "This admission pass is already revoked.",
        );
      }

      const now =
        new Date();

      await tx.orm.public.BookingPass
        .where({
          id: pass.id,
        })
        .update({
          status: "revoked",
          revokedAt: now,
          revokeReason:
            input.reason,
        });

      await tx.orm.public.BookingPassSecurityEvent.create(
        {
          passId: pass.id,
          bookingId:
            pass.bookingId,
          action: "revoked",
          previousVersion:
            pass.tokenVersion,
          newVersion:
            pass.tokenVersion,
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
        tokenVersion:
          pass.tokenVersion,
        status:
          "revoked" as const,
      };
    },
  );
}
