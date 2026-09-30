import type { Metadata } from "next";

import { VisitPreviewPage } from "@/components/visit/visit-preview-page";

export const metadata: Metadata = {
  title: { absolute: "Visit Happy-Park" },
  description:
    "Plan a family day at Happy-Park in Southfield, St Elizabeth. Explore play experiences, animals, food, treats and celebrations.",
};

export default function VisitPage() {
  return <VisitPreviewPage />;
}
