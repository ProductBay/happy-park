import {
  CalendarDays,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { AdmissionDashboardClient } from "@/components/admin/admission/admission-dashboard-client";
import { AdmissionScanner } from "@/components/admin/admission/admission-scanner";
import { ManualPassLookup } from "@/components/admin/admission/manual-pass-lookup";
import { ScannerStatusCard } from "@/components/admin/admission/scanner-status-card";
import { isHappyParkDatabaseEnabled } from "@/lib/db/happy-park-db";

function jamaicaDisplayDate() {
  return new Intl.DateTimeFormat("en-JM", {
    timeZone: "America/Jamaica",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

export function AdmissionDesk() {
  const liveEnabled =
    isHappyParkDatabaseEnabled();

  return (
    <div className="min-h-screen bg-[#f5f2e8]">
      <header className="border-b border-black/5 bg-[#f5f2e8]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#164b33]/55">
              <ShieldCheck className="size-4" />
              Happy-Park Operations
            </div>

            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#14271e] sm:text-4xl">
              Front Desk Admission
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
              Scan, verify and manage today&apos;s Happy-Park guest entry.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2.5 text-xs font-medium text-black/55 shadow-sm">
              <CalendarDays className="size-4 text-[#164b33]" />
              {jamaicaDisplayDate()}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2.5 text-xs font-medium text-black/55 shadow-sm">
              <MapPin className="size-4 text-[#164b33]" />
              Southfield, St. Elizabeth
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        {!liveEnabled ? (
          <div className="mb-6">
            <ScannerStatusCard
              state="warning"
              title="Admission system is in preview mode"
              message="The front-desk interface is ready, but live guest admissions remain disabled until the Happy-Park database is activated."
            />
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.55fr)]">
          <AdmissionScanner
            liveEnabled={liveEnabled}
          />

          <ManualPassLookup
            liveEnabled={liveEnabled}
          />
        </div>

        <section className="mt-8">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#164b33]/45">
              Today&apos;s operations
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#14271e]">
              Admission overview
            </h2>
          </div>

          <AdmissionDashboardClient
            liveEnabled={liveEnabled}
          />
        </section>
      </main>
    </div>
  );
}
