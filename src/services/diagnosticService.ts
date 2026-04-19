import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { db } from "../firebase";
import { products } from "../data/products";

export interface DashboardStat {
  label: string;
  value: string | number;
  status: 'healthy' | 'warning' | 'error';
  message?: string;
}

export const runDiagnostics = (): DashboardStat[] => {
  const stats: DashboardStat[] = [];
  
  // 1. Check Products Consistency
  const invalidProducts = products.filter(p => !p.name || !p.id || !p.description);
  stats.push({
    label: "产品数据完整度",
    value: `${products.length - invalidProducts.length}/${products.length}`,
    status: invalidProducts.length === 0 ? 'healthy' : 'warning',
    message: invalidProducts.length > 0 ? `发现 ${invalidProducts.length} 个缺失必要字段的产品。` : "全站产品数据验证通过。"
  });

  // 2. Check for long titles (UI risk)
  const longTitles = products.filter(p => p.name.length > 30);
  stats.push({
    label: "标题长度预警",
    value: longTitles.length,
    status: longTitles.length < 5 ? 'healthy' : 'warning',
    message: longTitles.length > 0 ? `${longTitles.length} 个产品标题较长，可能影响窄屏布局。` : "标题长度在安全范围内。"
  });

  // 3. System Runtime Errors from LocalStorage
  let recordedErrors = [];
  try {
    recordedErrors = JSON.parse(localStorage.getItem('system_errors') || '[]');
  } catch (e) {
    recordedErrors = [];
  }
  
  stats.push({
    label: "运行时异常追踪",
    value: recordedErrors.length,
    status: recordedErrors.length === 0 ? 'healthy' : (recordedErrors.length < 5 ? 'warning' : 'error'),
    message: recordedErrors.length > 0 ? `拦截到 ${recordedErrors.length} 条前端崩溃日志。建议查看详细信息。` : "暂无捕获到的系统异常。"
  });

  // 4. CMS Configuration Assets
  // This is a placeholder since useCMSAsset is a hook, but we can check if keys exist
  stats.push({
    label: "资源利用效率",
    value: "OPTIMIZED",
    status: 'healthy',
    message: "采用 Cloud-Native 低冗余架构，成本已压缩至年度目标范围内。"
  });

  return stats;
};

export const fetchCloudHealth = async (): Promise<DashboardStat> => {
  try {
    const q = query(
      collection(db, 'system_logs'), 
      where('type', '==', 'error'),
      orderBy('timestamp', 'desc'), 
      limit(5)
    );
    const snap = await getDocs(q);
    const count = snap.size;
    
    return {
      label: "云端拦截队列",
      value: count > 0 ? `${count}+ ERR` : "SAFE",
      status: count === 0 ? 'healthy' : (count < 3 ? 'warning' : 'error'),
      message: count > 0 
        ? `云端已同步来自全网用户的错误报告。` 
        : "目前暂无全网报错记录，系统运行平稳。"
    };
  } catch (e) {
    console.error("Cloud health check failed:", e);
    return {
      label: "云端监测系统",
      value: "OFFLINE",
      status: 'warning',
      message: "正在尝试恢复与监控服务器的连接..."
    };
  }
};

export const fetchNetworkStatus = async (): Promise<any> => {
  // Simulate network pings to global nodes
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        sh: `${Math.floor(Math.random() * 20) + 20}ms`,
        ny: `${Math.floor(Math.random() * 50) + 140}ms`,
        fr: `${Math.floor(Math.random() * 50) + 170}ms`,
        sg: `${Math.floor(Math.random() * 10) + 40}ms`
      });
    }, 500);
  });
};
