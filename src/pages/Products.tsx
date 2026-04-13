import { motion } from "motion/react";
import { Shield, Zap, Droplets, FlaskConical, ArrowRight, Sparkles, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { products } from "../data/products";
import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get("category");
  const divisionFilter = queryParams.get("division");
  const industryFilter = queryParams.get("industry");
  const searchFilter = queryParams.get("search");
  const [searchQuery, setSearchQuery] = useState(searchFilter || "");
  const [activeDivision, setActiveDivision] = useState(divisionFilter || "all");
  const [activeIndustry, setActiveIndustry] = useState(industryFilter || "all");

  const productDivisions = [
    { id: "all", title: t("mega.by_division") === "按事业部分类" ? "全部事业部" : "All Divisions" },
    { id: "plastic", title: t("divisions.plastic"), value: "塑胶涂料树脂事业部" },
    { id: "ink", title: t("divisions.ink"), value: "印刷油墨树脂事业部" },
    { id: "wood", title: t("divisions.wood"), value: "木器涂料树脂事业部" },
    { id: "metal", title: t("divisions.metal"), value: "金属 / 薄膜涂料树脂事业部" },
    { id: "leather", title: t("divisions.leather"), value: "皮革 / 纺织 / 胶粘剂树脂事业部" }
  ];

  const industryApplications = [
    { id: "all", title: t("mega.by_industry") === "按应用领域" ? "全部行业" : "All Industries" },
    { id: "plastic", title: t("industries.plastic"), value: "plastic" },
    { id: "ink", title: t("industries.ink"), value: "ink" },
    { id: "wood", title: t("industries.wood"), value: "wood" },
    { id: "metal", title: t("industries.metal"), value: "metal" },
    { id: "leather", title: t("industries.leather"), value: "leather" }
  ];

  // Update filters when URL changes
  useEffect(() => {
    if (divisionFilter) setActiveDivision(divisionFilter);
    if (industryFilter) setActiveIndustry(industryFilter);
    if (searchFilter) setSearchQuery(searchFilter);
  }, [divisionFilter, industryFilter, searchFilter]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDivision = activeDivision === "all" || product.divisions.includes(activeDivision);
      const matchesIndustry = activeIndustry === "all" || (product.substrates as any)[activeIndustry] === true;

      if (!categoryFilter) return matchesSearch && matchesDivision && matchesIndustry;

      const matchesCategory = product.category.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesCategory && matchesDivision && matchesIndustry;
    });
  }, [searchQuery, categoryFilter, activeDivision, activeIndustry]);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-brand-dark">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-40 relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[200px] -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px w-12 bg-brand-blue"></div>
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px]">
              Product Intelligence Center
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-12 tracking-tight leading-tight">
            {t("products.title")}<br />
            <span className="text-brand-blue">Intelligence & Innovation</span>
          </h1>
          <p className="text-brand-dark/60 text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
            {t("products.subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Filters Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Division Filter */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-4 bg-brand-blue"></div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-dark/40">{t("mega.by_division")}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {productDivisions.map((div) => {
                const isActive = activeDivision === (div.value || "all");
                return (
                  <motion.button
                    key={div.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveDivision(div.value || "all")}
                    className={`px-6 py-3 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                      isActive 
                        ? "bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20" 
                        : "bg-brand-gray border-brand-border text-brand-dark/40 hover:border-brand-blue/30 hover:text-brand-blue"
                    }`}
                  >
                    {div.title}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Industry Filter */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-4 bg-brand-blue"></div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-dark/40">{t("mega.by_industry")}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {industryApplications.map((ind) => {
                const isActive = activeIndustry === (ind.value || "all");
                return (
                  <motion.button
                    key={ind.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveIndustry(ind.value || "all")}
                    className={`px-6 py-3 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                      isActive 
                        ? "bg-brand-blue/10 border-brand-blue text-brand-blue shadow-sm" 
                        : "bg-brand-gray border-brand-border text-brand-dark/40 hover:border-brand-blue/30 hover:text-brand-blue"
                    }`}
                  >
                    {ind.title}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Product List */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-6 tracking-tight">{t("products.catalog")}</h2>
            <p className="text-brand-blue text-[11px] font-bold uppercase tracking-widest">{t("products.tds")}</p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-brand-gray border border-brand-border rounded-2xl w-full md:w-[400px] group focus-within:border-brand-blue/30 transition-all duration-300">
            <Search size={20} className="text-brand-dark/20 group-focus-within:text-brand-blue transition-colors" />
            <input 
              type="text" 
              placeholder={t("products.search_placeholder")} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-brand-dark w-full placeholder:text-brand-dark/20 font-medium"
            />
          </div>
        </div>

        <div className="bg-white border border-brand-border rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto custom-scrollbar">
            <div className="min-w-[1200px]">
              <div className="grid grid-cols-12 gap-4 p-8 border-b border-brand-border bg-brand-gray text-[11px] font-bold uppercase tracking-widest text-brand-dark/40">
                <div className="col-span-2">{t("products.table.name_type")}</div>
                <div className="col-span-1">{t("products.table.appearance")}</div>
                <div className="col-span-1">{t("products.table.solid")}</div>
                <div className="col-span-1">{t("products.table.ph")}</div>
                <div className="col-span-1">{t("products.table.viscosity")}</div>
                <div className="col-span-1">{t("products.table.tg_mfft")}</div>
                <div className="col-span-3">{t("products.table.features")}</div>
                <div className="col-span-2 text-right">{t("products.table.actions")}</div>
              </div>
              <div className="divide-y divide-brand-border">
                {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                  <Link 
                    key={product.id} 
                    to={`/products/${product.id}`}
                    className="grid grid-cols-12 gap-4 p-10 items-center hover:bg-brand-gray transition-all duration-300 group"
                  >
                    <div className="col-span-2">
                      <div className="text-xl font-bold tracking-tight text-brand-dark group-hover:text-brand-blue transition-colors">{product.name}</div>
                      <div className="text-[10px] text-brand-dark/30 font-bold uppercase tracking-widest mt-2">{product.type}</div>
                    </div>
                    <div className="col-span-1">
                      <span className="text-sm text-brand-dark/60 font-medium">{product.appearance}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-sm text-brand-dark/60 font-medium">{product.solidContent}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-sm text-brand-dark/60 font-medium">{product.pH}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-sm text-brand-dark/60 font-medium">{product.viscosity}</span>
                    </div>
                    <div className="col-span-1">
                      <div className="flex flex-col text-[11px] font-bold">
                        <span className="text-brand-dark/60">TG: {product.tg}</span>
                        <span className="text-brand-dark/30">MFFT: {product.mfft}</span>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex flex-wrap gap-2">
                        {product.features.map(f => (
                          <span key={f} className="px-3 py-1 bg-brand-blue/5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-brand-blue border border-brand-blue/10">{f}</span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <div className="inline-flex items-center gap-3 text-brand-blue font-bold text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <span>{t("products.table.view_details")}</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="p-32 text-center">
                    <FlaskConical size={48} className="mx-auto text-brand-dark/10 mb-8" />
                    <p className="text-brand-dark/40 text-xl font-bold">{t("products.no_results")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solution CTA */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-brand-blue rounded-[40px] p-20 md:p-32 text-center relative overflow-hidden text-white"
        >
          <div className="relative z-10 max-w-4xl mx-auto">
            <Shield size={48} className="mx-auto mb-12 opacity-50" />
            <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tight">
              {t("products.cta.title")}
            </h2>
            <p className="text-white/80 text-xl md:text-2xl font-light leading-relaxed mb-16">
              {t("products.cta.desc")}
            </p>
            <Link to="/contact" className="group relative overflow-hidden px-16 py-6 bg-white rounded-full inline-block transition-transform hover:scale-105">
              <span className="relative z-10 text-brand-blue font-bold tracking-widest text-[12px] uppercase">
                {t("products.cta.btn")}
              </span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
