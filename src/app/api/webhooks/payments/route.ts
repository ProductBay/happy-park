import { NextResponse } from "next/server";

import {
  isHappyParkDatabaseEnabled,
} from "@/lib/db/happy-park-db";

import {
  isPassEncryptionConfigured,
} from "@/lib/security/pass-credential-encryption";

import {
  isPaymentWebhookConfigured,
  verifyPaymentWebhookSignature,
} from "@/lib/security/payment-webhook";

import {
  trustedPaymentEventSchema,
} from "@/lib/validation/payment-webhook";

import {
  fulfillPaidAdmissionBooking,
} from "@/services/admission/fulfill-paid-admission-booking";

export const runtime = "nodejs";

export async function POST(
  request: Request,
) {
  if (!isHappyParkDatabaseEnabled()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Booking persistence is not enabled.",
      },
      {
        status: 503,
      },
    );
  }

  if (!isPassEncryptionConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Admission credential encryption is not configured.",
      },
      {
        status: 503,
      },
    );
  }

  if (!isPaymentWebhookConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Payment webhook verification is not configured.",
      },
      {
        status: 503,
      },
    );
  }

  const rawBody =
    await request.text();

  const signature =
    request.headers.get(
      "x-happy-park-signature",
    );

  if (
    !verifyPaymentWebhookSignature(
      rawBody,
      signature,
    )
  ) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Invalid webhook signature.",
      },
      {
        status: 401,
      },
    );
  }

  let parsedBody: unknown;

  try {
    parsedBody =
      JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Invalid JSON payload.",
      },
      {
        status: 400,
      },
    );
  }

  const parsed =
    trustedPaymentEventSchema.safeParse(
      parsedBody,
    );

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Invalid payment event.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const result =
      await fulfillPaidAdmissionBooking(
        parsed.data,
      );

    /*
     * SECURITY:
     *
     * Never return the raw HPA1 customer
     * admission token to a payment provider.
     */
    return NextResponse.json({
      ok: true,
      bookingId:
        result.bookingId,
      bookingReference:
        result.bookingReference,
      fulfilled: true,
      alreadyCompleted:
        result.alreadyCompleted,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Admission fulfillment failed.";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      {
        status: 409,
      },
    );
  }
}
