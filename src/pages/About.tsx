import { motion } from "motion/react";
import { Globe, Award, Users, Sparkles, Shield, Leaf, Handshake, Microscope, Factory, ShieldCheck, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useCMSAsset } from "../hooks/useCMSAsset";
import { useCertificates } from "../hooks/useCertificates";

export default function About() {
  const { t } = useTranslation();
  const { certificates: dbCertificates } = useCertificates();

  const { value: aboutHeroBg } = useCMSAsset('about_hero_bg', 'https://images.unsplash.com/photo-1542382156909-9ae38d3884c1?auto=format&fit=crop&q=80&w=1600');
  const { value: aboutStrengthImg } = useCMSAsset('about_strength_img', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000');

  // Honors & Patents CMS Assets
  const { value: honorImg1 } = useCMSAsset('honor_img_1', 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=400');
  const { value: honorImg2 } = useCMSAsset('honor_img_2', 'https://images.unsplash.com/photo-1606326666490-45757474e788?auto=format&fit=crop&q=80&w=400');
  const { value: honorImg3 } = useCMSAsset('honor_img_3', 'https://images.unsplash.com/photo-1635350736475-c8cef4b21906?auto=format&fit=crop&q=80&w=400');
  const { value: honorImg4 } = useCMSAsset('honor_img_4', 'https://images.unsplash.com/photo-1582733775062-eb92170f5394?auto=format&fit=crop&q=80&w=400');
  const { value: honorImg5 } = useCMSAsset('honor_img_5', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400');

  // Manufacturing Gallery CMS Assets
  const { value: mfgGallery1 } = useCMSAsset('mfg_gallery_1', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200');
  const { value: mfgGallery2 } = useCMSAsset('mfg_gallery_2', 'https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&q=80&w=800');
  const { value: mfgGallery3 } = useCMSAsset('mfg_gallery_3', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800');
  const { value: mfgGallery4 } = useCMSAsset('mfg_gallery_4', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200');

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
    <div className="pt-24 md:pt-48 pb-16 md:pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-24 md:mb-56 relative">
        {aboutHeroBg ? (
          <div className="absolute inset-0 -z-10 rounded-b-[100px] overflow-hidden opacity-20">
            <img src={aboutHeroBg} alt="About Hero" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        ) : (
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-blue/5 rounded-full blur-[250px] -z-10"></div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl"
        >
          <div className="flex items-center gap-6 mb-8 md:mb-16">
            <div className="h-px w-12 md:w-16 bg-brand-blue"></div>
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[10px] md:text-[11px]">
              Corporate Profile
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[10rem] font-black mb-8 md:mb-16 tracking-tight leading-[0.85]">
            {t("about.hero.title")}<br />
            <span className="text-brand-blue sm:text-[0.6em] md:text-[0.4em] lg:text-[0.3em] tracking-normal">Corporate Profile & History</span>
          </h1>
          <p className="text-brand-dark/40 text-lg sm:text-2xl md:text-4xl font-light leading-relaxed max-w-5xl">
            {t("about.hero.desc")}
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <section className="py-24 md:py-48 border-y border-brand-border bg-brand-gray mb-24 md:mb-56">
        <div className="max-w-[1800px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 text-center sm:text-left">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 1 }}
              >
                <div className="text-[11px] font-black text-brand-blue uppercase tracking-[0.3em] mb-6">{stat.label}</div>
                <div className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-dark tracking-tighter flex items-baseline gap-2">
                  {stat.value}<span className="text-lg font-black text-brand-dark/20 uppercase tracking-widest">{stat.unit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section 1 */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-6"
          >
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px] mb-12 block">Industrial Strength</span>
            <h2 className="text-5xl md:text-8xl font-black text-brand-dark mb-16 tracking-tighter leading-[0.9]">
              {t("about.strength.title")}<br />
              <span className="text-brand-blue">{t("about.strength.subtitle")}</span>
            </h2>
            <p className="text-brand-dark/40 text-2xl mb-16 leading-relaxed font-light max-w-2xl">
              {t("about.strength.desc")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
                  <Microscope size={32} />
                </div>
                <h4 className="text-brand-dark font-black text-2xl tracking-tight">{t("about.strength.team")}</h4>
                <p className="text-brand-dark/40 text-base font-medium leading-relaxed">{t("about.strength.team_desc")}</p>
              </div>
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
                  <Globe size={32} />
                </div>
                <h4 className="text-brand-dark font-black text-2xl tracking-tight">{t("about.strength.vision")}</h4>
                <p className="text-brand-dark/40 text-base font-medium leading-relaxed">{t("about.strength.vision_desc")}</p>
              </div>
            </div>
          </motion.div>
          
          <div className="lg:col-span-6 relative">
            <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl">
              <img 
                src={aboutStrengthImg} 
                alt="Seaton Production Base" 
                className="w-full h-full object-cover img-enhance"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 bg-brand-blue p-16 rounded-[40px] shadow-2xl text-white">
              <Factory size={48} className="mb-6" />
              <div className="text-2xl font-black tracking-tighter uppercase">{t("about.strength.smart")}</div>
              <div className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-black mt-3">Smart Manufacturing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Gallery */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-4xl">
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px] mb-8 block">Production Base</span>
            <h2 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter leading-[0.9]">{t("about.manufacturing.title")}</h2>
          </div>
          <p className="text-brand-dark/40 max-w-xl font-medium leading-relaxed text-xl">
            {t("about.manufacturing.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <div className="aspect-[16/9] rounded-[60px] overflow-hidden shadow-2xl group">
              <img 
                src={mfgGallery1} 
                alt="Automated Production Line" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl group">
              <img 
                src={mfgGallery2} 
                alt="Quality Control" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl group">
              <img 
                src={mfgGallery3} 
                alt="R&D Lab" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="aspect-[16/9] rounded-[60px] overflow-hidden shadow-2xl group">
              <img 
                src={mfgGallery4} 
                alt="Warehouse & Logistics" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Authoritative Endorsement & Certificates */}
      <section className="py-56 px-6 md:px-20 bg-brand-gray border-y border-brand-border mb-56 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[200px] -z-10"></div>
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center mb-32">
            <div className="lg:col-span-6">
              <span className="text-brand-blue font-black uppercase tracking-[0.4em] text-[11px] mb-8 block font-mono">
                Authoritative Endorsement
              </span>
              <h2 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter leading-[0.9] mb-12">
                {t("about.honors.title")}<br />
                <span className="text-brand-blue">{t("about.honors.subtitle")}</span>
              </h2>
              <p className="text-brand-dark/40 text-xl font-medium leading-relaxed max-w-xl">
                {t("about.honors.desc")}
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="aspect-square rounded-[40px] overflow-hidden border border-brand-border p-8 bg-white shadow-xl hover:shadow-2xl transition-all group">
                  <div className="h-full flex flex-col justify-between">
                    <ShieldCheck className="text-brand-blue mb-8" size={48} />
                    <div>
                      <div className="text-2xl font-black tracking-tight text-brand-dark mb-4">{t("about.honors.giant")}</div>
                      <div className="text-brand-dark/40 text-xs font-medium">{t("about.honors.giant_desc")}</div>
                    </div>
                  </div>
                </div>
                <div className="aspect-square rounded-[40px] overflow-hidden border border-brand-border p-8 bg-white shadow-xl hover:shadow-2xl transition-all translate-y-12 group">
                  <div className="h-full flex flex-col justify-between">
                    <Microscope className="text-brand-blue mb-8" size={32} />
                    <div>
                      <div className="text-2xl font-black tracking-tight text-brand-dark mb-4">{t("about.honors.phd")}</div>
                      <div className="text-brand-dark/40 text-xs font-medium">{t("about.honors.phd_desc")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['荣誉资质', '专利授权', '政府认定', '体系认证'].map((cat, idx) => {
              const catCerts = dbCertificates?.filter((c: any) => (c.category || c.type) === cat).slice(0, 4) || [];
              
              return (
                <motion.div 
                  key={cat}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="bg-white p-8 rounded-[40px] border border-brand-border hover:border-brand-blue/30 transition-all shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-brand-border/50">
                    <div className="w-1.5 h-4 bg-brand-blue rounded-full"></div>
                    <h3 className="text-xl font-black text-brand-dark tracking-tight">{cat}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {catCerts.length > 0 ? (
                      catCerts.map((cert: any) => (
                        <div key={cert.id} className="flex items-center gap-4 group cursor-pointer p-3 rounded-2xl hover:bg-brand-gray transition-all">
                          <div className="w-12 h-16 bg-brand-gray rounded-lg overflow-hidden shrink-0 border border-brand-border group-hover:border-brand-blue/30 transition-all flex items-center justify-center p-1 bg-white">
                            {cert.image ? (
                              <img src={cert.image} alt={cert.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                            ) : (
                              <Award className="text-brand-dark/10" size={20} />
                            )}
                          </div>
                          <div>
                            <div className="text-[13px] font-black text-brand-dark leading-tight group-hover:text-brand-blue transition-colors line-clamp-2">
                              {cert.title}
                            </div>
                            <div className="text-[9px] text-brand-dark/30 font-black uppercase tracking-wider mt-1">
                               {cert.type || cat}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Award className="text-brand-dark/5 mx-auto mb-4" size={32} />
                        <div className="text-[10px] text-brand-dark/20 font-black uppercase tracking-widest">暂无证书</div>
                      </div>
                    )}
                    <button className="w-full mt-4 py-3 rounded-xl border border-dashed border-brand-border text-brand-dark/30 text-[10px] font-black uppercase tracking-widest hover:border-brand-blue/50 hover:text-brand-blue transition-all flex items-center justify-center gap-2">
                      {t("about.honors.view_cert")} <ChevronRight size={12} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56">
        <div className="text-center mb-32">
          <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px] mb-8 block">Corporate Culture</span>
          <h2 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter leading-[0.9]">{t("about.culture.title")}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {values.map((value, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -15 }}
              className="p-16 rounded-[50px] bg-brand-gray border border-brand-border text-center group hover:border-brand-blue/30 transition-all duration-700 shadow-sm hover:shadow-2xl"
            >
              <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue mx-auto mb-10 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                {value.icon}
              </div>
              <h3 className="text-3xl font-black mb-8 tracking-tight text-brand-dark">{value.title}</h3>
              <p className="text-brand-dark/40 text-base leading-relaxed font-medium">
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
