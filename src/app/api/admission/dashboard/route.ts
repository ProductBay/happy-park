import { NextResponse } from "next/server";

import { isHappyParkDatabaseEnabled } from "@/lib/db/happy-park-db";
import { getAdmissionDashboard } from "@/services/admission/admission-dashboard";

export const dynamic = "force-dynamic";

export async function GET() {
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
    const dashboard =
      await getAdmissionDashboard();

    return NextResponse.json(
      dashboard,
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error(
      "Admission dashboard failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to load admission operations.",
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
