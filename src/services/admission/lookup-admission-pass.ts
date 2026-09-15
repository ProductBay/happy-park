import { evaluateAdmissionPolicy } from "@/lib/booking/admission-policy";
import {
  databaseDateToDateString,
  getJamaicaDateString,
} from "@/lib/booking/jamaica-date";
import { getHappyParkDb } from "@/lib/db/happy-park-db";
import type {
  AdmissionLookupOutcome,
  AdmissionPassLookup,
} from "@/types/admission-lookup";

export async function lookupAdmissionPass(
  passNumber: string,
): Promise<AdmissionPassLookup> {
  const db = getHappyParkDb();

  const pass =
    await db.orm.public.BookingPass.first({
      passNumber,
    });

  if (!pass) {
    return {
      outcome: "not_found",
      eligible: false,
    };
  }

  const booking =
    await db.orm.public.Booking.first({
      id: pass.bookingId,
    });

  if (!booking) {
    return {
      outcome: "not_found",
      eligible: false,
    };
  }

  const visitDate =
    databaseDateToDateString(pass.validDate);

  const decision = evaluateAdmissionPolicy({
    bookingStatus: booking.status,
    passStatus: pass.status,
    visitDate,
    today: getJamaicaDateString(),
  });

  const outcome: AdmissionLookupOutcome =
    decision.accepted
      ? "ready"
      : decision.outcome;

  const customerName = [
    booking.customerFirstName,
    booking.customerLastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return {
    outcome,
    eligible: decision.accepted,
    pass: {
      passNumber: pass.passNumber,
      guestType: pass.guestType,
      status: pass.status,
      validDate: visitDate,
      firstUsedAt: pass.firstUsedAt
        ? new Date(pass.firstUsedAt).toISOString()
        : null,
    },
    booking: {
      reference: booking.reference,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      customerName:
        customerName.length > 0
          ? customerName
          : null,
      visitDate:
        databaseDateToDateString(
          booking.visitDate,
        ),
    },
  };
}
