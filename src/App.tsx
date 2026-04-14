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
import ProductDetail from "./pages/ProductDetail";
import Innovation from "./pages/Innovation";
import MarketApplications from "./pages/MarketApplications";
import ApplicationDetail from "./pages/ApplicationDetail";
import BusinessDetail from "./pages/BusinessDetail";
import Downloads from "./pages/Downloads";

import SelfMattingResin from "./pages/SelfMattingResin";

import { useTranslation } from "react-i18next";

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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <LanguageHandler />
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/downloads" element={<Downloads />} />
        </Routes>
      </Layout>
    </Router>
  );
}
