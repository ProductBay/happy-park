export type ShopCategory =
  | "Herbal"
  | "Natural Care"
  | "Wellness"
  | "Family";

export type ShopProduct = {
  id: string;
  name: string;
  category: ShopCategory;
  description: string;
  priceMinor: number;
  size: string;
  ingredients: string;
  usage: string;
  stock: "In stock" | "Low stock";
  featured?: boolean;
};

export const shopCategories: Array<{
  name: ShopCategory;
  description: string;
}> = [
  {
    name: "Herbal",
    description: "Explore Happy-Park's preview herbal collection.",
  },
  {
    name: "Natural Care",
    description: "Simple natural-care products for the family.",
  },
  {
    name: "Wellness",
    description: "Everyday wellness-inspired products and blends.",
  },
  {
    name: "Family",
    description: "Family-oriented additions to the Happy-Park shop.",
  },
];

export const shopProducts: ShopProduct[] = [
  {
    id: "herbal-blend-preview",
    name: "Happy Herbal Blend",
    category: "Herbal",
    description:
      "A preview herbal blend presented as part of the Happy-Park natural product collection.",
    priceMinor: 180000,
    size: "Preview size",
    ingredients: "Final ingredients to be confirmed by Happy-Park.",
    usage: "Final product directions to be supplied by Happy-Park.",
    stock: "In stock",
    featured: true,
  },
  {
    id: "natural-tea-preview",
    name: "Natural Tea Blend",
    category: "Herbal",
    description:
      "A preview tea product showing how Happy-Park herbal products can be presented online.",
    priceMinor: 150000,
    size: "Preview pack",
    ingredients: "Final ingredients to be confirmed by Happy-Park.",
    usage: "Preparation directions will appear with the final product.",
    stock: "In stock",
  },
  {
    id: "natural-care-preview",
    name: "Natural Care",
    category: "Natural Care",
    description:
      "A preview natural-care item ready to be replaced with Happy-Park's real product catalog.",
    priceMinor: 220000,
    size: "Preview size",
    ingredients: "Final formulation to be confirmed by Happy-Park.",
    usage: "Final usage information will be supplied with the real product.",
    stock: "Low stock",
  },
  {
    id: "wellness-blend-preview",
    name: "Everyday Wellness Blend",
    category: "Wellness",
    description:
      "A storefront preview demonstrating Happy-Park's wellness product presentation.",
    priceMinor: 200000,
    size: "Preview pack",
    ingredients: "Final ingredients to be confirmed by Happy-Park.",
    usage: "Final product directions to be supplied by Happy-Park.",
    stock: "In stock",
  },
  {
    id: "family-natural-preview",
    name: "Family Natural Collection",
    category: "Family",
    description:
      "A preview listing reserved for a future Happy-Park family-oriented natural product.",
    priceMinor: 250000,
    size: "Preview item",
    ingredients: "Product information pending final Happy-Park catalog.",
    usage: "Final usage information pending.",
    stock: "In stock",
  },
  {
    id: "herbal-selection-preview",
    name: "Herbal Selection",
    category: "Herbal",
    description:
      "Another preview position for Happy-Park's expanding herbal and natural catalog.",
    priceMinor: 175000,
    size: "Preview pack",
    ingredients: "Final ingredients to be confirmed by Happy-Park.",
    usage: "Final directions pending.",
    stock: "In stock",
  },
];

export function formatShopMoney(minor: number) {
  return `J$${(minor / 100).toLocaleString("en-JM", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}
