import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export function useCMSAsset(key: string, defaultValue: string) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'cms_assets', key);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && data.value) {
          setValue(data.value);
        }
      }
      setLoading(false);
    }, (error) => {
      console.error(`Error fetching CMS asset for key ${key}:`, error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [key]);

  return { value, loading };
}
