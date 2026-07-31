"use client";

import { Alerts } from "@/components/Alerts";
import { ArbitrageCard } from "@/components/ArbitrageCard";
import { CompetitorsTable } from "@/components/CompetitorsTable";
import { EventsTable } from "@/components/EventsTable";
import { ImprovedOdds } from "@/components/ImprovedOdds";
import { MarketsWidget } from "@/components/MarketsWidget";
import { MovementChart } from "@/components/MovementChart";
import { Rise } from "@/components/Rise";
import { useDashboard } from "@/lib/store";

/**
 * Each nav item is a real view over the same data, not a link to nowhere. The
 * widgets are shared; only the composition changes, so a section never shows a
 * placeholder.
 */
export function SectionView() {
  const { section } = useDashboard();

  if (section === "mercados") {
    return (
      <div className="grid grid-cols-12 gap-4">
        <Rise className="col-span-12 xl:col-span-7">
          <EventsTable />
        </Rise>
        <Rise step={1} className="col-span-12 xl:col-span-5">
          <MarketsWidget />
        </Rise>
        <Rise step={2} className="col-span-12">
          <CompetitorsTable />
        </Rise>
      </div>
    );
  }

  if (section === "alertas") {
    return (
      <div className="grid grid-cols-12 gap-4">
        <Rise className="col-span-12 lg:col-span-5">
          <Alerts />
        </Rise>
        <Rise step={1} className="col-span-12 lg:col-span-7">
          <MovementChart />
        </Rise>
        <Rise step={2} className="col-span-12">
          <EventsTable />
        </Rise>
      </div>
    );
  }

  if (section === "arbitraje") {
    return (
      <div className="grid grid-cols-12 gap-4">
        <Rise className="col-span-12">
          <ArbitrageCard />
        </Rise>
        <Rise step={1} className="col-span-12 xl:col-span-8">
          <CompetitorsTable />
        </Rise>
        <div className="col-span-12 flex flex-col gap-4 xl:col-span-4">
          <Rise step={2}>
            <ImprovedOdds />
          </Rise>
          <Rise step={3}>
            <Alerts />
          </Rise>
        </div>
      </div>
    );
  }

  if (section === "analytics") {
    return (
      <div className="grid grid-cols-12 gap-4">
        <Rise className="col-span-12 xl:col-span-8">
          <MovementChart />
        </Rise>
        <Rise step={1} className="col-span-12 xl:col-span-4">
          <MarketsWidget />
        </Rise>
        <Rise step={2} className="col-span-12">
          <CompetitorsTable />
        </Rise>
      </div>
    );
  }

  if (section === "dashboard") {
    return (
      <div className="grid grid-cols-12 gap-4">
        <Rise className="col-span-12 lg:col-span-6 xl:col-span-5">
          <EventsTable />
        </Rise>
        <Rise step={1} className="col-span-12 lg:col-span-6 xl:col-span-4">
          <MovementChart />
        </Rise>
        <Rise step={2} className="col-span-12 xl:col-span-3">
          <Alerts />
        </Rise>
        <Rise step={3} className="col-span-12 xl:col-span-8">
          <CompetitorsTable />
        </Rise>
        <div className="col-span-12 flex flex-col gap-4 xl:col-span-4">
          <Rise step={4}>
            <MarketsWidget />
          </Rise>
          <Rise step={5}>
            <ImprovedOdds />
          </Rise>
          <Rise step={6}>
            <ArbitrageCard />
          </Rise>
        </div>
      </div>
    );
  }

  // "competidores" — the default, and the layout of the reference capture.
  return (
    <div className="grid grid-cols-12 gap-4">
      <Rise className="col-span-12 xl:col-span-8">
        <CompetitorsTable />
      </Rise>

      <div className="col-span-12 flex flex-col gap-4 xl:col-span-4">
        <Rise step={1}>
          <MarketsWidget />
        </Rise>
        <Rise step={2}>
          <ImprovedOdds />
        </Rise>
        <Rise step={3}>
          <ArbitrageCard />
        </Rise>
      </div>

      <Rise step={2} className="col-span-12 lg:col-span-6 xl:col-span-5">
        <EventsTable />
      </Rise>
      <Rise step={3} className="col-span-12 lg:col-span-6 xl:col-span-4">
        <MovementChart />
      </Rise>
      <Rise step={4} className="col-span-12 xl:col-span-3">
        <Alerts />
      </Rise>
    </div>
  );
}
