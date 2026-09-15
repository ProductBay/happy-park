"use client";

import {
  CalendarDays,
  Users,
} from "lucide-react";
import {
  formatJmd,
  getSelectedExtras,
  getSelectedPackage,
} from "@/lib/booking/pricing";
import type { VisitBookingState } from "@/types/booking";

type SummaryProps = {
  state: VisitBookingState;
  pricing: {
    admissionSubtotal: number;
    extrasSubtotal: number;
    total: number;
  };
};

export function BookingSummary({
  state,
  pricing,
}: SummaryProps) {
  const selectedPackage =
    getSelectedPackage(state.packageId);

  const extras =
    getSelectedExtras(state.extraIds);

  return (
    <aside className="rounded-[30px] border border-black/[0.07] bg-[var(--hp-ink)] p-6 text-white shadow-[0_30px_80px_rgba(20,39,30,0.14)] lg:sticky lg:top-24">
      <div className="text-xs font-black uppercase tracking-[0.16em] text-white/40">
        Your visit
      </div>

      <h3 className="mt-3 text-2xl font-black tracking-[-0.035em]">
        Happy-Park booking
      </h3>

      <div className="mt-7 grid gap-5 border-b border-white/10 pb-6">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 text-[var(--hp-lime)]" />

          <div>
            <div className="text-xs text-white/40">
              Date
            </div>

            <div className="mt-1 text-sm font-bold">
              {state.visitDate ||
                "Choose a date"}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="mt-0.5 h-4 w-4 text-[var(--hp-lime)]" />

          <div>
            <div className="text-xs text-white/40">
              Guests
            </div>

            <div className="mt-1 text-sm font-bold">
              {state.guests.adults +
                state.guests.children}{" "}
              guest
              {state.guests.adults +
                state.guests.children ===
              1
                ? ""
                : "s"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-b border-white/10 py-6 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-white/50">
            Admission
          </span>

          <span className="font-bold">
            {selectedPackage
              ? formatJmd(
                  pricing.admissionSubtotal
                )
              : "—"}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-white/50">
            Extras
          </span>

          <span className="font-bold">
            {formatJmd(
              pricing.extrasSubtotal
            )}
          </span>
        </div>

        {extras.length > 0 ? (
          <div className="pt-2 text-xs leading-6 text-white/40">
            {extras
              .map((item) => item.name)
              .join(" · ")}
          </div>
        ) : null}
      </div>

      <div className="flex items-end justify-between gap-4 pt-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.12em] text-white/40">
            Estimated total
          </div>

          <div className="mt-1 text-xs text-white/35">
            JMD
          </div>
        </div>

        <div className="text-3xl font-black tracking-[-0.04em]">
          {formatJmd(pricing.total)}
        </div>
      </div>
    </aside>
  );
}
