"use client";

import {
  CalendarDays,
  CheckCircle2,
  Expand,
  MapPin,
  ShieldCheck,
  TicketCheck,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import type { CustomerAdmissionPass } from "@/types/customer-admission-pass";

type AdmissionPassCardProps = {
  bookingReference: string;
  pass: CustomerAdmissionPass;
  preview?: boolean;
};

export function AdmissionPassCard({
  bookingReference,
  pass,
  preview = false,
}: AdmissionPassCardProps) {
  const [fullscreen, setFullscreen] =
    useState(false);

  return (
    <>
      <article className="relative overflow-hidden rounded-[34px] border border-black/5 bg-[#10261d] shadow-xl shadow-black/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(167,215,91,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(127,200,215,0.12),transparent_32%)]" />

        <div className="relative p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                <ShieldCheck className="size-3.5" />
                Happy-Park Admission
              </div>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {pass.guestType === "adult"
                  ? "Adult Pass"
                  : "Child Pass"}
              </h2>

              <p className="mt-1 text-sm text-white/50">
                Pass {pass.sequenceNumber}
              </p>
            </div>

            <div className="rounded-full bg-[#a7d75b] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#10261d]">
              {preview
                ? "Preview"
                : pass.status}
            </div>
          </div>

          {preview ? (
            <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-200">
                Design preview — not valid for entry
              </p>
            </div>
          ) : null}

          <div className="mt-6 rounded-[28px] bg-white p-5">
            <div className="flex justify-center">
              <QRCodeSVG
                value={pass.credential}
                size={220}
                level="H"
                bgColor="#ffffff"
                fgColor="#10261d"
                marginSize={1}
                className="h-auto w-full max-w-[220px]"
                title={`Happy-Park pass ${pass.passNumber}`}
              />
            </div>

            <div className="mt-5 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/35">
                Present at entrance
              </p>

              <p className="mt-2 font-mono text-sm font-semibold tracking-[0.08em] text-[#14271e]">
                {pass.passNumber}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Detail
              icon={CalendarDays}
              label="Visit"
              value={formatVisitDate(
                pass.validDate,
              )}
            />

            <Detail
              icon={UserRound}
              label="Guest"
              value={
                pass.guestType === "adult"
                  ? "Adult"
                  : "Child"
              }
            />

            <Detail
              icon={TicketCheck}
              label="Booking"
              value={bookingReference}
            />

            <Detail
              icon={MapPin}
              label="Location"
              value="Southfield"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              setFullscreen(true)
            }
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Expand className="size-4" />
            Show full-screen pass
          </button>
        </div>

        <div className="relative border-t border-dashed border-white/15 px-6 py-4">
          <div className="flex items-center justify-center gap-2 text-xs text-white/45">
            <CheckCircle2 className="size-3.5 text-[#a7d75b]" />
            One pass per guest
          </div>
        </div>
      </article>

      {fullscreen ? (
        <FullscreenPass
          pass={pass}
          bookingReference={
            bookingReference
          }
          preview={preview}
          onClose={() =>
            setFullscreen(false)
          }
        />
      ) : null}
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.05] p-3">
      <div className="flex items-center gap-2 text-white/40">
        <Icon className="size-3.5" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-sm font-medium text-white">
        {value}
      </p>
    </div>
  );
}

function FullscreenPass({
  pass,
  bookingReference,
  preview,
  onClose,
}: {
  pass: CustomerAdmissionPass;
  bookingReference: string;
  preview: boolean;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#10261d] px-5 py-5 sm:px-8">
      <div className="mx-auto flex w-full max-w-lg items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Happy-Park
          </p>

          <p className="mt-1 font-semibold text-white">
            {pass.guestType === "adult"
              ? "Adult Admission"
              : "Child Admission"}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close full-screen pass"
          className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-white"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center">
        {preview ? (
          <div className="mb-5 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-amber-200">
            Preview — not valid
          </div>
        ) : null}

        <div className="w-full rounded-[36px] bg-white p-7 shadow-2xl">
          <QRCodeSVG
            value={pass.credential}
            size={360}
            level="H"
            bgColor="#ffffff"
            fgColor="#10261d"
            marginSize={1}
            className="mx-auto h-auto w-full"
            title={`Happy-Park pass ${pass.passNumber}`}
          />

          <div className="mt-6 text-center">
            <p className="font-mono text-base font-semibold tracking-[0.08em] text-[#14271e]">
              {pass.passNumber}
            </p>

            <p className="mt-2 text-xs font-medium text-black/40">
              Booking {bookingReference}
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-sm text-center text-sm leading-6 text-white/55">
          Hold your screen steady and present this QR code to Happy-Park staff at the entrance.
        </p>
      </div>
    </div>
  );
}

function formatVisitDate(
  value: string,
) {
  const [year, month, day] =
    value.split("-").map(Number);

  const date = new Date(
    Date.UTC(year, month - 1, day),
  );

  return new Intl.DateTimeFormat(
    "en-JM",
    {
      timeZone: "UTC",
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(date);
}
