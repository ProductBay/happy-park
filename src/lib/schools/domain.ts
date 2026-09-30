import { SCHOOL_PRODUCTS, SCHOOL_PROGRAMME_CONFIG, type SchoolProduct } from "./config.ts";

export const SCHOOL_ORDER_TRANSITIONS = {
  draft: ["submitted", "cancelled"], submitted: ["under_review", "change_requested", "cancelled", "rejected"],
  under_review: ["confirmed", "change_requested", "rejected", "cancelled"], confirmed: ["preparing", "cancelled"],
  change_requested: ["submitted", "cancelled"], preparing: ["ready_for_delivery"], ready_for_delivery: ["out_for_delivery"],
  out_for_delivery: ["delivered"], delivered: ["completed"], completed: [], cancelled: [], rejected: [],
} as const;

export type SchoolOrderStatus = keyof typeof SCHOOL_ORDER_TRANSITIONS;
export type OrderQuantity = { productId: string; quantity: number };
export type ClassAllocation = { classId: string; pizzaBoxes: number };

export function canTransitionSchoolOrder(from: SchoolOrderStatus, to: SchoolOrderStatus) {
  return (SCHOOL_ORDER_TRANSITIONS[from] as readonly string[]).includes(to);
}

export function resolveSchoolPrice(product: SchoolProduct, contractPriceMinor?: number) {
  const price = contractPriceMinor ?? product.priceMinor;
  if (!Number.isSafeInteger(price) || price < 0 || !product.active) throw new Error("No active school price is available.");
  return price;
}

export function calculateSchoolOrder(lines: readonly OrderQuantity[], options: { contractPrices?: Readonly<Record<string, number>>; discountMinor?: number; deliveryMinor?: number; taxRateBasisPoints?: number } = {}) {
  const snapshots = lines.filter((line) => line.quantity > 0).map((line) => {
    if (!Number.isSafeInteger(line.quantity) || line.quantity < 0) throw new Error("Quantities must be whole, non-negative numbers.");
    const product = SCHOOL_PRODUCTS.find((item) => item.id === line.productId);
    if (!product) throw new Error(`Unknown school product: ${line.productId}`);
    const unitPriceMinor = resolveSchoolPrice(product, options.contractPrices?.[product.id]);
    return { productId: product.id, name: product.name, category: product.category, quantity: line.quantity, unitPriceMinor, subtotalMinor: unitPriceMinor * line.quantity, batchSize: product.batchSize };
  });
  const varietyCount = snapshots.filter((line) => line.category === "pizza").length;
  if (varietyCount > SCHOOL_PROGRAMME_CONFIG.maxPizzaVarieties) throw new Error(`Choose no more than ${SCHOOL_PROGRAMME_CONFIG.maxPizzaVarieties} pizza varieties.`);
  const pizzaBoxes = snapshots.filter((line) => line.category === "pizza").reduce((sum, line) => sum + line.quantity, 0);
  const subtotalMinor = snapshots.reduce((sum, line) => sum + line.subtotalMinor, 0);
  const discountMinor = options.discountMinor ?? 0;
  const deliveryMinor = options.deliveryMinor ?? SCHOOL_PROGRAMME_CONFIG.defaultDeliveryMinor;
  const taxableMinor = Math.max(0, subtotalMinor - discountMinor + deliveryMinor);
  const taxMinor = Math.round(taxableMinor * (options.taxRateBasisPoints ?? SCHOOL_PROGRAMME_CONFIG.defaultTaxRateBasisPoints) / 10000);
  return { lines: snapshots, pizzaBoxes, totalSlices: pizzaBoxes * SCHOOL_PROGRAMME_CONFIG.slicesPerPizza, subtotalMinor, discountMinor, deliveryMinor, taxMinor, totalMinor: taxableMinor + taxMinor };
}

export function validateClassAllocation(allocations: readonly ClassAllocation[], pizzaBoxes: number) {
  const allocated = allocations.reduce((sum, item) => sum + item.pizzaBoxes, 0);
  if (allocations.some((item) => !Number.isSafeInteger(item.pizzaBoxes) || item.pizzaBoxes < 0)) throw new Error("Class allocations must be whole, non-negative box counts.");
  if (allocated !== pizzaBoxes) throw new Error(`Allocate all ${pizzaBoxes} pizza boxes by class.`);
  return true;
}

export function calculatePendingTickets(pizzaBoxes: number) {
  if (!Number.isSafeInteger(pizzaBoxes) || pizzaBoxes < 0) throw new Error("Pizza box count is invalid.");
  return pizzaBoxes * SCHOOL_PROGRAMME_CONFIG.ticketsPerQualifyingPizza;
}

export function shouldPostTickets(input: { delivered: boolean; paymentSatisfied: boolean; cancelled: boolean; existingBusinessKey?: string }) {
  return input.delivered && input.paymentSatisfied && !input.cancelled && !input.existingBusinessKey;
}

export function assertSchoolOwnership(sessionSchoolId: string | undefined, resourceSchoolId: string) {
  if (!sessionSchoolId || sessionSchoolId !== resourceSchoolId) throw new Error("You do not have access to this school resource.");
}

export function nextEligibleFridays(from = new Date(), count = 4) {
  const results: string[] = [];
  const cursor = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
  for (let i = 1; results.length < count && i < 60; i++) {
    const candidate = new Date(cursor); candidate.setUTCDate(cursor.getUTCDate() + i);
    const leadMs = candidate.getTime() - cursor.getTime();
    if (candidate.getUTCDay() === 5 && leadMs >= SCHOOL_PROGRAMME_CONFIG.minimumLeadDays * 86400000) results.push(candidate.toISOString().slice(0, 10));
  }
  return results;
}

export function cloneRepeatOrder(lines: readonly OrderQuantity[]) {
  const available = new Set(SCHOOL_PRODUCTS.filter((p) => p.active).map((p) => p.id));
  return lines.filter((line) => available.has(line.productId) && line.quantity > 0).map((line) => ({ ...line }));
}

export function isOrderCutoffOpen(now: Date, pizzaFriday: Date) {
  if (SCHOOL_PROGRAMME_CONFIG.programmePaused) return false;
  const cutoff = new Date(pizzaFriday);
  cutoff.setUTCDate(cutoff.getUTCDate() - SCHOOL_PROGRAMME_CONFIG.minimumLeadDays);
  cutoff.setUTCHours(SCHOOL_PROGRAMME_CONFIG.orderCutoffHourJamaica, 0, 0, 0);
  return pizzaFriday.getUTCDay() === 5 && now.getTime() <= cutoff.getTime();
}

export function paymentStatusFor(invoiceTotalMinor: number, paidMinor: number) {
  if (paidMinor <= 0) return "due_on_delivery" as const;
  if (paidMinor < invoiceTotalMinor) return "partially_paid" as const;
  return "paid" as const;
}

export function isRewardEligible(balance: number, threshold: number) {
  return Number.isSafeInteger(threshold) && threshold > 0 && balance >= threshold;
}

export function redeemReward(balance: number, threshold: number, existingBusinessKey?: string) {
  if (existingBusinessKey) throw new Error("This reward has already been redeemed.");
  if (!isRewardEligible(balance, threshold)) throw new Error("The reward is not yet eligible.");
  return { ticketsConsumed: threshold, remainingBalance: balance - threshold };
}
