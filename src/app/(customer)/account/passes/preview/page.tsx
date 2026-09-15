import type { Metadata } from "next";

import { CustomerAdmissionPasses } from "@/components/customer/admission/customer-admission-passes";
import type { CustomerAdmissionBooking } from "@/types/customer-admission-pass";

export const metadata: Metadata = {
  title:
    "Admission Pass Preview | Happy-Park",
  description:
    "Preview of the Happy-Park digital admission pass experience.",
};

const previewBooking: CustomerAdmissionBooking =
  {
    reference: "HP-DEMO-2026",
    visitDate: "2026-09-20",
    customerName: "Happy-Park Guest",
    location:
      "Southfield, St. Elizabeth",
    passes: [
      {
        id: "preview-adult-1",
        passNumber:
          "HP-PREVIEW-ADULT",
        credential:
          "HAPPY-PARK-DESIGN-PREVIEW-ADULT-NOT-VALID",
        guestType: "adult",
        sequenceNumber: 1,
        status: "active",
        validDate: "2026-09-20",
      },
      {
        id: "preview-child-2",
        passNumber:
          "HP-PREVIEW-CHILD",
        credential:
          "HAPPY-PARK-DESIGN-PREVIEW-CHILD-NOT-VALID",
        guestType: "child",
        sequenceNumber: 2,
        status: "active",
        validDate: "2026-09-20",
      },
    ],
  };

export default function AdmissionPassPreviewPage() {
  return (
    <CustomerAdmissionPasses
      booking={previewBooking}
      preview
    />
  );
}
