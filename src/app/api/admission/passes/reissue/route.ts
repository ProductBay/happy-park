import {
  NextResponse,
} from "next/server";

import {
  isHappyParkDatabaseEnabled,
} from "@/lib/db/happy-park-db";
import {
  isPassEncryptionConfigured,
} from "@/lib/security/pass-credential-encryption";
import {
  reissueAdmissionPassSchema,
} from "@/lib/validation/pass-security";
import {
  reissueAdmissionPass,
} from "@/services/admission/reissue-admission-pass";

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

  if (
    !isPassEncryptionConfigured()
  ) {
    return NextResponse.json(
      {
        error:
          "Admission credential encryption is not configured.",
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
      reissueAdmissionPassSchema.safeParse(
        body,
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            "Invalid pass reissue request.",
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
      await reissueAdmissionPass(
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
        : "Unable to reissue admission pass.";

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
