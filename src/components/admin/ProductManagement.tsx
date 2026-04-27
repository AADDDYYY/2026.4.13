import { useState } from 'react';
import { db } from '../../firebase';
import { collection, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useProducts } from '../../hooks/useProducts';
import { Trash2, Edit2, Plus, Database, FlaskConical, LayoutGrid, Layers, RefreshCw, AlertCircle, Eye, EyeOff, Globe, Package, Flame } from 'lucide-react';
import { products as staticProducts, Product } from '../../data/products';
import ProductFormModal from './ProductFormModal';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export default function ProductManagement() {
  const { products, cloudProducts, loading } = useProducts();
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncConfirm, setShowSyncConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const toggleStatus = async (product: Product) => {
    if (!cloudProducts.some(p => p.id === product.id)) {
      alert('内置产品无法直接切换状态，请先“同步至云端”进行接管。');
      return;
    }
    const newStatus = product.status === 'published' ? 'draft' : 'published';
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase
          .from('products')
          .update({ 
            status: newStatus, 
            is_hot: product.is_hot, // Keep is_hot status during status toggle
            updated_at: new Date().toISOString() 
          })
          .eq('id', product.id);
        if (error) throw error;
      } else {
        await updateDoc(doc(db, 'products', product.id), {
          status: newStatus,
          updatedAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.error(e);
      alert('切换状态失败');
    }
  };

  const handleSyncStaticToCloud = async () => {
    setIsSyncing(true);
    setShowSyncConfirm(false);
    try {
      let count = 0;
      if (isSupabaseConfigured()) {
        const payloadProducts = staticProducts.map(p => ({
          ...p,
          updated_at: new Date().toISOString()
        }));
        const { error } = await supabase.from('products').upsert(payloadProducts);
        if (error) throw error;
        count = staticProducts.length;
      } else {
        for (const p of staticProducts) {
          await setDoc(doc(db, 'products', p.id), {
            ...p,
            managedBy: 'cloud',
            updatedAt: new Date().toISOString()
          });
          count++;
        }
      }
      alert(`成功同步 ${count} 款产品！`);
    } catch (e) {
      console.error(e);
      alert('同步失败: ' + (e as Error).message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveProduct = async (productData: Product) => {
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase
          .from('products')
          .upsert({
            ...productData,
            updated_at: new Date().toISOString()
          });
        if (error) throw error;
      } else {
        await setDoc(doc(db, 'products', productData.id), {
          ...productData,
          managedBy: 'cloud',
          updatedAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
      } else {
        await deleteDoc(doc(db, 'products', id));
      }
    } catch (e) {
      alert('删除失败: ' + (e as Error).message);
    }
  };

  // Check if a product is from cloud or static
  const isCloudProduct = (id: string) => {
    return cloudProducts.some(p => p.id === id);
  };

  return (
    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border mb-12 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
        <div className="flex items-center gap-4">
          <div className="w-2 h-8 bg-brand-blue rounded-full"></div>
          <div>
            <h2 className="text-3xl font-black text-brand-dark">📦 产品上架管理 (Product CMS)</h2>
            <p className="text-brand-dark/40 text-[11px] font-black uppercase tracking-widest mt-1">Manage Catalog & Datasheets</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {!showSyncConfirm ? (
            <button 
              onClick={() => setShowSyncConfirm(true)}
              disabled={isSyncing}
              className="px-6 py-3 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
            >
              <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
              {isSyncing ? '同步中...' : '同步至云端'}
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-brand-blue/10 p-1 rounded-full border border-brand-blue/20">
               <button 
                onClick={handleSyncStaticToCloud}
                className="px-4 py-2 bg-brand-blue text-white text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-brand-dark transition-all"
              >
                确认导入
              </button>
              <button 
                onClick={() => setShowSyncConfirm(false)}
                className="px-4 py-2 text-brand-dark/40 text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-white transition-all"
              >
                取消
              </button>
            </div>
          )}
          <button 
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="px-6 py-3 bg-brand-blue text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-brand-dark transition-all flex items-center gap-2 shadow-lg shadow-brand-blue/20"
          >
            <Plus size={14} /> 新增产品
          </button>
        </div>
      </div>

      <ProductFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
      />

      {loading ? (
        <div className="text-center py-20 text-brand-dark/40">Loading products...</div>
      ) : (
        <div className="bg-brand-gray/30 rounded-3xl border border-brand-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b border-brand-border text-brand-dark/30 text-[9px] font-black uppercase tracking-widest">
                  <th className="px-6 py-5 pl-8">产品信息 (Product Info)</th>
                  <th className="px-6 py-5">类别与应用</th>
                  <th className="px-6 py-5">事业部覆盖</th>
                  <th className="px-6 py-5">上架状态</th>
                  <th className="px-6 py-5 text-right pr-8">快捷操作</th>
                </tr>
              </thead>
              <tbody className="text-brand-dark text-[13px] font-medium divide-y divide-brand-border/50">
                {products.map(product => {
                  const isCloud = isCloudProduct(product.id);
                  const isPublished = product.status !== 'draft';
                  
                  return (
                    <tr key={product.id} className={`hover:bg-white transition-colors group ${!isPublished ? 'opacity-60 bg-brand-gray/20' : ''}`}>
                      <td className="px-6 py-4 pl-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden border border-brand-border bg-white shrink-0 flex items-center justify-center">
                            {product.image ? (
                              <img src={product.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Package size={20} className="text-gray-300" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              {product.is_hot && (
                                <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-[8px] font-black uppercase tracking-tighter">
                                  <Flame size={8} fill="currentColor" /> HOT
                                </span>
                              )}
                              <span className="font-black text-brand-dark leading-none">{product.name}</span>
                              {isCloud ? (
                                <Database size={10} className="text-emerald-500" />
                              ) : (
                                <Layers size={10} className="text-brand-dark/20" />
                              )}
                            </div>
                            <div className="text-[10px] text-brand-dark/30 font-mono mt-1 uppercase tracking-tighter">{product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-brand-dark/80">{product.type}</span>
                          <span className="text-[9px] text-brand-dark/30 uppercase font-black">{product.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] bg-brand-blue/5 text-brand-blue border border-brand-blue/10 px-2 py-0.5 rounded font-black truncate max-w-[120px]">
                            {product.divisions[0]?.replace('树脂事业部', '')}
                          </span>
                          {product.divisions.length > 1 && (
                            <span className="text-[9px] text-brand-dark/30 font-black">+{product.divisions.length - 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => toggleStatus(product)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                            isPublished 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100' 
                              : 'bg-brand-dark text-white hover:bg-black'
                          }`}
                          title={isPublished ? '点击下架' : '点击上架'}
                        >
                          {isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                          <span className="text-[9px] font-black uppercase tracking-tighter">
                            {isPublished ? '上架' : '下架'}
                          </span>
                        </button>
                      </td>
                      <td className="px-6 py-4 pr-8 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(product)}
                            className="w-8 h-8 flex items-center justify-center text-brand-dark/40 hover:text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors"
                            title="编辑"
                          >
                            <Edit2 size={12} />
                          </button>
                          {isCloud && (
                            <button 
                              onClick={() => handleDelete(product.id)}
                              className="w-8 h-8 flex items-center justify-center text-brand-dark/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="彻底删除"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-brand-dark/30 text-sm">
                      <LayoutGrid size={32} className="mx-auto mb-4 opacity-20" />
                      暂无产品数据
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
