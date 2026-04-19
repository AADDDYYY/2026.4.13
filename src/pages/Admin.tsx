import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, limit, orderBy, updateDoc, getDocs, serverTimestamp, addDoc } from 'firebase/firestore';
import { Upload, Save, CheckCircle, Smartphone, Mail, MapPin, Globe, Search as SearchIcon, ShieldAlert, Activity, LayoutGrid, RotateCcw, Bug, FlaskRound, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { runDiagnostics, DashboardStat, fetchCloudHealth, fetchNetworkStatus } from '../services/diagnosticService';

interface SampleRequest {
  id: string;
  productId: string;
  productName: string;
  userName: string;
  companyName: string;
  email: string;
  phone: string;
  applicationArea: string;
  substrate?: string;
  message: string;
  status: 'new' | 'processing' | 'completed' | 'cancelled';
  type?: string;
  createdAt: any;
}

interface AuditLog {
  id: string;
  user: string;
  action: string;
  time: string;
  target: string;
}

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

const TextUpdateField = ({ assetKey, label, user, placeholder, type = 'text' }: { assetKey: string, label: string, user: User, placeholder?: string, type?: 'text' | 'textarea' }) => {
  const [value, setValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    // Fetch initial value
    const unsubscribe = onSnapshot(doc(db, 'cms_assets', assetKey), (doc) => {
      if (doc.exists()) {
        setValue(doc.data().value);
      }
    });
    return () => unsubscribe();
  }, [assetKey]);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'cms_assets', assetKey), {
        key: assetKey,
        type: 'text',
        value: value,
        updatedAt: new Date().toISOString(),
        updatedBy: user.uid
      });
      setHasChanged(false);
    } catch (err) {
      console.error(err);
      alert('保存失败');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-[11px] font-black uppercase tracking-widest text-brand-dark/40 mb-2">{label}</label>
      <div className="flex gap-3">
        {type === 'textarea' ? (
          <textarea 
            value={value}
            onChange={(e) => { setValue(e.target.value); setHasChanged(true); }}
            placeholder={placeholder}
            rows={3}
            className="flex-1 px-5 py-4 bg-brand-gray border border-brand-border rounded-xl text-sm focus:border-brand-blue outline-none transition-all resize-none"
          />
        ) : (
          <input 
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value); setHasChanged(true); }}
            placeholder={placeholder}
            className="flex-1 px-5 py-4 bg-brand-gray border border-brand-border rounded-xl text-sm focus:border-brand-blue outline-none transition-all"
          />
        )}
        <button 
          onClick={handleSave}
          disabled={!hasChanged || isSaving}
          className="px-6 bg-brand-blue text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-dark transition-all disabled:opacity-30 flex items-center gap-2"
        >
          {isSaving ? '...' : hasChanged ? <Save size={14} /> : <CheckCircle size={14} />}
          {isSaving ? '保存中' : hasChanged ? '保存' : '已同步'}
        </button>
      </div>
    </div>
  );
};

const ImageUploadButton = ({ assetKey, label, user }: { assetKey: string, label: string, user: User }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
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
  const [healthStats, setHealthStats] = useState<DashboardStat[]>([]);
  const [isSimulatingBug, setIsSimulatingBug] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [networkStats, setNetworkStats] = useState<any>(null);
  const [sampleRequests, setSampleRequests] = useState<SampleRequest[]>([]);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [rawSampleCount, setRawSampleCount] = useState<number | null>(null);

  const fetchSamplesFallback = async () => {
    setIsRefreshing(true);
    try {
      const q = query(collection(db, 'sample_requests'));
      const s = await getDocs(q);
      setRawSampleCount(s.size);
      const ss = s.docs.map(d => ({ id: d.id, ...d.data() } as SampleRequest));
      setSampleRequests(ss.sort((a,b) => {
        const timeA = a.createdAt?.seconds || (a.createdAt?.toMillis ? a.createdAt.toMillis() / 1000 : 0);
        const timeB = b.createdAt?.seconds || (b.createdAt?.toMillis ? b.createdAt.toMillis() / 1000 : 0);
        return timeB - timeA;
      }));
      setSyncError(null);
    } catch (err) {
      console.error("Manual refresh error:", err);
      setSyncError((err as Error).message);
    } finally {
      setIsRefreshing(false);
    }
  };

  const refreshDiagnostics = async () => {
    const local = runDiagnostics();
    const cloud = await fetchCloudHealth();
    const network = await fetchNetworkStatus();
    setHealthStats([...local, cloud]);
    setNetworkStats(network);
  };

  useEffect(() => {
    if (user) {
      refreshDiagnostics();
      setSyncError(null);

      // Auto-provision admin if email matches
      if (user.email === "a.d.d.y.25433@gmail.com") {
        setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          role: 'admin',
          createdAt: new Date().toISOString()
        }, { merge: true }).catch(err => console.error("Admin provision error:", err));
      }
      
      // Fetch dynamic audit logs from firestore
      const qLogs = query(collection(db, 'system_logs'), limit(10), orderBy('timestamp', 'desc'));
      const unsubscribeLogs = onSnapshot(qLogs, (snapshot) => {
        const logs = snapshot.docs.map(d => ({
          id: d.id,
          user: d.data().userId || 'System',
          action: d.data().type === 'error' ? 'Runtime Exception' : 'Asset Accessed',
          time: d.data().timestamp?.toDate?.()?.toLocaleString() || new Date().toLocaleString(),
          target: d.data().url || 'Internal'
        }));
        setAuditLogs(logs);
      }, (err) => console.error("Audit log sync error:", err));

      // Fetch sample requests with smart fallback
      let unsubscribeSamples: (() => void) | null = null;

      const startSampleSync = (withOrder: boolean) => {
        if (unsubscribeSamples) unsubscribeSamples();
        
        const q = withOrder 
          ? query(collection(db, 'sample_requests'), orderBy('createdAt', 'desc'))
          : collection(db, 'sample_requests');

        unsubscribeSamples = onSnapshot(q, (snapshot) => {
          const samples = snapshot.docs.map(d => ({
            id: d.id,
            ...d.data()
          } as SampleRequest));
          
          setRawSampleCount(snapshot.size);
          
          if (!withOrder) {
            // Manual sort if index is missing
            samples.sort((a,b) => {
              const dateA = a.createdAt?.seconds || (a.createdAt?.toMillis ? a.createdAt.toMillis() / 1000 : 0) || (typeof a.createdAt === 'string' ? new Date(a.createdAt).getTime() / 1000 : 0);
              const dateB = b.createdAt?.seconds || (b.createdAt?.toMillis ? b.createdAt.toMillis() / 1000 : 0) || (typeof b.createdAt === 'string' ? new Date(b.createdAt).getTime() / 1000 : 0);
              return dateB - dateA;
            });
          }
          
          setSampleRequests(samples);
          setSyncError(null);
        }, (err) => {
          console.error("Sample requests sync error:", err);
          if (withOrder && (err.message.includes('index') || err.message.includes('permission'))) {
            setSyncError("Index missing, performing collection scan...");
            startSampleSync(false); // Fallback to raw collection
          } else {
            setSyncError(err.message);
          }
        });
      };

      startSampleSync(true);

      return () => {
        unsubscribeLogs();
        if (unsubscribeSamples) unsubscribeSamples();
      };
    }
  }, [user]);

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

  const handleSave = async (e: FormEvent) => {
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
        
        {/* ---- AI Health & Diagnostics Section ---- */}
        <div className="bg-brand-dark p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
          {/* Animated Background Effect */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px] -z-0 opacity-50 group-hover:scale-110 transition-transform duration-[3s]"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-brand-blue rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-brand-blue/30">
                  <ShieldAlert size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">西顿企业级数字堡垒 (Enterprise Digital Fortress)</h2>
                  <p className="text-brand-blue/60 text-[10px] uppercase font-black tracking-widest mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
                    SLA-Grade System Monitoring Active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                 <button 
                  onClick={() => {
                    localStorage.removeItem('system_errors');
                    setHealthStats(runDiagnostics());
                    alert('本地错误日志已清理。');
                  }}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all flex items-center gap-2"
                >
                  <RotateCcw size={14} /> 清理日志
                </button>
                <button 
                  onClick={() => setIsSimulatingBug(true)}
                  className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 transition-all flex items-center gap-2"
                >
                  <Bug size={14} /> 模拟生产环境 Bug
                </button>
                <button 
                  onClick={refreshDiagnostics}
                  className="px-8 py-3 bg-brand-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-blue/80 transition-all shadow-xl shadow-brand-blue/20 flex items-center gap-2"
                >
                  <Activity size={14} /> 立即体检
                </button>
              </div>
            </div>

            {isSimulatingBug && <BugSimulator onCrash={() => setIsSimulatingBug(false)} />}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthStats.map((stat, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-all group/stat">
                   <div className="flex justify-between items-start mb-4">
                      <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">{stat.label}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        stat.status === 'healthy' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                        stat.status === 'warning' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 
                        'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                      }`}></div>
                   </div>
                   <div className="text-3xl font-black text-white mb-2 tracking-tight group-hover/stat:translate-x-1 transition-transform">{stat.value}</div>
                   <p className="text-white/30 text-[11px] font-medium leading-relaxed">{stat.message}</p>
                </div>
              ))}
            </div>

            {/* Global Latency & Audit Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 pt-12 border-t border-white/5">
               <div className="lg:col-span-8">
                  <h3 className="text-white/40 text-[11px] font-black uppercase tracking-[0.3em] mb-8">云端安全审计系统 (Security Audit)</h3>
                  <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-white/5 text-white/20 text-[9px] font-black uppercase tracking-widest">
                              <th className="px-6 py-4">时间 (Local)</th>
                              <th className="px-6 py-4">身份 (User)</th>
                              <th className="px-6 py-4">动态 (Action)</th>
                              <th className="px-6 py-4">路径 (Path)</th>
                           </tr>
                        </thead>
                        <tbody className="text-white/60 text-xs font-light">
                           {auditLogs.map(log => (
                              <tr key={log.id} className="border-t border-white/5 hover:bg-white/5">
                                 <td className="px-6 py-4 font-mono text-white/30">{log.time}</td>
                                 <td className="px-6 py-4"><span className="px-2 py-0.5 bg-brand-blue/20 rounded text-brand-blue font-bold">{log.user.substring(0,6)}...</span></td>
                                 <td className="px-6 py-4">{log.action}</td>
                                 <td className="px-6 py-4 truncate max-w-[150px]">{log.target}</td>
                              </tr>
                           ))}
                           {auditLogs.length === 0 && (
                              <tr><td colSpan={4} className="px-6 py-12 text-center text-white/20 italic">正在接收云端监控流...</td></tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>
               <div className="lg:col-span-4">
                  <h3 className="text-white/40 text-[11px] font-black uppercase tracking-[0.3em] mb-8">全球访问节点 (Network Topology)</h3>
                  <div className="space-y-4">
                     {[
                        { node: '上海 / Shanghai', ping: networkStats?.sh || '28ms', status: 'optimal' },
                        { node: '美东 / New York', ping: networkStats?.ny || '154ms', status: 'stable' },
                        { node: '德兰 / Frankfurt', ping: networkStats?.fr || '188ms', status: 'stable' },
                        { node: '新加坡 / Singapore', ping: networkStats?.sg || '42ms', status: 'optimal' },
                     ].map(n => (
                        <div key={n.node} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                           <span className="text-white/60 text-xs font-bold">{n.node}</span>
                           <div className="flex items-center gap-3">
                              <span className="text-[10px] font-mono text-brand-blue font-black">{n.ping}</span>
                              <div className={`w-1.5 h-1.5 rounded-full ${n.status === 'optimal' ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* ---- Sample Requests Section ---- */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border mb-12">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-2 h-8 bg-brand-blue rounded-full"></div>
              <h2 className="text-3xl font-black text-brand-dark">📥 样品申请中心 (Sample Requests)</h2>
            </div>
            <div className="flex items-center gap-4">
               {rawSampleCount !== null && (
                 <div className="px-4 py-2 bg-brand-gray text-brand-dark/40 text-[10px] font-black rounded-lg border border-brand-border">
                   DB COUNT: {rawSampleCount}
                 </div>
               )}
               <div className="px-4 py-2 bg-brand-blue/5 text-brand-blue text-[10px] font-black rounded-lg border border-brand-blue/20">
                  ADMIN: {user.email === "a.d.d.y.25433@gmail.com" ? "YES" : "NO"}
               </div>
               {syncError && (
                 <div className="px-4 py-2 bg-red-50 text-red-500 text-[10px] font-black rounded-lg border border-red-100 animate-pulse">
                   SYNC ERROR: {syncError}
                 </div>
               )}
               <button 
                 onClick={fetchSamplesFallback}
                 disabled={isRefreshing}
                 className="px-6 py-2 bg-brand-dark text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-brand-blue transition-all flex items-center gap-2 disabled:opacity-50"
               >
                 <Activity size={12} className={isRefreshing ? 'animate-spin' : ''} />
                 {isRefreshing ? 'REFRESHING...' : 'FORCE REFRESH'}
               </button>
               <button 
                 onClick={async () => {
                   try {
                     await setDoc(doc(collection(db, "sample_requests")), {
                       userName: "TEST_ADMIN_" + Math.floor(Math.random()*1000),
                       companyName: "SEATON_SYSTEM",
                       email: "test@seaton.com",
                       phone: "13500000000",
                       productId: "test-id",
                       productName: "Debug Product",
                       applicationArea: "other",
                       message: "Test record to verify database pipe.",
                       status: "new",
                       createdAt: serverTimestamp()
                     });
                     alert("测试数据已成功写入数据库！");
                     fetchSamplesFallback();
                   } catch(e) {
                     alert("写入失败: " + (e as Error).message);
                   }
                 }}
                 className="px-6 py-2 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-amber-600 transition-all flex items-center gap-2"
               >
                 <FlaskRound size={12} />
                 WRITE TEST DATA
               </button>
               <button 
                 onClick={async () => {
                   const testData = [
                     {
                       userName: "张三 (Test)",
                       companyName: "科技测试有限公司",
                       email: "zhangsan.test@example.com",
                       phone: "13800138001",
                       productId: "seacryl-11p22",
                       productName: "SEACRYL 11P22",
                       applicationArea: "consumer_electronics",
                       substrate: "abs",
                       message: "这是第一条自动生成的测试消息，用于检查后台显示。需要咨询 PUD 树脂在电子产品的应用。",
                       status: "new",
                       type: "general"
                     },
                     {
                       userName: "李四 (Test)",
                       companyName: "汽车内饰配套厂",
                       email: "lisi.auto@example.com",
                       phone: "13512345678",
                       productId: "seapur-50g71",
                       productName: "SEAPUR 50G71",
                       applicationArea: "automotive",
                       substrate: "leather",
                       message: "第二条测试消息。想要申请汽车内饰用皮革涂料树脂的样品。请尽快联系。",
                       status: "new",
                       type: "sample"
                     },
                     {
                       userName: "Wang Wei (International)",
                       companyName: "Global Packaging Solution",
                       email: "wang.wei@globalpack.com",
                       phone: "+86 18688889999",
                       productId: "seacryl-11k40",
                       productName: "SEACRYL 11K40",
                       applicationArea: "printing_ink",
                       substrate: "pet_film",
                       message: "Test 3: Inquiry about high-resolubility inks for film packaging. Need TDS and technical support.",
                       status: "new",
                       type: "tds"
                     }
                   ];
                   
                   try {
                     for (const data of testData) {
                       await addDoc(collection(db, "sample_requests"), {
                         ...data,
                         createdAt: serverTimestamp()
                       });
                     }
                     alert("3条测试数据已成功提交！请刷新页面查看。");
                     fetchSamplesFallback();
                   } catch(e) {
                     alert("批量提交失败: " + (e as Error).message);
                   }
                 }}
                 className="px-6 py-2 bg-green-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-green-700 transition-all flex items-center gap-2"
               >
                 <CheckCircle2 size={12} />
                 SEED 3 TEST MESSAGES
               </button>
               <div className="px-5 py-2 bg-brand-blue/10 rounded-full border border-brand-blue/20 flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">{sampleRequests.filter(r => r.status === 'new').length} NEW LEADS</span>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-brand-border overflow-hidden">
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-brand-gray/50 text-brand-dark/30 text-[9px] font-black uppercase tracking-widest border-b border-brand-border">
                      <th className="px-8 py-6">提交时间</th>
                      <th className="px-8 py-6">来源/类型</th>
                      <th className="px-8 py-6">客户信息</th>
                      <th className="px-8 py-6">事业部/产品</th>
                      <th className="px-8 py-6">行业应用 (优化)</th>
                      <th className="px-8 py-6">状态</th>
                      <th className="px-8 py-6 text-right">操作</th>
                   </tr>
                </thead>
                <tbody className="text-brand-dark text-[13px] font-medium">
                   {sampleRequests.map(req => (
                      <tr key={req.id} className="border-b border-brand-border/50 hover:bg-brand-gray/30 transition-colors">
                         <td className="px-8 py-6 text-brand-dark/40 font-mono text-[11px]">
                           {req.createdAt?.toDate?.()?.toLocaleString() || 'Just now'}
                         </td>
                         <td className="px-8 py-6">
                            <div className="px-3 py-1 bg-brand-dark/[0.03] text-brand-dark/40 text-[9px] font-black uppercase tracking-tighter rounded border border-brand-border inline-block">
                               {req.type || 'Direct'}
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex flex-col gap-1">
                               <div className="font-black text-brand-dark">{req.userName} <span className="text-brand-dark/20 font-light ml-2">@{req.companyName}</span></div>
                               <div className="text-[11px] text-brand-dark/40 flex items-center gap-4">
                                  <span className="flex items-center gap-1"><Mail size={12} /> {req.email}</span>
                                  <span className="flex items-center gap-1"><Smartphone size={12} /> {req.phone}</span>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex flex-col gap-1">
                               <div className="px-3 py-1 bg-brand-blue/5 text-brand-blue text-[10px] font-black uppercase tracking-widest rounded-lg border border-brand-blue/10 inline-block w-fit">
                                  {req.productName}
                               </div>
                               {req.productId && req.productId !== 'none' && (
                                 <div className="text-[9px] text-brand-dark/20 font-bold uppercase tracking-widest mt-1">ID: {req.productId}</div>
                               )}
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex flex-col gap-1.5">
                               <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                                  <span className="text-brand-dark/60 uppercase text-[10px] font-black tracking-widest">
                                    {req.applicationArea ? (
                                      req.applicationArea.replace(/_/g, ' ')
                                    ) : '未指定'}
                                  </span>
                                </div>
                               {req.substrate && (
                                 <div className="pl-3.5 text-[9px] text-brand-blue/60 font-black uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-3 h-[1px] bg-brand-blue/20"></div>
                                    基材: {req.substrate}
                                 </div>
                               )}
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
                               req.status === 'new' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                               req.status === 'processing' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                               req.status === 'completed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                               'bg-gray-100 text-gray-500 border border-gray-200'
                            }`}>
                               {req.status === 'new' && <Clock size={10} />}
                               {req.status === 'processing' && <Activity size={10} />}
                               {req.status === 'completed' && <CheckCircle2 size={10} />}
                               {req.status}
                            </span>
                         </td>
                         <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-3">
                               <select 
                                 value={req.status}
                                 onChange={async (e) => {
                                    try {
                                       await updateDoc(doc(db, 'sample_requests', req.id), {
                                          status: e.target.value
                                       });
                                    } catch (err) { console.error(err); }
                                 }}
                                 className="px-4 py-2 bg-brand-gray border border-brand-border rounded-xl text-[10px] font-black uppercase tracking-widest outline-none hover:border-brand-blue transition-colors"
                               >
                                  <option value="new">New</option>
                                  <option value="processing">Processing</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                               </select>
                               <button 
                                 onClick={async () => {
                                    if(confirm('确定要删除这条申请吗？')) {
                                       try {
                                          await deleteDoc(doc(db, 'sample_requests', req.id));
                                       } catch (err) { console.error(err); }
                                    }
                                 }}
                                 className="w-10 h-10 flex items-center justify-center text-brand-dark/20 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                               >
                                  <Trash2 size={16} />
                               </button>
                            </div>
                         </td>
                      </tr>
                   ))}
                   {sampleRequests.length === 0 && (
                      <tr>
                         <td colSpan={6} className="px-8 py-32 text-center">
                            <div className="max-w-xs mx-auto text-brand-dark/20">
                               <FlaskRound size={48} className="mx-auto mb-6 opacity-20" />
                               <p className="text-sm font-black uppercase tracking-widest">暂无样品申请线索</p>
                               <p className="text-xs font-medium mt-2">Marketing system is listening for new leads...</p>
                            </div>
                         </td>
                      </tr>
                   )}
                </tbody>
             </table>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border mb-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-2 h-8 bg-brand-blue rounded-full"></div>
            <h2 className="text-3xl font-black text-brand-dark">🌍 全站基础信息 (Global & SEO)</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-xl font-black text-brand-dark border-b border-brand-border pb-4 flex items-center gap-3">
                <SearchIcon size={20} className="text-brand-blue" /> 搜索引擎优化 (SEO)
              </h3>
              <div className="bg-brand-gray/50 p-8 rounded-3xl border border-brand-border">
                {user && <TextUpdateField assetKey="seo_title" label="网站标题 (Browser Title)" user={user} placeholder="例如：西顿新材料 - 全球领先的水性树脂专家" />}
                {user && <TextUpdateField assetKey="seo_keywords" label="搜索关键词 (Keywords)" user={user} placeholder="关键词用逗号隔开，如：水性树脂, PUD, 环保涂料" />}
                {user && <TextUpdateField assetKey="seo_description" label="页面描述 (Description)" user={user} type="textarea" placeholder="简短的公司介绍，会出现在搜索结果下方" />}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-xl font-black text-brand-dark border-b border-brand-border pb-4 flex items-center gap-3">
                <Smartphone size={20} className="text-brand-blue" /> 联系方式 & 社交媒体
              </h3>
              <div className="bg-brand-gray/50 p-8 rounded-3xl border border-brand-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user && <TextUpdateField assetKey="company_phone" label="公司热线" user={user} placeholder="400-XXX-XXXX" />}
                  {user && <TextUpdateField assetKey="company_email" label="联系邮箱" user={user} placeholder="info@example.com" />}
                </div>
                {user && <TextUpdateField assetKey="company_address" label="总部地址" user={user} placeholder="公司详细地理位置" />}
                {user && <TextUpdateField assetKey="company_linkedin" label="LinkedIn 链接" user={user} placeholder="LinkedIn URL" />}
                <div className="mt-8 border-t border-brand-border pt-8">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-brand-dark/40 mb-4">微信公众号二维码</h4>
                  {user && <ImageUploadButton assetKey="company_wechat_qr" label="上传微信二维码" user={user} />}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-brand-border pt-12">
            <h3 className="text-xl font-black text-brand-dark mb-6 flex items-center gap-3">
              <Globe size={20} className="text-brand-blue" /> 公告栏管理
            </h3>
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
                关闭公告
              </button>
            </div>
          </div>
        </div>

        {/* ---- Stats Section ---- */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border mb-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-2 h-8 bg-brand-blue rounded-full"></div>
            <h2 className="text-3xl font-black text-brand-dark">📊 核心运营数据 (Key Stats)</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-xl font-black text-brand-dark border-b border-brand-border pb-4 flex items-center gap-3">
                 🔬 研发硬核数据 (R&D)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-brand-gray/50 p-8 rounded-3xl border border-brand-border">
                {user && <TextUpdateField assetKey="rd_stat_investment" label="研发投入比 (%)" user={user} placeholder="15" />}
                {user && <TextUpdateField assetKey="rd_stat_patents" label="获得专利数 (+)" user={user} placeholder="50" />}
                {user && <TextUpdateField assetKey="rd_stat_staff" label="研发人员 (+)" user={user} placeholder="50" />}
                {user && <TextUpdateField assetKey="rd_stat_partners" label="合作伙伴 (+)" user={user} placeholder="10" />}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-xl font-black text-brand-dark border-b border-brand-border pb-4 flex items-center gap-3">
                 🌱 可持续发展数据 (ESG)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-brand-gray/50 p-8 rounded-3xl border border-brand-border">
                {user && <TextUpdateField assetKey="sust_stat_voc" label="VOC减排量 (吨)" user={user} placeholder="30,000+" />}
                {user && <TextUpdateField assetKey="sust_stat_energy" label="清洁能源占比 (%)" user={user} placeholder="40" />}
                {user && <TextUpdateField assetKey="sust_stat_investment" label="环保投入比 (%)" user={user} placeholder="15" />}
                {user && <TextUpdateField assetKey="sust_stat_base" label="环保基地覆盖率 (%)" user={user} placeholder="100" />}
              </div>
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

        {/* ---- About, Products & Divisions Actions ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
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

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-2xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-4">🏭 事业部 (Divisions)</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-black text-brand-dark mb-2">事业部页顶部横幅图</h3>
                {user && <ImageUploadButton assetKey="divisions_hero_bg" label="上传顶部大图" user={user} />}
              </div>
              <div className="border-t border-brand-border pt-6">
                <h3 className="text-sm font-black text-brand-dark mb-2">内容页 - 六大事业部图</h3>
                <div className="grid grid-cols-2 gap-4">
                  {user && <ImageUploadButton assetKey="division_inner_leather" label="皮革纺织" user={user} />}
                  {user && <ImageUploadButton assetKey="division_inner_resin" label="水性树脂" user={user} />}
                  {user && <ImageUploadButton assetKey="division_inner_auto" label="汽车内饰" user={user} />}
                  {user && <ImageUploadButton assetKey="division_inner_uv" label="水性UV" user={user} />}
                  {user && <ImageUploadButton assetKey="division_inner_battery" label="动力电池" user={user} />}
                  {user && <ImageUploadButton assetKey="division_inner_custom" label="定制服务" user={user} />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Other Inner Pages Actions ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-3">🌍 市场应用 (Market App)</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-brand-dark mb-2">顶部横幅图</h3>
                {user && <ImageUploadButton assetKey="market_hero_bg" label="上传横幅图" user={user} />}
              </div>
              <div className="border-t border-brand-border pt-6">
                <h3 className="text-sm font-black text-brand-dark mb-2">内容页 - 六大应用领域图</h3>
                <div className="grid grid-cols-2 gap-4">
                  {user && <ImageUploadButton assetKey="market_inner_automotive" label="汽车工业" user={user} />}
                  {user && <ImageUploadButton assetKey="market_inner_electronics" label="消费电子" user={user} />}
                  {user && <ImageUploadButton assetKey="market_inner_packaging" label="包装印刷" user={user} />}
                  {user && <ImageUploadButton assetKey="market_inner_home" label="建筑家居" user={user} />}
                  {user && <ImageUploadButton assetKey="market_inner_leather" label="皮革涂饰" user={user} />}
                  {user && <ImageUploadButton assetKey="market_inner_sports" label="运动器材" user={user} />}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-3">🔬 革新 (Innovation)</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-brand-dark mb-2">革新页顶部横幅图</h3>
                {user && <ImageUploadButton assetKey="innovation_hero_bg" label="上传横幅图" user={user} />}
              </div>
              <div className="border-t border-brand-border pt-6">
                <h3 className="text-sm font-black text-brand-dark mb-2">研发理念 - 实验室实景图</h3>
                {user && <ImageUploadButton assetKey="innovation_lab_img" label="上传实验室图" user={user} />}
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-3">🧪 研发创新 (R&D)</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-brand-dark mb-2">研发创新页顶部横幅图</h3>
                {user && <ImageUploadButton assetKey="rd_hero_bg" label="上传横幅图" user={user} />}
              </div>
              <div className="border-t border-brand-border pt-6">
                <h3 className="text-sm font-black text-brand-dark mb-2">研发基础设施 - 实验场景配图</h3>
                <div className="grid grid-cols-2 gap-4">
                  {user && <ImageUploadButton assetKey="rd_lab_img1" label="场景图一" user={user} />}
                  {user && <ImageUploadButton assetKey="rd_lab_img2" label="场景图二" user={user} />}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-3">🌱 可持续发展 (Sustainability)</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-brand-dark mb-2">可持续发展页顶部横幅图</h3>
                {user && <ImageUploadButton assetKey="sustainability_hero_bg" label="上传横幅图" user={user} />}
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-border">
            <h2 className="text-xl font-black text-brand-dark mb-8 border-l-4 border-brand-blue pl-3">📞 联系我们 (Contact)</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-brand-dark mb-2">联系我们页顶部横幅图</h3>
                {user && <ImageUploadButton assetKey="contact_hero_bg" label="上传横幅图" user={user} />}
              </div>
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

const BugSimulator = ({ onCrash }: { onCrash: () => void }) => {
  useEffect(() => {
     const timer = setTimeout(() => {
        throw new Error("西顿自愈监测系统：手动触发的 Bug 测试 ✅ 系统拦截成功！");
     }, 1000);
     return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl mb-8 animate-pulse">
      <p className="text-red-400 text-xs font-black uppercase tracking-widest text-center">
        正在模拟生产环境严重错误... 系统将在 1 秒后崩溃并触发 ErrorBoundary 拦截机制。
      </p>
    </div>
  );
};
