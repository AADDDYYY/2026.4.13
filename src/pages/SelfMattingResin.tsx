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
    <div className="pt-32 pb-24 bg-brand-light text-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link to="/products" className="text-brand-blue flex items-center gap-2 mb-8 hover:underline">
            <ArrowRight className="rotate-180" size={18} /> 返回产品中心
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">水性自消光树脂</h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            西顿核心优势产品系列，采用先进的自消光技术，无需添加消光粉即可实现极低光泽与卓越的表面性能。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                  <Droplets size={24} />
                </div>
                <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-3 py-1 rounded-full">
                  {product.id}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-brand-blue transition-colors">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed h-12 line-clamp-2">
                {product.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {product.features.map(f => (
                  <span key={f} className="text-[10px] uppercase tracking-wider font-bold text-gray-400 border border-gray-100 px-2 py-1 rounded">
                    {f}
                  </span>
                ))}
              </div>
              <button className="w-full py-3 border border-brand-blue text-brand-blue rounded-lg text-sm font-bold hover:bg-brand-blue hover:text-white transition-all">
                免费拿样
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
