import type { Metadata } from "next";

import { FoodStorefrontPreview } from "@/components/food/food-storefront-preview";

export const metadata: Metadata = {
  title: "Food & Pizza",
  description:
    "Explore Happy-Park pizza, hot dogs, hamburgers, popcorn, snow cones, cotton candy, ice cream and more.",
};

export default function FoodPage() {
  return <FoodStorefrontPreview />;
}
