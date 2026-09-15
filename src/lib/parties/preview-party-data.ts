export type PartyPackagePreview = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  startingPriceMinor: number;
  includedChildren: number;
  durationHours: number;
  accent: string;
  popular?: boolean;
  features: string[];
};

export type PartyExtraPreview = {
  id: string;
  name: string;
  description: string;
  priceMinor: number;
};

export const partyPackagesPreview: PartyPackagePreview[] = [
  {
    id: "happy-start",
    name: "Happy Start",
    eyebrow: "Simple & Fun",
    description:
      "A bright, easy celebration package for families who want a beautiful party without overcomplicating the day.",
    startingPriceMinor: 2500000,
    includedChildren: 10,
    durationHours: 2,
    accent: "Sunshine",
    features: [
      "Reserved celebration area",
      "Park admission for 10 children",
      "Birthday table setup",
      "Happy-Park party host",
      "Digital birthday photo moment",
    ],
  },
  {
    id: "big-happy",
    name: "Big Happy Party",
    eyebrow: "Most Popular",
    description:
      "A fuller Happy-Park birthday experience with food, decorations and extra play time built in.",
    startingPriceMinor: 3950000,
    includedChildren: 15,
    durationHours: 3,
    accent: "Celebration",
    popular: true,
    features: [
      "Reserved premium celebration area",
      "Park admission for 15 children",
      "Pizza party meal",
      "Themed table styling",
      "Birthday host",
      "Birthday child spotlight moment",
      "Group photo experience",
    ],
  },
  {
    id: "ultimate-happy",
    name: "Ultimate Happy",
    eyebrow: "Signature Experience",
    description:
      "The premium all-in celebration for families who want the birthday to feel truly special from arrival to goodbye.",
    startingPriceMinor: 5950000,
    includedChildren: 20,
    durationHours: 4,
    accent: "Signature",
    features: [
      "Private premium party zone",
      "Park admission for 20 children",
      "Full pizza & refreshments package",
      "Premium themed decoration",
      "Dedicated celebration host",
      "Birthday cake presentation moment",
      "Priority attraction access",
      "Digital keepsake gallery",
    ],
  },
];

export const partyExtrasPreview: PartyExtraPreview[] = [
  {
    id: "extra-child",
    name: "Additional Child",
    description: "Add another child above your package allowance.",
    priceMinor: 220000,
  },
  {
    id: "decor-upgrade",
    name: "Premium Decor Upgrade",
    description: "Enhanced themed styling, balloons and celebration details.",
    priceMinor: 850000,
  },
  {
    id: "cake-moment",
    name: "Cake Presentation",
    description: "A hosted birthday cake presentation and photo moment.",
    priceMinor: 450000,
  },
  {
    id: "party-favors",
    name: "Happy-Park Favour Pack",
    description: "Take-home celebration pack for the birthday guests.",
    priceMinor: 650000,
  },
];

export const partyDatesPreview = [
  {
    id: "sat-1",
    label: "Saturday",
    date: "September 19",
    availability: "Morning & afternoon",
  },
  {
    id: "sun-1",
    label: "Sunday",
    date: "September 20",
    availability: "Afternoon available",
  },
  {
    id: "sat-2",
    label: "Saturday",
    date: "September 26",
    availability: "Good availability",
  },
  {
    id: "sun-2",
    label: "Sunday",
    date: "September 27",
    availability: "Limited availability",
  },
];

export const partyTimesPreview = [
  "10:00 AM",
  "12:30 PM",
  "3:00 PM",
  "5:00 PM",
];
