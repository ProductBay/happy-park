import { calculateSchoolOrder, calculatePendingTickets, nextEligibleFridays } from "./domain";

export const demoSchool = { id: "demo-school-1", name: "Southfield Primary & Infant", status: "approved", outstandingMinor: 250000, tickets: 1840 };
export const demoClasses = [
  { id: "grade-1a", name: "Grade 1A", grade: "1", tickets: 420 }, { id: "grade-2a", name: "Grade 2A", grade: "2", tickets: 680 },
  { id: "grade-3b", name: "Grade 3B", grade: "3", tickets: 510 }, { id: "grade-4a", name: "Grade 4A", grade: "4", tickets: 230 },
];
export const demoOrder = { id: "demo-order-1", reference: "HP-SCH-2026-000123", friday: nextEligibleFridays()[0], status: "confirmed", paymentStatus: "due_on_delivery", ...calculateSchoolOrder([{ productId: "cheesy-happy", quantity: 12 }, { productId: "classic-happy", quantity: 8 }, { productId: "juice-batch", quantity: 2 }]) };
export const demoTicketsPending = calculatePendingTickets(demoOrder.pizzaBoxes);
