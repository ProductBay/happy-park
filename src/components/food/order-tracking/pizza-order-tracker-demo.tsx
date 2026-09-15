"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bike,
  Check,
  ChefHat,
  Clock3,
  Flame,
  PackageCheck,
  Pizza,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  demoPizzaOrder,
  pizzaOrderStages,
  type PizzaOrderStage,
} from "@/lib/food/demo-pizza-order";

const stageOrder: PizzaOrderStage[] = [
  "received",
  "preparing",
  "oven",
  "packaging",
  "ready",
  "slyde",
  "delivered",
];

const DEMO_PREP_SECONDS = 15;
const DEMO_OVEN_SECONDS = 45;
const DEMO_PACKAGING_SECONDS = 15;

function money(minor: number) {
  return new Intl.NumberFormat("en-JM", {
    style: "currency",
    currency: "JMD",
    maximumFractionDigits: 0,
  }).format(minor / 100);
}

function formatTimer(seconds: number) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const remaining = safe % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remaining,
  ).padStart(2, "0")}`;
}

function stageIcon(stage: PizzaOrderStage) {
  if (stage === "received") return <Clock3 className="h-7 w-7" />;
  if (stage === "preparing") return <ChefHat className="h-7 w-7" />;
  if (stage === "oven") return <Flame className="h-7 w-7" />;
  if (stage === "packaging") return <PackageCheck className="h-7 w-7" />;
  if (stage === "ready") return <Check className="h-7 w-7" />;
  if (stage === "slyde") return <Bike className="h-7 w-7" />;
  return <Sparkles className="h-7 w-7" />;
}

export function PizzaOrderTrackerDemo() {
  const [stage, setStage] =
    useState<PizzaOrderStage>(demoPizzaOrder.stage);

  const [prepSeconds, setPrepSeconds] =
    useState(DEMO_PREP_SECONDS);

  const [ovenSeconds, setOvenSeconds] =
    useState(DEMO_OVEN_SECONDS);

  const [packagingSeconds, setPackagingSeconds] =
    useState(DEMO_PACKAGING_SECONDS);

  const currentIndex = stageOrder.indexOf(stage);

  const currentStage =
    pizzaOrderStages.find((item) => item.id === stage) ??
    pizzaOrderStages[0];

  const currentIcon = stageIcon(stage);

  useEffect(() => {
    if (stage !== "preparing" || prepSeconds <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setPrepSeconds((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [stage, prepSeconds]);

  useEffect(() => {
    if (stage !== "oven" || ovenSeconds <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setOvenSeconds((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [stage, ovenSeconds]);

  useEffect(() => {
    if (stage !== "packaging" || packagingSeconds <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setPackagingSeconds((value) =>
        Math.max(0, value - 1),
      );
    }, 1000);

    return () => window.clearInterval(timer);
  }, [stage, packagingSeconds]);

  const remainingSeconds = useMemo(() => {
    if (stage === "received") {
      return (
        DEMO_PREP_SECONDS +
        DEMO_OVEN_SECONDS +
        DEMO_PACKAGING_SECONDS
      );
    }

    if (stage === "preparing") {
      return (
        prepSeconds +
        DEMO_OVEN_SECONDS +
        DEMO_PACKAGING_SECONDS
      );
    }

    if (stage === "oven") {
      return ovenSeconds + DEMO_PACKAGING_SECONDS;
    }

    if (stage === "packaging") {
      return packagingSeconds;
    }

    return 0;
  }, [
    stage,
    prepSeconds,
    ovenSeconds,
    packagingSeconds,
  ]);

  const progress =
    ((currentIndex + 1) / stageOrder.length) * 100;

  function setDemoStage(next: PizzaOrderStage) {
    setStage(next);

    if (next === "preparing") {
      setPrepSeconds(DEMO_PREP_SECONDS);
    }

    if (next === "oven") {
      setOvenSeconds(DEMO_OVEN_SECONDS);
    }

    if (next === "packaging") {
      setPackagingSeconds(DEMO_PACKAGING_SECONDS);
    }
  }

  function resetDemo() {
    setStage("received");
    setPrepSeconds(DEMO_PREP_SECONDS);
    setOvenSeconds(DEMO_OVEN_SECONDS);
    setPackagingSeconds(DEMO_PACKAGING_SECONDS);
  }

  return (
    <main className="min-h-screen bg-[#f6f4ef] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
              Happy-Park Food
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Your pizza journey
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Order {demoPizzaOrder.reference}
            </p>
          </div>

          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold shadow-sm">
            {money(demoPizzaOrder.totalMinor)}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 px-6 py-8 sm:px-8">
              <div className="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-white/20" />

              <div className="relative">
                <div className="mb-7 flex items-center justify-between gap-4">
                  <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
                      Live Kitchen Status
                    </p>

                    <p className="mt-1 font-black">
                      {currentStage.label}
                    </p>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-xl">
                    {currentIcon}
                  </div>
                </div>

                <div className="flex min-h-56 flex-col items-center justify-center text-center">
                  <div
                    className={[
                      "relative flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-orange-700 bg-yellow-100 shadow-2xl",
                      stage === "oven"
                        ? "animate-pulse"
                        : "",
                    ].join(" ")}
                  >
                    <Pizza className="h-16 w-16 text-orange-600" />

                    {stage === "oven" ? (
                      <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                        <Flame className="h-6 w-6" />
                      </div>
                    ) : null}
                  </div>

                  <h2 className="mt-6 text-2xl font-black sm:text-3xl">
                    {currentStage.customerCopy}
                  </h2>

                  {stage === "oven" ? (
                    <div className="mt-5 rounded-2xl bg-slate-950 px-6 py-4 text-white shadow-xl">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                        Oven countdown
                      </p>

                      <p className="mt-1 font-mono text-4xl font-black tabular-nums">
                        {formatTimer(ovenSeconds)}
                      </p>
                    </div>
                  ) : null}

                  {remainingSeconds > 0 &&
                  stage !== "oven" ? (
                    <div className="mt-5 flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-bold shadow-md">
                      <Clock3 className="h-4 w-4 text-orange-600" />
                      Demo estimate{" "}
                      {formatTimer(remainingSeconds)}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between text-xs font-bold">
                  <span>Order progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-700"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {pizzaOrderStages.map((item, index) => {
                  const complete = index < currentIndex;
                  const active = index === currentIndex;

                  return (
                    <div
                      key={item.id}
                      className={[
                        "rounded-2xl border p-4 transition",
                        active
                          ? "border-orange-500 bg-orange-50"
                          : complete
                            ? "border-emerald-200 bg-emerald-50"
                            : "border-slate-200 bg-white",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "mb-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black",
                          complete
                            ? "bg-emerald-500 text-white"
                            : active
                              ? "bg-orange-500 text-white"
                              : "bg-slate-100 text-slate-400",
                        ].join(" ")}
                      >
                        {complete ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      <p className="text-sm font-black">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <aside className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">
                  Demo Kitchen Control
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Happy-Park Kitchen
                </h2>
              </div>

              <ChefHat className="h-7 w-7 text-orange-400" />
            </div>

            <p className="mt-3 text-sm leading-6 text-white/55">
              Preview controls simulate the staff workflow.
              Production orders will use authenticated kitchen
              actions and persisted order events.
            </p>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/45">
                Current order
              </p>

              <p className="mt-1 font-black">
                {demoPizzaOrder.pizzaName}
              </p>

              <p className="mt-1 text-sm text-white/50">
                {demoPizzaOrder.reference}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <KitchenButton
                active={stage === "preparing"}
                complete={currentIndex > 1}
                label="Start preparation"
                detail={
                  stage === "preparing"
                    ? formatTimer(prepSeconds)
                    : "Kitchen begins making the pizza"
                }
                onClick={() => setDemoStage("preparing")}
              />

              <KitchenButton
                active={stage === "oven"}
                complete={currentIndex > 2}
                label="Put pizza in oven"
                detail={
                  stage === "oven"
                    ? `${formatTimer(ovenSeconds)} remaining`
                    : "Starts the live oven countdown"
                }
                onClick={() => setDemoStage("oven")}
              />

              <KitchenButton
                active={stage === "packaging"}
                complete={currentIndex > 3}
                label="Start packaging"
                detail={
                  stage === "packaging"
                    ? formatTimer(packagingSeconds)
                    : "Pizza leaves the oven"
                }
                onClick={() => setDemoStage("packaging")}
              />

              <KitchenButton
                active={stage === "ready"}
                complete={currentIndex > 4}
                label="Mark order ready"
                detail="Ready for SLYDE handoff"
                onClick={() => setDemoStage("ready")}
              />

              <KitchenButton
                active={stage === "slyde"}
                complete={currentIndex > 5}
                label="SLYDE picked up"
                detail="Customer sees out for delivery"
                onClick={() => setDemoStage("slyde")}
              />

              <KitchenButton
                active={stage === "delivered"}
                complete={false}
                label="Mark delivered"
                detail="Complete the demo journey"
                onClick={() => setDemoStage("delivered")}
              />
            </div>

            <button
              type="button"
              onClick={resetDemo}
              className="mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
              Reset demo
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-white/40">
              <Bike className="h-4 w-4" />
              Delivery powered by SLYDE
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function KitchenButton({
  label,
  detail,
  active,
  complete,
  onClick,
}: {
  label: string;
  detail: string;
  active: boolean;
  complete: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition",
        active
          ? "border-orange-400 bg-orange-500 text-white"
          : complete
            ? "border-emerald-400/30 bg-emerald-400/10"
            : "border-white/10 bg-white/5 hover:bg-white/10",
      ].join(" ")}
    >
      <div>
        <p className="text-sm font-black">{label}</p>

        <p
          className={[
            "mt-1 text-xs",
            active ? "text-white/75" : "text-white/45",
          ].join(" ")}
        >
          {detail}
        </p>
      </div>

      {complete ? (
        <Check className="h-5 w-5 shrink-0 text-emerald-400" />
      ) : active ? (
        <Sparkles className="h-5 w-5 shrink-0" />
      ) : null}
    </button>
  );
}

