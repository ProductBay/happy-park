import {
  CheckCircle2,
  CircleAlert,
  CircleX,
  Clock3,
  Radio,
} from "lucide-react";

import type { AdmissionDashboardActivity } from "@/types/admission-dashboard";

type RecentAdmissionActivityProps = {
  enabled: boolean;
  activities?: AdmissionDashboardActivity[];
};

function formatScanTime(
  value: string,
) {
  return new Intl.DateTimeFormat(
    "en-JM",
    {
      timeZone: "America/Jamaica",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    },
  ).format(new Date(value));
}

function activityPresentation(
  status: AdmissionDashboardActivity["status"],
) {
  switch (status) {
    case "accepted":
      return {
        icon: CheckCircle2,
        label: "Admitted",
        shell:
          "bg-emerald-50 text-emerald-700",
      };

    case "already_used":
      return {
        icon: CircleAlert,
        label: "Already used",
        shell:
          "bg-amber-50 text-amber-700",
      };

    case "revoked":
      return {
        icon: CircleX,
        label: "Revoked",
        shell:
          "bg-rose-50 text-rose-700",
      };

    case "invalid":
    case "rejected":
    default:
      return {
        icon: CircleX,
        label: "Rejected",
        shell:
          "bg-rose-50 text-rose-700",
      };
  }
}

export function RecentAdmissionActivity({
  enabled,
  activities = [],
}: RecentAdmissionActivityProps) {
  return (
    <section className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">
            Live activity
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#14271e]">
            Recent admissions
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-[#164b33]/6 px-3 py-2 text-xs font-medium text-[#164b33]">
          <Radio className="size-3.5" />
          {enabled
            ? "Live"
            : "Standby"}
        </div>
      </div>

      {!enabled ? (
        <EmptyState
          title="Admission activity is not live yet"
          description="This feed will activate after the Happy-Park database and live admission service are enabled."
        />
      ) : activities.length === 0 ? (
        <EmptyState
          title="Waiting for the first scan"
          description="Accepted, duplicate and rejected scans will appear here in real time."
        />
      ) : (
        <div className="mt-6 divide-y divide-black/5">
          {activities.map(
            (activity) => {
              const presentation =
                activityPresentation(
                  activity.status,
                );

              const Icon =
                presentation.icon;

              return (
                <article
                  key={activity.id}
                  className="flex gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div
                    className={[
                      "flex size-10 shrink-0 items-center justify-center rounded-2xl",
                      presentation.shell,
                    ].join(" ")}
                  >
                    <Icon className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-[#14271e]">
                        {
                          presentation.label
                        }
                      </p>

                      <time className="text-xs font-medium text-black/35">
                        {formatScanTime(
                          activity.scannedAt,
                        )}
                      </time>
                    </div>

                    <p className="mt-1 truncate text-sm font-medium text-black/60">
                      {
                        activity.passNumber
                      }
                    </p>

                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-black/40">
                      <span>
                        Booking{" "}
                        {
                          activity.bookingReference
                        }
                      </span>

                      <span>
                        {activity.guestType ===
                        "adult"
                          ? "Adult"
                          : "Child"}
                      </span>

                      {activity.gate ? (
                        <span>
                          {
                            activity.gate
                          }
                        </span>
                      ) : null}

                      {activity.staffName ? (
                        <span>
                          Staff:{" "}
                          {
                            activity.staffName
                          }
                        </span>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      )}
    </section>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mt-8 flex min-h-44 flex-col items-center justify-center rounded-[24px] border border-dashed border-black/10 bg-[#fbf7ed]/55 px-6 text-center">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#164b33] shadow-sm">
        <Clock3 className="size-4" />
      </div>

      <p className="mt-4 font-medium text-[#14271e]">
        {title}
      </p>

      <p className="mt-2 max-w-md text-sm leading-6 text-black/45">
        {description}
      </p>
    </div>
  );
}
