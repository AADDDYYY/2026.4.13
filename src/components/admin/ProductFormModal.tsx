import { useState, useEffect, useRef } from 'react';
import { Product } from '../../data/products';
import { X, Save, Plus, Trash2, FlaskConical, TestTube2, Thermometer, Droplets, Info, LayoutGrid, FileText, UploadCloud, FileCheck, Image as ImageIcon, Camera, Eye, EyeOff, Flame, RefreshCw } from 'lucide-react';
import { compressImage } from '../../utils/compressImage';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import ImageCropperModal from './ImageCropperModal';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => Promise<void>;
  initialProduct?: Product | null;
}

const emptyProduct: Product = {
  id: '',
  name: '',
  type: '',
  category: '',
  divisions: [],
  appearance: '',
  solidContent: '',
  pH: '',
  viscosity: '',
  tg: '',
  mfft: '',
  hydroxylValue: '',
  features: [],
  substrates: {
    metal: false,
    plastic: false,
    ink: false,
    wood: false,
    leather: false
  },
  description: '',
  image: 'https://picsum.photos/seed/chemical/800/600',
  tdsUrl: '',
  sdsUrl: '',
  is_hot: false
};

export default function ProductFormModal({ isOpen, onClose, onSave, initialProduct }: ProductFormModalProps) {
  const [formData, setFormData] = useState<Product>(emptyProduct);
  const [activeTab, setActiveTab] = useState<'basic' | 'tech' | 'performance'>('basic');
  const [newFeature, setNewFeature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [cropperImage, setCropperImage] = useState<string | null>(null);
  const tdsInputRef = useRef<HTMLInputElement>(null);
  const sdsInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const uploadToSupabase = async (base64OrFile: string | File, bucket: string): Promise<string> => {
    if (!isSupabaseConfigured()) throw new Error('Supabase not configured');
    
    let fileToUpload: File | Blob;
    if (typeof base64OrFile === 'string' && base64OrFile.startsWith('data:')) {
      const res = await fetch(base64OrFile);
      fileToUpload = await res.blob();
    } else {
      fileToUpload = base64OrFile as File;
    }

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.jpg`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileToUpload);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCropperImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageCropComplete = async (croppedBase64: string) => {
    setIsUploading(true);
    try {
      if (isSupabaseConfigured()) {
        const publicUrl = await uploadToSupabase(croppedBase64, 'products');
        setFormData({ ...formData, image: publicUrl });
      } else {
        setFormData({ ...formData, image: croppedBase64 });
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('图片上传失败');
    } finally {
      setIsUploading(false);
      setCropperImage(null);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'tdsUrl' | 'sdsUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      if (isSupabaseConfigured()) {
        const publicUrl = await uploadToSupabase(file, 'products');
        setFormData({ ...formData, [field]: publicUrl });
      } else {
        if (file.size > 1024 * 1024) { 
          alert('文件太大！由于数据库限制，请上传小于 1MB 的 PDF 文档或启用 Supabase 存储。');
          return;
        }
        const reader = new FileReader();
        reader.onload = (upload) => {
          setFormData({ ...formData, [field]: upload.target?.result as string });
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
       console.error('File upload failed:', error);
       alert('文档上传失败');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (initialProduct) {
      setFormData(initialProduct);
    } else {
      setFormData({ ...emptyProduct, id: `prod-${Date.now()}` });
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubstrateChange = (key: keyof typeof formData.substrates) => {
    setFormData({
      ...formData,
      substrates: {
        ...formData.substrates,
        [key]: !formData.substrates[key]
      }
    });
  };

  const handleAddDivision = (div: string) => {
    if (!formData.divisions.includes(div)) {
      setFormData({ ...formData, divisions: [...formData.divisions, div] });
    }
  };

  const handleRemoveDivision = (div: string) => {
    setFormData({ ...formData, divisions: formData.divisions.filter(d => d !== div) });
  };

  const handleAddFeature = () => {
    if (newFeature && !formData.features.includes(newFeature)) {
      setFormData({ ...formData, features: [...formData.features, newFeature] });
      setNewFeature('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error(error);
      alert('保存失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  const divisionsList = [
    "塑胶涂料树脂事业部",
    "印刷油墨树脂事业部",
    "木器涂料树脂事业部",
    "金属 / 薄膜涂料树脂事业部",
    "皮革 / 纺织 / 胶粘剂树脂事业部"
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 text-brand-dark">
      <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        {cropperImage && (
          <ImageCropperModal 
            image={cropperImage}
            onClose={() => setCropperImage(null)}
            onCropComplete={handleImageCropComplete}
            aspect={4/3}
          />
        )}
        <div className="p-8 border-b border-brand-border bg-brand-gray/30 text-brand-dark">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black">
                {initialProduct ? '编辑产品详情' : '添加新产品'}
              </h2>
              <p className="text-[10px] uppercase font-black tracking-widest text-brand-dark/40 mt-1">Configure Technical Data Sheets</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 bg-white px-5 py-2 rounded-2xl border border-brand-border shadow-sm">
                <div className="flex items-center gap-2 pr-4 border-r border-brand-border">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40">推荐置顶:</span>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, is_hot: !formData.is_hot})}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
                      formData.is_hot 
                        ? 'bg-orange-50 text-orange-600 border border-orange-100 shadow-sm' 
                        : 'bg-brand-gray text-brand-dark/30 border border-brand-border'
                    }`}
                  >
                    <Flame size={12} className={formData.is_hot ? "animate-pulse" : ""} />
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      {formData.is_hot ? '热门产品' : '普通'}
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40">发布状态:</span>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, status: formData.status === 'draft' ? 'published' : 'draft'})}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
                      formData.status !== 'draft' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-brand-dark text-white'
                    }`}
                  >
                    {formData.status !== 'draft' ? <Eye size={12} /> : <EyeOff size={12} />}
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      {formData.status !== 'draft' ? '已上架' : '已下架'}
                    </span>
                  </button>
                </div>
              </div>
              <button 
                type="button"
                onClick={onClose} 
                className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-full transition-colors text-brand-dark/20 hover:text-brand-dark"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-2 p-1 bg-brand-gray/50 rounded-2xl w-fit border border-brand-border/50">
            {[
              { id: 'basic', label: '核心信息', icon: Info },
              { id: 'tech', label: '技术指标', icon: FlaskConical },
              { id: 'performance', label: '性能应用', icon: LayoutGrid },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-brand-blue shadow-sm ring-1 ring-brand-blue/10' 
                    : 'text-brand-dark/40 hover:text-brand-dark hover:bg-white/50'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <form id="product-form" onSubmit={handleSubmit} className="space-y-12">
            {activeTab === 'basic' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
                <section className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2">产品型号 (Name/ID)</label>
                      <input 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 bg-brand-gray/50 border border-brand-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2">产品类型 (Type)</label>
                      <input 
                        required
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        className="w-full px-6 py-4 bg-brand-gray/50 border border-brand-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-bold"
                      />
                    </div>
                  </div>
                </section>

                <section className="bg-brand-gray/30 p-8 rounded-[32px] border border-brand-border">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-6 flex items-center gap-2 font-black">
                    <ImageIcon size={14} className="text-brand-blue" /> 产品视觉与文档
                  </label>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="flex flex-col gap-4">
                      <div className="aspect-square rounded-[24px] overflow-hidden bg-white border border-brand-border group relative">
                        <img src={formData.image || 'https://picsum.photos/seed/chemical/800/600'} className="w-full h-full object-cover" />
                        <button type="button" disabled={isUploading} onClick={() => imageInputRef.current?.click()} className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          {isUploading ? <RefreshCw className="animate-spin" size={24} /> : <Camera size={24} />}
                        </button>
                      </div>
                      <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={handleImageSelect} />
                      <input 
                        value={formData.image?.startsWith('data:') ? '已内嵌图片' : formData.image}
                        onChange={e => setFormData({...formData, image: e.target.value})}
                        placeholder="或者输入图片 URL..."
                        className="w-full px-4 py-2 bg-white border border-brand-border rounded-xl text-[10px] font-bold"
                      />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-blue">TDS 文档 (PDF)</label>
                          <div className="flex gap-2">
                            <button type="button" disabled={isUploading} onClick={() => tdsInputRef.current?.click()} className="flex-1 py-3 bg-white border border-brand-border rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-brand-blue transition-all disabled:opacity-50">
                              {isUploading ? '处理中...' : formData.tdsUrl ? '更换 TDS' : '上传 TDS'}
                            </button>
                            {formData.tdsUrl && <button type="button" onClick={() => setFormData({...formData, tdsUrl: ''})} className="p-3 bg-red-50 text-red-500 rounded-xl"><Trash2 size={14} /></button>}
                          </div>
                          <input type="file" ref={tdsInputRef} className="hidden" accept=".pdf" onChange={(e) => handleFileUpload(e, 'tdsUrl')} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-blue">SDS 说明书 (PDF)</label>
                          <div className="flex gap-2">
                            <button type="button" disabled={isUploading} onClick={() => sdsInputRef.current?.click()} className="flex-1 py-3 bg-white border border-brand-border rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-brand-blue transition-all disabled:opacity-50">
                              {isUploading ? '处理中...' : formData.sdsUrl ? '更换 SDS' : '上传 SDS'}
                            </button>
                            {formData.sdsUrl && <button type="button" onClick={() => setFormData({...formData, sdsUrl: ''})} className="p-3 bg-red-50 text-red-500 rounded-xl"><Trash2 size={14} /></button>}
                          </div>
                          <input type="file" ref={sdsInputRef} className="hidden" accept=".pdf" onChange={(e) => handleFileUpload(e, 'sdsUrl')} />
                        </div>
                      </div>
                      <div className="pt-6 border-t border-brand-border">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-4 font-black">所属事业部</label>
                        <div className="flex flex-wrap gap-2">
                          {formData.divisions.map(d => (
                            <span key={d} className="px-3 py-1.5 bg-brand-blue text-white text-[9px] font-black rounded-full flex items-center gap-2">
                              {d.replace('树脂事业部', '')}
                              <button type="button" onClick={() => handleRemoveDivision(d)}><X size={10} /></button>
                            </span>
                          ))}
                          {divisionsList.filter(d => !formData.divisions.includes(d)).map(d => (
                            <button key={d} type="button" onClick={() => handleAddDivision(d)} className="px-3 py-1.5 border border-brand-border text-brand-dark/40 text-[9px] font-black rounded-full hover:border-brand-blue hover:text-brand-blue whitespace-nowrap">+ {d.replace('树脂事业部', '')}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: '外观', key: 'appearance', placeholder: '乳白蓝相液体' },
                    { label: '固含量', key: 'solidContent', placeholder: '40±1' },
                    { label: 'pH 值', key: 'pH', placeholder: '7.0-9.0' },
                    { label: '粘度', key: 'viscosity', placeholder: '< 200' },
                    { label: 'Tg', key: 'tg', placeholder: '25' },
                    { label: 'MFFT', key: 'mfft', placeholder: '15' },
                    { label: '羟值', key: 'hydroxylValue', placeholder: '-' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2">{field.label}</label>
                      <input 
                        value={(formData as any)[field.key]} 
                        onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                        className="w-full px-5 py-3 bg-brand-gray/50 border border-brand-border rounded-xl font-bold text-sm" 
                        placeholder={field.placeholder} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-6">基材适用性</label>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(formData.substrates).map(([key, value]) => (
                      <button key={key} type="button" onClick={() => handleSubstrateChange(key as any)} className={`px-5 py-2.5 rounded-xl border-2 transition-all flex items-center gap-3 ${value ? 'bg-brand-blue text-white border-brand-blue shadow-lg' : 'bg-white border-brand-border text-brand-dark/40 hover:border-brand-blue/20'}`}>
                        <span className="text-[10px] font-black uppercase tracking-widest">{key}</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${value ? 'bg-white' : 'bg-brand-border'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-4">核心亮点</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.features.map(f => (
                      <span key={f} className="px-4 py-2 bg-brand-gray border border-brand-border text-[10px] font-black rounded-full flex items-center gap-2">
                        {f}
                        <button type="button" onClick={() => setFormData({...formData, features: formData.features.filter(feat => feat !== f)})}><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <input value={newFeature} onChange={e => setNewFeature(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())} placeholder="输入亮点按回车添加..." className="flex-1 px-5 py-3 bg-brand-gray/50 border border-brand-border rounded-xl font-bold text-sm" />
                    <button type="button" onClick={handleAddFeature} className="px-6 py-3 bg-brand-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg font-black">添加</button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-4">详情描述</label>
                  <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="产品优势描述..." className="w-full px-6 py-4 bg-brand-gray/50 border border-brand-border rounded-2xl font-bold text-sm" />
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-brand-border bg-white flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/60 font-black">
            {isSubmitting ? '同步中...' : '更改将实时同步到官网与云端数据库'}
          </p>
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="px-6 py-3 text-brand-dark/40 text-[10px] font-black uppercase transition-all tracking-widest font-black">取消</button>
            <button form="product-form" type="submit" disabled={isSubmitting} className="px-10 py-4 bg-brand-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-brand-dark transition-all">
              <Save size={16} /> {isSubmitting ? '保存中...' : '保存更改'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
