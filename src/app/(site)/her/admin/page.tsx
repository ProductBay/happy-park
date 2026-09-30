import type { Metadata } from "next";
import { HerAdminWorkspace } from "@/components/her/admin/her-admin-workspace";

export const metadata: Metadata = {
  title: "HER Admin Preview",
  description: "Interactive administrative preview for HER Salon & Wellness at Happy-Park.",
};

export default function HerAdminPage() {
  return <HerAdminWorkspace />;
}
