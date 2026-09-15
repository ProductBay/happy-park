import {
  admissionPackages,
  bookingExtras,
} from "@/constants/booking";
import type { VisitBookingState } from "@/types/booking";

export function formatJmd(value: number) {
  return new Intl.NumberFormat("en-JM", {
    style: "currency",
    currency: "JMD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getSelectedPackage(packageId: string) {
  return admissionPackages.find((item) => item.id === packageId);
}

export function getSelectedExtras(extraIds: string[]) {
  return bookingExtras.filter((item) => extraIds.includes(item.id));
}

export function calculateBookingPricing(state: VisitBookingState) {
  const selectedPackage = getSelectedPackage(state.packageId);

  const adultSubtotal = selectedPackage
    ? selectedPackage.priceAdult * state.guests.adults
    : 0;

  const childSubtotal = selectedPackage
    ? selectedPackage.priceChild * state.guests.children
    : 0;

  const guestCount =
    state.guests.adults + state.guests.children;

  const extras = getSelectedExtras(state.extraIds);

  const extrasSubtotal = extras.reduce((total, item) => {
    const multiplier =
      item.unit === "person"
        ? guestCount
        : 1;

    return total + item.price * multiplier;
  }, 0);

  const admissionSubtotal =
    adultSubtotal + childSubtotal;

  return {
    adultSubtotal,
    childSubtotal,
    admissionSubtotal,
    extrasSubtotal,
    total:
      admissionSubtotal + extrasSubtotal,
  };
}
