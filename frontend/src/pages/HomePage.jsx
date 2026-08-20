import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Database,
  Cog,
  TrendingUp,
  Trophy,
  ChevronDown,
  BrainCircuit,
  Target
} from 'lucide-react';

export default function HomePage() {
  const [sliderScore, setSliderScore] = useState(78.0);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="dark-landing-wrapper">
      {/* =========================================================================
          SECTION 1: THE PROBLEM (01 — THE PROBLEM)
         ========================================================================= */}
      <section className="story-block section-problem" id="section-problem">
        <div className="landing-max-width">
          <div className="story-split-grid">
            {/* Left Content */}
            <div className="story-text-col">
              <div className="story-step-badge badge-blue">
                <span className="step-tag">01 — THE PROBLEM</span>
              </div>

              <h2 className="story-headline">
                Too many leads. <br />
                <span className="highlight-blue">Not enough time.</span>
              </h2>

              <p className="story-description">
                Sales teams need to know which leads deserve attention first.
              </p>
            </div>

            {/* Right Visual: Lead Cards entering Funnel */}
            <div className="story-visual-col">
              <div className="problem-visual-stage">
                <div className="floating-leads-cluster">
                  <div className="floating-lead-card lead-card-1">
                    <div className="lead-avatar avatar-blue">👤</div>
                    <div className="lead-mini-info">
                      <div className="lead-name-bar"></div>
                      <div className="lead-sub-bar"></div>
                    </div>
                  </div>

                  <div className="floating-lead-card lead-card-2">
                    <div className="lead-avatar avatar-teal">👤</div>
                    <div className="lead-mini-info">
                      <div className="lead-name-bar"></div>
                      <div className="lead-sub-bar"></div>
                    </div>
                  </div>

                  <div className="floating-lead-card lead-card-3">
                    <div className="lead-avatar avatar-indigo">👤</div>
                    <div className="lead-mini-info">
                      <div className="lead-name-bar"></div>
                      <div className="lead-sub-bar"></div>
                    </div>
                  </div>

                  <div className="floating-lead-card lead-card-4">
                    <div className="lead-avatar avatar-purple">👤</div>
                    <div className="lead-mini-info">
                      <div className="lead-name-bar"></div>
                      <div className="lead-sub-bar"></div>
                    </div>
                  </div>

                  <div className="floating-lead-card lead-card-5">
                    <div className="lead-avatar avatar-amber">👤</div>
                    <div className="lead-mini-info">
                      <div className="lead-name-bar"></div>
                      <div className="lead-sub-bar"></div>
                    </div>
                  </div>

                  <div className="floating-lead-card lead-card-6">
                    <div className="lead-avatar avatar-green">👤</div>
                    <div className="lead-mini-info">
                      <div className="lead-name-bar"></div>
                      <div className="lead-sub-bar"></div>
                    </div>
                  </div>

                  <div className="floating-lead-card lead-card-7">
                    <div className="lead-avatar avatar-red">👤</div>
                    <div className="lead-mini-info">
                      <div className="lead-name-bar"></div>
                      <div className="lead-sub-bar"></div>
                    </div>
                  </div>
                </div>

                {/* Funnel Vortex */}
                <div className="funnel-container">
                  <div className="funnel-cone">
                    <div className="funnel-glow"></div>
                  </div>
                  <div className="funnel-arrow-out">
                    <ArrowRight size={28} className="arrow-pulse-blue" />
                  </div>
                </div>

                {/* Priority Order Output */}
                <div className="priority-order-card">
                  <div className="order-card-header">
                    <span>Priority Order</span>
                  </div>
                  <div className="order-list">
                    <div className="order-row">
                      <span className="order-badge badge-rank-green">1</span>
                      <span className="order-label-green">High Potential</span>
                    </div>
                    <div className="order-row">
                      <span className="order-badge badge-rank-green">2</span>
                      <span className="order-label-green">High Potential</span>
                    </div>
                    <div className="order-row">
                      <span className="order-badge badge-rank-amber">3</span>
                      <span className="order-label-amber">Medium Potential</span>
                    </div>
                    <div className="order-row">
                      <span className="order-badge badge-rank-red">4</span>
                      <span className="order-label-red">Low Potential</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="scroll-indicator-wrap">
            <button
              type="button"
              className="scroll-arrow-btn"
              onClick={() => scrollToSection('section-ai')}
              aria-label="Scroll to next section"
            >
              <ChevronDown size={28} strokeWidth={2.2} className="scroll-down-arrow text-blue" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THE AI (02 — THE AI)
         ========================================================================= */}
      <section className="story-block section-model" id="section-ai">
        <div className="landing-max-width">
          <div className="story-split-grid">
            {/* Left Content */}
            <div className="story-text-col">
              <div className="story-step-badge badge-purple">
                <span className="step-tag">02 — THE AI</span>
              </div>

              <h2 className="story-headline">
                AI looks at <br />
                <span className="highlight-purple">each lead.</span>
              </h2>

              <p className="story-description">
                The model studies the information about a lead and estimates how likely they are to convert.
              </p>
            </div>

            {/* Right Visual: Simple Flow: Lead Info -> AI Model -> Prediction */}
            <div className="story-visual-col">
              <div className="model-pipeline-cards">
                {/* Node 1: Lead Information */}
                <div className="glass-pipeline-card card-purple-glow">
                  <div className="glass-card-icon icon-purple">
                    <Database size={24} />
                  </div>
                  <strong className="glass-card-title">Lead Information</strong>
                  <p className="glass-card-desc">Source, visits, intent signals</p>
                </div>

                <div className="glass-flow-arrow">➔</div>

                {/* Node 2: ML Model */}
                <div className="glass-pipeline-card card-blue-glow">
                  <div className="glass-card-icon icon-blue-xg">
                    <BrainCircuit size={24} />
                  </div>
                  <strong className="glass-card-title">ML Model</strong>
                  <p className="glass-card-desc">Analyzes behavioral patterns</p>
                </div>

                <div className="glass-flow-arrow">➔</div>

                {/* Node 3: Prediction */}
                <div className="glass-pipeline-card card-teal-glow">
                  <div className="glass-card-icon icon-teal">
                    <TrendingUp size={24} />
                  </div>
                  <strong className="glass-card-title">Prediction</strong>
                  <p className="glass-card-desc">Likelihood to convert (0–100%)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="scroll-indicator-wrap">
            <button
              type="button"
              className="scroll-arrow-btn"
              onClick={() => scrollToSection('section-score')}
              aria-label="Scroll to next section"
            >
              <ChevronDown size={28} strokeWidth={2.2} className="scroll-down-arrow text-purple" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE SCORE (03 — THE SCORE)
         ========================================================================= */}
      <section className="story-block section-score" id="section-score">
        <div className="landing-max-width">
          <div className="story-split-grid">
            {/* Left Content */}
            <div className="story-text-col">
              <div className="story-step-badge badge-green">
                <span className="step-tag">03 — THE SCORE</span>
              </div>

              <h2 className="story-headline">
                Every lead gets <br />
                <span className="highlight-green">a score.</span>
              </h2>

              <p className="story-description">
                The prediction becomes a simple score from 0 to 100.
              </p>
            </div>

            {/* Right Visual: 78% prob -> 78 / 100 -> HIGH PRIORITY */}
            <div className="story-visual-col">
              <div className="score-transformation-board">
                {/* 1. Probability */}
                <div className="score-stage-card card-prob-ring">
                  <span className="stage-card-label">Conversion Probability</span>
                  <div className="radial-gauge-wrapper">
                    <div className="radial-gauge-inner">
                      <span className="radial-gauge-val">{sliderScore.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                <div className="stage-arrow">➔</div>

                {/* 2. Score 78 / 100 */}
                <div className="score-stage-card card-score-main">
                  <span className="stage-card-label">Lead Score</span>
                  <div className="score-main-number-group">
                    <span className="score-jumbo-number">{sliderScore.toFixed(0)}</span>
                    <span className="score-jumbo-denom">/ 100</span>
                  </div>

                  <div className="gauge-slider-container">
                    <div className="gauge-gradient-track">
                      <div
                        className="gauge-pointer-dot"
                        style={{ left: `${sliderScore}%` }}
                      ></div>
                    </div>
                    <div className="gauge-axis-labels">
                      <span>0</span>
                      <span>50</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>

                <div className="stage-arrow">➔</div>

                {/* 3. Priority Tier */}
                <div className="score-stage-card card-priority-trophy">
                  <span className="stage-card-label">Priority</span>
                  <div className="trophy-icon-wrapper">
                    <Trophy size={34} className="trophy-gold" />
                  </div>
                  <strong className="priority-trophy-text">HIGH PRIORITY</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="scroll-indicator-wrap">
            <button
              type="button"
              className="scroll-arrow-btn"
              onClick={() => scrollToSection('section-priority')}
              aria-label="Scroll to next section"
            >
              <ChevronDown size={28} strokeWidth={2.2} className="scroll-down-arrow text-emerald" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE PRIORITY (04 — THE PRIORITY)
         ========================================================================= */}
      <section className="story-block section-value" id="section-priority">
        <div className="landing-max-width">
          <div className="story-split-grid">
            {/* Left Content */}
            <div className="story-text-col">
              <div className="story-step-badge badge-amber">
                <span className="step-tag">04 — THE PRIORITY</span>
              </div>

              <h2 className="story-headline">
                Focus on the leads that <br />
                <span className="highlight-amber">matter most.</span>
              </h2>

              <p className="story-description">
                Use the score to decide which leads should be contacted first.
              </p>
            </div>

            {/* Right Visual: 91 -> HIGH, 76 -> HIGH, 48 -> MED, 21 -> LOW */}
            <div className="story-visual-col">
              <div className="business-table-card">
                <div className="table-header-row">
                  <span className="th-cell th-lead">Lead</span>
                  <span className="th-cell th-score">Lead Score</span>
                  <span className="th-cell th-priority">Priority</span>
                  <span className="th-cell th-action">Action</span>
                </div>

                <div className="table-body-rows">
                  {/* Lead A */}
                  <div className="table-lead-row row-high">
                    <div className="td-lead-cell">
                      <div className="lead-pill-avatar avatar-green">👤</div>
                      <span className="lead-title-text">Lead A</span>
                    </div>
                    <span className="td-score-cell text-green-glow">91</span>
                    <span className="td-priority-cell text-green-glow">HIGH</span>
                    <div className="td-action-cell">
                      <button type="button" className="btn-action-outline btn-prioritize-green">
                        Prioritize
                      </button>
                    </div>
                  </div>

                  {/* Lead B */}
                  <div className="table-lead-row row-high">
                    <div className="td-lead-cell">
                      <div className="lead-pill-avatar avatar-purple">👤</div>
                      <span className="lead-title-text">Lead B</span>
                    </div>
                    <span className="td-score-cell text-green-glow">76</span>
                    <span className="td-priority-cell text-green-glow">HIGH</span>
                    <div className="td-action-cell">
                      <button type="button" className="btn-action-outline btn-prioritize-green">
                        Prioritize
                      </button>
                    </div>
                  </div>

                  {/* Lead C */}
                  <div className="table-lead-row row-med">
                    <div className="td-lead-cell">
                      <div className="lead-pill-avatar avatar-amber">👤</div>
                      <span className="lead-title-text">Lead C</span>
                    </div>
                    <span className="td-score-cell text-amber-glow">48</span>
                    <span className="td-priority-cell text-amber-glow">MEDIUM</span>
                    <div className="td-action-cell">
                      <button type="button" className="btn-action-outline btn-nurture-amber">
                        Nurture
                      </button>
                    </div>
                  </div>

                  {/* Lead D */}
                  <div className="table-lead-row row-low">
                    <div className="td-lead-cell">
                      <div className="lead-pill-avatar avatar-red">👤</div>
                      <span className="lead-title-text">Lead D</span>
                    </div>
                    <span className="td-score-cell text-red-glow">21</span>
                    <span className="td-priority-cell text-red-glow">LOW</span>
                    <div className="td-action-cell">
                      <button type="button" className="btn-action-outline btn-low-red">
                        Low Priority
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL CTA SECTION
         ========================================================================= */}
      <section className="landing-callout-section" id="section-cta">
        <div className="landing-max-width text-center">
          <div className="callout-sparkle-badge">
            <Sparkles size={20} className="sparkle-cyan" />
          </div>

          <h2 className="callout-title">
            Ready to <span className="callout-highlight">score</span> a lead?
          </h2>

          <p className="callout-subtext">
            Start prioritizing your leads with the power of AI.
          </p>

          <div className="callout-buttons-group">
            <Link to="/predict" className="btn-callout-primary">
              <span>Score a Lead Now</span>
              <ArrowRight size={17} />
            </Link>

            <Link to="/about" className="btn-callout-ghost">
              <span>Explore the Model</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
