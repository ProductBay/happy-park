"use client";

import {
  Check,
  Sparkles,
} from "lucide-react";
import { admissionPackages } from "@/constants/booking";
import { formatJmd } from "@/lib/booking/pricing";
import { cn } from "@/lib/utils/cn";

type PackageStepProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export function PackageStep({
  selectedId,
  onSelect,
}: PackageStepProps) {
  return (
    <div>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#f7dfaa] text-[var(--hp-forest)]">
        <Sparkles className="h-6 w-6" />
      </div>

      <h2 className="hp-heading mt-6 text-4xl font-black sm:text-5xl">
        Choose your Happy-Park experience.
      </h2>

      <p className="hp-copy mt-4 max-w-2xl">
        Select the admission option that best
        fits your family&apos;s visit.
      </p>

      <div className="mt-9 grid gap-4 xl:grid-cols-3">
        {admissionPackages.map(
          (item) => {
            const selected =
              selectedId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onSelect(item.id)
                }
                className={cn(
                  "relative overflow-hidden rounded-[28px] border p-6 text-left transition",
                  selected
                    ? "border-[var(--hp-forest)] bg-[#f2f8e8] shadow-[0_20px_60px_rgba(20,39,30,0.08)]"
                    : "border-black/[0.07] bg-white hover:-translate-y-1 hover:border-black/15"
                )}
              >
                {item.badge ? (
                  <div className="inline-flex rounded-full bg-[var(--hp-forest)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white">
                    {item.badge}
                  </div>
                ) : null}

                <div className="mt-5 flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-black tracking-[-0.035em]">
                    {item.name}
                  </h3>

                  <span
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-full border",
                      selected
                        ? "border-[var(--hp-forest)] bg-[var(--hp-forest)] text-white"
                        : "border-black/10"
                    )}
                  >
                    {selected ? (
                      <Check className="h-4 w-4" />
                    ) : null}
                  </span>
                </div>

                <p className="mt-3 min-h-[84px] text-sm leading-7 text-[var(--hp-ink-soft)]">
                  {item.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-black/[0.035] p-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.12em] text-black/40">
                      Adult
                    </div>

                    <div className="mt-1 font-black">
                      {formatJmd(
                        item.priceAdult
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.12em] text-black/40">
                      Child
                    </div>

                    <div className="mt-1 font-black">
                      {formatJmd(
                        item.priceChild
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-2">
                  {item.features.map(
                    (feature) => (
                      <div
                        key={feature}
                        className="flex gap-2 text-sm text-[var(--hp-ink-soft)]"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--hp-forest)]" />
                        {feature}
                      </div>
                    )
                  )}
                </div>
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}
