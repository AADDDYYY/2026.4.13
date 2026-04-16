import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { products } from "../data/products";
import { ArrowLeft, CheckCircle2, FlaskConical, Activity, Thermometer, Droplets, ShieldCheck, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
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
    <div className="pt-48 pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-20">
        {/* Breadcrumb */}
        <Link to="/products" className="inline-flex items-center gap-6 text-brand-dark/40 hover:text-brand-blue transition-colors mb-24 group">
          <ArrowLeft size={24} className="group-hover:-translate-x-3 transition-transform" />
          <span className="text-[11px] font-black uppercase tracking-[0.3em]">{t("common.back_to_products", "返回产品中心")}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          {/* Left: Visual & Description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-12">
              <span className="px-8 py-3 bg-brand-blue/10 backdrop-blur-xl text-brand-blue text-[11px] font-black uppercase tracking-[0.3em] rounded-full border border-brand-blue/20 shadow-2xl">
                {product.category}
              </span>
            </div>

            <h1 className="text-6xl md:text-[10rem] font-black mb-16 tracking-tighter leading-[0.85]">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-10 mb-16">
              <p className="text-brand-blue text-[11px] font-black uppercase tracking-[0.3em]">{product.type}</p>
              <span className="w-2 h-2 rounded-full bg-brand-border"></span>
              <div className="flex flex-wrap gap-6">
                {product.divisions.map(d => (
                  <p key={d} className="text-brand-dark/40 text-[11px] font-black uppercase tracking-[0.3em]">{d}</p>
                ))}
              </div>
            </div>
            
            <div className="max-w-4xl">
              <p className="text-brand-dark/40 text-2xl md:text-4xl font-light leading-relaxed mb-24">
                {product.description}
              </p>
            </div>

            <div className="mb-24">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-dark/40 mb-10">适用基材 / Substrates</h3>
              <div className="flex flex-wrap gap-4">
                {Object.entries(product.substrates).filter(([_, v]) => v).map(([k]) => {
                  const labelMap: any = { metal: "金属", plastic: "塑胶", ink: "油墨", wood: "木器", leather: "皮革/纺织" };
                  return (
                    <span key={k} className="px-10 py-4 bg-brand-gray border border-brand-border rounded-2xl text-xs text-brand-dark/40 font-black uppercase tracking-[0.2em]">
                      {labelMap[k] || k}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="space-y-10 mb-24">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-dark/40 mb-12 flex items-center gap-6">
                <ShieldCheck size={24} className="text-brand-blue" />
                核心性能亮点
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-6 p-10 bg-brand-gray border border-brand-border rounded-[40px] shadow-sm group hover:border-brand-blue/30 transition-all duration-700">
                    <CheckCircle2 size={24} className="text-brand-blue shrink-0 mt-1" />
                    <span className="text-xl text-brand-dark/60 font-medium leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Radar Chart */}
            <div className="bg-brand-gray border border-brand-border rounded-[60px] p-12 md:p-20 shadow-2xl">
              <div className="flex items-center gap-6 mb-16">
                <BarChart3 size={24} className="text-brand-blue" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-dark/40">性能综合评估 / Performance Radar</h3>
              </div>
              <div className="h-[450px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                    <PolarGrid stroke="rgba(0,0,0,0.05)" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: 'rgba(0,0,0,0.3)', fontSize: 11, fontWeight: '900', letterSpacing: '0.2em' }} 
                    />
                    <Radar
                      name={product.name}
                      dataKey="A"
                      stroke="#0066cc"
                      fill="#0066cc"
                      fillOpacity={0.1}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-10">
                {performanceData.map((item) => (
                  <div key={item.subject} className="flex flex-col gap-4">
                    <span className="text-[10px] text-brand-dark/30 uppercase font-black tracking-[0.3em]">{item.subject}</span>
                    <div className="flex items-center gap-6">
                      <div className="flex-1 h-2 bg-brand-border rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.A}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full bg-brand-blue"
                        />
                      </div>
                      <span className="text-[12px] font-black text-brand-blue tracking-tighter">{item.A}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Technical Specifications */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-brand-gray border border-brand-border rounded-[60px] p-12 lg:p-24 shadow-2xl lg:sticky lg:top-48"
          >
            <div className="mb-16">
              <h2 className="text-5xl font-black mb-4 tracking-tighter text-brand-dark">技术参数表</h2>
              <p className="text-brand-dark/30 text-[11px] uppercase tracking-[0.3em] font-black">标准实验室分析数据</p>
            </div>

            <div className="space-y-px bg-brand-border border border-brand-border rounded-[32px] overflow-hidden shadow-2xl">
              {technicalSpecs.map((spec, idx) => (
                <div key={idx} className="flex items-center justify-between p-10 bg-white hover:bg-brand-gray transition-all duration-500 group">
                  <div className="flex items-center gap-6">
                    <div className="text-brand-blue opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                      {spec.icon}
                    </div>
                    <span className="text-[11px] font-black text-brand-dark/40 uppercase tracking-[0.3em]">{spec.label}</span>
                  </div>
                  <span className="text-2xl font-black tracking-tighter text-brand-dark">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-24">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-dark/40 mb-12">典型应用领域</h3>
              <div className="flex flex-wrap gap-4">
                <span className="px-10 py-5 bg-white border border-brand-border rounded-full text-[11px] font-black text-brand-dark/40 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm uppercase tracking-[0.2em]">
                  工业涂装
                </span>
                <span className="px-10 py-5 bg-white border border-brand-border rounded-full text-[11px] font-black text-brand-dark/40 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm uppercase tracking-[0.2em]">
                  高性能保护
                </span>
              </div>
            </div>

            <div className="mt-32 pt-16 border-t border-brand-border">
              <Link 
                to={`/contact?type=tds&product=${encodeURIComponent(product.name)}`}
                className="w-full py-10 bg-brand-blue text-white rounded-3xl font-black hover:bg-brand-dark transition-all shadow-2xl shadow-brand-blue/30 flex items-center justify-center gap-6 group uppercase tracking-[0.3em] text-[12px]"
              >
                索取技术说明书 (TDS)
                <ArrowLeft size={24} className="rotate-180 group-hover:translate-x-4 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
