import { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase';
import { setDoc, doc, collection, serverTimestamp } from 'firebase/firestore';
import { X, Save, UploadCloud, Camera, Eye, EyeOff, Newspaper, Clock, Hash, AlignLeft, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { NewsItem } from './NewsManagement';
import { compressImage } from '../../utils/compressImage';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import ImageCropperModal from './ImageCropperModal';

interface NewsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: NewsItem | null;
}

export default function NewsFormModal({ isOpen, onClose, editingItem }: NewsFormModalProps) {
  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: '',
    category: 'corporate',
    type: 'press_release',
    date: new Date().toISOString().split('T')[0],
    summary: '',
    content: '',
    image: '',
    status: 'published'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cropperImage, setCropperImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
      setImagePreview(editingItem.image);
    } else {
      setFormData({
        title: '',
        category: 'corporate',
        type: 'press_release',
        date: new Date().toISOString().split('T')[0],
        summary: '',
        content: '',
        image: '',
        status: 'published'
      });
      setImagePreview(null);
    }
  }, [editingItem, isOpen]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropperImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCropComplete = async (croppedBase64: string) => {
    setIsSaving(true);
    try {
      const { uploadFileToCloud } = await import('../../utils/fileUpload');
      const publicUrl = await uploadFileToCloud(croppedBase64, 'news', true);
      setImagePreview(publicUrl);
      setFormData(prev => ({ ...prev, image: publicUrl }));
    } catch(err) {
      console.error('Image upload failed', err);
      alert('图片上传失败');
    } finally {
      setIsSaving(false);
      setCropperImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      alert('请填写标题并上传封面图');
      return;
    }

    setIsSaving(true);
    try {
      const newsId = editingItem?.id || `news-${Date.now()}`;
      const payload = {
        ...formData,
        status: formData.status || 'published',
        date: formData.date || new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString()
      };

      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('news').upsert({
          id: newsId,
          ...payload
        });
        if (error) throw error;
      } else {
        await setDoc(doc(db, 'news', newsId), {
          ...payload,
          updatedAt: serverTimestamp(),
        }, { merge: true });
      }
      
      onClose();
    } catch (err) {
      console.error('Save news error:', err);
      alert('保存失败');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-brand-dark/80 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative z-10 pointer-events-auto"
      >
        {cropperImage && (
          <ImageCropperModal 
            image={cropperImage}
            onClose={() => setCropperImage(null)}
            onCropComplete={handleImageCropComplete}
            aspect={16/9}
          />
        )}
        {/* Header */}
        <div className="px-6 md:px-10 py-6 md:py-8 border-b border-brand-border flex items-center justify-between bg-white sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-blue/10 rounded-xl md:rounded-2xl flex items-center justify-center text-brand-blue border border-brand-blue/20">
              <Newspaper className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-brand-dark tracking-tight">
                {editingItem ? '编辑资讯内容' : '发布新资讯'}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <button 
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, status: p.status === 'published' ? 'draft' : 'published' }))}
                  className={`flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-colors ${formData.status === 'published' ? 'text-emerald-500' : 'text-brand-dark/30'}`}
                >
                  {formData.status === 'published' ? <Eye size={12} /> : <EyeOff size={12} />}
                  {formData.status === 'published' ? '已发布' : '设为草稿'}
                </button>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl hover:bg-brand-gray transition-colors text-brand-dark/20 hover:text-brand-dark"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 md:space-y-10 custom-scrollbar">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
            {/* Left Column: Image & Meta */}
            <div className="lg:col-span-4 space-y-6 md:space-y-8">
              <div>
                <label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest text-brand-dark/40 mb-3 md:mb-4">资讯封面图</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-[16/9] lg:aspect-[4/3] rounded-2xl md:rounded-3xl border-2 border-dashed border-brand-border bg-brand-gray/30 hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all cursor-pointer group flex flex-col items-center justify-center relative overflow-hidden"
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 md:w-10 md:h-10 text-brand-dark/10 group-hover:text-brand-blue/40 transition-colors mb-2 md:mb-4" />
                      <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brand-dark/30 text-center px-4">点击或拖拽上传</p>
                    </>
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest text-brand-dark/40 mb-2 md:mb-3 flex items-center gap-2">
                    <Clock size={12} /> 发布日期
                  </label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                    className="w-full px-4 md:px-5 py-3 md:py-4 bg-brand-gray border border-brand-border rounded-xl text-sm focus:border-brand-blue outline-none transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest text-brand-dark/40 mb-2 md:mb-3 flex items-center gap-2">
                    <Hash size={12} /> 所属分类
                  </label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 md:px-5 py-3 md:py-4 bg-brand-gray border border-brand-border rounded-xl text-sm focus:border-brand-blue outline-none transition-all font-black uppercase tracking-widest"
                  >
                    <option value="corporate">公司动态 Corporate</option>
                    <option value="leather">皮革应用 Leather</option>
                    <option value="packaging">包装印刷 Packaging</option>
                    <option value="coatings">工业涂料 Coatings</option>
                    <option value="sustainability">可持续发展 Sustainability</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest text-brand-dark/40 mb-2 md:mb-3 flex items-center gap-2">
                    <AlignLeft size={12} /> 内容类型
                  </label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData(p => ({ ...p, type: e.target.value as any }))}
                    className="w-full px-4 md:px-5 py-3 md:py-4 bg-brand-gray border border-brand-border rounded-xl text-sm focus:border-brand-blue outline-none transition-all font-black uppercase tracking-widest"
                  >
                    <option value="press_release">新闻稿 News</option>
                    <option value="article">技术文章 Tech</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column: Title & Content */}
            <div className="lg:col-span-8 space-y-6 md:space-y-8">
              <div>
                <label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest text-brand-dark/40 mb-2 md:mb-3">资讯标题 (Headline)</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                  placeholder="请输入标题..."
                  className="w-full px-4 md:px-6 py-3 md:py-5 bg-brand-gray border border-brand-border rounded-xl md:rounded-2xl text-lg md:text-xl font-black focus:border-brand-blue outline-none transition-all placeholder:text-brand-dark/10"
                />
              </div>

              <div>
                <label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest text-brand-dark/40 mb-2 md:mb-3">内容摘要 (Summary)</label>
                <textarea 
                  value={formData.summary}
                  onChange={e => setFormData(p => ({ ...p, summary: e.target.value }))}
                  rows={3}
                  placeholder="简短的资讯介绍..."
                  className="w-full px-4 md:px-6 py-3 md:py-5 bg-brand-gray border border-brand-border rounded-xl md:rounded-2xl text-sm leading-relaxed focus:border-brand-blue outline-none transition-all resize-none placeholder:text-brand-dark/10 font-medium"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest text-brand-dark/40">正文内容 (Markdown)</label>
                  <span className="text-[9px] md:text-[10px] text-brand-blue font-bold flex items-center gap-1"><Info size={10} /> Markdown</span>
                </div>
                <textarea 
                  value={formData.content}
                  onChange={e => setFormData(p => ({ ...p, content: e.target.value }))}
                  rows={10}
                  placeholder="输入正文内容..."
                  className="w-full px-4 md:px-6 py-4 md:py-5 bg-brand-gray border border-brand-border rounded-xl md:rounded-2xl text-sm leading-relaxed focus:border-brand-blue outline-none transition-all resize-none placeholder:text-brand-dark/10 font-mono"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 md:px-10 py-6 md:py-8 border-t border-brand-border bg-brand-gray/30 flex flex-col sm:flex-row justify-between gap-6 items-center shrink-0">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-brand-dark/20 text-center sm:text-left">
            <Save size={12} /> 实时同步至官网
          </p>
          <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 md:px-8 py-3 md:py-4 bg-white border border-brand-border text-brand-dark rounded-xl md:rounded-2xl font-black text-[11px] md:text-[12px] uppercase tracking-widest hover:bg-brand-gray transition-all flex-1 sm:flex-none"
            >
              取消
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 md:px-12 py-3 md:py-4 bg-brand-blue text-white rounded-xl md:rounded-2xl font-black text-[11px] md:text-[12px] uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-3 disabled:opacity-50 flex-1 sm:flex-none"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  保存中
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 md:w-4.5 md:h-4.5" />
                  保存发布
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
