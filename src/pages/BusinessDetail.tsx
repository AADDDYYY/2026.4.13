import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { businessData } from "../data/businessData";
import { ArrowLeft, CheckCircle2, Zap, Info, Package } from "lucide-react";

export default function BusinessDetail() {
  const { id } = useParams<{ id: string }>();
  const data = id ? businessData[id] : null;

  if (!data) {
    return (
      <div className="pt-32 pb-24 bg-white min-h-screen text-brand-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-8 tracking-tight">未找到该业务领域</h1>
          <Link to="/" className="text-brand-blue hover:underline font-bold text-[11px] uppercase tracking-widest">返回首页</Link>
        </div>
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <div className="bg-white min-h-screen text-brand-dark">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <img 
          src={data.heroImage} 
          alt={data.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end pb-24">
          <div className="max-w-[1800px] mx-auto px-6 md:px-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link 
                to="/" 
                className="inline-flex items-center gap-4 text-brand-dark/40 hover:text-brand-blue mb-12 transition-colors group font-bold text-[11px] uppercase tracking-widest"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
                返回首页
              </Link>
              <div className="flex items-center gap-10 mb-8">
                <div className="p-6 bg-brand-blue rounded-[32px] text-white shadow-xl shadow-brand-blue/20">
                  <Icon size={40} />
                </div>
                <div>
                  <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-tight">{data.title}</h1>
                  <p className="text-brand-blue font-bold uppercase tracking-widest text-[11px] mt-4">{data.en}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-20 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="mb-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px w-12 bg-brand-blue"></div>
                <h2 className="text-brand-blue font-bold uppercase tracking-widest text-[11px]">业务介绍</h2>
              </div>
              <p className="text-brand-dark/60 text-2xl md:text-3xl font-light leading-relaxed">
                {data.description}
              </p>
            </section>

            <section className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-12 bg-brand-blue"></div>
                <h2 className="text-brand-blue font-bold uppercase tracking-widest text-[11px]">核心优势</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.features.map((feature, idx) => (
                  <div key={idx} className="p-10 rounded-[32px] bg-brand-gray border border-brand-border flex gap-6 items-start group hover:border-brand-blue/30 transition-all duration-500 shadow-sm">
                    <CheckCircle2 className="text-brand-blue shrink-0 mt-1" size={24} />
                    <p className="text-brand-dark/60 font-medium text-lg leading-relaxed group-hover:text-brand-dark transition-colors">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-12 bg-brand-blue"></div>
                <h2 className="text-brand-blue font-bold uppercase tracking-widest text-[11px]">推荐产品系列</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {data.productSeries.map((series, idx) => (
                  <div key={idx} className="group rounded-[40px] overflow-hidden bg-brand-gray border border-brand-border hover:border-brand-blue/30 transition-all duration-700 shadow-sm hover:shadow-xl">
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={series.image} 
                        alt={series.name} 
                        className="w-full h-full object-cover transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                    </div>
                    <div className="p-10">
                      <h3 className="text-2xl font-black text-brand-dark mb-4 group-hover:text-brand-blue transition-colors">{series.name}</h3>
                      <p className="text-brand-dark/50 text-base font-medium leading-relaxed">{series.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-12">
              <div className="p-10 rounded-[40px] bg-brand-gray border border-brand-border shadow-sm">
                <h3 className="text-2xl font-black mb-10 text-brand-dark">技术参数</h3>
                <div className="space-y-6">
                  {data.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-brand-border pb-6">
                      <span className="text-brand-dark/30 text-[11px] font-bold uppercase tracking-widest">{spec.label}</span>
                      <span className="text-brand-dark/70 font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 rounded-[40px] border border-brand-border bg-brand-gray shadow-sm">
                <h3 className="text-2xl font-black mb-10 text-brand-dark">应用领域</h3>
                <div className="flex flex-wrap gap-3">
                  {data.applications.map((app, idx) => (
                    <span key={idx} className="px-5 py-2 rounded-full bg-white border border-brand-border text-brand-dark/40 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-10 rounded-[40px] bg-brand-blue text-white text-center shadow-xl shadow-brand-blue/20">
                <h4 className="text-2xl font-black mb-6">获取技术资料</h4>
                <p className="text-white/70 text-base mb-10 font-medium leading-relaxed">如需详细的产品说明书 (TDS) 或安全说明书 (MSDS)，请联系我们。</p>
                <Link 
                  to="/contact"
                  className="w-full py-5 bg-white text-brand-blue rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all duration-500 inline-block shadow-lg"
                >
                  立即联系
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
