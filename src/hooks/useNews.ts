import { useState, useEffect, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { newsData as staticNews, NewsItem } from '../data/news';

export type { NewsItem };

let globalCloudNews: NewsItem[] = [];
let globalLoading = false;
let globalError: string | null = null;
const listeners = new Set<(data: { news: NewsItem[], loading: boolean, error: string | null }) => void>();
let subscription: any = null;

async function fetchInitialNews() {
  if (!isSupabaseConfigured()) return;
  
  globalLoading = true;
  notifyListeners();

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error("Supabase news fetch error:", error);
    globalError = error.message;
  } else {
    globalCloudNews = (data || []).map(item => ({
      ...item,
      // Map Supabase fields to NewsItem if needed, though they match in SQL script
    } as NewsItem));
    globalError = null;
  }
  globalLoading = false;
  notifyListeners();
}

function startSubscription() {
  if (subscription || !isSupabaseConfigured()) return;

  subscription = supabase
    .channel('news_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, () => {
      fetchInitialNews();
    })
    .subscribe();
}

function notifyListeners() {
  listeners.forEach(l => l({ news: globalCloudNews, loading: globalLoading, error: globalError }));
}

export function useNews() {
  const [cloudNews, setCloudNews] = useState<NewsItem[]>(globalCloudNews);
  const [loading, setLoading] = useState(globalLoading);
  const [error, setError] = useState<string | null>(globalError);

  useEffect(() => {
    const listener = (data: { news: NewsItem[], loading: boolean, error: string | null }) => {
      setCloudNews(data.news);
      setLoading(data.loading);
      setError(data.error);
    };
    listeners.add(listener);

    if (globalCloudNews.length === 0 && !globalLoading && !globalError) {
      fetchInitialNews();
    }
    startSubscription();

    return () => { listeners.delete(listener); };
  }, []);

  const news = useMemo(() => {
    const map = new Map<string, NewsItem>();
    staticNews.forEach(n => map.set(n.id, n));
    cloudNews.forEach(n => map.set(n.id, n));
    return Array.from(map.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [cloudNews]);

  return { news, loading, error };
}
