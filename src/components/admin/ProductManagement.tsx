import { useState } from 'react';
import { db } from '../../firebase';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useProducts } from '../../hooks/useProducts';
import { Trash2, Edit2, Plus, Database, FlaskConical, LayoutGrid, Layers, RefreshCw } from 'lucide-react';
import { products as staticProducts, Product } from '../../data/products';

export default function ProductManagement() {
  const { products, cloudProducts, loading } = useProducts();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncStaticToCloud = async () => {
    if (!confirm('这将会把系统中所有内置的静态产品转移到云端数据库中进行管理。如果云端已经存在同ID产品，将被覆盖。确定继续吗？')) {
      return;
    }
    
    setIsSyncing(true);
    try {
      let count = 0;
      for (const p of staticProducts) {
        await setDoc(doc(db, 'products', p.id), p);
        count++;
      }
      alert(`成功同步 ${count} 款产品到云端数据库！您现在可以不改代码直接管理所有产品了。`);
    } catch (e) {
      console.error(e);
      alert('同步失败: ' + (e as Error).message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(`警告：这将永久删除该产品 (ID: ${id})。确定吗？`)) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (e) {
        alert('删除失败: ' + (e as Error).message);
      }
    }
  };

  // Check if a product is from cloud or static
  const isCloudProduct = (id: string) => {
    return cloudProducts.some(p => p.id === id);
  };

  return (
    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
        <div className="flex items-center gap-4">
          <div className="w-2 h-8 bg-brand-blue rounded-full"></div>
          <div>
            <h2 className="text-3xl font-black text-brand-dark">📦 产品上架管理 (Product CMS)</h2>
            <p className="text-brand-dark/40 text-[11px] font-black uppercase tracking-widest mt-1">Manage Catalog & Datasheets</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSyncStaticToCloud}
            disabled={isSyncing}
            className="px-6 py-3 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
          >
            <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
            {isSyncing ? '同步中...' : '一键将内置产品导入云端库'}
          </button>
          <button 
            onClick={() => alert("完整表单开发中，可以直接使用现有的云端覆盖功能测试。")}
            className="px-6 py-3 bg-brand-blue text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-brand-dark transition-all flex items-center gap-2 shadow-lg shadow-brand-blue/20"
          >
            <Plus size={14} /> 新增产品
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-brand-dark/40">Loading products...</div>
      ) : (
        <div className="bg-brand-gray/30 rounded-3xl border border-brand-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b border-brand-border text-brand-dark/30 text-[9px] font-black uppercase tracking-widest">
                  <th className="px-6 py-5 pl-8">数据源</th>
                  <th className="px-6 py-5">产品型号 / ID</th>
                  <th className="px-6 py-5">类别 (Category)</th>
                  <th className="px-6 py-5">事业部</th>
                  <th className="px-6 py-5 text-right pr-8">操作</th>
                </tr>
              </thead>
              <tbody className="text-brand-dark text-[13px] font-medium divide-y divide-brand-border/50">
                {products.map(product => {
                  const isCloud = isCloudProduct(product.id);
                  return (
                    <tr key={product.id} className="hover:bg-white transition-colors group">
                      <td className="px-6 py-4 pl-8">
                        {isCloud ? (
                          <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md w-fit border border-emerald-100">
                            <Database size={10} />
                            <span className="text-[9px] font-black tracking-widest uppercase">云端 (Cloud)</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-brand-dark/40 bg-brand-dark/5 px-2.5 py-1 rounded-md w-fit">
                            <Layers size={10} />
                            <span className="text-[9px] font-black tracking-widest uppercase">内置代码</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-black text-brand-dark">{product.name}</div>
                        <div className="text-[10px] text-brand-dark/40 font-mono mt-0.5">{product.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FlaskConical size={14} className="text-brand-dark/20" />
                          <span>{product.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {product.divisions.map(d => (
                            <span key={d} className="text-[9px] bg-brand-blue/5 text-brand-blue border border-brand-blue/10 px-2 py-0.5 rounded font-black tracking-widest uppercase truncate max-w-[150px]" title={d}>
                              {d}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 pr-8 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* <button className="w-8 h-8 flex items-center justify-center text-brand-dark/40 hover:text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors">
                            <Edit2 size={14} />
                          </button> */}
                          {isCloud && (
                            <button 
                              onClick={() => handleDelete(product.id)}
                              className="w-8 h-8 flex items-center justify-center text-brand-dark/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="从云端删除"
                            >
                              <Trash2 size={14} />
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
