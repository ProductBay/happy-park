import type { Metadata } from "next";

import { AttractionsPreviewPage } from "@/components/park/attractions-preview-page";

export const metadata: Metadata = {
  title: "Attractions | Happy-Park",
  description:
    "Discover play, family experiences, celebrations and food at Happy-Park in Southfield, St Elizabeth.",
};

export default function AttractionsPage() {
  return <AttractionsPreviewPage />;
}
