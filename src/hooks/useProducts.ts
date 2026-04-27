import { useState, useEffect, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { products as staticProducts, Product } from '../data/products';

let globalCloudProducts: Product[] = [];
let globalLoading = false;
let globalError: string | null = null;
const listeners = new Set<(data: { products: Product[], loading: boolean, error: string | null }) => void>();
let subscription: any = null;

async function fetchInitialProducts() {
  if (!isSupabaseConfigured()) return;
  
  globalLoading = true;
  notifyListeners();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error("Supabase products fetch error:", error);
    globalError = error.message;
  } else {
    globalCloudProducts = (data || []).map(item => ({
      ...item,
    } as Product));
    globalError = null;
  }
  globalLoading = false;
  notifyListeners();
}

function startSubscription() {
  if (subscription || !isSupabaseConfigured()) return;

  subscription = supabase
    .channel('products_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
      fetchInitialProducts();
    })
    .subscribe();
}

function notifyListeners() {
  listeners.forEach(l => l({ products: globalCloudProducts, loading: globalLoading, error: globalError }));
}

export function useProducts() {
  const [cloudProducts, setCloudProducts] = useState<Product[]>(globalCloudProducts);
  const [loading, setLoading] = useState(globalLoading);
  const [error, setError] = useState<string | null>(globalError);

  useEffect(() => {
    const listener = (data: { products: Product[], loading: boolean, error: string | null }) => {
      setCloudProducts(data.products);
      setLoading(data.loading);
      setError(data.error);
    };
    listeners.add(listener);

    if (globalCloudProducts.length === 0 && !globalLoading && !globalError) {
      fetchInitialProducts();
    }
    startSubscription();
    
    return () => { listeners.delete(listener); };
  }, []);

  const products = useMemo(() => {
    const map = new Map<string, Product>();
    staticProducts.forEach(p => map.set(p.id, p));
    cloudProducts.forEach(p => map.set(p.id, p));
    return Array.from(map.values()).sort((a, b) => {
      // Sort by is_hot first (true comes first)
      if (a.is_hot && !b.is_hot) return -1;
      if (!a.is_hot && b.is_hot) return 1;
      // Then sort by name
      return a.name.localeCompare(b.name);
    });
  }, [cloudProducts]);

  const publishedProducts = useMemo(() => {
    return products.filter(p => p.status !== 'draft');
  }, [products]);

  return { products, publishedProducts, cloudProducts, loading, error };
}
