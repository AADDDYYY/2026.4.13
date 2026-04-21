import { X, CheckCircle2, Clock, Activity, Trash2, Mail, Smartphone, Building2, MapPin, MessageSquare, Tag, Package, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

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

interface LeadDetailsModalProps {
  lead: SampleRequest;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function LeadDetailsModal({ lead, onClose, onUpdateStatus, onDelete }: LeadDetailsModalProps) {
  const formattedDate = lead.createdAt?.toDate?.()?.toLocaleString() || new Date(lead.createdAt).toLocaleString();

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
        className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative z-10 pointer-events-auto"
      >
        <div className="px-10 py-8 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
              lead.status === 'new' ? 'bg-amber-100 text-amber-700 border-amber-200' :
              lead.status === 'processing' ? 'bg-blue-100 text-blue-700 border-blue-200' :
              'bg-emerald-100 text-emerald-700 border-emerald-200'
            }`}>
              {lead.status === 'new' ? <Clock size={24} /> : lead.status === 'processing' ? <Activity size={24} /> : <CheckCircle2 size={24} />}
            </div>
            <div>
              <h2 className="text-2xl font-black text-brand-dark tracking-tight">线索详情 (Lead Details)</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mt-1">Ref: {lead.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-brand-gray transition-colors text-brand-dark/20 hover:text-brand-dark"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <div className="space-y-10">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-6 block">客户基本信息</label>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-gray flex items-center justify-center text-brand-dark/40"><Building2 size={18} /></div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-tight text-brand-dark/30">公司名称</div>
                      <div className="font-bold text-brand-dark">{lead.companyName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-gray flex items-center justify-center text-brand-dark/40"><MessageSquare size={18} /></div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-tight text-brand-dark/30">联系人</div>
                      <div className="font-bold text-brand-dark">{lead.userName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-gray flex items-center justify-center text-brand-dark/40"><Mail size={18} /></div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-tight text-brand-dark/30">电子邮件</div>
                      <div className="font-bold text-brand-dark">{lead.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-gray flex items-center justify-center text-brand-dark/40"><Smartphone size={18} /></div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-tight text-brand-dark/30">联系电话</div>
                      <div className="font-bold text-brand-dark">{lead.phone}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-6 block">应用背景</label>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-gray flex items-center justify-center text-brand-dark/40"><Tag size={18} /></div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-tight text-brand-dark/30">行业领域</div>
                      <div className="font-bold capitalize text-brand-dark">{lead.applicationArea?.replace(/_/g, ' ')}</div>
                    </div>
                  </div>
                  {lead.substrate && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-gray flex items-center justify-center text-brand-dark/40"><MapPin size={18} /></div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-tight text-brand-dark/30">目标基材</div>
                        <div className="font-bold text-brand-dark">{lead.substrate}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Product & Message */}
            <div className="space-y-10">
              <div className="bg-brand-gray/50 p-8 rounded-[30px] border border-brand-border">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-6 block">产品需求</label>
                <div className="flex items-start gap-4 mb-6">
                  <Package className="text-brand-blue shrink-0" size={24} />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-tight text-brand-dark/30">咨询产线/型号</div>
                    <div className="text-xl font-black text-brand-dark">{lead.productName}</div>
                    {lead.productId && lead.productId !== 'none' && <div className="text-[10px] font-bold text-brand-blue mt-1">ID: {lead.productId}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="px-3 py-1 bg-brand-dark text-white rounded text-[10px] font-black uppercase tracking-widest">
                     Type: {lead.type || 'direct'}
                   </div>
                   <div className="flex items-center gap-2 text-brand-dark/40 text-[10px] font-bold">
                     <Calendar size={12} /> {formattedDate}
                   </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-4 block">留言内容</label>
                <div className="bg-white p-8 rounded-[30px] border border-brand-border text-brand-dark/70 text-sm leading-relaxed whitespace-pre-wrap italic">
                  "{lead.message}"
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-10 py-8 border-t border-brand-border bg-brand-gray/30 flex items-center justify-between">
          <button 
            onClick={() => {
              if (confirm('确定要删除吗？')) {
                onDelete(lead.id);
                onClose();
              }
            }}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} /> 删除此线索
          </button>
          
          <div className="flex items-center gap-4">
            <select 
              value={lead.status}
              onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
              className="px-6 py-3 bg-white border border-brand-border rounded-xl text-[10px] font-black uppercase tracking-widest outline-none hover:border-brand-blue transition-colors shadow-sm"
            >
              <option value="new">New / 新线索</option>
              <option value="processing">Processing / 处理中</option>
              <option value="completed">Completed / 已闭环</option>
              <option value="cancelled">Cancelled / 已作废</option>
            </select>
            <button 
              onClick={onClose}
              className="px-10 py-3 bg-brand-blue text-white rounded-xl font-black text-[12px] uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand-blue/20"
            >
              关闭视图
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
