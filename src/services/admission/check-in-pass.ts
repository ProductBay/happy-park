import { getHappyParkDb } from "@/lib/db/happy-park-db";
import {
  databaseDateToDateString,
  getJamaicaDateString,
} from "@/lib/booking/jamaica-date";
import { evaluateAdmissionPolicy } from "@/lib/booking/admission-policy";
import { credentialLookupHash } from "@/services/admission/admission-service";
import { admissionResult } from "@/services/admission/admission-result";
import type { AdmissionScanResult } from "@/types/admission";

export type TransactionalCheckInInput = {
  credential: string;
  staffId?: string;
  staffName?: string;
  gate?: string;
  deviceId?: string;
};

export async function checkInAdmissionPass(
  input: TransactionalCheckInInput,
): Promise<AdmissionScanResult> {
  const db = getHappyParkDb();

  const credentialHash =
    credentialLookupHash(input.credential);

  return db.transaction(async (tx) => {
    const pass =
      await tx.orm.public.BookingPass.first({
        qrTokenHash: credentialHash,
      });

    if (!pass) {
      return admissionResult("invalid");
    }

    const booking =
      await tx.orm.public.Booking.first({
        id: pass.bookingId,
      });

    if (!booking) {
      return admissionResult("invalid");
    }

    const decision = evaluateAdmissionPolicy({
      bookingStatus: booking.status,
      passStatus: pass.status,
      visitDate:
        databaseDateToDateString(
          pass.validDate,
        ),
      today: getJamaicaDateString(),
    });

    if (!decision.accepted) {
      const rejectedStatus =
        decision.outcome === "already_used"
          ? "already_used"
          : decision.outcome === "revoked"
            ? "revoked"
            : "rejected";

      await tx.orm.public.CheckIn.create({
        passId: pass.id,
        bookingId: booking.id,
        status: rejectedStatus,
        gate: input.gate,
        deviceId: input.deviceId,
        checkedInById: input.staffId,
        checkedInByName: input.staffName,
        reason: decision.outcome,
      });

      return admissionResult(
        decision.outcome,
        {
          passNumber: pass.passNumber,
          bookingReference:
            booking.reference,
        },
      );
    }

    const now = new Date();

    /*
     * Re-read the pass as Active immediately
     * before attempting the state transition.
     */
    const activePass =
      await tx.orm.public.BookingPass.first({
        id: pass.id,
        status: "active",
      });

    if (!activePass) {
      await tx.orm.public.CheckIn.create({
        passId: pass.id,
        bookingId: booking.id,
        status: "already_used",
        gate: input.gate,
        deviceId: input.deviceId,
        checkedInById: input.staffId,
        checkedInByName: input.staffName,
        reason:
          "concurrent_or_duplicate_scan",
      });

      return admissionResult(
        "already_used",
        {
          passNumber: pass.passNumber,
          bookingReference:
            booking.reference,
        },
      );
    }

    await tx.orm.public.BookingPass
      .where({
        id: pass.id,
        status: "active",
      })
      .update({
        status: "used",
        firstUsedAt: now,
      });

    await tx.orm.public.CheckIn.create({
      passId: pass.id,
      bookingId: booking.id,
      status: "accepted",
      scannedAt: now,
      gate: input.gate,
      deviceId: input.deviceId,
      checkedInById: input.staffId,
      checkedInByName: input.staffName,
      reason: "admission_accepted",
    });

    const remainingActivePasses =
      await tx.orm.public.BookingPass
        .where({
          bookingId: booking.id,
          status: "active",
        })
        .all();

    await tx.orm.public.Booking
      .where({
        id: booking.id,
      })
      .update({
        status:
          remainingActivePasses.length === 0
            ? "checked_in"
            : "partially_checked_in",
      });

    return admissionResult(
      "accepted",
      {
        passNumber: pass.passNumber,
        bookingReference:
          booking.reference,
      },
    );
  });
}
