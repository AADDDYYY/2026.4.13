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
    <div className="pt-32 pb-24 bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-40 relative">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[200px] -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-brand-blue"></div>
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px]">
              R&D Innovation Center
            </span>
            <div className="h-px w-12 bg-brand-blue"></div>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-12 tracking-tight leading-tight">
            {t("rd.hero.title")}<br />
            <span className="text-brand-dark/30">{t("rd.hero.subtitle")}</span>
          </h1>
          <p className="text-brand-dark/60 text-xl md:text-2xl max-w-4xl mx-auto font-light leading-relaxed">
            {t("rd.hero.desc")}
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-brand-border border border-brand-border rounded-[40px] overflow-hidden shadow-sm">
          {rdStats.map((stat, idx) => (
            <div key={idx} className="bg-brand-gray p-16 text-center hover:bg-white transition-all duration-700 group">
              <div className="text-6xl font-black mb-4 tracking-tight group-hover:text-brand-blue transition-colors text-brand-dark">
                {stat.value}<span className="text-xl ml-2 text-brand-dark/20">{stat.unit}</span>
              </div>
              <div className="text-brand-dark/30 text-[11px] font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Lab Section */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[11px] mb-12 block">Research Infrastructure</span>
            <h2 className="text-5xl md:text-8xl font-black text-brand-dark mb-16 tracking-tight leading-tight">
              {t("rd.lab.title")}<br />
              <span className="text-brand-dark/30">{t("rd.lab.subtitle")}</span>
            </h2>
            <p className="text-brand-dark/60 text-xl mb-16 font-light leading-relaxed">
              {t("rd.lab.desc")}
            </p>
            
            <div className="space-y-12">
              <div className="flex gap-12 group">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h4 className="font-black text-2xl mb-4 text-brand-dark tracking-tight">{t("rd.lab.team")}</h4>
                  <p className="text-brand-dark/50 text-base font-bold leading-relaxed max-w-md">{t("rd.lab.team_desc")}</p>
                </div>
              </div>
              
              <div className="flex gap-12 group">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <Microscope size={32} />
                </div>
                <div>
                  <h4 className="font-black text-2xl mb-4 text-brand-dark tracking-tight">{t("rd.lab.center")}</h4>
                  <p className="text-brand-dark/50 text-base font-bold leading-relaxed max-w-md">{t("rd.lab.center_desc")}</p>
                </div>
              </div>

              <div className="flex gap-12 group">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <Binary size={32} />
                </div>
                <div>
                  <h4 className="font-black text-2xl mb-4 text-brand-dark tracking-tight">{t("rd.lab.custom")}</h4>
                  <p className="text-brand-dark/50 text-base font-bold leading-relaxed max-w-md">{t("rd.lab.custom_desc")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 relative lg:col-span-6">
            <div className="absolute inset-0 bg-brand-blue/5 blur-[100px] -z-10"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="aspect-[3/4] rounded-[40px] overflow-hidden border border-brand-border p-3 bg-brand-gray shadow-sm">
                <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600" alt="Lab 1" className="w-full h-full object-cover rounded-[30px]" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8 rounded-[30px] bg-brand-blue text-white shadow-xl shadow-brand-blue/20">
                <FlaskConical size={32} className="mb-4" />
                <div className="text-xl font-black tracking-tight">{t("rd.lab.advanced")}</div>
                <div className="text-white/60 text-[10px] uppercase tracking-widest mt-2 font-bold">Advanced Materials</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8 pt-16"
            >
              <div className="p-8 rounded-[30px] bg-brand-gray border border-brand-border shadow-sm">
                <Zap size={32} className="text-brand-blue mb-4" />
                <div className="text-xl font-black tracking-tight text-brand-dark">{t("rd.lab.rapid")}</div>
                <div className="text-brand-dark/30 text-[10px] uppercase tracking-widest mt-2 font-bold">Rapid Application</div>
              </div>
              <div className="aspect-[3/4] rounded-[40px] overflow-hidden border border-brand-border p-3 bg-brand-gray shadow-sm">
                <img src="https://images.unsplash.com/photo-1581093588401-22d3c9f5b9c5?auto=format&fit=crop&q=80&w=600" alt="Lab 2" className="w-full h-full object-cover rounded-[30px]" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities & Testing */}
      <section className="py-32 px-6 md:px-12 bg-brand-gray border-y border-brand-border mb-40">
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
                  <div key={idx} className="p-8 rounded-3xl bg-white border border-brand-border hover:border-brand-blue/30 transition-all group shadow-sm">
                    <div className="text-brand-blue mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h4 className="text-brand-dark font-black mb-2">{item.title}</h4>
                    <p className="text-brand-dark/40 text-xs leading-relaxed font-bold">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-brand-blue font-bold uppercase tracking-widest text-[11px] mb-8 block">Quality Assurance</span>
              <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-10 tracking-tight leading-tight">
                {t("rd.testing.title")}<br />
                <span className="text-brand-dark/30">{t("rd.testing.subtitle")}</span>
              </h2>
              <p className="text-brand-dark/60 text-lg mb-12 font-medium leading-relaxed">
                {t("rd.testing.desc")}
              </p>
              <div className="flex items-center gap-6 p-8 rounded-3xl bg-white border border-brand-border shadow-sm">
                <div className="text-4xl font-black text-brand-blue tracking-tighter">CNAS</div>
                <div className="text-brand-dark/40 text-xs leading-relaxed border-l border-brand-border pl-6 font-bold">
                  {t("rd.testing.cnas")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Philosophy */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-40">
        <div className="bg-brand-gray border border-brand-border rounded-[60px] p-16 lg:p-32 text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px]"></div>
          <div className="relative z-10">
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[11px] mb-8 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-7xl font-black mb-12 tracking-tight text-brand-dark">{t("rd.philosophy.title")}<br /><span className="text-brand-dark/30">{t("rd.philosophy.subtitle")}</span></h2>
            <p className="text-brand-dark/50 text-xl max-w-4xl mx-auto font-bold leading-relaxed">
              {t("rd.philosophy.desc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
