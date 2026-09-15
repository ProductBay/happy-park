import type { IssuedAdmissionCredential } from "@/types/admission";
import { createPassNumber } from "@/lib/security/pass-number";
import { createPassCredential } from "@/lib/security/pass-token";

export function issueAdmissionCredential(): IssuedAdmissionCredential {
  const token = createPassCredential();

  return {
    passNumber: createPassNumber(),
    credential: token.credential,
    credentialHash: token.credentialHash,
    version: token.version,
  };
}
