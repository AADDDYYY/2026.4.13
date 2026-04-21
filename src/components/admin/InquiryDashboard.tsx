import { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { LayoutGrid, TrendingUp, PieChart as PieChartIcon, Target, Users } from 'lucide-react';

interface SampleRequest {
  id: string;
  applicationArea: string;
  createdAt: any;
  type?: string;
}

interface InquiryDashboardProps {
  requests: SampleRequest[];
}

const COLORS = ['#0055a2', '#0072d6', '#3391e6', '#66aff5', '#99ceff'];

export default function InquiryDashboard({ requests }: InquiryDashboardProps) {
  
  const stats = useMemo(() => {
    // 1. Requests by Application Area
    const areaMap: Record<string, number> = {};
    // 2. Requests by Type (Inquiry vs TDS)
    const typeMap: Record<string, number> = { 'general': 0, 'tds': 0, 'sample': 0 };
    // 3. Requests by Day (Last 7 days)
    const dayMap: Record<string, number> = {};

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    last7Days.forEach(day => { dayMap[day] = 0; });

    requests.forEach(req => {
      // Area
      const area = req.applicationArea || 'Unknown';
      areaMap[area] = (areaMap[area] || 0) + 1;

      // Type
      const type = req.type || 'general';
      typeMap[type] = (typeMap[type] || 0) + 1;

      // Day
      if (req.createdAt) {
        const date = req.createdAt.toDate ? req.createdAt.toDate() : new Date(req.createdAt);
        const dayStr = date.toISOString().split('T')[0];
        if (dayMap[dayStr] !== undefined) {
          dayMap[dayStr]++;
        }
      }
    });

    const areaData = Object.entries(areaMap).map(([name, value]) => ({ name: name.replace(/_/g, ' '), value }));
    const typeData = Object.entries(typeMap).map(([name, value]) => ({ name: name.toUpperCase(), value }));
    const trendData = Object.entries(dayMap).map(([date, count]) => ({ 
      date: date.split('-').slice(1).join('/'), 
      count 
    }));

    return { areaData, typeData, trendData };
  }, [requests]);

  return (
    <div className="space-y-8 mb-12">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-2 h-8 bg-brand-blue rounded-full"></div>
        <div>
          <h2 className="text-3xl font-black text-brand-dark">📊 咨询数据概览 (Inquiry Analytics)</h2>
          <p className="text-brand-dark/40 text-[11px] font-black uppercase tracking-widest mt-1">Market Demand & Lead Insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Area Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-brand-border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-brand-dark flex items-center gap-2">
              <TrendingUp size={16} className="text-brand-blue" /> 近7日申请趋势
            </h3>
            <span className="text-[10px] font-bold text-brand-dark/20 uppercase tracking-widest">Growth Analytics</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.trendData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0055a2" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0055a2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#ccc' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#ccc' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="count" stroke="#0055a2" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Pie Chart */}
        <div className="bg-white p-8 rounded-[40px] border border-brand-border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-brand-dark flex items-center gap-2">
              <Target size={16} className="text-brand-blue" /> 行业偏好分布
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.areaData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.areaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {stats.areaData.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-dark/40">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
