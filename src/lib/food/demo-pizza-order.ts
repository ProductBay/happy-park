export type PizzaOrderStage =
  | "received"
  | "preparing"
  | "oven"
  | "packaging"
  | "ready"
  | "slyde"
  | "delivered";

export type DemoPizzaOrder = {
  reference: string;
  customerName: string;
  pizzaName: string;
  fulfillment: "pickup" | "delivery";
  totalMinor: number;
  stage: PizzaOrderStage;
  ovenSeconds: number;
};

export const demoPizzaOrder: DemoPizzaOrder = {
  reference: "HP-1048",
  customerName: "Happy-Park Guest",
  pizzaName: "Build Your Own Happy Pizza",
  fulfillment: "delivery",
  totalMinor: 870000,
  stage: "received",
  ovenSeconds: 45,
};

export const pizzaOrderStages = [
  {
    id: "received",
    label: "Order received",
    customerCopy: "Your order is with the Happy-Park kitchen.",
  },
  {
    id: "preparing",
    label: "Preparing",
    customerCopy: "Our kitchen is building your pizza.",
  },
  {
    id: "oven",
    label: "Pizza in the oven",
    customerCopy: "The magic is happening. Your pizza is baking!",
  },
  {
    id: "packaging",
    label: "Packaging",
    customerCopy: "Fresh from the oven and being packed with care.",
  },
  {
    id: "ready",
    label: "Ready",
    customerCopy: "Your Happy Meal is ready!",
  },
  {
    id: "slyde",
    label: "Out for delivery",
    customerCopy: "Your order is moving with SLYDE.",
  },
  {
    id: "delivered",
    label: "Delivered",
    customerCopy: "Delivered. Enjoy your Happy-Park meal!",
  },
] as const;
