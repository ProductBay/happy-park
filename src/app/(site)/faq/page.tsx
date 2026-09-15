import type { Metadata } from "next";

import { FaqPreviewPage } from "@/components/info/faq-preview-page";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Happy-Park",
  description:
    "Answers to common questions about visiting, food, parties and experiences at Happy-Park.",
};

export default function FaqPage() {
  return <FaqPreviewPage />;
}
