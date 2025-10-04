import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'favorite_event_ids_v1';
const STORAGE_SNAPSHOTS_KEY = 'favorite_event_snapshots_v1';

export interface FavoriteSnapshot {
  id: string;
  title: string;
  date?: string | null;
  image?: string;
  venue?: string;
  location?: string;
  type?: string;
}

interface FavoritesContextValue {
  favorites: Set<string>;
  snapshots: Record<string, FavoriteSnapshot>;
  toggleFavorite: (id: string, snapshot?: FavoriteSnapshot) => void;
  isFavorite: (id: string) => boolean;
  loading: boolean;
  setFavorite: (id: string, value: boolean, snapshot?: FavoriteSnapshot) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [snapshots, setSnapshots] = useState<Record<string, FavoriteSnapshot>>({});

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const rawSnaps = await AsyncStorage.getItem(STORAGE_SNAPSHOTS_KEY);
        if (raw) {
          const parsed: string[] = JSON.parse(raw);
          setFavorites(new Set(parsed));
        }
        if (rawSnaps) {
          setSnapshots(JSON.parse(rawSnaps));
        }
      } catch (e) {
        console.warn('Failed to load favorites', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (next: Set<string>, snaps?: Record<string, FavoriteSnapshot>) => {
    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEY, JSON.stringify(Array.from(next))],
        [STORAGE_SNAPSHOTS_KEY, JSON.stringify(snaps ?? snapshots)],
      ]);
    } catch (e) {
      console.warn('Failed to persist favorites', e);
    }
  }, [snapshots]);

  const toggleFavorite = useCallback((id: string, snapshot?: FavoriteSnapshot) => {
    setFavorites(prev => {
      const next = new Set(prev);
      const nextSnaps = { ...snapshots };
      if (next.has(id)) {
        next.delete(id);
        delete nextSnaps[id];
      } else {
        next.add(id);
        if (snapshot) nextSnaps[id] = snapshot;
      }
      setSnapshots(nextSnaps);
      persist(next, nextSnaps);
      return next;
    });
  }, [persist, snapshots]);

  const setFavorite = useCallback((id: string, value: boolean, snapshot?: FavoriteSnapshot) => {
    setFavorites(prev => {
      const next = new Set(prev);
      const nextSnaps = { ...snapshots };
      if (value) {
        next.add(id);
        if (snapshot) nextSnaps[id] = snapshot;
      } else {
        next.delete(id);
        delete nextSnaps[id];
      }
      setSnapshots(nextSnaps);
      persist(next, nextSnaps);
      return next;
    });
  }, [persist, snapshots]);

  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
    setSnapshots({});
    persist(new Set(), {});
  }, [persist]);

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, snapshots, toggleFavorite, isFavorite, loading, setFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
