import { getHappyParkDb } from "@/lib/db/happy-park-db";
import type { TrustedPaymentEvent } from "@/lib/validation/payment-webhook";

import { issueBookingAdmissionPasses } from "./issue-booking-passes";
import { issueBookingPassAccess } from "./issue-booking-pass-access";

export type AdmissionFulfillmentResult = {
  bookingId: string;
  bookingReference: string;
  accessToken: string;
  accessExpiresAt: string;
  alreadyCompleted: boolean;
};

export async function fulfillPaidAdmissionBooking(
  event: TrustedPaymentEvent,
): Promise<AdmissionFulfillmentResult> {
  const db = getHappyParkDb();

  const booking =
    await db.orm.public.Booking.first({
      id: event.bookingId,
    });

  if (!booking) {
    throw new Error(
      "Booking not found.",
    );
  }

  if (
    booking.status === "cancelled" ||
    booking.status === "expired" ||
    booking.status === "refunded"
  ) {
    throw new Error(
      `Booking cannot be fulfilled from status "${booking.status}".`,
    );
  }

  if (
    booking.paymentStatus === "refunded" ||
    booking.paymentStatus ===
      "partially_refunded"
  ) {
    throw new Error(
      "Refunded bookings cannot be fulfilled.",
    );
  }

  if (
    event.currency.toUpperCase() !==
    booking.currency.toUpperCase()
  ) {
    throw new Error(
      "Payment currency does not match booking currency.",
    );
  }

  if (
    event.amountMinor !==
    booking.totalMinor
  ) {
    throw new Error(
      "Payment amount does not match booking total.",
    );
  }

  const eventFulfillment =
    await db.orm.public.BookingAdmissionFulfillment.first({
      providerEventId:
        event.eventId,
    });

  if (
    eventFulfillment &&
    String(eventFulfillment.bookingId) !==
      String(booking.id)
  ) {
    throw new Error(
      "Payment event is already associated with another booking.",
    );
  }

  const bookingFulfillment =
    await db.orm.public.BookingAdmissionFulfillment.first({
      bookingId: booking.id,
    });

  if (
    bookingFulfillment &&
    bookingFulfillment.providerEventId !==
      event.eventId &&
    !bookingFulfillment.completedAt
  ) {
    throw new Error(
      "Booking already has a different admission fulfillment event.",
    );
  }

  let fulfillment =
    eventFulfillment ??
    bookingFulfillment;

  if (!fulfillment) {
    fulfillment =
      await db.orm.public.BookingAdmissionFulfillment.create({
        bookingId:
          booking.id,
        providerEventId:
          event.eventId,
        paymentReference:
          event.paymentReference,
      });
  }

  const alreadyPaid =
    booking.paymentStatus === "paid";

  const statusAlreadyConfirmed =
    booking.status === "confirmed" ||
    booking.status === "partially_checked_in" ||
    booking.status === "checked_in" ||
    booking.status === "completed";

  if (
    !alreadyPaid ||
    !statusAlreadyConfirmed
  ) {
    await db.orm.public.Booking
      .where({
        id: booking.id,
      })
      .update({
        paymentStatus: "paid",
        status: "confirmed",
      });

    if (!alreadyPaid) {
      await db.orm.public.BookingEvent.create({
        bookingId:
          booking.id,
        type:
          "payment_confirmed",
        metadata: {
          provider:
            event.provider,
          providerEventId:
            event.eventId,
          paymentReference:
            event.paymentReference,
          amountMinor:
            event.amountMinor,
          currency:
            event.currency,
        },
      });
    }
  }

  await issueBookingAdmissionPasses(
    String(booking.id),
  );

  if (!fulfillment.passesIssuedAt) {
    await db.orm.public.BookingAdmissionFulfillment
      .where({
        id: fulfillment.id,
      })
      .update({
        passesIssuedAt:
          new Date(),
      });
  }

  const access =
    await issueBookingPassAccess(
      String(booking.id),
    );

  const completedAt =
    new Date();

  await db.orm.public.BookingAdmissionFulfillment
    .where({
      id: fulfillment.id,
    })
    .update({
      accessIssuedAt:
        fulfillment.accessIssuedAt ??
        completedAt,
      completedAt:
        fulfillment.completedAt ??
        completedAt,
    });

  return {
    bookingId:
      String(booking.id),

    bookingReference:
      booking.reference,

    accessToken:
      access.token,

    accessExpiresAt:
      access.expiresAt,

    alreadyCompleted:
      Boolean(
        fulfillment.completedAt,
      ),
  };
}
