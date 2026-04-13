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
    { id: "all", title: t("mega.by_division") === "按事业部分类" ? "全部事业部" : "All Divisions", value: "all" },
    { id: "plastic", title: t("divisions.plastic"), value: "塑胶涂料树脂事业部" },
    { id: "ink", title: t("divisions.ink"), value: "印刷油墨树脂事业部" },
    { id: "wood", title: t("divisions.wood"), value: "木器涂料树脂事业部" },
    { id: "metal", title: t("divisions.metal"), value: "金属 / 薄膜涂料树脂事业部" },
    { id: "leather", title: t("divisions.leather"), value: "皮革 / 纺织 / 胶粘剂树脂事业部" }
  ];

  // Helper to get division value from ID or vice versa
  const getDivisionValue = (val: string) => {
    const div = productDivisions.find(d => d.id === val || d.value === val);
    return div ? div.value : val;
  };

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
    if (divisionFilter) setActiveDivision(getDivisionValue(divisionFilter));
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
    <div className="pt-48 pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56 relative">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-blue/5 rounded-full blur-[250px] -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl"
        >
          <div className="flex items-center gap-6 mb-16">
            <div className="h-px w-16 bg-brand-blue"></div>
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px]">
              Product Intelligence Center
            </span>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black mb-16 tracking-tighter leading-[0.85]">
            {t("products.title")}<br />
            <span className="text-brand-blue">Intelligence & Innovation</span>
          </h1>
          <p className="text-brand-dark/40 text-2xl md:text-4xl font-light leading-relaxed max-w-5xl">
            {t("products.subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Filters Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Division Filter */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-1.5 h-6 bg-brand-blue"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-dark/40">{t("mega.by_division")}</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {productDivisions.map((div) => {
                const isActive = activeDivision === div.value;
                return (
                  <motion.button
                    key={div.id}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveDivision(div.value)}
                    className={`px-8 py-4 rounded-2xl text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-500 border ${
                      isActive 
                        ? "bg-brand-blue border-brand-blue text-white shadow-2xl shadow-brand-blue/20" 
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
            <div className="flex items-center gap-6 mb-12">
              <div className="w-1.5 h-6 bg-brand-blue"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-dark/40">{t("mega.by_industry")}</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {industryApplications.map((ind) => {
                const isActive = activeIndustry === (ind.value || "all");
                return (
                  <motion.button
                    key={ind.id}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveIndustry(ind.value || "all")}
                    className={`px-8 py-4 rounded-2xl text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-500 border ${
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
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div>
            <h2 className="text-5xl md:text-8xl font-black text-brand-dark mb-8 tracking-tighter leading-[0.9]">{t("products.catalog")}</h2>
            <p className="text-brand-blue text-[11px] font-black uppercase tracking-[0.3em]">{t("products.tds")}</p>
          </div>
          <div className="flex items-center gap-6 p-6 bg-brand-gray border border-brand-border rounded-[32px] w-full md:w-[500px] group focus-within:border-brand-blue/30 transition-all duration-500 shadow-sm">
            <Search size={24} className="text-brand-dark/20 group-focus-within:text-brand-blue transition-colors" />
            <input 
              type="text" 
              placeholder={t("products.search_placeholder")} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-lg text-brand-dark w-full placeholder:text-brand-dark/20 font-medium"
            />
          </div>
        </div>

        <div className="bg-white border border-brand-border rounded-[60px] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto custom-scrollbar">
            <div className="min-w-[1400px]">
              <div className="grid grid-cols-12 gap-6 p-12 border-b border-brand-border bg-brand-gray text-[11px] font-black uppercase tracking-[0.3em] text-brand-dark/40">
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
                    className="grid grid-cols-12 gap-6 p-12 items-center hover:bg-brand-gray transition-all duration-500 group"
                  >
                    <div className="col-span-2">
                      <div className="text-2xl font-black tracking-tight text-brand-dark group-hover:text-brand-blue transition-colors">{product.name}</div>
                      <div className="text-[10px] text-brand-dark/30 font-black uppercase tracking-[0.3em] mt-3">{product.type}</div>
                    </div>
                    <div className="col-span-1">
                      <span className="text-base text-brand-dark/40 font-medium">{product.appearance}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-base text-brand-dark/40 font-medium">{product.solidContent}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-base text-brand-dark/40 font-medium">{product.pH}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-base text-brand-dark/40 font-medium">{product.viscosity}</span>
                    </div>
                    <div className="col-span-1">
                      <div className="flex flex-col text-[11px] font-black">
                        <span className="text-brand-dark/40">TG: {product.tg}</span>
                        <span className="text-brand-dark/20">MFFT: {product.mfft}</span>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex flex-wrap gap-3">
                        {product.features.map(f => (
                          <span key={f} className="px-4 py-1.5 bg-brand-blue/5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue border border-brand-blue/10">{f}</span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <div className="inline-flex items-center gap-4 text-brand-blue font-black text-[11px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all translate-x-6 group-hover:translate-x-0">
                        <span>{t("products.table.view_details")}</span>
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="p-48 text-center">
                    <FlaskConical size={80} className="mx-auto text-brand-dark/5 mb-12" />
                    <p className="text-brand-dark/30 text-2xl font-black tracking-tight">{t("products.no_results")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solution CTA */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="bg-brand-blue rounded-[80px] p-24 md:p-48 text-center relative overflow-hidden text-white shadow-2xl"
        >
          <div className="relative z-10 max-w-5xl mx-auto">
            <Shield size={80} className="mx-auto mb-16 opacity-30" />
            <h2 className="text-5xl md:text-[9rem] font-black mb-16 tracking-tighter leading-[0.8]">
              {t("products.cta.title")}
            </h2>
            <p className="text-white/80 text-2xl md:text-3xl font-light leading-relaxed mb-24">
              {t("products.cta.desc")}
            </p>
            <Link to="/contact" className="group relative overflow-hidden px-20 py-8 bg-white rounded-full inline-block transition-all hover:scale-105 shadow-2xl">
              <span className="relative z-10 text-brand-blue font-black tracking-[0.3em] text-[12px] uppercase">
                {t("products.cta.btn")}
              </span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
