import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Atom, Shield, Sun, Beaker, Globe, Leaf, Zap, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.05]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center bg-[#050a14]">
      {/* Scanning Line Effect */}
      <motion.div 
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent z-40 pointer-events-none shadow-[0_0_15px_rgba(0,102,204,0.5)]"
      />

      {/* Background Layer with Technical Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a14] via-transparent to-[#050a14]"></div>
        
        {/* Molecular Particles (Simulated with SVG) */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
              animate={{ 
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%"]
              }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 border border-brand-blue/10 rounded-full blur-3xl"
            />
          ))}
        </div>
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent"></div>
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-brand-blue/10 to-transparent"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-blue/10 to-transparent"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-blue/10 to-transparent"></div>
        </div>

        <motion.div style={{ scale }} className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2000" 
            alt="Molecular Structure" 
            className="w-full h-full object-cover opacity-20 grayscale"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Data Sidebar (Left) */}
      <div className="absolute left-0 top-0 bottom-0 w-24 border-r border-white/5 hidden xl:flex flex-col items-center justify-center gap-12 z-30">
        <div className="rotate-90 text-[10px] font-mono text-white/20 tracking-[0.5em] uppercase whitespace-nowrap">
          {t("hero.status", "System Status: Optimal")}
        </div>
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4].map(i => (
            <motion.div 
              key={i}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
              className="w-1 h-1 bg-brand-blue rounded-full"
            />
          ))}
        </div>
        <div className="rotate-90 text-[10px] font-mono text-brand-blue tracking-[0.5em] uppercase whitespace-nowrap">
          Seaton Tech v4.0
        </div>
      </div>

      {/* Bottom Data Ticker */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-black/40 backdrop-blur-md border-t border-white/5 z-30 flex items-center overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-20 px-10"
        >
          {[1, 2].map(j => (
            <div key={j} className="flex gap-20">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                Molecular Weight Distribution: 1.05 PDI
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                Surface Tension: 24.5 mN/m
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                Viscosity Profile: 150-300 mPa.s
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                Crosslinking Density: 98.2%
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-6 mb-16">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050a14] bg-brand-blue/20 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-brand-blue opacity-20"></div>
                    </div>
                  ))}
                </div>
                <span className="text-brand-blue font-bold tracking-[0.6em] uppercase text-[10px]">
                  {t("hero.lab", "Precision Synthesis Lab")}
                </span>
              </div>

              <div className="relative mb-20">
                <h1 className="text-6xl md:text-[8vw] lg:text-[10rem] font-black tracking-tighter leading-[0.75] text-white">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10"
                  >
                    {t("hero.title_part1", "微观结构")}
                    <motion.div 
                      animate={{ x: [-2, 2, -1, 0], opacity: [0, 0.5, 0] }}
                      transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                      className="absolute inset-0 text-brand-blue translate-x-1 -z-10"
                    >
                      {t("hero.title_part1", "微观结构")}
                    </motion.div>
                  </motion.div>
                  <div className="mt-4 flex items-center gap-10">
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-white/60 via-white/20 to-transparent font-extralight italic text-5xl md:text-[6vw] lg:text-[7rem]">
                      {t("hero.title_part2", "定义未来")}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-brand-blue/40 to-transparent hidden md:block"></div>
                  </div>
                  <div className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-blue to-white/20">
                    {t("hero.title_part3", "性能边界")}
                  </div>
                </h1>
                
                {/* Tech Hotspots */}
                <div className="absolute -top-10 right-1/4 hidden md:block">
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-brand-blue rounded-full"
                    />
                    <div className="w-2 h-2 bg-brand-blue rounded-full relative z-10"></div>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[8px] font-mono text-white/40 uppercase tracking-widest">
                      Molecular Alignment: 99.8%
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-xl md:text-2xl text-white/20 leading-relaxed font-light mb-20 max-w-3xl border-l-2 border-brand-blue/20 pl-12">
                {t("home.hero.desc")}
              </p>

              <div className="flex flex-wrap gap-8 items-center">
                <Link to="/products" className="group px-10 py-5 bg-brand-blue text-white rounded-full font-bold hover:bg-white hover:text-brand-blue transition-all duration-500 shadow-2xl shadow-brand-blue/20 flex items-center gap-4 uppercase tracking-widest text-xs">
                  {t("home.hero.explore_btn")} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="px-10 py-5 border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold text-xs uppercase tracking-widest">
                  {t("home.hero.sample_btn")}
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="space-y-12 border-l border-white/5 pl-12"
            >
              {[
                { label: "Purity", value: "99.9%", desc: "High-grade chemical synthesis" },
                { label: "Innovation", value: "50+", desc: "Global technology patents" },
                { label: "Reach", value: "30+", desc: "Countries served worldwide" }
              ].map((stat, i) => (
                <div key={i} className="group">
                  <div className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{stat.label}</div>
                  <div className="text-5xl font-light text-white tracking-tighter mb-1">{stat.value}</div>
                  <div className="text-[10px] text-white/20 uppercase tracking-widest font-medium">{stat.desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-brand-blue to-transparent"
        />
      </div>
    </section>
  );
};

const InnovationBento = () => {
  const { t } = useTranslation();
  const technologies = [
    {
      id: "self-matting",
      title: t("home.innovation.tech1.title"),
      desc: t("home.innovation.tech1.desc"),
      icon: <Sparkles className="text-brand-blue" size={24} />,
      size: "col-span-1 md:col-span-2",
      img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "pud",
      title: t("home.innovation.tech2.title"),
      desc: t("home.innovation.tech2.desc"),
      icon: <Atom className="text-brand-blue" size={24} />,
      size: "col-span-1",
      img: "https://images.unsplash.com/photo-1524292332709-b33366a7f141?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "uv",
      title: t("home.innovation.tech3.title"),
      desc: t("home.innovation.tech3.desc"),
      icon: <Zap className="text-brand-blue" size={24} />,
      size: "col-span-1",
      img: "https://images.unsplash.com/photo-1532187875605-2fe35851142b?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "anti-fingerprint",
      title: t("home.innovation.tech4.title"),
      desc: t("home.innovation.tech4.desc"),
      icon: <Shield className="text-brand-blue" size={24} />,
      size: "col-span-1 md:col-span-2",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <section className="py-40 px-6 md:px-12 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Core Technologies</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8">{t("home.innovation.title")}</h2>
          <p className="text-white/30 text-lg font-light max-w-2xl leading-relaxed">
            {t("home.innovation.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {technologies.map((tech, idx) => (
            <Link 
              key={tech.id} 
              to={`/business/${tech.id}`}
              className={`${tech.size} group relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-blue/30 transition-all duration-700`}
            >
              <div className="absolute top-4 right-6 text-[8px] font-mono text-white/10 group-hover:text-brand-blue/40 transition-colors uppercase tracking-[0.2em] z-20">
                Tech-Ref: {tech.id.toUpperCase()}-0{idx + 1}
              </div>
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <img src={tech.img} alt={tech.title} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                
                {/* Technical Annotations Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 border border-brand-blue/20 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute top-1/4 left-8">
                    <div className="text-[8px] font-mono text-brand-blue bg-black/40 px-2 py-1 rounded border border-brand-blue/20">ANALYZING_STRUCTURE...</div>
                  </div>
                  <div className="absolute bottom-1/4 right-8">
                    <div className="text-[8px] font-mono text-brand-blue bg-black/40 px-2 py-1 rounded border border-brand-blue/20">STABILITY_CHECK: 99.8%</div>
                  </div>
                </div>
              </div>
              <div className="relative z-10 p-10 h-full flex flex-col justify-between min-h-[320px]">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-500">
                  {tech.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-1 bg-brand-blue animate-pulse"></div>
                    <span className="text-[8px] font-mono text-brand-blue/60 uppercase tracking-widest">Stability: Confirmed</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{tech.title}</h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs">{tech.desc}</p>
                </div>
              </div>
              
              {/* Technical Corner Accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 right-0 w-px h-6 bg-brand-blue/0 group-hover:bg-brand-blue/40 transition-all duration-500"></div>
                <div className="absolute bottom-0 right-0 w-6 h-px bg-brand-blue/0 group-hover:bg-brand-blue/40 transition-all duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const SustainabilitySection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-40 px-6 md:px-12 bg-[#050a14] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0066cc 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Sustainability & ESG</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-10 tracking-tighter leading-tight">
              {t("home.sustainability.title")}<br />
              <span className="text-white/20">{t("home.sustainability.subtitle")}</span>
            </h2>
            <p className="text-white/40 text-lg mb-12 font-light leading-relaxed">
              {t("home.sustainability.desc")}
            </p>
            
            <div className="grid grid-cols-2 gap-12">
              <div className="flex items-start gap-4">
                <Leaf className="text-brand-blue shrink-0" size={24} />
                <div>
                  <h4 className="text-white font-bold mb-2">{t("home.sustainability.voc")}</h4>
                  <p className="text-white/20 text-xs font-light">{t("home.sustainability.voc_desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Globe className="text-brand-blue shrink-0" size={24} />
                <div>
                  <h4 className="text-white font-bold mb-2">{t("home.sustainability.circular")}</h4>
                  <p className="text-white/20 text-xs font-light">{t("home.sustainability.circular_desc")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1532187875605-2fe35851142b?auto=format&fit=crop&q=80&w=1000" 
                alt="Green Lab" 
                className="w-full h-full object-cover grayscale opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-transparent to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-brand-blue p-10 rounded-3xl shadow-2xl"
            >
              <div className="text-4xl font-bold text-white mb-2 tracking-tighter">100%</div>
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{t("home.sustainability.badge")}</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ApplicationGrid = () => {
  const { t } = useTranslation();
  const industries = [
    { title: t("home.applications.leather"), en: "Leather Finishing", img: "https://images.unsplash.com/photo-1524292332709-b33366a7f141?auto=format&fit=crop&q=80&w=800" },
    { title: t("home.applications.electronics"), en: "Consumer Electronics", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800" },
    { title: t("home.applications.industrial"), en: "Industrial Coatings", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
    { title: t("home.applications.wood"), en: "Wood & Furniture", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <section className="py-40 px-6 md:px-12 bg-[#020617] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Industry Applications</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">{t("home.applications.title")}</h2>
          </div>
          <Link to="/products" className="text-brand-blue font-bold uppercase tracking-widest text-xs hover:underline flex items-center gap-2">
            {t("home.applications.view_all")} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          {industries.map((item, idx) => (
            <motion.div
              key={item.title}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
              className="p-10 bg-[#020617] transition-colors group cursor-pointer relative"
            >
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-[8px] font-mono text-brand-blue uppercase tracking-widest">
                  Perf-Score: 9.8
                </div>
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden mb-8 border border-white/5">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{item.title}</h3>
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{item.en}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RDSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-40 px-6 md:px-12 bg-[#050a14] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">R&D Excellence</span>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 tracking-tighter leading-tight">
              {t("home.rd.title")}<br />
              <span className="text-white/20">{t("home.rd.subtitle")}</span>
            </h2>
            <p className="text-white/40 text-lg mb-16 leading-relaxed font-light max-w-lg">
              {t("home.rd.desc")}
            </p>
            <div className="flex gap-20 mb-16">
              <div className="relative">
                <div className="text-6xl font-bold text-white mb-2 tracking-tighter">50+</div>
                <div className="text-white/20 text-[10px] uppercase tracking-widest font-bold">{t("home.rd.patents")}</div>
                <div className="absolute -left-4 top-0 w-px h-full bg-brand-blue/20"></div>
              </div>
              <div className="relative">
                <div className="text-6xl font-bold text-white mb-2 tracking-tighter">15+</div>
                <div className="text-white/20 text-[10px] uppercase tracking-widest font-bold">{t("home.rd.experts")}</div>
                <div className="absolute -left-4 top-0 w-px h-full bg-brand-blue/20"></div>
              </div>
            </div>
            <Link to="/rd" className="group flex items-center gap-4 text-brand-blue font-bold tracking-widest text-xs uppercase">
              {t("home.rd.btn")} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
          
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/5 p-4 bg-white/[0.02]">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                alt="Lab Innovation" 
                className="w-full h-full object-cover grayscale rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoShowcase = () => {
  const { t } = useTranslation();
  return (
    <section className="py-40 px-6 md:px-12 bg-[#020617] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5">
            <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Corporate Film</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-10 tracking-tighter leading-tight">
              {t("home.video.title")}<br />
              <span className="text-white/20">{t("home.video.subtitle")}</span>
            </h2>
            <p className="text-white/40 text-lg mb-12 font-light leading-relaxed">
              {t("home.video.desc")}
            </p>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                <Play size={24} fill="currentColor" />
              </div>
              <div>
                <div className="text-white font-bold tracking-tight">{t("home.video.film_title")}</div>
                <div className="text-white/20 text-xs uppercase tracking-widest mt-1">Duration: 04:25</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-video rounded-[40px] overflow-hidden border border-white/5 bg-white/[0.02] group cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
                alt="Video Thumbnail" 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-brand-blue flex items-center justify-center text-white shadow-2xl shadow-brand-blue/40 group-hover:scale-110 transition-transform duration-500">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div>
                  <div className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Now Playing</div>
                  <div className="text-white text-2xl font-bold tracking-tight">{t("home.video.video_title")}</div>
                </div>
                <div className="text-white/40 text-xs font-mono">00:00 / 04:25</div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-brand-blue w-1/3"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GlobalNetwork = () => {
  const { t } = useTranslation();
  return (
    <section className="py-40 px-6 md:px-12 bg-[#050a14] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-brand-blue font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Global Presence</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8">{t("home.global.title")}</h2>
          <p className="text-white/30 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            {t("home.global.desc")}
          </p>
        </div>

        <div className="relative aspect-[21/9] rounded-[40px] overflow-hidden border border-white/5 bg-white/[0.01]">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20 grayscale">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" 
              alt="World Map" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Animated Connection Lines (Simplified with CSS) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 opacity-10">
              <div className="absolute top-1/2 left-1/2 w-[800px] h-[400px] border border-brand-blue/30 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] border border-brand-blue/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Location Pins */}
          {[
            { name: t("home.global.hq"), pos: "top-[45%] left-[78%]", type: "HQ / R&D" },
            { name: t("home.global.sales"), pos: "top-[52%] left-[76%]", type: "Sales" },
            { name: t("home.global.europe"), pos: "top-[35%] left-[48%]", type: "Support" },
            { name: t("home.global.sea"), pos: "top-[65%] left-[72%]", type: "Logistics" }
          ].map((loc, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className={`absolute ${loc.pos} group cursor-pointer`}
            >
              <div className="relative">
                <div className="w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_20px_rgba(0,102,204,0.8)]"></div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="bg-brand-dark/90 backdrop-blur-md border border-white/10 p-4 rounded-xl min-w-[160px]">
                    <div className="text-white font-bold text-sm mb-1">{loc.name}</div>
                    <div className="text-brand-blue text-[10px] uppercase tracking-widest font-bold">{loc.type}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Technical HUD Overlay */}
          <div className="absolute bottom-10 left-10 flex gap-12">
            <div>
              <div className="text-white/20 text-[8px] uppercase tracking-[0.3em] mb-2 font-mono">Active Nodes</div>
              <div className="text-white text-xl font-bold font-mono">128<span className="text-brand-blue">/256</span></div>
            </div>
            <div>
              <div className="text-white/20 text-[8px] uppercase tracking-[0.3em] mb-2 font-mono">Data Throughput</div>
              <div className="text-white text-xl font-bold font-mono">4.2<span className="text-brand-blue"> TB/s</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#050a14]">
      <Hero />
      <InnovationBento />
      <SustainabilitySection />
      <VideoShowcase />
      <GlobalNetwork />
      <ApplicationGrid />
      <RDSection />
      
      {/* Final CTA */}
      <section className="py-40 px-6 md:px-12 bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 tracking-tighter">{t("home.final_cta.title")}</h2>
          <p className="text-white/80 text-xl mb-16 font-light max-w-2xl mx-auto">
            {t("home.final_cta.desc")}
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/contact" className="px-12 py-6 bg-white text-brand-blue rounded-full font-bold hover:bg-brand-dark hover:text-white transition-all text-sm uppercase tracking-widest shadow-2xl">
              {t("home.final_cta.btn")}
            </Link>
            <Link to="/products" className="px-12 py-6 border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all text-sm uppercase tracking-widest">
              {t("home.final_cta.browse")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
