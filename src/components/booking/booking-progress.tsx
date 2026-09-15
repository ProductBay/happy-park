"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { BookingStepId } from "@/types/booking";

type ProgressProps = {
  steps: {
    id: BookingStepId;
    label: string;
  }[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function BookingProgress({
  steps,
  currentIndex,
  onSelect,
}: ProgressProps) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max items-center gap-2">
        {steps.map((step, index) => {
          const complete =
            index < currentIndex;

          const active =
            index === currentIndex;

          return (
            <button
              key={step.id}
              type="button"
              disabled={index > currentIndex}
              onClick={() => onSelect(index)}
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.12em] transition",
                active &&
                  "bg-[var(--hp-forest)] text-white",
                complete &&
                  "bg-[#dff0b9] text-[var(--hp-forest)]",
                !active &&
                  !complete &&
                  "bg-black/[0.04] text-black/35"
              )}
            >
              <span
                className={cn(
                  "grid h-6 w-6 place-items-center rounded-full text-[10px]",
                  active &&
                    "bg-white/15",
                  complete &&
                    "bg-white/70",
                  !active &&
                    !complete &&
                    "bg-white"
                )}
              >
                {complete ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  index + 1
                )}
              </span>

              {step.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
