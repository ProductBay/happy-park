import { randomUUID } from "node:crypto";
import {
  admissionPackages,
  bookingExtras,
} from "@/constants/booking";
import type { PrepareBookingInput } from "@/lib/validation/booking";
import type { PreparedBookingQuote } from "@/types/booking-api";

function getJamaicaDateString() {
  const parts = new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: "America/Jamaica",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  ).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map((part) => [
      part.type,
      part.value,
    ])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function createReference() {
  const stamp = Date.now()
    .toString(36)
    .toUpperCase();

  const random = randomUUID()
    .replaceAll("-", "")
    .slice(0, 6)
    .toUpperCase();

  return `HP-PRE-${stamp}-${random}`;
}

export function prepareServerBookingQuote(
  input: PrepareBookingInput
): PreparedBookingQuote {
  const today = getJamaicaDateString();

  if (input.visitDate < today) {
    throw new Error(
      "The selected visit date is no longer available."
    );
  }

  const guestCount =
    input.guests.adults +
    input.guests.children;

  if (guestCount < 1) {
    throw new Error(
      "At least one guest is required."
    );
  }

  const selectedPackage =
    admissionPackages.find(
      (item) =>
        item.id === input.packageId
    );

  if (!selectedPackage) {
    throw new Error(
      "The selected admission package is invalid."
    );
  }

  const uniqueExtraIds = [
    ...new Set(input.extraIds),
  ];

  if (
    uniqueExtraIds.length !==
    input.extraIds.length
  ) {
    throw new Error(
      "Duplicate booking extras are not allowed."
    );
  }

  const selectedExtras =
    uniqueExtraIds.map((extraId) => {
      const extra =
        bookingExtras.find(
          (item) =>
            item.id === extraId
        );

      if (!extra) {
        throw new Error(
          "One or more selected extras are invalid."
        );
      }

      return extra;
    });

  const adultSubtotal =
    selectedPackage.priceAdult *
    input.guests.adults;

  const childSubtotal =
    selectedPackage.priceChild *
    input.guests.children;

  const admissionSubtotal =
    adultSubtotal +
    childSubtotal;

  const extrasSubtotal =
    selectedExtras.reduce(
      (total, extra) => {
        const multiplier =
          extra.unit === "person"
            ? guestCount
            : 1;

        return (
          total +
          extra.price * multiplier
        );
      },
      0
    );

  const total =
    admissionSubtotal +
    extrasSubtotal;

  const expiresAt =
    new Date(
      Date.now() + 15 * 60 * 1000
    ).toISOString();

  return {
    quoteId: randomUUID(),

    reference: createReference(),

    currency: "JMD",

    expiresAt,

    visitDate: input.visitDate,

    guestCount,

    package: {
      id: selectedPackage.id,
      name: selectedPackage.name,
    },

    extras: selectedExtras.map(
      (extra) => ({
        id: extra.id,
        name: extra.name,
      })
    ),

    customer: {
      firstName:
        input.customer.firstName,
      lastName:
        input.customer.lastName,
      email:
        input.customer.email,
      phone:
        input.customer.phone,
    },

    pricing: {
      admissionSubtotal,
      extrasSubtotal,
      total,

      admissionSubtotalMinor:
        admissionSubtotal * 100,

      extrasSubtotalMinor:
        extrasSubtotal * 100,

      totalMinor:
        total * 100,
    },

    persistenceEnabled: false,
    paymentEnabled: false,
  };
}
