import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Play, 
  Pause, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function SourcesRegistry() {
  const [sources, setSources] = useState([]);
  const [isCrawlerRunning, setIsCrawlerRunning] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/sources')
      .then(res => res.json())
      .then(data => setSources(data))
      .catch(() => {
        // Fallback preset sources
        setSources([
          { id: "src-1", name: "Arxiv AI Papers", url: "https://arxiv.org/list/cs.AI/recent", category: "Research", enabled: true, method: "aiohttp", interval: "15m", records: 1240, freshness: "24h" },
          { id: "src-2", name: "Papers with Code", url: "https://paperswithcode.co", category: "Research", enabled: true, method: "aiohttp", interval: "30m", records: 890, freshness: "24h" },
          { id: "src-3", name: "TechCrunch AI News", url: "https://techcrunch.com/category/artificial-intelligence/", category: "News", enabled: true, method: "Playwright Async", interval: "10m", records: 450, freshness: "24h" },
          { id: "src-4", name: "VentureBeat AI", url: "https://venturebeat.com/category/ai/", category: "News", enabled: true, method: "aiohttp", interval: "15m", records: 380, freshness: "24h" },
          { id: "src-5", name: "Hacker News AI", url: "https://news.ycombinator.com", category: "News", enabled: true, method: "aiohttp", interval: "5m", records: 620, freshness: "24h" },
          { id: "src-6", name: "Forbes AI Pulse", url: "https://forbes.com/innovation", category: "News", enabled: true, method: "aiohttp", interval: "30m", records: 210, freshness: "24h" },
          { id: "src-7", name: "MIT Tech Review AI", url: "https://technologyreview.com/topic/artificial-intelligence/", category: "News", enabled: true, method: "Playwright Async", interval: "60m", records: 190, freshness: "24h" },
          { id: "src-8", name: "OpenAI Careers Board", url: "https://openai.com/careers", category: "Jobs", enabled: true, method: "aiohttp", interval: "1h", records: 85, freshness: "24h" },
          { id: "src-9", name: "Anthropic Jobs Board", url: "https://anthropic.com/careers", category: "Jobs", enabled: true, method: "aiohttp", interval: "1h", records: 64, freshness: "24h" },
          { id: "src-10", name: "Mistral AI Careers", url: "https://mistral.ai/careers", category: "Jobs", enabled: true, method: "aiohttp", interval: "1h", records: 42, freshness: "24h" },
          { id: "src-11", name: "Cohere Careers Board", url: "https://cohere.com/careers", category: "Jobs", enabled: true, method: "aiohttp", interval: "1h", records: 38, freshness: "24h" },
          { id: "src-12", name: "Scale AI Careers", url: "https://scale.com/careers", category: "Jobs", enabled: true, method: "aiohttp", interval: "1h", records: 95, freshness: "24h" }
        ]);
      });
  }, []);

  const handleStartStop = (action) => {
    fetch(`http://localhost:8000/crawl/${action}`, { method: 'POST' })
      .then(() => setIsCrawlerRunning(action === 'start'))
      .catch(() => setIsCrawlerRunning(action === 'start'));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HERO FEATURE BANNER */}
      <div className="hero-feature-banner flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] mb-1">
            <Globe className="w-4 h-4" />
            <span>INGESTION SOURCES REGISTRY</span>
          </div>
          <h1>Sources Registry & Crawler Management</h1>
          <p>Active monitoring and stealth fetching across 12 canonical AI ecosystem feeds (News, Jobs, Research Directories).</p>
        </div>

        <button
          onClick={() => handleStartStop(isCrawlerRunning ? 'stop' : 'start')}
          className="btn-glow text-xs shrink-0 self-start md:self-center"
        >
          {isCrawlerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isCrawlerRunning ? 'Pause Ingestion Engine' : 'Resume Engine'}</span>
        </button>
      </div>

      {/* 2 PER ROW SOURCES CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map(src => (
          <div key={src.id} className="glass-panel p-5 space-y-3 hover:border-[#00F2FE]/50 transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between">
                <span className={`badge-tag ${
                  src.category === 'Research' ? 'badge-amber' :
                  src.category === 'News' ? 'badge-emerald' : 'badge-purple'
                }`}>
                  {src.category}
                </span>
                <span className="font-mono text-[10px] text-[#10B981] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                  Active • {src.interval}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-[#00F2FE] transition mt-2">{src.name}</h3>

              <a href={src.url} target="_blank" rel="noreferrer" className="text-xs font-mono text-[#38bdf8] hover:underline flex items-center gap-1 truncate mt-1">
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                {src.url}
              </a>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8]">Method: <strong className="text-white">{src.method}</strong></span>
              <span className="text-[#00F2FE] font-bold">{src.records.toLocaleString()} records</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
