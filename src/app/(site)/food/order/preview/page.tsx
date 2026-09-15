import type { Metadata } from "next";

import { PizzaOrderTrackerDemo } from "@/components/food/order-tracking/pizza-order-tracker-demo";

export const metadata: Metadata = {
  title: "Track Your Pizza | Happy-Park",
  description:
    "Follow your Happy-Park pizza from the kitchen to delivery.",
};

export default function PizzaOrderPreviewPage() {
  return <PizzaOrderTrackerDemo />;
}
