"use client";

import { Minus, Plus, Users } from "lucide-react";

type GuestStepProps = {
  adults: number;
  childCount: number;
  onChange: (
    type: "adults" | "children",
    value: number
  ) => void;
};

function GuestCounter({
  title,
  description,
  value,
  onDecrease,
  onIncrease,
}: {
  title: string;
  description: string;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-[26px] border border-black/[0.07] bg-white p-5 sm:p-6">
      <div>
        <div className="text-lg font-black">
          {title}
        </div>

        <p className="mt-1 text-sm text-[var(--hp-ink-soft)]">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Remove ${title}`}
          onClick={onDecrease}
          className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white hover:bg-black/[0.03]"
        >
          <Minus className="h-4 w-4" />
        </button>

        <div className="min-w-8 text-center text-xl font-black">
          {value}
        </div>

        <button
          type="button"
          aria-label={`Add ${title}`}
          onClick={onIncrease}
          className="grid h-11 w-11 place-items-center rounded-full bg-[var(--hp-forest)] text-white hover:bg-[var(--hp-forest-deep)]"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function GuestStep({
  adults,
  childCount,
  onChange,
}: GuestStepProps) {
  return (
    <div>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#cdebf0] text-[var(--hp-forest)]">
        <Users className="h-6 w-6" />
      </div>

      <h2 className="hp-heading mt-6 text-4xl font-black sm:text-5xl">
        Who&apos;s joining the fun?
      </h2>

      <p className="hp-copy mt-4 max-w-xl">
        Tell us how many adults and children
        will be visiting.
      </p>

      <div className="mt-9 grid max-w-2xl gap-4">
        <GuestCounter
          title="Adults"
          description="Adult guests"
          value={adults}
          onDecrease={() =>
            onChange(
              "adults",
              Math.max(0, adults - 1)
            )
          }
          onIncrease={() =>
            onChange("adults", adults + 1)
          }
        />

        <GuestCounter
          title="Children"
          description="Child guests"
          value={childCount}
          onDecrease={() =>
            onChange(
              "children",
              Math.max(0, childCount - 1)
            )
          }
          onIncrease={() =>
            onChange(
              "children",
              childCount + 1
            )
          }
        />
      </div>
    </div>
  );
}

