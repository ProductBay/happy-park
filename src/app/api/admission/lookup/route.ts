import { NextResponse } from "next/server";

import { isHappyParkDatabaseEnabled } from "@/lib/db/happy-park-db";
import { manualAdmissionLookupSchema } from "@/lib/validation/admission";
import { lookupAdmissionPass } from "@/services/admission/lookup-admission-pass";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid JSON request.",
      },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const parsed =
    manualAdmissionLookupSchema.safeParse(
      payload,
    );

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid pass number.",
        issues: parsed.error.flatten(),
      },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  if (!isHappyParkDatabaseEnabled()) {
    return NextResponse.json(
      {
        error:
          "Happy-Park admission database is not enabled.",
        code: "DATABASE_DISABLED",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  try {
    const result =
      await lookupAdmissionPass(
        parsed.data.passNumber,
      );

    return NextResponse.json(result, {
      status:
        result.outcome === "not_found"
          ? 404
          : 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(
      "Admission lookup failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to verify this admission pass.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
