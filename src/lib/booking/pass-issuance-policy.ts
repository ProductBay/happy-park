export type PassIssuanceEligibility = {
  bookingStatus: string;
  paymentStatus: string;
};

export function canIssueAdmissionPasses(
  input: PassIssuanceEligibility,
) {
  return (
    input.bookingStatus === "confirmed" &&
    input.paymentStatus === "paid"
  );
}

export function assertAdmissionPassIssuanceAllowed(
  input: PassIssuanceEligibility,
) {
  if (!canIssueAdmissionPasses(input)) {
    throw new Error(
      "Admission passes can only be issued for a confirmed, paid booking.",
    );
  }
}
