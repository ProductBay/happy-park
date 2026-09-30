export type ParkDestinationId = "park" | "food" | "parties" | "schools" | "her" | "visit";

export type ParkDestination = {
  id: ParkDestinationId;
  name: string;
  shortName: string;
  description: string;
  href: string;
  cta: string;
  position: { x: number; y: number };
  theme: "gate" | "food" | "party" | "school" | "wellness" | "visit";
  secondary?: { label: string; href: string };
};

export const parkDestinations: readonly ParkDestination[] = [
  { id: "park", name: "Happy-Park", shortName: "Happy-Park", description: "Explore everything Happy-Park has to offer.", href: "/", cta: "Enter Happy-Park", position: { x: 50, y: 48 }, theme: "gate" },
  { id: "food", name: "Food & Pizza", shortName: "Food", description: "Build your pizza, choose your favourites and create your Happy-Park meal.", href: "/food", cta: "Explore Food", position: { x: 78, y: 35 }, theme: "food", secondary: { label: "Build Pizza", href: "/food#pizza-studio" } },
  { id: "parties", name: "Parties & Celebrations", shortName: "Parties", description: "Make their special day a Happy-Park day.", href: "/parties", cta: "Explore Parties", position: { x: 72, y: 73 }, theme: "party" },
  { id: "schools", name: "Happy-Park for Schools", shortName: "Schools", description: "Pizza Fridays, school rewards and memorable class experiences.", href: "/schools", cta: "School Programme", position: { x: 22, y: 38 }, theme: "school" },
  { id: "her", name: "HER Hair & Wellness", shortName: "HER", description: "Advanced hair therapy, natural hair care and wellness.", href: "/her", cta: "Explore HER", position: { x: 50, y: 18 }, theme: "wellness" },
  { id: "visit", name: "Plan Your Visit", shortName: "Visit", description: "Plan the family day before you arrive.", href: "/visit", cta: "Plan a Visit", position: { x: 28, y: 75 }, theme: "visit" },
] as const;

export function getParkDestination(id: ParkDestinationId) {
  return parkDestinations.find((destination) => destination.id === id);
}
