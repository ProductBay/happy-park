import type { HerDemoSlot, HerService } from "./booking-types";

export const HER_WHATSAPP_NUMBER = "18762189834";

export const herSignatureExperiences: HerService[] = [
  {
    id: "her-time",
    name: "HER TIME",
    price: "J$14,500",
    category: "Signature Experiences",
    featured: true,
    description: "A polished hair-care and relaxation experience made for a beautiful pause.",
    includes: ["Hair consultation", "Shampoo", "Premium hair treatment", "Finished style", "Head/neck relaxation", "Refreshment"],
  },
  {
    id: "her-reset",
    name: "HER RESET",
    price: "J$18,500",
    category: "Signature Experiences",
    featured: true,
    description: "Focused scalp and hair support with tailored home-care guidance.",
    includes: ["Advanced scalp consultation", "Scalp analysis", "Scalp therapy", "Deep hair treatment", "Hydration", "Simple finished style", "Home-care guidance"],
  },
  {
    id: "her-complete",
    name: "HER COMPLETE",
    price: "J$25,000",
    category: "Signature Experiences",
    featured: true,
    description: "The complete HER ritual, pairing advanced hair and scalp care with wellness.",
    includes: ["Advanced hair/scalp assessment", "Customized scalp therapy", "Premium hair treatment", "Finished style", "60-minute selected wellness service", "Refreshment"],
  },
  {
    id: "mom-and-me",
    name: "MOM & ME",
    price: "J$16,500+",
    category: "Signature Experiences",
    featured: true,
    description: "One beautiful day together, with a HER hair experience and a Little HER experience.",
    includes: ["HER Hair Experience", "Little HER Experience", "Optional Happy-Park or Parky Pizza moment with the child's responsible guardian"],
  },
];

export const herServices: HerService[] = [
  ...herSignatureExperiences,
  ...[
    ["hair-consultation", "Hair & Scalp Consultation", "J$3,500"], ["shampoo-condition", "Shampoo + Condition", "J$3,500+"],
    ["deep-treatment", "Shampoo + Deep Treatment", "J$5,500+"], ["treatment-style", "Shampoo + Treatment + Style", "J$7,500+"],
    ["natural-wash-style", "Natural Hair Wash + Style", "J$6,500+"], ["silk-press", "Silk Press", "J$7,500+"],
    ["blowout", "Blowout / Stretch + Style", "J$6,000+"], ["twist-out", "Twist-Out / Braid-Out", "J$6,500+"],
    ["two-strand", "Two-Strand Twists", "J$7,500+"], ["natural-trim", "Natural Hair Trim", "J$3,000+"],
    ["detangling", "Detangling / Restoration", "J$4,500+"], ["protective-style", "Protective Styling", "J$8,000+"],
    ["child-care", "Children's Natural Hair Care", "J$4,500+"],
  ].map(([id, name, price]) => ({ id, name, price, category: "Hair & Natural Hair" as const })),
  ...[
    ["advanced-consult", "Advanced Hair & Scalp Consultation", "J$6,500"], ["scalp-analysis", "Detailed Scalp Analysis", "J$7,500"],
    ["scalp-therapy", "Advanced Scalp Therapy", "J$9,500"], ["scalp-detox", "Scalp Detox + Clarifying Therapy", "J$8,500"],
    ["hydration-restoration", "Hydration & Scalp Restoration", "J$8,500"], ["dry-scalp", "Dry/Flaky Scalp Care Session", "J$8,500"],
    ["strengthening", "Hair Strengthening Therapy", "J$9,000"], ["breakage", "Breakage Recovery Treatment", "J$9,000"],
    ["thinning", "Thinning-Hair Support Session", "J$10,500"], ["hair-loss", "Hair-Loss Support Session", "J$11,500"],
    ["intensive", "Intensive Hair + Scalp Therapy", "J$12,500"], ["advanced-style", "Advanced Treatment + Style", "J$14,500+"],
  ].map(([id, name, price]) => ({ id, name, price, category: "Advanced Hair & Scalp" as const })),
  ...[
    ["curl-revival", "Curl Revival Therapy", "J$7,500+"], ["coil-hydration", "Coil Hydration Therapy", "J$8,500+"],
    ["porosity", "High-Porosity Recovery", "J$9,000+"], ["brittle", "Dry/Brittle Hair Recovery", "J$9,000+"],
    ["processing", "Heat/Processing Recovery", "J$9,500+"], ["transitioning", "Transitioning Hair Therapy", "J$8,500+"],
    ["protective-recovery", "Protective-Style Recovery", "J$8,000+"], ["moisture-protein", "Intensive Moisture + Protein Balance", "J$9,500+"],
  ].map(([id, name, price]) => ({ id, name, price, category: "Texture Therapies" as const })),
  ...[
    ["massage-30", "Relaxation Massage — 30 min", "J$5,500"], ["massage-60", "Relaxation Massage — 60 min", "J$9,000"],
    ["lymphatic-45", "Lymphatic Drainage — 45 min", "J$8,500"], ["lymphatic-60", "Lymphatic Drainage — 60 min", "J$10,500"],
    ["lymphatic-90", "Extended Lymphatic Session — 90 min", "J$14,500"], ["head-neck", "Head, Neck & Shoulder Therapy — 30 min", "J$5,000"],
    ["scalp-relax", "Scalp + Head Relaxation Therapy", "J$5,500"], ["ritual", "HER Relaxation Ritual — 60 min", "J$9,500"],
  ].map(([id, name, price]) => ({ id, name, price, category: "Wellness" as const })),
  ...[
    ["addon-deep", "Deep Conditioning Upgrade", "J$2,000"], ["addon-protein", "Protein Treatment", "J$2,500"],
    ["addon-detox", "Scalp Detox", "J$2,500"], ["addon-steam", "Steam/Hydration", "J$2,000"],
    ["addon-density", "Extra Density/Length", "J$1,500–J$3,500"], ["addon-trim", "Trim with another service", "J$2,000"],
    ["addon-massage", "Head & Scalp Massage", "J$2,500"], ["addon-relax", "Head/Neck/Shoulder Relaxation", "J$3,000"],
  ].map(([id, name, price]) => ({ id, name, price, category: "Add-Ons" as const })),
  { id: "programme-scalp", name: "HER Scalp Recovery — 4 Sessions", price: "J$36,000", category: "Care Programmes", featured: true },
  { id: "programme-strength", name: "HER Hair Strength — 4 Sessions", price: "J$34,000", category: "Care Programmes", featured: true },
  { id: "programme-intensive", name: "HER Intensive Care — 6 Sessions", price: "J$54,000", category: "Care Programmes", featured: true },
];

export const herDemoSlots: HerDemoSlot[] = ["8:00 AM", "9:30 AM", "11:00 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM", "7:00 PM"].map((label) => ({ label, value: label }));

export function getHerService(id?: string) {
  return herServices.find((service) => service.id === id);
}

export function getHerRecommendations(intent?: string, need?: string) {
  if (need === "Mom & Me Experience") return ["mom-and-me", "her-time"];
  if (intent === "scalp") return need?.includes("Hair-loss") || need?.includes("not sure") ? ["advanced-consult", "her-reset"] : ["her-reset", "scalp-therapy"];
  if (intent === "wellness") return need === "COMPLETELY HER" ? ["her-complete", "ritual"] : ["ritual", "massage-60", "her-complete"];
  if (intent === "unsure") return ["hair-consultation", "her-time", "her-complete"];
  return ["her-time", need === "Silk Press" ? "silk-press" : "treatment-style", "her-complete"];
}
