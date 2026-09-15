export type AdmissionLookupOutcome =
  | "ready"
  | "already_used"
  | "revoked"
  | "cancelled"
  | "expired"
  | "wrong_visit_date"
  | "booking_not_confirmed"
  | "not_found";

export type AdmissionPassLookup = {
  outcome: AdmissionLookupOutcome;
  eligible: boolean;
  pass?: {
    passNumber: string;
    guestType: "adult" | "child";
    status:
      | "active"
      | "used"
      | "revoked"
      | "cancelled"
      | "expired";
    validDate: string;
    firstUsedAt: string | null;
  };
  booking?: {
    reference: string;
    status: string;
    paymentStatus: string;
    customerName: string | null;
    visitDate: string;
  };
};
