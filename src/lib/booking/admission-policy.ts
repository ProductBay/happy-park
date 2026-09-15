export type AdmissionBookingState =
  | "draft"
  | "pending_payment"
  | "confirmed"
  | "partially_checked_in"
  | "checked_in"
  | "completed"
  | "cancelled"
  | "expired"
  | "refunded";

export type AdmissionPassState =
  | "active"
  | "used"
  | "revoked"
  | "cancelled"
  | "expired";

export type AdmissionPolicyInput = {
  bookingStatus: AdmissionBookingState;
  passStatus: AdmissionPassState;
  visitDate: string;
  today: string;
};

export type AdmissionPolicyDecision =
  | {
      accepted: true;
      outcome: "accepted";
    }
  | {
      accepted: false;
      outcome:
        | "already_used"
        | "revoked"
        | "cancelled"
        | "expired"
        | "wrong_visit_date"
        | "booking_not_confirmed";
    };

const ADMITTABLE_BOOKING_STATES =
  new Set<AdmissionBookingState>([
    "confirmed",
    "partially_checked_in",
  ]);

export function evaluateAdmissionPolicy(
  input: AdmissionPolicyInput,
): AdmissionPolicyDecision {
  if (
    !ADMITTABLE_BOOKING_STATES.has(
      input.bookingStatus,
    )
  ) {
    return {
      accepted: false,
      outcome: "booking_not_confirmed",
    };
  }

  switch (input.passStatus) {
    case "used":
      return {
        accepted: false,
        outcome: "already_used",
      };

    case "revoked":
      return {
        accepted: false,
        outcome: "revoked",
      };

    case "cancelled":
      return {
        accepted: false,
        outcome: "cancelled",
      };

    case "expired":
      return {
        accepted: false,
        outcome: "expired",
      };
  }

  if (input.visitDate !== input.today) {
    return {
      accepted: false,
      outcome: "wrong_visit_date",
    };
  }

  return {
    accepted: true,
    outcome: "accepted",
  };
}
