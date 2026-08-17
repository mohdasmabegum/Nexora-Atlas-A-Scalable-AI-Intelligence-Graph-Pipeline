import React, { useState } from 'react';
import { 
  Table, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  X, 
  Download, 
  Database,
  Building2,
  Box,
  FileText,
  Briefcase,
  Newspaper,
  Link2,
  Sparkles
} from 'lucide-react';

export default function GoogleSheetModal({ isOpen, onClose, onDownloadAllCsv }) {
  const [copied, setCopied] = useState(false);
  const [activeTabPreview, setActiveTabPreview] = useState('startups');

  // Real working Google Sheets template creation URL
  const googleSheetsCreateUrl = "https://sheets.new";
  const publicDatasetDocUrl = "https://nexora-atlas.vercel.app";

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicDatasetDocUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabsList = [
    { id: 'startups', name: '1. Startups Tab', count: '1,000 Rows', icon: Building2, color: '#00F2FE' },
    { id: 'products', name: '2. Products Tab', count: '1,000 Rows', icon: Box, color: '#9D4EDD' },
    { id: 'papers', name: '3. Research Papers Tab', count: '1,000 Rows', icon: FileText, color: '#F59E0B' },
    { id: 'jobs', name: '4. 24h Fresh Jobs Tab', count: '150 Rows', icon: Briefcase, color: '#F72585' },
    { id: 'news', name: '5. 24h Fresh News Tab', count: '120 Rows', icon: Newspaper, color: '#10B981' },
    { id: 'mappings', name: '6. Entity Mapping Log Tab', count: '60 Rows', icon: Link2, color: '#4FACFE' }
  ];

  return (
    <div className="prov-modal-backdrop" onClick={onClose}>
      <div className="prov-modal-box max-w-2xl animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#080C14]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Google Sheets Master Dataset Export</h3>
                <span className="badge-tag badge-emerald text-[10px]">6 TABS SYNCED</span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">3,330 Ingested Records Ready for Google Sheets & Submission</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          
          {/* Main Action Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#10B981]/10 via-[#00F2FE]/10 to-[#9D4EDD]/10 border border-[#10B981]/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#10B981] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                All 6 Dataset Tabs Ready for Export
              </span>
              <span className="text-[11px] font-mono text-[#94A3B8]">Form Submission Ready</span>
            </div>

            {/* Direct Open Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => { onDownloadAllCsv(); }}
                className="btn-glow text-xs py-2 px-4 flex-1 justify-center"
              >
                <Download className="w-4 h-4 text-[#00F2FE]" />
                <span>Download All 6 CSV Tabs</span>
              </button>

              <a
                href={googleSheetsCreateUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs py-2 px-4 flex-1 justify-center"
              >
                <Table className="w-4 h-4 text-[#10B981]" />
                <span>Open Google Sheets</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Copyable Form Submission URL */}
            <div className="flex items-center gap-2 bg-[#05070B] border border-white/10 rounded-xl p-2 mt-2">
              <span className="text-[11px] font-mono text-[#64748B] shrink-0 px-1">Form URL:</span>
              <input
                type="text"
                readOnly
                value={publicDatasetDocUrl}
                className="flex-1 bg-transparent text-xs text-[#00F2FE] font-mono focus:outline-none px-1"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white flex items-center gap-1 transition font-semibold"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* 6 Synced Tabs Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider font-mono flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#00F2FE]" />
              6 Workbook Deliverable Tabs:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tabsList.map((tab) => {
                const Icon = tab.icon;
                return (
                  <div key={tab.id} className="p-3.5 rounded-xl bg-[#080C14] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" style={{ color: tab.color }} />
                      <div>
                        <span className="text-xs font-bold text-white block">{tab.name}</span>
                        <span className="font-mono text-[10px] text-[#94A3B8]">{tab.count}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => { onDownloadAllCsv(); }}
                      className="text-xs text-[#00F2FE] hover:underline font-mono"
                    >
                      Export CSV
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
