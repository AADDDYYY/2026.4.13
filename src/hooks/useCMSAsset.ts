import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Global cache for all CMS assets to minimize reads
const CACHE_KEY = 'cms_assets_cache';

function cacheAssets(assets: Record<string, string>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(assets));
  } catch (error) {
    console.warn("Could not cache CMS assets: LocalStorage quota exceeded. Clearing cache.");
    try { localStorage.removeItem(CACHE_KEY); } catch (e) {} // Attempt to clear
  }
}

let globalAssets: Record<string, string> = (() => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch (e) {
    return {};
  }
})();

let isInitialized = false;
let initPromise: Promise<void> | null = null;
const listeners = new Set<(assets: Record<string, string>) => void>();
let subscription: any = null;

async function initializeCMS() {
  if (initPromise || !isSupabaseConfigured()) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      const { data, error } = await supabase.from('cms_assets').select('*');
      
      if (error) throw error;

      const newAssets: Record<string, string> = {};
      (data || []).forEach(item => {
        newAssets[item.id] = item.value;
      });
      globalAssets = newAssets;
      cacheAssets(globalAssets);
      
      isInitialized = true;
      notifyListeners();

      // Subscription for real-time updates
      if (!subscription) {
        subscription = supabase
          .channel('cms_assets_changes')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_assets' }, () => {
            initializeCMS(); // Re-fetch on change
          })
          .subscribe();
      }
    } catch (error: any) {
      // Gracefully handle missing tables or network errors without a loud console.error
      // Only log a warning in development mode, or a softer message
      if (process.env.NODE_ENV !== 'production') {
        console.warn("CMS could not initialize assets (likely table is missing or project is paused):", error.message || error);
      }
      isInitialized = true;
      notifyListeners();
    }
  })();

  return initPromise;
}

function notifyListeners() {
  listeners.forEach(l => l(globalAssets));
}

export function useCMSAsset(key: string, defaultValue: string) {
  const [value, setValue] = useState(globalAssets[key] || defaultValue);
  const [loading, setLoading] = useState(!isInitialized);

  useEffect(() => {
    const listener = (assets: Record<string, string>) => {
      if (assets[key]) {
        setValue(assets[key]);
      }
      setLoading(false);
    };

    listeners.add(listener);
    initializeCMS();

    if (globalAssets[key]) {
      setValue(globalAssets[key]);
    }
    if (isInitialized) {
      setLoading(false);
    }

    return () => {
      listeners.delete(listener);
    };
  }, [key]);

  return { value, loading };
}
