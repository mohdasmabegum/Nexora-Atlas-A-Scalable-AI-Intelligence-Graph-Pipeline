# Technical Architecture & Production Scale Design Document
## Nexora Atlas / IntelliMesh — Scalable AI Intelligence Graph Platform

---

### Executive Summary

Nexora Atlas (IntelliMesh) is an enterprise-grade AI Intelligence Graph Platform engineered to continuously discover, crawl, extract, normalize, validate, enrich, and connect multi-dimensional ecosystem intelligence across startups, products, research papers, GitHub repositories, AI jobs, AI news, and canonical entities.

This document details the production engineering design required to scale the pipeline from thousands to **500,000+ records** without architectural bottlenecks.

---

### 1. Scale Strategy for 500,000+ Records

To acquire 500,000+ records autonomously without code modification:

- **Horizontal Worker Clustering**: Crawler workers operate as stateless Kubernetes pods consuming domain partitions from Redis / RabbitMQ queues.
- **Backpressure Scheduling**: Token-bucket scheduling prevents overwhelming target domains and avoids HTTP 429 rate limits.
- **Batch Pipeline Persistence**: Database writes are batched in 500-record chunks using PostgreSQL `COPY` commands and bulk upserts, achieving >15,000 inserts/sec.

---

### 2. Context Window & HTTP 413 Payload Too Large Handling

- **Semantic HTML Cleaning**: HTML boilerplates (navigation, footers, inline CSS/JS) are stripped via Readability algorithms before tokenizing.
- **Token-Aware Chunker**: Payloads exceeding 16,000 bytes are dynamically segmented along paragraph boundaries with a 10% semantic overlap.
- **Extraction Merging**: LLM outputs from individual chunks are merged via a deterministic reducer that removes duplicate extracted schema fields.

---

### 3. HTTP 429 Rate Limit Handling & Multi-Tier Fallback Chain

- **Tier 1 (Primary)**: `Gemini 1.5 Flash` (128k context, ultra-low latency).
- **Tier 2 (First Fallback)**: `Groq Llama 3 70B` (Hardware LPUs, high throughput).
- **Tier 3 (Second Fallback)**: `DeepSeek V3` (Deep reasoning fallback).
- **Exponential Backoff with Jitter**: When a provider returns HTTP 429 or 5xx, the orchestrator backs off using `t = 2^attempt + rand(0, 1.0)`.

---

### 4. 24-Hour Freshness Engine & Date Normalization

- **Strict SLA**: All job postings and news signals must be guaranteed to have been published within the last 24 hours.
- **Parser Pipeline**:
  1. ISO-8601 UTC timestamp extraction.
  2. OpenGraph `article:published_time` & JSON-LD schema parsing.
  3. Relative string regex normalization ("2 hours ago", "45 mins ago", "yesterday").
  4. Heuristic date validation against HTTP `Last-Modified` headers.
- **Rejection Policy**: Records older than 24 hours are immediately logged to `freshness_checks` and discarded.

---

### 5. Distributed Duplicate Prevention & Content Fingerprinting

- **Redis Scaled Bloom Filters**: O(1) membership check prevents duplicate URL crawling across worker nodes.
- **Deterministic Fingerprinting**: Content hashes are computed using `SHA256(canonical_url + normalized_headline)`.

---

### 6. Primary & Graph Storage Strategy

- **Relational DB (PostgreSQL + pgvector)**: Stores structured entity records, audit logs, and HNSW vector embeddings for semantic search.
- **Graph Storage (Neo4j / Memgraph)**: Stores graph relationships (`(STARTUP)-[:CREATED]->(PRODUCT)`, `(RESEARCH_PAPER)-[:IMPLEMENTED_IN]->(GITHUB_REPO)`).

---

### 7. Async Crawler Architecture

- **`asyncio` + `aiohttp`**: Primary high-concurrency fetcher capable of >5,000 concurrent HTTP GET requests.
- **`Playwright Async`**: Reserved strictly for Cloudflare / Datadome protected sites or SPA JavaScript rendering.

---

### 8. Deterministic Entity Resolution Strategy

- **Normalizer**: Strips corporate suffixes (`Inc.`, `LLC`, `PBC`, `GmbH`), punctuation, and whitespace.
- **Seed Lookup**: Maps variations against 50+ pre-seeded canonical AI entities (`"Open AI, Inc." ➔ "OpenAI"`).
- **Fuzzy Token Matching**: Computes string similarity distance with a 0.85 confidence threshold.

---

### 9. Zero Hallucination & Data Provenance Audit Trail

- **Provenential Mapping**: Every record maintains a 9-stage audit trace mapping from source URL -> raw HTML -> extracted text -> LLM output -> canonical entity.
- **Verified Nulls**: If a field is missing from source text, it is set to `null` rather than inferred by the LLM.
