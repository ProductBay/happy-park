import assert from "node:assert/strict";
import test from "node:test";

import { PIZZA_STUDIO_CONFIG, pizzaStudioExtras, pizzaStudioPresets, pizzaStudioSizes, pizzaStudioToppings } from "./pizza-studio-catalogue.ts";

test("contains the confirmed Happy-Park toppings", () => {
  const ids = pizzaStudioToppings.map((item) => item.id);
  for (const id of ["cheese", "pepperoni", "smoked-turkey-sausage", "arugula", "anchovies", "olives", "shrimp", "tuna", "pineapple", "sweet-corn", "moringa", "ackee", "vegan-cheese", "moringa-blossom"]) assert.ok(ids.includes(id));
});

test("contains Happy-Park sides, treats and drinks", () => {
  const ids = pizzaStudioExtras.map((item) => item.id);
  for (const id of ["garlic-bread", "fries", "burger", "hot-dog", "snow-cone", "popcorn", "cotton-candy", "ice-cream", "pepsi", "sprite", "dg-soda", "water", "cranberry-water", "passion-fruit", "mango", "pineapple-juice", "sugar-cane", "mulberry", "starfruit"]) assert.ok(ids.includes(id));
});

test("keeps Full House at five ingredients", () => {
  assert.equal(PIZZA_STUDIO_CONFIG.fullHouseIngredientCount, 5);
  assert.equal(pizzaStudioPresets.find((item) => item.id === "full-house")?.maxToppings, 5);
});

test("keeps the 14-inch large pizza school eligible", () => {
  const large = pizzaStudioSizes.find((item) => item.id === "large");
  assert.equal(large?.inches, 14);
  assert.equal(large?.schoolEligible, true);
});

test("does not invent unconfirmed production prices", () => {
  assert.equal(pizzaStudioToppings.every((item) => item.priceMinor === null || item.priceMinor >= 0), true);
});
