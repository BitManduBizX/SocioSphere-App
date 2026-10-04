import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class RootErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'An unexpected rendering issue occurred.',
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('SocioSphere runtime boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F9F8F6] text-slate-900 flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <p className="text-xs font-mono-tabular text-sky-700 mb-2">SocioSphere Recovery Mode</p>
            <h1 className="text-2xl font-semibold text-slate-900 mb-3">
              Interface Temporarily Reset
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {this.state.errorMessage}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-sm font-medium bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-colors"
            >
              Reload SocioSphere
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function mountSocioSphere() {
  const rootEl = document.getElementById('root');
  if (!rootEl) return;

  try {
    const root = createRoot(rootEl);
    root.render(
      <React.StrictMode>
        <RootErrorBoundary>
          <App />
        </RootErrorBoundary>
      </React.StrictMode>
    );
  } catch (err) {
    console.error('Critical mount failure:', err);
    rootEl.innerHTML = `
      <div style="padding: 2rem; max-width: 36rem; margin: 4rem auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 0.75rem; font-family: sans-serif; color: #0f172a;">
        <h2 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">SocioSphere Safe Mode</h2>
        <p style="margin: 0 0 1rem 0; color: #475569; font-size: 0.875rem;">A browser script error prevented the interactive view from initializing.</p>
        <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; background: #0369a1; color: #ffffff; border: none; border-radius: 0.5rem; cursor: pointer;">Reload Application</button>
      </div>
    `;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountSocioSphere);
} else {
  mountSocioSphere();
}

