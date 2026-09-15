import type { Metadata } from "next";

import { PartiesPreviewPage } from "@/components/parties/parties-preview-page";

export const metadata: Metadata = {
  title: "Birthday Parties | Happy-Park",
  description:
    "Celebrate birthdays at Happy-Park with play, food and family fun in Southfield, St Elizabeth.",
};

export default function PartiesPage() {
  return <PartiesPreviewPage />;
}
