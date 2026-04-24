import { motion } from "motion/react";
import { Leaf, Wind, Droplets, Sun, Globe, ShieldCheck, Recycle, Zap, ArrowRight, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCMSAsset } from "../hooks/useCMSAsset";

export default function Sustainability() {
  const { t } = useTranslation();

  const { value: sustainabilityHeroBg } = useCMSAsset('sustainability_hero_bg', 'https://images.unsplash.com/photo-1542382156909-9ae38d3884c1?auto=format&fit=crop&q=80&w=1600');

  const esgGoals = [
    {
      title: t("sustainability_page.esg.environmental.title"),
      en: "Environmental",
      desc: t("sustainability_page.esg.environmental.desc"),
      icon: <Leaf className="text-brand-blue" size={32} />,
      items: t("sustainability_page.esg.environmental.items", { returnObjects: true }) as string[]
    },
    {
      title: t("sustainability_page.esg.social.title"),
      en: "Social",
      desc: t("sustainability_page.esg.social.desc"),
      icon: <Globe className="text-brand-blue" size={32} />,
      items: t("sustainability_page.esg.social.items", { returnObjects: true }) as string[]
    },
    {
      title: t("sustainability_page.esg.governance.title"),
      en: "Governance",
      desc: t("sustainability_page.esg.governance.desc"),
      icon: <ShieldCheck className="text-brand-blue" size={32} />,
      items: t("sustainability_page.esg.governance.items", { returnObjects: true }) as string[]
    }
  ];

  const { value: sustStatVoc } = useCMSAsset('sust_stat_voc', '30,000+');
  const { value: sustStatEnergy } = useCMSAsset('sust_stat_energy', '40');
  const { value: sustStatInvestment } = useCMSAsset('sust_stat_investment', '15');
  const { value: sustStatBase } = useCMSAsset('sust_stat_base', '100');

  const sustainabilityStats = [
    { label: t("sustainability_page.stats.voc"), value: sustStatVoc, unit: t("sustainability_page.stats.unit_tons") },
    { label: t("sustainability_page.stats.energy"), value: sustStatEnergy, unit: "%" },
    { label: t("sustainability_page.stats.investment"), value: sustStatInvestment, unit: "%" },
    { label: t("sustainability_page.stats.base"), value: sustStatBase, unit: "%" }
  ];

  return (
    <div className="pt-24 md:pt-48 pb-16 md:pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-24 md:mb-56 relative">
        {sustainabilityHeroBg ? (
          <div className="absolute inset-0 -z-10 rounded-b-[100px] overflow-hidden">
            <img src={sustainabilityHeroBg} alt="Sustainability Hero" className="w-full h-full object-cover img-enhance object-right" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>
        ) : (
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-emerald-500/5 rounded-full blur-[250px] -z-10"></div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl"
        >
          <div className="flex items-center gap-6 mb-8 md:mb-16">
            <div className="h-px w-12 md:w-16 bg-emerald-500"></div>
            <span className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px] md:text-[11px]">
              Sustainability & ESG
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[10rem] font-black mb-10 md:mb-16 tracking-tight leading-[0.85]">
            {t("sustainability_page.hero.title")}<br />
            <span className="text-emerald-500 sm:text-[0.6em] md:text-[0.4em] lg:text-[0.3em] tracking-normal">Sustainability & ESG</span>
          </h1>
          <p className="text-brand-dark/40 text-lg sm:text-2xl md:text-4xl font-light leading-relaxed max-w-5xl">
            {t("sustainability_page.hero.desc")}
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <section className="py-24 md:py-48 border-y border-brand-border bg-brand-gray mb-24 md:mb-56">
        <div className="max-w-[1800px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 text-center sm:text-left">
            {sustainabilityStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 1 }}
              >
                <div className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-6">{stat.label}</div>
                <div className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-dark tracking-tighter flex items-baseline gap-2">
                  {stat.value}<span className="text-lg font-black text-brand-dark/20 uppercase tracking-widest">{stat.unit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Framework */}
      <section className="py-56 px-6 md:px-20 bg-white mb-56">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-32">
            <span className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[11px] mb-8 block">Our Commitment</span>
            <h2 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter leading-[0.9]">{t("sustainability_page.esg.title")}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {esgGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 1 }}
                className="p-16 rounded-[50px] border border-brand-border bg-brand-gray hover:border-emerald-500/30 transition-all duration-700 group shadow-sm hover:shadow-2xl"
              >
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-12 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                  {goal.icon}
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tight text-brand-dark">{goal.title}</h3>
                <p className="text-emerald-500 text-[11px] uppercase tracking-[0.3em] mb-10 font-black">{goal.en}</p>
                <p className="text-brand-dark/40 leading-relaxed font-medium mb-12 text-xl">{goal.desc}</p>
                <ul className="space-y-6">
                  {goal.items.map(item => (
                    <li key={item} className="flex items-center gap-4 text-brand-dark/60 text-base font-black uppercase tracking-widest">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Circular Economy */}
      <section className="py-56 px-6 md:px-20 bg-brand-gray border-y border-brand-border mb-56">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[60px] overflow-hidden border border-brand-border p-6 bg-white shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Nature Conservation" 
                  className="w-full h-full object-cover rounded-[40px]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-12 -right-12 bg-emerald-500 p-16 rounded-[40px] shadow-2xl text-white">
                <Recycle size={64} className="mb-6" />
                <div className="text-3xl font-black tracking-tighter uppercase">{t("home.sustainability.circular")}</div>
                <div className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-black mt-3">Circular Economy</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <span className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[11px] mb-12 block">Sustainable Production</span>
              <h2 className="text-5xl md:text-8xl font-black mb-16 tracking-tighter leading-[0.9] text-brand-dark">{t("sustainability_page.management.title")}</h2>
              <p className="text-brand-dark/40 text-2xl font-light leading-relaxed mb-16 max-w-xl">
                {t("sustainability_page.management.desc")}
              </p>
              <div className="space-y-12">
                {[
                  { title: t("sustainability_page.management.item1_title"), desc: t("sustainability_page.management.item1_desc"), icon: <Wind size={32} /> },
                  { title: t("sustainability_page.management.item2_title"), desc: t("sustainability_page.management.item2_desc"), icon: <Droplets size={32} /> },
                  { title: t("sustainability_page.management.item3_title"), desc: t("sustainability_page.management.item3_desc"), icon: <Leaf size={32} /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-12 group">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-2xl mb-4 text-brand-dark tracking-tight">{item.title}</h4>
                      <p className="text-brand-dark/40 text-base font-medium leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 py-56">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative p-24 md:p-48 rounded-[60px] overflow-hidden bg-emerald-600 text-white text-center shadow-2xl"
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <Sun size={80} className="mx-auto mb-16" />
            <h2 className="text-5xl md:text-[9rem] font-black mb-16 tracking-tighter leading-[0.8]">{t("sustainability_page.vision.title")}</h2>
            <p className="text-white/80 text-2xl md:text-3xl font-light leading-relaxed mb-24">
              {t("sustainability_page.vision.desc")}
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              <Link to="/contact" className="px-16 py-6 bg-white text-emerald-600 rounded-full font-black hover:bg-emerald-50 transition-all shadow-2xl uppercase tracking-[0.3em] text-[11px]">
                {t("sustainability_page.vision.cta_join")}
              </Link>
              <Link to="/products" className="px-16 py-6 bg-emerald-700 text-white rounded-full font-black hover:bg-emerald-800 transition-all border border-emerald-500/30 uppercase tracking-[0.3em] text-[11px]">
                {t("sustainability_page.vision.cta_browse")}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
