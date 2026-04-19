import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API (using environment variable)
const ai = new GoogleGenAI({ apiKey: (process as any).env.GEMINI_API_KEY || "" });

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "您好！我是西顿新材料的 AI 技术助手。请问有什么可以帮您的？您可以询问关于水性树脂的应用、产品特性或技术方案。" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `你现在是西顿新材料（SEACRYL）的 AI 技术顾问。你的任务是为客户提供关于水性树脂产品的决策支持。
            
            西顿核心产品概览：
            1. SEACRYL 系列：高效水性丙烯酸乳液。代表型号：11P22 (高硬度/耐醇), 11K20 (印花性能优), 11W18 (木器专用)。
            2. SEAPUR 系列：水性聚氨酯 PUD/UV 树脂。代表型号：33G31 (通用UV/耐刮), 50G80 (精细肤感), 50G85 (核心自消光)。
            3. SEAPUA 系列：PUA 杂化乳液，兼具韧性与干速。
            4. 自消光技术：西顿的王牌技术，提供超低光泽且耐刮擦的肤感触觉。
            
            应用领域：塑胶涂料、工业油墨、木器漆、皮革涂饰、柔性包装。
            
            你的回答规则：
            - 专业、极简、富有商业礼仪。
            - 当客户描述需求（如“我需要高硬度”、“耐水煮”、“用于手机外壳”）时，请根据上述概览积极推荐型号。
            - 如果问题超出基础范围，请礼貌建议联系技术总监（sales@seaton.com.cn）。
            - 始终使用与用户相同的语言交流。` }]
          },
          ...messages.map(m => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
          {
            role: "user",
            parts: [{ text: userMessage }]
          }
        ]
      });

      const text = response.text || "抱歉，我无法生成回复。";
      
      setMessages(prev => [...prev, { role: "bot", text }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => [...prev, { role: "bot", text: "抱歉，我现在遇到了一点技术问题。请稍后再试，或直接联系我们的技术支持团队。" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-10 z-[70] w-16 h-16 bg-brand-dark text-white rounded-full flex items-center justify-center shadow-2xl group overflow-hidden"
      >
        <div className="absolute inset-0 bg-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <MessageSquare className="relative z-10" size={28} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-blue rounded-full border-2 border-white animate-pulse"></div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-10 right-10 z-[80] w-[450px] max-h-[700px] bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-brand-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 bg-brand-dark text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <div className="text-lg font-black tracking-tight">西顿 AI 助手</div>
                  <div className="text-[10px] uppercase tracking-wider text-brand-blue font-black">Technical Support</div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-8 bg-brand-gray/30 custom-scrollbar"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] p-6 rounded-[30px] ${
                    m.role === "user" 
                      ? "bg-brand-blue text-white rounded-tr-none shadow-xl shadow-brand-blue/20" 
                      : "bg-white text-brand-dark rounded-tl-none border border-brand-border shadow-sm"
                  }`}>
                    <div className="text-sm leading-relaxed font-medium whitespace-pre-wrap">{m.text}</div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-6 rounded-[30px] rounded-tl-none border border-brand-border flex items-center gap-3">
                    <Loader2 className="animate-spin text-brand-blue" size={20} />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-dark/30">AI Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-8 bg-white border-t border-brand-border">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="输入您的技术问题..."
                  className="w-full bg-brand-gray border-none rounded-full py-5 pl-8 pr-20 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center hover:bg-brand-dark transition-all shadow-lg shadow-brand-blue/20 disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-brand-dark/20 font-black uppercase tracking-widest">
                <Sparkles size={12} />
                Powered by Gemini AI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
