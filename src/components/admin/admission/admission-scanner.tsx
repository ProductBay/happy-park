"use client";

import {
  Camera,
  CameraOff,
  CheckCircle2,
  CircleAlert,
  CircleX,
  LoaderCircle,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { AdmissionScanResult } from "@/types/admission";

type AdmissionScannerProps = {
  liveEnabled: boolean;
};

type CameraState =
  | "idle"
  | "starting"
  | "active"
  | "permission_denied"
  | "unavailable"
  | "error";

type ScanFeedback =
  | {
      type: "accepted";
      title: string;
      message: string;
    }
  | {
      type: "warning";
      title: string;
      message: string;
    }
  | {
      type: "rejected";
      title: string;
      message: string;
    }
  | null;

const HAPPY_PARK_CREDENTIAL_PATTERN =
  /^HP1\.[A-Za-z0-9_-]{20,}$/;

function resultFeedback(
  result: AdmissionScanResult,
): ScanFeedback {
  switch (result.outcome) {
    case "accepted":
      return {
        type: "accepted",
        title: "Guest admitted",
        message:
          result.message ??
          "Happy-Park admission confirmed.",
      };

    case "already_used":
      return {
        type: "warning",
        title: "Pass already used",
        message:
          result.message ??
          "This credential has already been checked in.",
      };

    case "wrong_visit_date":
      return {
        type: "warning",
        title: "Wrong visit date",
        message:
          result.message ??
          "This pass is not valid for today.",
      };

    case "revoked":
      return {
        type: "rejected",
        title: "Pass revoked",
        message:
          result.message ??
          "This credential is no longer valid.",
      };

    case "cancelled":
      return {
        type: "rejected",
        title: "Pass cancelled",
        message:
          result.message ??
          "This admission pass has been cancelled.",
      };

    case "expired":
      return {
        type: "rejected",
        title: "Pass expired",
        message:
          result.message ??
          "This admission pass has expired.",
      };

    case "booking_not_confirmed":
      return {
        type: "warning",
        title: "Booking not ready",
        message:
          result.message ??
          "This booking is not currently eligible for admission.",
      };

    case "invalid":
    default:
      return {
        type: "rejected",
        title: "Invalid pass",
        message:
          result.message ??
          "This QR code is not a valid Happy-Park admission credential.",
      };
  }
}

export function AdmissionScanner({
  liveEnabled,
}: AdmissionScannerProps) {
  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const controlsRef = useRef<{
    stop: () => void;
  } | null>(null);

  const processingRef = useRef(false);
  const lastCredentialRef =
    useRef<string | null>(null);
  const resetTimerRef =
    useRef<number | null>(null);

  const [cameraState, setCameraState] =
    useState<CameraState>("idle");

  const [feedback, setFeedback] =
    useState<ScanFeedback>(null);

  const [processing, setProcessing] =
    useState(false);

  const stopCamera = useCallback(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;

    const stream =
      videoRef.current?.srcObject;

    if (stream instanceof MediaStream) {
      stream
        .getTracks()
        .forEach((track) =>
          track.stop(),
        );
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraState("idle");
  }, []);

  const handleCredential =
    useCallback(
      async (credential: string) => {
        const normalized =
          credential.trim();

        if (
          !HAPPY_PARK_CREDENTIAL_PATTERN.test(
            normalized,
          )
        ) {
          setFeedback({
            type: "rejected",
            title: "Not a Happy-Park pass",
            message:
              "This QR code does not contain a valid Happy-Park admission credential.",
          });

          return;
        }

        if (
          processingRef.current ||
          lastCredentialRef.current ===
            normalized
        ) {
          return;
        }

        processingRef.current = true;
        lastCredentialRef.current =
          normalized;
        setProcessing(true);

        try {
          const response = await fetch(
            "/api/admission/scan",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                credential: normalized,
                gate: "Front Desk",
                deviceId:
                  navigator.userAgent,
              }),
            },
          );

          const result =
            (await response.json()) as
              | AdmissionScanResult
              | {
                  error?: string;
                };

          if (
            !("outcome" in result)
          ) {
            throw new Error(
              result.error ??
                "Unable to verify admission.",
            );
          }

          const nextFeedback =
            resultFeedback(result);

          setFeedback(nextFeedback);

          if (
            nextFeedback?.type ===
            "accepted"
          ) {
            navigator.vibrate?.([
              80,
              40,
              80,
            ]);
          } else {
            navigator.vibrate?.(180);
          }
        } catch (error) {
          console.error(error);

          setFeedback({
            type: "rejected",
            title:
              "Admission service unavailable",
            message:
              error instanceof Error
                ? error.message
                : "Unable to verify this pass.",
          });
        } finally {
          setProcessing(false);

          window.setTimeout(() => {
            processingRef.current =
              false;
          }, 1200);

          if (resetTimerRef.current) {
            window.clearTimeout(
              resetTimerRef.current,
            );
          }

          resetTimerRef.current =
            window.setTimeout(() => {
              lastCredentialRef.current =
                null;
              setFeedback(null);
            }, 3500);
        }
      },
      [],
    );

  const startCamera =
    useCallback(async () => {
      if (
        !liveEnabled ||
        !videoRef.current
      ) {
        return;
      }

      setCameraState("starting");
      setFeedback(null);

      try {
        const {
          BrowserQRCodeReader,
        } = await import(
          "@zxing/browser"
        );

        const reader =
          new BrowserQRCodeReader(
            undefined,
            {
              delayBetweenScanAttempts:
                150,
              delayBetweenScanSuccess:
                1000,
            },
          );

        const controls =
          await reader.decodeFromConstraints(
            {
              video: {
                facingMode: {
                  ideal: "environment",
                },
                width: {
                  ideal: 1280,
                },
                height: {
                  ideal: 720,
                },
              },
              audio: false,
            },
            videoRef.current,
            (result) => {
              if (!result) {
                return;
              }

              void handleCredential(
                result.getText(),
              );
            },
          );

        controlsRef.current = controls;
        setCameraState("active");
      } catch (error) {
        console.error(
          "Camera startup failed:",
          error,
        );

        if (
          error instanceof DOMException &&
          (error.name ===
            "NotAllowedError" ||
            error.name ===
              "PermissionDeniedError")
        ) {
          setCameraState(
            "permission_denied",
          );

          return;
        }

        if (
          error instanceof DOMException &&
          (error.name ===
            "NotFoundError" ||
            error.name ===
              "DevicesNotFoundError")
        ) {
          setCameraState(
            "unavailable",
          );

          return;
        }

        setCameraState("error");
      }
    }, [
      handleCredential,
      liveEnabled,
    ]);

  useEffect(() => {
    return () => {
      controlsRef.current?.stop();

      if (resetTimerRef.current) {
        window.clearTimeout(
          resetTimerRef.current,
        );
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#10261d] p-4 shadow-2xl shadow-black/20 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(167,215,91,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(127,200,215,0.12),transparent_30%)]" />

      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
              Admission scanner
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Scan guest pass
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-white/55">
              Position the Happy-Park QR pass inside the frame.
            </p>
          </div>

          <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white">
            <Camera className="size-5" />
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 bg-black sm:aspect-[16/10]">
          <video
            ref={videoRef}
            muted
            playsInline
            className={[
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
              cameraState === "active"
                ? "opacity-100"
                : "opacity-20",
            ].join(" ")}
          />

          <div className="pointer-events-none absolute inset-7 rounded-[24px] border border-white/15 sm:inset-12">
            <span className="absolute -left-px -top-px h-10 w-10 rounded-tl-2xl border-l-2 border-t-2 border-[#a7d75b]" />
            <span className="absolute -right-px -top-px h-10 w-10 rounded-tr-2xl border-r-2 border-t-2 border-[#a7d75b]" />
            <span className="absolute -bottom-px -left-px h-10 w-10 rounded-bl-2xl border-b-2 border-l-2 border-[#a7d75b]" />
            <span className="absolute -bottom-px -right-px h-10 w-10 rounded-br-2xl border-b-2 border-r-2 border-[#a7d75b]" />

            {cameraState ===
            "active" ? (
              <div className="absolute left-4 right-4 top-1/2 h-px bg-[#a7d75b]/80 shadow-[0_0_18px_rgba(167,215,91,0.9)]" />
            ) : null}
          </div>

          {cameraState !== "active" &&
          !feedback ? (
            <CameraOverlay
              state={cameraState}
              liveEnabled={
                liveEnabled
              }
              onStart={() => {
                void startCamera();
              }}
            />
          ) : null}

          {processing ? (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <LoaderCircle className="size-9 animate-spin text-white" />

                <p className="mt-4 text-sm font-semibold text-white">
                  Verifying pass...
                </p>
              </div>
            </div>
          ) : null}

          {feedback ? (
            <ScanResultOverlay
              feedback={feedback}
            />
          ) : null}

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs font-medium text-white/70 backdrop-blur">
              <ShieldCheck className="size-4 text-[#a7d75b]" />
              Secure credential verification
            </div>
          </div>
        </div>

        {cameraState === "active" ? (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={stopCamera}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <CameraOff className="size-4" />
              Stop camera
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function CameraOverlay({
  state,
  liveEnabled,
  onStart,
}: {
  state: CameraState;
  liveEnabled: boolean;
  onStart: () => void;
}) {
  const unavailable =
    state ===
      "permission_denied" ||
    state === "unavailable" ||
    state === "error";

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/45 px-7 text-center backdrop-blur-[2px]">
      <div className="flex size-16 items-center justify-center rounded-3xl bg-white/10 text-white backdrop-blur">
        {state === "starting" ? (
          <LoaderCircle className="size-7 animate-spin" />
        ) : unavailable ? (
          <CameraOff className="size-7" />
        ) : (
          <ScanLine className="size-7" />
        )}
      </div>

      <p className="mt-5 text-base font-semibold text-white">
        {!liveEnabled
          ? "Scanner preview mode"
          : state ===
              "permission_denied"
            ? "Camera permission denied"
            : state ===
                "unavailable"
              ? "No camera available"
              : state === "error"
                ? "Camera unavailable"
                : state ===
                    "starting"
                  ? "Starting camera..."
                  : "Ready to scan"}
      </p>

      <p className="mt-2 max-w-sm text-sm leading-6 text-white/55">
        {!liveEnabled
          ? "Live admissions remain disabled until the Happy-Park database is activated."
          : state ===
              "permission_denied"
            ? "Allow camera access in your browser settings, then try again."
            : state ===
                "unavailable"
              ? "No compatible camera was found. Use manual pass lookup instead."
              : state === "error"
                ? "The camera could not be started. Manual pass lookup remains available."
                : "Use the rear camera to scan a Happy-Park admission QR code."}
      </p>

      {liveEnabled &&
      state === "idle" ? (
        <button
          type="button"
          onClick={onStart}
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#a7d75b] px-5 text-sm font-semibold text-[#10261d] transition hover:brightness-105"
        >
          <Camera className="size-4" />
          Start camera
        </button>
      ) : null}

      {liveEnabled &&
      unavailable ? (
        <button
          type="button"
          onClick={onStart}
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-[#10261d]"
        >
          <Camera className="size-4" />
          Try again
        </button>
      ) : null}
    </div>
  );
}

function ScanResultOverlay({
  feedback,
}: {
  feedback: NonNullable<ScanFeedback>;
}) {
  const config =
    feedback.type === "accepted"
      ? {
          Icon: CheckCircle2,
          shell:
            "bg-emerald-950/88",
          iconShell:
            "bg-emerald-300 text-emerald-950",
        }
      : feedback.type ===
          "warning"
        ? {
            Icon: CircleAlert,
            shell:
              "bg-amber-950/88",
            iconShell:
              "bg-amber-300 text-amber-950",
          }
        : {
            Icon: CircleX,
            shell:
              "bg-rose-950/88",
            iconShell:
              "bg-rose-300 text-rose-950",
          };

  const Icon = config.Icon;

  return (
    <div
      className={[
        "absolute inset-0 z-30 flex flex-col items-center justify-center px-8 text-center backdrop-blur-md",
        config.shell,
      ].join(" ")}
    >
      <div
        className={[
          "flex size-20 items-center justify-center rounded-[28px]",
          config.iconShell,
        ].join(" ")}
      >
        <Icon className="size-9" />
      </div>

      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
        {feedback.title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-white/70">
        {feedback.message}
      </p>
    </div>
  );
}
