import type { Metadata } from "next";

import { HerClientWorkspace } from "@/components/her/account/her-client-workspace";

export const metadata: Metadata = {
  title: "My HER | HER Salon & Wellness",
  description: "A private interactive preview of the HER client appointment experience.",
};

export default function HerAccountPage() {
  return <HerClientWorkspace />;
}
