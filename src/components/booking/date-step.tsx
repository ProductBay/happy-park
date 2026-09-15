"use client";

import { CalendarDays } from "lucide-react";

type DateStepProps = {
  value: string;
  onChange: (value: string) => void;
};

function getMinimumDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function DateStep({
  value,
  onChange,
}: DateStepProps) {
  return (
    <div>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#dff0b9] text-[var(--hp-forest)]">
        <CalendarDays className="h-6 w-6" />
      </div>

      <h2 className="hp-heading mt-6 text-4xl font-black sm:text-5xl">
        When are you coming?
      </h2>

      <p className="hp-copy mt-4 max-w-xl">
        Choose the day you would like to
        visit Happy-Park.
      </p>

      <div className="mt-9 max-w-md">
        <label
          htmlFor="visit-date"
          className="text-sm font-black"
        >
          Visit date
        </label>

        <input
          id="visit-date"
          type="date"
          min={getMinimumDate()}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="mt-3 min-h-14 w-full rounded-2xl border border-black/10 bg-white px-4 text-base font-bold outline-none transition focus:border-[var(--hp-forest)]"
        />
      </div>
    </div>
  );
}
