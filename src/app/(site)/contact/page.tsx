import type { Metadata } from "next";

import { ContactPreviewPage } from "@/components/info/contact-preview-page";

export const metadata: Metadata = {
  title: "Contact | Happy-Park",
  description:
    "Get information about visiting, birthdays and experiences at Happy-Park.",
};

export default function ContactPage() {
  return <ContactPreviewPage />;
}
