import React, { useState, useEffect } from 'react';
import { db, isFirestoreQuotaExceeded, markFirestoreQuotaExceeded } from '../../firebase';
import { collection, onSnapshot, query, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { Plus, Trash2, Edit2, Image as ImageIcon, Save, X } from 'lucide-react';
import { compressImage } from '../../utils/compressImage';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import ImageCropperModal from './ImageCropperModal';

export interface CertificateItem {
  id: string;
  title: string;
  type: string;
  image: string;
  order: number;
}

export default function CertificateManagement() {
  const [certs, setCerts] = useState<CertificateItem[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<CertificateItem>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [cropperData, setCropperData] = useState<{ id: string, image: string } | null>(null);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      const fetchCerts = async () => {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('order', { ascending: true });
        if (!error && data) {
          setCerts(data as CertificateItem[]);
        }
      };
      fetchCerts();

      const subscription = supabase
        .channel(`certs_changes_${Math.random().toString(36).substring(7)}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'certificates' }, fetchCerts)
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }

    if (isFirestoreQuotaExceeded()) return;

    const q = query(collection(db, 'certificates'), orderBy('order', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as CertificateItem));
      setCerts(data);
    }, (err) => {
      console.error('CertificateManagement error:', err);
      if (err.code === 'resource-exhausted' || err.message.includes('Quota exceeded')) {
        markFirestoreQuotaExceeded();
      }
    });
    return () => unsub();
  }, []);

  const handleCreate = async () => {
    try {
      const payload = {
        title: '新证书/专利',
        type: '荣誉资质',
        image: '',
        order: certs.length,
      };

      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('certificates').insert([payload]);
        if (error) throw error;
      } else {
        await addDoc(collection(db, 'certificates'), {
          ...payload,
          createdAt: serverTimestamp()
        });
      }
    } catch (err) { console.error(err); }
  };

  const handleUpdate = async (id: string, data: Partial<CertificateItem>) => {
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('certificates').update(data).eq('id', id);
        if (error) throw error;
      } else {
        await updateDoc(doc(db, 'certificates', id), data);
      }
      setIsEditing(null);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除该证书吗？')) return;
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('certificates').delete().eq('id', id);
        if (error) throw error;
      } else {
        await deleteDoc(doc(db, 'certificates', id));
      }
    } catch (err) { console.error(err); }
  };

  const handleImageSelect = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCropperData({ id, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleImageCropComplete = async (croppedBase64: string) => {
    if (!cropperData) return;
    try {
      setIsLoading(true);
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('certificates').update({ image: croppedBase64 }).eq('id', cropperData.id);
        if (error) throw error;
      } else {
        await updateDoc(doc(db, 'certificates', cropperData.id), { image: croppedBase64 });
      }
      setCropperData(null);
    } catch (err) {
      console.error(err);
      alert("上传失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border mb-12">
      {cropperData && (
        <ImageCropperModal 
          image={cropperData.image}
          onClose={() => setCropperData(null)}
          onCropComplete={handleImageCropComplete}
          aspect={3/4}
        />
      )}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="w-2 h-8 bg-brand-blue rounded-full"></div>
          <h2 className="text-3xl font-black text-brand-dark">🎓 资质证书与知识产权管理</h2>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-full font-bold hover:bg-brand-dark transition-all"
        >
          <Plus size={20} /> 添加证书/专利
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certs.map(cert => (
          <div key={cert.id} className="border border-brand-border rounded-2xl overflow-hidden bg-brand-gray/30 group">
            <div className="aspect-[4/3] bg-brand-dark/5 relative flex items-center justify-center overflow-hidden">
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="w-full h-full object-contain p-4" referrerPolicy="no-referrer" />
              ) : (
                <ImageIcon size={48} className="text-brand-dark/20" />
              )}
              
              <label className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <span className="text-white font-bold bg-brand-blue px-4 py-2 rounded-full text-sm">
                  {isLoading ? '上传中...' : '更换图片'}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageSelect(cert.id, e)} disabled={isLoading} />
              </label>
            </div>

            <div className="p-4">
              {isEditing === cert.id ? (
                <div className="space-y-3">
                  <input 
                    type="text" 
                    value={editForm.title ?? cert.title} 
                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="证书标题"
                  />
                  <input 
                    type="text" 
                    value={editForm.type ?? cert.type} 
                    onChange={e => setEditForm({...editForm, type: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="分类 (如: 发明专利)"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={() => setIsEditing(null)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><X size={16}/></button>
                    <button onClick={() => handleUpdate(cert.id, editForm)} className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg"><Save size={16}/></button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-brand-dark">{cert.title}</h4>
                      <span className="text-xs text-brand-blue font-bold px-2 py-1 bg-brand-blue/10 rounded-full inline-block mt-1">{cert.type}</span>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => {setIsEditing(cert.id); setEditForm(cert);}} className="p-1.5 text-gray-400 hover:text-brand-blue rounded-lg"><Edit2 size={14}/></button>
                      <button onClick={() => handleDelete(cert.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg"><Trash2 size={14}/></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {certs.length === 0 && (
          <div className="col-span-full py-20 text-center text-brand-dark/40 font-bold border-2 border-dashed border-brand-border rounded-3xl">
            暂无证书/专利数据，请点击上方按钮添加。支持无限上传。
          </div>
        )}
      </div>
    </div>
  );
}
