import { motion } from "motion/react";
import { Beaker, ShieldCheck, Globe, Users, Cpu, Award, Zap, Microscope, Binary, Network } from "lucide-react";
import { useTranslation } from "react-i18next";

const RDPhilosophy = () => {
  const { t } = useTranslation();
  return (
    <section className="py-60 px-6 md:px-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/5 blur-[200px] rounded-full -translate-y-1/2"></div>
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[11px] mb-12 block">R&D Philosophy</span>
            <h2 className="text-5xl md:text-8xl font-black text-brand-dark mb-16 tracking-tight leading-tight">
              {t("innovation_page.philosophy.title")}<br />
              <span className="text-brand-dark/30">{t("innovation_page.philosophy.subtitle")}</span>
            </h2>
            <div className="space-y-16">
              <div className="flex gap-12 group">
                <div className="w-20 h-20 rounded-3xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <Microscope size={32} />
                </div>
                <div>
                  <h4 className="text-brand-dark font-black text-3xl mb-4">{t("innovation_page.philosophy.item1_title")}</h4>
                  <p className="text-brand-dark/50 font-bold leading-relaxed text-lg max-w-md">{t("innovation_page.philosophy.item1_desc")}</p>
                </div>
              </div>
              <div className="flex gap-12 group">
                <div className="w-20 h-20 rounded-3xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <Network size={32} />
                </div>
                <div>
                  <h4 className="text-brand-dark font-black text-3xl mb-4">{t("innovation_page.philosophy.item2_title")}</h4>
                  <p className="text-brand-dark/50 font-bold leading-relaxed text-lg max-w-md">{t("innovation_page.philosophy.item2_desc")}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden border border-brand-border p-6 bg-brand-gray backdrop-blur-sm shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1532187875605-2fe35851142b?auto=format&fit=crop&q=80&w=1000" 
                alt="Lab" 
                className="w-full h-full object-cover rounded-[40px] transition-opacity duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 bg-brand-blue p-16 rounded-[40px] shadow-2xl shadow-brand-blue/20">
              <div className="text-7xl font-black text-white mb-4 tracking-tighter">100%</div>
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
    <div className="pt-32 pb-24 bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-40 relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[200px] -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-brand-blue"></div>
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px]">
              Innovation & Technology
            </span>
            <div className="h-px w-12 bg-brand-blue"></div>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-12 tracking-tight leading-tight">
            {t("innovation_page.hero.title")}<br />
            <span className="text-brand-blue">{t("innovation_page.hero.subtitle")}</span>
          </h1>
          <p className="text-brand-dark/60 text-xl md:text-2xl max-w-4xl mx-auto font-light leading-relaxed">
            {t("innovation_page.hero.desc")}
          </p>
        </motion.div>
      </div>

      <RDPhilosophy />

      {/* Innovation Grid */}
      <section className="py-32 px-6 md:px-20 bg-brand-gray">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-24">
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px] mb-6 block">Core Technologies</span>
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tight">{t("innovation_page.technologies.title")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {innovations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-12 rounded-3xl border border-brand-border bg-white hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-8 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold mb-4 text-brand-dark">{item.title}</h3>
                <p className="text-brand-blue text-[11px] uppercase tracking-widest mb-6 font-bold">{item.en}</p>
                <p className="text-brand-dark/60 leading-relaxed mb-8 text-lg">{item.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full bg-brand-gray border border-brand-border text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Center Section */}
      <section className="py-32 px-6 md:px-20 bg-white">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-12">
                {stats.map((stat, idx) => (
                  <div key={idx} className="group">
                    <div className="text-[12px] font-bold text-brand-blue uppercase tracking-widest mb-3">{stat.label}</div>
                    <div className="text-5xl font-black text-brand-dark tracking-tight mb-1">
                      {stat.value}<span className="text-sm font-bold ml-2 text-brand-dark/20">{stat.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-16 p-10 rounded-3xl bg-brand-gray border border-brand-border">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center text-white">
                    <Users size={24} />
                  </div>
                  <h4 className="text-2xl font-bold text-brand-dark">{t("innovation_page.center.team_title")}</h4>
                </div>
                <p className="text-brand-dark/60 leading-relaxed text-lg">
                  {t("innovation_page.center.team_desc")}
                </p>
              </div>
            </motion.div>

            <div className="order-1 lg:order-2">
              <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px] mb-6 block">Guangzhou R&D Center</span>
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight leading-tight text-brand-dark">{t("innovation_page.center.title")}</h2>
              <p className="text-brand-dark/60 text-xl font-light leading-relaxed mb-12">
                {t("innovation_page.center.desc")}
              </p>
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
                  alt="R&D Center" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-20 md:p-32 rounded-[40px] overflow-hidden bg-brand-blue text-white text-center"
        >
          <div className="relative z-10 max-w-4xl mx-auto">
            <Award size={64} className="mx-auto mb-12" />
            <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tight">{t("innovation_page.vision.title")}</h2>
            <p className="text-white/80 text-xl md:text-2xl font-light leading-relaxed mb-16">
              {t("innovation_page.vision.desc")}
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-4 px-8 py-4 bg-white/10 rounded-full border border-white/20">
                <ShieldCheck size={24} />
                <span className="text-sm font-bold uppercase tracking-widest">{t("innovation_page.vision.badge1")}</span>
              </div>
              <div className="flex items-center gap-4 px-8 py-4 bg-white/10 rounded-full border border-white/20">
                <Globe size={24} />
                <span className="text-sm font-bold uppercase tracking-widest">{t("innovation_page.vision.badge2")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
