import type { Metadata } from "next";
import {
  LockKeyhole,
  ShieldCheck,
  TicketCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "My Admission Passes | Happy-Park",
};

export default function AdmissionPassesPage() {
  return (
    <main className="min-h-screen bg-[#f5f2e8] px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#164b33]/55">
          <ShieldCheck className="size-4" />
          Happy-Park
        </div>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#14271e] sm:text-5xl">
          My admission passes
        </h1>

        <div className="mt-8 rounded-[32px] border border-black/5 bg-white p-8 shadow-sm">
          <div className="flex size-14 items-center justify-center rounded-3xl bg-[#164b33]/7 text-[#164b33]">
            <LockKeyhole className="size-6" />
          </div>

          <h2 className="mt-6 text-xl font-semibold text-[#14271e]">
            Secure pass access is being prepared
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-black/50">
            Confirmed Happy-Park admission passes will appear here through the secure customer access layer after booking and payment verification.
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-2xl bg-[#f5f2e8] px-4 py-3 text-sm font-medium text-[#164b33]">
            <TicketCheck className="size-4" />
            Only verified customer passes will be displayed here.
          </div>
        </div>
      </div>
    </main>
  );
}
