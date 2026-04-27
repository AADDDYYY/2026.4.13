import { motion } from "motion/react";
import { Shield, Zap, Droplets, FlaskConical, ArrowRight, Sparkles, Search, Car, Smartphone, Package, Home, Scissors, Trophy, Flame } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCMSAsset } from "../hooks/useCMSAsset";
import { useProducts } from "../hooks/useProducts";

export default function Products() {
  const { t } = useTranslation();
  const location = useLocation();

  const { value: productHeroBg } = useCMSAsset('product_hero_bg', 'https://images.unsplash.com/photo-1542382156909-9ae38d3884c1?auto=format&fit=crop&q=80&w=1600');
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
    { id: "leather", title: t("divisions.leather"), value: "皮革 / 纺织 / 胶粘剂树脂事业部" }
  ];

  // Helper to get division value from ID or vice versa
  const getDivisionValue = (val: string) => {
    const div = productDivisions.find(d => d.id === val || d.value === val);
    return div ? div.value : val;
  };

  const industryApplications = [
    { id: "all", title: t("mega.by_industry") === "按应用领域" ? "全部行业" : "All Industries", icon: <Sparkles size={14} /> },
    { id: "plastic", title: t("industries.plastic"), value: "plastic", icon: <Smartphone size={14} /> },
    { id: "automotive", title: t("industries.automotive"), value: "automotive", icon: <Car size={14} /> },
    { id: "ink", title: t("industries.ink"), value: "ink", icon: <Package size={14} /> },
    { id: "wood", title: t("industries.wood"), value: "wood", icon: <Home size={14} /> },
    { id: "leather", title: t("industries.leather"), value: "leather", icon: <Scissors size={14} /> },
    { id: "industrial", title: t("industries.industrial"), value: "industrial", icon: <Zap size={14} /> }
  ];

  const { publishedProducts: products, loading } = useProducts();

  // Update filters when URL changes
  useEffect(() => {
    if (divisionFilter) setActiveDivision(getDivisionValue(divisionFilter));
    if (industryFilter) setActiveIndustry(industryFilter);
    if (searchFilter) setSearchQuery(searchFilter);
  }, [divisionFilter, industryFilter, searchFilter]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(searchLower) || 
                            product.type.toLowerCase().includes(searchLower) ||
                            product.category.toLowerCase().includes(searchLower);
      
      const matchesDivision = activeDivision === "all" || product.divisions.includes(activeDivision);
      
      let matchesIndustry = activeIndustry === "all";
      if (!matchesIndustry) {
        if (activeIndustry === "industrial") {
          matchesIndustry = product.substrates.metal === true;
        } else if (activeIndustry === "automotive") {
          matchesIndustry = product.divisions.some(d => d.includes("汽车"));
        } else {
          matchesIndustry = (product.substrates as any)[activeIndustry] === true;
        }
      }

      if (!categoryFilter) return matchesSearch && matchesDivision && matchesIndustry;

      const matchesCategory = product.category.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesCategory && matchesDivision && matchesIndustry;
    });
  }, [searchQuery, categoryFilter, activeDivision, activeIndustry, products]);

  return (
    <div className="pt-24 md:pt-48 pb-16 md:pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-24 md:mb-56 relative">
        {productHeroBg ? (
          <div className="absolute inset-0 -z-10 rounded-b-[60px] md:rounded-b-[100px] overflow-hidden opacity-20">
            <img src={productHeroBg} alt="Product Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        ) : (
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-blue/5 rounded-full blur-[250px] -z-10"></div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl"
        >
          <div className="flex items-center gap-6 mb-8 md:mb-16">
            <div className="h-px w-12 md:w-16 bg-brand-blue"></div>
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[10px] md:text-[11px]">
               {t("products.english_subtitle") || "Product Intelligence Center"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[10rem] font-black mb-8 md:mb-16 tracking-tight leading-[0.85]">
            {t("products.title")}<br />
            <span className="text-brand-blue sm:text-[0.6em] md:text-[0.4em] lg:text-[0.3em] tracking-normal">{t("products.english_title") || "Product Intelligence Center"}</span>
          </h1>
          <p className="text-brand-dark/40 text-lg sm:text-2xl md:text-4xl font-light leading-relaxed max-w-5xl">
            {t("products.subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Filters Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-24 md:mb-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          {/* Industry Filter Categories */}
          <div className="lg:col-span-12 mb-16">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-1.5 h-6 bg-brand-blue"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-dark/40">行业应用领域 / Industry Applications</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {industryApplications.map((ind) => {
                const isActive = activeIndustry === (ind.value || "all");
                return (
                  <motion.button
                    key={ind.id}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveIndustry(ind.value || "all")}
                    className={`flex flex-col items-center justify-center p-8 rounded-[32px] border transition-all duration-700 aspect-square group ${
                      isActive 
                        ? "bg-brand-blue border-brand-blue text-white shadow-2xl shadow-brand-blue/30" 
                        : "bg-brand-gray border-brand-border text-brand-dark/40 hover:bg-white hover:border-brand-blue/30 hover:text-brand-blue shadow-sm"
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-700 ${
                      isActive ? "bg-white/20" : "bg-white group-hover:bg-brand-blue/10"
                    }`}>
                      {ind.icon && <div className={isActive ? "text-white scale-150" : "text-brand-blue scale-150"}>{ind.icon}</div>}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-center px-2">{ind.title}</span>
                    <div className={`mt-4 w-1.5 h-1.5 rounded-full transition-all duration-700 ${isActive ? "bg-white scale-150" : "bg-transparent"}`}></div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Division Filter */}
          <div className="lg:col-span-12">
            <div className="flex items-center gap-6 mb-8 md:mb-12">
              <div className="w-1.5 h-6 bg-brand-blue"></div>
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-brand-dark/40">{t("mega.by_division")}</span>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {productDivisions.map((div) => {
                const isActive = activeDivision === div.value;
                return (
                  <motion.button
                    key={div.id}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveDivision(div.value)}
                    className={`px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black tracking-[0.1em] md:tracking-[0.2em] uppercase transition-all duration-500 border ${
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

        </div>
      </div>

      {/* Technical Product List */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-24 md:mb-56">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-8 md:gap-12">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-brand-dark mb-4 md:mb-8 tracking-tighter leading-[0.9]">{t("products.catalog")}</h2>
            <p className="text-brand-blue text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]">{t("products.tds")}</p>
          </div>
          <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-brand-gray border border-brand-border rounded-2xl md:rounded-[32px] w-full md:w-[500px] group focus-within:border-brand-blue focus-within:bg-white transition-all duration-500 shadow-sm">
            <Search size={20} className="text-brand-dark/20 group-focus-within:text-brand-blue transition-colors" />
            <input 
              type="text" 
              placeholder={t("products.search_placeholder")} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-base md:text-lg text-brand-dark w-full placeholder:text-brand-dark/20 font-medium"
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
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-black tracking-tight text-brand-dark group-hover:text-brand-blue transition-colors">{product.name}</div>
                        {product.is_hot && (
                          <div className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 animate-pulse">
                            <Flame size={10} fill="currentColor" /> HOT
                          </div>
                        )}
                      </div>
                      <div className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest mt-3">{product.type}</div>
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
