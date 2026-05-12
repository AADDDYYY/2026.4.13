import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, addDoc, updateDoc, deleteDoc, doc, setDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export interface CertificateItem {
  id: string;
  title: string;
  type: string;
  image: string;
  order: number;
}

export default function CertificateManagement() {
  const [certs, setCerts] = useState<CertificateItem[]>([]);
  const [editingCert, setEditingCert] = useState<CertificateItem | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      const fetchCerts = async () => {
        const { data, error } = await supabase.from('certificates').select('*').order('order', { ascending: true });
        if (!error && data) setCerts(data as CertificateItem[]);
      };
      fetchCerts();

      const sub = supabase.channel(`certs_changes_${Math.random()}`).on('postgres_changes', { event: '*', schema: 'public', table: 'certificates' }, fetchCerts).subscribe();
      return () => { supabase.removeChannel(sub); };
    }

    const q = query(collection(db, 'certificates'), orderBy('order', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      setCerts(snap.docs.map(d => ({ id: d.id, ...d.data() } as CertificateItem)));
    });
    return () => unsub();
  }, []);

  const handleCreate = async (category: string) => {
    try {
      setErrorMsg(null);
      const payload = {
        title: '新证书/专利',
        type: category,
        image: '',
        order: certs.length,
      };
      
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.from('certificates').insert([payload]).select().single();
        if (error) {
          console.error('Supabase insert error:', error);
          throw error;
        }
        if (data) setEditingCert({ id: data.id.toString(), ...payload });
      } else {
        const newDocRef = doc(collection(db, 'certificates'));
        setEditingCert({ id: newDocRef.id, ...payload });
        setDoc(newDocRef, { ...payload, createdAt: serverTimestamp() }).catch(console.error);
      }
    } catch (err: any) { 
      console.error(err); 
      setErrorMsg('创建失败: ' + (err.message || '权限不足或数据库错误'));
    }
  };

  const handleUpdate = async () => {
    if (!editingCert) return;
    try {
      setErrorMsg(null);
      
      // Optimistically update the UI list immediately
      setCerts(prev => prev.map(c => c.id === editingCert.id ? editingCert : c));
      const currentEditing = { ...editingCert };
      setEditingCert(null);

      if (isSupabaseConfigured()) {
        const { id, ...data } = currentEditing;
        supabase.from('certificates').update(data).eq('id', id).then(({error}) => {
          if (error) {
            console.error(error);
            setErrorMsg('保存失败: 操作被拒绝');
          }
        });
      } else {
        const { id, ...data } = currentEditing;
        updateDoc(doc(db, 'certificates', id), data).catch(err => {
            console.error(err);
            setErrorMsg('保存失败: ' + (err.message || '操作被拒绝'));
        });
      }
    } catch (err: any) { 
        console.error(err);
        setErrorMsg('保存失败: ' + (err.message || '操作被拒绝'));
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    try {
      setErrorMsg(null);
      
      // Optimistic delete
      setCerts(prev => prev.filter(c => c.id.toString() !== id.toString()));
      if (editingCert && editingCert.id.toString() === id.toString()) setEditingCert(null);

      if (isSupabaseConfigured()) {
        supabase.from('certificates').delete().eq('id', id).then(({error}) => {
          if (error) {
            console.error(error);
            setErrorMsg('删除失败: 权限不足');
          }
        });
      } else {
        deleteDoc(doc(db, 'certificates', id)).catch(err => {
          console.error(err); 
          setErrorMsg('删除失败: ' + (err.message || '权限不足'));
        });
      }
    } catch (err: any) { 
      console.error(err); 
      setErrorMsg('删除失败: ' + (err.message || '权限不足'));
    }
  };

  const categories = ['荣誉资质', '专利授权', '政府认定', '体系认证'];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-brand-dark tracking-tight">荣誉奖项与资质管理</h2>
        <div className="text-sm text-gray-500 font-medium">
          请在各分类下精确配置您的 GitHub 图片地址
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl flex items-center justify-between border border-red-100">
          <span className="font-medium text-sm">{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="p-1 hover:bg-red-100 rounded-lg transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
        {categories.map(cat => {
          const categoryCerts = certs.filter(c => c.type === cat);
          return (
            <div key={cat} className="bg-white rounded-[32px] p-6 shadow-sm border border-brand-border flex flex-col">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-4 bg-brand-blue rounded-full"></div>
                  <h3 className="text-lg font-black text-brand-dark tracking-tight whitespace-nowrap">{cat}</h3>
                </div>
                <button 
                  onClick={() => handleCreate(cat)}
                  className="bg-brand-blue/10 text-brand-blue p-2 rounded-full hover:bg-brand-blue hover:text-white transition-all shadow-sm shrink-0"
                  title={`在${cat}下新增`}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {categoryCerts.map(cert => (
                  <div key={cert.id} className="border border-brand-border rounded-2xl overflow-hidden bg-brand-gray/30 hover:border-brand-blue/30 transition-all group">
                    {/* Image Preview */}
                    <div className="aspect-[4/3] bg-white relative flex flex-col items-center justify-center p-2 border-b border-brand-border/50 group/img">
                      {cert.image ? (
                        <>
                          <img 
                            src={cert.image} 
                            alt={cert.title} 
                            className="w-full h-full object-contain cursor-pointer" 
                            referrerPolicy="no-referrer" 
                            onClick={() => setPreviewUrl(cert.image)}
                          />
                          <button 
                            onClick={async (e) => {
                              e.stopPropagation();
                              const newCert = { ...cert, image: '' };
                              setCerts(prev => prev.map(c => c.id === cert.id ? newCert : c));
                              if (isSupabaseConfigured()) {
                                await supabase.from('certificates').update({ image: '' }).eq('id', cert.id);
                              } else {
                                await updateDoc(doc(db, 'certificates', cert.id), { image: '' });
                              }
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-red-500/90 text-white rounded opacity-0 group-hover/img:opacity-100 transition-opacity z-10 hover:bg-red-600"
                            title="清除图片"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      ) : (
                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-brand-gray/50 transition-colors">
                          <ImageIcon size={32} className="text-gray-300 mb-2" />
                          <span className="text-[10px] font-bold text-brand-blue border border-brand-blue/30 px-3 py-1 rounded-full bg-brand-blue/5 opacity-0 group-hover/img:opacity-100 transition-opacity">点击直接上传</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              if (file.size > 10 * 1024 * 1024) return alert("图片不能超过 10MB");
                              
                              const reader = new FileReader();
                              reader.onload = async (event) => {
                                const img = new Image();
                                img.onload = async () => {
                                  const canvas = document.createElement('canvas');
                                  let width = img.width, height = img.height;
                                  if (width > height) { if (width > 1200) { height *= 1200 / width; width = 1200; } }
                                  else { if (height > 1200) { width *= 1200 / height; height = 1200; } }
                                  canvas.width = width; canvas.height = height;
                                  canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);
                                  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

                                  const newCert = { ...cert, image: dataUrl };
                                  setCerts(prev => prev.map(c => c.id === cert.id ? newCert : c));
                                  if (isSupabaseConfigured()) {
                                    await supabase.from('certificates').update({ image: dataUrl }).eq('id', cert.id);
                                  } else {
                                    await updateDoc(doc(db, 'certificates', cert.id), { image: dataUrl });
                                  }
                                };
                                img.src = event.target?.result as string;
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-4 bg-white">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 pr-2">
                              <h4 className="font-bold text-gray-800 text-sm mb-1 leading-tight">{cert.title}</h4>
                            </div>
                            <div className="flex gap-1 shrink-0">
                              <button onClick={() => setEditingCert(cert)} className="p-1.5 bg-gray-50 text-brand-blue hover:bg-brand-blue hover:text-white rounded-lg transition-colors shadow-sm"><Edit2 size={14}/></button>
                              <button onClick={(e) => handleDelete(cert.id, e)} className="p-1.5 bg-gray-50 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors shadow-sm"><Trash2 size={14}/></button>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                ))}
                
                {categoryCerts.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                    <div className="text-xs text-gray-400 font-bold tracking-widest">该类目下暂无证书</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {editingCert && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] p-6 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setEditingCert(null)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Edit2 className="text-[#0056b3]" /> 编辑项信息
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">项目标题 (如: 荣誉)</label>
                <input 
                  type="text" 
                  value={editingCert.title} 
                  onChange={e => setEditingCert({...editingCert, title: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0056b3]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">副标题/标签 (如: GIANT)</label>
                <input 
                  type="text" 
                  value={editingCert.type} 
                  onChange={e => setEditingCert({...editingCert, type: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0056b3]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">所属分类</label>
                <select 
                  value={editingCert.type} 
                  onChange={e => setEditingCert({...editingCert, type: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0056b3]/20"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase flex justify-between">
                  <span>上传图片或输入链接</span>
                </label>
                
                {/* Local Upload Button */}
                <div className="mb-3">
                  <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-blue/5 border-2 border-dashed border-brand-blue/30 rounded-xl cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue/50 transition-colors">
                    <ImageIcon size={18} className="text-brand-blue" />
                    <span className="text-sm font-bold text-brand-blue">点击选择本地图片上传 (极速预览)</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        if (file.size > 10 * 1024 * 1024) {
                          alert("图片不能超过 10MB");
                          return;
                        }

                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement('canvas');
                            const MAX_WIDTH = 1200;
                            const MAX_HEIGHT = 1200;
                            let width = img.width;
                            let height = img.height;

                            if (width > height) {
                              if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                              }
                            } else {
                              if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                              }
                            }

                            canvas.width = width;
                            canvas.height = height;
                            const ctx = canvas.getContext('2d');
                            ctx?.drawImage(img, 0, 0, width, height);
                            
                            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                            if (dataUrl.length > 900 * 1024 && !isSupabaseConfigured()) {
                               alert("压缩后图片仍然过大，请尝试换一张小图");
                               return;
                            }

                            setEditingCert({ ...editingCert, image: dataUrl });
                          };
                          img.src = event.target?.result as string;
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                </div>

                <div className="flex items-center gap-4 my-3 text-xs text-gray-400 font-bold uppercase before:h-[1px] before:flex-1 before:bg-gray-200 after:h-[1px] after:flex-1 after:bg-gray-200">
                  或者
                </div>

                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 text-gray-400"><LinkIcon size={18} /></div>
                  <input 
                    type="text" 
                    value={editingCert.image} 
                    onChange={e => setEditingCert({...editingCert, image: e.target.value})}
                    placeholder="输入外部图片链接如 Github, Imgur..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0056b3]/20 text-sm"
                  />
                </div>

                {editingCert.image && (
                  <div className="mt-3 relative h-32 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center group">
                    <img 
                      src={editingCert.image} 
                      alt="Preview" 
                      className="max-w-full max-h-full object-contain cursor-zoom-in" 
                      referrerPolicy="no-referrer" 
                      onClick={() => setPreviewUrl(editingCert.image)}
                    />
                    <button 
                      onClick={() => setEditingCert({...editingCert, image: ''})}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
                      title="清空图片"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-6">
                <button 
                  onClick={(e) => handleDelete(editingCert.id, e)}
                  className="px-4 py-2.5 flex items-center gap-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold text-sm"
                  title="彻底删除此证书项目"
                >
                  <Trash2 size={18} /> 彻底删除此项
                </button>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setEditingCert(null)}
                    className="px-4 py-2.5 text-gray-500 hover:text-gray-700 font-bold"
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleUpdate}
                    className="px-6 py-2.5 flex items-center gap-2 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors shadow-sm font-bold shadow-[#0056b3]/20"
                  >
                    <Save size={18} /> 保存更改
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Full Screen Preview */}
      {previewUrl && (
        <div 
          className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setPreviewUrl(null)}
        >
          <button 
            onClick={() => setPreviewUrl(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <img 
            src={previewUrl} 
            alt="Full Preview" 
            className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-200"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
