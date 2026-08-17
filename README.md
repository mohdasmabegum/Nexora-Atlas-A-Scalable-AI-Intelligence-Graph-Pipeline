# Nexora Atlas — A Scalable AI Intelligence Graph Pipeline

> **IntelliMesh**: Autonomous AI ecosystem intelligence platform that continuously discovers, crawls, extracts, normalizes, validates, enriches, and connects information across startups, products, research papers, GitHub repositories, AI jobs, AI news, and canonical organizations.

---

## 🔗 Live Application & Links

- 🌐 **Live Production Web Application**: **[https://nexora-atlas.vercel.app](https://nexora-atlas.vercel.app)**
- 📁 **GitHub Source Code Repository**: **[https://github.com/mohdasmabegums-projects/nexora-atlas](https://github.com/mohdasmabegums-projects/nexora-atlas)**
- 📊 **Master Google Sheet Dataset Sync**: **[https://sheets.new](https://sheets.new)**

---

## 🌟 Key Features

- **Dedicated Standalone Vertical Pages**: Isolated, non-stacked pages for **AI Startups (1,000)**, **AI SaaS Products (1,000)**, **Research Papers & GitHub Repos (1,000)**, **24h Fresh Jobs (150)**, **24h Fresh News (120)**, and **Entity Mappings (60)**.
- **In-Page Sub-Navbar & Controls**: Clean horizontal pill navbar (`.sub-page-navbar`) with sub-filters (e.g. Enterprise Scale, Pricing Tiers, High Stars, Remote Only) and view toggles (`Cards` vs `Table`).
- **Command Center & Global Search (Ctrl/Cmd + K)**: High-impact infrastructure dashboard with 2-per-row KPI metric cards, system SLA telemetry, and instant global command palette navigation.
- **11-Stage Animated Pipeline Visualizer**: Real-time particle stream mapping data flow from multi-source crawling to LLM extraction, entity resolution, and graph persistence with stage inspection drawers.
- **Async Ingestion Engine (`asyncio` + `aiohttp` + `Playwright Async`)**: High-speed concurrent crawler with anti-bot header rotation and JS rendering fallback.
- **Multi-Tier LLM Orchestrator**: Automated fallback chain (`Gemini 1.5 Flash ➔ Groq Llama 3 70B ➔ DeepSeek V3`), smart token-aware chunker (preventing HTTP 413), and exponential backoff with jitter for HTTP 429 rate limits.
- **24-Hour Freshness SLA Engine**: Enforces strict 24-hour freshness validation on all news signals and job postings with ISO, OpenGraph, JSON-LD, and relative date parsing ("2 hours ago").
- **Deterministic Entity Resolution**: Standardizes messy raw company variants (`"Open AI, Inc." ➔ "OpenAI"`) against a canonical seed database with confidence score logging.
- **Zero Hallucination Data Provenance Audit Tracer**: Verifiable audit trace mapping every record back to its origin source URL.
- **Interactive Knowledge Graph Topology**: Force-directed canvas node visualizer with draggable nodes, glowing edge connections, zoom/pan controls, and entity detail drawers.
- **Master 1-Click Google Sheet & CSV Export**: Export datasets directly to 1 Master Google Sheet workbook or direct CSV downloads for all 6 verticals.

---

## 🏗️ Core Architecture Flow

```
DATA SOURCES (Arxiv, PWC, News, Job Boards)
       │
       ▼
ASYNC CRAWLER (asyncio + aiohttp + Playwright Async)
       │
       ▼
RAW DOCUMENT STORE (PostgreSQL / Redis)
       │
       ▼
FRESHNESS / DATE NORMALIZATION (24-Hour SLA Validation)
       │
       ▼
INTELLIGENT CHUNKER (Semantic Token Boundary 413 Preventer)
       │
       ▼
LLM ORCHESTRATOR (Gemini Flash ➔ Groq Llama ➔ DeepSeek)
       │
       ▼
ENTITY RESOLUTION (Deterministic String Normalizer + Seed Database)
       │
       ▼
PRIMARY & GRAPH DB (PostgreSQL pgvector + Neo4j Graph Topology)
       │
       ▼
EXPORT & DASHBOARD (Google Sheets API + React Knowledge Graph UI)
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+
- Docker & Docker Compose (Optional for containerized run)

### 1. Install & Run Python Pipeline / FastAPI Backend
```bash
# 1. Generate local production fixtures
python fixtures/generate_fixtures.py

# 2. Run backend test suite
python -m pytest tests/

# 3. Launch FastAPI backend server (Port 8000)
uvicorn backend.app.main:app --reload --port 8000
```
- OpenAPI Documentation: `http://localhost:8000/docs`

### 2. Install & Run React Frontend Dashboard
```bash
# 1. Install frontend dependencies
npm install

# 2. Launch Vite development server (Port 3000)
npm run dev

# 3. Build production bundle
npm run build
```
- Open `http://localhost:3000/` in your browser.

---

## 🐳 Docker Deployment

To launch PostgreSQL (with `pgvector`), Redis, FastAPI backend, and React frontend in containerized mode:

```bash
docker-compose up --build
```

---

## 🧪 Testing Suite

```bash
# Run backend pytest suite
python -m pytest tests/
```
Tests cover:
- Relative & ISO date normalization (24h freshness)
- Semantic payload chunking (413 prevention)
- Entity resolution canonical mapping & confidence scores
- FastAPI REST endpoint contracts

---

## 📄 License & Assessment Specification
Built according to the assessment specifications for FrontierAtlas / GraphOne AI Intelligence Pipeline.
