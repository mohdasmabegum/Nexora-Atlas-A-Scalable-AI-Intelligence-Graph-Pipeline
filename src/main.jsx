import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Nexora Atlas Global Error Boundary Caught Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#07090e',
          color: '#F8FAFC',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{
            maxWidth: '540px',
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(0, 242, 254, 0.4)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 0 40px rgba(0, 242, 254, 0.2)'
          }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#00F2FE', marginBottom: '0.5rem' }}>
              NEXORA ATLAS RECOVERY MODE
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
              The platform encountered a browser environment exception. Click below to reset state and load the Command Center directly.
            </p>
            <button
              onClick={() => {
                try { sessionStorage.clear(); localStorage.clear(); } catch(e){}
                window.location.reload();
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.3), rgba(79, 172, 254, 0.5))',
                border: '1px solid #00F2FE',
                color: '#FFFFFF',
                padding: '10px 20px',
                borderRadius: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              RELOAD COMMAND CENTER
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>
);
