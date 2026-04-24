/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

let supabaseClient: any = null;

const getSupabase = () => {
  if (supabaseClient) return supabaseClient;
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  
  const isValidUrl = (url: string) => {
    try {
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

  const effectiveUrl = isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder-project.supabase.co';
  const effectiveKey = supabaseAnonKey;

  if (!effectiveKey) {
    console.error("Supabase Error: VITE_SUPABASE_ANON_KEY is missing. Please check your Environment Variables.");
  } else if (!effectiveKey.startsWith('ey') && !effectiveKey.startsWith('sb_publishable')) {
    console.warn("Supabase Warning: Key format unrecognized. Please ensure you are using the 'anon/public' key.");
  } else {
    console.log("Supabase Client: Initializing with anon/public key.");
  }

  try {
    supabaseClient = createClient(effectiveUrl, effectiveKey || 'placeholder-key');
  } catch (err) {
    console.error("Failed to create Supabase client:", err);
    // Fallback to minimal mock
    supabaseClient = {
      from: () => ({ select: () => ({ order: () => Promise.resolve({ data: [], error: null }) }), insert: () => Promise.resolve({ error: new Error("Supabase not configured") }) }),
      channel: () => ({ on: () => ({ subscribe: () => ({}) }) })
    };
  }
  return supabaseClient;
};

export const supabase = new Proxy({}, {
  get: (target, prop) => {
    return getSupabase()[prop];
  }
}) as any;

// Helper to check if supabase is properly configured/ready
export const isSupabaseConfigured = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const isValidUrl = (url: string) => {
    try {
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };
  return isValidUrl(supabaseUrl) && !!supabaseAnonKey;
};
