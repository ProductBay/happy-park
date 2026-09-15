"use client";

import { RefreshCw } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { AdmissionMetrics } from "@/components/admin/admission/admission-metrics";
import { RecentAdmissionActivity } from "@/components/admin/admission/recent-admission-activity";
import type { AdmissionDashboardData } from "@/types/admission-dashboard";

type AdmissionDashboardClientProps = {
  liveEnabled: boolean;
};

export function AdmissionDashboardClient({
  liveEnabled,
}: AdmissionDashboardClientProps) {
  const [dashboard, setDashboard] =
    useState<AdmissionDashboardData | null>(
      null,
    );

  const [loading, setLoading] =
    useState(liveEnabled);

  const [error, setError] =
    useState<string | null>(null);

  const loadDashboard =
    useCallback(async () => {
      if (!liveEnabled) {
        return;
      }

      try {
        const response = await fetch(
          "/api/admission/dashboard",
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (!response.ok) {
          const data = (await response.json()) as {
            error?: string;
          };

          throw new Error(
            data.error ??
              "Unable to load admissions.",
          );
        }

        const data =
          (await response.json()) as AdmissionDashboardData;

        setDashboard(data);
        setError(null);
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to load admissions.",
        );
      } finally {
        setLoading(false);
      }
    }, [liveEnabled]);

  useEffect(() => {
    if (!liveEnabled) {
      return;
    }

    const initialLoad =
      window.setTimeout(() => {
        void loadDashboard();
      }, 0);

    const interval =
      window.setInterval(() => {
        void loadDashboard();
      }, 15000);

    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(interval);
    };
  }, [liveEnabled, loadDashboard]);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          {liveEnabled &&
          dashboard ? (
            <p className="text-xs font-medium text-black/35">
              Operational data refreshes automatically.
            </p>
          ) : null}

          {error ? (
            <p className="text-sm font-medium text-rose-700">
              {error}
            </p>
          ) : null}
        </div>

        {liveEnabled ? (
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              void loadDashboard();
            }}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-xs font-semibold text-[#164b33] shadow-sm transition hover:bg-[#fbf7ed] disabled:opacity-50"
          >
            <RefreshCw
              className={[
                "size-3.5",
                loading
                  ? "animate-spin"
                  : "",
              ].join(" ")}
            />
            Refresh
          </button>
        ) : null}
      </div>

      <div className="mt-3">
        <AdmissionMetrics
          enabled={liveEnabled}
          expectedGuests={
            dashboard?.expectedGuests ?? 0
          }
          checkedIn={
            dashboard?.checkedIn ?? 0
          }
          remaining={
            dashboard?.remaining ?? 0
          }
          attention={
            dashboard?.attention ?? 0
          }
        />
      </div>

      <div className="mt-6">
        <RecentAdmissionActivity
          enabled={liveEnabled}
          activities={
            dashboard?.recentActivity ??
            []
          }
        />
      </div>
    </>
  );
}


