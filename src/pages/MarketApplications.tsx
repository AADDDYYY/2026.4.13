import { motion } from "motion/react";
import { Car, Smartphone, Package, Home, Scissors, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MarketApplications() {
  const { t } = useTranslation();

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
    <div className="pt-32 pb-24 bg-white min-h-screen text-brand-dark">
      <div className="max-w-[1800px] mx-auto px-6 md:px-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-40"
        >
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-brand-blue"></div>
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px]">
              Market Applications
            </span>
            <div className="h-px w-12 bg-brand-blue"></div>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-12 tracking-tight leading-tight">
            {t("market_apps.hero.title")}
          </h1>
          <p className="text-brand-dark/60 text-xl md:text-2xl max-w-4xl mx-auto font-light leading-relaxed">
            {t("market_apps.hero.desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-40">
          {applications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-[40px] overflow-hidden bg-brand-gray border border-brand-border hover:border-brand-blue/30 transition-all duration-700 shadow-sm hover:shadow-xl"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={app.image} 
                  alt={app.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 p-6 bg-brand-blue rounded-[32px] text-white shadow-xl shadow-brand-blue/20">
                  {app.icon}
                </div>
              </div>
              
              <div className="p-12">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-3xl font-black mb-4 tracking-tight group-hover:text-brand-blue transition-colors text-brand-dark">{app.title}</h3>
                    <p className="text-brand-blue text-[11px] font-bold uppercase tracking-widest">{app.en}</p>
                  </div>
                </div>
                
                <p className="text-brand-dark/50 text-base mb-12 font-medium leading-relaxed">
                  {app.desc}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-12">
                  {app.features.map(feature => (
                    <div key={feature} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-dark/30">
                      <div className="w-1.5 h-1.5 bg-brand-blue rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Link 
                  to={`/market-applications/${app.id}`} 
                  className="inline-flex items-center gap-4 text-brand-dark font-bold text-[11px] uppercase tracking-widest group/link"
                >
                  <span className="relative">
                    {t("market_apps.items.view_details")}
                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-brand-blue group-hover/link:w-full transition-all duration-500"></span>
                  </span>
                  <ArrowRight size={18} className="text-brand-blue transition-transform group-hover/link:translate-x-2" />
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
          className="mt-32 p-16 lg:p-32 rounded-[60px] bg-brand-gray border border-brand-border text-center relative overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] -z-10"></div>
          <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tight leading-tight text-brand-dark">{t("market_apps.custom.title")}</h2>
          <p className="text-brand-dark/50 max-w-4xl mx-auto mb-16 text-xl md:text-2xl font-light leading-relaxed">
            {t("market_apps.custom.desc")}
          </p>
          <Link to="/contact" className="group relative overflow-hidden px-16 py-6 bg-brand-blue text-white rounded-full inline-block shadow-lg shadow-brand-blue/20">
            <span className="relative z-10 font-bold tracking-widest text-[11px] uppercase transition-colors group-hover:text-white">
              {t("market_apps.custom.cta")}
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
