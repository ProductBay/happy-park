export type MoneyMinor = number | null;

export type PizzaStudioCategory =
  | "classic"
  | "garden"
  | "caribbean"
  | "premium"
  | "plant-based";

export type PizzaStudioDietaryTag =
  | "vegetarian"
  | "vegan"
  | "seafood"
  | "contains-fish"
  | "contains-dairy";

export type PizzaStudioSize = {
  id: string;
  name: string;
  inches: number;
  description: string;
  priceMinor: MoneyMinor;
  featured?: boolean;
  schoolEligible?: boolean;
};

export type PizzaStudioOption = {
  id: string;
  name: string;
  description: string;
  priceMinor: MoneyMinor;
  available: boolean;
};

export type PizzaStudioTopping = {
  id: string;
  name: string;
  category: PizzaStudioCategory;
  description: string;
  priceMinor: MoneyMinor;
  available: boolean;
  signature?: boolean;
  dietary?: PizzaStudioDietaryTag[];
};

export type PizzaStudioExtraCategory =
  | "savory-side"
  | "park-treat"
  | "soft-drink"
  | "refreshment"
  | "natural-juice";

export type PizzaStudioExtra = {
  id: string;
  name: string;
  category: PizzaStudioExtraCategory;
  description: string;
  priceMinor: MoneyMinor;
  available: boolean;
  seasonal?: boolean;
};

export type PizzaStudioPreset = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  toppingIds: string[];
  maxToppings?: number;
  badge?: string;
};

export const PIZZA_STUDIO_CONFIG = {
  currency: "JMD",
  locale: "en-JM",
  brandName: "Happy-Park Pizza Studio",
  headline: "Build it. Watch it come alive.",
  subheadline: "Your pizza. Your rules.",
  maxCustomToppings: 8,
  fullHouseIngredientCount: 5,
  deliveryProvider: "SLYDE",
} as const;

/**
 * Until Happy-Park confirms final customer pricing,
 * null prices intentionally render as "Ask".
 *
 * Existing demo pricing must not be treated as contracted production pricing.
 */
export const pizzaStudioSizes: PizzaStudioSize[] = [
  {
    id: "small",
    name: "Small",
    inches: 10,
    description: "A personal Happy-Park pizza.",
    priceMinor: null,
  },
  {
    id: "medium",
    name: "Medium",
    inches: 12,
    description: "Great for sharing.",
    priceMinor: null,
  },
  {
    id: "large",
    name: "Large",
    inches: 14,
    description: "The Happy-Park family favourite.",
    priceMinor: null,
    featured: true,
    schoolEligible: true,
  },
  {
    id: "family",
    name: "Family",
    inches: 16,
    description: "Built for the whole crew.",
    priceMinor: null,
  },
];

export const pizzaStudioCrusts: PizzaStudioOption[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Happy-Park's classic pizza foundation.",
    priceMinor: 0,
    available: true,
  },
  {
    id: "broccoli-vegan-base",
    name: "Broccoli Vegan Base",
    description: "A plant-based broccoli pizza foundation.",
    priceMinor: null,
    available: true,
  },
];

export const pizzaStudioSauces: PizzaStudioOption[] = [
  {
    id: "signature-tomato",
    name: "Signature Tomato",
    description: "Classic tomato pizza sauce.",
    priceMinor: 0,
    available: true,
  },
];

export const pizzaStudioCheeses: PizzaStudioOption[] = [
  {
    id: "cheese",
    name: "Cheese",
    description: "Classic pizza cheese.",
    priceMinor: null,
    available: true,
  },
  {
    id: "vegan-cheese",
    name: "Vegan Cheese",
    description: "Plant-based cheese alternative.",
    priceMinor: null,
    available: true,
  },
];

export const pizzaStudioToppings: PizzaStudioTopping[] = [
  {
    id: "cheese",
    name: "Cheese",
    category: "classic",
    description: "A simple Happy-Park favourite.",
    priceMinor: null,
    available: true,
    dietary: ["vegetarian", "contains-dairy"],
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    category: "classic",
    description: "Classic pepperoni.",
    priceMinor: null,
    available: true,
    signature: true,
  },
  {
    id: "smoked-turkey-sausage",
    name: "Smoked Turkey Sausage",
    category: "classic",
    description: "Smoky turkey sausage pieces.",
    priceMinor: null,
    available: true,
    signature: true,
  },
  {
    id: "arugula",
    name: "Arugula",
    category: "garden",
    description: "Fresh peppery greens.",
    priceMinor: null,
    available: true,
    dietary: ["vegetarian", "vegan"],
  },
  {
    id: "olives",
    name: "Olives",
    category: "garden",
    description: "Savory sliced olives.",
    priceMinor: null,
    available: true,
    dietary: ["vegetarian", "vegan"],
  },
  {
    id: "pineapple",
    name: "Pineapple",
    category: "garden",
    description: "Sweet tropical pineapple.",
    priceMinor: null,
    available: true,
    dietary: ["vegetarian", "vegan"],
  },
  {
    id: "sweet-corn",
    name: "Sweet Corn",
    category: "garden",
    description: "Sweet golden corn.",
    priceMinor: null,
    available: true,
    dietary: ["vegetarian", "vegan"],
  },
  {
    id: "moringa",
    name: "Moringa",
    category: "caribbean",
    description: "A distinctive Happy-Park Caribbean ingredient.",
    priceMinor: null,
    available: true,
    signature: true,
    dietary: ["vegetarian", "vegan"],
  },
  {
    id: "ackee",
    name: "Ackee",
    category: "caribbean",
    description: "A Jamaican-inspired pizza topping.",
    priceMinor: null,
    available: true,
    signature: true,
    dietary: ["vegetarian", "vegan"],
  },
  {
    id: "moringa-blossom",
    name: "Moringa Blossom",
    category: "caribbean",
    description: "A distinctive Happy-Park botanical topping.",
    priceMinor: null,
    available: true,
    signature: true,
    dietary: ["vegetarian", "vegan"],
  },
  {
    id: "anchovies",
    name: "Anchovies",
    category: "premium",
    description: "Savory anchovy topping.",
    priceMinor: null,
    available: true,
    dietary: ["seafood", "contains-fish"],
  },
  {
    id: "shrimp",
    name: "Shrimp",
    category: "premium",
    description: "Premium shrimp topping.",
    priceMinor: null,
    available: true,
    signature: true,
    dietary: ["seafood"],
  },
  {
    id: "tuna",
    name: "Tuna",
    category: "premium",
    description: "Seasoned tuna topping.",
    priceMinor: null,
    available: true,
    dietary: ["seafood", "contains-fish"],
  },
  {
    id: "vegan-cheese",
    name: "Vegan Cheese",
    category: "plant-based",
    description: "Plant-based cheese alternative.",
    priceMinor: null,
    available: true,
    dietary: ["vegetarian", "vegan"],
  },
];

export const pizzaStudioPresets: PizzaStudioPreset[] = [
  {
    id: "build-your-own",
    name: "Build My Own",
    eyebrow: "Your pizza. Your rules.",
    description: "Start fresh and create it exactly the way you want.",
    toppingIds: [],
  },
  {
    id: "full-house",
    name: "Full House",
    eyebrow: "Five ingredients. One big personality.",
    description: "Create a loaded Happy-Park pizza using five ingredients.",
    toppingIds: [],
    maxToppings: 5,
    badge: "5 Ingredients",
  },
  {
    id: "vegan",
    name: "Plant-Powered",
    eyebrow: "Fresh. Creative. Plant-based.",
    description:
      "Start with the broccoli vegan base and explore vegan-friendly ingredients.",
    toppingIds: ["arugula", "olives", "sweet-corn", "moringa", "vegan-cheese"],
    badge: "Vegan",
  },
  {
    id: "jamaican-garden",
    name: "Jamaican Garden",
    eyebrow: "A little Jamaica on every slice.",
    description:
      "A Happy-Park signature direction featuring ackee, moringa and garden flavours.",
    toppingIds: ["ackee", "moringa", "sweet-corn", "arugula"],
    badge: "Happy-Park Signature",
  },
];

export const pizzaStudioExtras: PizzaStudioExtra[] = [
  {
    id: "garlic-bread",
    name: "Garlic Bread",
    category: "savory-side",
    description: "Warm garlic bread for sharing.",
    priceMinor: null,
    available: true,
  },
  {
    id: "fries",
    name: "Fries",
    category: "savory-side",
    description: "Golden crispy fries.",
    priceMinor: null,
    available: true,
  },
  {
    id: "burger",
    name: "Burger",
    category: "savory-side",
    description: "Happy-Park burger.",
    priceMinor: null,
    available: true,
  },
  {
    id: "hot-dog",
    name: "Hot Dog",
    category: "savory-side",
    description: "Classic Happy-Park hot dog.",
    priceMinor: null,
    available: true,
  },
  {
    id: "snow-cone",
    name: "Snow Cone",
    category: "park-treat",
    description: "A colourful icy park favourite.",
    priceMinor: null,
    available: true,
  },
  {
    id: "popcorn",
    name: "Popcorn",
    category: "park-treat",
    description: "Fresh park-style popcorn.",
    priceMinor: null,
    available: true,
  },
  {
    id: "cotton-candy",
    name: "Cotton Candy",
    category: "park-treat",
    description: "Fluffy Happy-Park sweetness.",
    priceMinor: null,
    available: true,
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    category: "park-treat",
    description: "A cool Happy-Park treat.",
    priceMinor: null,
    available: true,
  },
  {
    id: "pepsi",
    name: "Pepsi",
    category: "soft-drink",
    description: "Chilled Pepsi.",
    priceMinor: null,
    available: true,
  },
  {
    id: "sprite",
    name: "Sprite",
    category: "soft-drink",
    description: "Chilled Sprite.",
    priceMinor: null,
    available: true,
  },
  {
    id: "dg-soda",
    name: "D&G Soda",
    category: "soft-drink",
    description: "Choose from available D&G flavours.",
    priceMinor: null,
    available: true,
  },
  {
    id: "water",
    name: "Water",
    category: "refreshment",
    description: "Chilled bottled water.",
    priceMinor: null,
    available: true,
  },
  {
    id: "cranberry-water",
    name: "Cranberry Water",
    category: "refreshment",
    description: "Refreshing cranberry water.",
    priceMinor: null,
    available: true,
  },
  {
    id: "passion-fruit",
    name: "Passion Fruit Juice",
    category: "natural-juice",
    description: "Natural tropical passion fruit juice.",
    priceMinor: null,
    available: true,
  },
  {
    id: "mango",
    name: "Mango Juice",
    category: "natural-juice",
    description: "Natural mango juice.",
    priceMinor: null,
    available: true,
  },
  {
    id: "pineapple-juice",
    name: "Pineapple Juice",
    category: "natural-juice",
    description: "Natural pineapple juice.",
    priceMinor: null,
    available: true,
  },
  {
    id: "sugar-cane",
    name: "Sugar Cane Juice",
    category: "natural-juice",
    description: "Fresh sugar cane refreshment.",
    priceMinor: null,
    available: true,
  },
  {
    id: "mulberry",
    name: "Mulberry Juice",
    category: "natural-juice",
    description: "Natural mulberry juice.",
    priceMinor: null,
    available: true,
    seasonal: true,
  },
  {
    id: "starfruit",
    name: "Starfruit Juice",
    category: "natural-juice",
    description: "Natural starfruit juice.",
    priceMinor: null,
    available: true,
    seasonal: true,
  },
];

export const pizzaStudioCategoryLabels: Record<
  PizzaStudioCategory,
  string
> = {
  classic: "Classics",
  garden: "Garden",
  caribbean: "Caribbean Originals",
  premium: "Premium & Seafood",
  "plant-based": "Plant-Based",
};

export const pizzaStudioExtraCategoryLabels: Record<
  PizzaStudioExtraCategory,
  string
> = {
  "savory-side": "Savory Sides",
  "park-treat": "Park Treats",
  "soft-drink": "Soft Drinks",
  refreshment: "Refreshments",
  "natural-juice": "Natural Juice Bar",
};

export function formatPizzaStudioMoney(value: MoneyMinor): string {
  if (value === null) {
    return "Ask";
  }

  if (value === 0) {
    return "Included";
  }

  return new Intl.NumberFormat(PIZZA_STUDIO_CONFIG.locale, {
    style: "currency",
    currency: PIZZA_STUDIO_CONFIG.currency,
    maximumFractionDigits: 0,
  }).format(value / 100);
}

export function getPizzaStudioTopping(id: string) {
  return pizzaStudioToppings.find((item) => item.id === id);
}

export function getPizzaStudioExtra(id: string) {
  return pizzaStudioExtras.find((item) => item.id === id);
}

export function getPizzaStudioPreset(id: string) {
  return pizzaStudioPresets.find((item) => item.id === id);
}

export function getPizzaStudioToppingsByCategory(
  category: PizzaStudioCategory,
) {
  return pizzaStudioToppings.filter(
    (item) => item.category === category && item.available,
  );
}

export function getPizzaStudioExtrasByCategory(
  category: PizzaStudioExtraCategory,
) {
  return pizzaStudioExtras.filter(
    (item) => item.category === category && item.available,
  );
}
