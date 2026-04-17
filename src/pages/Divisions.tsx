import { motion } from "motion/react";
import { Layers, Palette, Zap, Scissors, Car, Battery, ArrowRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCMSAsset } from "../hooks/useCMSAsset";

export default function Divisions() {
  const { t } = useTranslation();

  const { value: divisionsHeroBg } = useCMSAsset('divisions_hero_bg', '');
  const { value: divLeather } = useCMSAsset('division_inner_leather', 'https://images.unsplash.com/photo-1524292332709-b33366a7f145?auto=format&fit=crop&q=80&w=800');
  const { value: divResin } = useCMSAsset('division_inner_resin', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800');
  const { value: divAuto } = useCMSAsset('division_inner_auto', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800');
  const { value: divUv } = useCMSAsset('division_inner_uv', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800');
  const { value: divBattery } = useCMSAsset('division_inner_battery', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800');
  const { value: divCustom } = useCMSAsset('division_inner_custom', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800');

  const divisions = [
    {
      title: t("divisions_page.items.leather.title"),
      en: "Leather Chemicals Division",
      desc: t("divisions_page.items.leather.desc"),
      icon: <Scissors size={32} />,
      division: "leather",
      image: divLeather
    },
    {
      title: t("divisions_page.items.resin.title"),
      en: "Waterborne Resin Division",
      desc: t("divisions_page.items.resin.desc"),
      icon: <Palette size={32} />,
      division: "plastic",
      image: divResin
    },
    {
      title: t("divisions_page.items.automotive.title"),
      en: "Automotive Interior Division",
      desc: t("divisions_page.items.automotive.desc"),
      icon: <Car size={32} />,
      division: "plastic",
      image: divAuto
    },
    {
      title: t("divisions_page.items.uv.title"),
      en: "Waterborne UV Division",
      desc: t("divisions_page.items.uv.desc"),
      icon: <Zap size={32} />,
      division: "plastic",
      image: divUv
    },
    {
      title: t("divisions_page.items.battery.title"),
      en: "Power Battery Adhesive Division",
      desc: t("divisions_page.items.battery.desc"),
      icon: <Battery size={32} />,
      division: "plastic",
      image: divBattery
    },
    {
      title: t("divisions_page.items.custom.title"),
      en: "Customized Solutions",
      desc: t("divisions_page.items.custom.desc"),
      icon: <Layers size={32} />,
      division: "all",
      image: divCustom
    }
  ];

  return (
    <div className="pt-48 pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56 relative">
        {divisionsHeroBg ? (
          <div className="absolute inset-0 -z-10 rounded-b-[100px] overflow-hidden opacity-20">
            <img src={divisionsHeroBg} alt="Divisions Hero" className="w-full h-full object-cover" />
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
          <div className="flex items-center gap-6 mb-16">
            <div className="h-px w-16 bg-brand-blue"></div>
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px]">
              Business Structure
            </span>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black mb-16 tracking-tighter leading-[0.85]">
            {t("divisions_page.hero.title")}<br />
            <span className="text-brand-blue">Business Structure & Divisions</span>
          </h1>
          <p className="text-brand-dark/40 text-2xl md:text-4xl font-light leading-relaxed max-w-5xl">
            {t("divisions_page.hero.desc")}
          </p>
        </motion.div>
      </div>

      {/* Divisions Grid */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {divisions.map((division, index) => (
            <motion.div
              key={division.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative h-[750px] rounded-[60px] overflow-hidden border border-brand-border bg-brand-gray hover:border-brand-blue/30 transition-all duration-700 shadow-sm hover:shadow-2xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-all duration-1000 scale-110 group-hover:scale-100">
                <img 
                  src={division.image} 
                  alt={division.title} 
                  className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full p-16 flex flex-col justify-end">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue mb-12 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  {division.icon}
                </div>
                <h3 className="text-4xl font-black text-brand-dark mb-6 tracking-tight group-hover:text-brand-blue transition-colors">{division.title}</h3>
                <div className="text-brand-blue text-[11px] font-black uppercase tracking-[0.3em] mb-8">{division.en}</div>
                <p className="text-brand-dark/40 text-xl font-medium leading-relaxed mb-12 line-clamp-3">
                  {division.desc}
                </p>
                
                <Link 
                  to={`/products?division=${division.division}`}
                  className="inline-flex items-center gap-4 text-brand-blue font-black text-[11px] uppercase tracking-[0.3em] group/link"
                >
                  <span className="relative">
                    {t("divisions_page.items.view_products")}
                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-brand-blue group-hover/link:w-full transition-all duration-700"></span>
                  </span>
                  <ArrowRight size={20} className="group-hover/link:translate-x-3 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Reach */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative rounded-[80px] overflow-hidden min-h-[700px] flex items-center bg-brand-blue text-white shadow-2xl"
        >
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200" 
              alt="Industry" 
              className="w-full h-full object-cover opacity-10"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="relative z-10 p-16 md:p-32 max-w-5xl">
            <div className="flex items-center gap-6 mb-12">
              <Globe className="text-white/40" size={32} />
              <span className="text-white/40 font-black uppercase tracking-[0.3em] text-[12px]">Global Reach</span>
            </div>
            <h2 className="text-5xl md:text-[9rem] font-black mb-16 tracking-tighter leading-[0.85]">
              {t("divisions_page.global.title")}
            </h2>
            <p className="text-white/80 text-2xl md:text-3xl font-light leading-relaxed mb-24">
              {t("divisions_page.global.desc")}
            </p>
            <Link to="/contact" className="group relative overflow-hidden px-20 py-8 bg-white rounded-full inline-block transition-all hover:scale-105 shadow-2xl">
              <span className="relative z-10 text-brand-blue font-black tracking-[0.3em] text-[12px] uppercase">
                {t("divisions_page.global.contact")}
              </span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
