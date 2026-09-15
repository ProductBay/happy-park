import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

function getWebhookSecret() {
  const secret =
    process.env
      .HAPPY_PARK_PAYMENT_WEBHOOK_SECRET
      ?.trim();

  if (!secret) {
    throw new Error(
      "HAPPY_PARK_PAYMENT_WEBHOOK_SECRET is not configured.",
    );
  }

  return secret;
}

export function isPaymentWebhookConfigured() {
  try {
    getWebhookSecret();
    return true;
  } catch {
    return false;
  }
}

function normalizeSignature(
  signature: string,
) {
  const trimmed =
    signature.trim();

  if (
    trimmed
      .toLowerCase()
      .startsWith("sha256=")
  ) {
    return trimmed.slice(7);
  }

  return trimmed;
}

export function verifyPaymentWebhookSignature(
  rawBody: string,
  signature: string | null,
) {
  if (!signature) {
    return false;
  }

  const expected =
    createHmac(
      "sha256",
      getWebhookSecret(),
    )
      .update(rawBody, "utf8")
      .digest("hex");

  const received =
    normalizeSignature(signature);

  if (
    !/^[a-f0-9]{64}$/i.test(
      received,
    )
  ) {
    return false;
  }

  const expectedBuffer =
    Buffer.from(expected, "hex");

  const receivedBuffer =
    Buffer.from(received, "hex");

  if (
    expectedBuffer.length !==
    receivedBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    expectedBuffer,
    receivedBuffer,
  );
}
