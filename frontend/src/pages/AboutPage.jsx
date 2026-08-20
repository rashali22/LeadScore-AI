import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Layers,
  TrendingUp,
  Award,
  ArrowRight,
  GitBranch,
  Filter,
  Database,
  Target,
  Zap,
  ShieldAlert
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Page Header */}
      <header className="page-header">
        <div className="page-header-container">
          <h1 className="page-main-title">About the Machine Learning System</h1>
          <p className="page-main-subtitle">
            An in-depth technical overview of how the lead conversion model was trained, validated, calibrated, and served.
          </p>
        </div>
      </header>

      <div className="about-container">
        {/* =========================================================================
            1. TWO CONCEPTUAL STAGES: MODEL TRAINING VS LIVE PREDICTION
           ========================================================================= */}
        <section className="about-conceptual-section">
          <div className="section-title-wrap">
            <GitBranch size={18} className="text-blue" />
            <h2 className="about-section-heading">Model Training vs Real-Time Prediction</h2>
          </div>
          <p className="section-lead-text">
            The system operates in two distinct phases: offline model development and live scoring in production.
          </p>

          <div className="stages-dual-grid">
            {/* Stage A: Offline Model Training */}
            <div className="stage-overview-card stage-training-card">
              <div className="stage-card-top">
                <div className="stage-badge badge-training">
                  <span className="stage-dot dot-blue"></span>
                  <span>MODEL TRAINING (OFFLINE)</span>
                </div>
                <span className="stage-timing-tag">Trained in Backend</span>
              </div>
              <p className="stage-summary-text">
                Historical dataset was preprocessed, protected against data leakage, trained with XGBoost, tuned with 5-fold CV, calibrated, and saved to disk.
              </p>
              
              <div className="mini-stage-flow">
                <span className="mini-flow-step">Dataset</span>
                <span className="mini-flow-arrow">➔</span>
                <span className="mini-flow-step">Preprocessing</span>
                <span className="mini-flow-arrow">➔</span>
                <span className="mini-flow-step">Leakage Review</span>
                <span className="mini-flow-arrow">➔</span>
                <span className="mini-flow-step">XGBoost</span>
                <span className="mini-flow-arrow">➔</span>
                <span className="mini-flow-step">5-Fold CV</span>
                <span className="mini-flow-arrow">➔</span>
                <span className="mini-flow-step">Calibration</span>
                <span className="mini-flow-arrow">➔</span>
                <span className="mini-flow-step highlight-saved-model">Saved Model</span>
              </div>
            </div>

            {/* Stage B: Real-Time Lead Scoring */}
            <div className="stage-overview-card stage-predict-card">
              <div className="stage-card-top">
                <div className="stage-badge badge-predict">
                  <span className="stage-dot dot-emerald"></span>
                  <span>NEW LEAD / PREDICTION (ONLINE)</span>
                </div>
                <span className="stage-timing-tag">Live Fast API Service</span>
              </div>
              <p className="stage-summary-text">
                The deployed FastAPI service feeds incoming lead data into the saved pipeline, producing a calibrated conversion probability, score, and priority.
              </p>
              
              <div className="mini-stage-flow">
                <span className="mini-flow-step">New Lead</span>
                <span className="mini-flow-arrow">➔</span>
                <span className="mini-flow-step">Same Preprocessing</span>
                <span className="mini-flow-arrow">➔</span>
                <span className="mini-flow-step">Saved Model</span>
                <span className="mini-flow-arrow">➔</span>
                <span className="mini-flow-step">Conversion Probability</span>
                <span className="mini-flow-arrow">➔</span>
                <span className="mini-flow-step">Lead Score</span>
                <span className="mini-flow-arrow">➔</span>
                <span className="mini-flow-step highlight-priority">Priority</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. MAIN REDESIGNED SECTION: HOW LEADSCORE AI WORKS (8-STEP FLOWCHART)
           ========================================================================= */}
        <section className="about-flowchart-section">
          <div className="flowchart-section-header">
            <div className="section-title-wrap">
              <Zap size={20} className="text-purple" />
              <h2 className="about-section-heading">How LeadScore AI Works</h2>
            </div>
            <p className="section-lead-text">
              From lead information to a simple conversion score and priority.
            </p>

            {/* Phase Pipeline Breadcrumb Ribbon */}
            <div className="pipeline-phase-ribbon">
              <div className="phase-pill phase-data">
                <span className="phase-pill-dot dot-blue"></span>
                <span>DATA</span>
              </div>
              <span className="phase-ribbon-arrow">➔</span>
              <div className="phase-pill phase-processing">
                <span className="phase-pill-dot dot-purple"></span>
                <span>PROCESSING</span>
              </div>
              <span className="phase-ribbon-arrow">➔</span>
              <div className="phase-pill phase-model">
                <span className="phase-pill-dot dot-emerald"></span>
                <span>MODEL</span>
              </div>
              <span className="phase-ribbon-arrow">➔</span>
              <div className="phase-pill phase-output">
                <span className="phase-pill-dot dot-amber"></span>
                <span>OUTPUT</span>
              </div>
            </div>
          </div>

          {/* 8-Step Visual Flowchart */}
          <div className="flowchart-board">
            
            {/* ROW 1: Steps 01 to 04 */}
            <div className="flowchart-row">
              {/* Step 01: Raw Lead Data */}
              <div className="flow-step-card card-step-1">
                <div className="flow-card-header">
                  <span className="flow-step-num num-blue">01</span>
                  <div className="flow-card-icon icon-blue">
                    <Database size={16} />
                  </div>
                </div>
                <h3 className="flow-card-title">RAW LEAD DATA</h3>
                <p className="flow-card-text">
                  Lead information enters the system.
                </p>
                <div className="flow-card-footer">
                  <span className="flow-meta-pill pill-blue">Lead Attributes</span>
                </div>
              </div>

              {/* Animated Flow Arrow 1 -> 2 */}
              <div className="flow-connector horizontal-arrow">
                <span className="animated-arrow-icon">➔</span>
                <span className="mobile-arrow-icon">↓</span>
              </div>

              {/* Step 02: Preprocessing */}
              <div className="flow-step-card card-step-2">
                <div className="flow-card-header">
                  <span className="flow-step-num num-purple">02</span>
                  <div className="flow-card-icon icon-purple">
                    <Filter size={16} />
                  </div>
                </div>
                <h3 className="flow-card-title">PREPROCESSING</h3>
                <p className="flow-card-text">
                  Missing values are handled and categorical and numerical features are prepared for the model.
                </p>
                <div className="flow-card-footer">
                  <span className="flow-meta-pill pill-purple">Impute & Encode</span>
                </div>
              </div>

              {/* Animated Flow Arrow 2 -> 3 */}
              <div className="flow-connector horizontal-arrow">
                <span className="animated-arrow-icon">➔</span>
                <span className="mobile-arrow-icon">↓</span>
              </div>

              {/* Step 03: Leakage Check */}
              <div className="flow-step-card card-step-3 card-highlight-leakage">
                <div className="flow-card-header">
                  <span className="flow-step-num num-red">03</span>
                  <div className="flow-card-icon icon-red">
                    <ShieldAlert size={16} />
                  </div>
                </div>
                <h3 className="flow-card-title">LEAKAGE CHECK</h3>
                <p className="flow-card-text">
                  Features that could contain information from later lead interactions were removed to avoid data leakage.
                </p>
              </div>

              {/* Animated Flow Arrow 3 -> 4 */}
              <div className="flow-connector horizontal-arrow">
                <span className="animated-arrow-icon">➔</span>
                <span className="mobile-arrow-icon">↓</span>
              </div>

              {/* Step 04: XGBoost */}
              <div className="flow-step-card card-step-4">
                <div className="flow-card-header">
                  <span className="flow-step-num num-indigo">04</span>
                  <div className="flow-card-icon icon-indigo">
                    <Cpu size={16} />
                  </div>
                </div>
                <h3 className="flow-card-title">XGBOOST</h3>
                <p className="flow-card-text">
                  XGBoost analyzes the lead information and predicts how likely the lead is to convert.
                </p>
                <div className="flow-card-footer">
                  <span className="flow-meta-pill pill-indigo">Conversion Likelihood</span>
                </div>
              </div>
            </div>

            {/* Turnaround Down Connector between Row 1 and Row 2 on Desktop */}
            <div className="flow-turnaround-connector">
              <div className="turnaround-line">
                <span className="turnaround-arrow">↓</span>
              </div>
            </div>

            {/* ROW 2: Steps 05 to 08 */}
            <div className="flowchart-row">
              {/* Step 05: Validation & Tuning */}
              <div className="flow-step-card card-step-5">
                <div className="flow-card-header">
                  <span className="flow-step-num num-emerald">05</span>
                  <div className="flow-card-icon icon-emerald">
                    <Layers size={16} />
                  </div>
                </div>
                <h3 className="flow-card-title">VALIDATION & TUNING</h3>
                <p className="flow-card-text">
                  5-fold cross-validation helps us evaluate the model more reliably while tuning its parameters.
                </p>
                <div className="flow-card-footer">
                  <span className="flow-meta-pill pill-emerald">5-Fold Stratified CV</span>
                </div>
              </div>

              {/* Animated Flow Arrow 5 -> 6 */}
              <div className="flow-connector horizontal-arrow">
                <span className="animated-arrow-icon">➔</span>
                <span className="mobile-arrow-icon">↓</span>
              </div>

              {/* Step 06: Calibration */}
              <div className="flow-step-card card-step-6">
                <div className="flow-card-header">
                  <span className="flow-step-num num-teal">06</span>
                  <div className="flow-card-icon icon-teal">
                    <TrendingUp size={16} />
                  </div>
                </div>
                <h3 className="flow-card-title">CALIBRATION</h3>
                <p className="flow-card-text">
                  Calibration adjusts the model's probabilities so they better represent the likelihood of conversion.
                </p>
                <div className="flow-card-footer">
                  <span className="flow-meta-pill pill-teal">Probability Scaling</span>
                </div>
              </div>

              {/* Animated Flow Arrow 6 -> 7 */}
              <div className="flow-connector horizontal-arrow">
                <span className="animated-arrow-icon">➔</span>
                <span className="mobile-arrow-icon">↓</span>
              </div>

              {/* Step 07: Lead Score */}
              <div className="flow-step-card card-step-7">
                <div className="flow-card-header">
                  <span className="flow-step-num num-green">07</span>
                  <div className="flow-card-icon icon-green">
                    <Target size={16} />
                  </div>
                </div>
                <h3 className="flow-card-title">LEAD SCORE</h3>
                <p className="flow-card-text">
                  Conversion probability is converted into a 0–100 score.
                </p>
                <div className="flow-card-footer">
                  <div className="formula-compact-card">
                    <span className="formula-math">Lead Score = Probability × 100</span>
                    <span className="formula-example">80% prob ➔ <strong>80 / 100 Lead Score</strong></span>
                  </div>
                </div>
              </div>

              {/* Animated Flow Arrow 7 -> 8 */}
              <div className="flow-connector horizontal-arrow">
                <span className="animated-arrow-icon">➔</span>
                <span className="mobile-arrow-icon">↓</span>
              </div>

              {/* Step 08: Priority */}
              <div className="flow-step-card card-step-8 card-highlight-priority">
                <div className="flow-card-header">
                  <span className="flow-step-num num-amber">08</span>
                  <div className="flow-card-icon icon-amber">
                    <Award size={16} />
                  </div>
                </div>
                <h3 className="flow-card-title">PRIORITY</h3>
                <p className="flow-card-text">
                  The score is used to classify the lead as Low, Medium, or High priority.
                </p>
                <div className="flow-card-footer">
                  <div className="priority-compact-pills">
                    <span className="p-chip chip-high">HIGH (≥ 70)</span>
                    <span className="p-chip chip-med">MEDIUM (40–69)</span>
                    <span className="p-chip chip-low">LOW (&lt; 40)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            3. BOTTOM CTA
           ========================================================================= */}
        <section className="about-bottom-cta">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Try the Live Scoring Model</h2>
              <p className="cta-banner-text">
                Test the calibrated XGBoost pipeline with real lead profiles or verified presets.
              </p>
            </div>
            <div className="cta-banner-action">
              <Link to="/predict" className="btn-cta-large">
                <span>Score a Lead Now</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
