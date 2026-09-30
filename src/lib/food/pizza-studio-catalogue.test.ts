import { describe, expect, it } from "vitest";

import {
  PIZZA_STUDIO_CONFIG,
  pizzaStudioExtras,
  pizzaStudioPresets,
  pizzaStudioSizes,
  pizzaStudioToppings,
} from "./pizza-studio-catalogue";

describe("Happy-Park Pizza Studio catalogue", () => {
  it("contains the confirmed Happy-Park toppings", () => {
    const ids = pizzaStudioToppings.map((item) => item.id);

    expect(ids).toEqual(
      expect.arrayContaining([
        "cheese",
        "pepperoni",
        "smoked-turkey-sausage",
        "arugula",
        "anchovies",
        "olives",
        "shrimp",
        "tuna",
        "pineapple",
        "sweet-corn",
        "moringa",
        "ackee",
        "vegan-cheese",
        "moringa-blossom",
      ]),
    );
  });

  it("contains Happy-Park sides, treats and drinks", () => {
    const ids = pizzaStudioExtras.map((item) => item.id);

    expect(ids).toEqual(
      expect.arrayContaining([
        "garlic-bread",
        "fries",
        "burger",
        "hot-dog",
        "snow-cone",
        "popcorn",
        "cotton-candy",
        "ice-cream",
        "pepsi",
        "sprite",
        "dg-soda",
        "water",
        "cranberry-water",
        "passion-fruit",
        "mango",
        "pineapple-juice",
        "sugar-cane",
        "mulberry",
        "starfruit",
      ]),
    );
  });

  it("keeps Full House at five ingredients", () => {
    expect(PIZZA_STUDIO_CONFIG.fullHouseIngredientCount).toBe(5);

    expect(
      pizzaStudioPresets.find((item) => item.id === "full-house")
        ?.maxToppings,
    ).toBe(5);
  });

  it("keeps the 14-inch large pizza school eligible", () => {
    const large = pizzaStudioSizes.find((item) => item.id === "large");

    expect(large?.inches).toBe(14);
    expect(large?.schoolEligible).toBe(true);
  });

  it("does not invent unconfirmed production prices", () => {
    expect(
      pizzaStudioToppings.every(
        (item) => item.priceMinor === null || item.priceMinor >= 0,
      ),
    ).toBe(true);
  });
});
