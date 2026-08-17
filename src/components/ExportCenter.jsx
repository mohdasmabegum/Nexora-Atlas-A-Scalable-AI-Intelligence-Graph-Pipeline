import React, { useState } from 'react';
import { 
  Download, 
  Table, 
  FileJson, 
  CheckCircle2, 
  RefreshCw,
  ExternalLink,
  Copy,
  Sparkles
} from 'lucide-react';

export default function ExportCenter({ onExportTab, onOpenGoogleSheetModal }) {
  const [googleSheetStatus, setGoogleSheetStatus] = useState(null);

  const tabsToExport = [
    { id: 'startups', label: 'Startups Tab', rows: 1000, desc: 'Canonical startups with employee counts & URLs' },
    { id: 'products', label: 'Products Tab', rows: 1000, desc: 'AI products linked to startups with pricing tiers' },
    { id: 'papers', label: 'Research Papers Tab', rows: 1000, desc: 'Arxiv & PapersWithCode with GitHub star counts' },
    { id: 'jobs', label: '24h Fresh Jobs Tab', rows: 150, desc: 'Validated jobs within strict 24-hr window' },
    { id: 'news', label: '24h Fresh News Tab', rows: 120, desc: 'Validated news signals with source provenance' },
    { id: 'mappings', label: 'Entity Mapping Log Tab', rows: 60, desc: 'Raw vs Canonical name resolution audit log' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HERO FEATURE BANNER */}
      <div className="hero-feature-banner flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] mb-1">
            <Download className="w-4 h-4" />
            <span>ALL-IN-ONE DATASET EXPORT</span>
          </div>
          <h1>Export Center & Master Google Sheet Sync</h1>
          <p>Export all 6 pipeline dataset tabs directly into 1 Master Google Sheet workbook, structured CSVs, or canonical JSON.</p>
        </div>

        <button
          onClick={onOpenGoogleSheetModal}
          className="btn-glow text-xs shrink-0 self-start md:self-center py-2.5 px-4"
        >
          <Table className="w-4 h-4 text-[#10B981]" />
          <span>Export All Data to 1 Google Sheet</span>
        </button>
      </div>

      {/* PROMINENT MASTER GOOGLE SHEET PANEL */}
      <div className="glass-panel p-6 border-l-4 border-l-[#10B981] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="badge-tag badge-emerald text-xs mb-2">1 WORKBOOK • 6 SYNCED TABS</span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Table className="w-5 h-5 text-[#10B981]" />
              Master Google Sheet Output (Form Submission Link)
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1">
              Combines Startups (1,000), Products (1,000), Papers (1,000), Jobs (150), News (120), and Entity Mappings (60) into 1 Google Sheet.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenGoogleSheetModal}
              className="btn-glow text-xs py-2.5 px-4"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open & Copy Sheet Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2 PER ROW TABS GRID FOR INDIVIDUAL FILES */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-mono">
          Individual Dataset Tab Downloads:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tabsToExport.map(tab => (
            <div key={tab.id} className="glass-panel p-5 space-y-4 flex flex-col justify-between hover:border-[#00F2FE]/40 transition group">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#00F2FE] transition">{tab.label}</h3>
                  <span className="badge-tag badge-cyan font-mono">{tab.rows.toLocaleString()} rows</span>
                </div>
                <p className="text-xs text-[#94A3B8]">{tab.desc}</p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                <button
                  onClick={() => onExportTab(tab.id)}
                  className="btn-secondary flex-1 justify-center text-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#00F2FE]" />
                  <span>Download CSV</span>
                </button>
                <button
                  onClick={() => onExportTab(tab.id)}
                  className="btn-secondary flex-1 justify-center text-xs"
                >
                  <FileJson className="w-3.5 h-3.5 text-[#9D4EDD]" />
                  <span>Download JSON</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
