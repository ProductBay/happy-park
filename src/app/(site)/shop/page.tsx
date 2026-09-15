import type { Metadata } from "next";

import { ShopPreviewPage } from "@/components/shop/shop-preview-page";

export const metadata: Metadata = {
  title: "Herbal & Natural Shop | Happy-Park",
  description:
    "Explore the Happy-Park herbal and natural product shop preview.",
};

export default function ShopPage() {
  return <ShopPreviewPage />;
}
