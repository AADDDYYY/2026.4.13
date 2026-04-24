import { motion } from "motion/react";
import { Beaker, ShieldCheck, Globe, Users, Cpu, Award, Zap, Microscope, Binary, Network } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCMSAsset } from "../hooks/useCMSAsset";

const RDPhilosophy = () => {
  const { t } = useTranslation();
  const { value: labImage } = useCMSAsset('innovation_lab_img', 'https://images.unsplash.com/photo-1532187875605-2fe35851142b?auto=format&fit=crop&q=80&w=1000');

  return (
    <section className="py-60 px-6 md:px-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/5 blur-[250px] rounded-full -translate-y-1/2"></div>
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-6"
          >
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px] mb-12 block">R&D Philosophy</span>
            <h2 className="text-5xl md:text-8xl font-black text-brand-dark mb-16 tracking-tighter leading-[0.9]">
              {t("innovation_page.philosophy.title")}<br />
              <span className="text-brand-dark/30">{t("innovation_page.philosophy.subtitle")}</span>
            </h2>
            <div className="space-y-16">
              <div className="flex gap-12 group">
                <div className="w-20 h-20 rounded-3xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <Microscope size={32} />
                </div>
                <div>
                  <h4 className="text-brand-dark font-black text-3xl mb-4 tracking-tight">{t("innovation_page.philosophy.item1_title")}</h4>
                  <p className="text-brand-dark/40 font-medium leading-relaxed text-xl max-w-md">{t("innovation_page.philosophy.item1_desc")}</p>
                </div>
              </div>
              <div className="flex gap-12 group">
                <div className="w-20 h-20 rounded-3xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <Network size={32} />
                </div>
                <div>
                  <h4 className="text-brand-dark font-black text-3xl mb-4 tracking-tight">{t("innovation_page.philosophy.item2_title")}</h4>
                  <p className="text-brand-dark/40 font-medium leading-relaxed text-xl max-w-md">{t("innovation_page.philosophy.item2_desc")}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden border border-brand-border p-6 bg-brand-gray backdrop-blur-sm shadow-2xl">
              <img 
                src={labImage} 
                alt="Lab" 
                className="w-full h-full object-cover rounded-[40px] transition-opacity duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-16 -left-16 bg-brand-blue p-20 rounded-[40px] shadow-2xl shadow-brand-blue/20">
              <div className="text-8xl font-black text-white mb-4 tracking-tighter">100%</div>
              <div className="text-[11px] font-black text-white/60 uppercase tracking-[0.3em]">{t("innovation_page.philosophy.badge")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Innovation() {
  const { t } = useTranslation();

  const { value: innovationHeroBg } = useCMSAsset('innovation_hero_bg', 'https://images.unsplash.com/photo-1542382156909-9ae38d3884c1?auto=format&fit=crop&q=80&w=1600');

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
    <div className="pt-24 md:pt-48 pb-16 md:pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-24 md:mb-56 relative">
        {innovationHeroBg ? (
          <div className="absolute inset-0 -z-10 rounded-b-[100px] overflow-hidden">
            <img src={innovationHeroBg} alt="Innovation Hero" className="w-full h-full object-cover img-enhance object-right" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>
        ) : (
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-blue/5 rounded-full blur-[250px] -z-10"></div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-8 md:mb-16">
            <div className="h-px w-12 md:w-16 bg-brand-blue"></div>
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[10px] md:text-[11px]">
              Innovation & Technology
            </span>
            <div className="h-px w-12 md:w-16 bg-brand-blue"></div>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[10rem] font-black mb-8 md:mb-16 tracking-tight leading-[0.85]">
            {t("innovation_page.hero.title")}<br />
            <span className="text-brand-blue sm:text-[0.6em] md:text-[0.4em] lg:text-[0.3em] tracking-normal">Innovation & Technology</span>
          </h1>
          <p className="text-brand-dark/40 text-lg sm:text-2xl md:text-4xl max-w-5xl mx-auto font-light leading-relaxed">
            {t("innovation_page.hero.desc")}
          </p>
        </motion.div>
      </div>

      <RDPhilosophy />

      {/* Innovation Grid */}
      <section className="py-56 px-6 md:px-20 bg-brand-gray border-y border-brand-border mb-56">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-32">
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px] mb-8 block">Core Technologies</span>
            <h2 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter leading-[0.9]">{t("innovation_page.technologies.title")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {innovations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 1 }}
                className="p-16 rounded-[50px] border border-brand-border bg-white hover:border-brand-blue/30 shadow-sm hover:shadow-2xl transition-all duration-700 group"
              >
                <div className="w-20 h-20 rounded-3xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-12 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-4xl font-black mb-6 text-brand-dark tracking-tight">{item.title}</h3>
                <p className="text-brand-blue text-[11px] font-black uppercase tracking-[0.3em] mb-8">{item.en}</p>
                <p className="text-brand-dark/40 leading-relaxed mb-12 text-xl font-medium">{item.desc}</p>
                <div className="flex flex-wrap gap-4">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-6 py-2 rounded-full bg-brand-gray border border-brand-border text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/40">
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
      <section className="py-56 px-6 md:px-20 bg-white mb-56">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-16">
                {stats.map((stat, idx) => (
                  <div key={idx} className="group">
                    <div className="text-[11px] font-black text-brand-blue uppercase tracking-[0.3em] mb-6">{stat.label}</div>
                    <div className="text-5xl md:text-6xl font-black text-brand-dark tracking-tighter mb-2 flex items-baseline gap-2">
                      {stat.value}<span className="text-lg font-black text-brand-dark/20 uppercase tracking-widest">{stat.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-24 p-16 rounded-[50px] bg-brand-gray border border-brand-border shadow-2xl">
                <div className="flex items-center gap-8 mb-10">
                  <div className="w-16 h-16 rounded-3xl bg-brand-blue flex items-center justify-center text-white shadow-xl shadow-brand-blue/20">
                    <Users size={32} />
                  </div>
                  <h4 className="text-3xl font-black text-brand-dark tracking-tight">{t("innovation_page.center.team_title")}</h4>
                </div>
                <p className="text-brand-dark/40 leading-relaxed text-xl font-medium">
                  {t("innovation_page.center.team_desc")}
                </p>
              </div>
            </motion.div>

            <div className="order-1 lg:order-2">
              <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px] mb-12 block">Guangzhou R&D Center</span>
              <h2 className="text-5xl md:text-8xl font-black mb-16 tracking-tighter leading-[0.9] text-brand-dark">{t("innovation_page.center.title")}</h2>
              <p className="text-brand-dark/40 text-2xl font-light leading-relaxed mb-16 max-w-xl">
                {t("innovation_page.center.desc")}
              </p>
              <div className="aspect-video rounded-[60px] overflow-hidden shadow-2xl">
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
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 py-56">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative p-24 md:p-48 rounded-[60px] overflow-hidden bg-brand-blue text-white text-center shadow-2xl"
        >
          <div className="relative z-10 max-w-5xl mx-auto">
            <Award size={80} className="mx-auto mb-16" />
            <h2 className="text-5xl md:text-[9rem] font-black mb-16 tracking-tighter leading-[0.8]">{t("innovation_page.vision.title")}</h2>
            <p className="text-white/80 text-2xl md:text-3xl font-light leading-relaxed mb-24">
              {t("innovation_page.vision.desc")}
            </p>
            <div className="flex flex-wrap justify-center gap-12">
              <div className="flex items-center gap-6 px-12 py-6 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                <ShieldCheck size={32} />
                <span className="text-sm font-black uppercase tracking-[0.3em]">{t("innovation_page.vision.badge1")}</span>
              </div>
              <div className="flex items-center gap-6 px-12 py-6 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                <Globe size={32} />
                <span className="text-sm font-black uppercase tracking-[0.3em]">{t("innovation_page.vision.badge2")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
