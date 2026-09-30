import type { Metadata } from "next";
import { HerLanding } from "@/components/her/her-landing";

export const metadata: Metadata = { title: "HER Hair & Wellness", description: "Discover HER Salon & Wellness at Happy-Park — premium natural hair, advanced hair and scalp care, and wellness experiences." };

export default function HerPage() { return <HerLanding />; }
