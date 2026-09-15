import type { Metadata } from "next";

import { BusinessOsPreview } from "@/components/admin/business-os-preview";

export const metadata: Metadata = {
  title: "Business OS | Happy-Park",
  description:
    "Happy-Park operational dashboard preview for bookings, admissions, food, shop, deliveries and business management.",
};

export default function AdminPage() {
  return <BusinessOsPreview />;
}
