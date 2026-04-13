import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Droplets, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: "50G71",
    name: "SEAPUR 50G71",
    desc: "水性自消光聚氨酯分散体，用于塑胶、木器等基材的水性双组份全哑肤感漆",
    features: ["全哑光", "肤感细腻", "高透明度"]
  },
  {
    id: "50G72",
    name: "SEAPUR 50G72",
    desc: "无溶剂的水性自消光脂肪族聚氨酯，具有极佳的环保性能",
    features: ["无溶剂", "低光泽", "环保低VOC"]
  },
  {
    id: "50G75",
    name: "SEAPUR 50G75",
    desc: "用于汽车革、塑胶和木器等基材的水性双组份全哑肤感漆",
    features: ["汽车革专用", "高耐磨", "肤感极佳"]
  },
  {
    id: "50G76",
    name: "SEAPUR 50G76",
    desc: "脂肪族无溶剂自消光聚氨酯，具有极佳的手感和低光泽",
    features: ["极佳手感", "脂肪族", "高耐候"]
  },
  {
    id: "50G80",
    name: "SEAPUR 50G80",
    desc: "脂肪族无溶剂的水性自消光聚氨酯，适用于多种高端涂层",
    features: ["多用途", "稳定性高", "超低光泽"]
  },
  {
    id: "50G85",
    name: "SEAPUR 50G85",
    desc: "水性自消光聚氨酯分散体，绵柔细滑手感，突出的透黑性",
    features: ["绵柔手感", "突出透黑性", "细腻滑爽"]
  }
];

export default function SelfMattingResin() {
  return (
    <div className="pt-48 pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-32"
        >
          <Link to="/products" className="text-brand-dark/40 flex items-center gap-6 mb-16 hover:text-brand-blue transition-colors font-black text-[11px] uppercase tracking-[0.3em] group">
            <ArrowRight className="rotate-180 group-hover:-translate-x-3 transition-transform" size={24} /> 返回产品中心
          </Link>
          <h1 className="text-6xl md:text-[10rem] font-black mb-16 tracking-tighter leading-[0.85]">水性自消光树脂</h1>
          <p className="text-brand-dark/40 text-2xl md:text-4xl font-light max-w-6xl leading-relaxed">
            西顿核心优势产品系列，采用先进的自消光技术，无需添加消光粉即可实现极低光泽与卓越的表面性能。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-brand-gray p-12 md:p-16 rounded-[60px] border border-brand-border hover:border-brand-blue/30 transition-all duration-700 group shadow-sm hover:shadow-2xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-[24px] flex items-center justify-center text-brand-blue border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <Droplets size={32} />
                </div>
                <span className="text-[11px] font-black text-brand-blue bg-brand-blue/5 px-6 py-2 rounded-full border border-brand-blue/20 uppercase tracking-[0.2em]">
                  {product.id}
                </span>
              </div>
              <h3 className="text-4xl font-black text-brand-dark mb-8 group-hover:text-brand-blue transition-colors tracking-tight">{product.name}</h3>
              <p className="text-brand-dark/40 text-lg mb-12 leading-relaxed h-32 line-clamp-4 font-medium">
                {product.desc}
              </p>
              <div className="flex flex-wrap gap-4 mb-16">
                {product.features.map(f => (
                  <span key={f} className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/30 border border-brand-border px-5 py-2 rounded-full bg-white">
                    {f}
                  </span>
                ))}
              </div>
              <button className="w-full py-8 bg-brand-blue text-white rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-brand-dark transition-all duration-700 shadow-2xl shadow-brand-blue/30">
                免费拿样
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
