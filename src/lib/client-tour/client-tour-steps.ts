export type ClientTourStep = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  route: string;
  actionLabel: string;
  continueLabel?: string;
  section: "customer" | "business";
  mode: "spotlight" | "workflow";
};

export const clientTourSteps: ClientTourStep[] = [
  {
    id: "welcome",
    eyebrow: "Welcome to Happy-Park",
    title: "Your digital Happy-Park experience is ready to explore.",
    description:
      "This guided preview will take you through the customer experience and then behind the scenes into the Happy-Park Business OS. You can test the real demo workflows along the way.",
    route: "/",
    actionLabel: "Begin the tour",
    continueLabel: "Start exploring",
    section: "customer",
    mode: "spotlight",
  },
  {
    id: "home",
    eyebrow: "01 · Digital Front Door",
    title: "Start with the Happy-Park experience.",
    description:
      "The homepage introduces Happy-Park as a premium family destination and connects visitors to attractions, visits, parties, food, shopping and more.",
    route: "/",
    actionLabel: "Explore homepage",
    section: "customer",
    mode: "spotlight",
  },
  {
    id: "attractions",
    eyebrow: "02 · Discover",
    title: "See what families can experience.",
    description:
      "Explore Happy-Park's real attractions including trampolines, slides, swings, riding toys, animals, birds, the koi pond and Movie Night.",
    route: "/attractions",
    actionLabel: "View attractions",
    section: "customer",
    mode: "spotlight",
  },
  {
    id: "visit",
    eyebrow: "03 · Plan",
    title: "Turn interest into a park visit.",
    description:
      "The Plan Your Visit experience helps families understand their Happy-Park day before moving into the booking journey.",
    route: "/visit",
    actionLabel: "Plan a visit",
    section: "customer",
    mode: "spotlight",
  },
  {
    id: "visit-booking",
    eyebrow: "04 · Try the Workflow",
    title: "Test the visit booking experience.",
    description:
      "Open the real demo booking flow. Choose the visit details and explore how a customer moves toward confirmation and their Happy-Park pass.",
    route: "/book/visit",
    actionLabel: "Test visit booking",
    continueLabel: "I'm finished testing",
    section: "customer",
    mode: "workflow",
  },
  {
    id: "parties",
    eyebrow: "05 · Celebrate",
    title: "Happy-Park becomes a birthday destination.",
    description:
      "The parties experience presents celebrations as a complete Happy-Park offering before families enter the interactive Party Builder.",
    route: "/parties",
    actionLabel: "Explore parties",
    section: "customer",
    mode: "spotlight",
  },
  {
    id: "party-builder",
    eyebrow: "06 · Try the Workflow",
    title: "Build a birthday party.",
    description:
      "Test the Party Builder and see how packages, guest counts, food and extras can become one guided booking journey.",
    route: "/book/party",
    actionLabel: "Test Party Builder",
    continueLabel: "I'm finished testing",
    section: "customer",
    mode: "workflow",
  },
  {
    id: "food",
    eyebrow: "07 · Food & Ordering",
    title: "Food is part of the digital experience too.",
    description:
      "Happy-Park food now has its own storefront covering pizza, burgers, hot dogs, popcorn, snow cones, cotton candy, ice cream and more.",
    route: "/food",
    actionLabel: "Explore food",
    section: "customer",
    mode: "spotlight",
  },
  {
    id: "pizza-studio",
    eyebrow: "08 · Interactive Experience",
    title: "Now try the Pizza Studio.",
    description:
      "Build a pizza using the interactive six-step experience. Test sizes, crusts, toppings, sides and drinks while the pizza responds visually.",
    route: "/food#pizza-studio",
    actionLabel: "Try Pizza Studio",
    continueLabel: "Pizza tested — continue",
    section: "customer",
    mode: "workflow",
  },
  {
    id: "tracking",
    eyebrow: "09 · Order Journey",
    title: "Follow an order after checkout.",
    description:
      "See how Happy-Park can keep customers informed as an order moves through preparation, oven, packaging, pickup and SLYDE delivery.",
    route: "/food/order/preview",
    actionLabel: "Test order tracking",
    continueLabel: "Tracking tested — continue",
    section: "customer",
    mode: "workflow",
  },
  {
    id: "shop",
    eyebrow: "10 · Natural Shop",
    title: "Happy-Park can sell beyond the park visit.",
    description:
      "Explore the herbal and natural-product storefront, category filtering, product presentation and interactive shopping bag.",
    route: "/shop",
    actionLabel: "Test the shop",
    continueLabel: "Shop tested — continue",
    section: "customer",
    mode: "workflow",
  },
  {
    id: "account",
    eyebrow: "11 · Customer Relationship",
    title: "One account connects the entire journey.",
    description:
      "The customer dashboard brings visits, QR passes, parties, food, shopping, SLYDE delivery and future rewards together.",
    route: "/account",
    actionLabel: "Open customer account",
    section: "customer",
    mode: "spotlight",
  },
  {
    id: "passes",
    eyebrow: "12 · Digital Admission",
    title: "See the QR pass experience.",
    description:
      "Happy-Park's admission architecture gives customers digital passes while staff receive a connected check-in workflow.",
    route: "/account/passes",
    actionLabel: "View QR passes",
    continueLabel: "Passes reviewed — continue",
    section: "customer",
    mode: "workflow",
  },
  {
    id: "business-transition",
    eyebrow: "Customer Experience Complete",
    title: "Now go behind the scenes.",
    description:
      "You have experienced Happy-Park from the customer's perspective. Next, see the operational platform the Happy-Park team can use to run the business.",
    route: "/admin",
    actionLabel: "Enter Business OS",
    section: "business",
    mode: "spotlight",
  },
  {
    id: "business-os",
    eyebrow: "13 · Happy-Park Business OS",
    title: "Run Happy-Park from one command center.",
    description:
      "See visitors, bookings, parties, food orders, shop activity, deliveries, customers and operational insights in one dashboard.",
    route: "/admin",
    actionLabel: "Explore Business OS",
    section: "business",
    mode: "spotlight",
  },
  {
    id: "check-in",
    eyebrow: "14 · Staff Workflow",
    title: "Finish by testing admission control.",
    description:
      "Open the existing Happy-Park check-in experience and see how staff can scan or locate customer passes at entry.",
    route: "/admin/check-in",
    actionLabel: "Test check-in",
    continueLabel: "Check-in tested — finish",
    section: "business",
    mode: "workflow",
  },
  {
    id: "complete",
    eyebrow: "Guided Tour Complete",
    title: "You have explored the Happy-Park platform.",
    description:
      "From discovery and bookings to food, commerce, QR admission, delivery and business operations, this preview demonstrates how Happy-Park can operate as one connected digital experience.",
    route: "/",
    actionLabel: "Finish tour",
    section: "business",
    mode: "spotlight",
  },
];
