import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Plus, Edit2, Trash2, Clock, Tag, ExternalLink, Newspaper, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import NewsFormModal from './NewsFormModal';

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  type: 'press_release' | 'article';
  date: string;
  summary: string;
  content?: string;
  image: string;
  status?: 'published' | 'draft';
  createdAt?: any;
}

export default function NewsManagement() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NewsItem));
      setNews(newsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('确定要删除这条新闻吗？')) {
      try {
        await deleteDoc(doc(db, 'news', id));
      } catch (err) {
        console.error('Delete error:', err);
        alert('删除失败');
      }
    }
  };

  return (
    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-2 h-8 bg-brand-blue rounded-full"></div>
          <div>
            <h2 className="text-3xl font-black text-brand-dark flex items-center gap-3">
              <Newspaper size={28} className="text-brand-blue" /> 新闻与见解管理 (News & Insights)
            </h2>
            <p className="text-brand-dark/40 text-[11px] font-black uppercase tracking-widest mt-1">Content Management System</p>
          </div>
        </div>
        
        <button 
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="px-8 py-3 bg-brand-blue text-white rounded-xl font-black text-[12px] uppercase tracking-widest hover:bg-brand-dark transition-all shadow-lg shadow-brand-blue/20 flex items-center gap-2 shrink-0"
        >
          <Plus size={16} /> 发布新资讯
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-brand-border overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-brand-gray/50 text-brand-dark/30 text-[9px] font-black uppercase tracking-widest border-b border-brand-border">
              <th className="px-8 py-6">发布日期</th>
              <th className="px-8 py-6">预览</th>
              <th className="px-8 py-6">标题与摘要</th>
              <th className="px-8 py-6">分类 / 类型</th>
              <th className="px-8 py-6">状态</th>
              <th className="px-8 py-6 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="text-brand-dark text-[13px] font-medium">
            {news.map((item) => (
              <tr key={item.id} className={`border-b border-brand-border/50 hover:bg-brand-gray/30 transition-colors ${item.status === 'draft' ? 'opacity-60 bg-brand-gray/10' : ''}`}>
                <td className="px-8 py-6 text-brand-dark/40 font-mono text-[11px]">
                  {item.date}
                </td>
                <td className="px-8 py-6">
                  <div className="w-16 h-10 rounded-lg overflow-hidden border border-brand-border bg-brand-gray">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-8 py-6 max-w-md">
                  <div className="font-black text-brand-dark mb-1 line-clamp-1">{item.title}</div>
                  <div className="text-[11px] text-brand-dark/40 line-clamp-1">{item.summary}</div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="px-2 py-0.5 bg-brand-blue/5 text-brand-blue text-[9px] font-black uppercase tracking-widest border border-brand-blue/10 rounded w-fit">
                      {item.category}
                    </span>
                    <span className="text-[9px] font-bold text-brand-dark/20 uppercase tracking-widest">
                      {item.type === 'press_release' ? '新闻动态' : '技术文章'}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${item.status === 'draft' ? 'text-brand-dark/30' : 'text-emerald-500'}`}>
                    {item.status === 'draft' ? <EyeOff size={10} /> : <Eye size={10} />}
                    {item.status === 'draft' ? '草稿' : '已发布'}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => {
                        setEditingItem(item);
                        setIsModalOpen(true);
                      }}
                      className="w-10 h-10 flex items-center justify-center text-brand-dark/20 hover:text-brand-blue hover:bg-brand-blue/5 rounded-xl transition-all"
                      title="编辑"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="w-10 h-10 flex items-center justify-center text-brand-dark/20 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="删除"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && news.length === 0 && (
              <tr>
                <td colSpan={6} className="px-8 py-32 text-center">
                  <div className="max-w-xs mx-auto text-brand-dark/20">
                    <Newspaper size={48} className="mx-auto mb-6 opacity-20" />
                    <p className="text-sm font-black uppercase tracking-widest">暂无资讯内容</p>
                    <p className="text-xs font-medium mt-2">Start adding news or technical articles to your site.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <NewsFormModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            editingItem={editingItem} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
