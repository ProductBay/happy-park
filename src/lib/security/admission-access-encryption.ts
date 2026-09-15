import {
  decryptPassCredential,
  encryptPassCredential,
} from "@/lib/security/pass-credential-encryption";

export type EncryptedAdmissionAccessToken = {
  ciphertext: string;
  initializationVector: string;
  authenticationTag: string;
  keyVersion: number;
};

export function encryptAdmissionAccessToken(
  token: string,
): EncryptedAdmissionAccessToken {
  return encryptPassCredential(token);
}

export function decryptAdmissionAccessToken(
  encrypted: EncryptedAdmissionAccessToken,
) {
  return decryptPassCredential(encrypted);
}
