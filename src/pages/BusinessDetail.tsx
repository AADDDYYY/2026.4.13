import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { businessData } from "../data/businessData";
import { ArrowLeft, CheckCircle2, Zap, Info, Package } from "lucide-react";

export default function BusinessDetail() {
  const { id } = useParams<{ id: string }>();
  const data = id ? businessData[id] : null;

  if (!data) {
    return (
      <div className="pt-32 pb-24 bg-[#050a14] min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">未找到该业务领域</h1>
          <Link to="/" className="text-brand-blue hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <div className="bg-[#050a14] min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img 
          src={data.heroImage} 
          alt={data.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/60 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-white/60 hover:text-brand-blue mb-8 transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                返回首页
              </Link>
              <div className="flex items-center gap-6 mb-6">
                <div className="p-4 bg-brand-blue rounded-2xl text-white">
                  <Icon size={32} />
                </div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">{data.title}</h1>
                  <p className="text-brand-blue font-bold uppercase tracking-[0.3em] text-xs mt-2">{data.en}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                <Info className="text-brand-blue" /> 业务介绍
              </h2>
              <p className="text-white/50 text-xl font-light leading-relaxed">
                {data.description}
              </p>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
                <Zap className="text-brand-blue" /> 核心优势
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.features.map((feature, idx) => (
                  <div key={idx} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex gap-4 items-start hover:border-brand-blue/30 transition-all">
                    <CheckCircle2 className="text-brand-blue shrink-0 mt-1" size={20} />
                    <p className="text-white/60 font-light">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
                <Package className="text-brand-blue" /> 推荐产品系列
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.productSeries.map((series, idx) => (
                  <div key={idx} className="group rounded-[32px] overflow-hidden bg-white/[0.02] border border-white/5 hover:border-brand-blue/20 transition-all">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={series.image} 
                        alt={series.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold mb-4">{series.name}</h3>
                      <p className="text-white/40 text-sm font-light leading-relaxed">{series.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-12">
              <div className="p-10 rounded-[40px] bg-gradient-to-br from-brand-blue/20 to-transparent border border-brand-blue/20">
                <h3 className="text-2xl font-bold mb-8">技术参数</h3>
                <div className="space-y-6">
                  {data.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-white/40 text-sm">{spec.label}</span>
                      <span className="text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 rounded-[40px] border border-white/10 bg-white/[0.02]">
                <h3 className="text-2xl font-bold mb-8">应用领域</h3>
                <div className="flex flex-wrap gap-3">
                  {data.applications.map((app, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-10 rounded-[40px] bg-brand-blue text-white text-center">
                <h4 className="font-bold mb-4">获取技术资料</h4>
                <p className="text-white/70 text-sm mb-8 font-light">如需详细的产品说明书 (TDS) 或安全说明书 (MSDS)，请联系我们。</p>
                <Link 
                  to="/contact"
                  className="w-full py-4 bg-white text-brand-dark rounded-2xl font-bold hover:bg-brand-blue hover:text-white transition-all inline-block"
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
