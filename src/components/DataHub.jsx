import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Box, 
  FileText, 
  Briefcase, 
  Newspaper, 
  Link2, 
  Search, 
  Download, 
  Star, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  ShieldCheck,
  LayoutGrid,
  List,
  Sparkles,
  Layers
} from 'lucide-react';

export default function DataHub({ 
  activeTab = 'startups',
  startups = [], 
  products = [], 
  papers = [], 
  jobs = [], 
  news = [], 
  entityMappings = [],
  onExportTab,
  onSelectProvenance
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubFilter, setActiveSubFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset sub-filter when switching active page
  React.useEffect(() => {
    setActiveSubFilter('ALL');
    setCurrentPage(1);
    setSearchTerm('');
  }, [activeTab]);

  // Page specific configs and sub-navbar filters
  const pageConfigs = {
    startups: {
      title: 'AI Startups Directory Page',
      subtitle: '1,000 Ingested Startups with Team Sizes & Provenance',
      icon: Building2,
      color: '#00F2FE',
      count: startups.length,
      badge: 'STANDALONE FEATURE PAGE',
      desc: 'Canonical startup entity profiles extracted via stealth crawler with team counts and source URLs.',
      subFilters: [
        { id: 'ALL', label: 'All Startups', count: startups.length },
        { id: 'LARGE', label: 'Enterprise Scale (>50)', count: startups.filter(s => s.content?.data?.employeeCount > 50).length },
        { id: 'MID', label: 'Mid-Scale (10-50)', count: startups.filter(s => s.content?.data?.employeeCount >= 10 && s.content?.data?.employeeCount <= 50).length },
        { id: 'EARLY', label: 'Early Stage (<10)', count: startups.filter(s => s.content?.data?.employeeCount < 10).length }
      ]
    },
    products: {
      title: 'AI SaaS Products Directory Page',
      subtitle: '1,000 Ingested Products & Pricing Models',
      icon: Box,
      color: '#9D4EDD',
      count: products.length,
      badge: 'STANDALONE FEATURE PAGE',
      desc: 'AI SaaS products linked to parent startups with pricing tiers (FREE, FREEMIUM, PAID, ENTERPRISE).',
      subFilters: [
        { id: 'ALL', label: 'All Pricing Models', count: products.length },
        { id: 'FREE', label: 'FREE Tier', count: products.filter(p => p.content?.pricingModel === 'FREE').length },
        { id: 'FREEMIUM', label: 'FREEMIUM Tier', count: products.filter(p => p.content?.pricingModel === 'FREEMIUM').length },
        { id: 'PAID', label: 'PAID Tier', count: products.filter(p => p.content?.pricingModel === 'PAID').length },
        { id: 'ENTERPRISE', label: 'ENTERPRISE Tier', count: products.filter(p => p.content?.pricingModel === 'ENTERPRISE').length }
      ]
    },
    research: {
      title: 'AI Research Papers & GitHub Code Page',
      subtitle: '1,000 Tracked Arxiv Papers with Live GitHub Stars',
      icon: FileText,
      color: '#F59E0B',
      count: papers.length,
      badge: 'STANDALONE FEATURE PAGE',
      desc: 'Arxiv and PapersWithCode research papers correlated with GitHub code repositories and live stars.',
      subFilters: [
        { id: 'ALL', label: 'All Papers', count: papers.length },
        { id: 'HIGH_STARS', label: 'High Stars (>10k ⭐)', count: papers.filter(p => (p.content?.github_stars || 0) > 10000).length },
        { id: 'ARXIV', label: 'Arxiv Repos', count: papers.filter(p => p.content?.paper_url?.includes('arxiv')).length },
        { id: 'WITH_GITHUB', label: 'With GitHub Code', count: papers.filter(p => p.content?.github_url).length }
      ]
    },
    jobs: {
      title: '24h Fresh AI Job Openings Page',
      subtitle: '150 Validated Openings (100% 24h SLA)',
      icon: Briefcase,
      color: '#F72585',
      count: jobs.length,
      badge: 'STANDALONE FEATURE PAGE',
      desc: 'Verified AI engineering and research roles from 5 top AI company career boards.',
      subFilters: [
        { id: 'ALL', label: 'All Openings', count: jobs.length },
        { id: 'ENGINEERING', label: 'Engineering (75)', count: jobs.filter(j => j.content?.role_family === 'Engineering').length },
        { id: 'RESEARCH', label: 'Research (42)', count: jobs.filter(j => j.content?.role_family === 'Research').length },
        { id: 'REMOTE', label: 'Remote Only', count: jobs.filter(j => j.content?.is_remote).length }
      ]
    },
    news: {
      title: '24h Fresh AI News Signals Page',
      subtitle: '120 Validated Signals (100% Source Provenance)',
      icon: Newspaper,
      color: '#10B981',
      count: news.length,
      badge: 'STANDALONE FEATURE PAGE',
      desc: 'Full-text news signals extracted from 5 tech news sources within the last 24 hours.',
      subFilters: [
        { id: 'ALL', label: 'All News Signals', count: news.length },
        { id: 'TECHCRUNCH', label: 'TechCrunch Feed', count: news.filter(n => (n.content?.canonical_source || n.source?.name || '').includes('TechCrunch')).length },
        { id: 'VENTUREBEAT', label: 'VentureBeat Feed', count: news.filter(n => (n.content?.canonical_source || n.source?.name || '').includes('VentureBeat')).length },
        { id: 'OPENAI', label: 'OpenAI News', count: news.filter(n => (n.content?.canonical_source || n.source?.name || '').includes('OpenAI')).length }
      ]
    },
    mappings: {
      title: 'Deterministic Entity Resolution Log Page',
      subtitle: '60 Canonical Entity Pair Mappings',
      icon: Link2,
      color: '#4FACFE',
      count: entityMappings.length,
      badge: 'STANDALONE FEATURE PAGE',
      desc: 'Deduplication and canonical resolution mapping un-normalized strings to canonical profiles.',
      subFilters: [
        { id: 'ALL', label: 'All Mappings', count: entityMappings.length },
        { id: 'EXACT', label: 'Exact Matches (1.0)', count: entityMappings.filter(m => m.confidenceScore === 1.0).length },
        { id: 'FUZZY', label: 'Fuzzy Token Match', count: entityMappings.filter(m => m.matchingMethod?.includes('Fuzzy')).length },
        { id: 'SUBSTRING', label: 'Sub-string Seed Match', count: entityMappings.filter(m => m.matchingMethod?.includes('Sub-string')).length }
      ]
    }
  };

  const currentConfig = pageConfigs[activeTab] || pageConfigs.startups;
  const PageIcon = currentConfig.icon;

  // Filter dataset by active sub-navbar filter & search query
  const filteredData = useMemo(() => {
    let list = [];
    if (activeTab === 'startups') {
      list = startups;
      if (activeSubFilter === 'LARGE') list = list.filter(s => s.content?.data?.employeeCount > 50);
      else if (activeSubFilter === 'MID') list = list.filter(s => s.content?.data?.employeeCount >= 10 && s.content?.data?.employeeCount <= 50);
      else if (activeSubFilter === 'EARLY') list = list.filter(s => s.content?.data?.employeeCount < 10);
    }
    else if (activeTab === 'products') {
      list = products;
      if (activeSubFilter !== 'ALL') list = list.filter(p => p.content?.pricingModel === activeSubFilter);
    }
    else if (activeTab === 'research' || activeTab === 'papers') {
      list = papers;
      if (activeSubFilter === 'HIGH_STARS') list = list.filter(p => (p.content?.github_stars || 0) > 10000);
      else if (activeSubFilter === 'ARXIV') list = list.filter(p => p.content?.paper_url?.includes('arxiv'));
      else if (activeSubFilter === 'WITH_GITHUB') list = list.filter(p => p.content?.github_url);
    }
    else if (activeTab === 'jobs') {
      list = jobs;
      if (activeSubFilter === 'ENGINEERING') list = list.filter(j => j.content?.role_family === 'Engineering');
      else if (activeSubFilter === 'RESEARCH') list = list.filter(j => j.content?.role_family === 'Research');
      else if (activeSubFilter === 'REMOTE') list = list.filter(j => j.content?.is_remote);
    }
    else if (activeTab === 'news') {
      list = news;
      if (activeSubFilter === 'TECHCRUNCH') list = list.filter(n => (n.content?.canonical_source || n.source?.name || '').includes('TechCrunch'));
      else if (activeSubFilter === 'VENTUREBEAT') list = list.filter(n => (n.content?.canonical_source || n.source?.name || '').includes('VentureBeat'));
      else if (activeSubFilter === 'OPENAI') list = list.filter(n => (n.content?.canonical_source || n.source?.name || '').includes('OpenAI'));
    }
    else if (activeTab === 'mappings') {
      list = entityMappings;
      if (activeSubFilter === 'EXACT') list = list.filter(m => m.confidenceScore === 1.0);
      else if (activeSubFilter === 'FUZZY') list = list.filter(m => m.matchingMethod?.includes('Fuzzy'));
      else if (activeSubFilter === 'SUBSTRING') list = list.filter(m => m.matchingMethod?.includes('Sub-string'));
    }

    if (!searchTerm) return list;

    const term = searchTerm.toLowerCase();
    return list.filter(item => JSON.stringify(item).toLowerCase().includes(term));
  }, [activeTab, activeSubFilter, startups, products, papers, jobs, news, entityMappings, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HERO FEATURE BANNER FOR THIS DEDICATED PAGE */}
      <div className="hero-feature-banner flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono mb-1" style={{ color: currentConfig.color }}>
            <PageIcon className="w-4 h-4" />
            <span>{currentConfig.badge}</span>
          </div>
          <h1>{currentConfig.title}</h1>
          <p>{currentConfig.desc}</p>
        </div>

        {/* INLINE EXPORT CSV BUTTON */}
        <button
          onClick={() => onExportTab(activeTab)}
          className="btn-glow text-xs shrink-0 self-start md:self-center py-2.5 px-4"
        >
          <Download className="w-4 h-4" />
          <span>Export {currentConfig.title.replace(' Page', '')} CSV</span>
        </button>
      </div>

      {/* PROMINENT SUB-NAVBAR FOR PAGE OPTIONS & SUB-FILTERS */}
      <div className="sub-page-navbar">
        
        {/* SUB-NAVBAR PILL BUTTONS */}
        <div className="sub-nav-pill-group">
          <span className="text-xs font-mono text-[#64748B] flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#00F2FE]" /> Sub-Filters:
          </span>
          {currentConfig.subFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => { setActiveSubFilter(filter.id); setCurrentPage(1); }}
              className={`sub-nav-pill ${activeSubFilter === filter.id ? 'active' : ''}`}
            >
              <span>{filter.label}</span>
              <span className="font-mono text-[10px] opacity-70">({filter.count})</span>
            </button>
          ))}
        </div>

        {/* SEARCH & VIEW MODE CONTROLS INSIDE SUB-NAVBAR */}
        <div className="flex items-center gap-3">
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] z-10" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="atlas-input"
            />
          </div>

          <div className="view-toggle-container">
            <button
              onClick={() => setViewMode('grid')}
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>

      </div>

      <div className="font-mono text-xs text-[#94A3B8] px-1">
        Showing <span className="text-[#00F2FE] font-bold">{paginatedData.length}</span> of <span className="text-white font-bold">{filteredData.length.toLocaleString()}</span> entries on this dedicated page
      </div>

      {/* DEDICATED PAGE ITEM CARDS GRID (2 PER ROW) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* STARTUP DEDICATED CARDS */}
          {activeTab === 'startups' && paginatedData.map((item, idx) => (
            <div key={idx} className="glass-panel p-5 space-y-4 hover:border-[#00F2FE]/50 transition flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="badge-tag badge-cyan">STARTUP</span>
                  <span className="font-mono text-xs text-[#00F2FE] font-bold">
                    {item.content?.data?.employeeCount?.toLocaleString()} engineers
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#00F2FE] transition">
                  {item.content?.entityName}
                </h3>
                <span className="text-xs text-[#94A3B8] block mt-1">Source: {item.source?.name}</span>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => onSelectProvenance(item.id || `s-${idx+1}`)}
                  className="btn-glow text-xs py-1.5 px-3"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Trace Provenance</span>
                </button>
                <a href={item.source?.url} target="_blank" rel="noreferrer" className="text-xs text-[#38bdf8] hover:underline flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5" /> Source
                </a>
              </div>
            </div>
          ))}

          {/* PRODUCT DEDICATED CARDS */}
          {activeTab === 'products' && paginatedData.map((item, idx) => (
            <div key={idx} className="glass-panel p-5 space-y-4 hover:border-[#9D4EDD]/50 transition flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="badge-tag badge-purple">PRODUCT</span>
                  <span className={`badge-tag ${
                    item.content?.pricingModel === 'FREE' ? 'badge-emerald' :
                    item.content?.pricingModel === 'FREEMIUM' ? 'badge-cyan' :
                    item.content?.pricingModel === 'PAID' ? 'badge-purple' : 'badge-amber'
                  }`}>
                    {item.content?.pricingModel}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#9D4EDD] transition">
                  {item.content?.productName}
                </h3>
                <span className="text-xs text-[#00F2FE] font-semibold block mt-1">By {item.content?.startupName}</span>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => onSelectProvenance(item.id || `p-${idx+1}`)}
                  className="btn-glow text-xs py-1.5 px-3"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Trace Provenance</span>
                </button>
                <span className="font-mono text-[10px] text-[#64748B]">{new Date(item.collectedAt).toLocaleTimeString()}</span>
              </div>
            </div>
          ))}

          {/* RESEARCH PAPER DEDICATED CARDS */}
          {(activeTab === 'research' || activeTab === 'papers') && paginatedData.map((item, idx) => (
            <div key={idx} className="glass-panel p-5 space-y-4 hover:border-[#F59E0B]/50 transition flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="badge-tag badge-amber">RESEARCH PAPER</span>
                  {item.content?.github_stars && (
                    <span className="badge-tag badge-amber font-mono flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#F59E0B]" />
                      {item.content.github_stars.toLocaleString()}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#F59E0B] transition line-clamp-2">
                  {item.content?.title}
                </h3>
                <span className="text-xs text-[#94A3B8] block mt-1 truncate">Authors: {item.content?.authors?.join(', ')}</span>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => onSelectProvenance(item.id || `r-${idx+1}`)}
                  className="btn-glow text-xs py-1.5 px-3"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Trace Provenance</span>
                </button>
                {item.content?.github_url ? (
                  <a href={item.content.github_url} target="_blank" rel="noreferrer" className="text-xs text-[#10B981] hover:underline flex items-center gap-1 font-mono">
                    <ExternalLink className="w-3.5 h-3.5" /> GitHub
                  </a>
                ) : (
                  <a href={item.content?.paper_url} target="_blank" rel="noreferrer" className="text-xs text-[#38bdf8] hover:underline">
                    Arxiv Link
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* AI JOB DEDICATED CARDS */}
          {activeTab === 'jobs' && paginatedData.map((item, idx) => (
            <div key={idx} className="glass-panel p-5 space-y-4 hover:border-[#F72585]/50 transition flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="badge-tag badge-purple">{item.content?.role_family}</span>
                  <span className={`badge-tag ${item.content?.is_remote ? 'badge-emerald' : 'badge-amber'}`}>
                    {item.content?.is_remote ? 'Remote' : 'On-Site'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#F72585] transition">
                  {item.content?.title}
                </h3>
                <span className="text-xs text-[#00F2FE] font-bold block mt-1">@ {item.content?.company}</span>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => onSelectProvenance(item.id || `j-${idx+1}`)}
                  className="btn-glow text-xs py-1.5 px-3"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Trace Provenance</span>
                </button>
                <span className="badge-tag badge-emerald text-[10px]">24h Fresh</span>
              </div>
            </div>
          ))}

          {/* AI NEWS DEDICATED CARDS */}
          {activeTab === 'news' && paginatedData.map((item, idx) => (
            <div key={idx} className="glass-panel p-5 space-y-4 hover:border-[#10B981]/50 transition flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="badge-tag badge-emerald">{item.content?.canonical_source || item.source?.name}</span>
                  <span className="font-mono text-[10px] text-[#10B981]">{new Date(item.content?.published_date).toLocaleTimeString()}</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#10B981] transition line-clamp-2">
                  {item.content?.title}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-2 line-clamp-2">{item.content?.full_text}</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => onSelectProvenance(item.id || `n-${idx+1}`)}
                  className="btn-glow text-xs py-1.5 px-3"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Trace Signal</span>
                </button>
                <a href={item.content?.url} target="_blank" rel="noreferrer" className="text-xs text-[#38bdf8] hover:underline flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5" /> Read Article
                </a>
              </div>
            </div>
          ))}

          {/* ENTITY MAPPING DEDICATED CARDS */}
          {activeTab === 'mappings' && paginatedData.map((item, idx) => (
            <div key={idx} className="glass-panel p-5 space-y-4 hover:border-[#4FACFE]/50 transition flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="badge-tag badge-cyan">{item.matchingMethod}</span>
                  <span className="font-mono text-xs text-[#F59E0B] font-bold">{(item.confidenceScore * 100).toFixed(0)}% Score</span>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#F72585] block truncate">Raw: "{item.rawName}"</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#10B981]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Canonical: {item.canonicalName}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 font-mono text-[10px] text-[#64748B] flex justify-between">
                <span>Algorithm: {item.matchingMethod}</span>
                <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* DEDICATED PAGE TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            {activeTab === 'startups' && (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Canonical Name</th>
                    <th>Employees</th>
                    <th>Source Directory</th>
                    <th>Provenance</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="font-semibold text-white">{row.content?.entityName}</td>
                      <td className="font-mono text-[#00F2FE]">{row.content?.data?.employeeCount?.toLocaleString()} engineers</td>
                      <td className="text-[#94A3B8]">{row.source?.name}</td>
                      <td>
                        <button onClick={() => onSelectProvenance(row.id || `s-${idx+1}`)} className="text-[#10B981] hover:underline flex items-center gap-1 font-mono text-xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Trace Record
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'products' && (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Product Title</th>
                    <th>Parent Startup</th>
                    <th>Pricing Tier</th>
                    <th>Provenance</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="font-semibold text-white">{row.content?.productName}</td>
                      <td className="text-[#00F2FE]">{row.content?.startupName}</td>
                      <td><span className="badge-tag badge-purple">{row.content?.pricingModel}</span></td>
                      <td>
                        <button onClick={() => onSelectProvenance(row.id || `p-${idx+1}`)} className="text-[#10B981] hover:underline flex items-center gap-1 font-mono text-xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Trace Record
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {(activeTab === 'research' || activeTab === 'papers') && (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Paper Title</th>
                    <th>Authors</th>
                    <th>GitHub Stars</th>
                    <th>Provenance</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="font-semibold text-white">{row.content?.title}</td>
                      <td className="text-[#94A3B8]">{row.content?.authors?.join(', ')}</td>
                      <td className="font-mono text-[#F59E0B]">⭐ {row.content?.github_stars?.toLocaleString() || 'N/A'}</td>
                      <td>
                        <button onClick={() => onSelectProvenance(row.id || `r-${idx+1}`)} className="text-[#10B981] hover:underline flex items-center gap-1 font-mono text-xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Trace Record
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'jobs' && (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role Title</th>
                    <th>Role Family</th>
                    <th>Remote</th>
                    <th>Provenance</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="font-semibold text-[#00F2FE]">{row.content?.company}</td>
                      <td className="text-white">{row.content?.title}</td>
                      <td><span className="badge-tag badge-purple">{row.content?.role_family}</span></td>
                      <td><span className="badge-tag badge-emerald">{row.content?.is_remote ? 'Remote' : 'On-Site'}</span></td>
                      <td>
                        <button onClick={() => onSelectProvenance(row.id || `j-${idx+1}`)} className="text-[#10B981] hover:underline flex items-center gap-1 font-mono text-xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Trace Record
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'news' && (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Headline</th>
                    <th>Source</th>
                    <th>Published Time</th>
                    <th>Provenance</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="font-semibold text-white">{row.content?.title}</td>
                      <td className="text-[#00F2FE]">{row.content?.canonical_source || row.source?.name}</td>
                      <td className="font-mono text-xs text-[#10B981]">{new Date(row.content?.published_date).toLocaleTimeString()}</td>
                      <td>
                        <button onClick={() => onSelectProvenance(row.id || `n-${idx+1}`)} className="text-[#10B981] hover:underline flex items-center gap-1 font-mono text-xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Trace Record
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'mappings' && (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Raw String</th>
                    <th>Canonical Entity</th>
                    <th>Confidence</th>
                    <th>Algorithm</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="font-mono text-[#F72585]">{row.rawName}</td>
                      <td className="font-bold text-[#10B981]">{row.canonicalName}</td>
                      <td className="font-mono text-[#F59E0B]">{(row.confidenceScore * 100).toFixed(0)}%</td>
                      <td><span className="badge-tag badge-cyan">{row.matchingMethod}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Dedicated Page Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-white/10 bg-[#0F172A]/40 text-xs rounded-xl">
        <div className="text-[#94A3B8]">
          Page <span className="text-white font-bold">{currentPage}</span> of{' '}
          <span className="text-white font-bold">{totalPages}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
