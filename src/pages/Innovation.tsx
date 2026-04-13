import { motion } from "motion/react";
import { Beaker, ShieldCheck, Globe, Users, Cpu, Award, Zap, Microscope, Binary, Network } from "lucide-react";
import { useTranslation } from "react-i18next";

const RDPhilosophy = () => {
  const { t } = useTranslation();
  return (
    <section className="py-40 px-6 md:px-12 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/5 blur-[120px] rounded-full -translate-y-1/2"></div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">R&D Philosophy</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 tracking-tighter leading-tight">
              {t("innovation_page.philosophy.title")}<br />
              <span className="text-white/20">{t("innovation_page.philosophy.subtitle")}</span>
            </h2>
            <div className="space-y-12">
              <div className="flex gap-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20">
                  <Microscope size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-4">{t("innovation_page.philosophy.item1_title")}</h4>
                  <p className="text-white/40 font-light leading-relaxed">{t("innovation_page.philosophy.item1_desc")}</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20">
                  <Network size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-4">{t("innovation_page.philosophy.item2_title")}</h4>
                  <p className="text-white/40 font-light leading-relaxed">{t("innovation_page.philosophy.item2_desc")}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="relative">
            <div className="aspect-square rounded-[40px] overflow-hidden border border-white/5 p-4 bg-white/[0.02]">
              <img 
                src="https://images.unsplash.com/photo-1532187875605-2fe35851142b?auto=format&fit=crop&q=80&w=1000" 
                alt="Lab" 
                className="w-full h-full object-cover grayscale rounded-[32px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-brand-blue p-12 rounded-[32px] shadow-2xl">
              <div className="text-5xl font-bold text-white mb-2 tracking-tighter">100%</div>
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{t("innovation_page.philosophy.badge")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Innovation() {
  const { t } = useTranslation();

  const innovations = [
    {
      title: t("innovation_page.technologies.items.self_matting.title"),
      en: "Waterborne Self-Matting Patent",
      desc: t("innovation_page.technologies.items.self_matting.desc"),
      icon: <Cpu className="text-brand-blue" size={32} />,
      tags: t("innovation_page.technologies.items.self_matting.tags", { returnObjects: true }) as string[]
    },
    {
      title: t("innovation_page.technologies.items.uv.title"),
      en: "Multi-functional Waterborne UV",
      desc: t("innovation_page.technologies.items.uv.desc"),
      icon: <Zap className="text-brand-blue" size={32} />,
      tags: t("innovation_page.technologies.items.uv.tags", { returnObjects: true }) as string[]
    },
    {
      title: t("innovation_page.technologies.items.pud.title"),
      en: "Aliphatic Soft-Touch PUD",
      desc: t("innovation_page.technologies.items.pud.desc"),
      icon: <Beaker className="text-brand-blue" size={32} />,
      tags: t("innovation_page.technologies.items.pud.tags", { returnObjects: true }) as string[]
    },
    {
      title: t("innovation_page.technologies.items.anti_fingerprint.title"),
      en: "Nano-Hybrid Anti-Fingerprint",
      desc: t("innovation_page.technologies.items.anti_fingerprint.desc"),
      icon: <Binary className="text-brand-blue" size={32} />,
      tags: t("innovation_page.technologies.items.anti_fingerprint.tags", { returnObjects: true }) as string[]
    }
  ];

  const stats = [
    { label: t("innovation_page.center.stats.capacity"), value: "60,000+", unit: "吨" },
    { label: t("innovation_page.center.stats.area"), value: "37,000", unit: "m²" },
    { label: t("innovation_page.center.stats.patents"), value: "50+", unit: "项" },
    { label: t("innovation_page.center.stats.experts"), value: "15+", unit: "人" }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#050a14] min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-40 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px] -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="text-brand-blue font-bold uppercase tracking-[0.5em] text-[10px] bg-brand-blue/10 px-4 py-1.5 rounded-full border border-brand-blue/20">
              Innovation & Technology
            </span>
          </div>
          <h1 className="text-7xl md:text-[10rem] font-bold mb-12 tracking-tighter leading-[0.85]">
            {t("innovation_page.hero.title")}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-white/10">{t("innovation_page.hero.subtitle")}</span>
          </h1>
          <p className="text-white/40 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
            {t("innovation_page.hero.desc")}
          </p>
        </motion.div>
      </div>

      <RDPhilosophy />

      {/* Innovation Grid */}
      <section className="py-40 px-6 md:px-12 bg-[#050a14] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-32">
            <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Core Technologies</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">{t("innovation_page.technologies.title")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {innovations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-16 rounded-[40px] border border-white/5 bg-white/[0.01] hover:border-brand-blue/30 transition-all duration-700 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                  {item.icon}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-10 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-brand-blue text-[10px] uppercase tracking-[0.2em] mb-8 font-bold opacity-60">{item.en}</p>
                  <p className="text-white/40 leading-relaxed font-light mb-10 text-lg">{item.desc}</p>
                  <div className="flex flex-wrap gap-3">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Center Section */}
      <section className="py-40 px-6 md:px-12 bg-[#020617] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="group">
                    <div className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-3 group-hover:translate-x-1 transition-transform">{stat.label}</div>
                    <div className="text-5xl font-light text-white tracking-tighter mb-1">
                      {stat.value}<span className="text-sm font-light ml-2 text-white/20">{stat.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-20 p-10 rounded-3xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-6 mb-6">
                  <Users size={32} className="text-brand-blue" />
                  <h4 className="text-xl font-bold">{t("innovation_page.center.team_title")}</h4>
                </div>
                <p className="text-white/40 font-light leading-relaxed">
                  {t("innovation_page.center.team_desc")}
                </p>
              </div>
            </motion.div>

            <div className="order-1 lg:order-2">
              <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Guangzhou R&D Center</span>
              <h2 className="text-5xl md:text-6xl font-bold mb-10 tracking-tighter leading-tight">{t("innovation_page.center.title")}</h2>
              <p className="text-white/40 text-lg font-light leading-relaxed mb-12">
                {t("innovation_page.center.desc")}
              </p>
              <div className="aspect-video rounded-[40px] overflow-hidden border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
                  alt="R&D Center" 
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center py-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-24 rounded-[60px] overflow-hidden bg-brand-blue"
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <Award size={64} className="mx-auto mb-12 text-white" />
            <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter">{t("innovation_page.vision.title")}</h2>
            <p className="text-white/80 text-xl font-light leading-relaxed mb-16">
              {t("innovation_page.vision.desc")}
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-4 px-8 py-4 bg-white/10 rounded-full backdrop-blur-md border border-white/20">
                <ShieldCheck size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">{t("innovation_page.vision.badge1")}</span>
              </div>
              <div className="flex items-center gap-4 px-8 py-4 bg-white/10 rounded-full backdrop-blur-md border border-white/20">
                <Globe size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">{t("innovation_page.vision.badge2")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
