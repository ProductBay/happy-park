"use client";

import {
  Check,
  Plus,
} from "lucide-react";
import { bookingExtras } from "@/constants/booking";
import { formatJmd } from "@/lib/booking/pricing";
import { cn } from "@/lib/utils/cn";

type ExtrasStepProps = {
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export function ExtrasStep({
  selectedIds,
  onToggle,
}: ExtrasStepProps) {
  return (
    <div>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#f8d8cd] text-[var(--hp-forest)]">
        <Plus className="h-6 w-6" />
      </div>

      <h2 className="hp-heading mt-6 text-4xl font-black sm:text-5xl">
        Add a little more happy.
      </h2>

      <p className="hp-copy mt-4 max-w-2xl">
        Extras are optional. Choose any that
        make sense for your visit.
      </p>

      <div className="mt-9 grid gap-4">
        {bookingExtras.map((item) => {
          const selected =
            selectedIds.includes(item.id);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onToggle(item.id)
              }
              className={cn(
                "flex items-start justify-between gap-5 rounded-[26px] border p-5 text-left transition sm:p-6",
                selected
                  ? "border-[var(--hp-forest)] bg-[#f2f8e8]"
                  : "border-black/[0.07] bg-white hover:border-black/15"
              )}
            >
              <div>
                <div className="text-lg font-black">
                  {item.name}
                </div>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--hp-ink-soft)]">
                  {item.description}
                </p>

                <div className="mt-3 text-sm font-black text-[var(--hp-forest)]">
                  + {formatJmd(item.price)}
                </div>
              </div>

              <div
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full border",
                  selected
                    ? "border-[var(--hp-forest)] bg-[var(--hp-forest)] text-white"
                    : "border-black/10 bg-white"
                )}
              >
                {selected ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
