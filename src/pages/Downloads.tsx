import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FileText, Download, Shield, BookOpen, FileCheck, ArrowRight, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCMSAsset } from "../hooks/useCMSAsset";
import { useProducts } from "../hooks/useProducts";
import { useMemo } from "react";

export default function Downloads() {
  const { t } = useTranslation();
  const { publishedProducts: products, loading: productsLoading } = useProducts();

  const { value: downloadsHeroBg } = useCMSAsset('downloads_hero_bg', 'https://images.unsplash.com/photo-1542382156909-9ae38d3884c1?auto=format&fit=crop&q=80&w=1600');

  // Categorize products for download
  const productDownloads = useMemo(() => {
    const tdsItems = products
      .filter(p => p.tdsUrl)
      .map(p => ({
        name: `${p.name} TDS`,
        size: "检测中...",
        type: "PDF",
        url: p.tdsUrl,
        category: p.category
      }));

    const sdsItems = products
      .filter(p => p.sdsUrl)
      .map(p => ({
        name: `${p.name} SDS`,
        size: "检测中...",
        type: "PDF",
        url: p.sdsUrl,
        category: p.category
      }));

    // Group by series
    const categories: Record<string, any[]> = {};
    
    [...tdsItems, ...sdsItems].forEach(item => {
      const cat = item.category || "Other Series";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(item);
    });

    return Object.entries(categories).map(([name, items]) => ({
      category: name,
      items: items.slice(0, 8) // Limit display per category
    }));
  }, [products]);

  // Static corporate downloads
  const corporateDownloads = [
    {
      category: "企业画册 & 报告 (Corporate Brochures)",
      items: [
        { name: "西顿新材料企业宣传册 2024", size: "8.5 MB", type: "PDF", url: "#" },
        { name: "可持续发展年度报告", size: "5.2 MB", type: "PDF", url: "#" },
        { name: "产品应用综合手册", size: "12.4 MB", type: "PDF", url: "#" },
      ]
    }
  ];

  const allDownloads = [...productDownloads, ...corporateDownloads];

  const handleDownload = (url?: string, name?: string) => {
    if (!url || url === "#") {
      alert("抱歉，该文档暂未上传。如需获取请联系我们的客服人员。");
      return;
    }
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name || 'document'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        {productsLoading ? (
          <div className="flex flex-col items-center justify-center py-56">
            <Loader2 className="w-16 h-16 text-brand-blue animate-spin mb-8" />
            <p className="text-brand-dark/40 font-black uppercase tracking-widest text-[10px]">正在检索技术文档库...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-32">
            {allDownloads.map((category, idx) => (
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
                      <h3 className="text-xl font-black mb-4 tracking-tight group-hover:text-brand-blue transition-colors line-clamp-2 min-h-[3.5rem]">{item.name}</h3>
                      <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-brand-dark/30 mb-10">
                        <span>{item.type}</span>
                        <span>{item.size}</span>
                      </div>
                      <button 
                        onClick={() => handleDownload(item.url, item.name)}
                        className="w-full py-5 rounded-2xl bg-white border border-brand-border text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 group-hover:bg-brand-dark group-hover:text-white group-hover:border-brand-dark transition-all duration-500"
                      >
                        <Download size={16} />
                        Download Now
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
          <Link to="/contact" className="bg-brand-blue text-white px-16 py-8 rounded-full font-black text-xl hover:bg-white hover:text-brand-dark transition-all shadow-2xl shadow-brand-blue/20 inline-flex items-center gap-6 mx-auto">
            联系技术支持
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}
