import React, { useState } from 'react';
import { 
  Globe, 
  Cpu, 
  Database, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  Network, 
  Download, 
  Activity,
  X,
  Play,
  Pause
} from 'lucide-react';

const STAGES = [
  { id: 'sources', label: 'Sources Registry', icon: Globe, count: 12, latency: '42ms', queue: 0, activity: 'Monitoring 12 live feeds' },
  { id: 'crawler', label: 'Async Crawler', icon: Cpu, count: 14820, latency: '115ms', queue: 142, activity: 'Fetching Arxiv & TechCrunch' },
  { id: 'raw', label: 'Raw Data Store', icon: Database, count: 14820, latency: '8ms', queue: 14, activity: 'Storing raw HTML payloads' },
  { id: 'freshness', label: 'Freshness Engine', icon: Clock, count: 14806, latency: '12ms', queue: 0, activity: 'Enforcing 24h ISO/relative date window' },
  { id: 'chunker', label: 'Smart Chunker', icon: Layers, count: 14806, latency: '18ms', queue: 2, activity: 'Semantic token chunking (413 preventer)' },
  { id: 'llm', label: 'LLM Orchestrator', icon: Cpu, count: 14804, latency: '180ms', queue: 5, activity: 'Routing Gemini ➔ Groq ➔ DeepSeek' },
  { id: 'validation', label: 'Schema Validation', icon: CheckCircle2, count: 14804, latency: '5ms', queue: 0, activity: 'Pydantic strict schema verification' },
  { id: 'resolver', label: 'Entity Resolver', icon: Sliders, count: 14804, latency: '15ms', queue: 0, activity: 'Canonicalizing startups & products' },
  { id: 'primary_db', label: 'Primary DB (PG)', icon: Database, count: 14804, latency: '10ms', queue: 0, activity: 'Transactional ACID commit' },
  { id: 'graph', label: 'Intelligence Graph', icon: Network, count: 14804, latency: '22ms', queue: 0, activity: 'Updating Neo4j knowledge edges' },
  { id: 'export', label: 'Export Center', icon: Download, count: 3270, latency: '350ms', queue: 0, activity: 'Syncing Google Sheets & CSV' }
];

export default function PipelineVisualizer() {
  const [selectedStage, setSelectedStage] = useState(null);
  const [isPipelineActive, setIsPipelineActive] = useState(true);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HERO FEATURE BANNER */}
      <div className="hero-feature-banner flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] mb-1">
            <Layers className="w-4 h-4" />
            <span>11-STAGE PARTICLE STREAM</span>
          </div>
          <h1>Live Pipeline Visualizer</h1>
          <p>Real-time stream visualization showing data transformation from multi-source crawlers to schema validators, LLM extraction, entity resolution, and graph edge writing.</p>
        </div>

        <button
          onClick={() => setIsPipelineActive(!isPipelineActive)}
          className="btn-glow text-xs shrink-0 self-start md:self-center"
        >
          {isPipelineActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPipelineActive ? 'Pause Particle Stream' : 'Resume Stream'}</span>
        </button>
      </div>

      {/* 11-STAGE ANIMATED STREAM GRID */}
      <div className="glass-panel p-6 overflow-x-auto">
        <div className="min-w-[900px] flex items-center justify-between relative py-6">
          
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = selectedStage?.id === stage.id;
            return (
              <React.Fragment key={stage.id}>
                
                {/* Stage Box Node */}
                <div
                  onClick={() => setSelectedStage(stage)}
                  className={`relative flex flex-col items-center p-3.5 rounded-xl border transition-all cursor-pointer z-10 w-24 md:w-28 text-center group ${
                    isSelected
                      ? 'bg-[#00F2FE]/20 border-[#00F2FE] shadow-[0_0_20px_rgba(0,242,254,0.3)] scale-105'
                      : 'bg-[#080C14] border-white/10 hover:border-[#00F2FE]/50 hover:bg-white/5'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-[#00F2FE]" />
                  </div>

                  <span className="text-[11px] font-bold text-white leading-tight mb-1">{stage.label}</span>
                  <span className="font-mono text-[10px] text-[#00F2FE]">{stage.count.toLocaleString()}</span>

                  {/* Stage Active Glow Indicator */}
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                </div>

                {/* Animated Connecting Data Particle Line */}
                {idx < STAGES.length - 1 && (
                  <div className="flex-1 h-0.5 relative mx-1 bg-white/10 overflow-hidden">
                    {isPipelineActive && (
                      <div 
                        className="absolute top-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent animate-pulse"
                        style={{
                          animation: 'particleMove 1.8s infinite linear',
                          animationDelay: `${idx * 0.15}s`
                        }}
                      />
                    )}
                  </div>
                )}

              </React.Fragment>
            );
          })}

        </div>

        <div className="text-center text-xs font-mono text-[#64748B] pt-4 border-t border-white/5">
          Click any stage node to inspect operational metrics, queue depth, and retry statistics.
        </div>
      </div>

      {/* Stage Detail Side Drawer */}
      {selectedStage && (
        <div className="prov-modal-backdrop animate-fadeIn" onClick={() => setSelectedStage(null)}>
          <div className="prov-modal-box max-w-md p-6 space-y-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00F2FE] animate-pulse" />
                <h3 className="text-base font-bold text-white">{selectedStage.label}</h3>
              </div>
              <button 
                onClick={() => setSelectedStage(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#64748B] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#080C14] border border-white/10">
                <span className="text-[11px] text-[#64748B] block mb-1">Current Activity:</span>
                <span className="text-xs font-semibold text-[#00F2FE] flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  {selectedStage.activity}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-[#94A3B8] block">Processed Count</span>
                  <span className="text-sm font-bold text-white">{selectedStage.count.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-[#94A3B8] block">Stage Latency</span>
                  <span className="text-sm font-bold text-[#10B981]">{selectedStage.latency}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-[#94A3B8] block">Queue Depth</span>
                  <span className="text-sm font-bold text-[#F59E0B]">{selectedStage.queue} items</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-[#94A3B8] block">Retries Count</span>
                  <span className="text-sm font-bold text-[#9D4EDD]">0 retries</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedStage(null)}
                className="btn-secondary w-full justify-center text-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline Keyframe styling for moving particles */}
      <style>{`
        @keyframes particleMove {
          0% { left: -20%; }
          100% { left: 120%; }
        }
      `}</style>

    </div>
  );
}
