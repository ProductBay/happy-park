import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const KEY_LENGTH = 32;

export type EncryptedPassCredential = {
  ciphertext: string;
  initializationVector: string;
  authenticationTag: string;
  keyVersion: number;
};

function getEncryptionKey() {
  const encoded =
    process.env.HAPPY_PARK_PASS_ENCRYPTION_KEY?.trim();

  if (!encoded) {
    throw new Error(
      "HAPPY_PARK_PASS_ENCRYPTION_KEY is not configured.",
    );
  }

  const key = Buffer.from(
    encoded,
    "base64",
  );

  if (key.length !== KEY_LENGTH) {
    throw new Error(
      "HAPPY_PARK_PASS_ENCRYPTION_KEY must decode to exactly 32 bytes.",
    );
  }

  return key;
}

export function isPassEncryptionConfigured() {
  try {
    getEncryptionKey();
    return true;
  } catch {
    return false;
  }
}

export function encryptPassCredential(
  credential: string,
): EncryptedPassCredential {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);

  const cipher = createCipheriv(
    ALGORITHM,
    key,
    iv,
  );

  const encrypted = Buffer.concat([
    cipher.update(
      credential,
      "utf8",
    ),
    cipher.final(),
  ]);

  const authenticationTag =
    cipher.getAuthTag();

  return {
    ciphertext:
      encrypted.toString("base64url"),
    initializationVector:
      iv.toString("base64url"),
    authenticationTag:
      authenticationTag.toString(
        "base64url",
      ),
    keyVersion: 1,
  };
}

export function decryptPassCredential({
  ciphertext,
  initializationVector,
  authenticationTag,
  keyVersion,
}: EncryptedPassCredential) {
  if (keyVersion !== 1) {
    throw new Error(
      `Unsupported admission credential key version: ${keyVersion}.`,
    );
  }

  const key = getEncryptionKey();

  const decipher = createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(
      initializationVector,
      "base64url",
    ),
  );

  decipher.setAuthTag(
    Buffer.from(
      authenticationTag,
      "base64url",
    ),
  );

  const decrypted = Buffer.concat([
    decipher.update(
      Buffer.from(
        ciphertext,
        "base64url",
      ),
    ),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
