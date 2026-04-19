import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Search, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCMSAsset } from "../hooks/useCMSAsset";

const newsData = [
  {
    id: 1,
    title: "西顿新材料荣获国家级专精特新“小巨人”企业称号",
    category: "corporate",
    type: "press_release",
    date: "2024-03-15",
    summary: "近日，国家工业和信息化部公布了第六批专精特新“小巨人”企业名单，广东西顿新材料科技有限公司凭借在水性树脂领域的深厚技术积淀与创新能力成功入选。",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "水性自消光树脂在高端皮革涂饰中的应用研究",
    category: "leather",
    type: "article",
    date: "2024-02-28",
    summary: "本文深入探讨了水性自消光树脂的成膜机理及其在高端汽车皮革、家具皮革中的应用优势，为行业提供了全新的环保涂饰方案。",
    image: "https://images.unsplash.com/photo-1524292332407-d54ad0d1d769?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "西顿新材料参加2024中国国际涂料展 (China Coat)",
    category: "coatings",
    type: "press_release",
    date: "2024-02-10",
    summary: "西顿新材料携全系列水性树脂产品亮相2024中国国际涂料展，展示了公司在绿色化学与可持续发展方面的最新成果，吸引了众多国内外客商关注。",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "绿色转型：水性UV技术如何助力包装行业减碳",
    category: "packaging",
    type: "article",
    date: "2024-01-20",
    summary: "随着全球碳中和目标的推进，包装行业正面临巨大的环保压力。水性UV技术作为一种高效、低VOC的解决方案，正逐渐成为行业主流。",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "西顿新材料博士后科研工作站正式挂牌",
    category: "corporate",
    type: "press_release",
    date: "2023-12-15",
    summary: "博士后科研工作站的建立，标志着西顿新材料在产学研结合、高层次人才培养方面迈上了新台阶，将进一步驱动公司的技术创新。",
    image: "https://images.unsplash.com/photo-1532187875605-1ef6c237ddc4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "可持续发展的未来：生物基树脂的研发与应用",
    category: "sustainability",
    type: "article",
    date: "2023-11-05",
    summary: "西顿研发团队在生物基单体合成及树脂改性方面取得重大突破，成功开发出生物基含量超过40%的高性能水性聚氨酯产品。",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    title: "2024年全球水性树脂市场趋势报告：环保法规驱动技术革新",
    category: "coatings",
    type: "article",
    date: "2024-03-20",
    summary: "随着各国环保法规的日益严苛，水性化已成为涂料行业不可逆转的趋势。本报告分析了未来五年全球水性树脂市场的增长点及技术演进方向。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  }
];

export default function News() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { value: newsHeroBg } = useCMSAsset('news_hero_bg', '');

  const categories = ["all", "corporate", "leather", "packaging", "coatings", "sustainability"];
  const types = ["all", "press_release", "article"];

  const filteredNews = newsData.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesType = activeType === "all" || item.type === activeType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="pt-24 md:pt-48 pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56 relative">
        {newsHeroBg ? (
          <div className="absolute inset-0 -z-10 rounded-b-[100px] overflow-hidden opacity-20">
            <img src={newsHeroBg} alt="News Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        ) : (
          <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-brand-blue/5 rounded-full blur-[250px] -z-10"></div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-16">
            <div className="h-px w-16 bg-brand-blue"></div>
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px]">
              News & Insights
            </span>
            <div className="h-px w-16 bg-brand-blue"></div>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black mb-16 tracking-tight leading-[0.85]">
            {t("news_page.hero.title")}<br />
            <span className="text-brand-blue tracking-normal">News & Insights</span>
          </h1>
          <p className="text-brand-dark/40 text-2xl md:text-4xl max-w-5xl mx-auto font-light leading-relaxed">
            {t("news_page.hero.desc")}
          </p>
        </motion.div>
      </div>

      {/* Filters Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-32 space-y-16">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
          {/* Type Toggle */}
          <div className="flex gap-px bg-brand-gray border border-brand-border rounded-full overflow-hidden p-1.5 shadow-sm">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-12 py-4 rounded-full transition-all duration-500 font-black text-[11px] uppercase tracking-[0.3em] ${
                  activeType === type 
                  ? "bg-brand-blue text-white shadow-2xl shadow-brand-blue/20" 
                  : "text-brand-dark/40 hover:text-brand-blue"
                }`}
              >
                {t(`news_page.filters.${type}`)}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="w-full lg:max-w-xl relative group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-brand-dark/20 group-focus-within:text-brand-blue transition-colors" size={20} />
            <input
              type="text"
              placeholder={t("news_page.filters.search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-20 pr-8 py-6 bg-brand-gray border border-brand-border rounded-full outline-none focus:border-brand-blue/30 focus:bg-white transition-all font-medium text-lg text-brand-dark shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-10 py-4 rounded-full border transition-all duration-500 text-[11px] font-black uppercase tracking-[0.3em] ${
                activeCategory === cat
                ? "bg-brand-blue text-white border-brand-blue shadow-2xl shadow-brand-blue/20"
                : "bg-white border-brand-border text-brand-dark/40 hover:border-brand-blue hover:text-brand-blue"
              }`}
            >
              {t(`news_page.filters.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="group bg-brand-gray border border-brand-border rounded-[60px] overflow-hidden hover:border-brand-blue/30 transition-all duration-700 flex flex-col h-full shadow-sm hover:shadow-2xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-10 left-10 bg-brand-blue text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-2xl">
                    {t(`news_page.filters.${item.type}`)}
                  </div>
                </div>
                
                <div className="p-12 flex-grow flex flex-col">
                  <div className="flex items-center gap-8 text-brand-dark/30 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-brand-blue" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag size={14} className="text-brand-blue" />
                      <span className="text-brand-blue">{t(`news_page.filters.${item.category}`)}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-8 group-hover:text-brand-blue transition-colors line-clamp-2 leading-tight tracking-tight text-brand-dark">
                    {item.title}
                  </h3>
                  
                  <p className="text-brand-dark/40 text-xl mb-12 line-clamp-3 leading-relaxed font-medium">
                    {item.summary}
                  </p>
                  
                  <div className="mt-auto pt-10 border-t border-brand-border">
                    <Link to={`/news/${item.id}`} className="text-brand-blue font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-4 group/btn">
                      {t("news_page.items.read_more")} 
                      <ArrowRight size={20} className="group-hover/btn:translate-x-3 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredNews.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-56 bg-brand-gray rounded-[60px] border border-brand-border shadow-2xl"
          >
            <p className="text-brand-dark/30 text-2xl font-black tracking-tight">{t("news_page.items.no_results")}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
