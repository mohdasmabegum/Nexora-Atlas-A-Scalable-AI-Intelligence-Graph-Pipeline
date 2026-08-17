import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Zap, X, Network } from 'lucide-react';

export default function SplashScreen({ onEnter }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Autonomous Knowledge Nodes...');
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            handleDismiss();
          }, 600);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 20) + 10;
        if (next > 40 && next < 70) {
          setLoadingText('Normalizing Entity Graph & 24h SLA Signals...');
        } else if (next >= 70) {
          setLoadingText('Preparing Multi-Tier LLM Orchestration Mesh...');
        }
        return Math.min(100, next);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className={`splash-screen-container ${isExiting ? 'splash-fade-out' : ''}`}
      onClick={handleDismiss}
    >
      
      {/* Quick Skip Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); handleDismiss(); }}
        className="splash-skip-btn"
        title="Skip Splash & Enter Dashboard"
      >
        <span>Skip</span>
        <X className="w-4 h-4" />
      </button>

      <div className="splash-card" onClick={(e) => e.stopPropagation()}>
        
        {/* High-Tech Glowing Network Emblem (No image logo) */}
        <div className="w-20 h-20 rounded-2xl bg-[#00F2FE]/10 border border-[#00F2FE]/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,242,254,0.3)]">
          <Network className="w-10 h-10 text-[#00F2FE]" />
        </div>

        {/* Brand Title */}
        <div className="splash-text-group">
          <h1 className="splash-title">NEXORA ATLAS</h1>
          <p className="splash-subtitle">AUTONOMOUS AI INTELLIGENCE GRAPH PIPELINE</p>
        </div>

        {/* Feature Badges */}
        <div className="splash-badges">
          <span className="badge-tag badge-cyan">
            <Cpu className="w-3.5 h-3.5" /> Multi-Tier LLM Mesh
          </span>
          <span className="badge-tag badge-emerald">
            <Zap className="w-3.5 h-3.5" /> 24h Freshness SLA
          </span>
          <span className="badge-tag badge-purple">
            <ShieldCheck className="w-3.5 h-3.5" /> Zero Hallucination
          </span>
        </div>

        {/* Progress Bar & Status */}
        <div className="splash-progress-section">
          <div className="splash-progress-bar-bg">
            <div 
              className="splash-progress-bar-fill" 
              style={{ width: `${progress}%` }} 
            />
          </div>

          <div className="splash-status-row">
            <span className="splash-status-text">{loadingText}</span>
            <span className="font-mono text-[#00F2FE] font-bold">{progress}%</span>
          </div>
        </div>

        {/* Enter Platform Button */}
        <button 
          onClick={handleDismiss}
          className="btn-glow splash-enter-btn"
        >
          <span>{progress >= 100 ? 'ENTERING COMMAND CENTER...' : 'ENTER DASHBOARD DIRECTLY'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
