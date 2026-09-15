export type AttractionPreview = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  ageGuide: string;
  experience: string;
  icon:
    | "trampoline"
    | "slide"
    | "swing"
    | "ride"
    | "animals"
    | "birds"
    | "pond"
    | "movie";
  featured?: boolean;
};

export const attractionsPreview: AttractionPreview[] = [
  {
    id: "trampolines",
    name: "Trampolines",
    eyebrow: "Jump Into Happy",
    description:
      "Bounce, jump and burn off some happy energy on the Happy-Park trampolines.",
    ageGuide: "Family fun",
    experience: "Jump & Play",
    icon: "trampoline",
    featured: true,
  },
  {
    id: "slides",
    name: "Slides",
    eyebrow: "Up. Down. Again!",
    description:
      "Climb up, slide down and do it all over again — a classic Happy-Park adventure.",
    ageGuide: "Kids' favourite",
    experience: "Active Play",
    icon: "slide",
  },
  {
    id: "swings",
    name: "Swings",
    eyebrow: "Reach For The Sky",
    description:
      "Swing into the fun and enjoy one of those timeless childhood experiences kids never outgrow.",
    ageGuide: "Family fun",
    experience: "Play",
    icon: "swing",
  },
  {
    id: "riding-toys",
    name: "Riding Toys",
    eyebrow: "Ready. Set. Ride!",
    description:
      "Little drivers can climb aboard and enjoy their own Happy-Park riding adventure.",
    ageGuide: "Young adventurers",
    experience: "Ride & Explore",
    icon: "ride",
    featured: true,
  },
  {
    id: "petting-animals",
    name: "Petting Animals",
    eyebrow: "Meet Our Little Friends",
    description:
      "Slow the adventure down and enjoy a fun, up-close animal experience at Happy-Park.",
    ageGuide: "Family experience",
    experience: "Animals & Nature",
    icon: "animals",
  },
  {
    id: "birds",
    name: "Birds & Guinea Chicks",
    eyebrow: "Little Wings. Big Curiosity.",
    description:
      "Discover some of Happy-Park's feathered residents, including common fowls and guinea chicks.",
    ageGuide: "Look, learn & enjoy",
    experience: "Animals & Nature",
    icon: "birds",
  },
  {
    id: "koi-pond",
    name: "Koi Pond",
    eyebrow: "A Quiet Happy Moment",
    description:
      "Take a peaceful break from the action and enjoy the colourful koi pond with the family.",
    ageGuide: "All-family experience",
    experience: "Nature",
    icon: "pond",
  },
  {
    id: "movie-night",
    name: "Movie Night",
    eyebrow: "Movies Under Happy Skies",
    description:
      "Special Happy-Park movie nights turn family screen time into an experience to enjoy together.",
    ageGuide: "Selected dates",
    experience: "Special Event",
    icon: "movie",
    featured: true,
  },
];

export const happyParkFoodHighlights = [
  "Pizza",
  "Hot Dogs",
  "Hamburgers",
  "Popcorn",
  "Snow Cones",
  "Cotton Candy",
  "Ice Cream",
] as const;
