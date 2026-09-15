import { createHash } from "node:crypto";

import type {
  AdmissionScanResult,
  IssuedAdmissionCredential,
} from "@/types/admission";

import { issueAdmissionCredential } from "@/lib/booking/issue-admission-credential";
import {
  hashPassCredential,
  normalizePassCredential,
} from "@/lib/security/pass-token";

export function createAdmissionPassCredential(): IssuedAdmissionCredential {
  return issueAdmissionCredential();
}

export function credentialLookupHash(credential: string) {
  return hashPassCredential(
    normalizePassCredential(credential),
  );
}

export function createInvalidAdmissionResult(
  message = "This Happy-Park admission pass could not be validated.",
): AdmissionScanResult {
  return {
    outcome: "invalid",
    accepted: false,
    message,
  };
}

export function createAdmissionAuditFingerprint(
  credential: string,
) {
  return createHash("sha256")
    .update(normalizePassCredential(credential))
    .digest("hex")
    .slice(0, 16);
}
