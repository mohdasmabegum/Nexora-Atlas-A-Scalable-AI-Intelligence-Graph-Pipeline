import React from 'react';
import { 
  BookOpen, 
  Server, 
  Network, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  Database
} from 'lucide-react';

export default function ArchitectureDocs() {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HERO FEATURE BANNER */}
      <div className="hero-feature-banner">
        <div className="flex items-center gap-2 text-xs font-mono text-[#9D4EDD] mb-1">
          <BookOpen className="w-4 h-4" />
          <span>PRODUCTION DISTRIBUTED SPECIFICATION</span>
        </div>
        <h1>System Scale Architecture Design</h1>
        <p>Technical specifications, distributed scale topology (500,000+ records), rate limit mitigation, and polyglot storage design for Nexora Atlas.</p>
      </div>

      {/* 4 CORE SYSTEM DESIGN PILLARS (2 PER ROW GRID) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Pillar 1: Scale Strategy (500k+ Records) */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-9 h-9 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/30 flex items-center justify-center text-[#00F2FE] shrink-0">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">1. Scale Strategy (500,000+ Records)</h3>
              <span className="text-[11px] font-mono text-[#00F2FE]">Distributed Worker Pool</span>
            </div>
          </div>
          
          <ul className="space-y-2 text-xs text-[#94A3B8]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
              <span><strong className="text-white">Distributed Worker Cluster:</strong> Kubernetes-orchestrated worker pool using Celery/Temporal with Redis queues to divide scraping domain partitions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
              <span><strong className="text-white">Headless Browser Pool:</strong> Playwright Cluster with automated proxy rotation to bypass Cloudflare turnstile and Datadome challenges.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
              <span><strong className="text-white">Streaming Event Pipeline:</strong> Apache Kafka event bus decouples raw page fetching from LLM structuring and entity resolution.</span>
            </li>
          </ul>
        </div>

        {/* Pillar 2: Handling 413s & 429s */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-9 h-9 rounded-xl bg-[#9D4EDD]/10 border border-[#9D4EDD]/30 flex items-center justify-center text-[#9D4EDD] shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">2. Handling 413s & 429 Rate Limits</h3>
              <span className="text-[11px] font-mono text-[#9D4EDD]">Context Window & Token Control</span>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-[#94A3B8]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#9D4EDD] shrink-0 mt-0.5" />
              <span><strong className="text-white">Semantic HTML Truncation (413):</strong> HTML boilerplates (scripts, inline CSS) are stripped before tokenizing. Excess payloads split into semantic chunks.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#9D4EDD] shrink-0 mt-0.5" />
              <span><strong className="text-white">Exponential Backoff with Jitter (429):</strong> Adaptive rate limiters calculate dynamic retry delays using formula: <code className="font-mono text-[#9D4EDD]">t = 2^attempt + rand(0, 1)</code>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#9D4EDD] shrink-0 mt-0.5" />
              <span><strong className="text-white">Multi-Provider Fallback:</strong> If Tier 1 (Gemini Flash) hits quota, request auto-routes to Tier 2 (Groq Llama) then Tier 3 (DeepSeek).</span>
            </li>
          </ul>
        </div>

        {/* Pillar 3: Freshness Tracking & Deduplication */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">3. 24-Hr Freshness & Deduplication</h3>
              <span className="text-[11px] font-mono text-[#10B981]">Bloom Filter & Fingerprinting</span>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-[#94A3B8]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span><strong className="text-white">Redis Bloom Filters:</strong> Ultra-fast O(1) duplicate URL and article content hash lookup prevents worker nodes from processing duplicate news or jobs.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span><strong className="text-white">Strict Date Normalization:</strong> Custom heuristics parse relative dates ("2 hours ago") and convert to ISO UTC. Items &gt;24h old are rejected.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span><strong className="text-white">Dynamic Metric Refresh:</strong> GitHub stars and paper citation counts are refreshed via background cron jobs without re-scraping full text.</span>
            </li>
          </ul>
        </div>

        {/* Pillar 4: Storage Architecture Strategy */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">4. Polyglot Storage Strategy</h3>
              <span className="text-[11px] font-mono text-[#F59E0B]">Graph + Vector + Relational</span>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-[#94A3B8]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <span><strong className="text-white">Graph Database (Neo4j / Memgraph):</strong> Primary storage for mapping complex multi-modal relationships (Startup ➔ Product ➔ Paper ➔ Job).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <span><strong className="text-white">Vector Database (Qdrant / Pinecone):</strong> Stores dense HNSW embeddings of research paper abstracts for semantic similarity search.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <span><strong className="text-white">Relational DB (PostgreSQL / Timescale):</strong> Serves structured ACIDs, entity resolution audit logs, and metrics temporal aggregations.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* End-to-End Execution Flow Architecture */}
      <div className="glass-panel p-5 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Network className="w-4 h-4 text-[#00F2FE]" />
          End-to-End Execution Flow Architecture
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-[#080C14] border border-white/10 text-center space-y-1">
            <span className="font-mono text-[10px] text-[#00F2FE]">STEP 01</span>
            <div className="font-semibold text-xs text-white">Crawler Layer</div>
            <div className="text-[10px] text-[#64748B]">Async Playwright + Anti-Bot Rotation</div>
          </div>

          <div className="p-3 rounded-xl bg-[#080C14] border border-white/10 text-center space-y-1">
            <span className="font-mono text-[10px] text-[#00F2FE]">STEP 02</span>
            <div className="font-semibold text-xs text-white">Freshness Check</div>
            <div className="text-[10px] text-[#64748B]">24-hr ISO Date Filter & Bloom Filter</div>
          </div>

          <div className="p-3 rounded-xl bg-[#080C14] border border-white/10 text-center space-y-1">
            <span className="font-mono text-[10px] text-[#9D4EDD]">STEP 03</span>
            <div className="font-semibold text-xs text-white">LLM Extraction</div>
            <div className="text-[10px] text-[#64748B]">Chunking (413) + Fallback Chain</div>
          </div>

          <div className="p-3 rounded-xl bg-[#080C14] border border-white/10 text-center space-y-1">
            <span className="font-mono text-[10px] text-[#10B981]">STEP 04</span>
            <div className="font-semibold text-xs text-white">Entity Resolver</div>
            <div className="text-[10px] text-[#64748B]">Fuzzy String Matching & Canonicalization</div>
          </div>

          <div className="p-3 rounded-xl bg-[#080C14] border border-white/10 text-center space-y-1">
            <span className="font-mono text-[10px] text-[#F59E0B]">STEP 05</span>
            <div className="font-semibold text-xs text-white">Graph Storage</div>
            <div className="text-[10px] text-[#64748B]">Neo4j Knowledge Graph Storage</div>
          </div>
        </div>
      </div>

    </div>
  );
}
