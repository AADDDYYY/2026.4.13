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
    <div className="pt-32 pb-24 bg-[#050a14] min-h-screen text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-32 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="text-brand-blue font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block">Product Intelligence Center</span>
          <h1 className="text-6xl md:text-9xl font-bold mb-12 tracking-tighter leading-none">
            {t("products.title").slice(0, 2)}<span className="text-white/20 italic font-light">{t("products.title").slice(2)}</span>
          </h1>
          <p className="text-white/40 text-xl font-light leading-relaxed max-w-2xl">
            {t("products.subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Division Filter */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-4 bg-brand-blue"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">{t("mega.by_division")} / Division Filter</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {productDivisions.map((div) => {
                const isActive = activeDivision === (div.value || "all");
                return (
                  <motion.button
                    key={div.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveDivision(div.value || "all")}
                    className={`px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                      isActive 
                        ? "bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20" 
                        : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20 hover:text-white"
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
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">{t("mega.by_industry")} / Industry</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {industryApplications.map((ind) => {
                const isActive = activeIndustry === (ind.value || "all");
                return (
                  <motion.button
                    key={ind.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveIndustry(ind.value || "all")}
                    className={`px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                      isActive 
                        ? "bg-white/10 border-brand-blue text-brand-blue shadow-lg shadow-brand-blue/10" 
                        : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20 hover:text-white"
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
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-40">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-5xl font-bold mb-4 tracking-tighter">{t("products.catalog")}</h2>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]">{t("products.tds")}</p>
            </div>
            <div className="flex items-center gap-6 p-5 bg-white/[0.02] border border-white/5 rounded-2xl w-full md:w-[450px] group focus-within:border-brand-blue/30 transition-all">
              <Search size={20} className="text-white/20 group-focus-within:text-brand-blue transition-colors" />
              <input 
                type="text" 
                placeholder={t("products.search_placeholder")} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/10 font-light"
              />
            </div>
          </div>

          <div className="bg-white/[0.01] border border-white/5 rounded-[40px] overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <div className="min-w-[1200px]">
                <div className="grid grid-cols-12 gap-4 p-8 border-b border-white/5 bg-white/[0.02] text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                  <div className="col-span-2">{t("products.table.name_type")}</div>
                  <div className="col-span-1">{t("products.table.appearance")}</div>
                  <div className="col-span-1">{t("products.table.solid")}</div>
                  <div className="col-span-1">{t("products.table.ph")}</div>
                  <div className="col-span-1">{t("products.table.viscosity")}</div>
                  <div className="col-span-1">{t("products.table.tg_mfft")}</div>
                  <div className="col-span-3">{t("products.table.features")}</div>
                  <div className="col-span-2 text-right">{t("products.table.actions")}</div>
                </div>
                <div className="divide-y divide-white/5">
                  {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                    <Link 
                      key={product.id} 
                      to={`/products/${product.id}`}
                      className="grid grid-cols-12 gap-4 p-10 items-center hover:bg-white/[0.03] transition-all duration-500 group"
                    >
                      <div className="col-span-2">
                        <div className="text-xl font-bold tracking-tight group-hover:text-brand-blue transition-colors">{product.name}</div>
                        <div className="text-[10px] text-white/20 uppercase tracking-widest mt-2 font-bold">{product.type}</div>
                      </div>
                      <div className="col-span-1">
                        <span className="text-sm text-white/40 font-light">{product.appearance}</span>
                      </div>
                      <div className="col-span-1">
                        <span className="text-sm text-white/40 font-light">{product.solidContent}</span>
                      </div>
                      <div className="col-span-1">
                        <span className="text-sm text-white/40 font-light">{product.pH}</span>
                      </div>
                      <div className="col-span-1">
                        <span className="text-sm text-white/40 font-light">{product.viscosity}</span>
                      </div>
                      <div className="col-span-1">
                        <div className="flex flex-col text-[11px] font-light">
                          <span className="text-white/40">TG: {product.tg}</span>
                          <span className="text-white/20">MFFT: {product.mfft}</span>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="flex flex-wrap gap-2">
                          {product.features.map(f => (
                            <span key={f} className="px-3 py-1 bg-white/[0.03] rounded-lg text-[10px] text-white/30 border border-white/5">{f}</span>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-2 text-right">
                        <div className="inline-flex items-center gap-3 text-brand-blue opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <span className="text-[10px] font-bold uppercase tracking-widest">{t("products.table.view_details")}</span>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </Link>
                  )) : (
                    <div className="p-32 text-center">
                      <FlaskConical size={48} className="mx-auto text-white/5 mb-8" />
                      <p className="text-white/20 text-xl font-light italic">{t("products.no_results")}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Solution CTA */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-40">
          <div className="bg-white/[0.01] border border-white/5 rounded-[60px] p-16 lg:p-32 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px]"></div>
            <div className="relative z-10">
              <Shield size={48} className="text-brand-blue mx-auto mb-12" />
              <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter">{t("products.cta.title").slice(0, 3)}<span className="text-white/20">{t("products.cta.title").slice(3)}</span></h2>
              <p className="text-white/40 text-xl max-w-4xl mx-auto font-light leading-relaxed mb-16">
                {t("products.cta.desc")}
              </p>
              <Link to="/contact" className="inline-block px-12 py-6 bg-brand-blue text-white rounded-full font-bold hover:bg-brand-blue/80 transition-all shadow-2xl shadow-brand-blue/20 uppercase tracking-widest text-xs">
                {t("products.cta.btn")}
              </Link>
            </div>
          </div>
        </section>
    </div>
  );
}
