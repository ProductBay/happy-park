import type { Metadata } from "next";
import { Suspense } from "react";
import { HerBookingJourney } from "@/components/her/booking/her-booking-journey";

export const metadata: Metadata = { title: "The HER Journey", description: "Explore a guided interactive booking preview for HER Salon & Wellness at Happy-Park." };

export default function HerBookPage() { return <Suspense fallback={<div className="her-surface min-h-screen" />}><HerBookingJourney /></Suspense>; }
