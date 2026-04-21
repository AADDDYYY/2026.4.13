/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import RD from "./pages/RD";
import Sustainability from "./pages/Sustainability";
import Divisions from "./pages/Divisions";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import ProductDetail from "./pages/ProductDetail";
import Innovation from "./pages/Innovation";
import MarketApplications from "./pages/MarketApplications";
import ApplicationDetail from "./pages/ApplicationDetail";
import BusinessDetail from "./pages/BusinessDetail";
import Downloads from "./pages/Downloads";
import Admin from "./pages/Admin";

import SelfMattingResin from "./pages/SelfMattingResin";

import { useTranslation } from "react-i18next";
import { useCMSAsset } from "./hooks/useCMSAsset";

// SEO Manager component
const SEOManager = () => {
  const { value: seoTitle } = useCMSAsset('seo_title', '西顿新材料 SEATON - 全球领先的水性树脂专家');
  const { value: seoKeywords } = useCMSAsset('seo_keywords', '水性树脂,PUD,丙烯酸树脂,环保材料,西顿新材料');
  const { value: seoDescription } = useCMSAsset('seo_description', '西顿新材料专注于环保高性能水性树脂的研发与生产，为全球客户提供先进的涂料、印花、胶粘剂解决方案。');
  const { value: ogImage } = useCMSAsset('og_image', 'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1200&auto=format&fit=crop');

  useEffect(() => {
    if (seoTitle) {
      document.title = seoTitle;
      updateMetaTag('property', 'og:title', seoTitle);
      updateMetaTag('name', 'twitter:title', seoTitle);
    }
    
    // Keywords
    updateMetaTag('name', 'keywords', seoKeywords || '');

    // Description
    if (seoDescription) {
      updateMetaTag('name', 'description', seoDescription);
      updateMetaTag('property', 'og:description', seoDescription);
      updateMetaTag('name', 'twitter:description', seoDescription);
    }
    
    // Default OG Tags
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:url', window.location.href);
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    
    // OG Image
    if (ogImage) {
      updateMetaTag('property', 'og:image', ogImage);
      updateMetaTag('name', 'twitter:image', ogImage);
    }
  }, [seoTitle, seoKeywords, seoDescription, ogImage]);

  // Helper to update or create meta tags
  const updateMetaTag = (attributeName: string, attributeValue: string, content: string) => {
    let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attributeName, attributeValue);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  return null;
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Update HTML lang attribute based on current language
const LanguageHandler = () => {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  
  return null;
};

import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <LanguageHandler />
        <SEOManager />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/self-matting" element={<SelfMattingResin />} />
            <Route path="/innovation" element={<Innovation />} />
            <Route path="/market-applications" element={<MarketApplications />} />
            <Route path="/market-applications/:id" element={<ApplicationDetail />} />
            <Route path="/business/:id" element={<BusinessDetail />} />
            <Route path="/rd" element={<RD />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/divisions" element={<Divisions />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}
