import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Tag, Share2, Printer, Bookmark } from "lucide-react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  type: string;
  date: string;
  summary: string;
  content?: string;
  image: string;
}

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchNews() {
      if (!id) return;
      try {
        const snap = await getDoc(doc(db, "news", id));
        if (snap.exists()) {
          setItem({ id: snap.id, ...snap.data() } as NewsItem);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-48 flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen pt-48 text-center bg-white">
        <h1 className="text-4xl font-black mb-8">资讯不存在</h1>
        <Link to="/news" className="text-brand-blue font-bold">返回资讯列表</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-48 pb-32 bg-white min-h-screen text-brand-dark overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <Link to="/news" className="inline-flex items-center gap-6 text-brand-dark/40 hover:text-brand-blue transition-colors mb-24 group">
          <ArrowLeft size={24} className="group-hover:-translate-x-3 transition-transform" />
          <span className="text-[11px] font-black uppercase tracking-[0.3em]">Back to News</span>
        </Link>

        {/* Hero Meta */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-12">
             <span className="px-6 py-2 bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-brand-blue/20">
               {t(`news_page.filters.${item.type}`)}
             </span>
             <span className="w-1.5 h-1.5 rounded-full bg-brand-border"></span>
             <span className="text-brand-dark/40 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
               <Clock size={12} /> {item.date}
             </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-12 tracking-tight leading-tight">
            {item.title}
          </h1>
          <p className="text-brand-dark/40 text-xl font-medium leading-relaxed border-l-4 border-brand-blue pl-10">
            {item.summary}
          </p>
        </div>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="aspect-video rounded-[60px] overflow-hidden mb-24 shadow-2xl relative"
        >
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8">
            <div className="prose prose-xl prose-brand max-w-none prose-headings:font-black prose-p:font-medium prose-p:text-brand-dark/70 prose-img:rounded-3xl prose-img:shadow-2xl">
              <ReactMarkdown>{item.content || item.summary}</ReactMarkdown>
            </div>
            
            <div className="mt-24 pt-24 border-t border-brand-border flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30">Category:</span>
                 <span className="px-4 py-1.5 bg-brand-gray border border-brand-border rounded-lg text-[10px] font-black uppercase tracking-widest text-brand-dark/40">
                   {t(`news_page.filters.${item.category}`)}
                 </span>
               </div>
               
               <div className="flex items-center gap-4">
                 <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-gray border border-brand-border text-brand-dark/40 hover:text-brand-blue transition-colors">
                   <Share2 size={20} />
                 </button>
                 <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-gray border border-brand-border text-brand-dark/40 hover:text-brand-blue transition-colors">
                   <Bookmark size={20} />
                 </button>
               </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-brand-gray border border-brand-border rounded-[40px] p-12 sticky top-32">
               <h3 className="text-xl font-black mb-8 tracking-tight">Need technical support?</h3>
               <p className="text-sm font-medium text-brand-dark/50 leading-relaxed mb-10">
                 Our technical experts are available to provide professional advice on your R&D projects.
               </p>
               <Link 
                 to="/contact"
                 className="block w-full py-5 bg-brand-blue text-white text-center rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand-blue/20"
               >
                 Contact Expert
               </Link>
               
               <div className="mt-12 pt-12 border-t border-brand-border space-y-4">
                 <button className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-brand-dark/40 hover:text-brand-blue transition-colors">
                   <span>Print this article</span>
                   <Printer size={14} />
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
