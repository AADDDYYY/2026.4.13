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
      <div className="pt-32 pb-24 bg-[#050a14] min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t("common.not_found", "未找到该应用领域")}</h1>
          <Link to="/market-applications" className="text-brand-blue hover:underline">{t("market_apps.hero.title")}</Link>
        </div>
      </div>
    );
  }

  const Icon = data.icon;
  const tId = id === "sports" ? "industrial" : id; // Mapping sports to industrial in market_data

  return (
    <div className="bg-[#050a14] min-h-screen text-white pb-24">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <img 
          src={data.heroImage} 
          alt={t(`market_apps.items.${id}.title`)} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/40 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                to="/market-applications" 
                className="inline-flex items-center gap-2 text-white/60 hover:text-brand-blue mb-8 transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {t("market_apps.hero.title")}
              </Link>
              <div className="flex items-center gap-6 mb-6">
                <div className="p-4 bg-brand-blue rounded-2xl">
                  <Icon size={32} />
                </div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">{t(`market_apps.items.${id}.title`)}</h1>
                  <p className="text-brand-blue font-bold uppercase tracking-[0.3em] text-xs mt-2">{data.en}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-8 border-l-4 border-brand-blue pl-6">{t("common.overview", "行业概览")}</h2>
              <p className="text-white/50 text-xl font-light leading-relaxed">
                {t(`market_data.${tId}.overview`)}
              </p>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-10 border-l-4 border-brand-blue pl-6">{t("home.rd.title", "核心优势")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(t(`market_data.${tId}.coreAdvantages`, { returnObjects: true }) as any[]).map((adv, idx) => (
                  <div key={idx} className="p-8 rounded-3xl bg-brand-blue/5 border border-brand-blue/10 hover:bg-brand-blue/10 transition-all duration-500 group">
                    <h3 className="text-xl font-bold mb-4 text-brand-blue group-hover:translate-x-1 transition-transform">{adv.title}</h3>
                    <p className="text-white/40 text-sm font-light leading-relaxed">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-10 border-l-4 border-brand-blue pl-6">{t("common.challenges", "行业挑战")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(t(`market_data.${tId}.challenges`, { returnObjects: true }) as string[]).map((challenge, idx) => (
                  <div key={idx} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex gap-4 items-start">
                    <ShieldAlert className="text-brand-blue shrink-0" size={24} />
                    <p className="text-white/60 font-light">{challenge}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-10 border-l-4 border-brand-blue pl-6">{t("common.solutions", "解决方案")}</h2>
              <div className="space-y-8">
                {(t(`market_data.${tId}.solutions`, { returnObjects: true }) as any[]).map((solution, idx) => (
                  <div key={idx} className="p-10 rounded-[40px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                    <div className="flex items-center gap-4 mb-6">
                      <Zap className="text-brand-blue" size={24} />
                      <h3 className="text-2xl font-bold">{solution.title}</h3>
                    </div>
                    <p className="text-white/40 mb-8 font-light leading-relaxed">
                      {solution.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {solution.products.map((product: string) => (
                        <Link 
                          key={product}
                          to="/products"
                          className="px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold hover:bg-brand-blue hover:text-white transition-all"
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
              <div className="p-10 rounded-[40px] bg-brand-blue text-white">
                <h3 className="text-2xl font-bold mb-8">{t("common.benefits", "核心价值")}</h3>
                <ul className="space-y-6">
                  {(t(`market_data.${tId}.benefits`, { returnObjects: true }) as string[]).map((benefit, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <CheckCircle2 className="shrink-0 mt-1" size={20} />
                      <span className="font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {data.gallery.map((img, idx) => (
                  <div key={idx} className="rounded-3xl overflow-hidden aspect-square border border-white/10">
                    <img 
                      src={img} 
                      alt="Gallery" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              <div className="p-10 rounded-[40px] border border-white/10 bg-white/[0.02] text-center">
                <h4 className="font-bold mb-4">{t("common.need_support", "需要技术支持？")}</h4>
                <p className="text-white/40 text-sm mb-8 font-light">{t("common.support_desc", "我们的专家团队随时为您提供专业的咨询与定制化服务。")}</p>
                <Link 
                  to="/contact"
                  className="w-full py-4 bg-white text-brand-dark rounded-2xl font-bold hover:bg-brand-blue hover:text-white transition-all inline-block"
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
