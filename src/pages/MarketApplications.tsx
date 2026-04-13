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
    <div className="pt-32 pb-24 bg-[#050a14] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-brand-blue font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Market Applications</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">{t("market_apps.hero.title")}</h1>
          <p className="text-white/40 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            {t("market_apps.hero.desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {applications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-[40px] overflow-hidden bg-white/[0.02] border border-white/5 hover:border-brand-blue/30 transition-all duration-700"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img 
                  src={app.image} 
                  alt={app.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 p-4 bg-brand-blue rounded-2xl text-white shadow-2xl">
                  {app.icon}
                </div>
              </div>

              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-1 tracking-tight">{app.title}</h3>
                    <p className="text-brand-blue text-[10px] uppercase tracking-widest font-bold opacity-60">{app.en}</p>
                  </div>
                </div>
                
                <p className="text-white/40 mb-10 font-light leading-relaxed">
                  {app.desc}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {app.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3 text-xs text-white/30 font-medium">
                      <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Link 
                  to={`/market-applications/${app.id}`} 
                  className="inline-flex items-center gap-3 text-brand-blue font-bold text-xs uppercase tracking-widest group/link"
                >
                  {t("market_apps.items.view_details")}
                  <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-2" />
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
          className="mt-32 p-16 rounded-[50px] bg-gradient-to-br from-brand-blue/20 to-transparent border border-white/5 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] -z-10"></div>
          <h2 className="text-4xl font-bold mb-6 tracking-tight">{t("market_apps.custom.title")}</h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-12 text-lg font-light leading-relaxed">
            {t("market_apps.custom.desc")}
          </p>
          <Link 
            to="/contact" 
            className="px-12 py-5 bg-brand-blue text-white rounded-full font-bold hover:bg-brand-blue/80 transition-all inline-block shadow-xl shadow-brand-blue/20"
          >
            {t("market_apps.custom.cta")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
