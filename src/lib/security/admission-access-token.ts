import {
  createHash,
  randomBytes,
} from "node:crypto";

const ACCESS_PREFIX = "HPA1";
const TOKEN_BYTES = 32;

export function createAdmissionAccessToken() {
  const secret =
    randomBytes(TOKEN_BYTES).toString(
      "base64url",
    );

  const token =
    `${ACCESS_PREFIX}.${secret}`;

  return {
    token,
    hash: hashAdmissionAccessToken(
      token,
    ),
  };
}

export function normalizeAdmissionAccessToken(
  value: string,
) {
  return value.trim();
}

export function isAdmissionAccessTokenFormat(
  value: string,
) {
  return /^HPA1\.[A-Za-z0-9_-]{40,}$/.test(
    normalizeAdmissionAccessToken(
      value,
    ),
  );
}

export function hashAdmissionAccessToken(
  token: string,
) {
  return createHash("sha256")
    .update(
      normalizeAdmissionAccessToken(
        token,
      ),
      "utf8",
    )
    .digest("hex");
}
