import type { Metadata } from "next";
import { HerServiceMenu } from "@/components/her/her-service-menu";

export const metadata: Metadata = { title: "HER Services", description: "Explore HER Salon & Wellness signature experiences, natural hair, scalp care and wellness demo services." };

export default function HerServicesPage() { return <HerServiceMenu />; }
