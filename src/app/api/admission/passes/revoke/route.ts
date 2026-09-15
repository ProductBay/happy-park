import {
  NextResponse,
} from "next/server";

import {
  isHappyParkDatabaseEnabled,
} from "@/lib/db/happy-park-db";
import {
  revokeAdmissionPassSchema,
} from "@/lib/validation/pass-security";
import {
  revokeAdmissionPass,
} from "@/services/admission/revoke-admission-pass";

export const dynamic =
  "force-dynamic";

export async function POST(
  request: Request,
) {
  if (
    !isHappyParkDatabaseEnabled()
  ) {
    return NextResponse.json(
      {
        error:
          "Happy-Park persistence is not enabled.",
      },
      {
        status: 503,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  try {
    const body =
      await request.json();

    const parsed =
      revokeAdmissionPassSchema.safeParse(
        body,
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            "Invalid pass revocation request.",
        },
        {
          status: 400,
          headers: {
            "Cache-Control":
              "no-store",
          },
        },
      );
    }

    const result =
      await revokeAdmissionPass(
        parsed.data,
      );

    return NextResponse.json(
      {
        pass: result,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to revoke admission pass.";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 409,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }
}
