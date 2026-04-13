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
      <div className="pt-32 pb-24 bg-white min-h-screen text-brand-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-8">{t("common.not_found", "未找到该应用领域")}</h1>
          <Link to="/market-applications" className="text-brand-blue hover:underline font-bold text-[11px] uppercase tracking-widest">{t("market_apps.hero.title")}</Link>
        </div>
      </div>
    );
  }

  const Icon = data.icon;
  const tId = id === "sports" ? "industrial" : id; // Mapping sports to industrial in market_data

  return (
    <div className="bg-white min-h-screen text-brand-dark pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img 
          src={data.heroImage} 
          alt={t(`market_apps.items.${id}.title`)} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="max-w-[1800px] mx-auto px-6 md:px-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link 
                to="/market-applications" 
                className="inline-flex items-center gap-4 text-brand-dark/60 hover:text-brand-blue mb-12 transition-colors group font-bold text-[11px] uppercase tracking-widest"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
                {t("market_apps.hero.title")}
              </Link>
              <div className="flex items-center gap-10 mb-8">
                <div className="p-6 bg-brand-blue rounded-[32px] shadow-2xl shadow-brand-blue/20 text-white">
                  <Icon size={40} />
                </div>
                <div>
                  <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-tight">{t(`market_apps.items.${id}.title`)}</h1>
                  <p className="text-brand-blue font-bold uppercase tracking-widest text-[11px] mt-4">{data.en}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="mb-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px w-12 bg-brand-blue"></div>
                <h2 className="text-brand-blue font-bold uppercase tracking-widest text-[11px]">{t("common.overview", "行业概览")}</h2>
              </div>
              <p className="text-brand-dark/60 text-2xl md:text-3xl font-light leading-relaxed">
                {t(`market_data.${tId}.overview`)}
              </p>
            </section>

            <section className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-12 bg-brand-blue"></div>
                <h2 className="text-brand-blue font-bold uppercase tracking-widest text-[11px]">{t("home.rd.title", "核心优势")}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(t(`market_data.${tId}.coreAdvantages`, { returnObjects: true }) as any[]).map((adv, idx) => (
                  <div key={idx} className="p-10 rounded-[40px] bg-brand-gray border border-brand-border hover:border-brand-blue/30 transition-all duration-700 group shadow-sm">
                    <h3 className="text-2xl font-black mb-6 text-brand-dark group-hover:text-brand-blue transition-colors">{adv.title}</h3>
                    <p className="text-brand-dark/50 text-base font-medium leading-relaxed">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-12 bg-brand-blue"></div>
                <h2 className="text-brand-blue font-bold uppercase tracking-widest text-[11px]">{t("common.challenges", "行业挑战")}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(t(`market_data.${tId}.challenges`, { returnObjects: true }) as string[]).map((challenge, idx) => (
                  <div key={idx} className="p-10 rounded-[40px] bg-brand-gray border border-brand-border flex gap-8 items-start group hover:border-brand-blue/30 transition-all duration-700 shadow-sm">
                    <ShieldAlert className="text-brand-blue shrink-0 mt-1" size={24} />
                    <p className="text-brand-dark/50 font-medium text-lg leading-relaxed group-hover:text-brand-dark transition-colors">{challenge}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl font-black mb-10 border-l-4 border-brand-blue pl-6">{t("common.solutions", "解决方案")}</h2>
              <div className="space-y-8">
                {(t(`market_data.${tId}.solutions`, { returnObjects: true }) as any[]).map((solution, idx) => (
                  <div key={idx} className="p-10 rounded-[40px] bg-brand-gray border border-brand-border shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <Zap className="text-brand-blue" size={24} />
                      <h3 className="text-2xl font-black">{solution.title}</h3>
                    </div>
                    <p className="text-brand-dark/50 mb-8 font-medium leading-relaxed">
                      {solution.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {solution.products.map((product: string) => (
                        <Link 
                          key={product}
                          to="/products"
                          className="px-5 py-2 rounded-full bg-white border border-brand-border text-brand-blue text-xs font-bold hover:bg-brand-blue hover:text-white transition-all shadow-sm"
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
            <div className="sticky top-32 space-y-12">
              <div className="p-10 rounded-[40px] bg-brand-blue text-white shadow-xl shadow-brand-blue/20">
                <h3 className="text-2xl font-black mb-8">{t("common.benefits", "核心价值")}</h3>
                <ul className="space-y-6">
                  {(t(`market_data.${tId}.benefits`, { returnObjects: true }) as string[]).map((benefit, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <CheckCircle2 className="shrink-0 mt-1" size={20} />
                      <span className="font-bold">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {data.gallery.map((img, idx) => (
                  <div key={idx} className="rounded-3xl overflow-hidden aspect-square border border-brand-border shadow-sm">
                    <img 
                      src={img} 
                      alt="Gallery" 
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              <div className="p-10 rounded-[40px] border border-brand-border bg-brand-gray text-center shadow-sm">
                <h4 className="font-black mb-4">{t("common.need_support", "需要技术支持？")}</h4>
                <p className="text-brand-dark/40 text-sm mb-8 font-bold">{t("common.support_desc", "我们的专家团队随时为您提供专业的咨询与定制化服务。")}</p>
                <Link 
                  to="/contact"
                  className="w-full py-5 bg-brand-blue text-white rounded-2xl font-bold hover:bg-brand-blue/90 transition-all inline-block shadow-lg shadow-brand-blue/20"
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
