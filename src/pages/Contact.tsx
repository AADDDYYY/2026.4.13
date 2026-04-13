import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, ArrowRight, FileText, Beaker, MessageSquare, CheckCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get("type") || "general";
  const initialProduct = queryParams.get("product") || "";

  const [requestType, setRequestType] = useState(initialType);
  const [productName, setProductName] = useState(initialProduct);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, you would send the data to a server here
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  useEffect(() => {
    if (initialType) setRequestType(initialType);
    if (initialProduct) setProductName(initialProduct);
  }, [initialType, initialProduct]);

  return (
    <div className="pt-32 pb-24 bg-[#050a14] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-brand-blue font-bold uppercase tracking-widest text-[10px] mb-4 block">Contact & Support</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">{t("contact.hero.title")}</h1>
          <p className="text-white/40 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            {t("contact.hero.desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter leading-tight">{t("contact.info.title")}<br />{t("contact.info.subtitle")}</h2>
            <p className="text-white/40 text-lg mb-12 font-light leading-relaxed">
              {t("contact.info.desc")}
            </p>

            <div className="space-y-10 mt-16">
              <div className="flex items-start gap-8 border-t border-white/5 pt-10">
                <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">{t("contact.info.phone")}</h4>
                  <p className="text-white/40 font-light">400 0069 655</p>
                  <p className="text-white/20 text-sm font-light mt-1">{t("contact.info.phone_hours")}</p>
                </div>
              </div>
              <div className="flex items-start gap-8 border-t border-white/5 pt-10">
                <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">{t("contact.info.email")}</h4>
                  <p className="text-white/40 font-light">info@seatonchem.com</p>
                </div>
              </div>
              <div className="flex items-start gap-8 border-t border-white/5 pt-10">
                <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/20">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">{t("contact.info.address")}</h4>
                  <p className="text-white/40 font-light">{t("contact.info.address_val")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] p-10 md:p-16 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
            <AnimatePresence>
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-20 bg-[#050a14] flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center text-white mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{t("contact.form.success_title")}</h3>
                  <p className="text-white/40 font-light leading-relaxed">
                    {t("contact.form.success_desc")}
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-12 text-brand-blue font-bold uppercase tracking-widest text-xs hover:underline"
                  >
                    {t("contact.form.resubmit")}
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <h3 className="text-2xl font-bold mb-10 tracking-tight">{t("contact.form.help")}</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-12">
              <button 
                onClick={() => setRequestType("general")}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all ${requestType === "general" ? "bg-brand-blue border-brand-blue text-white" : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"}`}
              >
                <MessageSquare size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{t("contact.form.general")}</span>
              </button>
              <button 
                onClick={() => setRequestType("tds")}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all ${requestType === "tds" ? "bg-brand-blue border-brand-blue text-white" : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"}`}
              >
                <FileText size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{t("contact.form.tds")}</span>
              </button>
              <button 
                onClick={() => setRequestType("sample")}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all ${requestType === "sample" ? "bg-brand-blue border-brand-blue text-white" : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"}`}
              >
                <Beaker size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{t("contact.form.sample")}</span>
              </button>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{t("contact.form.name")}</label>
                  <input type="text" placeholder={t("contact.form.name_placeholder")} className="w-full px-6 py-4 rounded-xl border border-white/5 bg-white/[0.03] focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-light text-sm" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{t("contact.form.email")}</label>
                  <input type="email" placeholder={t("contact.form.email_placeholder")} className="w-full px-6 py-4 rounded-xl border border-white/5 bg-white/[0.03] focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-light text-sm" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{t("contact.form.phone")}</label>
                  <input type="tel" placeholder={t("contact.form.phone_placeholder")} className="w-full px-6 py-4 rounded-xl border border-white/5 bg-white/[0.03] focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-light text-sm" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{t("contact.form.company")}</label>
                  <input type="text" placeholder={t("contact.form.company_placeholder")} className="w-full px-6 py-4 rounded-xl border border-white/5 bg-white/[0.03] focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-light text-sm" />
                </div>
              </div>

              {(requestType === "tds" || requestType === "sample") && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3"
                >
                  <label className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em]">{t("contact.form.product")}</label>
                  <input 
                    type="text" 
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder={t("contact.form.product_placeholder")} 
                    className="w-full px-6 py-4 rounded-xl border border-brand-blue/30 bg-brand-blue/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-sm text-brand-blue" 
                  />
                </motion.div>
              )}

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{t("contact.form.desc")}</label>
                <textarea rows={4} placeholder={t("contact.form.desc_placeholder")} className="w-full px-6 py-4 rounded-xl border border-white/5 bg-white/[0.03] focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all resize-none font-light text-sm"></textarea>
              </div>
              
              <button className="w-full py-6 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/80 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-brand-blue/20 uppercase tracking-widest text-xs">
                {t("contact.form.submit")} <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden h-[400px] shadow-2xl border border-white/5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.8767!2d114.3!3d23.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAwJzAwLjAiTiAxMTTCsDE4JzAwLjAiRQ!5e0!3m2!1sen!2scn!4v1620000000000!5m2!1sen!2scn" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
