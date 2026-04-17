import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
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
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      let errorData;
      try {
        if (this.state.error?.message) {
          errorData = JSON.parse(this.state.error.message);
        }
      } catch (e) {
        // Not a JSON error message, ignore
      }

      return (
        <div className="min-h-screen bg-brand-gray flex items-center justify-center p-6">
          <div className="bg-white p-12 rounded-[40px] border border-brand-border shadow-2xl max-w-2xl w-full">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-8">
              <span className="text-3xl">⚠️</span>
            </div>
            <h1 className="text-4xl font-black text-brand-dark tracking-tight mb-6">Something went wrong</h1>
            
            {errorData?.operationType ? (
              <div className="space-y-4 text-left">
                <p className="text-red-500 font-bold">Database Access Denied / Error</p>
                <div className="bg-brand-gray p-6 rounded-2xl overflow-auto text-sm text-brand-dark/70">
                  <p><strong>Operation:</strong> {errorData.operationType}</p>
                  {errorData.path && <p><strong>Path:</strong> {errorData.path}</p>}
                  <p><strong>Error:</strong> {errorData.error}</p>
                  <p className="mt-4 text-xs">If this is a permissions issue, ensure you are logged in and have the correct role assigned.</p>
                </div>
              </div>
            ) : (
               <p className="text-brand-dark/60 font-medium leading-relaxed bg-brand-gray p-6 rounded-2xl">
                 {this.state.error?.message || "An unexpected error occurred."}
               </p>
            )}
            
            <button 
              onClick={() => window.location.reload()}
              className="mt-10 bg-brand-blue text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-brand-dark transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
