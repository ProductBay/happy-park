import {
  CircleAlert,
  Clock3,
  TicketCheck,
  UsersRound,
} from "lucide-react";

type AdmissionMetricsProps = {
  enabled: boolean;
  expectedGuests?: number;
  checkedIn?: number;
  remaining?: number;
  attention?: number;
};

export function AdmissionMetrics({
  enabled,
  expectedGuests = 0,
  checkedIn = 0,
  remaining = 0,
  attention = 0,
}: AdmissionMetricsProps) {
  const metrics = [
    {
      label: "Expected",
      value: expectedGuests,
      helper: "Guests booked today",
      icon: UsersRound,
    },
    {
      label: "Checked in",
      value: checkedIn,
      helper: "Guests admitted",
      icon: TicketCheck,
    },
    {
      label: "Remaining",
      value: remaining,
      helper: "Still expected",
      icon: Clock3,
    },
    {
      label: "Attention",
      value: attention,
      helper:
        "Rejected or duplicate scans",
      icon: CircleAlert,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.label}
            className="rounded-[24px] border border-black/5 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-black/45">
                  {metric.label}
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-tight text-[#14271e]">
                  {enabled
                    ? metric.value.toLocaleString(
                        "en-JM",
                      )
                    : "—"}
                </p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-2xl bg-[#164b33]/7 text-[#164b33]">
                <Icon className="size-4" />
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-black/40">
              {enabled
                ? metric.helper
                : "Available when live admissions are enabled"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
