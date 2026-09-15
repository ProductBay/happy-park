"use client";

import {
  CalendarDays,
  Sparkles,
  Users,
} from "lucide-react";
import {
  getSelectedExtras,
  getSelectedPackage,
} from "@/lib/booking/pricing";
import type { VisitBookingState } from "@/types/booking";

type ReviewStepProps = {
  state: VisitBookingState;
};

export function ReviewStep({
  state,
}: ReviewStepProps) {
  const selectedPackage =
    getSelectedPackage(state.packageId);

  const extras =
    getSelectedExtras(state.extraIds);

  return (
    <div>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#dff0b9] text-[var(--hp-forest)]">
        <Sparkles className="h-6 w-6" />
      </div>

      <h2 className="hp-heading mt-6 text-4xl font-black sm:text-5xl">
        Your Happy-Park day.
      </h2>

      <p className="hp-copy mt-4">
        Review your visit before continuing
        to guest details and checkout.
      </p>

      <div className="mt-9 grid gap-4">
        <div className="rounded-[26px] border border-black/[0.07] bg-white p-6">
          <div className="flex gap-4">
            <CalendarDays className="h-5 w-5 text-[var(--hp-forest)]" />

            <div>
              <div className="text-xs font-black uppercase tracking-[0.12em] text-black/40">
                Visit date
              </div>

              <div className="mt-1 font-black">
                {state.visitDate}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[26px] border border-black/[0.07] bg-white p-6">
          <div className="flex gap-4">
            <Users className="h-5 w-5 text-[var(--hp-forest)]" />

            <div>
              <div className="text-xs font-black uppercase tracking-[0.12em] text-black/40">
                Guests
              </div>

              <div className="mt-1 font-black">
                {state.guests.adults} adult
                {state.guests.adults === 1
                  ? ""
                  : "s"}{" "}
                · {state.guests.children} child
                {state.guests.children === 1
                  ? ""
                  : "ren"}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[26px] border border-black/[0.07] bg-white p-6">
          <div className="text-xs font-black uppercase tracking-[0.12em] text-black/40">
            Admission
          </div>

          <div className="mt-2 text-xl font-black">
            {selectedPackage?.name}
          </div>
        </div>

        <div className="rounded-[26px] border border-black/[0.07] bg-white p-6">
          <div className="text-xs font-black uppercase tracking-[0.12em] text-black/40">
            Extras
          </div>

          {extras.length ? (
            <div className="mt-3 grid gap-2">
              {extras.map((extra) => (
                <div
                  key={extra.id}
                  className="font-bold"
                >
                  {extra.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-[var(--hp-ink-soft)]">
              No extras selected.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
