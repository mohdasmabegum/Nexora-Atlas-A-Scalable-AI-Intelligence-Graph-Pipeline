import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Sidebar from './components/Sidebar';
import CommandCenter from './components/CommandCenter';
import PipelineVisualizer from './components/PipelineVisualizer';
import CommandPalette from './components/CommandPalette';
import SourcesRegistry from './components/SourcesRegistry';
import GraphVisualizer from './components/GraphVisualizer';
import DataHub from './components/DataHub';
import PipelineWorkbench from './components/PipelineWorkbench';
import FreshnessDashboard from './components/FreshnessDashboard';
import ErrorCenter from './components/ErrorCenter';
import AnalyticsCenter from './components/AnalyticsCenter';
import ArchitectureDocs from './components/ArchitectureDocs';
import ExportCenter from './components/ExportCenter';
import ProvenanceModal from './components/ProvenanceModal';
import GoogleSheetModal from './components/GoogleSheetModal';

// Import local pipeline dataset JSON fixtures
import startupsData from '../fixtures/startups.json';
import productsData from '../fixtures/products.json';
import papersData from '../fixtures/research_papers.json';
import jobsData from '../fixtures/jobs.json';
import newsData from '../fixtures/news.json';
import entityMappingsData from '../fixtures/entity_mappings.json';

export default function App() {
  // Safe sessionStorage check for initial splash view
  const [showSplash, setShowSplash] = useState(() => {
    try {
      return !sessionStorage.getItem('nexora_splash_dismissed');
    } catch (e) {
      return false;
    }
  });

  const [activeNav, setActiveNav] = useState('dashboard');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [provenanceRecordId, setProvenanceRecordId] = useState(null);
  const [isGoogleSheetModalOpen, setIsGoogleSheetModalOpen] = useState(false);

  const handleDismissSplash = () => {
    try {
      sessionStorage.setItem('nexora_splash_dismissed', 'true');
    } catch (e) {}
    setShowSplash(false);
  };

  const handleReplaySplash = () => {
    setShowSplash(true);
  };

  // Helper to trigger CSV export download
  const handleExportTab = (tabName) => {
    try {
      let dataToExport = [];
      let headers = [];
      let filename = `nexora_atlas_${tabName}.csv`;

      if (tabName === 'startups' || tabName === 'all' || tabName === 'data') {
        headers = ['id', 'schemaVersion', 'recordType', 'source.name', 'source.url', 'content.entityName', 'content.data.employeeCount', 'collectedAt'];
        dataToExport = (startupsData || []).map(s => [s.id, s.schemaVersion, s.recordType, s.source?.name, s.source?.url, s.content?.entityName, s.content?.data?.employeeCount, s.collectedAt]);
      } else if (tabName === 'products') {
        headers = ['id', 'schemaVersion', 'recordType', 'source.name', 'source.url', 'content.productName', 'content.startupName', 'content.pricingModel', 'collectedAt'];
        dataToExport = (productsData || []).map(p => [p.id, p.schemaVersion, p.recordType, p.source?.name, p.source?.url, p.content?.productName, p.content?.startupName, p.content?.pricingModel, p.collectedAt]);
      } else if (tabName === 'research' || tabName === 'papers') {
        headers = ['id', 'schemaVersion', 'recordType', 'content.title', 'content.authors', 'content.paper_url', 'content.github_url', 'content.github_stars', 'content.published_date', 'collectedAt'];
        dataToExport = (papersData || []).map(p => [p.id, p.schemaVersion, p.recordType, `"${(p.content?.title || '').replace(/"/g, '""')}"`, `"${(p.content?.authors || []).join('; ')}"`, p.content?.paper_url, p.content?.github_url || '', p.content?.github_stars || 0, p.content?.published_date, p.collectedAt]);
      } else if (tabName === 'jobs') {
        headers = ['id', 'schemaVersion', 'recordType', 'content.company', 'content.title', 'content.date', 'content.is_remote', 'content.role_family', 'collectedAt'];
        dataToExport = (jobsData || []).map(j => [j.id, j.schemaVersion, j.recordType, j.content?.company, `"${j.content?.title}"`, j.content?.date, j.content?.is_remote, j.content?.role_family, j.collectedAt]);
      } else if (tabName === 'news') {
        headers = ['id', 'schemaVersion', 'recordType', 'content.title', 'content.canonical_source', 'content.published_date', 'content.url', 'collectedAt'];
        dataToExport = (newsData || []).map(n => [n.id, n.schemaVersion, n.recordType, `"${(n.content?.title || '').replace(/"/g, '""')}"`, n.content?.canonical_source, n.content?.published_date, n.content?.url, n.collectedAt]);
      } else if (tabName === 'mappings') {
        headers = ['id', 'rawName', 'canonicalName', 'confidenceScore', 'matchingMethod', 'timestamp'];
        dataToExport = (entityMappingsData || []).map(m => [m.id, `"${m.rawName}"`, m.canonicalName, m.confidenceScore, m.matchingMethod, m.timestamp]);
      }

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...dataToExport.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export CSV Error:", err);
    }
  };

  // 100% ISOLATED SPLASH SCREEN MODE (No dashboard elements rendered behind it)
  if (showSplash) {
    return <SplashScreen onEnter={handleDismissSplash} />;
  }

  // 100% ISOLATED MAIN APP MODE
  return (
    <div className="app-container">
      
      {/* Fixed Vertical Left Sidebar */}
      <Sidebar 
        activeTab={activeNav}
        setActiveTab={setActiveNav}
        onExportAll={() => handleExportTab('all')}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenGoogleSheetModal={() => setIsGoogleSheetModalOpen(true)}
        onReplaySplash={handleReplaySplash}
      />

      {/* Demo Mode Banner (Offset for Sidebar) */}
      <div className="demo-banner-bar">
        <div className="flex items-center gap-2">
          <span className="demo-status-dot" />
          <span className="demo-title">DEMO MODE ACTIVE</span>
          <span className="demo-text">• Autonomous Ingestion Pipeline (3,330 Records Synced)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReplaySplash}
            className="sub-nav-pill text-[11px] py-1 px-2.5"
          >
            ✨ Replay Splash Intro
          </button>
          <button 
            onClick={() => setIsGoogleSheetModalOpen(true)}
            className="banner-sheet-btn"
          >
            📊 Export to 1 Google Sheet
          </button>
          <span className="demo-cmd-tag font-mono">Ctrl+K for Quick Search</span>
        </div>
      </div>

      {/* Main View Port (Offset for Sidebar) */}
      <main className="main-content-wrapper">
        
        {activeNav === 'dashboard' && (
          <CommandCenter 
            onSelectNav={setActiveNav}
            onSelectProvenance={(id) => setProvenanceRecordId(id)}
          />
        )}

        {activeNav === 'pipeline' && (
          <PipelineVisualizer />
        )}

        {activeNav === 'sources' && (
          <SourcesRegistry />
        )}

        {activeNav === 'graph' && (
          <GraphVisualizer 
            startups={startupsData || []}
            products={productsData || []}
            papers={papersData || []}
            jobs={jobsData || []}
          />
        )}

        {(activeNav === 'startups' || activeNav === 'products' || activeNav === 'research' || activeNav === 'jobs' || activeNav === 'news' || activeNav === 'mappings' || activeNav === 'data') && (
          <DataHub 
            activeTab={activeNav === 'data' ? 'startups' : activeNav}
            startups={startupsData || []}
            products={productsData || []}
            papers={papersData || []}
            jobs={jobsData || []}
            news={newsData || []}
            entityMappings={entityMappingsData || []}
            onExportTab={handleExportTab}
            onSelectProvenance={(id) => setProvenanceRecordId(id)}
          />
        )}

        {(activeNav === 'llm' || activeNav === 'resolution' || activeNav === 'workbench') && (
          <PipelineWorkbench />
        )}

        {activeNav === 'freshness' && (
          <FreshnessDashboard jobs={jobsData || []} news={newsData || []} />
        )}

        {(activeNav === 'errors' || activeNav === 'logs') && (
          <ErrorCenter />
        )}

        {activeNav === 'analytics' && (
          <AnalyticsCenter />
        )}

        {activeNav === 'architecture' && (
          <ArchitectureDocs />
        )}

        {activeNav === 'exports' && (
          <ExportCenter 
            onExportTab={handleExportTab} 
            onOpenGoogleSheetModal={() => setIsGoogleSheetModalOpen(true)}
          />
        )}

      </main>

      {/* Global Command Palette Modal */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectNav={setActiveNav}
      />

      {/* Data Provenance Modal */}
      <ProvenanceModal
        recordId={provenanceRecordId}
        isOpen={!!provenanceRecordId}
        onClose={() => setProvenanceRecordId(null)}
      />

      {/* Master Google Sheet Export Modal */}
      <GoogleSheetModal
        isOpen={isGoogleSheetModalOpen}
        onClose={() => setIsGoogleSheetModalOpen(false)}
        onDownloadAllCsv={() => handleExportTab('all')}
      />

    </div>
  );
}
