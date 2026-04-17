import { motion } from "motion/react";
import { Microscope, Zap, FlaskConical, Binary, ShieldCheck, Cpu, TestTube, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCMSAsset } from "../hooks/useCMSAsset";

export default function RD() {
  const { t } = useTranslation();

  const { value: rdHeroBg } = useCMSAsset('rd_hero_bg', '');
  const { value: rdLabImg1 } = useCMSAsset('rd_lab_img1', 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600');
  const { value: rdLabImg2 } = useCMSAsset('rd_lab_img2', 'https://images.unsplash.com/photo-1581093588401-22d3c9f5b9c5?auto=format&fit=crop&q=80&w=600');

  const rdStats = [
    { label: t("rd.stats.investment"), value: "15", unit: "%" },
    { label: t("rd.stats.patents"), value: "50", unit: "+" },
    { label: t("rd.stats.staff"), value: "50", unit: "+" },
    { label: t("rd.stats.partners"), value: "10", unit: "+" }
  ];

  return (
    <div className="pt-48 pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56 relative">
        {rdHeroBg ? (
          <div className="absolute inset-0 -z-10 rounded-b-[100px] overflow-hidden opacity-20">
            <img src={rdHeroBg} alt="R&D Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        ) : (
          <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-brand-blue/5 rounded-full blur-[250px] -z-10"></div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-16">
            <div className="h-px w-16 bg-brand-blue"></div>
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px]">
              R&D Innovation Center
            </span>
            <div className="h-px w-16 bg-brand-blue"></div>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black mb-16 tracking-tighter leading-[0.85]">
            {t("rd.hero.title")}<br />
            <span className="text-brand-blue">R&D Innovation Center</span>
          </h1>
          <p className="text-brand-dark/40 text-2xl md:text-4xl max-w-5xl mx-auto font-light leading-relaxed">
            {t("rd.hero.desc")}
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-brand-border border border-brand-border rounded-[60px] overflow-hidden shadow-2xl">
          {rdStats.map((stat, idx) => (
            <div key={idx} className="bg-brand-gray p-12 lg:p-20 text-center hover:bg-white transition-all duration-700 group">
              <div className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter group-hover:text-brand-blue transition-colors text-brand-dark flex items-baseline justify-center gap-2">
                {stat.value}<span className="text-xl text-brand-dark/20 uppercase tracking-widest font-black">{stat.unit}</span>
              </div>
              <div className="text-brand-dark/30 text-[11px] font-black uppercase tracking-[0.3em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Lab Section */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-6"
          >
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px] mb-12 block">Research Infrastructure</span>
            <h2 className="text-5xl md:text-8xl font-black text-brand-dark mb-16 tracking-tighter leading-[0.9]">
              {t("rd.lab.title")}<br />
              <span className="text-brand-dark/30">{t("rd.lab.subtitle")}</span>
            </h2>
            <p className="text-brand-dark/40 text-2xl mb-16 font-light leading-relaxed max-w-2xl">
              {t("rd.lab.desc")}
            </p>
            
            <div className="space-y-12">
              <div className="flex gap-12 group">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h4 className="font-black text-2xl mb-4 text-brand-dark tracking-tight">{t("rd.lab.team")}</h4>
                  <p className="text-brand-dark/40 text-base font-medium leading-relaxed max-w-md">{t("rd.lab.team_desc")}</p>
                </div>
              </div>
              
              <div className="flex gap-12 group">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <Microscope size={32} />
                </div>
                <div>
                  <h4 className="font-black text-2xl mb-4 text-brand-dark tracking-tight">{t("rd.lab.center")}</h4>
                  <p className="text-brand-dark/40 text-base font-medium leading-relaxed max-w-md">{t("rd.lab.center_desc")}</p>
                </div>
              </div>

              <div className="flex gap-12 group">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <Binary size={32} />
                </div>
                <div>
                  <h4 className="font-black text-2xl mb-4 text-brand-dark tracking-tight">{t("rd.lab.custom")}</h4>
                  <p className="text-brand-dark/40 text-base font-medium leading-relaxed max-w-md">{t("rd.lab.custom_desc")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-12 relative lg:col-span-6">
            <div className="absolute inset-0 bg-brand-blue/5 blur-[120px] -z-10"></div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="aspect-[3/4] rounded-[60px] overflow-hidden border border-brand-border p-4 bg-brand-gray shadow-2xl">
                <img src={rdLabImg1} alt="Lab 1" className="w-full h-full object-cover rounded-[40px]" referrerPolicy="no-referrer" />
              </div>
              <div className="p-12 rounded-[40px] bg-brand-blue text-white shadow-2xl shadow-brand-blue/20">
                <FlaskConical size={48} className="mb-6" />
                <div className="text-2xl font-black tracking-tighter uppercase">{t("rd.lab.advanced")}</div>
                <div className="text-white/60 text-[10px] uppercase tracking-[0.3em] mt-3 font-black">Advanced Materials</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1.2 }}
              className="space-y-12 pt-24"
            >
              <div className="p-12 rounded-[40px] bg-brand-gray border border-brand-border shadow-2xl">
                <Zap size={48} className="text-brand-blue mb-6" />
                <div className="text-2xl font-black tracking-tighter text-brand-dark uppercase">{t("rd.lab.rapid")}</div>
                <div className="text-brand-dark/30 text-[10px] uppercase tracking-[0.3em] mt-3 font-black">Rapid Application</div>
              </div>
              <div className="aspect-[3/4] rounded-[60px] overflow-hidden border border-brand-border p-4 bg-brand-gray shadow-2xl">
                <img src={rdLabImg2} alt="Lab 2" className="w-full h-full object-cover rounded-[40px]" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities & Testing */}
      <section className="py-56 px-6 md:px-20 bg-brand-gray border-y border-brand-border mb-56">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-12">
                {[
                  { title: t("rd.testing.chemical"), desc: t("rd.testing.chemical_desc"), icon: <ShieldCheck size={32} /> },
                  { title: t("rd.testing.aging"), desc: t("rd.testing.aging_desc"), icon: <Cpu size={32} /> },
                  { title: t("rd.testing.mechanical"), desc: t("rd.testing.mechanical_desc"), icon: <TestTube size={32} /> },
                  { title: t("rd.testing.simulation"), desc: t("rd.testing.simulation_desc"), icon: <FlaskConical size={32} /> }
                ].map((item, idx) => (
                  <div key={idx} className="p-12 rounded-[40px] bg-white border border-brand-border hover:border-brand-blue/30 transition-all duration-700 group shadow-sm hover:shadow-2xl">
                    <div className="text-brand-blue mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h4 className="text-brand-dark font-black text-xl mb-4 tracking-tight">{item.title}</h4>
                    <p className="text-brand-dark/40 text-sm leading-relaxed font-bold">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px] mb-12 block">Quality Assurance</span>
              <h2 className="text-5xl md:text-8xl font-black text-brand-dark mb-16 tracking-tighter leading-[0.9]">
                {t("rd.testing.title")}<br />
                <span className="text-brand-dark/30">{t("rd.testing.subtitle")}</span>
              </h2>
              <p className="text-brand-dark/40 text-2xl mb-16 font-light leading-relaxed max-w-xl">
                {t("rd.testing.desc")}
              </p>
              <div className="flex items-center gap-10 p-12 rounded-[40px] bg-white border border-brand-border shadow-2xl">
                <div className="text-6xl font-black text-brand-blue tracking-tighter">CNAS</div>
                <div className="text-brand-dark/40 text-sm leading-relaxed border-l border-brand-border pl-10 font-bold max-w-xs">
                  {t("rd.testing.cnas")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Philosophy */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56">
        <div className="bg-brand-gray border border-brand-border rounded-[80px] p-24 lg:p-48 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px]"></div>
          <div className="relative z-10">
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px] mb-12 block">Our Philosophy</span>
            <h2 className="text-5xl md:text-[9rem] font-black mb-16 tracking-tighter leading-[0.8] text-brand-dark">{t("rd.philosophy.title")}<br /><span className="text-brand-dark/30">{t("rd.philosophy.subtitle")}</span></h2>
            <p className="text-brand-dark/40 text-2xl md:text-3xl max-w-5xl mx-auto font-light leading-relaxed">
              {t("rd.philosophy.desc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
