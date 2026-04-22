import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { marketApplicationsData } from "../data/marketData";
import { ArrowLeft, CheckCircle2, ShieldAlert, Zap, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const data = id ? marketApplicationsData[id] : null;

  if (!data) {
    return (
      <div className="pt-24 md:pt-48 pb-24 bg-white min-h-screen text-brand-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-8">{t("common.not_found", "未找到该应用领域")}</h1>
          <Link to="/market-applications" className="text-brand-blue hover:underline font-bold text-[11px] uppercase tracking-widest">{t("market_apps.hero.title")}</Link>
        </div>
      </div>
    );
  }

  const Icon = data.icon;
  const tId = id;

  return (
    <div className="bg-white min-h-screen text-brand-dark pb-32 overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[80vh] min-h-[700px] overflow-hidden">
        <img 
          src={data.heroImage} 
          alt={t(`market_apps.items.${id}.title`)} 
          className="w-full h-full object-cover scale-105 img-enhance"
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
                to="/market-applications" 
                className="inline-flex items-center gap-6 text-brand-dark/40 hover:text-brand-blue mb-16 transition-colors group font-black text-[11px] uppercase tracking-[0.3em]"
              >
                <ArrowLeft size={24} className="group-hover:-translate-x-3 transition-transform" />
                {t("market_apps.hero.title")}
              </Link>
              <div className="flex flex-col md:flex-row md:items-center gap-12 mb-12">
                <div className="p-10 bg-brand-blue rounded-[40px] shadow-2xl shadow-brand-blue/30 text-white w-fit">
                  <Icon size={48} />
                </div>
                <div>
                  <h1 className="text-6xl md:text-[10rem] font-black tracking-tight leading-[0.85]">{t(`market_apps.items.${id}.title`)}</h1>
                  <p className="text-brand-blue font-black uppercase tracking-widest text-[12px] mt-8">{data.en}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mt-24 md:mt-48">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-32">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="mb-48">
              <div className="flex items-center gap-6 mb-12">
                <div className="h-px w-16 bg-brand-blue"></div>
                <h2 className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px]">{t("common.overview", "行业概览")}</h2>
              </div>
              <p className="text-brand-dark/40 text-3xl md:text-5xl font-light leading-relaxed">
                {t(`market_data.${tId}.overview`)}
              </p>
            </section>

            <section className="mb-48">
              <div className="flex items-center gap-6 mb-16">
                <div className="h-px w-16 bg-brand-blue"></div>
                <h2 className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px]">{t("home.rd.title", "核心优势")}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {(t(`market_data.${tId}.coreAdvantages`, { returnObjects: true }) as any[]).map((adv, idx) => (
                  <div key={idx} className="p-12 rounded-[60px] bg-brand-gray border border-brand-border hover:border-brand-blue/30 transition-all duration-700 group shadow-sm">
                    <h3 className="text-3xl font-black mb-8 text-brand-dark group-hover:text-brand-blue transition-colors tracking-tight">{adv.title}</h3>
                    <p className="text-brand-dark/40 text-lg font-medium leading-relaxed">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-48">
              <div className="flex items-center gap-6 mb-16">
                <div className="h-px w-16 bg-brand-blue"></div>
                <h2 className="text-brand-blue font-black uppercase tracking-[0.3em] text-[11px]">{t("common.challenges", "行业挑战")}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {(t(`market_data.${tId}.challenges`, { returnObjects: true }) as string[]).map((challenge, idx) => (
                  <div key={idx} className="p-12 rounded-[60px] bg-brand-gray border border-brand-border flex gap-10 items-start group hover:border-brand-blue/30 transition-all duration-700 shadow-sm">
                    <ShieldAlert className="text-brand-blue shrink-0 mt-1" size={32} />
                    <p className="text-brand-dark/40 font-medium text-xl leading-relaxed group-hover:text-brand-dark transition-colors">{challenge}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-32">
              <h2 className="text-5xl font-black mb-16 border-l-8 border-brand-blue pl-10 tracking-tighter">{t("common.solutions", "解决方案")}</h2>
              <div className="space-y-12">
                {(t(`market_data.${tId}.solutions`, { returnObjects: true }) as any[]).map((solution, idx) => (
                  <div key={idx} className="p-12 md:p-20 rounded-[60px] bg-brand-gray border border-brand-border shadow-2xl group hover:border-brand-blue/30 transition-all duration-700">
                    <div className="flex items-center gap-8 mb-10">
                      <Zap className="text-brand-blue" size={32} />
                      <h3 className="text-4xl font-black tracking-tight">{solution.title}</h3>
                    </div>
                    <p className="text-brand-dark/40 mb-12 font-medium text-xl leading-relaxed">
                      {solution.desc}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {solution.products.map((product: string) => (
                        <Link 
                          key={product}
                          to={`/products?industry=${id}&search=${product}`}
                          className="px-8 py-3 rounded-full bg-white border border-brand-border text-brand-blue text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-blue hover:text-white transition-all shadow-sm"
                        >
                          {product}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-48 space-y-16">
              <div className="p-12 md:p-16 rounded-[60px] bg-brand-blue text-white shadow-2xl shadow-brand-blue/30">
                <h3 className="text-3xl font-black mb-12 tracking-tight">{t("common.benefits", "核心价值")}</h3>
                <ul className="space-y-8">
                  {(t(`market_data.${tId}.benefits`, { returnObjects: true }) as string[]).map((benefit, idx) => (
                    <li key={idx} className="flex gap-6 items-start">
                      <CheckCircle2 className="shrink-0 mt-1" size={24} />
                      <span className="font-black text-lg leading-tight tracking-tight">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 gap-10">
                {data.gallery.map((img, idx) => (
                  <div key={idx} className="rounded-[40px] overflow-hidden aspect-square border border-brand-border shadow-2xl group">
                    <img 
                      src={img} 
                      alt="Gallery" 
                      className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100 img-enhance"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              <div className="p-12 md:p-16 rounded-[60px] border border-brand-border bg-brand-gray text-center shadow-2xl">
                <h4 className="text-3xl font-black mb-6 tracking-tight">{t("common.need_support", "需要技术支持？")}</h4>
                <p className="text-brand-dark/30 text-base mb-12 font-black uppercase tracking-[0.1em]">{t("common.support_desc", "我们的专家团队随时为您提供专业的咨询与定制化服务。")}</p>
                <Link 
                  to="/contact"
                  className="w-full py-8 bg-brand-blue text-white rounded-3xl font-black uppercase tracking-[0.3em] text-[12px] hover:bg-brand-dark transition-all inline-block shadow-2xl shadow-brand-blue/30"
                >
                  {t("common.consult_now", "立即咨询")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
