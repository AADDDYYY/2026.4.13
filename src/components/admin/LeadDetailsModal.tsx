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
        className="bg-white w-full max-w-3xl rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative z-10 pointer-events-auto max-h-[90vh]"
      >
        <div className="px-6 md:px-10 py-6 md:py-8 border-b border-brand-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center border ${
              lead.status === 'new' ? 'bg-amber-100 text-amber-700 border-amber-200' :
              lead.status === 'processing' ? 'bg-blue-100 text-blue-700 border-blue-200' :
              'bg-emerald-100 text-emerald-700 border-emerald-200'
            }`}>
              {lead.status === 'new' ? <Clock className="w-5 h-5 md:w-6 md:h-6" /> : lead.status === 'processing' ? <Activity className="w-5 h-5 md:w-6 md:h-6" /> : <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-brand-dark tracking-tight">线索详情</h2>
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mt-0.5 md:mt-1">Ref: {lead.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl hover:bg-brand-gray transition-colors text-brand-dark/20 hover:text-brand-dark"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left: Contact Info */}
            <div className="space-y-8 md:space-y-10">
              <div>
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brand-blue mb-4 md:mb-6 block">客户基本信息</label>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-gray flex items-center justify-center text-brand-dark/40"><Building2 className="w-4 h-4 md:w-4.5 md:h-4.5" /></div>
                    <div>
                      <div className="text-[9px] md:text-[10px] font-black uppercase tracking-tight text-brand-dark/30">公司名称</div>
                      <div className="font-bold text-brand-dark text-sm md:text-base">{lead.companyName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-gray flex items-center justify-center text-brand-dark/40"><MessageSquare className="w-4 h-4 md:w-4.5 md:h-4.5" /></div>
                    <div>
                      <div className="text-[9px] md:text-[10px] font-black uppercase tracking-tight text-brand-dark/30">联系人</div>
                      <div className="font-bold text-brand-dark text-sm md:text-base">{lead.userName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-gray flex items-center justify-center text-brand-dark/40"><Mail className="w-4 h-4 md:w-4.5 md:h-4.5" /></div>
                    <div>
                      <div className="text-[9px] md:text-[10px] font-black uppercase tracking-tight text-brand-dark/30">电子邮件</div>
                      <div className="font-bold text-brand-dark text-sm md:text-base break-all">{lead.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-gray flex items-center justify-center text-brand-dark/40"><Smartphone className="w-4 h-4 md:w-4.5 md:h-4.5" /></div>
                    <div>
                      <div className="text-[9px] md:text-[10px] font-black uppercase tracking-tight text-brand-dark/30">联系电话</div>
                      <div className="font-bold text-brand-dark text-sm md:text-base">{lead.phone}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brand-blue mb-4 md:mb-6 block">应用背景</label>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-gray flex items-center justify-center text-brand-dark/40"><Tag className="w-4 h-4 md:w-4.5 md:h-4.5" /></div>
                    <div>
                      <div className="text-[9px] md:text-[10px] font-black uppercase tracking-tight text-brand-dark/30">行业领域</div>
                      <div className="font-bold capitalize text-brand-dark text-sm md:text-base">{lead.applicationArea?.replace(/_/g, ' ')}</div>
                    </div>
                  </div>
                  {lead.substrate && (
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-gray flex items-center justify-center text-brand-dark/40"><MapPin className="w-4 h-4 md:w-4.5 md:h-4.5" /></div>
                      <div>
                        <div className="text-[9px] md:text-[10px] font-black uppercase tracking-tight text-brand-dark/30">目标基材</div>
                        <div className="font-bold text-brand-dark text-sm md:text-base">{lead.substrate}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Product & Message */}
            <div className="space-y-8 md:space-y-10">
              <div className="bg-brand-gray/50 p-6 md:p-8 rounded-2xl md:rounded-[30px] border border-brand-border">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brand-blue mb-4 md:mb-6 block">产品需求</label>
                <div className="flex items-start gap-4 mb-4 md:mb-6">
                  <Package className="text-brand-blue shrink-0 w-5 h-5 md:w-6 md:h-6" />
                  <div>
                    <div className="text-[9px] md:text-[10px] font-black uppercase tracking-tight text-brand-dark/30">咨询产线/型号</div>
                    <div className="text-lg md:text-xl font-black text-brand-dark">{lead.productName}</div>
                    {lead.productId && lead.productId !== 'none' && <div className="text-[9px] md:text-[10px] font-bold text-brand-blue mt-1">ID: {lead.productId}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                   <div className="px-2 md:px-3 py-1 bg-brand-dark text-white rounded text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                     Type: {lead.type || 'direct'}
                   </div>
                   <div className="flex items-center gap-1.5 md:gap-2 text-brand-dark/40 text-[9px] md:text-[10px] font-bold">
                     <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" /> {formattedDate}
                   </div>
                </div>
              </div>

              <div>
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brand-blue mb-3 md:mb-4 block">留言内容</label>
                <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[30px] border border-brand-border text-brand-dark/70 text-sm leading-relaxed whitespace-pre-wrap italic">
                  "{lead.message}"
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-10 py-6 md:py-8 border-t border-brand-border bg-brand-gray/30 flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0">
          <button 
            onClick={() => {
              onDelete(lead.id);
              onClose();
            }}
            className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> 删除此线索
          </button>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
            <select 
              value={lead.status}
              onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
              className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-white border border-brand-border rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest outline-none hover:border-brand-blue transition-colors shadow-sm"
            >
              <option value="new">New / 新线索</option>
              <option value="processing">Processing / 处理中</option>
              <option value="completed">Completed / 已闭环</option>
              <option value="cancelled">Cancelled / 已作废</option>
            </select>
            <button 
              onClick={onClose}
              className="w-full sm:w-auto px-6 md:px-10 py-2 md:py-3 bg-brand-blue text-white rounded-xl font-black text-[11px] md:text-[12px] uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand-blue/20"
            >
              关闭
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
