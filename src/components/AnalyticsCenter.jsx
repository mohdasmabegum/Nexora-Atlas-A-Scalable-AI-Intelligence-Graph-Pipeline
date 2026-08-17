import React from 'react';
import { 
  BarChart3, 
  Cpu, 
  Database, 
  CheckCircle2, 
  Briefcase
} from 'lucide-react';

export default function AnalyticsCenter() {
  const entityDistribution = [
    { label: 'Startups', count: 1000, color: '#00F2FE' },
    { label: 'Products', count: 1000, color: '#9D4EDD' },
    { label: 'Research Papers', count: 1000, color: '#F59E0B' },
    { label: 'Fresh Jobs', count: 150, color: '#F72585' },
    { label: 'Fresh News', count: 120, color: '#10B981' }
  ];

  const llmDistribution = [
    { provider: 'Gemini 1.5 Flash (Tier 1)', pct: 98.4, color: '#00F2FE' },
    { provider: 'Groq Llama 3 70B (Tier 2)', pct: 1.4, color: '#9D4EDD' },
    { provider: 'DeepSeek V3 (Tier 3)', pct: 0.2, color: '#10B981' }
  ];

  const roleFamilies = [
    { name: 'Engineering', count: 75 },
    { name: 'Research', count: 42 },
    { name: 'Product', count: 18 },
    { name: 'Data & Systems', count: 15 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HERO FEATURE BANNER */}
      <div className="hero-feature-banner">
        <div className="flex items-center gap-2 text-xs font-mono text-[#4FACFE] mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>REAL-TIME PIPELINE METRICS</span>
        </div>
        <h1>Pipeline Analytics & Throughput</h1>
        <p>Telemetry metrics for provider distributions, extraction success rates, GitHub star tracking, and ingestion throughput.</p>
      </div>

      {/* 2 PER ROW ANALYTICS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Chart 1: Records per Entity Type */}
        <div className="glass-panel p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-[#00F2FE]" />
            Records Distribution by Entity Type
          </h3>

          <div className="space-y-3 pt-2">
            {entityDistribution.map(item => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">{item.label}</span>
                  <span className="font-mono text-[#00F2FE]">{item.count.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${(item.count / 1000) * 100}%`, backgroundColor: item.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: LLM Provider Distribution */}
        <div className="glass-panel p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#9D4EDD]" />
            LLM Fallback Execution Distribution
          </h3>

          <div className="space-y-3 pt-2">
            {llmDistribution.map(item => (
              <div key={item.provider} className="p-3 rounded-xl bg-[#080C14] border border-white/5 space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">{item.provider}</span>
                  <span className="font-mono text-sm" style={{ color: item.color }}>{item.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${item.pct}%`, backgroundColor: item.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Jobs by Role Family */}
        <div className="glass-panel p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#F72585]" />
            24h Fresh Jobs by Role Family
          </h3>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {roleFamilies.map(rf => (
              <div key={rf.name} className="p-3 rounded-xl bg-[#080C14] border border-white/5 space-y-1">
                <span className="text-[11px] text-[#94A3B8] block">{rf.name}</span>
                <span className="text-lg font-bold font-mono text-[#F72585]">{rf.count} openings</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: System Reliability Stats */}
        <div className="glass-panel p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            Resilience Telemetry Stats
          </h3>

          <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-[#94A3B8] block">413 Prevented</span>
              <span className="text-base font-bold text-[#00F2FE]">128 Chunked</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-[#94A3B8] block">429 Backoffs</span>
              <span className="text-base font-bold text-[#F59E0B]">45 Jitters</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-[#94A3B8] block">Match Confidence</span>
              <span className="text-base font-bold text-[#10B981]">98.5% Avg</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-[#94A3B8] block">Avg Crawl Speed</span>
              <span className="text-base font-bold text-[#9D4EDD]">48.5 req/s</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
