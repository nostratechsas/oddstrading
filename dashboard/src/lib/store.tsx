"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { alerts, competitors, featuredEvents, markets, type Competitor } from "@/lib/data";

export type Section =
  | "dashboard"
  | "mercados"
  | "competidores"
  | "alertas"
  | "arbitraje"
  | "analytics";

export type SortKey = "rank" | "bookie" | "margin";
export type SortDir = "asc" | "desc";

/** Draft filters, applied to the view only when the user commits them. */
export interface Draft {
  country: string;
  league: string;
  event: string;
  day: string;
}

interface DashboardState {
  /** Signed-in account, read from the session cookie on the server. */
  user: string;

  section: Section;
  setSection: (section: Section) => void;

  /** Titles of notifications still unread. */
  unread: string[];
  markRead: (title: string) => void;
  markAllRead: () => void;

  theme: "dark" | "light";
  toggleTheme: () => void;

  /** Committed filters — what the widgets actually read. */
  filters: Draft;
  /** Pending filters — what the controls show before "Aplicar filtros". */
  draft: Draft;
  setDraft: (patch: Partial<Draft>) => void;
  applyDraft: () => void;
  resetFilters: () => void;
  /** True while the draft differs from what is applied. */
  dirty: boolean;

  sport: string;
  setSport: (sport: string) => void;

  search: string;
  setSearch: (search: string) => void;

  sort: { key: SortKey; dir: SortDir };
  toggleSort: (key: SortKey) => void;

  /** Chart controls. */
  chartBookie: string;
  setChartBookie: (bookie: string) => void;
  chartRange: string;
  setChartRange: (range: string) => void;

  /** Whether the widgets show their full list or the default top slice. */
  expanded: Record<string, boolean>;
  toggleExpanded: (key: string) => void;

  /** Derived views. */
  visibleCompetitors: Competitor[];
  visibleEvents: typeof featuredEvents;
  visibleMarkets: typeof markets;

  toast: string | null;
  notify: (message: string) => void;
}

const DEFAULTS: Draft = {
  country: "ec",
  league: "ligapro",
  event: "all",
  day: "today",
};

const DashboardContext = createContext<DashboardState | null>(null);

export function DashboardProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: string;
}) {
  const [section, setSection] = useState<Section>("competidores");
  const [unread, setUnread] = useState<string[]>(() => alerts.map((alert) => alert.title));
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [filters, setFilters] = useState<Draft>(DEFAULTS);
  const [draft, setDraftState] = useState<Draft>(DEFAULTS);
  const [sport, setSport] = useState("soccer");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "rank",
    dir: "asc",
  });
  const [chartBookie, setChartBookie] = useState("Ecuabet");
  const [chartRange, setChartRange] = useState("6h");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);

  const setDraft = useCallback((patch: Partial<Draft>) => {
    setDraftState((current) => ({ ...current, ...patch }));
  }, []);

  const markRead = useCallback((title: string) => {
    setUnread((current) => current.filter((item) => item !== title));
  }, []);

  const markAllRead = useCallback(() => setUnread([]), []);

  // Restore the saved choice before first paint of the toggle. The class also
  // gets stamped by an inline script in the layout, so there is no flash.
  useEffect(() => {
    const saved = window.localStorage.getItem("ot-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light-mode", theme === "light");
    window.localStorage.setItem("ot-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const notify = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const applyDraft = useCallback(() => {
    setFilters(draft);
    notify("Filtros aplicados");
  }, [draft, notify]);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULTS);
    setDraftState(DEFAULTS);
    setSearch("");
    notify("Filtros restablecidos");
  }, [notify]);

  const toggleSort = useCallback((key: SortKey) => {
    setSort((current) =>
      current.key === key
        ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  }, []);

  const toggleExpanded = useCallback((key: string) => {
    setExpanded((current) => ({ ...current, [key]: !current[key] }));
  }, []);

  const dirty = useMemo(
    () => (Object.keys(DEFAULTS) as (keyof Draft)[]).some((key) => draft[key] !== filters[key]),
    [draft, filters],
  );

  // Search matches the bookmaker; sorting is applied after, so a filtered list
  // keeps whatever order the user picked.
  const visibleCompetitors = useMemo(() => {
    const term = search.trim().toLowerCase();
    const rows = term
      ? competitors.filter((row) => row.bookie.toLowerCase().includes(term))
      : [...competitors];

    const factor = sort.dir === "asc" ? 1 : -1;
    return rows.sort((a, b) => {
      if (sort.key === "bookie") return a.bookie.localeCompare(b.bookie) * factor;
      if (sort.key === "margin") return (parseFloat(a.margin) - parseFloat(b.margin)) * factor;
      return (a.rank - b.rank) * factor;
    });
  }, [search, sort]);

  const visibleEvents = useMemo(() => {
    const term = search.trim().toLowerCase();
    return featuredEvents.filter((event) => {
      const matchesLeague = filters.league === "all" || event.leagueId === filters.league;
      const matchesSearch =
        !term ||
        event.teams.some((team) => team.name.toLowerCase().includes(term)) ||
        event.league.toLowerCase().includes(term);
      return matchesLeague && matchesSearch;
    });
  }, [filters.league, search]);

  const visibleMarkets = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term ? markets.filter((market) => market.name.toLowerCase().includes(term)) : markets;
  }, [search]);

  const value = useMemo<DashboardState>(
    () => ({
      user,
      section,
      setSection,
      unread,
      markRead,
      markAllRead,
      theme,
      toggleTheme,
      filters,
      draft,
      setDraft,
      applyDraft,
      resetFilters,
      dirty,
      sport,
      setSport,
      search,
      setSearch,
      sort,
      toggleSort,
      chartBookie,
      setChartBookie,
      chartRange,
      setChartRange,
      expanded,
      toggleExpanded,
      visibleCompetitors,
      visibleEvents,
      visibleMarkets,
      toast,
      notify,
    }),
    [
      user,
      section,
      unread,
      markRead,
      markAllRead,
      theme,
      toggleTheme,
      filters,
      draft,
      setDraft,
      applyDraft,
      resetFilters,
      dirty,
      sport,
      search,
      sort,
      toggleSort,
      chartBookie,
      chartRange,
      expanded,
      toggleExpanded,
      visibleCompetitors,
      visibleEvents,
      visibleMarkets,
      toast,
      notify,
    ],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard(): DashboardState {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used inside <DashboardProvider>");
  return context;
}
