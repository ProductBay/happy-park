export type PreparedBookingQuote = {
  quoteId: string;
  reference: string;
  currency: string;

  expiresAt: string;

  visitDate: string;

  guestCount: number;

  package: {
    id: string;
    name: string;
  };

  extras: {
    id: string;
    name: string;
  }[];

  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  pricing: {
    admissionSubtotal: number;
    extrasSubtotal: number;
    total: number;

    admissionSubtotalMinor: number;
    extrasSubtotalMinor: number;
    totalMinor: number;
  };

  persistenceEnabled: boolean;
  paymentEnabled: boolean;
};

export type PrepareBookingSuccess = {
  ok: true;
  quote: PreparedBookingQuote;
};

export type PrepareBookingFailure = {
  ok: false;
  message: string;
  issues?: Record<string, string[]>;
};

export type PrepareBookingResponse =
  | PrepareBookingSuccess
  | PrepareBookingFailure;
