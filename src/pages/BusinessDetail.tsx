import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { businessData } from "../data/businessData";
import { ArrowLeft, CheckCircle2, Zap, Info, Package } from "lucide-react";

export default function BusinessDetail() {
  const { id } = useParams<{ id: string }>();
  const data = id ? businessData[id] : null;

  if (!data) {
    return (
      <div className="pt-24 md:pt-48 pb-24 bg-white min-h-screen text-brand-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-8 tracking-tight">未找到该业务领域</h1>
          <Link to="/" className="text-brand-blue hover:underline font-bold text-[11px] uppercase tracking-widest">返回首页</Link>
        </div>
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <div className="bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[80vh] min-h-[700px] overflow-hidden">
        <img 
          src={data.heroImage} 
          alt={data.title} 
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end pb-32">
          <div className="max-w-[1800px] mx-auto px-6 md:px-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link 
                to="/" 
                className="inline-flex items-center gap-6 text-brand-dark/40 hover:text-brand-blue mb-16 transition-colors group font-black text-[11px] uppercase tracking-[0.3em]"
              >
                <ArrowLeft size={24} className="group-hover:-translate-x-3 transition-transform" />
                返回首页
              </Link>
              <div className="flex flex-col md:flex-row md:items-center gap-12 mb-12">
                <div className="p-10 bg-brand-blue rounded-[40px] text-white shadow-2xl shadow-brand-blue/30 w-fit">
                  <Icon size={48} />
                </div>
                <div>
                  <h1 className="text-6xl md:text-[10rem] font-black tracking-tight leading-[0.85]">{data.title}</h1>
                  <p className="text-brand-blue font-black uppercase tracking-widest text-[12px] mt-8">{data.en}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-20 py-24 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-32">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="mb-48">
              <div className="flex items-center gap-6 mb-12">
                <div className="h-px w-16 bg-brand-blue"></div>
                <h2 className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px]">业务介绍</h2>
              </div>
              <p className="text-brand-dark/40 text-3xl md:text-5xl font-light leading-relaxed">
                {data.description}
              </p>
            </section>

            <section className="mb-48">
              <div className="flex items-center gap-6 mb-16">
                <div className="h-px w-16 bg-brand-blue"></div>
                <h2 className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px]">核心优势</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {data.features.map((feature, idx) => (
                  <div key={idx} className="p-12 rounded-[60px] bg-brand-gray border border-brand-border flex gap-10 items-start group hover:border-brand-blue/30 transition-all duration-700 shadow-sm">
                    <CheckCircle2 className="text-brand-blue shrink-0 mt-1" size={32} />
                    <p className="text-brand-dark/40 font-medium text-xl leading-relaxed group-hover:text-brand-dark transition-colors">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-32">
              <div className="flex items-center gap-6 mb-16">
                <div className="h-px w-16 bg-brand-blue"></div>
                <h2 className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px]">推荐产品系列</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {data.productSeries.map((series, idx) => (
                  <div key={idx} className="group rounded-[60px] overflow-hidden bg-brand-gray border border-brand-border hover:border-brand-blue/30 transition-all duration-700 shadow-2xl hover:shadow-brand-blue/10">
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={series.image} 
                        alt={series.name} 
                        className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
                    </div>
                    <div className="p-12">
                      <h3 className="text-3xl font-black text-brand-dark mb-6 group-hover:text-brand-blue transition-colors tracking-tight">{series.name}</h3>
                      <p className="text-brand-dark/40 text-lg font-medium leading-relaxed">{series.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-48 space-y-16">
              <div className="p-12 md:p-16 rounded-[60px] bg-brand-gray border border-brand-border shadow-2xl">
                <h3 className="text-3xl font-black mb-12 text-brand-dark tracking-tight">技术参数</h3>
                <div className="space-y-8">
                  {data.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-brand-border pb-8">
                      <span className="text-brand-dark/30 text-[11px] font-black uppercase tracking-[0.3em]">{spec.label}</span>
                      <span className="text-brand-dark/70 font-black text-lg tracking-tight">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-12 md:p-16 rounded-[60px] border border-brand-border bg-brand-gray shadow-2xl">
                <h3 className="text-3xl font-black mb-12 text-brand-dark tracking-tight">应用领域</h3>
                <div className="flex flex-wrap gap-4">
                  {data.applications.map((app, idx) => (
                    <span key={idx} className="px-8 py-3 rounded-full bg-white border border-brand-border text-brand-dark/40 text-[11px] font-black uppercase tracking-[0.2em] shadow-sm">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-12 md:p-16 rounded-[60px] bg-brand-blue text-white text-center shadow-2xl shadow-brand-blue/30">
                <h4 className="text-3xl font-black mb-8 tracking-tight">获取技术资料</h4>
                <p className="text-white/70 text-lg mb-12 font-medium leading-relaxed">如需详细的产品说明书 (TDS) 或安全说明书 (MSDS)，请联系我们。</p>
                <Link 
                  to="/contact"
                  className="w-full py-8 bg-white text-brand-blue rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-brand-dark hover:text-white transition-all duration-500 inline-block shadow-2xl"
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
