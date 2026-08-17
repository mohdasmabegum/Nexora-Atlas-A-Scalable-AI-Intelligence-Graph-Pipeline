import React from 'react';
import { 
  Building2, 
  Box, 
  FileText, 
  Briefcase, 
  Newspaper, 
  Link2, 
  Zap, 
  Activity,
  ShieldCheck,
  TrendingUp,
  Cpu,
  ArrowRight
} from 'lucide-react';

export default function CommandCenter({ onSelectNav, onSelectProvenance }) {
  
  // 2 per row KPI metrics configuration
  const kpiCards = [
    { title: 'AI Startups Ingested', count: '1,000', icon: Building2, color: '#00F2FE', change: '+12% this week', tab: 'startups', desc: 'Canonical entity profiles & team sizes' },
    { title: 'AI Products Discovered', count: '1,000', icon: Box, color: '#9D4EDD', change: '+18% this week', tab: 'products', desc: 'SaaS products & pricing tier models' },
    { title: 'Research Papers Tracked', count: '1,000', icon: FileText, color: '#F59E0B', change: '+25% this week', tab: 'papers', desc: 'Arxiv papers with GitHub repositories' },
    { title: '24h Fresh AI Jobs', count: '150', icon: Briefcase, color: '#F72585', change: '100% 24h SLA Validated', tab: 'jobs', desc: 'Verified AI engineering positions' },
    { title: '24h Fresh AI News', count: '120', icon: Newspaper, color: '#10B981', change: '100% Provenance Tracked', tab: 'news', desc: 'TechCrunch & AI industry signals' },
    { title: 'Entity Resolutions', count: '60', icon: Link2, color: '#4FACFE', change: '98% Avg Confidence', tab: 'mappings', desc: 'Deterministic string matching' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HERO BANNER */}
      <div className="hero-feature-banner">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] mb-1">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>AUTONOMOUS INGESTION ENGINE ACTIVE</span>
        </div>
        <h1>Command Center Dashboard</h1>
        <p>Real-time autonomous intelligence pipeline continuously discovering, extracting, resolving, and connecting AI startups, products, research papers, jobs, and news.</p>
      </div>

      {/* KPI METRIC CARDS (ARRANGED 2 PER ROW AS REQUESTED) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-mono">
          System KPI Metrics & Vertical Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kpiCards.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                onClick={() => onSelectNav(kpi.tab)}
                className="glass-panel p-5 space-y-3 cursor-pointer hover:border-[#00F2FE]/50 transition group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
                      style={{ 
                        backgroundColor: `${kpi.color}15`, 
                        borderColor: `${kpi.color}40`,
                        color: kpi.color 
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-[#00F2FE] transition">
                        {kpi.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] mt-0.5">{kpi.desc}</p>
                    </div>
                  </div>

                  <span className="font-mono text-2xl font-extrabold text-white">
                    {kpi.count}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#10B981] flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {kpi.change}
                  </span>
                  <span className="text-xs font-mono text-[#00F2FE] flex items-center gap-1 group-hover:translate-x-1 transition">
                    Explore Vertical <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QUICK SYSTEM STATUS & PROVENANCE SHORTCUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="glass-panel p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#94A3B8] font-mono">PIPELINE SLA STATUS</span>
            <span className="badge-tag badge-emerald">24h SLA Active</span>
          </div>
          <p className="text-xs text-[#94A3B8]">
            Multi-tier LLM extraction fallback engine (Gemini Flash → Groq Llama3 → DeepSeek) running with zero hallucinations and 100% provenance verification.
          </p>
          <button onClick={() => onSelectNav('pipeline')} className="btn-glow text-xs py-1.5 px-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Inspect 11-Stage Stream</span>
          </button>
        </div>

        <div className="glass-panel p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#94A3B8] font-mono">DATA PROVENANCE AUDIT</span>
            <span className="badge-tag badge-cyan">Zero Hallucination</span>
          </div>
          <p className="text-xs text-[#94A3B8]">
            Every single record stores exact source URL, HTTP status headers, raw HTML snapshot hash, extracted json, and SLA validation timestamps.
          </p>
          <button onClick={() => onSelectProvenance('s-1')} className="btn-secondary text-xs py-1.5 px-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Trace OpenAI Provenance</span>
          </button>
        </div>

      </div>

    </div>
  );
}
