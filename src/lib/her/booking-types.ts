export type HerIntent = "hair" | "scalp" | "wellness" | "unsure";

export type HerHairTexture =
  | "Straight"
  | "Wavy"
  | "Curly"
  | "Coily"
  | "Transitioning"
  | "Children's Hair"
  | "Mixed Texture"
  | "Not Sure";

export type HerServiceCategory =
  | "Signature Experiences"
  | "Hair & Natural Hair"
  | "Advanced Hair & Scalp"
  | "Texture Therapies"
  | "Wellness"
  | "Add-Ons"
  | "Care Programmes";

export type HerService = {
  id: string;
  name: string;
  price: string;
  category: HerServiceCategory;
  description?: string;
  featured?: boolean;
  includes?: readonly string[];
};

export type HerDemoSlot = {
  label: string;
  value: string;
};

export type HerBookingState = {
  intent?: HerIntent;
  texture?: HerHairTexture;
  need?: string;
  recommendation?: string;
  date?: string;
  time?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: "WhatsApp" | "Phone" | "Email";
  note: string;
};
