export type AdmissionDashboardActivityStatus =
  | "accepted"
  | "rejected"
  | "already_used"
  | "invalid"
  | "revoked";

export type AdmissionDashboardActivity = {
  id: string;
  scannedAt: string;
  status: AdmissionDashboardActivityStatus;
  passNumber: string;
  bookingReference: string;
  guestType: "adult" | "child";
  gate: string | null;
  staffName: string | null;
  reason: string | null;
};

export type AdmissionDashboardData = {
  date: string;
  generatedAt: string;
  expectedGuests: number;
  checkedIn: number;
  remaining: number;
  attention: number;
  recentActivity: AdmissionDashboardActivity[];
};
