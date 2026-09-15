"use client";

import {
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  CircleX,
  Keyboard,
  LoaderCircle,
  Search,
  TicketCheck,
  UserRound,
} from "lucide-react";
import { FormEvent, useState } from "react";

import type { AdmissionPassLookup } from "@/types/admission-lookup";

type ManualPassLookupProps = {
  liveEnabled: boolean;
};

type LookupState =
  | { type: "idle" }
  | { type: "loading" }
  | {
      type: "success";
      result: AdmissionPassLookup;
    }
  | {
      type: "error";
      message: string;
    };

const outcomeCopy = {
  ready: {
    title: "Ready for admission",
    message:
      "This pass is valid for entry today.",
  },
  already_used: {
    title: "Pass already used",
    message:
      "This guest pass has already been checked in.",
  },
  revoked: {
    title: "Pass revoked",
    message:
      "This credential is no longer valid.",
  },
  cancelled: {
    title: "Pass cancelled",
    message:
      "This admission pass has been cancelled.",
  },
  expired: {
    title: "Pass expired",
    message:
      "This pass is no longer valid.",
  },
  wrong_visit_date: {
    title: "Wrong visit date",
    message:
      "This pass is valid for a different Happy-Park visit date.",
  },
  booking_not_confirmed: {
    title: "Booking not ready",
    message:
      "The related booking is not currently eligible for admission.",
  },
  not_found: {
    title: "Pass not found",
    message:
      "No Happy-Park admission pass matches this number.",
  },
} as const;

export function ManualPassLookup({
  liveEnabled,
}: ManualPassLookupProps) {
  const [passNumber, setPassNumber] =
    useState("");

  const [state, setState] =
    useState<LookupState>({
      type: "idle",
    });

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const normalized =
      passNumber.trim().toUpperCase();

    if (!normalized || !liveEnabled) {
      return;
    }

    setState({
      type: "loading",
    });

    try {
      const response = await fetch(
        "/api/admission/lookup",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            passNumber: normalized,
          }),
        },
      );

      const data =
        (await response.json()) as
          | AdmissionPassLookup
          | {
              error?: string;
              code?: string;
            };

      if (
        response.status === 404 &&
        "outcome" in data
      ) {
        setState({
          type: "success",
          result: data,
        });

        return;
      }

      if (!response.ok) {
        setState({
          type: "error",
          message:
            "error" in data &&
            typeof data.error === "string"
              ? data.error
              : "Unable to verify this pass.",
        });

        return;
      }

      if (!("outcome" in data)) {
        throw new Error(
          "Unexpected admission response.",
        );
      }

      setState({
        type: "success",
        result: data,
      });
    } catch (error) {
      console.error(error);

      setState({
        type: "error",
        message:
          "Unable to reach the admission service.",
      });
    }
  }

  const result =
    state.type === "success"
      ? state.result
      : null;

  const resultCopy = result
    ? outcomeCopy[result.outcome]
    : null;

  return (
    <section className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#164b33]/7 text-[#164b33]">
          <Keyboard className="size-4" />
        </div>

        <div>
          <h2 className="font-semibold text-[#14271e]">
            Manual pass lookup
          </h2>

          <p className="mt-1 text-sm leading-6 text-black/45">
            Verify a printed Happy-Park pass if the QR code cannot be scanned.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={passNumber}
          onChange={(event) => {
            setPassNumber(
              event.target.value.toUpperCase(),
            );

            if (
              state.type !== "idle"
            ) {
              setState({
                type: "idle",
              });
            }
          }}
          placeholder="HP-260914-XXXXXXXX"
          autoComplete="off"
          spellCheck={false}
          className="min-h-12 flex-1 rounded-2xl border border-black/10 bg-[#fbf7ed]/50 px-4 text-sm font-medium text-[#14271e] outline-none transition focus:border-[#3e8d5d]/50 focus:ring-4 focus:ring-[#3e8d5d]/10"
        />

        <button
          type="submit"
          disabled={
            !liveEnabled ||
            !passNumber.trim() ||
            state.type === "loading"
          }
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#164b33] px-5 text-sm font-semibold text-white transition hover:bg-[#0d3423] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {state.type === "loading" ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}

          {state.type === "loading"
            ? "Checking..."
            : "Find pass"}
        </button>
      </form>

      {!liveEnabled ? (
        <div className="mt-4 rounded-2xl border border-amber-200/60 bg-amber-50 px-4 py-3">
          <div className="flex items-start gap-3">
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-amber-700" />

            <p className="text-xs leading-5 text-amber-900/70">
              Manual lookup will activate when the Happy-Park database is enabled.
            </p>
          </div>
        </div>
      ) : null}

      {state.type === "error" ? (
        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <div className="flex items-start gap-3">
            <CircleX className="mt-0.5 size-5 shrink-0 text-rose-600" />

            <div>
              <p className="font-semibold text-rose-950">
                Verification failed
              </p>

              <p className="mt-1 text-sm leading-6 text-rose-900/65">
                {state.message}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {result && resultCopy ? (
        <div
          className={[
            "mt-5 rounded-[24px] border p-5",
            result.eligible
              ? "border-emerald-200 bg-emerald-50"
              : "border-amber-200 bg-amber-50",
          ].join(" ")}
        >
          <div className="flex items-start gap-3">
            {result.eligible ? (
              <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-emerald-700" />
            ) : (
              <CircleAlert className="mt-0.5 size-6 shrink-0 text-amber-700" />
            )}

            <div className="min-w-0">
              <p
                className={[
                  "font-semibold",
                  result.eligible
                    ? "text-emerald-950"
                    : "text-amber-950",
                ].join(" ")}
              >
                {resultCopy.title}
              </p>

              <p
                className={[
                  "mt-1 text-sm leading-6",
                  result.eligible
                    ? "text-emerald-900/65"
                    : "text-amber-900/65",
                ].join(" ")}
              >
                {resultCopy.message}
              </p>
            </div>
          </div>

          {result.pass &&
          result.booking ? (
            <div className="mt-5 grid gap-3 border-t border-black/5 pt-5 sm:grid-cols-2">
              <Detail
                icon={TicketCheck}
                label="Pass"
                value={
                  result.pass.passNumber
                }
              />

              <Detail
                icon={UserRound}
                label="Guest"
                value={
                  result.pass.guestType ===
                  "adult"
                    ? "Adult"
                    : "Child"
                }
              />

              <Detail
                icon={CalendarDays}
                label="Visit"
                value={
                  result.pass.validDate
                }
              />

              <Detail
                icon={TicketCheck}
                label="Booking"
                value={
                  result.booking.reference
                }
              />

              {result.booking
                .customerName ? (
                <Detail
                  icon={UserRound}
                  label="Customer"
                  value={
                    result.booking
                      .customerName
                  }
                />
              ) : null}

              <Detail
                icon={CircleAlert}
                label="Pass status"
                value={
                  result.pass.status
                    .charAt(0)
                    .toUpperCase() +
                  result.pass.status.slice(1)
                }
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof TicketCheck;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/60 p-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-[#164b33]" />

      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/35">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-[#14271e]">
          {value}
        </p>
      </div>
    </div>
  );
}
