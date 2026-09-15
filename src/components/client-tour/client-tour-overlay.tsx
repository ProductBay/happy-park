"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronUp,
  Compass,
  Eye,
  Minimize2,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";

import { clientTourSteps } from "@/lib/client-tour/client-tour-steps";
import { useClientTour } from "./client-tour-provider";

export function ClientTourOverlay() {
  const {
    ready,
    active,
    currentStepIndex,
    currentStep,
    completedSteps,
    minimized,
    progress,
    exitTour,
    nextStep,
    previousStep,
    openCurrentExperience,
    continueAfterTesting,
    minimize,
    expand,
    restartTour,
  } = useClientTour();

  if (!ready || !active) {
    return null;
  }

  if (minimized) {
    const minimizedCtaLabel =
      currentStep.continueLabel ?? "Done — Next Step";

    return (
      <div className="fixed inset-x-0 bottom-4 z-[200] px-3 sm:bottom-6 sm:px-6">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 text-white shadow-2xl shadow-slate-950/30">
          <div className="h-1.5 bg-white/10">
            <div
              className="h-full bg-orange-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500">
                <Compass className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-400">
                  Guided tour active
                </p>

                <p className="mt-1 text-sm font-black leading-5 text-white">
                  {currentStep.title}
                </p>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/45">
                  Step {currentStepIndex + 1} of{" "}
                  {clientTourSteps.length} · {progress}% complete
                </p>
              </div>

              <button
                type="button"
                onClick={exitTour}
                aria-label="Exit guided tour"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-orange-400/20 bg-orange-500/10 px-4 py-3">
              <p className="text-xs leading-5 text-white/75">
                Explore this page freely. You do not need to reopen
                the guide to continue. When you are ready, press
                <strong className="text-white">
                  {" "}NEXT STEP{" "}
                </strong>
                below.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-[auto_1fr] gap-2 sm:grid-cols-[auto_auto_1fr]">
              {currentStepIndex > 0 ? (
                <button
                  type="button"
                  onClick={previousStep}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-black text-white/75 transition hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back</span>
                </button>
              ) : null}

              <button
                type="button"
                onClick={expand}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-xs font-black text-white transition hover:bg-white/15"
              >
                <ChevronUp className="h-4 w-4 text-orange-400" />
                <span className="hidden sm:inline">
                  Expand Guide
                </span>
                <span className="sm:hidden">
                  Guide
                </span>
              </button>

              <button
                type="button"
                onClick={continueAfterTesting}
                className="col-span-2 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-400 sm:col-span-1"
              >
                <Check className="h-4 w-4" />

                <span>
                  {minimizedCtaLabel}
                </span>

                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isWelcome = currentStep.id === "welcome";
  const isComplete = currentStep.id === "complete";
  const isWorkflow = currentStep.mode === "workflow";

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />

      <div className="pointer-events-auto absolute bottom-4 left-1/2 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 sm:bottom-6">
        <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl shadow-slate-950/25">
          <div className="h-1.5 bg-slate-100">
            <div
              className="h-full bg-orange-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={[
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                    currentStep.section === "business"
                      ? "bg-slate-950 text-white"
                      : "bg-orange-100 text-orange-600",
                  ].join(" ")}
                >
                  {currentStep.section === "business" ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
                    {currentStep.eyebrow}
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {currentStepIndex + 1} /{" "}
                    {clientTourSteps.length}
                    {" · "}
                    {completedSteps.length} explored
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                {!isWelcome ? (
                  <button
                    type="button"
                    onClick={minimize}
                    aria-label="View full page"
                    className="inline-flex min-h-9 items-center gap-2 rounded-full bg-orange-100 px-3 text-[10px] font-black uppercase tracking-wider text-orange-700"
                  >
                    <Minimize2 className="h-4 w-4" /><span className="hidden sm:inline">View Full Page</span>
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={exitTour}
                  aria-label="Exit tour"
                  className="inline-flex min-h-9 items-center gap-2 rounded-full bg-orange-100 px-3 text-[10px] font-black uppercase tracking-wider text-orange-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h2 className="mt-5 text-2xl font-black leading-tight tracking-[-0.03em] text-slate-950 sm:text-3xl">
              {currentStep.title}
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
              {currentStep.description}
            </p>

            {isWorkflow ? (
              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-orange-50 p-4">
                <Compass className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-orange-700">
                    You are about to test this feature
                  </p>

                  <p className="mt-1 text-xs leading-6 text-slate-600">
                    We will minimize the guide so you can explore the
                    full page. Your tour stays active. Look for the
                    orange tour bar at the bottom and click
                    <strong className="text-slate-950">
                      {" "}EXPAND GUIDE{" "}
                    </strong>
                    for instructions, or
                    <strong className="text-slate-950">
                      {" "}DONE — CONTINUE TOUR{" "}
                    </strong>
                    when you are finished testing.
                  </p>
                </div>
              </div>
            ) : null}

            {!isWelcome && !isComplete ? (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                  <Minimize2 className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-black text-slate-950">
                    Want to explore this page in full?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Click
                    <strong className="text-orange-700">
                      {" "}VIEW FULL PAGE{" "}
                    </strong>
                    above. Your guided tour will stay active while
                    you explore. Use
                    <strong className="text-orange-700">
                      {" "}EXPAND GUIDE{" "}
                    </strong>
                    at the bottom whenever you want to return.
                  </p>
                </div>
              </div>
            ) : null}

            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-2">
                {currentStepIndex > 0 && !isComplete ? (
                  <button
                    type="button"
                    onClick={previousStep}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 px-4 text-xs font-black text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                ) : null}

                {isComplete ? (
                  <button
                    type="button"
                    onClick={restartTour}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 px-4 text-xs font-black text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Restart
                  </button>
                ) : null}
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {!isWelcome && !isComplete ? (
                  <button
                    type="button"
                    onClick={openCurrentExperience}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:border-orange-300 hover:bg-orange-50"
                  >
                    {currentStep.actionLabel}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={nextStep}
                  className={[
                    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5",
                    !isWelcome && !isComplete
                      ? "bg-orange-500 hover:bg-orange-400"
                      : "bg-slate-950 hover:bg-slate-800",
                  ].join(" ")}
                >
                  {isComplete ? (
                    <>
                      <Check className="h-4 w-4" />
                      Finish Tour
                    </>
                  ) : isWelcome ? (
                    <>
                      Start Tour
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next Step
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              {!isWelcome && !isComplete ? (
                <p className="mt-3 text-center text-[11px] font-semibold leading-5 text-slate-400">
                  Explore this feature or continue directly to the next
                  part of the guided tour.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}









