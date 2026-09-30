import assert from "node:assert/strict";
import test from "node:test";

import { pizzaStudioExtras, pizzaStudioSizes, pizzaStudioToppings, PIZZA_STUDIO_CONFIG } from "./pizza-studio-catalogue.ts";
import { getMealVisualKind, getToppingPlacements, pizzaSizeScale } from "./pizza-studio-visual-model.ts";

test("pizza sizes map to progressively larger visual scales", () => {
  assert.ok(pizzaSizeScale.small < pizzaSizeScale.medium);
  assert.ok(pizzaSizeScale.medium < pizzaSizeScale.large);
  assert.ok(pizzaSizeScale.large < pizzaSizeScale.family);
});

test("topping placement is deterministic and distributed", () => {
  const first = getToppingPlacements("pepperoni", 0);
  assert.deepEqual(first, getToppingPlacements("pepperoni", 0));
  assert.equal(new Set(first.map(({ x, y }) => `${x}:${y}`)).size, first.length);
  assert.notDeepEqual(first, getToppingPlacements("olives", 1));
});

test("all catalogue extras receive a visual classification", () => {
  assert.equal(pizzaStudioExtras.every((extra) => Boolean(getMealVisualKind(extra))), true);
  assert.equal(getMealVisualKind(pizzaStudioExtras.find((item) => item.id === "fries")!), "side");
  assert.equal(getMealVisualKind(pizzaStudioExtras.find((item) => item.id === "passion-fruit")!), "juice");
});

test("Full House remains fixed at five ingredients", () => {
  assert.equal(PIZZA_STUDIO_CONFIG.fullHouseIngredientCount, 5);
});

test("visual selections are backed by catalogue truth with pending prices preserved", () => {
  for (const id of ["pepperoni", "pineapple", "olives", "shrimp", "moringa-blossom"]) {
    assert.ok(pizzaStudioToppings.some((item) => item.id === id && item.available));
  }
  assert.equal(pizzaStudioSizes.some((item) => item.priceMinor === null), true);
  assert.equal(pizzaStudioToppings.some((item) => item.priceMinor === null), true);
});
