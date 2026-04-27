import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Droplets, Zap, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export default function SelfMattingResin() {
  const { products } = useProducts();
  
  // Filter for resins (this is a simple example, you can adjust the filter logic)
  const resinProducts = products.filter(p => 
    p.category.includes('自消光') || 
    p.name.includes('50G') ||
    p.status !== 'draft'
  );

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
          {resinProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-brand-gray p-12 md:p-16 rounded-[60px] border border-brand-border hover:border-brand-blue/30 transition-all duration-700 group shadow-sm hover:shadow-2xl relative overflow-hidden"
            >
              {product.is_hot && (
                <div className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/30 animate-pulse z-10">
                  <Flame size={12} fill="currentColor" /> HOT
                </div>
              )}
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
                {product.description || (product as any).desc}
              </p>
              <div className="flex flex-wrap gap-4 mb-16">
                {product.features.map(f => (
                  <span key={f} className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/30 border border-brand-border px-5 py-2 rounded-full bg-white">
                    {f}
                  </span>
                ))}
              </div>
              <Link to={`/products/${product.id}`} className="w-full py-8 bg-brand-blue text-white rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-brand-dark transition-all duration-700 shadow-2xl shadow-brand-blue/30 inline-block text-center mb-4">
                查看详情
              </Link>
              <button className="w-full py-8 border-2 border-brand-blue text-brand-blue rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-brand-blue hover:text-white transition-all duration-700">
                免费拿样
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
