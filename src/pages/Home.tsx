import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Globe, Leaf, Zap, Microscope, Shield, Beaker, Users, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center bg-white">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ scale, opacity }} className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
            alt="Advanced Manufacturing" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
        </motion.div>
      </div>

      <div className="relative z-20 w-full max-w-[1800px] mx-auto px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-12 bg-brand-blue"></div>
            <span className="text-brand-blue font-bold tracking-widest uppercase text-[12px]">
              {t("hero.lab", "Global Materials Science Leader")}
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tight text-brand-dark mb-12 leading-[1.1]">
            {t("hero.title_part1", "微观结构")}<br />
            <span className="text-brand-blue">{t("hero.title_part2", "定义未来")}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-brand-dark/60 leading-relaxed mb-16 max-w-2xl font-light">
            {t("home.hero.desc", "西顿新材料致力于通过先进的聚合物合成技术，为全球工业提供高性能、可持续的表面处理解决方案。")}
          </p>
          
          <div className="flex flex-wrap gap-8">
            <Link to="/products" className="group flex items-center gap-4 bg-brand-blue text-white px-12 py-6 rounded-full font-bold transition-all hover:bg-brand-dark shadow-lg shadow-brand-blue/20">
              {t("home.hero.explore_btn", "探索产品中心")}
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/contact" className="group flex items-center gap-4 border border-brand-border text-brand-dark px-12 py-6 rounded-full font-bold transition-all hover:bg-brand-gray">
              {t("home.hero.sample_btn", "索取样品")}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-brand-dark/30 uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-12 bg-brand-border"></div>
        </motion.div>
      </div>
    </section>
  );
};

const ValuePillars = () => {
  const { t } = useTranslation();
  const pillars = [
    { icon: <Microscope className="text-brand-blue" size={32} />, title: "卓越研发", desc: "拥有50余项核心专利，持续突破聚合物合成边界。" },
    { icon: <Leaf className="text-green-500" size={32} />, title: "绿色可持续", desc: "致力于低VOC、生物基材料开发，助力碳中和目标。" },
    { icon: <Globe className="text-blue-400" size={32} />, title: "全球视野", desc: "服务全球30多个国家，提供本地化的技术支持与服务。" },
    { icon: <Shield className="text-brand-blue" size={32} />, title: "品质承诺", desc: "严格遵循ISO 9001体系，确保每一批次产品性能稳定。" }
  ];

  return (
    <section className="py-32 bg-white px-6 md:px-20">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {pillars.map((pillar, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-gray flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-bold text-brand-dark">{pillar.title}</h3>
              <p className="text-brand-dark/60 leading-relaxed">{pillar.desc}</p>
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
    <section className="py-40 bg-brand-gray px-6 md:px-20 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-3xl">
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px] mb-6 block">Innovation Hub</span>
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tight leading-tight">
              引领行业的技术革新
            </h2>
          </div>
          <Link to="/innovation" className="text-brand-blue font-bold flex items-center gap-2 hover:underline">
            查看所有技术方案 <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200" 
              alt="Self-Matting" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 p-12 flex flex-col justify-end">
              <span className="text-brand-blue font-bold text-xs uppercase tracking-widest mb-4">Core Technology</span>
              <h3 className="text-4xl font-bold text-white mb-6">自消光水性聚氨酯</h3>
              <p className="text-white/70 text-lg max-w-md mb-8">
                无需添加消光剂即可实现极低光泽度，保持涂层通透性与耐磨性。
              </p>
              <Link to="/products" className="inline-flex items-center gap-2 text-white font-bold hover:text-brand-blue transition-colors">
                了解更多 <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-12">
            {[
              { title: "高性能PUD分散体", desc: "卓越的耐化学性与物理机械性能，广泛应用于皮革与工业涂料。", img: "https://images.unsplash.com/photo-1532187875605-2fe35851142b?auto=format&fit=crop&q=80&w=800" },
              { title: "水性丙烯酸乳液", desc: "优异的附着力与耐候性，助力建筑与包装行业绿色升级。", img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800" }
            ].map((tech, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative h-[282px] rounded-3xl overflow-hidden shadow-xl"
              >
                <img src={tech.img} alt={tech.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 p-10 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-4">{tech.title}</h3>
                  <p className="text-white/70 max-w-sm mb-6">{tech.desc}</p>
                  <Link to="/products" className="inline-flex items-center gap-2 text-white font-bold hover:text-brand-blue transition-colors">
                    查看详情 <ArrowRight size={16} />
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
    { title: "工业涂料", en: "Industrial Coatings", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
    { title: "木器家具", en: "Wood & Furniture", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <section className="py-40 bg-white px-6 md:px-20">
      <div className="max-w-[1800px] mx-auto">
        <div className="text-center mb-24">
          <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px] mb-6 block">Market Applications</span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tight">赋能多元行业</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sectors.map((sector, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
            >
              <img src={sector.img} alt={sector.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">{sector.title}</h3>
                <p className="text-white/60 text-sm uppercase tracking-widest">{sector.en}</p>
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
    <section className="py-40 bg-brand-dark px-6 md:px-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" 
          alt="World Map" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-brand-blue font-bold uppercase tracking-widest text-[12px] mb-6 block">Global Network</span>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight mb-12">全球化布局<br />本地化服务</h2>
            <p className="text-white/60 text-xl leading-relaxed mb-16 max-w-xl font-light">
              西顿新材料在亚洲、欧洲及美洲设有多个研发中心与销售分支，确保为全球客户提供高效、及时的技术支持与供应链保障。
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <div className="text-5xl font-black text-white mb-2">30+</div>
                <div className="text-white/40 text-[11px] font-bold uppercase tracking-widest">服务国家</div>
              </div>
              <div>
                <div className="text-5xl font-black text-white mb-2">10+</div>
                <div className="text-white/40 text-[11px] font-bold uppercase tracking-widest">研发中心</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-full border border-white/5 flex items-center justify-center relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-brand-blue/10 rounded-full"
              ></motion.div>
              <div className="text-center">
                <Globe className="text-brand-blue mx-auto mb-6" size={80} />
                <div className="text-white font-black text-2xl tracking-tight">Connecting the World</div>
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
      <section className="py-40 bg-white px-6 md:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black text-brand-dark tracking-tight mb-12">
            开启高性能材料<br />新篇章
          </h2>
          <p className="text-xl text-brand-dark/60 mb-16 max-w-2xl mx-auto">
            联系我们的专家团队，获取定制化的表面处理解决方案。
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/contact" className="bg-brand-blue text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-brand-dark transition-colors">
              立即联系我们
            </Link>
            <Link to="/products" className="border border-brand-dark/10 text-brand-dark px-12 py-6 rounded-full font-bold text-lg hover:bg-brand-gray transition-colors">
              浏览产品目录
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
