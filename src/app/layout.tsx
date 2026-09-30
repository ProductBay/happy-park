import type { Metadata } from "next";
import "./globals.css";
import { ClientPreviewGate } from "@/components/client-preview/client-preview-gate";
import { HappyParkCartProvider } from "@/lib/cart/cart-provider";
import { ExperienceShell } from "@/components/layout/experience-shell";

export const metadata: Metadata = {
  title: {
    default: "Happy-Park | Play. Eat. Shop. Enjoy.",
    template: "%s | Happy-Park",
  },
  description:
    "Happy-Park is a family entertainment, food, celebration and shopping destination in Southfield, St. Elizabeth, Jamaica.",
  keywords: [
    "Happy-Park",
    "Southfield Jamaica",
    "St Elizabeth attractions",
    "family park Jamaica",
    "birthday parties Jamaica",
    "pizza Southfield Jamaica",
    "family entertainment Jamaica",
  ],
  openGraph: {
    title: "Happy-Park | Play. Eat. Shop. Enjoy.",
    description:
      "Family fun, birthday celebrations, food, natural products and delivery — all from Happy-Park.",
    type: "website",
    locale: "en_JM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HappyParkCartProvider>
          <ClientPreviewGate>
            <ExperienceShell>{children}</ExperienceShell>
          </ClientPreviewGate>
        </HappyParkCartProvider>
      </body>
    </html>
  );
}




