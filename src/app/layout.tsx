import type { Metadata } from "next";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/navigation/navbar";
import { FloatingWhatsapp } from "@/components/shared/floating-whatsapp";
import { ClientTourShell } from "@/components/client-tour/client-tour-shell";
import { ClientPreviewGate } from "@/components/client-preview/client-preview-gate";
import { HappyParkCartProvider } from "@/lib/cart/cart-provider";

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
            <ClientTourShell>
              <AnnouncementBar />
              <Navbar />

              <main>
                {children}
              </main>

              <Footer />
              <FloatingWhatsapp />
            </ClientTourShell>
          </ClientPreviewGate>
        </HappyParkCartProvider>
      </body>
    </html>
  );
}




