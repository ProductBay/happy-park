import {
  CalendarDays,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { AdmissionPassCard } from "@/components/customer/admission/admission-pass-card";
import type { CustomerAdmissionBooking } from "@/types/customer-admission-pass";

type CustomerAdmissionPassesProps = {
  booking: CustomerAdmissionBooking;
  preview?: boolean;
};

export function CustomerAdmissionPasses({
  booking,
  preview = false,
}: CustomerAdmissionPassesProps) {
  return (
    <main className="min-h-screen bg-[#f5f2e8]">
      <section className="border-b border-black/5 bg-[#f5f2e8]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#164b33]/55">
            <ShieldCheck className="size-4" />
            Happy-Park
          </div>

          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-[#14271e] sm:text-5xl">
            Your admission passes
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-black/50">
            Keep these passes ready on your phone when you arrive. Each guest has their own secure QR admission credential.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <SummaryChip
              icon={CalendarDays}
              label={formatDate(
                booking.visitDate,
              )}
            />

            <SummaryChip
              icon={MapPin}
              label={booking.location}
            />

            <SummaryChip
              icon={ShieldCheck}
              label={`Booking ${booking.reference}`}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        {preview ? (
          <div className="mb-7 rounded-[24px] border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="font-semibold text-amber-950">
              Customer pass design preview
            </p>

            <p className="mt-1 text-sm leading-6 text-amber-900/65">
              These QR codes intentionally contain non-admission preview values and cannot be accepted by the Happy-Park scanner.
            </p>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          {booking.passes.map(
            (pass) => (
              <AdmissionPassCard
                key={pass.id}
                pass={pass}
                bookingReference={
                  booking.reference
                }
                preview={preview}
              />
            ),
          )}
        </div>

        <div className="mt-8 rounded-[28px] border border-black/5 bg-white p-6">
          <h2 className="font-semibold text-[#14271e]">
            Before you arrive
          </h2>

          <div className="mt-4 grid gap-3 text-sm leading-6 text-black/50 sm:grid-cols-3">
            <p>
              Keep your phone charged and have each QR pass ready.
            </p>

            <p>
              Each QR credential is unique and should only be presented for its assigned guest.
            </p>

            <p>
              If a pass cannot be scanned, staff can verify the printed pass number manually.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function SummaryChip({
  icon: Icon,
  label,
}: {
  icon: typeof CalendarDays;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2.5 text-xs font-medium text-black/55 shadow-sm">
      <Icon className="size-4 text-[#164b33]" />
      {label}
    </div>
  );
}

function formatDate(
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
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  ).format(date);
}
