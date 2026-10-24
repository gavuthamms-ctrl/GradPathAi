# GradPath AI: Explainable Student Graduation Prediction & Intervention Framework

[![Python 3.13](https://img.shields.io/badge/Python-3.13-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com)
[![React 19](https://img.shields.io/badge/Frontend-React%2019-61DAFB.svg)](https://react.dev)
[![Vite 6](https://img.shields.io/badge/Build-Vite%206-646CFF.svg)](https://vitejs.dev)
[![Tailwind CSS 3](https://img.shields.io/badge/Styling-TailwindCSS%203-38B2AC.svg)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An end-to-end, research-grade implementation of the framework proposed in:
> **"Machine Learning for University Student Graduation Prediction: A Systematic Review and a Generative AI-Driven Framework for Personalized Intervention"**

GradPath AI bridges the critical operational gap in higher education learning analytics: **prediction alone does not prevent student attrition**. The framework unites calibrated supervised machine learning, one-hot aggregated SHAP explainability, guardrailed generative AI intervention planning, and human-in-the-loop advisor oversight into a unified, privacy-preserving application.

---

## 🏛️ The 5-Step Academic Intervention Pipeline

```
  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │  01 PREDICT  │ ──> │  02 EXPLAIN  │ ──> │03 GEN PLAN   │ ──> │04 ADVISOR REV│ ──> │ 05 FEEDBACK  │
  │ Calibrated ML│     │Aggregated SHAP│     │Faithful LLM  │     │Human-in-Loop │     │Audit & Log   │
  └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

1. **`01 PREDICT` (Calibrated Inference)**:
   - Multi-model evaluation across 5 algorithms on the **UCI Dataset 697** ("Predict Students' Dropout and Academic Success", 4,424 records).
   - Winning algorithm (**XGBoost**) calibrated with **Isotonic Regression** (Brier score: `0.0712`).
   - Binary endpoint: `Graduate (1)` vs `Dropout (0)` (with unresolved `Enrolled` records excluded to avoid target leakage).
2. **`02 EXPLAIN` (SHAP Factor Attribution)**:
   - Exact polynomial-time Shapley values via `shap.TreeExplainer`.
   - Custom `FeatureMapper` maps 229 one-hot encoded categories back to human-interpretable parent features:
     $$\phi_j = \sum_{k \in \text{OHE}(j)} \phi_{jk}$$
   - Explicit signed directional impacts isolating risk-increasing vs risk-decreasing drivers.
3. **`03 GENERATE PLAN` (Faithful LLM Remediation)**:
   - Synthesizes personalized study roadmaps, 7-day weekly schedules, campus resource referrals, and confidential advisor briefing notes.
   - Dual-path engine: Live **Claude (Anthropic)** or verified deterministic **Rule-Based Template Fallback**.
   - Automated **Faithfulness Checker** enforcing:
     - Factor Coverage $\ge 0.60$ (at least 3 of 5 top factors explicitly addressed)
     - Hallucinated Factors $= 0$ (no unprovided dataset features referenced)
     - Certainty Phrases $= 0$ (probabilistic language strictly enforced; e.g., "the model estimates")
4. **`04 ADVISOR REVIEW` (Human-in-the-Loop Triage)**:
   - Interactive caseload dashboard enabling professional academic advisors to **Approve**, **Edit** (with inline Markdown/plain text editor), or **Reject** recommendations.
   - Mandatory advisor justification memo ensuring institutional responsibility.
5. **`05 FEEDBACK` (Accountability & Audit)**:
   - All advisor actions, edits, and timestamps are persisted to SQLite (`backend/data/gradpath.db`).
   - SQLite cache indexed by `SHA256(profile_json + model + prompt_version)` prevents duplicate LLM queries.

---

## 📊 Key Verification & Benchmark Results

### 1. Candidate Algorithm Leaderboard (Held-Out 20% Test Split: 726 Students)

| Algorithm | Test ROC-AUC | Test F1-Score | Test Accuracy | Test Recall | 5-Fold CV ROC-AUC | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **XGBoost** | **0.9536** | **0.9269** | **90.77%** | **96.15%** | **0.9510 ± 0.010** | **Winner (Chosen)** |
| Support Vector Machine | 0.9529 | 0.9248 | 90.63% | 94.57% | 0.9555 ± 0.003 | Baseline |
| Logistic Regression | 0.9511 | 0.9195 | 90.08% | 92.99% | 0.9543 ± 0.005 | Baseline |
| Random Forest | 0.9504 | 0.9288 | 91.05% | 95.93% | 0.9498 ± 0.009 | Baseline |
| Multi-Layer Perceptron | 0.9489 | 0.9190 | 89.94% | 93.67% | 0.9516 ± 0.005 | Baseline |

### 2. Demographic Fairness Audit (Protected Attributes Excluded from Predictors)

| Protected Attribute | Subgroups Evaluated | Max Accuracy Gap | Max TPR Gap | Max FPR Gap | Small Sample Caveats |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Gender** | Female ($n=469$), Male ($n=257$) | **2.83%** | **0.26%** | **3.59%** | None ($n \ge 30$) |
| **Age at Enrollment** | $<20$ ($n=312$), $20-25$ ($n=238$), $26+$ ($n=176$) | **1.71%** | **3.23%** | **12.63%** | None ($n \ge 30$) |
| **Scholarship Status** | Non-Recipient ($n=535$), Recipient ($n=191$) | **3.96%** | **0.26%** | **19.86%** | None ($n \ge 30$) |

### 3. Faithfulness & Hallucination Audit

| Evaluation Metric | Threshold | Template Fallback Path | Live LLM (Mocked) | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Top Factor Coverage** | $\ge 0.60$ | **1.00 (5/5 factors)** | **1.00 (5/5 factors)** | **PASSED** |
| **Hallucinated Attributes** | $= 0$ | **0** | **0** | **PASSED** |
| **Certainty Flags** | $= 0$ | **0** | **0** | **PASSED** |

---

## ⚡ Quickstart Guide

### Prerequisites
- **Python**: 3.11, 3.12, or 3.13
- **Node.js**: 18+ or 20+ (with `npm`)

### 1. Environment Configuration
Create or inspect `.env` in the project root:
```ini
# Optional: Anthropic API Key (if omitted, automatically uses verified rule-based template)
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-4-6

# Ethical Constraints
INCLUDE_PROTECTED_FEATURES=false

# Server Configuration
HOST=127.0.0.1
PORT=8000
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### 2. Launching with One-Click Scripts (Windows)

#### Option A: Convenient Batch Scripts
- **Start Backend**: Double-click `run_backend.bat` or run:
  ```powershell
  .\run_backend.bat
  ```
- **Start Frontend**: Double-click `run_frontend.bat` or run:
  ```powershell
  .\run_frontend.bat
  ```
- **Execute Full QA Suite**:
  ```powershell
  .\test_suite.bat
  ```

#### Option B: Manual Execution
```bash
# Terminal 1 - Backend API
.\.venv\Scripts\python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload

# Terminal 2 - Frontend UI
cd frontend
npm run dev
```

Visit the application at **`http://localhost:5173`**.  
Interactive API Swagger Docs are available at **`http://127.0.0.1:8000/docs`**.

---

## 🌐 Implemented Page Views

1. **Overview (`/`)**:
   - Academic motivation, research gap analysis, 5-step interactive pipeline visualizer, live verified benchmark metrics bar.
2. **Student Dashboard (`/students`)**:
   - Student selector (`S0001` - `S1000`), radial SVG graduation probability gauge, color-coded risk tiers, signed SHAP bar chart, individualized study roadmap, 7-day weekly schedule grid, campus resource referrals, and plan faithfulness verification badges.
3. **Advisor Triage Portal (`/advisor`)**:
   - Filterable, searchable, and sortable caseload roster, side-by-side plan inspector, inline review editor (**Approve**, **Edit**, **Reject**), justification comment box, and historical audit log.
4. **What-If Counterfactual Simulator (`/whatif`)**:
   - Interactive sliders for modifiable academic units, grades, and tuition status; 300ms debounced live inference; side-by-side delta shift indicators; recalibrated counterfactual SHAP attributions.
5. **Model Benchmarks & Comparison (`/models`)**:
   - Complete 5-model leaderboard table, interactive 2x2 confusion matrices, multi-model ROC Curve visualizer with AUC scores, and Isotonic reliability probability calibration diagram with Brier score.
6. **Demographic Fairness & Ethics (`/fairness`)**:
   - Parity disparity summary cards, disaggregated tables for Gender, Age Groups, and Scholarship Status, small-sample warnings ($n < 30$), and institutional ethical disclosure notices.

---

## 🔌 API Reference Overview

All endpoints follow uniform error handling: `{error: {code, message, details}}`.

| Method | Endpoint | Query / Body | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | - | Health status, active model, data source origin |
| `GET` | `/students` | `page`, `page_size`, `risk_level`, `search`, `sort_by`, `sort_order` | Paginated student registry with risk scores |
| `GET` | `/students/{id}/profile` | - | Full risk profile and top 5 aggregated SHAP factors |
| `POST` | `/students/{id}/plan` | `{"force_regenerate": false}` | Generates or retrieves cached intervention plan |
| `POST` | `/whatif` | `{"student_id": "...", "changes": {...}}` | Counterfactual simulation with bounded input validation |
| `GET` | `/models/metrics` | - | Leaderboard metrics, ROC points, confusion matrices |
| `GET` | `/fairness` | - | Demographic audit data across protected attributes |
| `POST` | `/feedback` | `{"student_id": "...", "action": "...", "comment": "..."}` | Logs advisor review decision (Approve/Edit/Reject) |
| `GET` | `/feedback` | `student_id` (optional) | Retrieves chronological audit trail of advisor actions |

*Complete curl requests and real JSON responses are documented in [docs/API_EXAMPLES.md](file:///c:/Users/Student/New%20Project/docs/API_EXAMPLES.md).*

---

## 📁 Repository Directory Structure

```
New Project/
├── backend/
│   ├── app/                    # FastAPI application & REST routers
│   │   ├── main.py             # Server entrypoint, CORS, exception handlers
│   │   └── routers/            # students, models, whatif, feedback
│   ├── artifacts/              # Serialized models, plots, metrics JSONs
│   │   ├── best_model.joblib   # Trained isotonic-calibrated XGBoost model
│   │   ├── feature_mapper.joblib # OHE-to-parent column mapper
│   │   ├── metrics.json        # 5-fold CV & test set leaderboard
│   │   └── student_registry.csv# 1,000 anonymized student records
│   ├── data/                   # Raw cached data & SQLite database (gradpath.db)
│   ├── llm/                    # Generative AI intervention & faithfulness module
│   │   ├── generator.py        # Anthropic Claude client with template fallback
│   │   ├── faithfulness.py     # Coverage, hallucination & certainty auditor
│   │   ├── template.py         # Deterministic rule-based template generator
│   │   └── cache.py            # SQLite SHA256 plan caching
│   ├── ml/                     # Machine learning pipelines & explainability
│   │   ├── train.py            # 5-model cross-validation training pipeline
│   │   ├── explain.py          # SHAP TreeExplainer & OHE aggregator
│   │   ├── fairness.py         # Demographic parity auditing module
│   │   └── risk_profile.py     # End-to-end student risk profiler
│   └── tests/                  # Complete pytest suite (24 passing unit tests)
├── frontend/                   # Modern React 19 + Vite 6 web application
│   ├── src/
│   │   ├── api/client.js       # Centralized HTTP API client
│   │   ├── components/         # Reusable UI cards, gauges, charts, badges
│   │   ├── context/            # Light/Dark ThemeProvider & useTheme hook
│   │   └── pages/              # 6 primary view pages
│   ├── package.json
│   └── vite.config.js          # Port 5173 with proxy to backend port 8000
├── docs/                       # Architecture decisions, API examples, evidence
│   ├── API_EXAMPLES.md         # Live curl commands and responses
│   ├── DECISIONS.md            # Architectural Decision Records (ADRs)
│   ├── KNOWN_ISSUES.md         # Runtime constraints & fallback log
│   └── evidence/               # Verification evidence for Phases 1 through 5
├── run_backend.bat             # Fast Windows launcher for FastAPI server
├── run_frontend.bat            # Fast Windows launcher for Vite dev server
├── test_suite.bat              # Full QA verification script (Python + JS)
├── requirements.txt            # Python dependencies
└── README.md                   # Project documentation
```

---

## 🔒 Ethical & Institutional Governance

1. **Exclusion of Protected Features**: `Gender`, `Age at enrollment`, and `Scholarship holder` are excluded from model training by default (`INCLUDE_PROTECTED_FEATURES=false`). While this eliminates direct demographic weighting, proxy bias remains monitored via mandatory demographic auditing.
2. **Probabilistic Framing**: Predictions represent empirical statistical estimates, not deterministic certainties. Absolute statements ("will fail") are strictly intercepted by the faithfulness checker.
3. **Data Privacy Minimization**: Only the minimal risk profile (anonymized student ID, graduation probability, and top 5 SHAP factors) is transmitted to the intervention generator. Tabular background records and demographic features are never transmitted to external LLMs.
4. **Contextual Limitations**: Predictive models reflect the curricular structures of the originating institution (UCI Dataset 697) and should be recalibrated before deployment in new academic environments.

---

## 🧪 Verification & Testing

Execute the comprehensive test suite:
```powershell
.\test_suite.bat
```
Output:
- [x] **Pytest Backend**: 24 tests passed across data loading, ML training, SHAP explainability, LLM faithfulness, and FastAPI endpoints.
- [x] **Frontend Oxlint**: 0 errors, 0 warnings across all 23 React components and pages.
- [x] **Frontend Production Build**: Optimized client bundle compiled in `< 1.0s` with Vite.
