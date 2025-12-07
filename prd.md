# MVP Scope Document: Multi-Agent AI System Builder

**Product Name:** AgentForge (Working Title)
**Document Type:** MVP Scope Definition
**Version:** 1.0 | December 2025
**Business Model:** Standalone SaaS Product

---

## 1. Executive Summary

AgentForge is a browser-based platform for designing, configuring, and deploying autonomous multi-agent AI systems with real code execution capabilities.

The core differentiator: unlike conventional AI workflows that rely on probabilistic text generation, AgentForge introduces deterministic computation. Agents can execute Python code, validate outputs through live APIs, and iterate autonomously until producing production-grade results.

The MVP establishes three foundational capabilities:

- A visual drag-and-drop pipeline builder
- Native code execution through Google ADK
- 2-3 prebuilt templates demonstrating real-world applications

Target users include developers building custom AI automation, analysts requiring validated computations rather than generative guesses, and enterprises designing domain-specific autonomous agents.

---

## 2. Problem Statement

### Current Market Gaps

Most AI workflow tools produce probabilistic outputs without verification mechanisms. Code execution is typically bolted on as an afterthought rather than treated as a first-class capability. Multi-agent orchestration still requires significant custom development, and no unified platform combines visual design, execution, validation, and deployment in a single experience.

### Target Solution

A unified web application where users visually construct agent pipelines that execute real code, call live APIs, auto-debug failures, and produce verifiable outputs—all deployable to production infrastructure with minimal configuration.

---

## 3. MVP Scope Definition

### 3.1 In-Scope Features

**Pipeline Builder (P0 - Critical)**

- Drag-and-drop visual canvas for agent arrangement
- Directional flow links connecting agents
- Agent configuration panels (role, inputs, outputs)
- Sequential and parallel execution paths (P1)

**Code Execution (P0 - Critical)**

- Python sandbox via Google ADK native environment
- Autonomous run-debug-iterate cycle
- Error capture and auto-correction (up to 3 retries)

**API Integrations**

- Google Maps Places API connector (P0)
- Web search provider integration (P0)
- Custom API configuration for user-supplied endpoints (P1)

**Templates**

- Retail Location Analysis — 7-agent workflow (P0)
- Competitive Intelligence Analyzer (P1)
- Financial Data Processor (P1)

**Deployment**

- Cloud Run export and deployment (P0)
- Pipeline JSON export/import (P1)

### 3.2 Out-of-Scope (Post-MVP)

- Vertex AI Agent Engine deployment (deferred)
- AG-UI / CopilotKit generative UI rendering (requires evaluation)
- Team collaboration features (shared workspaces, permissions)
- Version control for pipelines
- Custom agent marketplace
- Advanced analytics and monitoring dashboard
- Mobile application
- White-label or self-hosted enterprise version

---

## 4. Core User Flows

### Flow 1: Create Pipeline from Template

User lands on dashboard and clicks "New Pipeline." Template gallery displays available starter workflows. User selects "Retail Location Analysis" template. Visual canvas loads with 7 pre-configured agents. User reviews and optionally modifies agent configurations, then saves the pipeline with a custom name.

### Flow 2: Build Custom Pipeline

User creates a blank pipeline from dashboard. Agent library panel displays available agent types. User drags agents onto canvas (Input Parser, Web Search, Code Executor, etc.) and connects them by drawing links between output/input ports. User clicks each agent to configure role, prompts, and parameters, then saves and validates the pipeline structure.

### Flow 3: Execute Pipeline

User opens a saved pipeline and enters input (e.g., "I want to open a coffee shop in Sunnyvale Downtown"). User clicks "Run Pipeline." Real-time execution view shows agent progress with status indicators. Code execution agent displays run-debug-iterate cycles. Final outputs render in results panel (HTML presentation, data visualizations). User downloads or shares outputs.

### Flow 4: Deploy Pipeline

User opens a validated pipeline and clicks "Deploy," selecting Cloud Run. System generates deployment configuration. User configures environment variables and API keys. System deploys and returns endpoint URL. User receives API documentation for integration.

---

## 5. Technical Architecture

### 5.1 Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14+ (App Router), React, TypeScript |
| Visual Canvas | React Flow (drag-and-drop pipeline builder) |
| Styling | Tailwind CSS, shadcn/ui components |
| Backend | Next.js API Routes / Python FastAPI (ADK integration) |
| Agent Orchestration | Google ADK (Agent Development Kit) |
| Code Execution | Google ADK native Python sandbox |
| Database | Supabase (PostgreSQL + Auth + Realtime) |
| Deployment Target | Google Cloud Run (MVP), Vercel (frontend hosting) |
| LLM Provider | Google Gemini (via ADK) / OpenRouter fallback |

### 5.2 High-Level Components

```
Web Client → Next.js Frontend → React Flow Canvas
     ↓
API Layer → Next.js API Routes + FastAPI ADK Service
     ↓
Orchestration → Google ADK Agent Runtime
     ↓
Execution → ADK Python Sandbox (isolated code execution)
     ↓
Data Layer → Supabase (pipelines, executions, user data)
     ↓
External Services → Google Maps API, Web Search, Custom APIs
```

---

## 6. Data Models

### Pipeline

Represents a complete multi-agent workflow configuration.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Owner reference |
| name | String | Display name |
| description | Text | Pipeline description |
| agents | JSONB | Array of agent configurations |
| connections | JSONB | Edge definitions between agents |
| is_template | Boolean | Whether this is a starter template |
| created_at | Timestamp | Creation timestamp |
| updated_at | Timestamp | Last modification timestamp |

### Agent (embedded in Pipeline.agents)

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique agent ID within pipeline |
| type | Enum | input_parser, web_search, code_executor, etc. |
| name | String | Display name |
| role | Text | Agent role description / system prompt |
| config | JSONB | Type-specific configuration |
| position | Object | Canvas position {x, y} |

### Execution

Tracks individual pipeline runs and their results.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| pipeline_id | UUID | Pipeline reference |
| user_id | UUID | User who initiated execution |
| input | Text | User input that triggered execution |
| status | Enum | pending, running, completed, failed |
| agent_outputs | JSONB | Output from each agent in sequence |
| final_output | JSONB | Aggregated final results |
| duration_ms | Integer | Total execution time |
| created_at | Timestamp | Execution start time |

---

## 7. API Integrations

### Required Integrations (MVP)

| API | Purpose | Auth Method |
|-----|---------|-------------|
| Google Maps Places | Location search, competitor mapping, place details | API Key |
| Web Search | Market research, demographic data, news gathering | API Key |
| Google ADK | Agent orchestration, code execution runtime | Service Account |
| Supabase | Database, authentication, realtime subscriptions | Anon/Service Key |
| Google Cloud Run | Pipeline deployment target | Service Account |

### Custom API Configuration

Users can configure custom API endpoints for their agents. The system supports REST APIs with configurable authentication (API Key, Bearer Token, OAuth2). Custom APIs are stored per-user and can be referenced in agent configurations.

---

## 8. Starter Templates

### Template 1: Retail Location Analysis

**Purpose:** Evaluate business location viability with data-driven analysis.

**Agent Pipeline:**

1. **Input Parser** — Extract business type and target location
2. **Web Research Agent** — Gather market demographics and trends
3. **Competitor Mapper** — Query Google Maps for nearby competitors
4. **Code Executor** — Compute viability scores, validate via APIs
5. **Strategy Agent** — Generate strategic recommendations
6. **Presentation Generator** — Create executive HTML report
7. **Infographic Creator** — Produce visual summary

**Example Input:** "I want to open a coffee shop in Sunnyvale Downtown."

**Example Output (≈4 minutes):** Full market analysis, competitor density map, location viability score, strategic recommendations, and ready-to-share executive presentation.

### Template 2: Competitive Intelligence Analyzer

**Purpose:** Monitor and analyze competitor activities and market positioning.

**Agent Pipeline:**

1. **Input Parser** — Extract company names and analysis scope
2. **Web Scraper** — Collect competitor website data, press releases
3. **Social Monitor** — Analyze social media presence and sentiment
4. **Code Executor** — Calculate market share estimates, trend analysis
5. **Report Generator** — Create comprehensive competitive analysis report

### Template 3: Financial Data Processor

**Purpose:** Process, validate, and analyze financial datasets.

**Agent Pipeline:**

1. **Data Ingester** — Accept CSV/Excel uploads or API data sources
2. **Validator Agent** — Check data integrity, identify anomalies
3. **Code Executor** — Run financial calculations, projections
4. **Visualization Agent** — Generate charts and graphs
5. **Summary Generator** — Create executive summary with key insights

---

## 9. Success Metrics

### MVP Launch Criteria

| Metric | Target |
|--------|--------|
| Pipeline creation to execution | < 5 minutes for template-based |
| Code execution success rate | > 85% (with auto-retry) |
| Retail Analysis template completion | < 5 minutes end-to-end |
| Cloud Run deployment success | > 90% first-attempt success |
| System uptime | > 99% availability |

### Post-Launch KPIs (First 90 Days)

- User signups: 500+ registered users
- Pipelines created: 1,000+ total pipelines
- Successful executions: 5,000+ completed runs
- Deployed pipelines: 100+ Cloud Run deployments
- User retention: 30% week-over-week return rate

---

## 10. Effort Estimation

Estimates assume development with Claude Code, leveraging AI-assisted coding for accelerated delivery.

| Component | Complexity | Est. Duration |
|-----------|------------|---------------|
| Project setup & infrastructure | Low | 3-5 days |
| Authentication & user management | Low | 2-3 days |
| Visual pipeline builder (React Flow) | High | 2-3 weeks |
| Agent configuration UI | Medium | 1-2 weeks |
| Google ADK integration | High | 2-3 weeks |
| Code execution sandbox | High | 1-2 weeks |
| API integrations (Maps, Search) | Medium | 1 week |
| Execution engine & real-time updates | High | 2 weeks |
| Starter templates (3) | Medium | 1-2 weeks |
| Cloud Run deployment integration | Medium | 1 week |
| Testing & bug fixes | Medium | 2 weeks |
| Documentation & polish | Low | 1 week |
| **Total Estimated Duration** | | **12-16 weeks** |

---

## 11. Open Questions & Decisions

| Question | Options / Notes | Status |
|----------|-----------------|--------|
| Generative UI approach | AG-UI/CopilotKit vs. custom React rendering vs. deferred | Pending |
| Pricing model | Freemium with execution limits? Per-seat? Usage-based? | Pending |
| Web search provider | Serper, SerpAPI, Tavily, or Google Custom Search | Pending |
| LLM fallback strategy | OpenRouter for non-Google models? Cost implications? | Pending |
| Product name | AgentForge is working title — final name TBD | Pending |
| Open source strategy | Fully open? Core open + hosted premium? Timeline? | Pending |

---

## 12. Next Steps

**Immediate Actions:**

1. Finalize product name and branding direction
2. Set up project repository and CI/CD pipeline
3. Provision Google Cloud project and ADK access
4. Create Supabase project with initial schema
5. Begin visual pipeline builder development (Phase 1)

---

*Document prepared for AgentForge MVP development. Ready for Claude Code implementation.*
