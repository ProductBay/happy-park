import type {
  AdmissionPackage,
  BookingExtra,
} from "@/types/booking";

export const admissionPackages: AdmissionPackage[] = [
  {
    id: "general",
    name: "General Admission",
    description:
      "A flexible Happy-Park visit for families who want to enjoy the park at their own pace.",
    priceAdult: 1200,
    priceChild: 1800,
    badge: "Popular",
    features: [
      "Park admission",
      "Access to general play areas",
      "Digital booking confirmation",
    ],
  },
  {
    id: "family",
    name: "Family Day",
    description:
      "A value-focused visit package designed for families spending more time together at Happy-Park.",
    priceAdult: 1500,
    priceChild: 2200,
    features: [
      "Park admission",
      "Expanded family experience",
      "Priority digital check-in",
    ],
  },
  {
    id: "premium",
    name: "Happy Day+",
    description:
      "A premium visit experience with additional Happy-Park benefits and extras.",
    priceAdult: 2000,
    priceChild: 2800,
    badge: "Best Experience",
    features: [
      "Park admission",
      "Premium experience access",
      "Priority check-in",
      "Selected visit extra",
    ],
  },
];

export const bookingExtras: BookingExtra[] = [
  {
    id: "meal-credit",
    name: "Food Credit",
    description:
      "Add food credit that can be used toward eligible Happy-Park Kitchen items during your visit.",
    price: 1000,
    unit: "booking",
  },
  {
    id: "celebration-pack",
    name: "Mini Celebration Pack",
    description:
      "A small Happy-Park celebration add-on for special family moments.",
    price: 1800,
    unit: "booking",
  },
  {
    id: "priority-checkin",
    name: "Priority Arrival",
    description:
      "Use the priority arrival lane when available for a faster start to your Happy-Park day.",
    price: 500,
    unit: "booking",
  },
];
