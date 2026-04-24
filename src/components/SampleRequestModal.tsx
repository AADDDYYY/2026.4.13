import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2, Building2, User, Mail, Phone, MessageSquare, Briefcase } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { handleFirestoreError, OperationType } from "../firebase";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: string;
}

export const SampleRequestModal = ({ isOpen, onClose, productName, productId }: SampleRequestModalProps) => {
  const [formData, setFormData] = useState({
    userName: "",
    companyName: "",
    email: "",
    phone: "",
    applicationArea: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.userName,
        email: formData.email,
        phone: formData.phone,
        company: formData.companyName,
        industry: formData.applicationArea,
        message: formData.message,
        product_id: productId,
        product_name: productName,
        status: "new",
        type: 'sample'
      };

      if (isSupabaseConfigured()) {
        console.log("Supabase submission attempt with payload:", payload);
        const { error } = await supabase.from('leads').insert([{
          ...payload,
          created_at: new Date().toISOString()
        }]);
        
        if (error) {
          console.error("Supabase write error details:", error);
          // Check for missing columns error (PGRST204)
          if (error.code === 'PGRST204' || (error.message && error.message.includes('column'))) {
            alert(`提交失败：数据库表结构不完整。\n\n请在 Supabase SQL Editor 中运行以下代码：\n\nALTER TABLE leads \nADD COLUMN IF NOT EXISTS status text,\nADD COLUMN IF NOT EXISTS type text,\nADD COLUMN IF NOT EXISTS product_id text,\nADD COLUMN IF NOT EXISTS product_name text;\n\n错误详情: ${error.message}`);
          } else {
            alert("提交失败: " + error.message);
          }
          throw error;
        }
      } else {
        await addDoc(collection(db, "sample_requests"), {
          ...formData,
          productId,
          productName,
          status: "new",
          createdAt: serverTimestamp()
        });
      }
      
      console.log("Sample request submitted successfully!");
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting sample request:", error);
      alert("提交失败，请稍后重试。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            {isSuccess ? (
              <div className="p-16 text-center">
                <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-black mb-6 tracking-tight">申请已提交</h2>
                <p className="text-brand-dark/40 text-lg font-medium leading-relaxed mb-12">
                  感谢您对 <span className="text-brand-blue font-black">{productName}</span> 的关注。我们的技术顾问将在 24 小时内联系您。
                </p>
                <button
                  onClick={onClose}
                  className="px-12 py-5 bg-brand-blue text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-dark transition-all shadow-xl shadow-brand-blue/20"
                >
                  关闭
                </button>
              </div>
            ) : (
              <>
                <div className="p-10 bg-brand-dark text-white flex justify-between items-center">
                   <div>
                      <h2 className="text-3xl font-black tracking-tight">索取样品申请</h2>
                      <p className="text-brand-blue/60 text-[10px] uppercase font-black tracking-widest mt-2">{productName}</p>
                   </div>
                   <button onClick={onClose} className="w-12 h-12 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <form onSubmit={handleSubmit} className="p-10 md:p-16 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 ml-2 flex items-center gap-2">
                        <User size={12} className="text-brand-blue" /> 姓名
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.userName}
                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        className="w-full bg-brand-gray border border-brand-border rounded-2xl py-5 px-6 font-bold text-brand-dark outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        placeholder="请输入姓名"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 ml-2 flex items-center gap-2">
                        <Building2 size={12} className="text-brand-blue" /> 公司名称
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-brand-gray border border-brand-border rounded-2xl py-5 px-6 font-bold text-brand-dark outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        placeholder="请输入公司全称"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 ml-2 flex items-center gap-2">
                        <Mail size={12} className="text-brand-blue" /> 电子邮箱
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-brand-gray border border-brand-border rounded-2xl py-5 px-6 font-bold text-brand-dark outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        placeholder="example@company.com"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 ml-2 flex items-center gap-2">
                        <Phone size={12} className="text-brand-blue" /> 联系电话
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-brand-gray border border-brand-border rounded-2xl py-5 px-6 font-bold text-brand-dark outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        placeholder="请输入电话号码"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 ml-2 flex items-center gap-2">
                      <Briefcase size={12} className="text-brand-blue" /> 应用领域
                    </label>
                    <select
                      value={formData.applicationArea}
                      onChange={(e) => setFormData({ ...formData, applicationArea: e.target.value })}
                      className="w-full bg-brand-gray border border-brand-border rounded-2xl py-5 px-6 font-bold text-brand-dark outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    >
                      <option value="">请选择应用方向</option>
                      <option value="plastic">塑胶涂漆</option>
                      <option value="wood">木器家具</option>
                      <option value="ink">油墨印制</option>
                      <option value="leather">皮革涂饰</option>
                      <option value="industrial">工业防腐</option>
                      <option value="electronics">消费电子</option>
                      <option value="other">其他应用</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 ml-2 flex items-center gap-2">
                      <MessageSquare size={12} className="text-brand-blue" /> 技术需求补充
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-brand-gray border border-brand-border rounded-3xl py-5 px-6 font-bold text-brand-dark outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none"
                      placeholder="请简要描述您的性能要求或目前遇到的技术难点..."
                    ></textarea>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-8 bg-brand-blue text-white rounded-3xl font-black uppercase tracking-[0.3em] text-[12px] hover:bg-brand-dark transition-all shadow-2xl shadow-brand-blue/30 flex items-center justify-center gap-6 group disabled:opacity-50"
                  >
                    {isSubmitting ? "正在提交中..." : "立即提交申请"}
                    {!isSubmitting && <Send size={20} className="group-hover:translate-x-3 transition-transform" />}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
