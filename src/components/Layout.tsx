import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layers, Globe, Mail, X, Menu, ChevronDown, ArrowLeft, Activity, Shield, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { AIAssistant } from "./AIAssistant";

interface LayoutProps {
  children: ReactNode;
}

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isHome = location.pathname === "/";

  const navLinks = [
    { to: "/about", label: t("nav.about") },
    { to: "/divisions", label: t("nav.divisions", "事业部") },
    { to: "/products", label: t("nav.products"), hasMega: true },
    { to: "/market-applications", label: t("nav.market_applications", "市场应用") },
    { to: "/innovation", label: t("nav.innovation", "革新") },
    { to: "/news", label: t("nav.news", "新闻中心") },
    { to: "/rd", label: t("nav.rd", "研发创新") },
    { to: "/sustainability", label: t("nav.sustainability", "可持续发展") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const productMegaMenu = [
    {
      title: t("mega.by_division", "按事业部分类"),
      items: [
        { label: t("divisions.plastic", "塑胶涂料树脂"), to: "/products?division=plastic" },
        { label: t("divisions.ink", "印刷油墨树脂"), to: "/products?division=ink" },
        { label: t("divisions.wood", "木器涂料树脂"), to: "/products?division=wood" },
        { label: t("divisions.metal", "金属/薄膜涂料树脂"), to: "/products?division=metal" },
        { label: t("divisions.leather", "皮革/纺织/胶粘剂树脂"), to: "/products?division=leather" },
      ]
    },
    {
      title: t("mega.by_series", "按产品系列"),
      items: [
        { label: "SEACRYL 丙烯酸系列", to: "/products?search=SEACRYL" },
        { label: "SEAPUR 聚氨酯系列", to: "/products?search=SEAPUR" },
        { label: "SEAPUA 复合系列", to: "/products?search=SEAPUA" },
        { label: "水性 UV 固化系列", to: "/products?search=UV" },
        { label: "自消光系列", to: "/products?search=消光" },
      ]
    },
    {
      title: t("mega.by_industry", "按应用领域"),
      items: [
        { label: t("industries.plastic", "塑胶应用"), to: "/products?industry=plastic" },
        { label: t("industries.metal", "金属应用"), to: "/products?industry=metal" },
        { label: t("industries.wood", "木器应用"), to: "/products?industry=wood" },
        { label: t("industries.ink", "油墨应用"), to: "/products?industry=ink" },
        { label: t("industries.leather", "皮革/纺织应用"), to: "/products?industry=leather" },
      ]
    }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || !isHome || isMenuOpen ? "bg-white/90 backdrop-blur-xl shadow-sm py-4" : "bg-transparent py-8"}`}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
          <img 
            src="https://ais-pre-g3czlublaxelm5kualarjo-292922663318.europe-west2.run.app/api/attachments/40600104-a63e-461b-907a-248679462551" 
            alt="西顿新材料" 
            className={`h-10 md:h-12 w-auto transition-all duration-500 ${isScrolled || !isHome || isMenuOpen ? "brightness-0" : "brightness-0 invert"}`}
            referrerPolicy="no-referrer" 
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <div 
              key={link.to}
              className="relative"
              onMouseEnter={() => link.hasMega && setIsProductsHovered(true)}
              onMouseLeave={() => link.hasMega && setIsProductsHovered(false)}
            >
              <Link 
                to={link.to} 
                className={`text-[11px] uppercase tracking-wider font-black transition-all duration-300 ${isScrolled || !isHome || isMenuOpen ? (location.pathname === link.to ? "text-brand-blue" : "text-brand-dark/70 hover:text-brand-blue") : (location.pathname === link.to ? "text-brand-blue" : "text-white/80 hover:text-white")}`}
              >
                {link.label}
              </Link>

              {link.hasMega && (
                <AnimatePresence>
                  {isProductsHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-8 z-[60]"
                    >
                      <div className="bg-white border border-brand-border p-12 min-w-[900px] grid grid-cols-3 gap-16 rounded-[32px] shadow-2xl">
                        {productMegaMenu.map((section) => (
                          <div key={section.title}>
                            <h4 className="text-[10px] font-black text-brand-dark/30 uppercase tracking-wider mb-8 border-b border-brand-border pb-4">
                              {section.title}
                            </h4>
                            <ul className="space-y-4">
                              {section.items.map((item) => (
                                <li key={item.label}>
                                  <Link 
                                    to={item.to} 
                                    className="text-[13px] text-brand-dark/60 hover:text-brand-blue transition-colors block font-bold"
                                    onClick={() => setIsProductsHovered(false)}
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center gap-4 ml-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 transition-colors ${isScrolled || !isHome || isMenuOpen ? "text-brand-dark/40 hover:text-brand-blue" : "text-white/40 hover:text-white"}`}
            >
              <Search size={18} />
            </button>
            <div className="w-px h-4 bg-brand-border mx-2"></div>
            {[
              { id: 'zh', label: '简' },
              { id: 'zh-HK', label: '繁' },
              { id: 'en', label: 'EN' },
              { id: 'ja', label: 'JP' },
              { id: 'ko', label: 'KR' },
              { id: 'ru', label: 'RU' }
            ].map((lang) => (
              <button 
                key={lang.id}
                onClick={() => i18n.changeLanguage(lang.id)}
                className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${i18n.language === lang.id ? "text-brand-blue" : (isScrolled || !isHome || isMenuOpen ? "text-brand-dark/40 hover:text-brand-blue" : "text-white/40 hover:text-white")}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </nav>

        <button 
          className={`md:hidden z-50 p-2 transition-colors ${isScrolled || !isHome || isMenuOpen ? "text-brand-dark" : "text-white"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-40 flex flex-col pt-40 px-12 md:hidden"
          >
            <nav className="flex flex-col gap-10 overflow-y-auto pb-20">
              {/* Mobile Language Switcher */}
              <div className="flex flex-wrap gap-3 mb-8 p-6 bg-white/[0.03] rounded-[32px] border border-white/5">
                {[
                  { id: 'zh', label: '简体' },
                  { id: 'zh-HK', label: '繁体' },
                  { id: 'en', label: 'EN' },
                  { id: 'ja', label: '日本語' },
                  { id: 'ko', label: '한국어' },
                  { id: 'ru', label: 'Русский' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => i18n.changeLanguage(lang.id)}
                    className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${i18n.language === lang.id ? "bg-brand-blue text-white" : "bg-white/[0.05] text-white/40 border border-white/5"}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    to={link.to} 
                    className="text-4xl font-light text-white hover:text-brand-blue transition-colors flex items-center justify-between font-serif"
                    onClick={() => !link.hasMega && setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  
                  {link.hasMega && (
                    <div className="mt-6 ml-6 flex flex-col gap-4 border-l border-white/5 pl-6">
                      {productMegaMenu[0].items.map((item) => (
                        <Link 
                          key={item.to}
                          to={item.to}
                          className="text-lg text-white/40 hover:text-brand-blue transition-colors font-serif"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-8"
              >
                <Link 
                  to="/contact" 
                  className="inline-block px-12 py-4 rounded-full bg-brand-blue text-white font-mono text-[10px] uppercase tracking-wider hover:bg-brand-blue/90 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.contact")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-dark/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"
            >
              <X size={40} />
            </button>
            <div className="max-w-4xl w-full">
              <div className="text-brand-blue font-black uppercase tracking-wider text-[11px] mb-8 text-center">Global Search</div>
              <div className="relative">
                <input 
                  autoFocus
                  type="text"
                  placeholder="搜索产品、应用或新闻..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }
                  }}
                  className="w-full bg-transparent border-b-4 border-white/10 py-10 text-4xl md:text-7xl font-black text-white outline-none focus:border-brand-blue transition-all placeholder:text-white/5"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-white/10" size={60} />
              </div>
              <div className="mt-12 flex flex-wrap gap-4 justify-center">
                <span className="text-white/20 text-[11px] font-black uppercase tracking-widest mr-4">Popular:</span>
                {["SEACRYL", "SEAPUR", "Water-based", "Automotive", "Leather"].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => {
                      navigate(`/products?search=${tag}`);
                      setIsSearchOpen(false);
                    }}
                    className="px-6 py-2 rounded-full bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-white py-32 px-6 md:px-20 border-t border-brand-border relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-10">
              <img src="https://ais-pre-g3czlublaxelm5kualarjo-292922663318.europe-west2.run.app/api/attachments/40600104-a63e-461b-907a-248679462551" alt="西顿新材料" className="h-10 md:h-12 w-auto brightness-0" referrerPolicy="no-referrer" />
            </div>
            <p className="text-brand-dark/50 text-sm leading-relaxed mb-10 font-bold">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all cursor-pointer group shadow-sm">
                <Globe size={20} className="text-brand-dark/30 group-hover:text-white" />
              </div>
              <div className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all cursor-pointer group shadow-sm">
                <Mail size={20} className="text-brand-dark/30 group-hover:text-white" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-black mb-10 text-brand-dark/30 tracking-wider uppercase">{t("footer.quick_links")}</h4>
            <ul className="space-y-5 text-brand-dark/70 text-[13px] font-bold">
              <li><Link to="/about" className="hover:text-brand-blue transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/products" className="hover:text-brand-blue transition-colors">{t("nav.products")}</Link></li>
              <li><Link to="/downloads" className="hover:text-brand-blue transition-colors">下载中心 (Download Center)</Link></li>
              <li><Link to="/market-applications" className="hover:text-brand-blue transition-colors">{t("nav.market_applications")}</Link></li>
              <li><Link to="/innovation" className="hover:text-brand-blue transition-colors">{t("nav.innovation")}</Link></li>
              <li><Link to="/rd" className="hover:text-brand-blue transition-colors">{t("nav.rd")}</Link></li>
              <li><Link to="/sustainability" className="hover:text-brand-blue transition-colors">{t("nav.sustainability")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black mb-10 text-brand-dark/30 tracking-wider uppercase">{t("footer.core_series")}</h4>
            <ul className="space-y-5 text-brand-dark/70 text-[13px] font-bold">
              <li><Link to="/products?search=SEACRYL" className="hover:text-brand-blue transition-colors">SEACRYL Series</Link></li>
              <li><Link to="/products?search=SEAPUR" className="hover:text-brand-blue transition-colors">SEAPUR Series</Link></li>
              <li><Link to="/products?search=SEAPUA" className="hover:text-brand-blue transition-colors">SEAPUA Series</Link></li>
              <li><Link to="/products?search=消光" className="hover:text-brand-blue transition-colors">Self-Matting Series</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black mb-10 text-brand-dark/30 tracking-wider uppercase">{t("nav.contact")}</h4>
            <ul className="space-y-5 text-brand-dark/70 text-[13px] font-bold">
              <li className="flex items-center gap-3">
                <Activity size={16} className="text-brand-blue" />
                <a href="tel:0751-3822233" className="hover:text-brand-blue transition-colors">0751-3822233</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-blue" />
                <a href="mailto:sales@seaton.com.cn" className="hover:text-brand-blue transition-colors">sales@seaton.com.cn</a>
              </li>
              <li className="flex items-start gap-3">
                <Globe size={16} className="text-brand-blue mt-1 shrink-0" />
                <span className="leading-relaxed">{t("contact.info.address_val")}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black mb-10 text-brand-dark/30 tracking-wider uppercase">
              {t("footer.subscribe")}
            </h4>
            <p className="text-brand-dark/50 text-sm mb-10 font-bold leading-relaxed">{t("footer.subscribe_desc")}</p>
            <div className="relative">
              <input type="email" placeholder={t("footer.email_placeholder")} className="bg-transparent border-b border-brand-border w-full py-5 text-sm text-brand-dark outline-none focus:border-brand-blue transition-all font-bold" />
              <button className="absolute right-0 bottom-5 text-[11px] font-black text-brand-dark/30 uppercase tracking-wider hover:text-brand-blue transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-8 text-brand-dark/20 text-[11px] uppercase tracking-wider font-black">
          <p>{t("footer.rights")}</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-brand-dark transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-brand-dark transition-colors">{t("footer.terms")}</a>
            <a href="#" className="hover:text-brand-dark transition-colors">粤ICP备2022033233号</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="bg-noise"></div>
      
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <AIAssistant />

      {/* Privacy Notice / Cookie Hint */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 5 }}
        className="fixed bottom-6 left-6 z-[60] max-w-xs bg-brand-dark/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl hidden sm:block"
      >
        <div className="flex items-start gap-4">
          <Shield size={16} className="text-brand-blue shrink-0 mt-1" />
          <div>
            <p className="text-[10px] text-white/60 leading-relaxed mb-2">
              {t("layout.privacy_notice")}
            </p>
            <button className="text-[8px] font-bold text-brand-blue uppercase tracking-wider hover:underline">
              {t("layout.learn_more")}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-10 right-10 z-[60] flex flex-col gap-4">
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-white backdrop-blur-md border border-brand-border rounded-full flex items-center justify-center text-brand-dark/40 hover:text-brand-blue hover:border-brand-blue transition-all group shadow-lg"
        >
          <ArrowLeft size={20} className="rotate-90" />
          <div className="absolute right-full mr-4 px-3 py-1 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {t("layout.back_to_top")}
          </div>
        </motion.button>

        <Link to="/contact">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white shadow-xl shadow-brand-blue/20 group relative"
          >
            <Activity size={20} />
            <div className="absolute right-full mr-4 px-3 py-1 bg-white text-brand-dark text-[10px] font-bold uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {t("layout.online_inquiry")}
            </div>
            <div className="absolute inset-0 rounded-full bg-brand-blue animate-ping opacity-20"></div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
