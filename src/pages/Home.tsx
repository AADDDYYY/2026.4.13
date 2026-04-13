import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Globe, Leaf, Zap, Microscope, Shield, Beaker, Users, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.05]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center bg-white">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ scale, opacity }} className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2000" 
            alt="Microstructure Visualization" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-white"></div>
        </motion.div>
      </div>

      <div className="relative z-20 w-full max-w-[1800px] mx-auto px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-6 mb-12">
            <div className="h-[2px] w-16 bg-brand-blue"></div>
            <span className="text-brand-blue font-black tracking-[0.3em] uppercase text-[11px]">
              {t("hero.lab", "Global Materials Science Leader")}
            </span>
          </div>

          <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter text-brand-dark mb-16 leading-[0.85]">
            {t("hero.title_part1", "微观结构")}<br />
            <span className="text-brand-blue">{t("hero.title_part2", "定义未来")}</span>
          </h1>
          
          <p className="text-2xl md:text-4xl text-brand-dark/40 leading-relaxed mb-24 max-w-4xl font-light">
            {t("home.hero.desc", "西顿新材料致力于通过先进的聚合物合成技术，为全球工业提供高性能、可持续的表面处理解决方案。")}
          </p>
          
          <div className="flex flex-wrap gap-10">
            <Link to="/products" className="group flex items-center gap-6 bg-brand-blue text-white px-14 py-7 rounded-full font-black transition-all hover:bg-brand-dark shadow-2xl shadow-brand-blue/30 text-lg">
              {t("home.hero.explore_btn", "探索产品中心")}
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/contact" className="group flex items-center gap-6 border-2 border-brand-border text-brand-dark px-14 py-7 rounded-full font-black transition-all hover:bg-brand-gray text-lg">
              {t("home.hero.sample_btn", "索取样品")}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-[11px] text-brand-dark/20 uppercase tracking-[0.5em] font-black">Scroll</span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-brand-blue to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
};

const ValuePillars = () => {
  const { t } = useTranslation();
  const pillars = [
    { icon: <Microscope className="text-brand-blue" size={40} />, title: "卓越研发", desc: "拥有50余项核心专利，持续突破聚合物合成边界。" },
    { icon: <Leaf className="text-brand-blue" size={40} />, title: "绿色可持续", desc: "致力于低VOC、生物基材料开发，助力碳中和目标。" },
    { icon: <Globe className="text-brand-blue" size={40} />, title: "全球视野", desc: "服务全球30多个国家，提供本地化的技术支持与服务。" },
    { icon: <Shield className="text-brand-blue" size={40} />, title: "品质承诺", desc: "严格遵循ISO 9001体系，确保每一批次产品性能稳定。" }
  ];

  return (
    <section className="py-48 bg-white px-6 md:px-20">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
          {pillars.map((pillar, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col gap-10 group"
            >
              <div className="w-20 h-20 rounded-3xl bg-brand-gray flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors duration-500">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-3xl font-black text-brand-dark mb-6 group-hover:text-brand-blue transition-colors">{pillar.title}</h3>
                <p className="text-brand-dark/50 text-lg leading-relaxed font-medium">{pillar.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedTechnologies = () => {
  const { t } = useTranslation();
  return (
    <section className="py-56 bg-brand-gray px-6 md:px-20 overflow-hidden border-y border-brand-border">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-16">
          <div className="max-w-4xl">
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px] mb-8 block">Innovation Hub</span>
            <h2 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter leading-[0.9]">
              引领行业的技术革新
            </h2>
          </div>
          <Link to="/innovation" className="text-brand-blue font-black flex items-center gap-4 hover:underline text-lg uppercase tracking-[0.3em] group">
            查看所有技术方案 <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-7 group relative h-[700px] rounded-[60px] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200" 
              alt="Self-Matting" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent"></div>
            <div className="absolute inset-0 p-16 flex flex-col justify-end">
              <span className="text-brand-blue font-black text-xs uppercase tracking-[0.3em] mb-6">Core Technology</span>
              <h3 className="text-5xl font-black text-white mb-8 tracking-tight">自消光水性聚氨酯</h3>
              <p className="text-white/60 text-xl max-w-lg mb-12 leading-relaxed font-medium">
                无需添加消光剂即可实现极低光泽度，保持涂层通透性与耐磨性。
              </p>
              <Link to="/products" className="inline-flex items-center gap-4 text-white font-black hover:text-brand-blue transition-colors text-lg uppercase tracking-widest">
                了解更多 <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex flex-col gap-12">
            {[
              { title: "高性能PUD分散体", desc: "卓越的耐化学性与物理机械性能，广泛应用于皮革与工业涂料。", img: "https://images.unsplash.com/photo-1532187875605-2fe35851142b?auto=format&fit=crop&q=80&w=800" },
              { title: "水性丙烯酸乳液", desc: "优异的附着力与耐候性，助力建筑与包装行业绿色升级。", img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800" }
            ].map((tech, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1 }}
                className="group relative flex-1 rounded-[50px] overflow-hidden shadow-xl"
              >
                <img src={tech.img} alt={tech.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/30 to-transparent"></div>
                <div className="absolute inset-0 p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-black text-white mb-6 tracking-tight">{tech.title}</h3>
                  <p className="text-white/60 max-w-sm mb-8 leading-relaxed font-medium">{tech.desc}</p>
                  <Link to="/products" className="inline-flex items-center gap-4 text-white font-black hover:text-brand-blue transition-colors uppercase tracking-widest">
                    查看详情 <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MarketSectors = () => {
  const { t } = useTranslation();
  const sectors = [
    { title: "皮革涂饰", en: "Leather Finishing", img: "https://images.unsplash.com/photo-1524292332709-b33366a7f141?auto=format&fit=crop&q=80&w=800" },
    { title: "消费电子", en: "Consumer Electronics", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800" },
    { title: "工业涂料", en: "Industrial Coatings", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" },
    { title: "木器家具", en: "Wood & Furniture", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <section className="py-56 bg-white px-6 md:px-20">
      <div className="max-w-[1800px] mx-auto">
        <div className="text-center mb-32">
          <span className="text-brand-blue font-black uppercase tracking-[0.4em] text-[11px] mb-8 block">Market Applications</span>
          <h2 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter leading-[0.9]">赋能多元行业</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {sectors.map((sector, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 1 }}
              className="group relative aspect-[3/4.5] rounded-[60px] overflow-hidden cursor-pointer shadow-2xl"
            >
              <img src={sector.img} alt={sector.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-brand-dark/50 group-hover:bg-brand-dark/30 transition-colors duration-700"></div>
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{sector.title}</h3>
                <p className="text-white/50 text-xs font-black uppercase tracking-[0.3em]">{sector.en}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GlobalPresence = () => {
  return (
    <section className="py-56 bg-brand-gray px-6 md:px-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" 
          alt="World Map" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px] mb-8 block">Global Network</span>
            <h2 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter mb-16 leading-[0.9]">全球化布局<br />本地化服务</h2>
            <p className="text-brand-dark/50 text-2xl leading-relaxed mb-20 max-w-2xl font-light">
              西顿新材料在亚洲、欧洲及美洲设有多个研发中心与销售分支，确保为全球客户提供高效、及时的技术支持与供应链保障。
            </p>
            <div className="grid grid-cols-2 gap-16">
              <div>
                <div className="text-7xl font-black text-brand-blue mb-4 tracking-tighter">30+</div>
                <div className="text-brand-dark/30 text-[11px] font-black uppercase tracking-[0.3em]">服务国家</div>
              </div>
              <div>
                <div className="text-7xl font-black text-brand-blue mb-4 tracking-tighter">10+</div>
                <div className="text-brand-dark/30 text-[11px] font-black uppercase tracking-[0.3em]">研发中心</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-full border-2 border-brand-border flex items-center justify-center relative bg-white shadow-2xl">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-dashed border-brand-blue/5 rounded-full"
              ></motion.div>
              <div className="text-center">
                <Globe className="text-brand-blue mx-auto mb-10" size={120} />
                <div className="text-brand-dark font-black text-3xl tracking-tighter uppercase">Connecting the World</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <ValuePillars />
      <FeaturedTechnologies />
      <MarketSectors />
      <GlobalPresence />
      
      {/* Final CTA */}
      <section className="py-64 bg-white px-6 md:px-20 text-center border-t border-brand-border">
        <div className="max-w-[1800px] mx-auto">
          <h2 className="text-6xl md:text-[11rem] font-black text-brand-dark tracking-tighter mb-24 leading-[0.8]">
            开启高性能材料<br />
            <span className="text-brand-blue">新篇章</span>
          </h2>
          <p className="text-2xl md:text-4xl text-brand-dark/40 mb-24 max-w-4xl mx-auto font-light leading-relaxed">
            联系我们的专家团队，获取定制化的表面处理解决方案。
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            <Link to="/contact" className="bg-brand-blue text-white px-20 py-8 rounded-full font-black text-xl hover:bg-brand-dark transition-all shadow-2xl shadow-brand-blue/30 uppercase tracking-[0.3em]">
              立即联系我们
            </Link>
            <Link to="/products" className="border-2 border-brand-border text-brand-dark px-20 py-8 rounded-full font-black text-xl hover:bg-brand-gray transition-all uppercase tracking-[0.3em]">
              浏览产品目录
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
