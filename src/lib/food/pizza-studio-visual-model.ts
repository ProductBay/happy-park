import type { PizzaStudioExtra, PizzaStudioExtraCategory } from "./pizza-studio-catalogue";

export const pizzaSizeScale: Record<string, number> = {
  small: 0.72,
  medium: 0.84,
  large: 0.94,
  family: 1,
};

const placementRings = [
  { x: 50, y: 50, rotate: -8 },
  { x: 31, y: 28, rotate: 16 },
  { x: 67, y: 27, rotate: -18 },
  { x: 75, y: 51, rotate: 24 },
  { x: 63, y: 72, rotate: -10 },
  { x: 35, y: 72, rotate: 20 },
  { x: 24, y: 50, rotate: -25 },
  { x: 48, y: 20, rotate: 8 },
] as const;

function stableHash(value: string) {
  return [...value].reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 7);
}

export function getToppingPlacements(id: string, toppingIndex: number, count = 6) {
  const offset = (stableHash(id) + toppingIndex * 3) % placementRings.length;
  return Array.from({ length: Math.min(count, placementRings.length) }, (_, index) => {
    const point = placementRings[(index + offset) % placementRings.length];
    return { ...point, rotate: point.rotate + toppingIndex * 7, scale: 0.82 + (index % 3) * 0.09 };
  });
}

export type MealVisualKind = "side" | "treat" | "soft-drink" | "water" | "juice";

export function getMealVisualKind(extra: Pick<PizzaStudioExtra, "id" | "category">): MealVisualKind {
  if (extra.category === "savory-side") return "side";
  if (extra.category === "park-treat") return "treat";
  if (extra.category === "soft-drink") return "soft-drink";
  if (extra.category === "natural-juice") return "juice";
  return "water";
}

export function isDrinkCategory(category: PizzaStudioExtraCategory) {
  return ["soft-drink", "refreshment", "natural-juice"].includes(category);
}
