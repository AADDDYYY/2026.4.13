import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    
    // Remote Logging to Firestore
    try {
      addDoc(collection(db, 'system_logs'), {
        type: 'error',
        message: error.message,
        stack: error.stack || 'No stack trace',
        url: window.location.href,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        userId: auth.currentUser?.uid || 'anonymous'
      }).catch(err => console.error("Failed to sync log to cloud:", err));
    } catch (e) {
      console.error("Critical: Logger failed", e);
    }
    
    // Local storage backup
    try {
      const errorLog = JSON.parse(localStorage.getItem('system_errors') || '[]');
      errorLog.push({
        time: new Date().toISOString(),
        message: error.message,
        stack: error.stack,
        url: window.location.href
      });
      localStorage.setItem('system_errors', JSON.stringify(errorLog.slice(-20))); // Keep last 20
    } catch (e) {
      // Ignore storage errors
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-gray p-6">
          <div className="max-w-2xl w-full bg-white rounded-[40px] p-16 shadow-2xl border border-brand-border text-center">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-10">
              <AlertTriangle size={48} />
            </div>
            <h1 className="text-4xl font-black text-brand-dark mb-6 tracking-tight">
              系统自动拦截了一个异常
            </h1>
            <p className="text-brand-dark/40 text-lg mb-12 font-medium">
              别担心，我们的“自愈系统”已经记录了此错误。为了保证您的浏览体验，您可以尝试重置页面。
            </p>
            
            <div className="bg-brand-gray rounded-2xl p-6 mb-12 text-left">
              <p className="text-[10px] font-black text-brand-dark/20 uppercase tracking-widest mb-2">Error Detail</p>
              <code className="text-xs text-red-500/70 font-mono break-all leading-relaxed">
                {this.state.error?.message || "Unknown Runtime Exception"}
              </code>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-4 bg-brand-blue text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-brand-dark transition-all"
              >
                <RotateCcw size={18} />
                立即重试 (Retry)
              </button>
              <button 
                onClick={this.handleReset}
                className="inline-flex items-center gap-4 border border-brand-border text-brand-dark px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-brand-gray transition-all"
              >
                <Home size={18} />
                返回首页 (Home)
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
