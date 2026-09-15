import type { Metadata } from "next";
import { VisitBookingExperience } from "@/components/booking/visit-booking-experience";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Plan your Happy-Park visit in Southfield, St. Elizabeth.",
};

export default function BookPage() {
  return <VisitBookingExperience />;
}
