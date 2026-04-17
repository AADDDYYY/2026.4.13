import { motion } from "motion/react";
import { Car, Smartphone, Package, Home, Scissors, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useCMSAsset } from "../hooks/useCMSAsset";

export default function MarketApplications() {
  const { t } = useTranslation();

  const { value: marketHeroBg } = useCMSAsset('market_hero_bg', '');

  const applications = [
    {
      id: "automotive",
      title: t("market_apps.items.automotive.title"),
      en: "Automotive Industry",
      desc: t("market_apps.items.automotive.desc"),
      icon: <Car size={40} />,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
      features: t("market_apps.items.automotive.features", { returnObjects: true }) as string[]
    },
    {
      id: "electronics",
      title: t("market_apps.items.electronics.title"),
      en: "Electronics & Appliances",
      desc: t("market_apps.items.electronics.desc"),
      icon: <Smartphone size={40} />,
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800",
      features: t("market_apps.items.electronics.features", { returnObjects: true }) as string[]
    },
    {
      id: "packaging",
      title: t("market_apps.items.packaging.title"),
      en: "Packaging & Print",
      desc: t("market_apps.items.packaging.desc"),
      icon: <Package size={40} />,
      image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
      features: t("market_apps.items.packaging.features", { returnObjects: true }) as string[]
    },
    {
      id: "home",
      title: t("market_apps.items.home.title"),
      en: "Home & Architecture",
      desc: t("market_apps.items.home.desc"),
      icon: <Home size={40} />,
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800",
      features: t("market_apps.items.home.features", { returnObjects: true }) as string[]
    },
    {
      id: "leather",
      title: t("market_apps.items.leather.title"),
      en: "Leather & Fashion",
      desc: t("market_apps.items.leather.desc"),
      icon: <Scissors size={40} />,
      image: "https://images.unsplash.com/photo-1524290263334-92f5374171a6?auto=format&fit=crop&q=80&w=800",
      features: t("market_apps.items.leather.features", { returnObjects: true }) as string[]
    },
    {
      id: "sports",
      title: t("market_apps.items.sports.title"),
      en: "Industrial & Sports",
      desc: t("market_apps.items.sports.desc"),
      icon: <Trophy size={40} />,
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
      features: t("market_apps.items.sports.features", { returnObjects: true }) as string[]
    }
  ];

  return (
    <div className="pt-48 pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56 relative">
        {marketHeroBg ? (
          <div className="absolute inset-0 -z-10 rounded-b-[100px] overflow-hidden opacity-20">
            <img src={marketHeroBg} alt="Market Hero" className="w-full h-full object-cover" />
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
              Market Applications
            </span>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black mb-16 tracking-tighter leading-[0.85]">
            {t("market_apps.hero.title")}<br />
            <span className="text-brand-blue">Market Applications</span>
          </h1>
          <p className="text-brand-dark/40 text-2xl md:text-4xl max-w-5xl font-light leading-relaxed">
            {t("market_apps.hero.desc")}
          </p>
        </motion.div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-56">
          {applications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 1 }}
              className="group relative rounded-[60px] overflow-hidden bg-brand-gray border border-brand-border hover:border-brand-blue/30 transition-all duration-700 shadow-sm hover:shadow-2xl"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={app.image} 
                  alt={app.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                <div className="absolute bottom-12 left-12 p-8 bg-brand-blue rounded-[40px] text-white shadow-2xl shadow-brand-blue/20">
                  {app.icon}
                </div>
              </div>
              
              <div className="p-16">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h3 className="text-4xl font-black mb-6 tracking-tight group-hover:text-brand-blue transition-colors text-brand-dark">{app.title}</h3>
                    <p className="text-brand-blue text-[11px] font-black uppercase tracking-[0.3em]">{app.en}</p>
                  </div>
                </div>
                
                <p className="text-brand-dark/40 text-xl mb-12 font-medium leading-relaxed">
                  {app.desc}
                </p>

                <div className="grid grid-cols-2 gap-8 mb-16">
                  {app.features.map(feature => (
                    <div key={feature} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-brand-dark/30">
                      <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Link 
                  to={`/market-applications/${app.id}`} 
                  className="inline-flex items-center gap-6 text-brand-dark font-black text-[11px] uppercase tracking-[0.3em] group/link"
                >
                  <span className="relative">
                    {t("market_apps.items.view_details")}
                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-brand-blue group-hover/link:w-full transition-all duration-500"></span>
                  </span>
                  <ArrowRight size={20} className="text-brand-blue transition-transform group-hover/link:translate-x-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mt-56 p-24 lg:p-48 rounded-[80px] bg-brand-gray border border-brand-border text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[200px] -z-10"></div>
          <h2 className="text-5xl md:text-[9rem] font-black mb-16 tracking-tighter leading-[0.8] text-brand-dark">{t("market_apps.custom.title")}</h2>
          <p className="text-brand-dark/40 max-w-5xl mx-auto mb-24 text-2xl md:text-3xl font-light leading-relaxed">
            {t("market_apps.custom.desc")}
          </p>
          <Link to="/contact" className="group relative overflow-hidden px-20 py-8 bg-brand-blue text-white rounded-full inline-block shadow-2xl shadow-brand-blue/20">
            <span className="relative z-10 font-black tracking-[0.3em] text-[11px] uppercase transition-colors group-hover:text-white">
              {t("market_apps.custom.cta")}
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
