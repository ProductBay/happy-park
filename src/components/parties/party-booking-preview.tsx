"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Gift,
  PartyPopper,
  Pizza,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  partyDatesPreview,
  partyExtrasPreview,
  partyPackagesPreview,
  partyTimesPreview,
} from "@/lib/parties/preview-party-data";

const steps = [
  "Package",
  "Date & Time",
  "Guests",
  "Food",
  "Extras",
  "Review",
];

function formatMoney(minor: number) {
  return new Intl.NumberFormat("en-JM", {
    style: "currency",
    currency: "JMD",
    maximumFractionDigits: 0,
  }).format(minor / 100);
}

export function PartyBookingPreview() {
  const [step, setStep] = useState(0);
  const [packageId, setPackageId] =
    useState("big-happy");
  const [dateId, setDateId] = useState("");
  const [time, setTime] = useState("");
  const [children, setChildren] = useState(15);
  const [adults, setAdults] = useState(4);
  const [food, setFood] =
    useState("Classic Pizza Party");
  const [extras, setExtras] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const selectedPackage =
    partyPackagesPreview.find(
      (item) => item.id === packageId,
    ) ?? partyPackagesPreview[1];

  const selectedDate =
    partyDatesPreview.find(
      (item) => item.id === dateId,
    );

  const extrasTotal = useMemo(() => {
    return partyExtrasPreview
      .filter((item) =>
        extras.includes(item.id),
      )
      .reduce(
        (total, item) =>
          total + item.priceMinor,
        0,
      );
  }, [extras]);

  const additionalChildren =
    Math.max(
      0,
      children -
        selectedPackage.includedChildren,
    );

  const additionalChildrenCost =
    additionalChildren * 220000;

  const total =
    selectedPackage.startingPriceMinor +
    extrasTotal +
    additionalChildrenCost;

  const deposit =
    Math.round(total * 0.3);

  function toggleExtra(id: string) {
    setExtras((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id,
          )
        : [...current, id],
    );
  }

  function next() {
    setStep((current) =>
      Math.min(
        current + 1,
        steps.length - 1,
      ),
    );
  }

  function back() {
    setStep((current) =>
      Math.max(current - 1, 0),
    );
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.12)]">
          <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-6 py-12 text-center sm:px-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-700" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">
              Preview confirmation
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Your Happy celebration is taking shape.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              This demonstration shows how a completed
              Happy-Park party reservation will feel to
              customers. No payment or live booking has
              been created.
            </p>

            <div className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Package
                </p>
                <p className="mt-1 font-semibold text-slate-950">
                  {selectedPackage.name}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Celebration
                </p>
                <p className="mt-1 font-semibold text-slate-950">
                  {selectedDate?.date ??
                    "Selected date"}{" "}
                  · {time || "Selected time"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Guests
                </p>
                <p className="mt-1 font-semibold text-slate-950">
                  {children} children · {adults} adults
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Preview deposit
                </p>
                <p className="mt-1 font-semibold text-slate-950">
                  {formatMoney(deposit)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setConfirmed(false);
                setStep(0);
              }}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Start another preview
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-2xl sm:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              <Sparkles className="h-3.5 w-3.5" />
              Interactive client preview
            </div>

            <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Plan a birthday they&apos;ll talk about all year.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Build the celebration in minutes—from
              package and play time to pizza, decorations
              and the final reservation.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">
              Preview mode
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              No payment or live reservation
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 overflow-x-auto">
        <div className="flex min-w-[680px] items-center">
          {steps.map((item, index) => (
            <div
              key={item}
              className="flex flex-1 items-center"
            >
              <div className="flex items-center gap-2">
                <div
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                    index <= step
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-400",
                  ].join(" ")}
                >
                  {index < step ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={
                    index === step
                      ? "text-sm font-semibold text-slate-950"
                      : "text-sm text-slate-400"
                  }
                >
                  {item}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="mx-3 h-px flex-1 bg-slate-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          {step === 0 && (
            <div>
              <p className="text-sm font-semibold text-amber-600">
                Step 1
              </p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
                Choose their Happy-Park party
              </h2>

              <div className="mt-7 grid gap-4 xl:grid-cols-3">
                {partyPackagesPreview.map(
                  (item) => {
                    const selected =
                      item.id === packageId;

                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => {
                          setPackageId(item.id);
                          setChildren(
                            item.includedChildren,
                          );
                        }}
                        className={[
                          "relative rounded-[1.5rem] border p-5 text-left transition",
                          selected
                            ? "border-slate-950 bg-slate-950 text-white shadow-xl"
                            : "border-slate-200 bg-white hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg",
                        ].join(" ")}
                      >
                        {item.popular && (
                          <div className="absolute right-4 top-4 rounded-full bg-amber-300 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                            Popular
                          </div>
                        )}

                        <p
                          className={[
                            "text-xs font-bold uppercase tracking-[0.18em]",
                            selected
                              ? "text-amber-300"
                              : "text-amber-600",
                          ].join(" ")}
                        >
                          {item.eyebrow}
                        </p>

                        <h3 className="mt-3 text-xl font-semibold">
                          {item.name}
                        </h3>

                        <p
                          className={[
                            "mt-3 text-sm leading-6",
                            selected
                              ? "text-white/65"
                              : "text-slate-500",
                          ].join(" ")}
                        >
                          {item.description}
                        </p>

                        <p className="mt-5 text-lg font-semibold">
                          From{" "}
                          {formatMoney(
                            item.startingPriceMinor,
                          )}
                        </p>

                        <div className="mt-5 space-y-2">
                          {item.features
                            .slice(0, 5)
                            .map((feature) => (
                              <div
                                key={feature}
                                className="flex gap-2 text-xs"
                              >
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                        </div>
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <p className="text-sm font-semibold text-amber-600">
                Step 2
              </p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
                Pick the celebration date
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {partyDatesPreview.map(
                  (item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() =>
                        setDateId(item.id)
                      }
                      className={[
                        "rounded-2xl border p-5 text-left transition",
                        dateId === item.id
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 hover:border-slate-400",
                      ].join(" ")}
                    >
                      <CalendarDays className="h-5 w-5" />
                      <p className="mt-4 text-sm font-semibold">
                        {item.label}
                      </p>
                      <p className="text-xl font-semibold">
                        {item.date}
                      </p>
                      <p className="mt-2 text-xs opacity-60">
                        {item.availability}
                      </p>
                    </button>
                  ),
                )}
              </div>

              <h3 className="mt-8 font-semibold text-slate-950">
                Select a time
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {partyTimesPreview.map(
                  (item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() =>
                        setTime(item)
                      }
                      className={[
                        "rounded-full border px-5 py-3 text-sm font-medium transition",
                        time === item
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700",
                      ].join(" ")}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-sm font-semibold text-amber-600">
                Step 3
              </p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
                Who&apos;s joining the fun?
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <GuestCounter
                  icon={<PartyPopper className="h-5 w-5" />}
                  label="Children"
                  value={children}
                  minimum={1}
                  onChange={setChildren}
                />

                <GuestCounter
                  icon={<Users className="h-5 w-5" />}
                  label="Adults"
                  value={adults}
                  minimum={1}
                  onChange={setAdults}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-sm font-semibold text-amber-600">
                Step 4
              </p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
                Add the party food
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {[
                  "Classic Pizza Party",
                  "Pizza + Treats",
                  "Bring Your Own Cake",
                ].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() =>
                      setFood(item)
                    }
                    className={[
                      "rounded-2xl border p-5 text-left transition",
                      food === item
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-200",
                    ].join(" ")}
                  >
                    <Pizza className="h-6 w-6 text-orange-600" />
                    <p className="mt-4 font-semibold text-slate-950">
                      {item}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Preview meal configuration
                      for the celebration.
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-sm font-semibold text-amber-600">
                Step 5
              </p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
                Make it even more special
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {partyExtrasPreview
                  .filter(
                    (item) =>
                      item.id !==
                      "extra-child",
                  )
                  .map((item) => {
                    const selected =
                      extras.includes(
                        item.id,
                      );

                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() =>
                          toggleExtra(
                            item.id,
                          )
                        }
                        className={[
                          "flex items-start gap-4 rounded-2xl border p-5 text-left transition",
                          selected
                            ? "border-violet-400 bg-violet-50"
                            : "border-slate-200",
                        ].join(" ")}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                          <Gift className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-950">
                            {item.name}
                          </p>
                          <p className="mt-1 text-sm leading-5 text-slate-500">
                            {item.description}
                          </p>
                          <p className="mt-3 text-sm font-semibold text-slate-950">
                            +
                            {formatMoney(
                              item.priceMinor,
                            )}
                          </p>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <p className="text-sm font-semibold text-amber-600">
                Final step
              </p>

              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
                Everything look Happy?
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <ReviewItem
                  icon={<Star className="h-5 w-5" />}
                  label="Package"
                  value={selectedPackage.name}
                />

                <ReviewItem
                  icon={<CalendarDays className="h-5 w-5" />}
                  label="Date"
                  value={
                    selectedDate
                      ? `${selectedDate.date} · ${
                          time ||
                          "Time pending"
                        }`
                      : "Choose date & time"
                  }
                />

                <ReviewItem
                  icon={<Users className="h-5 w-5" />}
                  label="Guests"
                  value={`${children} children · ${adults} adults`}
                />

                <ReviewItem
                  icon={<Pizza className="h-5 w-5" />}
                  label="Food"
                  value={food}
                />
              </div>

              <div className="mt-7 rounded-2xl bg-amber-50 p-5">
                <p className="font-semibold text-amber-950">
                  Preview payment
                </p>
                <p className="mt-2 text-sm leading-6 text-amber-900/70">
                  In production, the customer
                  can secure this party with a
                  deposit and receive a digital
                  confirmation automatically.
                  No transaction occurs in this
                  demonstration.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-slate-600 disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setConfirmed(true)
                }
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Preview confirmation
                <CheckCircle2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl">
            <div className="bg-gradient-to-br from-amber-100 via-orange-50 to-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                Your celebration
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                {selectedPackage.name}
              </h3>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
                <Clock3 className="h-4 w-4" />
                {selectedPackage.durationHours}{" "}
                hour experience
              </div>
            </div>

            <div className="space-y-4 p-6 text-sm">
              <SummaryRow
                label="Package"
                value={formatMoney(
                  selectedPackage.startingPriceMinor,
                )}
              />

              {additionalChildren >
                0 && (
                <SummaryRow
                  label={`${additionalChildren} extra ${
                    additionalChildren ===
                    1
                      ? "child"
                      : "children"
                  }`}
                  value={formatMoney(
                    additionalChildrenCost,
                  )}
                />
              )}

              {extras.length > 0 && (
                <SummaryRow
                  label="Selected extras"
                  value={formatMoney(
                    extrasTotal,
                  )}
                />
              )}

              <div className="border-t border-slate-200 pt-4">
                <SummaryRow
                  label="Preview total"
                  value={formatMoney(total)}
                  strong
                />
              </div>

              <div className="rounded-xl bg-slate-950 p-4 text-white">
                <p className="text-xs uppercase tracking-wider text-white/50">
                  Example 30% deposit
                </p>
                <p className="mt-1 text-xl font-semibold">
                  {formatMoney(deposit)}
                </p>
              </div>

              <p className="text-[11px] leading-5 text-slate-400">
                Demonstration pricing only.
                Happy-Park management can set
                final packages, prices,
                deposits and capacity from
                the Business OS.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function GuestCounter({
  icon,
  label,
  value,
  minimum,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  minimum: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center gap-3">
        {icon}
        <p className="font-semibold text-slate-950">
          {label}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            onChange(
              Math.max(
                minimum,
                value - 1,
              ),
            )
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-xl"
        >
          −
        </button>

        <span className="text-3xl font-semibold text-slate-950">
          {value}
        </span>

        <button
          type="button"
          onClick={() =>
            onChange(value + 1)
          }
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-xl text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}

function ReviewItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="text-slate-500">
        {icon}
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-semibold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center justify-between gap-4",
        strong
          ? "text-base font-bold text-slate-950"
          : "text-slate-600",
      ].join(" ")}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
