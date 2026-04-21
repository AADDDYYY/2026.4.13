import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { products as staticProducts, Product } from '../data/products';

export function useProducts() {
  const [cloudProducts, setCloudProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Listen to Firebase products in real-time
    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        const fetchedProducts = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id // Ensure ID matches the document ID
        } as Product));
        setCloudProducts(fetchedProducts);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching cloud products:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Merge static products with cloud products. Cloud overrides static if IDs match.
  const allProducts = useMemo(() => {
    const productMap = new Map<string, Product>();
    
    // 1. Add static products first
    staticProducts.forEach(p => productMap.set(p.id, p));
    
    // 2. Override/Add cloud products
    cloudProducts.forEach(p => productMap.set(p.id, p));
    
    // Return as array and sort by name
    return Array.from(productMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [cloudProducts]);

  const publishedProducts = useMemo(() => {
    return allProducts.filter(p => p.status !== 'draft');
  }, [allProducts]);

  return { products: allProducts, publishedProducts, cloudProducts, loading, error };
}
