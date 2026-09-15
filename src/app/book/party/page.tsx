import type { Metadata } from "next";

import { PartyBookingPreview } from "@/components/parties/party-booking-preview";

export const metadata: Metadata = {
  title: "Birthday Parties | Happy-Park",
  description:
    "Plan a Happy-Park birthday celebration with play, food, party extras and a simple guided booking experience.",
};

export default function PartyBookingPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] pb-20 pt-24">
      <PartyBookingPreview />
    </main>
  );
}
