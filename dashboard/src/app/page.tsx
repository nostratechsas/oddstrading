import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { BottomTicker } from "@/components/BottomTicker";
import { Filters } from "@/components/Filters";
import { Header } from "@/components/Header";
import { SectionView } from "@/components/SectionView";
import { Sidebar } from "@/components/Sidebar";
import { Toast } from "@/components/Toast";
import { SESSION_COOKIE, readSessionToken } from "@/lib/auth";
import { DashboardProvider } from "@/lib/store";

export default async function DashboardPage() {
  // The middleware only checks that a cookie exists — Edge has no node:crypto.
  // The signature is verified here, so a hand-written cookie gets bounced.
  const store = await cookies();
  if (!readSessionToken(store.get(SESSION_COOKIE)?.value)) redirect("/login");

  return (
    <DashboardProvider>
      <div className="flex h-dvh flex-col">
        <Header />

        <div className="flex min-h-0 flex-1">
          <Sidebar />

          <main className="min-w-0 flex-1 overflow-y-auto p-4">
            <Filters />
            <SectionView />
          </main>
        </div>

        <BottomTicker />
        <Toast />
      </div>
    </DashboardProvider>
  );
}
