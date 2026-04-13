import { motion } from "motion/react";
import { Layers, Palette, Zap, Scissors, Car, Battery, ArrowRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Divisions() {
  const { t } = useTranslation();

  const divisions = [
    {
      title: t("divisions_page.items.leather.title"),
      en: "Leather Chemicals Division",
      desc: t("divisions_page.items.leather.desc"),
      icon: <Scissors size={32} />,
      division: "皮革化学品",
      image: "https://images.unsplash.com/photo-1524292332709-b33366a7f145?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t("divisions_page.items.resin.title"),
      en: "Waterborne Resin Division",
      desc: t("divisions_page.items.resin.desc"),
      icon: <Palette size={32} />,
      division: "水性树脂",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t("divisions_page.items.automotive.title"),
      en: "Automotive Interior Division",
      desc: t("divisions_page.items.automotive.desc"),
      icon: <Car size={32} />,
      division: "汽车内饰",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t("divisions_page.items.uv.title"),
      en: "Waterborne UV Division",
      desc: t("divisions_page.items.uv.desc"),
      icon: <Zap size={32} />,
      division: "水性UV",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t("divisions_page.items.battery.title"),
      en: "Power Battery Adhesive Division",
      desc: t("divisions_page.items.battery.desc"),
      icon: <Battery size={32} />,
      division: "动力电池胶",
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t("divisions_page.items.custom.title"),
      en: "Customized Solutions",
      desc: t("divisions_page.items.custom.desc"),
      icon: <Layers size={32} />,
      division: "all",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#050a14] min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-40 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="text-brand-blue font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block">Business Structure</span>
          <h1 className="text-6xl md:text-9xl font-bold mb-12 tracking-tighter leading-none">
            {t("divisions_page.hero.title")}<span className="text-white/20 italic font-light">{t("divisions_page.hero.subtitle")}</span>
          </h1>
          <p className="text-white/40 text-xl font-light leading-relaxed max-w-2xl">
            {t("divisions_page.hero.desc")}
          </p>
        </motion.div>
      </div>

      {/* Divisions Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {divisions.map((division, index) => (
            <motion.div
              key={division.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[600px] rounded-[40px] overflow-hidden border border-white/5 bg-white/[0.02] hover:border-brand-blue/30 transition-all duration-700"
            >
              {/* Background Image */}
              <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100">
                <img 
                  src={division.image} 
                  alt={division.title} 
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/80 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full p-12 flex flex-col justify-end">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mb-8 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                  {division.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2 tracking-tight">{division.title}</h3>
                <div className="text-brand-blue text-[10px] uppercase tracking-[0.2em] mb-6 font-bold">{division.en}</div>
                <p className="text-white/40 leading-relaxed font-light mb-10 line-clamp-3 group-hover:text-white/60 transition-colors">
                  {division.desc}
                </p>
                
                <Link 
                  to={`/products?division=${division.division}`}
                  className="inline-flex items-center gap-3 text-white font-bold text-xs uppercase tracking-widest group/link"
                >
                  <span className="relative">
                    {t("divisions_page.items.view_products")}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-blue group-hover/link:w-full transition-all duration-500"></span>
                  </span>
                  <ArrowRight size={16} className="text-brand-blue group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Reach */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-40">
        <div className="relative rounded-[60px] overflow-hidden min-h-[600px] flex items-center border border-white/5">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200" 
              alt="Industry" 
              className="w-full h-full object-cover grayscale opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050a14] to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-16 lg:p-32 max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <Globe className="text-brand-blue" size={24} />
              <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px]">Global Reach</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-tight">{t("divisions_page.global.title")}<br /><span className="text-white/20">{t("divisions_page.global.subtitle")}</span></h2>
            <p className="text-white/40 text-xl font-light leading-relaxed mb-12">
              {t("divisions_page.global.desc")}
            </p>
            <Link to="/contact" className="inline-block px-12 py-6 bg-brand-blue text-white rounded-full font-bold hover:bg-brand-blue/80 transition-all shadow-2xl shadow-brand-blue/20 uppercase tracking-widest text-xs">
              {t("divisions_page.global.contact")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
