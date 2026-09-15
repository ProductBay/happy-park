import type { Metadata } from "next";

import { AdmissionDesk } from "@/components/admin/admission/admission-desk";

export const metadata: Metadata = {
  title: "Front Desk Admission | Happy-Park",
  description:
    "Happy-Park front desk guest admission and QR check-in operations.",
};

export default function AdminCheckInPage() {
  return <AdmissionDesk />;
}
