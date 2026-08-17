import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Filter
} from 'lucide-react';

export default function ErrorCenter() {
  const [filterType, setFilterType] = useState('ALL');

  const errors = [
    {
      id: 'err-101',
      timestamp: '2026-08-16T14:20:10Z',
      stage: 'LLM_ORCHESTRATOR',
      type: 'HTTP_429_RATE_LIMIT',
      source: 'Gemini 1.5 Flash',
      message: 'Gemini Flash quota rate limit reached (HTTP 429). Triggered Groq Llama 3 fallback with 1.4s jitter backoff.',
      retryCount: 2,
      status: 'RESOLVED_VIA_FALLBACK'
    },
    {
      id: 'err-102',
      timestamp: '2026-08-16T13:12:05Z',
      stage: 'SMART_CHUNKER',
      type: 'HTTP_413_PAYLOAD_PREVENTED',
      source: 'Paper HTML Parser',
      message: 'Payload size 48kb exceeded threshold. Split into 3 semantic chunks to prevent 413 Payload Too Large error.',
      retryCount: 0,
      status: 'PREVENTED_AUTONOMOUSLY'
    },
    {
      id: 'err-103',
      timestamp: '2026-08-16T12:05:40Z',
      stage: 'FRESHNESS_ENGINE',
      type: 'EXPIRED_24H_SIGNAL',
      source: 'TechCrunch News Feed',
      message: 'Article published 34 hours ago. Rejected to enforce strict 24-hour freshness SLA.',
      retryCount: 0,
      status: 'FILTERED_OUT'
    },
    {
      id: 'err-104',
      timestamp: '2026-08-16T11:45:20Z',
      stage: 'ASYNC_CRAWLER',
      type: 'ANTI_BOT_CHALLENGE',
      source: 'Datadome Protected Source',
      message: 'Datadome turnstile challenge encountered. Rotated user-agent & stealth headers.',
      retryCount: 1,
      status: 'RESOLVED_AUTO'
    }
  ];

  const filtered = errors.filter(e => filterType === 'ALL' || e.type.includes(filterType));

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HERO FEATURE BANNER */}
      <div className="hero-feature-banner">
        <div className="flex items-center gap-2 text-xs font-mono text-[#F72585] mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>AUTONOMOUS RESILIENCE & TELEMETRY</span>
        </div>
        <h1>Error Diagnostic & Resilience Center</h1>
        <p>Detailed live telemetry for HTTP 413 payload truncation, HTTP 429 rate-limit backoffs, anti-bot challenge navigation, and zero-downtime error recovery.</p>
      </div>

      {/* FILTER CONTROLS */}
      <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-[#94A3B8]" />
          <span className="text-xs text-[#94A3B8]">Filter Error Category:</span>
          {['ALL', '429', '413', 'EXPIRED', 'ANTI_BOT'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition ${
                filterType === type 
                  ? 'bg-[#F72585]/20 text-[#F72585] border border-[#F72585]/40' 
                  : 'bg-white/5 text-[#94A3B8] hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="font-mono text-xs text-[#94A3B8]">
          Total Diagnostics: <span className="text-white font-bold">{errors.length}</span>
        </div>
      </div>

      {/* 2 PER ROW ERROR CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(err => (
          <div key={err.id} className="glass-panel p-5 space-y-3 hover:border-white/20 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
                <span className="badge-tag badge-purple font-mono text-[10px]">{err.type}</span>
                <span className="badge-tag badge-emerald text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {err.status}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-xs text-[#00F2FE] font-bold">{err.stage}</span>
                <span className="text-xs text-white font-semibold">{err.source}</span>
              </div>

              <p className="text-xs text-[#94A3B8] font-mono leading-relaxed bg-[#080C14] p-3 rounded-xl border border-white/5 mt-3">
                {err.message}
              </p>
            </div>

            <div className="pt-2 font-mono text-[10px] text-[#64748B] flex justify-between">
              <span>Retries: {err.retryCount}</span>
              <span>{new Date(err.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
