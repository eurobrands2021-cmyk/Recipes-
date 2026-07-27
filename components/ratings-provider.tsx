"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Per-recipe star ratings kept on the device (no accounts). A map of
// recipeId -> 1..5. Mirrors the favorites provider's localStorage pattern.
const LS_KEY = "teta.ratings";

type RatingMap = Record<string, number>;

interface RatingsValue {
  ratings: RatingMap;
  getRating: (id: string) => number;
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
          for (const [k, v] of Object.entries(parsed)) {
            if (typeof v === "number" && v >= 1 && v <= 5) clean[k] = v;
          }
          setRatings(clean);
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = (next: RatingMap) => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next));
    } catch {}
  };

  const setRating = useCallback((id: string, value: number) => {
    setRatings((prev) => {
      const next = { ...prev, [id]: value };
      persist(next);
      return next;
    });
  }, []);

  const clearRating = useCallback((id: string) => {
    setRatings((prev) => {
      const next = { ...prev };
      delete next[id];
      persist(next);
      return next;
    });
  }, []);

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
