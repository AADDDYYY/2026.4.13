import { useState, useEffect, useRef } from 'react';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query } from 'firebase/firestore';
import { Upload } from 'lucide-react';

interface CMSAsset {
  id: string;
  key: string;
  type: string;
  value: string;
  updatedAt?: string;
  updatedBy?: string;
}

const compressImage = (file: File, maxWidth: number = 1920): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas ctx null'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Compress as WebP or JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedDataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

const ImageUploadButton = ({ assetKey, label, user }: { assetKey: string, label: string, user: User }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file || !user) return;
    setIsUploading(true);
    try {
      const base64Data = await compressImage(file, 1920);
      await setDoc(doc(db, 'cms_assets', assetKey), {
        key: assetKey,
        type: 'image',
        value: base64Data,
        updatedAt: new Date().toISOString(),
        updatedBy: user.uid
      });
      alert(`成功！[${label}] 已更换为您上传的图片。`);
    } catch(err) {
      console.error(err);
      alert('上传失败，图片可能过大或格式不支持。');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mt-6 w-full">
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleUpload} className="hidden" />
      <button 
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-brand-blue text-white rounded-xl font-black text-[12px] uppercase tracking-widest hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        <Upload size={16} className={isUploading ? 'animate-bounce' : ''} />
        {isUploading ? '正在压缩并上传...' : `本地上传图片：${label}`}
      </button>
    </div>
  );
};

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [assets, setAssets] = useState<CMSAsset[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formKey, setFormKey] = useState('');
  const [formType, setFormType] = useState('image');
  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthReady && user) {
      setLoading(true);
      const q = query(collection(db, 'cms_assets'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data: CMSAsset[] = [];
        snapshot.docs.forEach((docSnap) => {
          data.push({ id: docSnap.id, ...docSnap.data() } as CMSAsset);
        });
        setAssets(data);
        setLoading(false);
      }, (error) => {
        setLoading(false);
        handleFirestoreError(error, OperationType.LIST, 'cms_assets');
      });

      return () => unsubscribe();
    }
  }, [isAuthReady, user]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formKey.trim() || !formValue.trim() || !user) return;

    try {
      // Use the key as the document ID for simplicity in fetching later
      const docRef = doc(db, 'cms_assets', formKey.trim());
      await setDoc(docRef, {
        key: formKey.trim(),
        type: formType,
        value: formValue.trim(),
        updatedAt: new Date().toISOString(),
        updatedBy: user.uid
      });
      setFormKey('');
      setFormValue('');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `cms_assets/${formKey.trim()}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'cms_assets', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `cms_assets/${id}`);
    }
  };

  if (!isAuthReady) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-gray flex items-center justify-center px-6">
        <div className="bg-white p-16 rounded-[40px] shadow-2xl border border-brand-border text-center max-w-md w-full">
          <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue mx-auto mb-8">
            <span className="text-3xl">🛡️</span>
          </div>
          <h1 className="text-3xl font-black text-brand-dark mb-4 tracking-tight">管理后台登入</h1>
          <p className="text-brand-dark/50 mb-10 text-sm">请输入授权的管理员账号以进入后台管理系统</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-brand-blue text-white py-4 rounded-full font-black uppercase tracking-widest text-[12px] hover:bg-brand-dark transition-all shadow-lg shadow-brand-blue/20"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray pb-32">
      {/* Admin Header */}
      <div className="bg-white border-b border-brand-border py-6 px-10 flex justify-between items-center sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-black text-brand-dark tracking-tight">Seaton CMS Backend</h1>
          <p className="text-xs font-bold text-brand-dark/40 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-sm font-medium text-brand-dark/70">
            {user.email}
          </div>
          <button 
            onClick={handleLogout}
            className="bg-brand-gray hover:bg-red-50 text-brand-dark hover:text-red-500 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border border-brand-border transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mt-16 flex flex-col gap-10">
        
        {/* ---- Global Actions ---- */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
          <h2 className="text-2xl font-black text-brand-dark mb-4 border-l-4 border-brand-blue pl-4">🌐 全站通用设置 (Global)</h2>
          <div className="mt-8">
            <h3 className="text-xl font-black text-brand-dark mb-4">📢 网站顶部公告横幅</h3>
            <p className="text-brand-dark/50 text-sm mb-6">用于全站顶部的滚动通知。</p>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input 
                type="text"
                placeholder="例如：热烈庆祝公司成为国家高新技术企业！..."
                className="flex-1 px-5 py-4 border border-brand-border rounded-xl focus:border-brand-blue outline-none transition-colors text-sm"
                id="quick-banner-input"
              />
              <button 
                onClick={async () => {
                  const input = document.getElementById('quick-banner-input') as HTMLInputElement;
                  if(!user || !input.value.trim()) {
                    alert('请输入公告内容！');
                    return;
                  }
                  try {
                    await setDoc(doc(db, 'cms_assets', 'site_announcement_text'), {
                      key: 'site_announcement_text', type: 'text', value: input.value.trim(), updatedAt: new Date().toISOString(), updatedBy: user.uid
                    });
                    await setDoc(doc(db, 'cms_assets', 'site_announcement_enabled'), {
                      key: 'site_announcement_enabled', type: 'text', value: 'true', updatedAt: new Date().toISOString(), updatedBy: user.uid
                    });
                    alert('公告已点亮发布！');
                    input.value = '';
                  } catch(e) { console.error(e); }
                }}
                className="px-8 py-4 bg-brand-blue text-white font-black text-[12px] uppercase tracking-widest rounded-xl hover:bg-brand-dark transition-all shrink-0"
              >
                发布并开启
              </button>
              <button 
                onClick={async () => {
                  if(!user) return;
                  try {
                    await setDoc(doc(db, 'cms_assets', 'site_announcement_enabled'), {
                      key: 'site_announcement_enabled', type: 'text', value: 'false', updatedAt: new Date().toISOString(), updatedBy: user.uid
                    });
                    alert('公告已关闭隐藏。');
                  } catch(e) { console.error(e); }
                }}
                className="px-8 py-4 bg-brand-gray text-brand-dark font-black text-[12px] uppercase tracking-widest rounded-xl hover:bg-red-50 hover:text-red-500 transition-all border border-brand-border shrink-0"
              >
                关闭隐藏
              </button>
            </div>
          </div>
        </div>

        {/* ---- Home Page Actions ---- */}
        <div className="bg-white p-10 rounded-[40px] shadow-2xl border-2 border-brand-blue/20">
          <h2 className="text-2xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-4">🏠 首页图片管理 (Home)</h2>
          
          <div className="space-y-12">
            {/* Home Hero */}
            <div>
              <h3 className="text-lg font-black text-brand-dark mb-4">1. 首页顶部巨幅背景图</h3>
              {user && <ImageUploadButton assetKey="home_hero_bg" label="上传首页背景 (建议横图 1920x1080)" user={user} />}
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "经典深蓝科技", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
                  { label: "绿色环保材料", url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2564&auto=format&fit=crop" },
                  { label: "微观结晶质感", url: "https://images.unsplash.com/photo-1633423377259-7157ccf726cb?q=80&w=2564&auto=format&fit=crop" }
                ].map((preset, idx) => (
                  <div key={idx} className="group relative rounded-xl overflow-hidden border-2 border-transparent hover:border-brand-blue cursor-pointer transition-all"
                    onClick={async () => {
                      if(!user) return;
                      try {
                        await setDoc(doc(db, 'cms_assets', 'home_hero_bg'), { key: 'home_hero_bg', type: 'image', value: preset.url, updatedAt: new Date().toISOString(), updatedBy: user.uid });
                        alert(`成功！首页大图已更换为：${preset.label}`);
                      } catch(e) { console.error(e); }
                    }}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-24 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2"><span className="text-white font-bold text-xs">{preset.label}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Home Innovation */}
            <div className="border-t border-brand-border pt-8">
              <h3 className="text-lg font-black text-brand-dark mb-4">2. 技术中心图片块 (Innovation Hub)</h3>
              {user && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ImageUploadButton assetKey="home_tech_bg_main" label="主讲配图 (建议竖图)" user={user} />
                  <ImageUploadButton assetKey="home_tech_bg_sub1" label="右上小图" user={user} />
                  <ImageUploadButton assetKey="home_tech_bg_sub2" label="右下小图" user={user} />
                </div>
              )}
            </div>

            {/* Home Market Sectors */}
            <div className="border-t border-brand-border pt-8">
              <h3 className="text-lg font-black text-brand-dark mb-4">3. 市场应用四大板块 (Market Sectors)</h3>
              {user && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <ImageUploadButton assetKey="home_sector_leather" label="皮革涂饰 (Leather)" user={user} />
                  <ImageUploadButton assetKey="home_sector_electronics" label="消费电子 (Electronics)" user={user} />
                  <ImageUploadButton assetKey="home_sector_industrial" label="工业涂料 (Industrial)" user={user} />
                  <ImageUploadButton assetKey="home_sector_wood" label="木器家具 (Wood)" user={user} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ---- About & Products Actions ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-2xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-4">🏢 关于我们 (About Us)</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-black text-brand-dark mb-2">关于页面顶部横幅图</h3>
                {user && <ImageUploadButton assetKey="about_hero_bg" label="上传关于页背景图" user={user} />}
              </div>
              <div className="border-t border-brand-border pt-6">
                <h3 className="text-sm font-black text-brand-dark mb-2">智能制造生产基地配图</h3>
                {user && <ImageUploadButton assetKey="about_strength_img" label="上传工厂实景图" user={user} />}
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-2xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-4">🧪 产品中心 (Products)</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-black text-brand-dark mb-2">产品页面顶部横幅图</h3>
                {user && <ImageUploadButton assetKey="product_hero_bg" label="上传产品页背景图" user={user} />}
              </div>
            </div>
          </div>
        </div>

        {/* ---- Other Inner Pages Actions ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-3">🌍 市场应用 (Market App)</h2>
            <div>
              <h3 className="text-sm font-black text-brand-dark mb-2">市场应用页横幅</h3>
              {user && <ImageUploadButton assetKey="market_hero_bg" label="上传横幅图" user={user} />}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-3">🔬 研发创新 (Innovation)</h2>
            <div>
              <h3 className="text-sm font-black text-brand-dark mb-2">研发创新页横幅</h3>
              {user && <ImageUploadButton assetKey="innovation_hero_bg" label="上传横幅图" user={user} />}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-3">🌱 可持续发展 (Sustainability)</h2>
            <div>
              <h3 className="text-sm font-black text-brand-dark mb-2">可持续发展页横幅</h3>
              {user && <ImageUploadButton assetKey="sustainability_hero_bg" label="上传横幅图" user={user} />}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-3">⬇️ 下载中心 (Downloads)</h2>
            <div>
              <h3 className="text-sm font-black text-brand-dark mb-2">下载中心页横幅</h3>
              {user && <ImageUploadButton assetKey="downloads_hero_bg" label="上传横幅图" user={user} />}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-3">📰 新闻中心 (News)</h2>
            <div>
              <h3 className="text-sm font-black text-brand-dark mb-2">新闻中心页横幅</h3>
              {user && <ImageUploadButton assetKey="news_hero_bg" label="上传横幅图" user={user} />}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-3">📞 联系我们 (Contact)</h2>
            <div>
              <h3 className="text-sm font-black text-brand-dark mb-2">联系我们页横幅</h3>
              {user && <ImageUploadButton assetKey="contact_hero_bg" label="上传横幅图" user={user} />}
            </div>
          </div>
        </div>

        {/* List Column (Bottom now instead of side by side) */}
        <div className="mt-12">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border min-h-[500px]">
             <h2 className="text-xl font-black text-brand-dark mb-8 uppercase tracking-widest text-brand-dark/40">开发者高级调试: 资产列表 ({assets.length})</h2>
             
             {loading ? (
               <div className="text-sm text-brand-dark/50">Loading assets...</div>
             ) : assets.length === 0 ? (
               <div className="text-sm text-center py-20 text-brand-dark/40 border-2 border-dashed border-brand-border rounded-2xl">
                 暂无内容，请在左侧添加
               </div>
             ) : (
               <div className="grid grid-cols-1 gap-4">
                 {assets.map((asset) => (
                   <div key={asset.id} className="p-6 border border-brand-border rounded-2xl hover:border-brand-blue/30 transition-colors flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                     <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-3 mb-2">
                         <span className="font-mono text-sm font-bold text-brand-blue">{asset.key}</span>
                         <span className="px-2 py-0.5 bg-brand-gray text-[10px] uppercase font-black tracking-widest rounded text-brand-dark/40 border border-brand-border">{asset.type}</span>
                       </div>
                       
                       {asset.type === 'image' && (
                         <div className="mt-4 flex items-center gap-4">
                           <img src={asset.value} alt={asset.key} referrerPolicy="no-referrer" className="w-16 h-16 object-cover rounded-lg border border-brand-border" />
                           <p className="text-xs text-brand-dark/50 truncate flex-1">{asset.value}</p>
                         </div>
                       )}
                       
                       {asset.type !== 'image' && (
                          <div className="mt-2 text-sm text-brand-dark/70 line-clamp-2">
                            {asset.value}
                          </div>
                       )}
                     </div>

                     <div className="flex items-center gap-3 shrink-0">
                       <button 
                         onClick={() => {
                           setFormKey(asset.key);
                           setFormType(asset.type);
                           setFormValue(asset.value);
                         }}
                         className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-brand-dark hover:bg-brand-gray rounded-lg transition-colors border border-transparent hover:border-brand-border"
                       >
                         Edit
                       </button>
                       <button 
                         onClick={() => handleDelete(asset.id)}
                         className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                       >
                         Delete
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
