import type { Metadata } from "next";
import { SchoolApplicationForm } from "@/components/schools/application-form";
export const metadata: Metadata={title:"Apply — School Partner Programme"};
export default function ApplyPage(){return <div className="min-h-screen bg-[var(--hp-cream)] pb-24 pt-40"><div className="hp-container"><div className="mx-auto max-w-3xl"><span className="hp-eyebrow">School Partner application</span><h1 className="hp-heading mt-5 text-5xl font-black sm:text-6xl">Let’s make Friday happier.</h1><p className="hp-copy mt-5 text-lg">For infant and primary school leaders, administrators and authorized PTA representatives. We only collect school and adult contact information.</p><div className="mt-10"><SchoolApplicationForm/></div></div></div></div>}
