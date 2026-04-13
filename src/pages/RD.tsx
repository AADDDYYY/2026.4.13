import { motion } from "motion/react";
import { Microscope, Zap, FlaskConical, Binary, ShieldCheck, Cpu, TestTube, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function RD() {
  const { t } = useTranslation();

  const rdStats = [
    { label: t("rd.stats.investment"), value: "15", unit: "%" },
    { label: t("rd.stats.patents"), value: "50", unit: "+" },
    { label: t("rd.stats.staff"), value: "50", unit: "+" },
    { label: t("rd.stats.partners"), value: "10", unit: "+" }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#050a14] min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-40 relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <span className="text-brand-blue font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block">R&D Innovation Center</span>
          <h1 className="text-6xl md:text-9xl font-bold mb-12 tracking-tighter">
            {t("rd.hero.title")}<span className="text-white/20 italic font-light">{t("rd.hero.subtitle")}</span>
          </h1>
          <p className="text-white/40 text-xl max-w-3xl mx-auto font-light leading-relaxed">
            {t("rd.hero.desc")}
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-[40px] overflow-hidden">
          {rdStats.map((stat, idx) => (
            <div key={idx} className="bg-white/[0.02] p-16 text-center hover:bg-white/[0.04] transition-colors group">
              <div className="text-5xl font-light mb-4 tracking-tighter group-hover:text-brand-blue transition-colors">
                {stat.value}<span className="text-sm ml-1 text-white/20">{stat.unit}</span>
              </div>
              <div className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Lab Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Research Infrastructure</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 tracking-tighter leading-tight">
              {t("rd.lab.title")}<br />
              <span className="text-white/20">{t("rd.lab.subtitle")}</span>
            </h2>
            <p className="text-white/40 text-lg mb-16 leading-relaxed font-light">
              {t("rd.lab.desc")}
            </p>
            
            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-2xl mb-3 text-white tracking-tight">{t("rd.lab.team")}</h4>
                  <p className="text-white/30 text-sm font-light leading-relaxed">{t("rd.lab.team_desc")}</p>
                </div>
              </div>
              
              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                  <Microscope size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-2xl mb-3 text-white tracking-tight">{t("rd.lab.center")}</h4>
                  <p className="text-white/30 text-sm font-light leading-relaxed">{t("rd.lab.center_desc")}</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                  <Binary size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-2xl mb-3 text-white tracking-tight">{t("rd.lab.custom")}</h4>
                  <p className="text-white/30 text-sm font-light leading-relaxed">{t("rd.lab.custom_desc")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 relative">
            <div className="absolute inset-0 bg-brand-blue/5 blur-[100px] -z-10"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="aspect-[3/4] rounded-[40px] overflow-hidden border border-white/5 p-3 bg-white/[0.02]">
                <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600" alt="Lab 1" className="w-full h-full object-cover rounded-[30px] grayscale" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8 rounded-[30px] bg-brand-blue text-white">
                <FlaskConical size={32} className="mb-4" />
                <div className="text-xl font-bold tracking-tight">{t("rd.lab.advanced")}</div>
                <div className="text-white/60 text-[10px] uppercase tracking-widest mt-2">Advanced Materials</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8 pt-16"
            >
              <div className="p-8 rounded-[30px] bg-white/[0.02] border border-white/5">
                <Zap size={32} className="text-brand-blue mb-4" />
                <div className="text-xl font-bold tracking-tight">{t("rd.lab.rapid")}</div>
                <div className="text-white/20 text-[10px] uppercase tracking-widest mt-2">Rapid Application</div>
              </div>
              <div className="aspect-[3/4] rounded-[40px] overflow-hidden border border-white/5 p-3 bg-white/[0.02]">
                <img src="https://images.unsplash.com/photo-1581093588401-22d3c9f5b9c5?auto=format&fit=crop&q=80&w=600" alt="Lab 2" className="w-full h-full object-cover rounded-[30px] grayscale" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities & Testing */}
      <section className="py-40 px-6 md:px-12 bg-[#020617] border-y border-white/5 mb-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: t("rd.testing.chemical"), desc: t("rd.testing.chemical_desc"), icon: <ShieldCheck size={24} /> },
                  { title: t("rd.testing.aging"), desc: t("rd.testing.aging_desc"), icon: <Cpu size={24} /> },
                  { title: t("rd.testing.mechanical"), desc: t("rd.testing.mechanical_desc"), icon: <TestTube size={24} /> },
                  { title: t("rd.testing.simulation"), desc: t("rd.testing.simulation_desc"), icon: <FlaskConical size={24} /> }
                ].map((item, idx) => (
                  <div key={idx} className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-brand-blue/30 transition-all group">
                    <div className="text-brand-blue mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h4 className="text-white font-bold mb-2">{item.title}</h4>
                    <p className="text-white/20 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Quality Assurance</span>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-10 tracking-tighter leading-tight">
                {t("rd.testing.title")}<br />
                <span className="text-white/20">{t("rd.testing.subtitle")}</span>
              </h2>
              <p className="text-white/40 text-lg mb-12 font-light leading-relaxed">
                {t("rd.testing.desc")}
              </p>
              <div className="flex items-center gap-6 p-8 rounded-3xl bg-brand-blue/5 border border-brand-blue/10">
                <div className="text-4xl font-bold text-brand-blue tracking-tighter">CNAS</div>
                <div className="text-white/40 text-xs leading-relaxed border-l border-white/10 pl-6">
                  {t("rd.testing.cnas")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Philosophy */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-40">
        <div className="bg-white/[0.01] border border-white/5 rounded-[60px] p-16 lg:p-32 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px]"></div>
          <div className="relative z-10">
            <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Our Philosophy</span>
            <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter">{t("rd.philosophy.title")}<br /><span className="text-white/20">{t("rd.philosophy.subtitle")}</span></h2>
            <p className="text-white/40 text-xl max-w-4xl mx-auto font-light leading-relaxed">
              {t("rd.philosophy.desc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
