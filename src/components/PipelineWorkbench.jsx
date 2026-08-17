import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  Sliders, 
  Zap, 
  Terminal
} from 'lucide-react';

export default function PipelineWorkbench() {
  // LLM Fallback simulator state
  const [llmPayload, setLlmPayload] = useState('Extract structured startups from this raw HTML document...');
  const [forceFailTier1, setForceFailTier1] = useState(true);
  const [forceFailTier2, setForceFailTier2] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState([]);
  const [activeModelUsed, setActiveModelUsed] = useState(null);

  // Entity Resolution state
  const [rawEntityInput, setRawEntityInput] = useState('Open AI, Inc.');
  const [resolutionResult, setResolutionResult] = useState(null);

  // Run LLM Fallback Chain Simulation
  const runLLMSimulation = async () => {
    setIsSimulating(true);
    setSimulationLogs([]);
    setActiveModelUsed(null);

    const addLog = (msg) => {
      const time = new Date().toLocaleTimeString();
      setSimulationLogs(prev => [...prev, `[${time}] ${msg}`]);
    };

    addLog('Checking payload size for HTTP 413 Payload Too Large protection...');
    await new Promise(r => setTimeout(r, 400));
    
    if (llmPayload.length > 500) {
      addLog('Payload size exceeds token limit threshold. Splitting into 2 semantic chunks...');
    } else {
      addLog('Payload within token limit. Processing single chunk.');
    }
    await new Promise(r => setTimeout(r, 400));

    // Tier 1: Gemini Flash
    addLog('Dispatching payload to Tier 1: Gemini 1.5 Flash...');
    await new Promise(r => setTimeout(r, 600));

    if (forceFailTier1) {
      addLog('⚠️ Gemini Flash returned HTTP 429 Too Many Requests!');
      addLog('Initiating Exponential Backoff with Jitter (delay 1.42s)...');
      await new Promise(r => setTimeout(r, 700));
      addLog('Retry 2 for Tier 1 failed. Invoking Fallback Chain to Tier 2...');
      
      // Tier 2: Groq Llama 3
      addLog('Dispatching payload to Tier 2: Groq Llama 3 70B...');
      await new Promise(r => setTimeout(r, 600));

      if (forceFailTier2) {
        addLog('⚠️ Groq Llama 3 returned HTTP 503 Provider Overload!');
        addLog('Invoking Fallback Chain to Tier 3: DeepSeek V3...');
        await new Promise(r => setTimeout(r, 700));
        addLog('DeepSeek V3 processed payload successfully! HTTP 200 OK.');
        setActiveModelUsed('Tier 3: DeepSeek V3');
      } else {
        addLog('Groq Llama 3 70B processed payload successfully! HTTP 200 OK.');
        setActiveModelUsed('Tier 2: Groq Llama 3 70B');
      }
    } else {
      addLog('Gemini 1.5 Flash processed payload successfully! HTTP 200 OK.');
      setActiveModelUsed('Tier 1: Gemini 1.5 Flash');
    }

    addLog('Structured JSON canonical schema extracted cleanly.');
    setIsSimulating(false);
  };

  // Run Entity Resolver Live
  const resolveEntityLive = (input) => {
    setRawEntityInput(input);
    const clean = input.toLowerCase().replace(/[\.,]/g, '').trim();
    
    let canonical = 'Unknown Entity';
    let confidence = 0.75;
    let algo = 'Normalized Capitalization';

    if (clean.includes('open ai') || clean.includes('openai') || clean.includes('sora')) {
      canonical = 'OpenAI';
      confidence = 1.0;
      algo = 'Deterministic Exact Seed';
    } else if (clean.includes('anthropic') || clean.includes('claude')) {
      canonical = 'Anthropic';
      confidence = 1.0;
      algo = 'Deterministic Exact Seed';
    } else if (clean.includes('mistral')) {
      canonical = 'Mistral AI';
      confidence = 0.95;
      algo = 'Sub-string Seed Match';
    } else if (clean.includes('cohere')) {
      canonical = 'Cohere';
      confidence = 1.0;
      algo = 'Deterministic Exact Seed';
    } else if (clean.includes('hugging')) {
      canonical = 'Hugging Face';
      confidence = 0.98;
      algo = 'Fuzzy Token Match';
    } else {
      const words = input.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1));
      canonical = words.join(' ');
    }

    setResolutionResult({ canonical, confidence, algo });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HERO FEATURE BANNER */}
      <div className="hero-feature-banner flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] mb-1">
            <Cpu className="w-4 h-4" />
            <span>LLM & RESOLVER WORKBENCH</span>
          </div>
          <h1>LLM Orchestrator & Entity Resolver</h1>
          <p>Interactive testing sandbox for multi-tier LLM fallback routing (Gemini ➔ Groq ➔ DeepSeek), 413/429 error handling, and deterministic entity resolution.</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="badge-tag badge-cyan">Resilience Engine</span>
          <span className="badge-tag badge-emerald">Backoff Active</span>
        </div>
      </div>

      {/* 2 PER ROW SECTION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Section 1: Multi-Tier LLM Fallback Visualizer */}
        <div className="glass-panel p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00F2FE]" />
              Multi-Tier LLM Fallback Chain
            </h3>
            <span className="font-mono text-[10px] text-[#94A3B8]">Auto-Routing</span>
          </div>

          {/* Model Architecture Tiers */}
          <div className="space-y-2.5">
            
            {/* Tier 1 */}
            <div className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
              activeModelUsed === 'Tier 1: Gemini 1.5 Flash' 
                ? 'bg-[#00F2FE]/10 border-[#00F2FE]' 
                : forceFailTier1 ? 'bg-red-500/5 border-red-500/30' : 'bg-[#080C14] border-white/10'
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#00F2FE]">TIER 1</span>
                  <span className="text-xs font-bold text-white">Gemini 1.5 Flash</span>
                </div>
                <div className="text-[10px] text-[#64748B] mt-0.5">Primary Model • Low Latency</div>
              </div>
              <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-[#94A3B8]">
                <input
                  type="checkbox"
                  checked={forceFailTier1}
                  onChange={(e) => setForceFailTier1(e.target.checked)}
                  className="rounded border-white/20 bg-black text-[#00F2FE]"
                />
                Simulate 429
              </label>
            </div>

            {/* Tier 2 */}
            <div className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
              activeModelUsed === 'Tier 2: Groq Llama 3 70B' 
                ? 'bg-[#9D4EDD]/10 border-[#9D4EDD]' 
                : forceFailTier2 ? 'bg-red-500/5 border-red-500/30' : 'bg-[#080C14] border-white/10'
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#9D4EDD]">TIER 2</span>
                  <span className="text-xs font-bold text-white">Groq Llama 3 70B</span>
                </div>
                <div className="text-[10px] text-[#64748B] mt-0.5">Throughput Hardware Accelerator</div>
              </div>
              <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-[#94A3B8]">
                <input
                  type="checkbox"
                  checked={forceFailTier2}
                  onChange={(e) => setForceFailTier2(e.target.checked)}
                  className="rounded border-white/20 bg-black text-[#9D4EDD]"
                />
                Simulate 503
              </label>
            </div>

            {/* Tier 3 */}
            <div className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
              activeModelUsed === 'Tier 3: DeepSeek V3' 
                ? 'bg-[#10B981]/10 border-[#10B981]' 
                : 'bg-[#080C14] border-white/10'
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#10B981]">TIER 3</span>
                  <span className="text-xs font-bold text-white">DeepSeek V3</span>
                </div>
                <div className="text-[10px] text-[#64748B] mt-0.5">Deep Reasoning Fallback</div>
              </div>
              <span className="badge-tag badge-emerald text-[10px]">Safety Net</span>
            </div>

          </div>

          {/* Trigger Button */}
          <button
            onClick={runLLMSimulation}
            disabled={isSimulating}
            className="btn-glow w-full justify-center text-xs py-2"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating Fallback Routing...</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Trigger Fallback Chain</span>
              </>
            )}
          </button>

          {/* Console Logs */}
          <div className="bg-[#05070B] border border-white/10 rounded-xl p-3 font-mono text-xs space-y-1 h-44 overflow-y-auto">
            <div className="text-[#64748B] border-b border-white/5 pb-1 flex items-center gap-1.5 text-[10px]">
              <Terminal className="w-3 h-3 text-[#00F2FE]" />
              <span>Orchestration Execution Logs</span>
            </div>
            {simulationLogs.length === 0 ? (
              <div className="text-[#64748B] italic pt-2 text-[11px]">Click button above to simulate fallback...</div>
            ) : (
              simulationLogs.map((log, i) => (
                <div 
                  key={i} 
                  className={
                    log.includes('⚠️') ? 'text-amber-400 text-[11px]' :
                    log.includes('Success') || log.includes('successfully') ? 'text-[#10B981] font-bold text-[11px]' :
                    'text-[#94A3B8] text-[11px]'
                  }
                >
                  {log}
                </div>
              ))
            )}
          </div>

        </div>

        {/* Section 2: Deterministic Entity Resolution Sandbox */}
        <div className="glass-panel p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#9D4EDD]" />
              Entity Resolution Sandbox
            </h3>
            <span className="font-mono text-[10px] text-[#94A3B8]">Deterministic</span>
          </div>

          <p className="text-xs text-[#94A3B8]">
            Test how raw entity strings map to canonical entity profiles against a lookup table.
          </p>

          {/* Presets */}
          <div className="flex flex-wrap gap-1.5">
            {['Open AI, Inc.', 'Anthropic PBC', 'Mistral AI Ltd.', 'Sora by OpenAI', 'Cohere AI Corp'].map((preset) => (
              <button
                key={preset}
                onClick={() => resolveEntityLive(preset)}
                className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white hover:border-[#00F2FE] transition"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#94A3B8]">Raw Input String:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={rawEntityInput}
                onChange={(e) => resolveEntityLive(e.target.value)}
                className="flex-1 bg-[#080C14] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#9D4EDD]"
              />
              <button
                onClick={() => resolveEntityLive(rawEntityInput)}
                className="btn-glow text-xs py-1.5 px-3"
              >
                Resolve
              </button>
            </div>
          </div>

          {/* Output Card */}
          {resolutionResult && (
            <div className="bg-[#080C14] border border-[#10B981]/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#94A3B8]">Canonical Output:</span>
                <span className="badge-tag badge-emerald text-[10px]">
                  <CheckCircle2 className="w-3 h-3" />
                  Canonical Match
                </span>
              </div>

              <div className="text-base font-bold text-white flex items-center gap-2">
                <span className="font-mono text-[#F72585] text-xs">{rawEntityInput}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span className="text-[#10B981]">{resolutionResult.canonical}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/5 font-mono">
                <div>
                  <span className="text-[#64748B] block text-[10px]">Confidence:</span>
                  <span className="font-bold text-[#F59E0B]">
                    {(resolutionResult.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px]">Algorithm:</span>
                  <span className="text-white text-[11px] truncate block">{resolutionResult.algo}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
