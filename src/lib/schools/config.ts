export const SCHOOL_PROGRAMME_CONFIG = {
  currency: "JMD",
  pizzaSizeInches: 14,
  slicesPerPizza: 8,
  ticketsPerQualifyingPizza: 10,
  maxPizzaVarieties: 2,
  minimumLeadDays: 2,
  orderCutoffHourJamaica: 17,
  deliveryWindow: "11:00 AM – 1:00 PM",
  programmePaused: false,
  defaultDeliveryMinor: 0,
  defaultTaxRateBasisPoints: 0,
} as const;

export type SchoolProduct = {
  id: string;
  name: string;
  description: string;
  category: "pizza" | "batch";
  priceMinor: number;
  batchSize: number;
  unitLabel: string;
  active: boolean;
  sortOrder: number;
};

export const SCHOOL_PRODUCTS: readonly SchoolProduct[] = [
  { id: "cheesy-happy", name: "Cheesy Happy", description: "Classic cheese pizza.", category: "pizza", priceMinor: 250000, batchSize: 8, unitLabel: "slices", active: true, sortOrder: 1 },
  { id: "classic-happy", name: "Classic Happy", description: "Ham and cheese.", category: "pizza", priceMinor: 250000, batchSize: 8, unitLabel: "slices", active: true, sortOrder: 2 },
  { id: "school-special", name: "School Special", description: "Happy-Park's configured weekly special.", category: "pizza", priceMinor: 250000, batchSize: 8, unitLabel: "slices", active: true, sortOrder: 3 },
  { id: "juice-batch", name: "Juice Batch", description: "24 chilled juices.", category: "batch", priceMinor: 720000, batchSize: 24, unitLabel: "juices", active: true, sortOrder: 4 },
  { id: "fries-batch", name: "Fries Batch", description: "20 portions.", category: "batch", priceMinor: 600000, batchSize: 20, unitLabel: "portions", active: true, sortOrder: 5 },
  { id: "treats-batch", name: "Treats Batch", description: "20 portions.", category: "batch", priceMinor: 500000, batchSize: 20, unitLabel: "portions", active: true, sortOrder: 6 },
];

export function formatSchoolMoney(minor: number) {
  return new Intl.NumberFormat("en-JM", { style: "currency", currency: SCHOOL_PROGRAMME_CONFIG.currency, maximumFractionDigits: 0 }).format(minor / 100);
}
