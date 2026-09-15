import { NextResponse } from "next/server";

import { isHappyParkDatabaseEnabled } from "@/lib/db/happy-park-db";
import { scanAdmissionSchema } from "@/lib/validation/admission";
import { checkInAdmissionPass } from "@/services/admission/check-in-pass";

export const runtime = "nodejs";

function noStore(status: number) {
  return {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_JSON",
        message:
          "The request body must be valid JSON.",
      },
      noStore(400),
    );
  }

  const parsed =
    scanAdmissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        code:
          "INVALID_ADMISSION_CREDENTIAL",
        message:
          "The admission credential is invalid.",
      },
      noStore(400),
    );
  }

  if (!isHappyParkDatabaseEnabled()) {
    return NextResponse.json(
      {
        ok: false,
        code: "DATABASE_NOT_ENABLED",
        message:
          "Happy-Park live admission scanning is not enabled yet.",
      },
      noStore(503),
    );
  }

  try {
    const result =
      await checkInAdmissionPass({
        credential:
          parsed.data.credential,
        staffId: parsed.data.staffId,
        staffName: parsed.data.staffName,
        gate: parsed.data.gate,
        deviceId: parsed.data.deviceId,
      });

    return NextResponse.json(
      {
        ok: result.accepted,
        result,
      },
      noStore(
        result.accepted ? 200 : 409,
      ),
    );
  } catch (error) {
    console.error(
      "Happy-Park admission scan failed.",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        code: "CHECKIN_FAILED",
        message:
          "The admission scan could not be completed.",
      },
      noStore(500),
    );
  }
}

