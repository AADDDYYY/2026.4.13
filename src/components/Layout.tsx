import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layers, Globe, Mail, X, Menu, ChevronDown, ArrowLeft, Activity, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

interface LayoutProps {
  children: ReactNode;
}

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
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
  ];

  const productMegaMenu = [
    {
      title: t("mega.by_division", "按事业部分类"),
      items: [
        { label: t("divisions.plastic", "塑胶涂料树脂"), to: "/products?division=塑胶涂料树脂事业部" },
        { label: t("divisions.ink", "印刷油墨树脂"), to: "/products?division=印刷油墨树脂事业部" },
        { label: t("divisions.wood", "木器涂料树脂"), to: "/products?division=木器涂料树脂事业部" },
        { label: t("divisions.metal", "金属/薄膜涂料树脂"), to: "/products?division=金属 / 薄膜涂料树脂事业部" },
        { label: t("divisions.leather", "皮革/纺织/胶粘剂树脂"), to: "/products?division=皮革 / 纺织 / 胶粘剂树脂事业部" },
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
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || !isHome || isMenuOpen ? "glass-header-scrolled py-4" : "glass-header py-6"}`}>
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 h-[2px] bg-brand-blue z-[60] transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%` }}></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <img 
            src="https://ais-pre-g3czlublaxelm5kualarjo-292922663318.europe-west2.run.app/api/attachments/40600104-a63e-461b-907a-248679462551" 
            alt="西顿新材料" 
            className={`h-6 md:h-8 w-auto transition-all duration-500 ${isScrolled || !isHome || isMenuOpen ? "invert" : ""}`} 
            referrerPolicy="no-referrer" 
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mr-4">
            <button 
              onClick={() => i18n.changeLanguage('zh')}
              className={`text-[10px] font-bold transition-colors ${i18n.language === 'zh' ? "text-brand-blue" : "text-white/20 hover:text-white"}`}
              title="简体中文"
            >
              简
            </button>
            <button 
              onClick={() => i18n.changeLanguage('zh-HK')}
              className={`text-[10px] font-bold transition-colors ${i18n.language === 'zh-HK' ? "text-brand-blue" : "text-white/20 hover:text-white"}`}
              title="繁體中文"
            >
              繁
            </button>
            <button 
              onClick={() => i18n.changeLanguage('en')}
              className={`text-[10px] font-bold transition-colors ${i18n.language === 'en' ? "text-brand-blue" : "text-white/20 hover:text-white"}`}
              title="English"
            >
              EN
            </button>
            <button 
              onClick={() => i18n.changeLanguage('ja')}
              className={`text-[10px] font-bold transition-colors ${i18n.language === 'ja' ? "text-brand-blue" : "text-white/20 hover:text-white"}`}
              title="日本語"
            >
              日
            </button>
            <button 
              onClick={() => i18n.changeLanguage('ko')}
              className={`text-[10px] font-bold transition-colors ${i18n.language === 'ko' ? "text-brand-blue" : "text-white/20 hover:text-white"}`}
              title="한국어"
            >
              韩
            </button>
            <button 
              onClick={() => i18n.changeLanguage('ru')}
              className={`text-[10px] font-bold transition-colors ${i18n.language === 'ru' ? "text-brand-blue" : "text-white/20 hover:text-white"}`}
              title="Русский"
            >
              俄
            </button>
          </div>

          {navLinks.map((link) => (
            <div 
              key={link.to}
              className="relative"
              onMouseEnter={() => link.hasMega && setIsProductsHovered(true)}
              onMouseLeave={() => link.hasMega && setIsProductsHovered(false)}
            >
              <Link 
                to={link.to} 
                className={`nav-link flex items-center gap-1 ${isScrolled || !isHome || isProductsHovered ? "text-brand-dark" : "text-white"}`}
              >
                {link.label}
                {link.hasMega && <ChevronDown size={14} className={`transition-transform duration-300 ${isProductsHovered ? "rotate-180" : ""}`} />}
              </Link>

              {link.hasMega && (
                <AnimatePresence>
                  {isProductsHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-6 z-[60]"
                    >
                      <div className="bg-white shadow-2xl border border-gray-100 rounded-3xl p-10 min-w-[800px] max-h-[80vh] overflow-y-auto grid grid-cols-3 gap-12 custom-scrollbar">
                        {productMegaMenu.map((section) => (
                          <div key={section.title}>
                            <h4 className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em] mb-6 border-b border-gray-50 pb-4">
                              {section.title}
                            </h4>
                            <ul className="space-y-4">
                              {section.items.map((item) => (
                                <li key={item.label}>
                                  <Link 
                                    to={item.to} 
                                    className="text-sm text-gray-500 hover:text-brand-blue transition-colors block font-light"
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
          <Link to="/contact" className={`px-5 py-2 rounded-full border transition-all duration-300 text-sm font-medium ${isScrolled || !isHome || isProductsHovered ? "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white" : "border-white text-white hover:bg-white hover:text-brand-blue"}`}>
            {t("nav.contact")}
          </Link>
        </nav>

        <button 
          className={`md:hidden z-50 p-2 transition-colors ${isScrolled || !isHome || isMenuOpen ? "text-brand-dark" : "text-white"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          {isMenuOpen ? <X size={24} /> : <Layers size={24} />}
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
            className="fixed inset-0 bg-white z-40 flex flex-col pt-32 px-8 md:hidden"
          >
            <nav className="flex flex-col gap-6 overflow-y-auto pb-20">
              {/* Mobile Language Switcher */}
              <div className="flex flex-wrap gap-3 mb-4 p-4 bg-gray-50 rounded-2xl">
                {[
                  { id: 'zh', label: '简体' },
                  { id: 'zh-HK', label: '繁體' },
                  { id: 'en', label: 'EN' },
                  { id: 'ja', label: '日本語' },
                  { id: 'ko', label: '한국어' },
                  { id: 'ru', label: 'Русский' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => i18n.changeLanguage(lang.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${i18n.language === lang.id ? "bg-brand-blue text-white" : "bg-white text-gray-400 border border-gray-100"}`}
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
                    className="text-2xl font-medium text-brand-dark hover:text-brand-blue transition-colors flex items-center justify-between"
                    onClick={() => !link.hasMega && setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  
                  {link.hasMega && (
                    <div className="mt-4 ml-4 flex flex-col gap-3 border-l border-gray-100 pl-4">
                      {productMegaMenu[0].items.map((item) => (
                        <Link 
                          key={item.to}
                          to={item.to}
                          className="text-sm text-gray-400 hover:text-brand-blue transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <Link 
                        to="/products"
                        className="text-sm text-brand-blue font-bold mt-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t("mega.view_all")} →
                      </Link>
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4"
              >
                <Link 
                  to="/contact" 
                  className="inline-block px-8 py-3 rounded-full bg-brand-blue text-white font-medium text-lg hover:bg-brand-blue/90 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.contact")}
                </Link>
              </motion.div>
            </nav>

            <div className="mt-auto pb-12 flex gap-6">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-brand-dark hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all">
                <Globe size={20} />
              </div>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-brand-dark hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all">
                <Mail size={20} />
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
    <footer className="bg-brand-dark py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <img src="https://ais-pre-g3czlublaxelm5kualarjo-292922663318.europe-west2.run.app/api/attachments/40600104-a63e-461b-907a-248679462551" alt="西顿新材料" className="h-6 md:h-8 w-auto" referrerPolicy="no-referrer" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-10 font-light">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all duration-300 cursor-pointer group">
                <Globe size={18} className="text-white/40 group-hover:text-white" />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all duration-300 cursor-pointer group">
                <Mail size={18} className="text-white/40 group-hover:text-white" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-white tracking-wider text-sm uppercase">{t("footer.quick_links")}</h4>
            <ul className="space-y-4 text-white/40 text-sm font-light">
              <li><Link to="/about" className="hover:text-brand-blue transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/products" className="hover:text-brand-blue transition-colors">{t("nav.products")}</Link></li>
              <li><Link to="/market-applications" className="hover:text-brand-blue transition-colors">{t("nav.market_applications")}</Link></li>
              <li><Link to="/innovation" className="hover:text-brand-blue transition-colors">{t("nav.innovation")}</Link></li>
              <li><Link to="/news" className="hover:text-brand-blue transition-colors">{t("nav.news")}</Link></li>
              <li><Link to="/rd" className="hover:text-brand-blue transition-colors">{t("nav.rd")}</Link></li>
              <li><Link to="/sustainability" className="hover:text-brand-blue transition-colors">{t("nav.sustainability")}</Link></li>
              <li><Link to="/contact" className="hover:text-brand-blue transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-white tracking-wider text-sm uppercase">{t("footer.core_series")}</h4>
            <ul className="space-y-4 text-white/40 text-sm font-light">
              <li><Link to="/products?search=SEACRYL" className="hover:text-brand-blue transition-colors">SEACRYL 丙烯酸系列</Link></li>
              <li><Link to="/products?search=SEAPUR" className="hover:text-brand-blue transition-colors">SEAPUR 聚氨酯系列</Link></li>
              <li><Link to="/products?search=SEAPUA" className="hover:text-brand-blue transition-colors">SEAPUA 复合系列</Link></li>
              <li><Link to="/products?search=消光" className="hover:text-brand-blue transition-colors">水性自消光系列</Link></li>
              <li><Link to="/products?search=UV" className="hover:text-brand-blue transition-colors">水性 UV 固化系列</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-white tracking-wider text-sm uppercase flex items-center gap-2">
              <div className="w-1 h-1 bg-brand-blue"></div>
              {t("footer.subscribe")}
            </h4>
            <p className="text-white/40 text-sm mb-6 font-light">{t("footer.subscribe_desc")}</p>
            <div className="flex gap-2">
              <input type="email" placeholder={t("footer.email_placeholder")} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-blue w-full transition-all" />
              <button className="bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue/80 transition-all text-sm font-medium">
                {t("footer.subscribe_btn")}
              </button>
            </div>
            
            <div className="mt-10 pt-10 border-t border-white/5">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  <span>HQ Coordinates</span>
                  <span className="text-white/40">23.1291° N, 113.2644° E</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  <span>System Status</span>
                  <span className="text-brand-blue">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs">
          <p>{t("footer.rights")}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a>
            <a href="#" className="hover:text-white transition-colors">粤ICP备2022033233号</a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[9px] text-white/5 font-light leading-relaxed max-w-4xl mx-auto uppercase tracking-[0.1em]">
            Disclaimer: The technical data and recommendations provided on this website are based on our current knowledge and experience. 
            Users are advised to conduct their own tests to ensure suitability for specific applications. 
            Seaton New Materials reserves the right to modify product specifications without prior notice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Top Trust Bar */}
      <div className="h-8 bg-black border-b border-white/5 flex items-center justify-between px-6 z-[70] hidden md:flex">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Secure Connection: AES-256</span>
          </div>
          <span className="text-white/10">|</span>
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Server: South China Node 01</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Global Standard: ISO 9001 / ISO 14001</span>
        </div>
      </div>

      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#050a14] flex flex-col items-center justify-center"
          >
            <div className="w-64">
              <div className="flex justify-between mb-4">
                <span className="text-[10px] font-mono text-brand-blue uppercase tracking-widest">Initializing System</span>
                <span className="text-[10px] font-mono text-brand-blue">4.0.2</span>
              </div>
              <div className="h-px w-full bg-white/5 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 bg-brand-blue"
                />
              </div>
              <div className="mt-4 flex flex-col gap-1">
                <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Loading Molecular Database...</div>
                <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Calibrating Synthesis Parameters...</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-noise"></div>
      <div 
        className="custom-cursor" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>
      <div 
        className="custom-cursor-dot" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>
      <div 
        className="cursor-lens" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>

      {/* Right Technical Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-12 border-l border-white/5 hidden xl:flex flex-col items-center justify-between py-20 z-30 pointer-events-none">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-1 h-1 bg-brand-blue animate-ping"></div>
          <div className="h-20 w-px bg-gradient-to-b from-brand-blue to-transparent"></div>
        </div>
        <div className="rotate-90 text-[8px] font-mono text-white/10 tracking-[0.8em] uppercase whitespace-nowrap">
          Environmental Impact: Minimal / VOC: 0.001%
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="text-[8px] font-mono text-brand-blue">24.5°C</div>
          <div className="text-[8px] font-mono text-brand-blue">45% RH</div>
        </div>
      </div>
      
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />

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
            <button className="text-[8px] font-bold text-brand-blue uppercase tracking-widest hover:underline">
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
          className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-brand-blue hover:border-brand-blue transition-all group"
        >
          <ArrowLeft size={20} className="rotate-90" />
          <div className="absolute right-full mr-4 px-3 py-1 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
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
            <div className="absolute right-full mr-4 px-3 py-1 bg-white text-brand-dark text-[10px] font-bold uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {t("layout.online_inquiry")}
            </div>
            <div className="absolute inset-0 rounded-full bg-brand-blue animate-ping opacity-20"></div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
