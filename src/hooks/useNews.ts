import { useState, useEffect, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { newsData as staticNews, NewsItem } from '../data/news';

export type { NewsItem };

let globalCloudNews: NewsItem[] = [];
let globalLoading = false;
let globalError: string | null = null;
const listeners = new Set<(data: { news: NewsItem[], loading: boolean, error: string | null }) => void>();
let subscription: any = null;

async function fetchInitialNews() {
  if (isSupabaseConfigured()) {
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
      } as NewsItem));
      globalError = null;
    }
    globalLoading = false;
    notifyListeners();
  }
}

function startSubscription() {
  if (subscription) return;

  if (isSupabaseConfigured()) {
    subscription = supabase
      .channel('news_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, () => {
        fetchInitialNews();
      })
      .subscribe();
  } else {
    // Firebase fallback
    globalLoading = true;
    notifyListeners();
    const q = query(collection(db, 'news'), orderBy('date', 'desc'));
    subscription = onSnapshot(q, (snapshot) => {
      globalCloudNews = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as NewsItem));
      globalLoading = false;
      globalError = null;
      notifyListeners();
    }, (error) => {
      console.error("Firebase news fetch error:", error);
      globalError = error.message;
      globalLoading = false;
      notifyListeners();
    });
  }
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
