import { Alerts } from "@/components/Alerts";
import { ArbitrageCard } from "@/components/ArbitrageCard";
import { BottomTicker } from "@/components/BottomTicker";
import { CompetitorsTable } from "@/components/CompetitorsTable";
import { EventsTable } from "@/components/EventsTable";
import { Filters } from "@/components/Filters";
import { Header } from "@/components/Header";
import { ImprovedOdds } from "@/components/ImprovedOdds";
import { MarketsWidget } from "@/components/MarketsWidget";
import { MovementChart } from "@/components/MovementChart";
import { Rise } from "@/components/Rise";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex h-dvh flex-col">
      <Header />

      <div className="flex min-h-0 flex-1">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-y-auto p-4">
          <Filters />

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
        </main>
      </div>

      <BottomTicker />
    </div>
  );
}
