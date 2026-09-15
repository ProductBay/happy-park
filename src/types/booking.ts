export type GuestCounts = {
  adults: number;
  children: number;
};

export type CustomerDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type AdmissionPackage = {
  id: string;
  name: string;
  description: string;
  priceAdult: number;
  priceChild: number;
  badge?: string;
  features: string[];
};

export type BookingExtra = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: "booking" | "person";
};

export type VisitBookingState = {
  visitDate: string;

  guests: GuestCounts;

  packageId: string;

  extraIds: string[];

  customer: CustomerDetails;
};

export type BookingStepId =
  | "date"
  | "guests"
  | "package"
  | "extras"
  | "review"
  | "details"
  | "checkout";
