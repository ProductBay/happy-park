export type CustomerAdmissionPassStatus =
  | "active"
  | "used"
  | "revoked"
  | "cancelled"
  | "expired";

export type CustomerAdmissionPass = {
  id: string;
  passNumber: string;
  credential: string;
  guestType: "adult" | "child";
  sequenceNumber: number;
  status: CustomerAdmissionPassStatus;
  validDate: string;
};

export type CustomerAdmissionBooking = {
  reference: string;
  visitDate: string;
  customerName: string;
  location: string;
  passes: CustomerAdmissionPass[];
};
