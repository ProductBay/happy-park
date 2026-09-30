import type { Metadata } from "next";
import "./globals.css";
import { ClientPreviewGate } from "@/components/client-preview/client-preview-gate";
import { HappyParkCartProvider } from "@/lib/cart/cart-provider";
import { ExperienceShell } from "@/components/layout/experience-shell";
import { siteConfig } from "@/config/site";

const socialTitle = "Happy-Park | Fun, Food, Family & Experiences";
const socialDescription =
  "Happy-Park brings family fun, food, parties, school experiences and HER Hair & Wellness together in Southfield, St. Elizabeth, Jamaica.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: socialTitle,
    template: "%s | Happy-Park",
  },
  description: socialDescription,
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Family Entertainment",
  icons: {
    icon: { url: "/icon", type: "image/png", sizes: "64x64" },
    shortcut: "/icon",
    apple: { url: "/apple-icon", type: "image/png", sizes: "180x180" },
  },
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    locale: "en_JM",
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [{ url: "/opengraph-image", alt: "Happy-Park — Fun, Food, Family & Experiences in Southfield, St. Elizabeth, Jamaica" }],
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




