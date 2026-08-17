import React from 'react';
import { 
  Network, 
  Database, 
  Cpu, 
  BookOpen, 
  Download, 
  Search,
  LayoutDashboard,
  Layers,
  Globe,
  Zap,
  BarChart3,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onExportAll, onOpenCommandPalette }) {
  const primaryTabs = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Pipeline Visualizer', icon: Layers },
    { id: 'sources', label: 'Sources Registry', icon: Globe },
    { id: 'graph', label: 'Knowledge Graph', icon: Network },
    { id: 'startups', label: 'Data Hub', icon: Database },
    { id: 'llm', label: 'LLM & Resolver', icon: Cpu },
    { id: 'freshness', label: 'Freshness', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'architecture', label: 'Architecture', icon: BookOpen },
    { id: 'exports', label: 'Exports', icon: Download }
  ];

  return (
    <header className="nav-header-sticky">
      <div className="nav-header-container">
        
        {/* Brand Group */}
        <div className="nav-brand-group">
          <div className="nav-logo-box">
            <img src="/logo.jpg" alt="Logo" className="nav-logo-img" />
          </div>
          
          <div className="nav-brand-titles">
            <div className="nav-brand-name font-bold">
              NEXORA ATLAS
              <span className="nav-cyan-badge">INTELLIMESH</span>
            </div>
            <span className="nav-brand-sub">Autonomous AI Intelligence Graph Pipeline</span>
          </div>
        </div>

        {/* Tab Navigation List */}
        <nav className="nav-tab-list">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id || (tab.id === 'startups' && ['products', 'research', 'jobs', 'news', 'data'].includes(activeTab));
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
              >
                <Icon className="nav-tab-icon" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions Group (Search + Export) */}
        <div className="nav-actions-group">
          <button
            onClick={onOpenCommandPalette}
            className="nav-search-btn"
            title="Search Platform (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span>Search...</span>
            <kbd className="nav-kbd font-mono">Ctrl+K</kbd>
          </button>

          <button
            onClick={onExportAll}
            className="btn-glow nav-export-btn"
            title="Download CSV Data"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

      </div>
    </header>
  );
}
