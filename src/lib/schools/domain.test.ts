import assert from "node:assert/strict";
import test from "node:test";
import { assertSchoolOwnership, calculatePendingTickets, calculateSchoolOrder, canTransitionSchoolOrder, cloneRepeatOrder, isOrderCutoffOpen, isRewardEligible, paymentStatusFor, redeemReward, shouldPostTickets, validateClassAllocation } from "./domain.ts";
import { schoolApplicationSchema } from "./validation.ts";

test("20 school pizzas produce 160 slices", () => { const total = calculateSchoolOrder([{ productId: "cheesy-happy", quantity: 20 }]); assert.equal(total.totalSlices, 160); });
test("server totals use configured minor-unit prices", () => { const total = calculateSchoolOrder([{ productId: "cheesy-happy", quantity: 2 }]); assert.equal(total.totalMinor, 500000); });
test("maximum pizza variety policy is enforced", () => { assert.throws(() => calculateSchoolOrder([{ productId: "cheesy-happy", quantity: 1 }, { productId: "classic-happy", quantity: 1 }, { productId: "school-special", quantity: 1 }])); });
test("allocations must equal pizza boxes", () => { assert.equal(validateClassAllocation([{ classId: "a", pizzaBoxes: 8 }, { classId: "b", pizzaBoxes: 12 }], 20), true); assert.throws(() => validateClassAllocation([{ classId: "a", pizzaBoxes: 19 }], 20)); });
test("state transitions reject invalid jumps", () => { assert.equal(canTransitionSchoolOrder("submitted", "confirmed"), false); assert.equal(canTransitionSchoolOrder("under_review", "confirmed"), true); });
test("tickets post only once after delivery and payment", () => { assert.equal(calculatePendingTickets(20), 200); assert.equal(shouldPostTickets({ delivered: true, paymentSatisfied: true, cancelled: false }), true); assert.equal(shouldPostTickets({ delivered: true, paymentSatisfied: true, cancelled: false, existingBusinessKey: "order:1" }), false); assert.equal(shouldPostTickets({ delivered: true, paymentSatisfied: true, cancelled: true }), false); });
test("school resources are isolated", () => { assert.doesNotThrow(() => assertSchoolOwnership("school-a", "school-a")); assert.throws(() => assertSchoolOwnership("school-a", "school-b")); });
test("repeat order creates fresh available line values", () => { const original = [{ productId: "cheesy-happy", quantity: 4 }]; const copy = cloneRepeatOrder(original); assert.deepEqual(copy, original); assert.notEqual(copy, original); assert.notEqual(copy[0], original[0]); });
test("application validation rejects missing agreements", () => { assert.equal(schoolApplicationSchema.safeParse({ schoolName: "Test" }).success, false); });
test("batch quantities calculate from configured batch sizes", () => { const total = calculateSchoolOrder([{ productId: "juice-batch", quantity: 2 }]); assert.equal(total.lines[0].batchSize * total.lines[0].quantity, 48); });
test("Friday cutoff closes after configured lead time", () => { const friday = new Date("2026-10-09T12:00:00Z"); assert.equal(isOrderCutoffOpen(new Date("2026-10-06T12:00:00Z"), friday), true); assert.equal(isOrderCutoffOpen(new Date("2026-10-08T18:00:00Z"), friday), false); });
test("payment status is independent and amount based", () => { assert.equal(paymentStatusFor(1000, 0), "due_on_delivery"); assert.equal(paymentStatusFor(1000, 500), "partially_paid"); assert.equal(paymentStatusFor(1000, 1000), "paid"); });
test("reward eligibility and redemption are idempotent", () => { assert.equal(isRewardEligible(800, 800), true); assert.deepEqual(redeemReward(900, 800), { ticketsConsumed: 800, remainingBalance: 100 }); assert.throws(() => redeemReward(900, 800, "reward:1")); });
