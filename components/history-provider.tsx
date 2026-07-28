"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Cooking history: which recipes the user actually finished in Cooking Mode
// (reached and confirmed the final serving step). Kept on the device, like
// favorites/ratings. Stored as a map of recipeId -> { count, lastAt }.
const LS_KEY = "teta.history";

export interface HistoryEntry {
  count: number;
  lastAt: number;
}
type HistoryMap = Record<string, HistoryEntry>;

interface HistoryValue {
  history: HistoryMap;
  /** Recipe ids ordered by most-recently finished first. */
  orderedIds: string[];
  record: (id: string) => void;
  ready: boolean;
}

const HistoryContext = createContext<HistoryValue | null>(null);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<HistoryMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          const clean: HistoryMap = {};
          for (const [k, v] of Object.entries(parsed)) {
            const e = v as Partial<HistoryEntry>;
            if (e && typeof e.count === "number" && typeof e.lastAt === "number") {
              clean[k] = { count: e.count, lastAt: e.lastAt };
            }
          }
          setHistory(clean);
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const record = useCallback((id: string) => {
    setHistory((prev) => {
      const existing = prev[id];
      const next: HistoryMap = {
        ...prev,
        [id]: {
          count: (existing?.count ?? 0) + 1,
          lastAt: Date.now(),
        },
      };
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const value = useMemo<HistoryValue>(() => {
    const orderedIds = Object.keys(history).sort(
      (a, b) => history[b].lastAt - history[a].lastAt,
    );
    return { history, orderedIds, record, ready };
  }, [history, record, ready]);

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}

export function useHistory(): HistoryValue {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistory must be used within HistoryProvider");
  return ctx;
}
