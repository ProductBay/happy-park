import {
  createHash,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

const PASS_TOKEN_PREFIX = "HP1";
const PASS_TOKEN_BYTES = 32;

export type HappyParkPassCredential = {
  credential: string;
  credentialHash: string;
  version: 1;
};

function sha256(value: string) {
  return createHash("sha256")
    .update(value, "utf8")
    .digest("hex");
}

export function normalizePassCredential(value: string) {
  return value.trim();
}

export function isHappyParkPassCredential(value: string) {
  const normalized = normalizePassCredential(value);

  return /^HP1\.[A-Za-z0-9_-]{40,}$/.test(normalized);
}

export function hashPassCredential(value: string) {
  const normalized = normalizePassCredential(value);

  if (!isHappyParkPassCredential(normalized)) {
    throw new Error("Invalid Happy-Park pass credential.");
  }

  return sha256(normalized);
}

export function createPassCredential(): HappyParkPassCredential {
  const secret = randomBytes(PASS_TOKEN_BYTES).toString("base64url");
  const credential = `${PASS_TOKEN_PREFIX}.${secret}`;

  return {
    credential,
    credentialHash: sha256(credential),
    version: 1,
  };
}

export function verifyPassCredentialHash(
  credential: string,
  expectedHash: string,
) {
  if (!isHappyParkPassCredential(credential)) {
    return false;
  }

  const actualHash = Buffer.from(
    sha256(normalizePassCredential(credential)),
    "hex",
  );

  let storedHash: Buffer;

  try {
    storedHash = Buffer.from(expectedHash, "hex");
  } catch {
    return false;
  }

  if (actualHash.length !== storedHash.length) {
    return false;
  }

  return timingSafeEqual(actualHash, storedHash);
}

export function maskPassCredential(value: string) {
  const normalized = normalizePassCredential(value);

  if (normalized.length <= 12) {
    return "••••••••";
  }

  return `${normalized.slice(0, 6)}••••••${normalized.slice(-6)}`;
}
