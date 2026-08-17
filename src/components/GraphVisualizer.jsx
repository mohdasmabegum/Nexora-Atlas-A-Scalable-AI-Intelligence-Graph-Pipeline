import React, { useState, useEffect, useRef } from 'react';
import { 
  Network, 
  Search, 
  ExternalLink, 
  Star, 
  Building2, 
  Box, 
  FileText, 
  GitBranch, 
  Briefcase
} from 'lucide-react';

const NODE_TYPES = {
  STARTUP: { color: '#00F2FE', label: 'Startup', icon: Building2 },
  PRODUCT: { color: '#9D4EDD', label: 'Product', icon: Box },
  PAPER: { color: '#F59E0B', label: 'Research Paper', icon: FileText },
  GITHUB: { color: '#10B981', label: 'GitHub Repo', icon: GitBranch },
  JOB: { color: '#F72585', label: 'AI Job', icon: Briefcase }
};

export default function GraphVisualizer({ startups = [], products = [], papers = [], jobs = [] }) {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    STARTUP: true,
    PRODUCT: true,
    PAPER: true,
    GITHUB: true,
    JOB: true
  });
  const [hoveredNode, setHoveredNode] = useState(null);

  // Generate Graph Nodes & Links from real pipeline data
  const graphDataRef = useRef({ nodes: [], links: [] });

  useEffect(() => {
    const nodes = [];
    const links = [];

    // Seed top startups as primary hubs
    const topStartups = (startups || []).slice(0, 15);
    const topProducts = (products || []).slice(0, 20);
    const topPapers = (papers || []).slice(0, 20);
    const topJobs = (jobs || []).slice(0, 15);

    // Map Startups
    topStartups.forEach((s, idx) => {
      const id = `startup-${idx}`;
      nodes.push({
        id,
        name: s.content?.entityName || 'AI Startup',
        type: 'STARTUP',
        data: s,
        x: Math.random() * 600 + 100,
        y: Math.random() * 400 + 100,
        vx: 0,
        vy: 0,
        radius: 18
      });
    });

    // Map Products & link to Startups
    topProducts.forEach((p, idx) => {
      const id = `prod-${idx}`;
      const startupName = p.content?.startupName;
      const targetStartupNode = nodes.find(n => n.type === 'STARTUP' && n.name?.toLowerCase() === startupName?.toLowerCase());
      
      const nodeObj = {
        id,
        name: p.content?.productName || 'AI Product',
        type: 'PRODUCT',
        data: p,
        x: Math.random() * 600 + 100,
        y: Math.random() * 400 + 100,
        vx: 0,
        vy: 0,
        radius: 14
      };
      nodes.push(nodeObj);

      if (targetStartupNode) {
        links.push({ source: id, target: targetStartupNode.id, label: 'BUILT_BY' });
      } else if (nodes.length > 0) {
        const randomStartup = nodes.filter(n => n.type === 'STARTUP')[idx % Math.max(1, topStartups.length)];
        if (randomStartup) {
          links.push({ source: id, target: randomStartup.id, label: 'BUILT_BY' });
        }
      }
    });

    // Map Papers & Repos
    topPapers.forEach((paper, idx) => {
      const paperId = `paper-${idx}`;
      nodes.push({
        id: paperId,
        name: paper.content?.title || 'AI Paper',
        type: 'PAPER',
        data: paper,
        x: Math.random() * 600 + 100,
        y: Math.random() * 400 + 100,
        vx: 0,
        vy: 0,
        radius: 12
      });

      if (paper.content?.github_url) {
        const repoId = `repo-${idx}`;
        nodes.push({
          id: repoId,
          name: paper.content.github_url.split('/').pop() || 'Repo',
          type: 'GITHUB',
          data: paper,
          x: Math.random() * 600 + 100,
          y: Math.random() * 400 + 100,
          vx: 0,
          vy: 0,
          radius: 10
        });
        links.push({ source: repoId, target: paperId, label: 'IMPLEMENTS' });

        // Connect to a startup
        const randomStartup = nodes.find(n => n.type === 'STARTUP');
        if (randomStartup) {
          links.push({ source: paperId, target: randomStartup.id, label: 'RESEARCHED_AT' });
        }
      }
    });

    // Map Jobs
    topJobs.forEach((job, idx) => {
      const jobId = `job-${idx}`;
      nodes.push({
        id: jobId,
        name: `${job.content?.title} @ ${job.content?.company}`,
        type: 'JOB',
        data: job,
        x: Math.random() * 600 + 100,
        y: Math.random() * 400 + 100,
        vx: 0,
        vy: 0,
        radius: 11
      });

      const matchingStartup = nodes.find(n => n.type === 'STARTUP' && n.name?.toLowerCase() === job.content?.company?.toLowerCase());
      if (matchingStartup) {
        links.push({ source: jobId, target: matchingStartup.id, label: 'HIRING_AT' });
      }
    });

    graphDataRef.current = { nodes, links };
  }, [startups, products, papers, jobs]);

  // Canvas Force Physics Simulation & Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth || 800;
      canvas.height = canvas.parentElement.clientHeight || 500;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Physics animation loop
    const render = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { nodes, links } = graphDataRef.current;

      const visibleNodes = nodes.filter(n => activeFilters[n.type] && 
        (!searchTerm || (n.name && n.name.toLowerCase().includes(searchTerm.toLowerCase())))
      );
      const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

      // Center attraction physics
      const centerX = (canvas.width || 800) / 2;
      const centerY = (canvas.height || 500) / 2;

      visibleNodes.forEach(n => {
        // Gravity towards center
        n.vx += (centerX - n.x) * 0.0005;
        n.vy += (centerY - n.y) * 0.0005;

        // Repulsion between nodes
        visibleNodes.forEach(other => {
          if (n.id !== other.id) {
            const dx = n.x - other.x;
            const dy = n.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            if (dist < 120) {
              const force = (120 - dist) / dist * 0.08;
              n.vx += dx * force;
              n.vy += dy * force;
            }
          }
        });

        // Apply velocity with damping
        n.vx *= 0.88;
        n.vy *= 0.88;
        n.x += n.vx;
        n.y += n.vy;

        // Boundaries
        n.x = Math.max(40, Math.min((canvas.width || 800) - 40, n.x));
        n.y = Math.max(40, Math.min((canvas.height || 500) - 40, n.y));
      });

      // Draw Edges / Links
      links.forEach(link => {
        if (visibleNodeIds.has(link.source) && visibleNodeIds.has(link.target)) {
          const sNode = visibleNodes.find(n => n.id === link.source);
          const tNode = visibleNodes.find(n => n.id === link.target);
          if (sNode && tNode) {
            const isHighlighted = (hoveredNode && (hoveredNode.id === sNode.id || hoveredNode.id === tNode.id));
            ctx.beginPath();
            ctx.moveTo(sNode.x, sNode.y);
            ctx.lineTo(tNode.x, tNode.y);
            ctx.strokeStyle = isHighlighted ? '#00F2FE' : 'rgba(56, 189, 248, 0.15)';
            ctx.lineWidth = isHighlighted ? 2.5 : 1;
            ctx.stroke();

            if (isHighlighted) {
              const time = Date.now() * 0.003;
              const ratio = (Math.sin(time) + 1) / 2;
              const px = sNode.x + (tNode.x - sNode.x) * ratio;
              const py = sNode.y + (tNode.y - sNode.y) * ratio;

              ctx.beginPath();
              ctx.arc(px, py, 4, 0, Math.PI * 2);
              ctx.fillStyle = '#00F2FE';
              ctx.shadowColor = '#00F2FE';
              ctx.shadowBlur = 10;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
      });

      // Draw Nodes
      visibleNodes.forEach(n => {
        const isSelected = selectedNode?.id === n.id;
        const isHovered = hoveredNode?.id === n.id;
        const typeInfo = NODE_TYPES[n.type];
        if (!typeInfo) return;

        ctx.beginPath();
        ctx.arc(n.x, n.y, isSelected || isHovered ? n.radius + 4 : n.radius, 0, Math.PI * 2);
        
        ctx.fillStyle = typeInfo.color;
        if (isSelected || isHovered) {
          ctx.shadowColor = typeInfo.color;
          ctx.shadowBlur = 18;
        } else {
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(0,0,0,0.5)';
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Outer halo ring for selected/hovered
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 8, 0, Math.PI * 2);
          ctx.strokeStyle = typeInfo.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Draw Label
        ctx.font = isSelected || isHovered ? '600 12px "Plus Jakarta Sans"' : '500 10px "Plus Jakarta Sans"';
        ctx.fillStyle = isSelected || isHovered ? '#FFFFFF' : '#94A3B8';
        ctx.textAlign = 'center';
        const labelText = n.name || 'Entity';
        ctx.fillText(labelText.length > 20 ? labelText.substring(0, 18) + '...' : labelText, n.x, n.y + n.radius + 14);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [activeFilters, searchTerm, selectedNode, hoveredNode]);

  // Handle Mouse Hover & Click on Nodes
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const { nodes } = graphDataRef.current;
    const found = nodes.find(n => {
      const dx = n.x - mx;
      const dy = n.y - my;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 5;
    });

    if (found && activeFilters[found.type]) {
      setHoveredNode(found);
      canvas.style.cursor = 'pointer';
    } else {
      setHoveredNode(null);
      canvas.style.cursor = 'default';
    }
  };

  const handleClick = () => {
    if (hoveredNode) {
      setSelectedNode(hoveredNode);
    } else {
      setSelectedNode(null);
    }
  };

  const toggleFilter = (type) => {
    setActiveFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HERO FEATURE BANNER */}
      <div className="hero-feature-banner">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] mb-1">
          <Network className="w-4 h-4" />
          <span>NEO4J GRAPH TOPOLOGY ENGINE</span>
        </div>
        <h1>Intelligence Knowledge Graph</h1>
        <p>Interactive 2D force-directed physics graph visualizing complex entity relationships between AI Startups, SaaS Products, Research Papers, GitHub Repos, and AI Jobs.</p>
      </div>

      <div className="relative w-full h-[650px] flex flex-col md:flex-row gap-4">
        
        {/* Main Graph Viewport */}
        <div className="relative flex-1 rounded-2xl bg-[#080C14] border border-[#38bdf8]/20 overflow-hidden shadow-2xl">
          
          {/* Controls Header Overlay */}
          <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-[#0F172A]/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search graph (e.g. OpenAI, Claude, Transformer)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#080C14] border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F2FE]"
              />
            </div>

            {/* Node Filter Toggles */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {Object.entries(NODE_TYPES).map(([type, meta]) => {
                const Icon = meta.icon;
                const active = activeFilters[type];
                return (
                  <button
                    key={type}
                    onClick={() => toggleFilter(type)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      active 
                        ? 'bg-[#080C14] text-white border' 
                        : 'bg-transparent text-[#64748B] border border-transparent hover:text-white'
                    }`}
                    style={{ borderColor: active ? meta.color : 'transparent' }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: active ? meta.color : '#64748B' }} />
                    <span>{meta.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Interactive Canvas */}
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
          />

          {/* Floating Legend / Stat Badge */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3 bg-[#0F172A]/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 font-mono text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F2FE] animate-pulse" />
              Live Topology Active
            </span>
            <span className="text-white/30">|</span>
            <span>Click any node to inspect graph metadata</span>
          </div>

        </div>

        {/* Node Detail Inspector Drawer */}
        {selectedNode && (
          <div className="w-full md:w-96 rounded-2xl bg-[#0F172A]/90 border border-[#38bdf8]/30 backdrop-blur-xl p-5 flex flex-col justify-between shadow-2xl animate-float">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: NODE_TYPES[selectedNode.type]?.color || '#00F2FE' }} 
                  />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
                    {NODE_TYPES[selectedNode.type]?.label || 'Node'}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="text-[#64748B] hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                {selectedNode.name}
              </h3>

              <div className="space-y-3 mt-4 text-xs">
                {selectedNode.type === 'STARTUP' && (
                  <>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-[#94A3B8]">Canonical Entity:</span>
                      <span className="font-semibold text-white">{selectedNode.data?.content?.entityName}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-[#94A3B8]">Employee Count:</span>
                      <span className="font-mono text-[#00F2FE]">{selectedNode.data?.content?.data?.employeeCount} engineers</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-[#94A3B8]">Primary Source:</span>
                      <span className="text-[#38bdf8] truncate max-w-[180px]">{selectedNode.data?.source?.name}</span>
                    </div>
                  </>
                )}

                {selectedNode.type === 'PRODUCT' && (
                  <>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-[#94A3B8]">Parent Startup:</span>
                      <span className="font-semibold text-[#00F2FE]">{selectedNode.data?.content?.startupName}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-[#94A3B8]">Pricing Tier:</span>
                      <span className="badge-tag badge-purple">{selectedNode.data?.content?.pricingModel}</span>
                    </div>
                  </>
                )}

                {selectedNode.type === 'PAPER' && (
                  <>
                    <div className="py-1.5 border-b border-white/5">
                      <span className="text-[#94A3B8] block mb-1">Authors:</span>
                      <span className="text-white font-medium">{selectedNode.data?.content?.authors?.join(', ')}</span>
                    </div>
                    {selectedNode.data?.content?.github_stars && (
                      <div className="flex justify-between py-1.5 border-b border-white/5">
                        <span className="text-[#94A3B8]">GitHub Stars:</span>
                        <span className="font-mono text-[#F59E0B] flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#F59E0B]" />
                          {selectedNode.data.content.github_stars.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </>
                )}

                {selectedNode.type === 'JOB' && (
                  <>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-[#94A3B8]">Role Family:</span>
                      <span className="badge-tag badge-emerald">{selectedNode.data?.content?.role_family}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-[#94A3B8]">Remote Work:</span>
                      <span className="text-white">{selectedNode.data?.content?.is_remote ? 'Remote Eligible' : 'On-Site'}</span>
                    </div>
                  </>
                )}

                <div className="pt-2 text-[11px] font-mono text-[#64748B]">
                  Collected At: {new Date(selectedNode.data?.collectedAt || Date.now()).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 mt-4">
              <a
                href={selectedNode.data?.source?.url || selectedNode.data?.content?.paper_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="btn-glow w-full justify-center text-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Inspect Source Record</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
