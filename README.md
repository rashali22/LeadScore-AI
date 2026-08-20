# Lead Conversion Prediction & Scoring — Full-Stack MVP

A portfolio-ready, full-stack machine learning application that predicts lead conversion likelihood, computes an actionable **Lead Score (0–100)**, and assigns priority tiers (**High / Medium / Low**) using a calibrated XGBoost pipeline.

---

## 🏗️ Architecture & Flow

```
[User Input Form]
       │
       ▼
[React Frontend (Vite)] ──(POST /predict)──► [Flask Backend]
                                                    │
                                                    ▼
                                     [Calibrated XGBoost Pipeline]
                                     (lead_conversion_model.pkl)
                                                    │
                                                    ▼
                                    [Conversion Probability: 0–1]
                                                    │
                                                    ▼
                                      [Lead Score: 0–100]
                                      [Priority: High / Medium / Low]
                                                    │
                                                    ▼
[Dynamic Result Card] ◄──────────────────────────────┘
```

- **Frontend**: Minimal single-page React app built with Vite.
- **Backend**: Flask serving predictions directly from the pre-trained `.pkl` artifact.
- **ML Engine**: Scikit-Learn `Pipeline` + `ColumnTransformer` + `XGBClassifier` with `CalibratedClassifierCV` (handles preprocessing internally).
- **Deployment**: Frontend ready for **Vercel**, Backend ready for **Render** (no database required).

---

## 📁 Project Structure

```
lead-conversion-app/
├── backend/
│   ├── main.py                  # Flask server with model loader & /predict endpoint
│   ├── app.py                   # Flask entry point alias
│   ├── requirements.txt         # Backend Python dependencies
│   └── models/
│       └── lead_conversion_model.pkl  # Calibrated ML pipeline artifact
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main single-page UI (Form + Result Card + Presets)
│   │   ├── index.css            # Styling and priority color schemes
│   │   └── main.jsx             # React entry point
│   ├── index.html               # HTML document
│   ├── package.json             # NPM dependencies and scripts
│   ├── vite.config.js           # Vite build configuration
│   ├── vercel.json              # Vercel SPA routing configuration
│   └── .env.example             # Frontend environment variable template
└── README.md                    # Project documentation
```

---

## 🚀 Quickstart (Local Setup)

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
python main.py
```
- The backend will start at: `http://127.0.0.1:8000`
- Health check: `http://127.0.0.1:8000/health`

### 2. Frontend Setup

```bash
# In a new terminal, navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
- The frontend will start at: `http://localhost:5173`

---

## 🔌 API Reference

### 1. Health Check
- **Endpoint**: `GET /health`
- **Response**:
```json
{
  "status": "ok"
}
```

### 2. Lead Prediction & Scoring
- **Endpoint**: `POST /predict`
- **Request Body (JSON Example)**:
```json
{
  "TotalVisits": 10,
  "Total Time Spent on Website": 1200,
  "Page Views Per Visit": 5,
  "Lead Origin": "Lead Add Form",
  "Lead Source": "Reference",
  "What is your current occupation": "Working Professional",
  "Lead Quality": "High in Relevance"
}
```

- **Response (200 OK)**:
```json
{
  "conversion_probability": 0.9567,
  "lead_score": 95.67,
  "priority": "High"
}
```

### Priority Tier Logic
| Lead Score | Priority Tier | Recommended Sales Action |
|---|---|---|
| **70.0 – 100.0** | **High** | Immediate outbound contact / sales outreach |
| **40.0 – 69.9** | **Medium** | Automated email nurture campaigns & follow-ups |
| **0.0 – 39.9** | **Low** | Passive monitoring / low-touch newsletters |

---

## 🌐 Production Deployment Guide

### Deploy Backend to Render

1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your Git repository.
3. Configure the service settings:
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn main:app --bind 0.0.0.0:$PORT`
4. Deploy and copy your Render public URL (e.g. `https://lead-backend.onrender.com`).

### Deploy Frontend to Vercel

1. Create a new Project on [Vercel](https://vercel.com).
2. Connect your Git repository.
3. Configure project settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-app.onrender.com` (your Render backend URL)
5. Click **Deploy**.

---

## 🛡️ Key Design & Engineering Highlights

1. **Zero Preprocessing Duplication**: Calls `model.predict_proba()` directly against the pipeline artifact containing all imputers and encoders.
2. **Startup In-Memory Loading**: Model artifact loaded once during application startup.
3. **Robust Sanitization & Validation**: Safe numerical and categorical parsing rejecting invalid/negative values while accepting missing or "Not provided" values.
4. **Resilient CORS**: Fully configurable CORS middleware enabling seamless cross-origin requests between Vercel and Render.
