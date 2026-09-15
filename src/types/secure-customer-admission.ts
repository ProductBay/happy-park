export type SecureCustomerAdmissionPass = {
  id: string;
  passNumber: string;
  credential: string;
  guestType: "adult" | "child";
  sequenceNumber: number;
  status:
    | "active"
    | "used"
    | "revoked"
    | "cancelled"
    | "expired";
  validDate: string;
};

export type SecureCustomerAdmissionBooking = {
  reference: string;
  visitDate: string;
  customerName: string;
  location: string;
  passes: SecureCustomerAdmissionPass[];
};
