"use client";

import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  formatJmd,
} from "@/lib/booking/pricing";
import type {
  PreparedBookingQuote,
} from "@/types/booking-api";
import type {
  VisitBookingState,
} from "@/types/booking";

type CheckoutStepProps = {
  state: VisitBookingState;
  preparedQuote:
    | PreparedBookingQuote
    | null;
  preparing: boolean;
  error: string | null;
  quoteCurrent: boolean;
  onPrepare: () => void;
};

export function CheckoutStep({
  state,
  preparedQuote,
  preparing,
  error,
  quoteCurrent,
  onPrepare,
}: CheckoutStepProps) {
  const activeQuote =
    quoteCurrent
      ? preparedQuote
      : null;

  return (
    <div>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#dff0b9] text-[var(--hp-forest)]">
        <LockKeyhole className="h-6 w-6" />
      </div>

      <h2 className="hp-heading mt-6 text-4xl font-black sm:text-5xl">
        Ready for secure checkout.
      </h2>

      <p className="hp-copy mt-4 max-w-2xl">
        Happy-Park will verify your
        booking on the server before
        payment is ever requested.
      </p>

      <div className="mt-9 grid gap-4">
        <div className="rounded-[26px] border border-black/[0.07] bg-white p-6">
          <div className="flex items-start gap-4">
            <CalendarDays className="mt-1 h-5 w-5 text-[var(--hp-forest)]" />

            <div>
              <div className="text-xs font-black uppercase tracking-[0.12em] text-black/40">
                Visit
              </div>

              <div className="mt-1 font-black">
                {state.visitDate}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[26px] border border-black/[0.07] bg-white p-6">
          <div className="flex items-start gap-4">
            <Users className="mt-1 h-5 w-5 text-[var(--hp-forest)]" />

            <div>
              <div className="text-xs font-black uppercase tracking-[0.12em] text-black/40">
                Primary guest
              </div>

              <div className="mt-1 font-black">
                {state.customer.firstName}{" "}
                {state.customer.lastName}
              </div>

              <div className="mt-1 text-sm text-[var(--hp-ink-soft)]">
                {state.customer.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!activeQuote ? (
        <div className="mt-8 rounded-[28px] bg-[var(--hp-ink)] p-6 text-white sm:p-7">
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-[var(--hp-lime)]" />

            <div>
              <h3 className="text-xl font-black">
                Verify this booking
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/55">
                The server will independently
                validate the date, package,
                extras and total.
              </p>
            </div>
          </div>

          {error ? (
            <div className="mt-5 rounded-2xl bg-red-500/10 p-4 text-sm font-semibold text-red-100">
              {error}
            </div>
          ) : null}

          <button
            type="button"
            disabled={preparing}
            onClick={onPrepare}
            className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[var(--hp-lime)] px-6 text-sm font-black text-[var(--hp-ink)] disabled:cursor-wait disabled:opacity-60"
          >
            {preparing ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Verifying booking
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Verify & prepare checkout
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-[30px] border border-green-900/10 bg-[#f3f8e9]">
          <div className="flex gap-4 border-b border-green-900/10 p-6">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-[var(--hp-forest)]" />

            <div>
              <div className="text-xs font-black uppercase tracking-[0.14em] text-[var(--hp-forest)]">
                Server verified
              </div>

              <h3 className="mt-2 text-2xl font-black tracking-[-0.035em]">
                Your booking details
                match.
              </h3>
            </div>
          </div>

          <div className="grid gap-5 p-6">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.12em] text-black/40">
                Preparation reference
              </div>

              <div className="mt-1 break-all font-black">
                {activeQuote.reference}
              </div>
            </div>

            <div className="flex items-end justify-between gap-5 border-t border-green-900/10 pt-5">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.12em] text-black/40">
                  Verified total
                </div>

                <div className="mt-1 text-sm font-bold">
                  JMD
                </div>
              </div>

              <div className="text-3xl font-black tracking-[-0.04em]">
                {formatJmd(
                  activeQuote.pricing
                    .total
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-black/[0.035] p-4">
          <BadgeCheck className="h-4 w-4 text-[var(--hp-forest)]" />

          <div className="mt-3 text-xs font-black uppercase tracking-[0.1em]">
            Server priced
          </div>
        </div>

        <div className="rounded-2xl bg-black/[0.035] p-4">
          <ReceiptText className="h-4 w-4 text-[var(--hp-forest)]" />

          <div className="mt-3 text-xs font-black uppercase tracking-[0.1em]">
            JMD ready
          </div>
        </div>

        <div className="rounded-2xl bg-black/[0.035] p-4">
          <LockKeyhole className="h-4 w-4 text-[var(--hp-forest)]" />

          <div className="mt-3 text-xs font-black uppercase tracking-[0.1em]">
            Payment ready
          </div>
        </div>
      </div>

      {activeQuote ? (
        <div className="mt-6 rounded-2xl border border-amber-900/10 bg-amber-50 p-4 text-sm leading-6 text-amber-950/65">
          Database persistence and live
          payment processing are intentionally
          not enabled yet. This preparation
          reference is a development quote,
          not a confirmed Happy-Park booking.
        </div>
      ) : null}
    </div>
  );
}
