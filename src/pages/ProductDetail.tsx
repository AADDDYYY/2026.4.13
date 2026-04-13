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
      <div className="min-h-screen flex items-center justify-center bg-white text-brand-dark">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-8 tracking-tight">Product Not Found</h1>
          <Link to="/products" className="text-brand-blue hover:underline font-bold text-[11px] uppercase tracking-widest">Return to Products</Link>
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
    <div className="pt-32 pb-24 bg-white min-h-screen text-brand-dark">
      <div className="max-w-[1800px] mx-auto px-6 md:px-20">
        {/* Breadcrumb */}
        <Link to="/products" className="inline-flex items-center gap-4 text-brand-dark/40 hover:text-brand-blue transition-colors mb-16 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
          <span className="text-[11px] font-bold uppercase tracking-widest">返回产品中心</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left: Visual & Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-square rounded-[40px] overflow-hidden border border-brand-border mb-16 shadow-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-8 left-8">
                <span className="px-6 py-2 bg-brand-blue/10 backdrop-blur-md text-brand-blue text-[10px] font-bold uppercase tracking-widest rounded-full border border-brand-blue/20">
                  {product.category}
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tight leading-tight">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-6 mb-10">
              <p className="text-brand-blue text-[11px] font-bold uppercase tracking-widest">{product.type}</p>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-border"></span>
              <div className="flex flex-wrap gap-4">
                {product.divisions.map(d => (
                  <p key={d} className="text-brand-dark/40 text-[11px] font-bold uppercase tracking-widest">{d}</p>
                ))}
              </div>
            </div>
            
            <div className="max-w-2xl">
              <p className="text-brand-dark/60 text-xl md:text-2xl font-light leading-relaxed mb-12">
                {product.description}
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-dark/40 mb-6">适用基材 / Substrates</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(product.substrates).filter(([_, v]) => v).map(([k]) => {
                  const labelMap: any = { metal: "金属", plastic: "塑胶", ink: "油墨", wood: "木器", leather: "皮革/纺织" };
                  return (
                    <span key={k} className="px-6 py-3 bg-brand-gray border border-brand-border rounded-xl text-xs text-brand-dark/60 font-bold">
                      {labelMap[k] || k}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6 mb-16">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-dark/40 mb-8 flex items-center gap-3">
                <ShieldCheck size={18} className="text-brand-blue" />
                核心性能亮点
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-brand-gray border border-brand-border rounded-2xl shadow-sm">
                    <CheckCircle2 size={20} className="text-brand-blue shrink-0 mt-0.5" />
                    <span className="text-base text-brand-dark/70 font-medium leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Radar Chart */}
            <div className="bg-brand-gray border border-brand-border rounded-[40px] p-8 md:p-12 shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                <BarChart3 size={20} className="text-brand-blue" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-dark/40">性能综合评估 / Performance Radar</h3>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                    <PolarGrid stroke="rgba(0,0,0,0.05)" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: 'rgba(0,0,0,0.4)', fontSize: 11, fontWeight: 'bold' }} 
                    />
                    <Radar
                      name={product.name}
                      dataKey="A"
                      stroke="#0066cc"
                      fill="#0066cc"
                      fillOpacity={0.15}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
                {performanceData.map((item) => (
                  <div key={item.subject} className="flex flex-col gap-2">
                    <span className="text-[10px] text-brand-dark/30 uppercase font-bold tracking-widest">{item.subject}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-brand-border rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.A}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-brand-blue"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-brand-blue">{item.A}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Technical Specifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-brand-gray border border-brand-border rounded-[40px] p-8 lg:p-16 shadow-sm sticky top-32"
          >
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-2 tracking-tight text-brand-dark">技术参数表</h2>
              <p className="text-brand-dark/30 text-[11px] uppercase tracking-widest font-bold">标准实验室分析数据</p>
            </div>

            <div className="space-y-px bg-brand-border border border-brand-border rounded-2xl overflow-hidden shadow-sm">
              {technicalSpecs.map((spec, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 bg-white hover:bg-brand-gray transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="text-brand-blue opacity-40 group-hover:opacity-100 transition-opacity">
                      {spec.icon}
                    </div>
                    <span className="text-xs font-bold text-brand-dark/40 uppercase tracking-widest">{spec.label}</span>
                  </div>
                  <span className="text-lg font-bold tracking-tight text-brand-dark">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-dark/40 mb-8">典型应用领域</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-8 py-4 bg-white border border-brand-border rounded-full text-xs font-bold text-brand-dark/40 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm">
                  工业涂装
                </span>
                <span className="px-8 py-4 bg-white border border-brand-border rounded-full text-xs font-bold text-brand-dark/40 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm">
                  高性能保护
                </span>
              </div>
            </div>

            <div className="mt-20 pt-12 border-t border-brand-border">
              <Link 
                to={`/contact?type=tds&product=${encodeURIComponent(product.name)}`}
                className="w-full py-6 bg-brand-blue text-white rounded-2xl font-bold hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-4 group uppercase tracking-widest text-[11px]"
              >
                索取技术说明书 (TDS)
                <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
