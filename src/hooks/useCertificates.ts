import { useState, useEffect, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { certificatesData as staticCerts, CertificateItem } from '../data/certificates';

let globalCloudCerts: CertificateItem[] = [];
let globalLoading = false;
let globalError: string | null = null;
const listeners = new Set<(data: { certs: CertificateItem[], loading: boolean, error: string | null }) => void>();
let subscription: any = null;

async function fetchInitialCerts() {
  if (!isSupabaseConfigured()) return;
  
  globalLoading = true;
  notifyListeners();

  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error("Supabase certificates fetch error:", error);
    globalError = error.message;
  } else {
    globalCloudCerts = (data || []).map(item => ({
      ...item,
    } as CertificateItem));
    globalError = null;
  }
  globalLoading = false;
  notifyListeners();
}

function startSubscription() {
  if (subscription || !isSupabaseConfigured()) return;

  subscription = supabase
    .channel('certificates_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'certificates' }, () => {
      fetchInitialCerts();
    })
    .subscribe();
}

function notifyListeners() {
  listeners.forEach(l => l({ certs: globalCloudCerts, loading: globalLoading, error: globalError }));
}

export function useCertificates() {
  const [cloudCerts, setCloudCerts] = useState<CertificateItem[]>(globalCloudCerts);
  const [loading, setLoading] = useState(globalLoading);
  const [error, setError] = useState<string | null>(globalError);

  useEffect(() => {
    const listener = (data: { certs: CertificateItem[], loading: boolean, error: string | null }) => {
      setCloudCerts(data.certs);
      setLoading(data.loading);
      setError(data.error);
    };
    listeners.add(listener);

    if (globalCloudCerts.length === 0 && !globalLoading && !globalError) {
      fetchInitialCerts();
    }
    startSubscription();
    
    return () => { listeners.delete(listener); };
  }, []);

  const certificates = useMemo(() => {
    const map = new Map<string, CertificateItem>();
    staticCerts.forEach(c => map.set(c.id, c));
    cloudCerts.forEach(c => map.set(c.id, c));
    return Array.from(map.values()).sort((a, b) => a.order - b.order);
  }, [cloudCerts]);

  return { certificates, loading, error };
}
