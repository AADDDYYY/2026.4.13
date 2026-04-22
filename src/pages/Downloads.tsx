import { motion } from "motion/react";
import { FileText, Download, Shield, BookOpen, FileCheck, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCMSAsset } from "../hooks/useCMSAsset";

const downloads = [
  {
    category: "Technical Data Sheets (TDS)",
    items: [
      { name: "SEACRYL 1000 Series TDS", size: "1.2 MB", type: "PDF" },
      { name: "SEACRYL 2000 Series TDS", size: "1.4 MB", type: "PDF" },
      { name: "SEACRYL 3000 Series TDS", size: "1.1 MB", type: "PDF" },
      { name: "SEACRYL 5000 Series TDS", size: "1.5 MB", type: "PDF" },
    ]
  },
  {
    category: "Safety Data Sheets (MSDS)",
    items: [
      { name: "SEACRYL Water-based Resin MSDS", size: "2.1 MB", type: "PDF" },
      { name: "SEACRYL Additives MSDS", size: "1.8 MB", type: "PDF" },
    ]
  },
  {
    category: "Corporate Brochures",
    items: [
      { name: "SEACRYL Corporate Profile 2024", size: "8.5 MB", type: "PDF" },
      { name: "Sustainability Report 2023", size: "5.2 MB", type: "PDF" },
      { name: "Product Application Guide", size: "12.4 MB", type: "PDF" },
    ]
  }
];

export default function Downloads() {
  const { t } = useTranslation();

  const { value: downloadsHeroBg } = useCMSAsset('downloads_hero_bg', 'https://images.unsplash.com/photo-1542382156909-9ae38d3884c1?auto=format&fit=crop&q=80&w=1600');

  return (
    <div className="pt-24 md:pt-48 pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-56 relative">
        {downloadsHeroBg ? (
          <div className="absolute inset-0 -z-10 rounded-b-[100px] overflow-hidden opacity-20">
            <img src={downloadsHeroBg} alt="Downloads Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        ) : (
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-blue/5 rounded-full blur-[250px] -z-10"></div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl"
        >
          <div className="flex items-center gap-6 mb-16">
            <div className="h-px w-16 bg-brand-blue"></div>
            <span className="text-brand-blue font-black uppercase tracking-wider text-[11px]">
              Resource Center
            </span>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black mb-16 tracking-tight leading-[0.85]">
            下载中心<br />
            <span className="text-brand-blue tracking-normal">Download Center</span>
          </h1>
          <p className="text-brand-dark/40 text-2xl md:text-4xl font-light leading-relaxed max-w-5xl">
            获取最新的产品技术参数表、安全说明书以及企业宣传画册，为您的项目提供专业的数据支持。
          </p>
        </motion.div>
      </div>

      {/* Download Grid */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 gap-32">
          {downloads.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1 }}
            >
              <div className="flex items-center gap-8 mb-16">
                <h2 className="text-4xl font-black tracking-tight">{category.category}</h2>
                <div className="h-px flex-1 bg-brand-border"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx}
                    className="group bg-brand-gray p-12 rounded-[40px] border border-brand-border hover:bg-white hover:shadow-2xl transition-all duration-700"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-brand-blue mb-10 shadow-sm group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                      <FileText size={32} />
                    </div>
                    <h3 className="text-xl font-black mb-4 tracking-tight group-hover:text-brand-blue transition-colors">{item.name}</h3>
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-brand-dark/30 mb-10">
                      <span>{item.type}</span>
                      <span>{item.size}</span>
                    </div>
                    <button className="w-full py-5 rounded-2xl bg-white border border-brand-border text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 group-hover:bg-brand-dark group-hover:text-white group-hover:border-brand-dark transition-all duration-500">
                      <Download size={16} />
                      Download Now
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <section className="mt-56 py-48 bg-brand-dark text-white">
        <div className="max-w-[1800px] mx-auto px-6 md:px-20 text-center">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-16">
            需要更多技术支持？<br />
            <span className="text-brand-blue">Contact Our Experts</span>
          </h2>
          <p className="text-white/40 text-2xl mb-24 max-w-3xl mx-auto font-light">
            如果您没有找到所需的文档，或者需要针对特定应用的技术咨询，请随时联系我们的技术团队。
          </p>
          <button className="bg-brand-blue text-white px-16 py-8 rounded-full font-black text-xl hover:bg-white hover:text-brand-dark transition-all shadow-2xl shadow-brand-blue/20 flex items-center gap-6 mx-auto">
            联系技术支持
            <ArrowRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
}
