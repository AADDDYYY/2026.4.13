import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { products } from "../data/products";
import { ArrowLeft, CheckCircle2, FlaskConical, Activity, Thermometer, Droplets, ShieldCheck, BarChart3 } from "lucide-react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050a14] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-brand-blue hover:underline">Return to Products</Link>
        </div>
      </div>
    );
  }

  // Default performance data if not provided
  const performanceData = product.performance ? [
    { subject: '硬度', A: product.performance.hardness, fullMark: 100 },
    { subject: '柔韧性', A: product.performance.flexibility, fullMark: 100 },
    { subject: '附着力', A: product.performance.adhesion, fullMark: 100 },
    { subject: '耐化学性', A: product.performance.chemicalResistance, fullMark: 100 },
    { subject: '光泽度', A: product.performance.gloss, fullMark: 100 },
    { subject: '干燥速度', A: product.performance.dryingSpeed, fullMark: 100 },
  ] : [
    { subject: '硬度', A: 80, fullMark: 100 },
    { subject: '柔韧性', A: 70, fullMark: 100 },
    { subject: '附着力', A: 90, fullMark: 100 },
    { subject: '耐化学性', A: 65, fullMark: 100 },
    { subject: '光泽度', A: 85, fullMark: 100 },
    { subject: '干燥速度', A: 75, fullMark: 100 },
  ];

  const technicalSpecs = [
    { label: "外观", value: product.appearance, icon: <Droplets size={18} /> },
    { label: "固含量", value: product.solidContent, icon: <Activity size={18} /> },
    { label: "pH 值", value: product.pH, icon: <FlaskConical size={18} /> },
    { label: "粘度", value: product.viscosity, icon: <Activity size={18} /> },
    { label: "羟值", value: product.hydroxylValue, icon: <FlaskConical size={18} /> },
    { label: "玻璃化温度 (°C)", value: product.tg, icon: <Thermometer size={18} /> },
    { label: "最低成膜温度 (°C)", value: product.mfft, icon: <Thermometer size={18} /> },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#050a14] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <Link to="/products" className="inline-flex items-center gap-2 text-white/40 hover:text-brand-blue transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">返回产品中心</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: Visual & Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/5 mb-12">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-transparent to-transparent opacity-60"></div>
              <div className="absolute top-8 left-8">
                <span className="px-4 py-2 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {product.category}
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">{product.name}</h1>
            <div className="flex flex-wrap gap-4 mb-8">
              <p className="text-brand-blue text-sm font-bold uppercase tracking-[0.3em]">{product.type}</p>
              <span className="text-white/20">|</span>
              <div className="flex flex-wrap gap-2">
                {product.divisions.map(d => (
                  <p key={d} className="text-white/40 text-sm font-bold uppercase tracking-widest">{d}</p>
                ))}
              </div>
            </div>
            
            <div className="max-w-xl">
              <p className="text-white/40 text-lg leading-relaxed font-light mb-8">
                {product.description}
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">适用基材 / Substrates</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(product.substrates).filter(([_, v]) => v).map(([k]) => {
                  const labelMap: any = { metal: "金属", plastic: "塑胶", ink: "油墨", wood: "木器", leather: "皮革/纺织" };
                  return (
                    <span key={k} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 font-medium">
                      {labelMap[k] || k}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 mb-16">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-6 flex items-center gap-3">
                <ShieldCheck size={16} className="text-brand-blue" />
                核心性能亮点
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                    <CheckCircle2 size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <span className="text-sm text-white/60 font-light leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Radar Chart */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-10">
                <BarChart3 size={18} className="text-brand-blue" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/60">性能综合评估 / Performance Radar</h3>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} 
                    />
                    <Radar
                      name={product.name}
                      dataKey="A"
                      stroke="#0066cc"
                      fill="#0066cc"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                {performanceData.map((item) => (
                  <div key={item.subject} className="flex flex-col gap-1">
                    <span className="text-[10px] text-white/20 uppercase font-bold">{item.subject}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.A}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-brand-blue"
                        />
                      </div>
                      <span className="text-[10px] font-mono text-brand-blue">{item.A}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Technical Specifications (Stahl Style) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 lg:p-16"
          >
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-2 tracking-tight">技术参数表</h2>
              <p className="text-white/20 text-xs uppercase tracking-widest font-bold">标准实验室分析数据</p>
            </div>

            <div className="space-y-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
              {technicalSpecs.map((spec, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 bg-[#050a14]/40 hover:bg-white/[0.03] transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="text-brand-blue opacity-40 group-hover:opacity-100 transition-opacity">
                      {spec.icon}
                    </div>
                    <span className="text-sm font-bold text-white/40 uppercase tracking-wider">{spec.label}</span>
                  </div>
                  <span className="text-lg font-light tracking-tight">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-8">典型应用领域</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/40 hover:text-white hover:border-brand-blue transition-all">
                  工业涂装
                </span>
                <span className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/40 hover:text-white hover:border-brand-blue transition-all">
                  高性能保护
                </span>
              </div>
            </div>

            <div className="mt-20 pt-12 border-t border-white/5">
              <Link 
                to={`/contact?type=tds&product=${encodeURIComponent(product.name)}`}
                className="w-full py-5 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/80 transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-4 group"
              >
                索取技术说明书 (TDS)
                <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
