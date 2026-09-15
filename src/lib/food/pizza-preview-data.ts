export type PizzaSize = {
  id: string;
  name: string;
  inches: string;
  priceMinor: number;
};

export type PizzaOption = {
  id: string;
  name: string;
  priceMinor: number;
};

export type PizzaTopping = {
  id: string;
  name: string;
  category: "meat" | "veggie" | "premium";
  priceMinor: number;
};

export const pizzaSizes: PizzaSize[] = [
  {
    id: "small",
    name: "Small",
    inches: '10"',
    priceMinor: 180000,
  },
  {
    id: "medium",
    name: "Medium",
    inches: '12"',
    priceMinor: 240000,
  },
  {
    id: "large",
    name: "Large",
    inches: '14"',
    priceMinor: 320000,
  },
  {
    id: "family",
    name: "Family",
    inches: '16"',
    priceMinor: 395000,
  },
];

export const crustOptions: PizzaOption[] = [
  {
    id: "classic",
    name: "Classic Hand-Tossed",
    priceMinor: 0,
  },
  {
    id: "thin",
    name: "Thin & Crispy",
    priceMinor: 0,
  },
  {
    id: "stuffed",
    name: "Cheese-Stuffed Crust",
    priceMinor: 55000,
  },
];

export const sauceOptions: PizzaOption[] = [
  {
    id: "signature",
    name: "Happy-Park Signature Tomato",
    priceMinor: 0,
  },
  {
    id: "bbq",
    name: "Smoky BBQ",
    priceMinor: 15000,
  },
  {
    id: "garlic",
    name: "Creamy Garlic",
    priceMinor: 20000,
  },
];

export const cheeseOptions: PizzaOption[] = [
  {
    id: "regular",
    name: "Regular Cheese",
    priceMinor: 0,
  },
  {
    id: "extra",
    name: "Extra Cheese",
    priceMinor: 30000,
  },
  {
    id: "loaded",
    name: "Loaded Cheese",
    priceMinor: 50000,
  },
];

export const pizzaToppings: PizzaTopping[] = [
  {
    id: "pepperoni",
    name: "Pepperoni",
    category: "meat",
    priceMinor: 30000,
  },
  {
    id: "chicken",
    name: "Seasoned Chicken",
    category: "meat",
    priceMinor: 35000,
  },
  {
    id: "beef",
    name: "Seasoned Beef",
    category: "meat",
    priceMinor: 35000,
  },
  {
    id: "ham",
    name: "Ham",
    category: "meat",
    priceMinor: 30000,
  },
  {
    id: "pineapple",
    name: "Pineapple",
    category: "veggie",
    priceMinor: 20000,
  },
  {
    id: "onion",
    name: "Onion",
    category: "veggie",
    priceMinor: 15000,
  },
  {
    id: "sweet-pepper",
    name: "Sweet Pepper",
    category: "veggie",
    priceMinor: 18000,
  },
  {
    id: "mushroom",
    name: "Mushroom",
    category: "veggie",
    priceMinor: 22000,
  },
  {
    id: "jalapeno",
    name: "Jalapeño",
    category: "veggie",
    priceMinor: 18000,
  },
  {
    id: "bacon",
    name: "Crispy Bacon",
    category: "premium",
    priceMinor: 40000,
  },
  {
    id: "jerk-chicken",
    name: "Jerk Chicken",
    category: "premium",
    priceMinor: 45000,
  },
  {
    id: "three-cheese",
    name: "Three Cheese Blend",
    category: "premium",
    priceMinor: 40000,
  },
];

export const featuredPizzas = [
  {
    id: "happy-classic",
    name: "Happy Classic",
    description:
      "Pepperoni, mozzarella and our signature tomato sauce.",
    priceMinor: 240000,
  },
  {
    id: "jerk-island",
    name: "Jerk Island",
    description:
      "Jerk chicken, sweet peppers, onion and signature cheese.",
    priceMinor: 295000,
  },
  {
    id: "garden-happy",
    name: "Garden Happy",
    description:
      "Mushroom, peppers, onion, pineapple and mozzarella.",
    priceMinor: 265000,
  },
];

export type FoodSidePreview = {
  id: string;
  name: string;
  description: string;
  priceMinor: number;
  category: "side" | "drink";
};

export const foodSidesPreview: FoodSidePreview[] = [
  {
    id: "garlic-bread",
    name: "Cheesy Garlic Bread",
    description: "Warm garlic bread finished with melted cheese.",
    priceMinor: 65000,
    category: "side",
  },
  {
    id: "happy-fries",
    name: "Happy Fries",
    description: "Golden crispy fries made for sharing.",
    priceMinor: 55000,
    category: "side",
  },
  {
    id: "chicken-bites",
    name: "Chicken Bites",
    description: "Crispy seasoned chicken bites with dipping sauce.",
    priceMinor: 85000,
    category: "side",
  },
  {
    id: "fruit-cup",
    name: "Tropical Fruit Cup",
    description: "A bright mix of chilled tropical fruit.",
    priceMinor: 50000,
    category: "side",
  },
  {
    id: "fruit-punch",
    name: "Happy Fruit Punch",
    description: "Cold tropical fruit punch.",
    priceMinor: 35000,
    category: "drink",
  },
  {
    id: "water",
    name: "Bottled Water",
    description: "Chilled bottled water.",
    priceMinor: 20000,
    category: "drink",
  },
  {
    id: "soda",
    name: "Soft Drink",
    description: "Choose your favourite chilled soft drink.",
    priceMinor: 30000,
    category: "drink",
  },
  {
    id: "juice",
    name: "Kids Juice",
    description: "A refreshing kid-friendly juice.",
    priceMinor: 30000,
    category: "drink",
  },
];

export const foodBuilderImageMap: Record<string, string> = {
  "garlic-bread": "/images/food/builder/sides/garlic-bread.webp",
  "happy-fries": "/images/food/builder/sides/happy-fries.webp",
  "chicken-bites": "/images/food/builder/sides/chicken-bites.webp",
  "fruit-cup": "/images/food/builder/sides/fruit-cup.webp",

  "fruit-punch": "/images/food/builder/drinks/fruit-punch.webp",
  water: "/images/food/builder/drinks/water.webp",
  soda: "/images/food/builder/drinks/soft-drink.webp",
  juice: "/images/food/builder/drinks/kids-juice.webp",
};

export const pizzaToppingImageMap: Record<string, string> = {
  pepperoni: "/images/food/builder/toppings/pepperoni.webp",
  chicken: "/images/food/builder/toppings/chicken.webp",
  beef: "/images/food/builder/toppings/beef.webp",
  ham: "/images/food/builder/toppings/ham.webp",
  pineapple: "/images/food/builder/toppings/pineapple.webp",
  onion: "/images/food/builder/toppings/onion.webp",
  "sweet-pepper": "/images/food/builder/toppings/sweet-pepper.webp",
  mushroom: "/images/food/builder/toppings/mushroom.webp",
  jalapeno: "/images/food/builder/toppings/jalapeno.webp",
  bacon: "/images/food/builder/toppings/bacon.webp",
  "jerk-chicken": "/images/food/builder/toppings/jerk-chicken.webp",
};
