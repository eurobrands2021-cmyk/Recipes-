"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LS_KEY = "teta.ratings";

// Ratings are stored locally per device (no accounts, no backend). With one
// device that single value *is* the average shown across the app; the shape is
// kept general so an aggregate could be layered on later without UI changes.
type RatingMap = Record<string, number>;

interface RatingsValue {
  ratings: RatingMap;
  getRating: (id: string) => number; // 0 = unrated
  setRating: (id: string, value: number) => void;
  clearRating: (id: string) => void;
  ready: boolean;
}

const RatingsContext = createContext<RatingsValue | null>(null);

export function RatingsProvider({ children }: { children: React.ReactNode }) {
  const [ratings, setRatings] = useState<RatingMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          const clean: RatingMap = {};
          for (const [id, v] of Object.entries(parsed)) {
            const n = Number(v);
            if (Number.isFinite(n) && n >= 1 && n <= 5) clean[id] = Math.round(n);
          }
          setRatings(clean);
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: RatingMap) => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const setRating = useCallback(
    (id: string, value: number) => {
      const v = Math.max(1, Math.min(5, Math.round(value)));
      setRatings((prev) => {
        const next = { ...prev, [id]: v };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const clearRating = useCallback(
    (id: string) => {
      setRatings((prev) => {
        if (!(id in prev)) return prev;
        const next = { ...prev };
        delete next[id];
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const value = useMemo<RatingsValue>(
    () => ({
      ratings,
      getRating: (id: string) => ratings[id] ?? 0,
      setRating,
      clearRating,
      ready,
    }),
    [ratings, setRating, clearRating, ready],
  );

  return (
    <RatingsContext.Provider value={value}>{children}</RatingsContext.Provider>
  );
}

export function useRatings(): RatingsValue {
  const ctx = useContext(RatingsContext);
  if (!ctx) throw new Error("useRatings must be used within RatingsProvider");
  return ctx;
}
