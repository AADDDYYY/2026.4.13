import { motion } from "motion/react";
import { Leaf, Wind, Droplets, Sun, Globe, ShieldCheck, Recycle, Zap, ArrowRight, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Sustainability() {
  const { t } = useTranslation();

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

  const sustainabilityStats = [
    { label: t("sustainability_page.stats.voc"), value: "30,000+", unit: t("sustainability_page.stats.unit_tons") },
    { label: t("sustainability_page.stats.energy"), value: "40", unit: "%" },
    { label: t("sustainability_page.stats.investment"), value: "15", unit: "%" },
    { label: t("sustainability_page.stats.base"), value: "100", unit: "%" }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#050a14] min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-40 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="text-emerald-500 font-bold uppercase tracking-[0.5em] text-[10px] bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              Sustainability & ESG
            </span>
          </div>
          <h1 className="text-7xl md:text-[10rem] font-bold mb-12 tracking-tighter leading-[0.85]">
            {t("sustainability_page.hero.title")}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-white/10">{t("sustainability_page.hero.subtitle")}</span>
          </h1>
          <p className="text-white/40 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
            {t("sustainability_page.hero.desc")}
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {sustainabilityStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-4">{stat.label}</div>
                <div className="text-5xl font-light text-white tracking-tighter">
                  {stat.value}<span className="text-sm font-light ml-2 text-white/20">{stat.unit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Framework */}
      <section className="py-40 px-6 md:px-12 bg-[#020617]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32">
            <span className="text-emerald-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Our Commitment</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">{t("sustainability_page.esg.title")}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {esgGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-16 rounded-[40px] border border-white/5 bg-white/[0.01] hover:border-emerald-500/30 transition-all duration-700 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-10 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                  {goal.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2 tracking-tight">{goal.title}</h3>
                <p className="text-emerald-500 text-[10px] uppercase tracking-[0.2em] mb-8 font-bold opacity-60">{goal.en}</p>
                <p className="text-white/40 leading-relaxed font-light mb-12 text-lg">{goal.desc}</p>
                <ul className="space-y-4">
                  {goal.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/60 text-sm font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
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
      <section className="py-40 px-6 md:px-12 bg-[#050a14] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[60px] overflow-hidden border border-white/5 p-4 bg-white/[0.02]">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Nature Conservation" 
                  className="w-full h-full object-cover grayscale rounded-[44px]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -right-10 bg-emerald-500 p-12 rounded-[40px] shadow-2xl">
                <Recycle size={48} className="text-white mb-4" />
                <div className="text-2xl font-bold text-white tracking-tight">{t("home.sustainability.circular")}</div>
                <div className="text-white/60 text-xs uppercase tracking-widest font-bold mt-2">Circular Economy</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-emerald-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Sustainable Production</span>
              <h2 className="text-5xl md:text-6xl font-bold mb-10 tracking-tighter leading-tight">{t("sustainability_page.management.title")}</h2>
              <p className="text-white/40 text-lg font-light leading-relaxed mb-12">
                {t("sustainability_page.management.desc")}
              </p>
              <div className="space-y-8">
                {[
                  { title: t("sustainability_page.management.item1_title"), desc: t("sustainability_page.management.item1_desc"), icon: <Wind size={24} /> },
                  { title: t("sustainability_page.management.item2_title"), desc: t("sustainability_page.management.item2_desc"), icon: <Droplets size={24} /> },
                  { title: t("sustainability_page.management.item3_title"), desc: t("sustainability_page.management.item3_desc"), icon: <Leaf size={24} /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white tracking-tight">{item.title}</h4>
                      <p className="text-white/30 text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center py-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-24 rounded-[60px] overflow-hidden bg-emerald-600"
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <Sun size={64} className="mx-auto mb-12 text-white" />
            <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter">{t("sustainability_page.vision.title")}</h2>
            <p className="text-white/80 text-xl font-light leading-relaxed mb-16">
              {t("sustainability_page.vision.desc")}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact" className="px-12 py-5 bg-white text-emerald-600 rounded-full font-bold hover:bg-emerald-50 transition-all shadow-xl">
                {t("sustainability_page.vision.cta_join")}
              </Link>
              <Link to="/products" className="px-12 py-5 bg-emerald-700 text-white rounded-full font-bold hover:bg-emerald-800 transition-all border border-emerald-500/30">
                {t("sustainability_page.vision.cta_browse")}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
