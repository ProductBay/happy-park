import type { Metadata } from "next";

import { AboutPreviewPage } from "@/components/info/about-preview-page";

export const metadata: Metadata = {
  title: "About | Happy-Park",
  description:
    "Discover Happy-Park, a family destination in Southfield, St Elizabeth.",
};

export default function AboutPage() {
  return <AboutPreviewPage />;
}
