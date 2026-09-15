import type {
  AdmissionScanOutcome,
  AdmissionScanResult,
} from "@/types/admission";

const messages: Record<
  AdmissionScanOutcome,
  string
> = {
  accepted:
    "Admission accepted. Welcome to Happy-Park!",
  already_used:
    "This admission pass has already been used.",
  invalid:
    "This admission pass could not be validated.",
  revoked:
    "This admission pass has been revoked.",
  cancelled:
    "This admission pass is cancelled.",
  expired:
    "This admission pass has expired.",
  wrong_visit_date:
    "This pass is not valid for today's visit date.",
  booking_not_confirmed:
    "The booking attached to this pass is not confirmed for admission.",
};

export function admissionResult(
  outcome: AdmissionScanOutcome,
  extra?: {
    passNumber?: string;
    bookingReference?: string;
  },
): AdmissionScanResult {
  return {
    accepted: outcome === "accepted",
    outcome,
    message: messages[outcome],
    ...extra,
  };
}
