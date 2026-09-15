export type AdmissionCredentialVersion = 1;

export type IssuedAdmissionCredential = {
  passNumber: string;
  credential: string;
  credentialHash: string;
  version: AdmissionCredentialVersion;
};

export type AdmissionScanOutcome =
  | "accepted"
  | "already_used"
  | "invalid"
  | "revoked"
  | "cancelled"
  | "expired"
  | "wrong_visit_date"
  | "booking_not_confirmed";

export type AdmissionScanRequest = {
  credential: string;
  staffId?: string;
};

export type AdmissionScanResult = {
  outcome: AdmissionScanOutcome;
  accepted: boolean;
  passNumber?: string;
  bookingReference?: string;
  message: string;
};
