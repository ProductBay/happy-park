import type { Metadata } from "next";

import { CustomerAccountPreview } from "@/components/account/customer-account-preview";

export const metadata: Metadata = {
  title: "My Happy-Park | Happy-Park",
  description:
    "Manage Happy-Park visits, passes, parties, orders, deliveries and rewards.",
};

export default function AccountPage() {
  return <CustomerAccountPreview />;
}
