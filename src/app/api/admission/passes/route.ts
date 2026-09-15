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
  admissionAccessSchema,
} from "@/lib/validation/admission-access";
import {
  getCustomerAdmissionPasses,
} from "@/services/admission/get-customer-admission-passes";

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
          "Happy-Park admission persistence is not currently enabled.",
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
    const json =
      await request.json();

    const parsed =
      admissionAccessSchema.safeParse(
        json,
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            "Invalid admission access request.",
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

    const booking =
      await getCustomerAdmissionPasses(
        parsed.data.accessToken,
      );

    if (!booking) {
      return NextResponse.json(
        {
          error:
            "Admission passes could not be found or access has expired.",
        },
        {
          status: 404,
          headers: {
            "Cache-Control":
              "no-store",
          },
        },
      );
    }

    return NextResponse.json(
      {
        booking,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "private, no-store, max-age=0",
          "Referrer-Policy":
            "no-referrer",
        },
      },
    );
  } catch (error) {
    console.error(
      "Admission pass retrieval failed.",
      error instanceof Error
        ? error.message
        : "Unknown error",
    );

    return NextResponse.json(
      {
        error:
          "Unable to retrieve admission passes.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }
}
