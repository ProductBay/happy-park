"use client";

import {
  CheckCircle2,
  CircleAlert,
  CircleX,
  LoaderCircle,
  ScanLine,
} from "lucide-react";

type ScannerState =
  | "idle"
  | "scanning"
  | "accepted"
  | "warning"
  | "rejected";

type ScannerStatusCardProps = {
  state: ScannerState;
  title: string;
  message: string;
};

const stateConfig = {
  idle: {
    icon: ScanLine,
    shell:
      "border-white/10 bg-white/[0.04]",
    iconShell:
      "bg-white/10 text-white",
  },
  scanning: {
    icon: LoaderCircle,
    shell:
      "border-sky-300/20 bg-sky-300/[0.06]",
    iconShell:
      "bg-sky-300/15 text-sky-200",
  },
  accepted: {
    icon: CheckCircle2,
    shell:
      "border-emerald-300/20 bg-emerald-300/[0.08]",
    iconShell:
      "bg-emerald-300/15 text-emerald-200",
  },
  warning: {
    icon: CircleAlert,
    shell:
      "border-amber-300/20 bg-amber-300/[0.08]",
    iconShell:
      "bg-amber-300/15 text-amber-200",
  },
  rejected: {
    icon: CircleX,
    shell:
      "border-rose-300/20 bg-rose-300/[0.08]",
    iconShell:
      "bg-rose-300/15 text-rose-200",
  },
} satisfies Record<
  ScannerState,
  {
    icon: typeof ScanLine;
    shell: string;
    iconShell: string;
  }
>;

export function ScannerStatusCard({
  state,
  title,
  message,
}: ScannerStatusCardProps) {
  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <div
      className={[
        "rounded-[28px] border p-5 transition-all duration-300",
        config.shell,
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <div
          className={[
            "flex size-11 shrink-0 items-center justify-center rounded-2xl",
            config.iconShell,
          ].join(" ")}
        >
          <Icon
            className={[
              "size-5",
              state === "scanning"
                ? "animate-spin"
                : "",
            ].join(" ")}
          />
        </div>

        <div>
          <p className="font-semibold text-white">
            {title}
          </p>

          <p className="mt-1 text-sm leading-6 text-white/60">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
