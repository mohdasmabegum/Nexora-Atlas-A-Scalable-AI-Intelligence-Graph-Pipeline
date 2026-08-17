import React, { useEffect, useState } from 'react';
import { 
  Search, 
  LayoutDashboard, 
  Layers, 
  Building2, 
  Box, 
  FileText, 
  Briefcase, 
  Newspaper, 
  Network, 
  Cpu, 
  Zap, 
  Sliders, 
  Terminal, 
  BarChart3, 
  BookOpen, 
  Download
} from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, onSelectNav }) {
  const [query, setQuery] = useState('');

  const commands = [
    { id: 'dashboard', label: 'Command Center (Overview)', icon: LayoutDashboard, category: 'Main' },
    { id: 'pipeline', label: 'Live Pipeline Visualizer', icon: Layers, category: 'Main' },
    { id: 'sources', label: 'Sources Management', icon: Zap, category: 'Management' },
    { id: 'startups', label: 'Startups Explorer (1,000)', icon: Building2, category: 'Data' },
    { id: 'products', label: 'Products Explorer (1,000)', icon: Box, category: 'Data' },
    { id: 'research', label: 'Research Papers Explorer (1,000)', icon: FileText, category: 'Data' },
    { id: 'jobs', label: '24h Fresh Jobs Explorer (150)', icon: Briefcase, category: 'Data' },
    { id: 'news', label: '24h Fresh News Explorer (120)', icon: Newspaper, category: 'Data' },
    { id: 'graph', label: 'Intelligence Knowledge Graph', icon: Network, category: 'Topology' },
    { id: 'llm', label: 'LLM Orchestrator & Chunker', icon: Cpu, category: 'Pipeline' },
    { id: 'freshness', label: 'Freshness Engine (24h Window)', icon: Zap, category: 'Pipeline' },
    { id: 'resolution', label: 'Entity Resolution Sandbox', icon: Sliders, category: 'Pipeline' },
    { id: 'logs', label: 'Real-Time Audit Logs', icon: Terminal, category: 'Monitoring' },
    { id: 'analytics', label: 'Analytics & Recharts Metrics', icon: BarChart3, category: 'Monitoring' },
    { id: 'architecture', label: 'Scale Architecture (500k+)', icon: BookOpen, category: 'Docs' },
    { id: 'exports', label: 'Export Center (Google Sheets/CSV)', icon: Download, category: 'Exports' }
  ];

  // Global key listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = commands.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="cmd-palette-backdrop animate-fadeIn" onClick={onClose}>
      <div className="cmd-palette-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Search Input Box */}
        <div className="cmd-search-row">
          <Search className="w-5 h-5 text-[#00F2FE] shrink-0" />
          <input
            type="text"
            placeholder="Search all platform sections or commands (Ctrl+K)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="cmd-search-input"
          />
          <button onClick={onClose} className="cmd-esc-tag font-mono">
            ESC
          </button>
        </div>

        {/* Command List */}
        <div className="cmd-list-scroll">
          {filtered.length === 0 ? (
            <div className="cmd-empty-text font-mono">No matching commands found.</div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    onSelectNav(cmd.id);
                    onClose();
                  }}
                  className="cmd-item-btn group"
                >
                  <div className="cmd-item-left">
                    <Icon className="cmd-item-icon" />
                    <span className="cmd-item-label">{cmd.label}</span>
                  </div>
                  <span className="cmd-item-category font-mono">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="cmd-footer font-mono">
          <span>Shortcuts</span>
          <span>Click command or press ESC to dismiss</span>
        </div>

      </div>
    </div>
  );
}
