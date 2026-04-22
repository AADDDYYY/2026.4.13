import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, ArrowRight, FileText, Beaker, MessageSquare, CheckCircle2, ChevronDown, Layers, Target, Briefcase as BriefcaseIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCMSAsset } from "../hooks/useCMSAsset";
import { useProducts } from "../hooks/useProducts";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { handleFirestoreError, OperationType } from "../firebase";

export default function Contact() {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get("type") || "general";
  const initialProduct = queryParams.get("product") || "";

  const { products } = useProducts();

  const [requestType, setRequestType] = useState(initialType);
  const [productName, setProductName] = useState(initialProduct);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    substrate: "",
    message: ""
  });

  const { value: contactHeroBg } = useCMSAsset('contact_hero_bg', 'https://images.unsplash.com/photo-1542382156909-9ae38d3884c1?auto=format&fit=crop&q=80&w=1600');
  const { value: companyPhone } = useCMSAsset('company_phone', '400 0069 655');
  const { value: companyEmail } = useCMSAsset('company_email', 'info@seatonchem.com');
  const { value: companyFactoryAddress } = useCMSAsset('company_factory_address', '广东省韶关市南雄高新区平安三路西1号');
  const { value: companyRDAddress } = useCMSAsset('company_rd_address', '广州市番禺石楼镇国康大道岳溪路段罗岗工业区3号');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "sample_requests"), {
        userName: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.company,
        applicationArea: formData.industry,
        substrate: formData.substrate,
        message: formData.message,
        productName: productName || "General Inquiry",
        productId: productName ? (products.find(p => p.name === productName)?.id || "other") : "none",
        status: "new",
        type: requestType,
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        industry: "",
        substrate: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      try {
        handleFirestoreError(error, OperationType.CREATE, "sample_requests");
      } catch (errInfo) {
        alert("提交失败（安全审计拒绝）。详细信息: " + (errInfo as Error).message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (initialType) setRequestType(initialType);
    if (initialProduct) setProductName(initialProduct);
  }, [initialType, initialProduct]);

  return (
    <div className="pt-24 md:pt-48 pb-16 md:pb-32 bg-white text-brand-dark min-h-screen overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-20 relative">
        {contactHeroBg ? (
          <div className="absolute inset-0 -z-10 rounded-b-[60px] md:rounded-b-[100px] overflow-hidden opacity-20">
            <img src={contactHeroBg} alt="Contact Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        ) : (
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-blue/5 rounded-full blur-[250px] -z-10"></div>
        )}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24 md:mb-56 relative"
        >
          <div className="flex items-center justify-center gap-6 mb-8 md:mb-16">
            <div className="h-px w-12 md:w-16 bg-brand-blue"></div>
            <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-[10px] md:text-[11px]">
              Contact & Support
            </span>
            <div className="h-px w-12 md:w-16 bg-brand-blue"></div>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[10rem] font-black mb-8 md:mb-16 tracking-tight leading-[0.85]">
            {t("contact.hero.title")}<br />
            <span className="text-brand-blue sm:text-[0.6em] md:text-[0.4em] lg:text-[0.3em] tracking-normal">Contact & Support</span>
          </h1>
          <p className="text-brand-dark/40 text-lg sm:text-2xl md:text-4xl max-w-5xl mx-auto font-light leading-relaxed">
            {t("contact.hero.desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 mb-56">
          <div className="lg:col-span-5">
            <h2 className="text-5xl md:text-8xl font-black mb-16 tracking-tighter leading-[0.9] text-brand-dark">
              {t("contact.info.title")}<br />
              <span className="text-brand-blue">{t("contact.info.subtitle")}</span>
            </h2>
            <p className="text-brand-dark/40 text-2xl mb-24 leading-relaxed font-light max-w-xl">
              {t("contact.info.desc")}
            </p>

            <div className="space-y-16">
              <div className="flex items-start gap-12 border-t border-brand-border pt-16 group">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <Phone size={32} />
                </div>
                <div>
                  <h4 className="font-black text-3xl mb-4 text-brand-dark tracking-tight">{t("contact.info.phone")}</h4>
                  <p className="text-brand-dark/40 text-xl font-medium">{companyPhone}</p>
                  <p className="text-brand-dark/20 text-[11px] font-black uppercase tracking-[0.3em] mt-4">{t("contact.info.phone_hours")}</p>
                </div>
              </div>
              <div className="flex items-start gap-12 border-t border-brand-border pt-16 group">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <Mail size={32} />
                </div>
                <div>
                  <h4 className="font-black text-3xl mb-4 text-brand-dark tracking-tight">{t("contact.info.email")}</h4>
                  <p className="text-brand-dark/40 text-xl font-medium">{companyEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-12 border-t border-brand-border pt-16 group">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-700">
                  <MapPin size={32} />
                </div>
                <div>
                  <h4 className="font-black text-3xl mb-4 text-brand-dark tracking-tight">{t("contact.info.address")}</h4>
                  <div className="space-y-8">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-2">工厂地址 / Factory</p>
                      <p className="text-brand-dark/40 text-xl font-medium leading-relaxed max-w-md">{companyFactoryAddress}</p>
                    </div>
                    <div className="pt-8 border-t border-brand-border/30">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-2">研发应用中心 / R&D Center</p>
                      <p className="text-brand-dark/40 text-xl font-medium leading-relaxed max-w-md">{companyRDAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-brand-gray p-12 md:p-24 rounded-[60px] border border-brand-border shadow-2xl relative overflow-hidden">
            <AnimatePresence>
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center p-16 text-center"
                >
                  <div className="w-24 h-24 bg-brand-blue rounded-full flex items-center justify-center text-white mb-12 shadow-2xl shadow-brand-blue/20">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-5xl font-black mb-8 text-brand-dark tracking-tight">{t("contact.form.success_title")}</h3>
                  <p className="text-brand-dark/40 text-2xl font-medium leading-relaxed max-w-md">
                    {t("contact.form.success_desc")}
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-12 text-brand-blue font-black uppercase tracking-[0.3em] text-[11px] hover:underline"
                  >
                    {t("contact.form.resubmit")}
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <h3 className="text-3xl font-black mb-16 tracking-tight text-brand-dark">{t("contact.form.help")}</h3>
            
            <div className="grid grid-cols-3 gap-6 mb-16">
              <button 
                onClick={() => setRequestType("general")}
                className={`flex flex-col items-center gap-4 p-8 rounded-3xl border transition-all duration-500 ${requestType === "general" ? "bg-brand-blue border-brand-blue text-white shadow-2xl shadow-brand-blue/20" : "bg-white border-brand-border text-brand-dark/40 hover:border-brand-blue/30 hover:text-brand-blue"}`}
              >
                <MessageSquare size={32} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t("contact.form.general")}</span>
              </button>
              <button 
                onClick={() => setRequestType("tds")}
                className={`flex flex-col items-center gap-4 p-8 rounded-3xl border transition-all duration-500 ${requestType === "tds" ? "bg-brand-blue border-brand-blue text-white shadow-2xl shadow-brand-blue/20" : "bg-white border-brand-border text-brand-dark/40 hover:border-brand-blue/30 hover:text-brand-blue"}`}
              >
                <FileText size={32} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t("contact.form.tds")}</span>
              </button>
              <button 
                onClick={() => setRequestType("sample")}
                className={`flex flex-col items-center gap-4 p-8 rounded-3xl border transition-all duration-500 ${requestType === "sample" ? "bg-brand-blue border-brand-blue text-white shadow-2xl shadow-brand-blue/20" : "bg-white border-brand-border text-brand-dark/40 hover:border-brand-blue/30 hover:text-brand-blue"}`}
              >
                <Beaker size={32} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t("contact.form.sample")}</span>
              </button>
            </div>

            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-brand-dark/40 uppercase tracking-[0.3em]">{t("contact.form.name")}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder={t("contact.form.name_placeholder")} 
                    className="w-full px-8 py-6 rounded-2xl border border-brand-border bg-white focus:border-brand-blue focus:ring-8 focus:ring-brand-blue/5 outline-none transition-all font-medium text-lg text-brand-dark" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-brand-dark/40 uppercase tracking-[0.3em]">{t("contact.form.email")}</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder={t("contact.form.email_placeholder")} 
                    className="w-full px-8 py-6 rounded-2xl border border-brand-border bg-white focus:border-brand-blue focus:ring-8 focus:ring-brand-blue/5 outline-none transition-all font-medium text-lg text-brand-dark" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-brand-dark/40 uppercase tracking-[0.3em]">{t("contact.form.phone")}</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder={t("contact.form.phone_placeholder")} 
                    className="w-full px-8 py-6 rounded-2xl border border-brand-border bg-white focus:border-brand-blue focus:ring-8 focus:ring-brand-blue/5 outline-none transition-all font-medium text-lg text-brand-dark" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-brand-dark/40 uppercase tracking-[0.3em]">{t("contact.form.company")}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder={t("contact.form.company_placeholder")} 
                    className="w-full px-8 py-6 rounded-2xl border border-brand-border bg-white focus:border-brand-blue focus:ring-8 focus:ring-brand-blue/5 outline-none transition-all font-medium text-lg text-brand-dark" 
                  />
                </div>
              </div>

              {/* Technical Specifics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-brand-border/30">
                <div className="space-y-4 relative">
                  <label className="text-[11px] font-black text-brand-blue uppercase tracking-[0.3em] flex items-center gap-2">
                    <BriefcaseIcon size={12} /> {t("contact.form.industry") || "应用行业 (Industry)"}
                  </label>
                  <div className="relative group">
                    <select 
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      className="w-full px-8 py-6 rounded-2xl border border-brand-border bg-white focus:border-brand-blue focus:ring-8 focus:ring-brand-blue/5 outline-none transition-all font-medium text-lg text-brand-dark appearance-none cursor-pointer"
                    >
                      <option value="">{t("contact.form.industry_placeholder") || "请选择应用行业"}</option>
                      <option value="consumer_electronics">消费电子 (Consumer Electronics)</option>
                      <option value="automotive">汽车涂料 (Automotive)</option>
                      <option value="wood_furniture">木器家具 (Wood & Furniture)</option>
                      <option value="printing_ink">印刷油墨 (Printing Ink)</option>
                      <option value="leather_textile">皮革纺织 (Leather & Textile)</option>
                      <option value="construction">建筑涂料 (Construction)</option>
                      <option value="others">其他 (Others)</option>
                    </select>
                    <ChevronDown size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-brand-dark/20 pointer-events-none group-hover:text-brand-blue transition-colors" />
                  </div>
                </div>
                <div className="space-y-4 relative">
                  <label className="text-[11px] font-black text-brand-blue uppercase tracking-[0.3em] flex items-center gap-2">
                    <Layers size={12} /> {t("contact.form.substrate") || "应用基材 (Substrate)"}
                  </label>
                  <div className="relative group">
                    <select 
                      value={formData.substrate}
                      onChange={(e) => setFormData({...formData, substrate: e.target.value})}
                      className="w-full px-8 py-6 rounded-2xl border border-brand-border bg-white focus:border-brand-blue focus:ring-8 focus:ring-brand-blue/5 outline-none transition-all font-medium text-lg text-brand-dark appearance-none cursor-pointer"
                    >
                      <option value="">{t("contact.form.substrate_placeholder") || "请选择应用基材"}</option>
                      <option value="abs">ABS / PC</option>
                      <option value="metal">金属 (Metal - Steel/Alu)</option>
                      <option value="wood">木材 (Wood)</option>
                      <option value="pet_film">PET / 薄膜 (Film)</option>
                      <option value="leather">皮革 (Leather)</option>
                      <option value="glass">玻璃 (Glass)</option>
                      <option value="others">其他 (Others)</option>
                    </select>
                    <ChevronDown size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-brand-dark/20 pointer-events-none group-hover:text-brand-blue transition-colors" />
                  </div>
                </div>
              </div>

              {(requestType === "tds" || requestType === "sample") && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4"
                >
                  <label className="text-[11px] font-black text-brand-blue uppercase tracking-[0.3em] flex items-center gap-2">
                    <Target size={12} /> {t("contact.form.product")}
                  </label>
                  <div className="relative group">
                    <select 
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-8 py-6 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 focus:border-brand-blue focus:ring-8 focus:ring-brand-blue/5 outline-none transition-all font-black text-lg text-brand-blue appearance-none cursor-pointer" 
                    >
                      <option value="">{t("contact.form.product_placeholder")}</option>
                      {products.map(p => (
                        <option key={p.id} value={p.name}>{p.name} - {p.type}</option>
                      ))}
                      <option value="other">其他产品 (Other Product)</option>
                    </select>
                    <ChevronDown size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-brand-blue/40 pointer-events-none group-hover:text-brand-blue transition-colors" />
                  </div>
                </motion.div>
              )}

              <div className="space-y-4">
                <label className="text-[11px] font-black text-brand-dark/40 uppercase tracking-[0.3em]">{t("contact.form.desc")}</label>
                <textarea 
                  rows={5} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder={t("contact.form.desc_placeholder")} 
                  className="w-full px-8 py-6 rounded-2xl border border-brand-border bg-white focus:border-brand-blue focus:ring-8 focus:ring-brand-blue/5 outline-none transition-all resize-none font-medium text-lg text-brand-dark"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-8 bg-brand-blue text-white rounded-2xl font-black hover:bg-brand-dark transition-all flex items-center justify-center gap-4 shadow-2xl shadow-brand-blue/30 uppercase tracking-[0.3em] text-[11px] disabled:opacity-50"
              >
                {isSubmitting ? "正在提交..." : t("contact.form.submit")} <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="rounded-[80px] overflow-hidden h-[600px] shadow-2xl border border-brand-border grayscale hover:grayscale-0 transition-all duration-1000 mb-32">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.8767!2d114.3!3d23.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAwJzAwLjAiTiAxMTTCsDE4JzAwLjAiRQ!5e0!3m2!1sen!2scn!4v1620000000000!5m2!1sen!2scn" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
