import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';
import { db, isFirestoreQuotaExceeded } from './firebase';
import { doc, getDocFromServer } from 'firebase/firestore';
import { ErrorBoundary } from './components/ErrorBoundary';
import { isSupabaseConfigured } from './lib/supabase';

async function testConnection() {
  if (isSupabaseConfigured()) return; // Skip Firestore test if Supabase is the primary engine
  if (isFirestoreQuotaExceeded()) return; // 停止测试，静默离线模式

  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    const errorMsg = error?.message?.toLowerCase() || '';
    if (error.code === 'resource-exhausted' || errorMsg.includes('quota exceeded')) {
      console.warn("Firestore quota limit reached. Application will work in offline/static mode.");
    } else if(errorMsg.includes('the client is offline')) {
      console.warn("Could not reach Cloud Firestore backend. Working in static mode.");
    }
  }
}
testConnection();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
