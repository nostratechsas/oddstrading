"use client";

import { Alerts } from "@/components/Alerts";
import { ArbitrageCard } from "@/components/ArbitrageCard";
import { CompetitorsTable } from "@/components/CompetitorsTable";
import { EventsTable } from "@/components/EventsTable";
import { ImprovedOdds } from "@/components/ImprovedOdds";
import { Locked } from "@/components/Locked";
import { MarketsWidget } from "@/components/MarketsWidget";
import { MovementChart } from "@/components/MovementChart";
import { Rise } from "@/components/Rise";
import { useDashboard } from "@/lib/store";

/** Section labels, for the lock panel's headline. */
const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  mercados: "Mercados",
  alertas: "Alertas",
  arbitraje: "Arbitraje",
  analytics: "Analytics",
};

/**
 * The free tier opens Competidores only, and even there just the filters and
 * the ranking table. Everything else is blurred behind a padlock with a 15 s
 * teaser that shows scrambled figures rather than the real feed.
 */
export function SectionView() {
  const { section } = useDashboard();

  if (section !== "competidores") {
    return (
      <Locked
        variant="section"
        title={`${LABELS[section] ?? "Esta sección"} · desbloquéala con tu suscripción`}
        className="min-h-[32rem]"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-8">
            <MovementChart />
          </div>
          <div className="col-span-12 flex flex-col gap-4 xl:col-span-4">
            <MarketsWidget />
            <ImprovedOdds />
          </div>
          <div className="col-span-12 lg:col-span-7">
            <EventsTable />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Alerts />
          </div>
        </div>
      </Locked>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Free: the ranking table. */}
      <Rise className="col-span-12 xl:col-span-8">
        <CompetitorsTable />
      </Rise>

      <div className="col-span-12 flex flex-col gap-4 xl:col-span-4">
        <Rise step={1}>
          <Locked>
            <MarketsWidget />
          </Locked>
        </Rise>
        <Rise step={2}>
          <Locked>
            <ImprovedOdds />
          </Locked>
        </Rise>
        <Rise step={3}>
          <Locked>
            <ArbitrageCard />
          </Locked>
        </Rise>
      </div>

      <Rise step={2} className="col-span-12 lg:col-span-6 xl:col-span-5">
        <Locked className="h-full">
          <EventsTable />
        </Locked>
      </Rise>
      <Rise step={3} className="col-span-12 lg:col-span-6 xl:col-span-4">
        <Locked className="h-full">
          <MovementChart />
        </Locked>
      </Rise>
      <Rise step={4} className="col-span-12 xl:col-span-3">
        <Locked className="h-full">
          <Alerts />
        </Locked>
      </Rise>
    </div>
  );
}
