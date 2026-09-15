import {
  createHash,
  randomBytes,
} from "node:crypto";

export function generateReplacementAdmissionCredential() {
  const credential =
    `HP1.${randomBytes(32).toString("base64url")}`;

  const hash =
    createHash("sha256")
      .update(
        credential,
        "utf8",
      )
      .digest("hex");

  return {
    credential,
    hash,
  };
}
