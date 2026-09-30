import type { Metadata } from "next";

import { AttractionsShowcase } from "@/components/home/attractions-showcase";
import { CommerceFeature } from "@/components/home/commerce-feature";
import { GalleryStrip } from "@/components/home/gallery-strip";
import { Hero } from "@/components/home/hero";
import { ParkStory } from "@/components/home/park-story";
import { PartyFeature } from "@/components/home/party-feature";
import { ReviewsSection } from "@/components/home/reviews-section";
import { SlydeDelivery } from "@/components/home/slyde-delivery";
import { ValueStrip } from "@/components/home/value-strip";
import { VisitCta } from "@/components/home/visit-cta";
import { VisitPlanner } from "@/components/home/visit-planner";
import { WhatsappCta } from "@/components/home/whatsapp-cta";
import { HerHomeDiscovery } from "@/components/her/her-home-discovery";
import { FoodDeliveryZone } from "@/components/food/food-delivery-zone";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />

      <ValueStrip />

      <ParkStory />

      <AttractionsShowcase />

      <GalleryStrip />

      <VisitPlanner />

      <PartyFeature />

      <CommerceFeature />

      <FoodDeliveryZone />

      <SlydeDelivery />

      <ReviewsSection />

      <HerHomeDiscovery />

      <VisitCta />

      <WhatsappCta />
    </>
  );
}

