import { NextResponse } from "next/server";
import { prepareServerBookingQuote } from "@/lib/booking/server-quote";
import { prepareBookingSchema } from "@/lib/validation/booking";
import type { PrepareBookingResponse } from "@/types/booking-api";

export const runtime = "nodejs";

function validationIssues(
  issues: {
    path: PropertyKey[];
    message: string;
  }[]
) {
  const result: Record<string, string[]> =
    {};

  for (const issue of issues) {
    const key =
      issue.path.length > 0
        ? issue.path.join(".")
        : "booking";

    result[key] ??= [];
    result[key].push(issue.message);
  }

  return result;
}

export async function POST(
  request: Request
) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    const response: PrepareBookingResponse =
      {
        ok: false,
        message:
          "The booking request could not be read.",
      };

    return NextResponse.json(
      response,
      { status: 400 }
    );
  }

  const parsed =
    prepareBookingSchema.safeParse(
      payload
    );

  if (!parsed.success) {
    const response: PrepareBookingResponse =
      {
        ok: false,
        message:
          "Please check your booking details.",
        issues: validationIssues(
          parsed.error.issues
        ),
      };

    return NextResponse.json(
      response,
      { status: 400 }
    );
  }

  try {
    const quote =
      prepareServerBookingQuote(
        parsed.data
      );

    const response: PrepareBookingResponse =
      {
        ok: true,
        quote,
      };

    return NextResponse.json(
      response,
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "The booking could not be prepared.";

    const response: PrepareBookingResponse =
      {
        ok: false,
        message,
      };

    return NextResponse.json(
      response,
      { status: 400 }
    );
  }
}
