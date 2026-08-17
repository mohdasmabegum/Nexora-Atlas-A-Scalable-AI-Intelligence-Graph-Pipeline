import React, { useState } from 'react';
import { 
  Network, 
  BookOpen, 
  Download, 
  Search,
  LayoutDashboard,
  Layers,
  Globe,
  Zap,
  BarChart3,
  ShieldAlert,
  Building2,
  Box,
  FileText,
  Briefcase,
  Newspaper,
  Link2,
  Sliders,
  Table,
  ChevronRight,
  Menu,
  X,
  Cpu,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onExportAll, onOpenCommandPalette, onOpenGoogleSheetModal, onReplaySplash }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navSections = [
    {
      title: 'PLATFORM OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
        { id: 'pipeline', label: 'Live Pipeline Visualizer', icon: Layers },
        { id: 'graph', label: 'Knowledge Graph', icon: Network }
      ]
    },
    {
      title: 'INTELLIGENCE DATA',
      items: [
        { id: 'startups', label: 'AI Startups (1,000)', icon: Building2 },
        { id: 'products', label: 'AI Products (1,000)', icon: Box },
        { id: 'research', label: 'Research Papers (1,000)', icon: FileText },
        { id: 'jobs', label: '24h Fresh Jobs (150)', icon: Briefcase },
        { id: 'news', label: '24h Fresh News (120)', icon: Newspaper },
        { id: 'mappings', label: 'Entity Mappings (60)', icon: Link2 }
      ]
    },
    {
      title: 'ENGINEERING & ENGINES',
      items: [
        { id: 'sources', label: 'Sources Registry', icon: Globe },
        { id: 'llm', label: 'LLM Orchestrator', icon: Cpu },
        { id: 'resolution', label: 'Entity Resolver', icon: Sliders },
        { id: 'freshness', label: 'Freshness SLA Engine', icon: Zap },
        { id: 'errors', label: 'Error Diagnostic Center', icon: ShieldAlert }
      ]
    },
    {
      title: 'ANALYTICS & EXPORTS',
      items: [
        { id: 'analytics', label: 'Pipeline Analytics', icon: BarChart3 },
        { id: 'architecture', label: 'Scale Architecture', icon: BookOpen },
        { id: 'exports', label: 'Export Center', icon: Download }
      ]
    }
  ];

  return (
    <>
      {/* MOBILE TOP HEADER BAR (Shown on screens < 1024px) */}
      <header className="mobile-header-bar flex lg:hidden items-center justify-between p-3.5 bg-[#07090E]/95 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00F2FE]/10 border border-[#00F2FE]/40 flex items-center justify-center shrink-0">
            <Network className="w-4 h-4 text-[#00F2FE]" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white leading-none">NEXORA ATLAS</h1>
            <span className="text-[9px] font-mono text-[#00F2FE]">INTELLIMESH v1.0</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenGoogleSheetModal} 
            className="px-2 py-1 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-mono text-[10px] font-bold flex items-center gap-1"
          >
            <Table className="w-3 h-3" />
            <span>Export Sheet</span>
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#00F2FE]" />}
          </button>
        </div>
      </header>

      {/* MOBILE SLIDE-OUT MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-lg pt-16 p-4 overflow-y-auto">
          <div className="space-y-4">
            <button onClick={() => { onOpenCommandPalette(); setIsMobileMenuOpen(false); }} className="sidebar-search-btn w-full justify-between">
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#00F2FE]" />
                <span>Search platform features...</span>
              </span>
              <kbd className="sidebar-kbd">Ctrl+K</kbd>
            </button>

            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#64748B] block px-2 uppercase">{section.title}</span>
                <div className="space-y-1">
                  {section.items.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                        className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                          isActive 
                            ? 'bg-[#00F2FE]/15 border-[#00F2FE] text-[#00F2FE]' 
                            : 'bg-white/5 border-white/5 text-[#94A3B8] hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {Icon ? <Icon className="w-4 h-4" /> : <div className="w-4 h-4" />}
                          <span>{item.label}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DESKTOP FIXED VERTICAL LEFT SIDEBAR (Shown on screens >= 1024px) */}
      <aside className="sidebar-aside">
        
        {/* Sidebar Top Brand Header */}
        <div className="sidebar-brand-box">
          <div className="w-10 h-10 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.2)] shrink-0">
            <Network className="w-5 h-5 text-[#00F2FE]" />
          </div>
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-title">
              NEXORA ATLAS
            </div>
            <span className="sidebar-brand-badge font-mono">INTELLIMESH v1.0</span>
          </div>
        </div>

        {/* Quick Command Palette Search Button */}
        <div className="sidebar-search-wrapper">
          <button onClick={onOpenCommandPalette} className="sidebar-search-btn">
            <Search className="w-4 h-4 text-[#00F2FE]" />
            <span>Quick Search...</span>
            <kbd className="sidebar-kbd font-mono">Ctrl+K</kbd>
          </button>
        </div>

        {/* Nav Sections List */}
        <div className="sidebar-nav-scroll">
          {navSections.map((section, idx) => (
            <div key={idx} className="sidebar-section">
              <span className="sidebar-section-title font-mono">{section.title}</span>
              <div className="sidebar-item-list">
                {section.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id || (item.id === 'startups' && activeTab === 'data');
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                    >
                      {Icon ? <Icon className="sidebar-item-icon" /> : <div className="sidebar-item-icon" />}
                      <span className="sidebar-item-label">{item.label}</span>
                      <ChevronRight className="sidebar-item-arrow" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer Action */}
        <div className="sidebar-footer space-y-2">
          <button onClick={onOpenGoogleSheetModal} className="btn-glow sidebar-export-btn">
            <Table className="w-4 h-4 text-[#10B981]" />
            <span>Export 1 Google Sheet</span>
          </button>
          
          {onReplaySplash && (
            <button onClick={onReplaySplash} className="btn-secondary w-full justify-center text-xs py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
              <span>Replay Intro</span>
            </button>
          )}
        </div>

      </aside>
    </>
  );
}
