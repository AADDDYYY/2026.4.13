import { motion } from "motion/react";
import { Globe, Award, Users, Sparkles, Shield, Leaf, Handshake, Microscope, Factory, ShieldCheck, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const stats = [
    { label: t("about.stats.base"), value: "37,200", unit: t("about.stats.unit_m2") },
    { label: t("about.stats.capacity"), value: "60,000", unit: t("about.stats.unit_tons") },
    { label: t("about.stats.patents"), value: "30+", unit: t("about.stats.unit_items") },
    { label: t("about.stats.clients"), value: "1,000+", unit: t("about.stats.unit_companies") }
  ];

  const values = [
    {
      title: t("about.culture.mission"),
      desc: t("about.culture.mission_desc"),
      icon: <Sparkles size={32} />,
      color: "text-brand-blue"
    },
    {
      title: t("about.culture.vision"),
      desc: t("about.culture.vision_desc"),
      icon: <Shield size={32} />,
      color: "text-brand-blue"
    },
    {
      title: t("about.culture.values"),
      desc: t("about.culture.values_desc"),
      icon: <Leaf size={32} />,
      color: "text-brand-blue"
    },
    {
      title: t("about.culture.spirit"),
      desc: t("about.culture.spirit_desc"),
      icon: <Handshake size={32} />,
      color: "text-brand-blue"
    }
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
          className="max-w-6xl"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px w-12 bg-brand-blue"></div>
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px]">
              Corporate Profile
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-12 tracking-tight leading-tight">
            {t("about.hero.title")}<br />
            <span className="text-brand-blue">{t("about.hero.subtitle")}</span>
          </h1>
          <p className="text-brand-dark/60 text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
            {t("about.hero.desc")}
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <section className="py-32 border-y border-brand-border bg-brand-gray mb-40">
        <div className="max-w-[1800px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-[12px] font-bold text-brand-blue uppercase tracking-widest mb-4">{stat.label}</div>
                <div className="text-5xl md:text-7xl font-black text-brand-dark tracking-tight">
                  {stat.value}<span className="text-sm font-bold ml-3 text-brand-dark/20">{stat.unit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section 1 */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px] mb-8 block">Industrial Strength</span>
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-12 tracking-tight leading-tight">
              {t("about.strength.title")}<br />
              <span className="text-brand-blue">{t("about.strength.subtitle")}</span>
            </h2>
            <p className="text-brand-dark/60 text-lg mb-12 leading-relaxed font-light">
              {t("about.strength.desc")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
                  <Microscope size={24} />
                </div>
                <h4 className="text-brand-dark font-bold text-xl">{t("about.strength.team")}</h4>
                <p className="text-brand-dark/40 text-sm font-medium leading-relaxed">{t("about.strength.team_desc")}</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
                  <Globe size={24} />
                </div>
                <h4 className="text-brand-dark font-bold text-xl">{t("about.strength.vision")}</h4>
                <p className="text-brand-dark/40 text-sm font-medium leading-relaxed">{t("about.strength.vision_desc")}</p>
              </div>
            </div>
          </motion.div>
          
          <div className="lg:col-span-6 relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                alt="Seaton Production Base" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-brand-blue p-10 rounded-3xl shadow-2xl text-white">
              <Factory size={40} className="mb-4" />
              <div className="text-xl font-bold tracking-tight">{t("about.strength.smart")}</div>
              <div className="text-white/60 text-[10px] uppercase tracking-widest font-bold mt-2">Smart Manufacturing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Honors Showcase */}
      <section className="py-32 px-6 md:px-20 bg-brand-gray border-y border-brand-border mb-40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px] mb-4 block">Authoritative Endorsement</span>
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-8 tracking-tight">{t("about.honors.title")}<span className="text-brand-blue">{t("about.honors.subtitle")}</span></h2>
            <p className="text-brand-dark/60 max-w-2xl mx-auto font-light leading-relaxed text-lg">
              {t("about.honors.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-3xl bg-white border border-brand-border hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <Award className="text-brand-blue mb-8 group-hover:scale-110 transition-transform" size={48} />
              <h3 className="text-2xl font-bold mb-4 tracking-tight text-brand-dark">{t("about.honors.giant")}</h3>
              <p className="text-brand-dark/50 font-medium leading-relaxed mb-8">{t("about.honors.giant_desc")}</p>
              <div className="flex items-center gap-2 text-brand-blue text-xs font-bold uppercase tracking-widest">
                <span>{t("about.honors.view_cert")}</span>
                <ChevronRight size={14} />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-12 rounded-3xl bg-white border border-brand-border hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <Users className="text-brand-blue mb-8 group-hover:scale-110 transition-transform" size={48} />
              <h3 className="text-2xl font-bold mb-4 tracking-tight text-brand-dark">{t("about.honors.phd")}</h3>
              <p className="text-brand-dark/50 font-medium leading-relaxed mb-8">{t("about.honors.phd_desc")}</p>
              <div className="flex items-center gap-2 text-brand-blue text-xs font-bold uppercase tracking-widest">
                <span>{t("about.honors.view_cert")}</span>
                <ChevronRight size={14} />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-12 rounded-3xl bg-white border border-brand-border hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <ShieldCheck className="text-brand-blue mb-8 group-hover:scale-110 transition-transform" size={48} />
              <h3 className="text-2xl font-bold mb-4 tracking-tight text-brand-dark">{t("about.honors.patents_title")}</h3>
              <p className="text-brand-dark/50 font-medium leading-relaxed mb-8">{t("about.honors.patents_desc")}</p>
              <div className="flex items-center gap-2 text-brand-blue text-xs font-bold uppercase tracking-widest">
                <span>{t("about.honors.patent_list")}</span>
                <ChevronRight size={14} />
              </div>
            </motion.div>
          </div>

          {/* Patent & Honor Gallery Window */}
          <div className="relative">
            <div className="flex gap-8 overflow-x-auto pb-12 custom-scrollbar snap-x">
              {[
                { title: t("about.honors.giant"), type: "荣誉证书", img: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=400" },
                { title: t("about.honors.phd"), type: "政府挂牌", img: "https://images.unsplash.com/photo-1606326666490-45757474e788?auto=format&fit=crop&q=80&w=400" },
                { title: "高新技术企业证书", type: "资质认定", img: "https://images.unsplash.com/photo-1635350736475-c8cef4b21906?auto=format&fit=crop&q=80&w=400" },
                { title: "发明专利：一种水性树脂合成工艺", type: "专利授权", img: "https://images.unsplash.com/photo-1582733775062-eb92170f5394?auto=format&fit=crop&q=80&w=400" },
                { title: "发明专利：高性能聚氨酯分散体", type: "专利授权", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="min-w-[300px] md:min-w-[400px] snap-start"
                >
                  <div className="aspect-[3/4] rounded-[30px] overflow-hidden border border-white/5 bg-white/[0.02] p-4 mb-6 group">
                    <div className="w-full h-full rounded-[20px] overflow-hidden relative">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                    </div>
                  </div>
                  <div className="px-4">
                    <span className="text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-2 block">{item.type}</span>
                    <h4 className="text-white font-bold text-lg tracking-tight">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <div className="w-12 h-1 bg-brand-blue rounded-full"></div>
              <div className="w-2 h-1 bg-white/10 rounded-full"></div>
              <div className="w-2 h-1 bg-white/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Gallery */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px] mb-6 block">Production Base</span>
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tight">{t("about.manufacturing.title")}</h2>
          </div>
          <p className="text-brand-dark/40 max-w-md font-medium leading-relaxed">
            {t("about.manufacturing.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
                alt="Automated Production Line" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&q=80&w=800" 
                alt="Quality Control" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" 
                alt="R&D Lab" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200" 
                alt="Warehouse & Logistics" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-40">
        <div className="text-center mb-24">
          <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px] mb-6 block">Corporate Culture</span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tight">{t("about.culture.title")}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-12 rounded-3xl bg-brand-gray border border-brand-border text-center group hover:border-brand-blue/30 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mx-auto mb-8 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6 tracking-tight text-brand-dark">{value.title}</h3>
              <p className="text-brand-dark/50 text-sm leading-relaxed font-medium">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final Commitment */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-20 md:p-32 rounded-[40px] overflow-hidden bg-brand-blue text-white text-center"
        >
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tight">{t("about.commitment.title")}</h2>
            <p className="text-white/80 text-xl md:text-2xl font-light leading-relaxed mb-12">
              {t("about.commitment.desc")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
