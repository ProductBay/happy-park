"use client";

import { useMemo, useState } from "react";
import type {
  BookingStepId,
  CustomerDetails,
  VisitBookingState,
} from "@/types/booking";
import { calculateBookingPricing } from "@/lib/booking/pricing";

export const bookingSteps: {
  id: BookingStepId;
  label: string;
}[] = [
  { id: "date", label: "Date" },
  { id: "guests", label: "Guests" },
  {
    id: "package",
    label: "Admission",
  },
  { id: "extras", label: "Extras" },
  { id: "review", label: "Review" },
  {
    id: "details",
    label: "Details",
  },
  {
    id: "checkout",
    label: "Checkout",
  },
];

const initialState: VisitBookingState = {
  visitDate: "",

  guests: {
    adults: 1,
    children: 1,
  },

  packageId: "",

  extraIds: [],

  customer: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
};

export function useVisitBooking() {
  const [state, setState] =
    useState<VisitBookingState>(
      initialState
    );

  const [stepIndex, setStepIndex] =
    useState(0);

  const pricing = useMemo(
    () =>
      calculateBookingPricing(state),
    [state]
  );

  const currentStep =
    bookingSteps[stepIndex];

  function setVisitDate(
    visitDate: string
  ) {
    setState((current) => ({
      ...current,
      visitDate,
    }));
  }

  function setGuestCount(
    type: "adults" | "children",
    value: number
  ) {
    setState((current) => ({
      ...current,

      guests: {
        ...current.guests,

        [type]: Math.max(
          0,
          value
        ),
      },
    }));
  }

  function setPackage(
    packageId: string
  ) {
    setState((current) => ({
      ...current,
      packageId,
    }));
  }

  function toggleExtra(
    extraId: string
  ) {
    setState((current) => ({
      ...current,

      extraIds:
        current.extraIds.includes(
          extraId
        )
          ? current.extraIds.filter(
              (id) =>
                id !== extraId
            )
          : [
              ...current.extraIds,
              extraId,
            ],
    }));
  }

  function setCustomerField(
    field: keyof CustomerDetails,
    value: string
  ) {
    setState((current) => ({
      ...current,

      customer: {
        ...current.customer,
        [field]: value,
      },
    }));
  }

  function customerDetailsValid() {
    const customer =
      state.customer;

    return (
      customer.firstName.trim()
        .length >= 2 &&
      customer.lastName.trim()
        .length >= 2 &&
      customer.email.includes("@") &&
      customer.phone.trim().length >=
        7
    );
  }

  function canContinue() {
    switch (currentStep.id) {
      case "date":
        return Boolean(
          state.visitDate
        );

      case "guests":
        return (
          state.guests.adults +
            state.guests.children >
          0
        );

      case "package":
        return Boolean(
          state.packageId
        );

      case "details":
        return customerDetailsValid();

      case "extras":
      case "review":
      case "checkout":
        return true;

      default:
        return false;
    }
  }

  function next() {
    if (!canContinue()) {
      return;
    }

    setStepIndex((current) =>
      Math.min(
        current + 1,
        bookingSteps.length - 1
      )
    );
  }

  function back() {
    setStepIndex((current) =>
      Math.max(
        current - 1,
        0
      )
    );
  }

  function goToStep(
    index: number
  ) {
    if (index <= stepIndex) {
      setStepIndex(index);
    }
  }

  return {
    state,
    pricing,
    currentStep,
    stepIndex,
    steps: bookingSteps,

    setVisitDate,
    setGuestCount,
    setPackage,
    toggleExtra,
    setCustomerField,

    canContinue,
    next,
    back,
    goToStep,
  };
}
