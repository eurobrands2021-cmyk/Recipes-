"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LS_KEY = "teta.favorites";

interface FavoritesValue {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
  ready: boolean;
}

const FavoritesContext = createContext<FavoritesValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setFavorites(parsed.filter((x) => typeof x === "string"));
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const toggle = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id];
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [],
  );

  const value = useMemo<FavoritesValue>(
    () => ({
      favorites,
      isFavorite: (id: string) => favorites.includes(id),
      toggle,
      ready,
    }),
    [favorites, toggle, ready],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
