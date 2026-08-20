import React, { useState } from 'react';
import {
  Activity,
  UserCheck,
  Target,
  Sliders,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Info
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const INITIAL_FORM_STATE = {
  TotalVisits: 3,
  'Total Time Spent on Website': 300,
  'Page Views Per Visit': 2,
  'Lead Origin': 'Landing Page Submission',
  'Lead Source': 'Direct Traffic',
  'Do Not Email': 'No',
  'Do Not Call': 'No',
  Country: 'India',
  Specialization: 'Finance Management',
  'How did you hear about X Education': 'Online Search',
  'What is your current occupation': 'Working Professional',
  'What matters most to you in choosing a course': 'Better Career Prospects',
  Search: 'No',
  'Newspaper Article': 'No',
  'X Education Forums': 'No',
  Newspaper: 'No',
  'Digital Advertisement': 'No',
  'Through Recommendations': 'No',
  'Last Notable Activity': 'Email Opened',
  City: 'Mumbai',
  'A free copy of Mastering The Interview': 'No',
};

const HIGH_PRIORITY_SAMPLE = {
  TotalVisits: 10,
  'Total Time Spent on Website': 1200,
  'Page Views Per Visit': 5,
  'Lead Origin': 'Lead Add Form',
  'Lead Source': 'Reference',
  'Do Not Email': 'No',
  'Do Not Call': 'No',
  Country: 'India',
  Specialization: 'Finance Management',
  'How did you hear about X Education': 'Online Search',
  'What is your current occupation': 'Working Professional',
  'What matters most to you in choosing a course': 'Better Career Prospects',
  Search: 'No',
  'Newspaper Article': 'No',
  'X Education Forums': 'No',
  Newspaper: 'No',
  'Digital Advertisement': 'No',
  'Through Recommendations': 'No',
  'Last Notable Activity': 'SMS Sent',
  City: 'Mumbai',
  'A free copy of Mastering The Interview': 'No',
};

const LOW_PRIORITY_SAMPLE = {
  TotalVisits: 1,
  'Total Time Spent on Website': 15,
  'Page Views Per Visit': 1,
  'Lead Origin': 'Landing Page Submission',
  'Lead Source': 'Direct Traffic',
  'Do Not Email': 'Yes',
  'Do Not Call': 'No',
  Country: 'India',
  Specialization: 'Media and Advertising',
  'How did you hear about X Education': 'Word Of Mouth',
  'What is your current occupation': 'Unemployed',
  'What matters most to you in choosing a course': 'Better Career Prospects',
  Search: 'No',
  'Newspaper Article': 'No',
  'X Education Forums': 'No',
  Newspaper: 'No',
  'Digital Advertisement': 'No',
  'Through Recommendations': 'No',
  'Last Notable Activity': 'Email Bounced',
  City: 'Mumbai',
  'A free copy of Mastering The Interview': 'No',
};

export default function PredictPage() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value,
    }));
  };

  const handleScoreLead = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const parseNumericField = (val) => {
        if (val === '' || val === null || val === undefined) return null;
        const num = Number(val);
        return isNaN(num) ? null : num;
      };

      const parseCategoricalField = (val) => {
        if (
          val === '' ||
          val === null ||
          val === undefined ||
          val === 'not_provided' ||
          val === 'Not provided' ||
          val === 'Unknown' ||
          val === 'unknown'
        ) {
          return null;
        }
        return val;
      };

      const payload = {
        TotalVisits: parseNumericField(formData.TotalVisits),
        'Total Time Spent on Website': parseNumericField(formData['Total Time Spent on Website']),
        'Page Views Per Visit': parseNumericField(formData['Page Views Per Visit']),
        'Lead Origin': parseCategoricalField(formData['Lead Origin']),
        'Lead Source': parseCategoricalField(formData['Lead Source']),
        'Do Not Email': parseCategoricalField(formData['Do Not Email']),
        'Do Not Call': parseCategoricalField(formData['Do Not Call']),
        Country: parseCategoricalField(formData.Country),
        Specialization: parseCategoricalField(formData.Specialization),
        'How did you hear about X Education': parseCategoricalField(formData['How did you hear about X Education']),
        'What is your current occupation': parseCategoricalField(formData['What is your current occupation']),
        'What matters most to you in choosing a course': parseCategoricalField(formData['What matters most to you in choosing a course']),
        Search: parseCategoricalField(formData.Search),
        'Newspaper Article': parseCategoricalField(formData['Newspaper Article']),
        'X Education Forums': parseCategoricalField(formData['X Education Forums']),
        Newspaper: parseCategoricalField(formData.Newspaper),
        'Digital Advertisement': parseCategoricalField(formData['Digital Advertisement']),
        'Through Recommendations': parseCategoricalField(formData['Through Recommendations']),
        'Last Notable Activity': parseCategoricalField(formData['Last Notable Activity']),
        City: parseCategoricalField(formData.City),
        'A free copy of Mastering The Interview': parseCategoricalField(formData['A free copy of Mastering The Interview']),
      };

      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail
            ? typeof errorData.detail === 'string'
              ? errorData.detail
              : JSON.stringify(errorData.detail)
            : `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Prediction request error:', err);
      setError(err.message || 'Unable to connect to the prediction backend.');
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (sample) => {
    setFormData(sample);
    setError(null);
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setResult(null);
    setError(null);
  };

  const getPriorityTheme = (priority) => {
    switch (priority) {
      case 'High':
        return {
          bg: '#f0fdf4',
          border: '#86efac',
          text: '#15803d',
          badgeBg: '#dcfce7',
          badgeText: '#166534',
          badgeBorder: '#bbf7d0',
          barColor: '#22c55e',
        };
      case 'Medium':
        return {
          bg: '#fffbeb',
          border: '#fde68a',
          text: '#b45309',
          badgeBg: '#fef3c7',
          badgeText: '#92400e',
          badgeBorder: '#fde68a',
          barColor: '#f59e0b',
        };
      case 'Low':
      default:
        return {
          bg: '#fef2f2',
          border: '#fecaca',
          text: '#b91c1c',
          badgeBg: '#fee2e2',
          badgeText: '#991b1b',
          badgeBorder: '#fecaca',
          barColor: '#ef4444',
        };
    }
  };

  // Derive beginner-friendly explanation signals from the entered lead profile
  const getWhyThisScoreSignals = () => {
    const signals = [];

    // Engagement & time spent
    const timeSpent = formData['Total Time Spent on Website'];
    if (timeSpent !== null && timeSpent !== '' && !isNaN(Number(timeSpent))) {
      if (Number(timeSpent) >= 500) {
        signals.push('Strong website engagement');
      } else if (Number(timeSpent) < 60) {
        signals.push('Low website engagement');
      }
    }

    // Number of visits
    const visits = formData.TotalVisits;
    if (visits !== null && visits !== '' && !isNaN(Number(visits))) {
      if (Number(visits) >= 6) {
        signals.push('High number of visits');
      }
    }

    // Relevant lead source / origin
    if (
      formData['Lead Origin'] === 'Lead Add Form' ||
      formData['Lead Source'] === 'Reference' ||
      formData['Lead Source'] === 'Welingak Website'
    ) {
      signals.push('Relevant lead source');
    }

    // Occupation profile
    if (formData['What is your current occupation'] === 'Working Professional') {
      signals.push('Working professional background');
    }

    // Communication preferences / restrictions
    if (formData['Do Not Email'] === 'Yes') {
      signals.push('Email communication restricted');
    }
    if (formData['Do Not Call'] === 'Yes') {
      signals.push('Phone calls restricted');
    }

    // Last Notable Activity signal
    if (
      formData['Last Notable Activity'] === 'SMS Sent' ||
      formData['Last Notable Activity'] === 'Had a Phone Conversation' ||
      formData['Last Notable Activity'] === 'Approached upfront'
    ) {
      signals.push('Recent direct outreach engagement');
    } else if (
      formData['Last Notable Activity'] === 'Email Bounced' ||
      formData['Last Notable Activity'] === 'Unsubscribed' ||
      formData['Last Notable Activity'] === 'Unreachable'
    ) {
      signals.push('Inactive outreach status');
    }

    // Missing key information
    const isMissingKeyData =
      formData.TotalVisits === '' ||
      formData.TotalVisits === null ||
      formData['Total Time Spent on Website'] === '' ||
      formData['Total Time Spent on Website'] === null;

    if (isMissingKeyData && signals.length < 2) {
      signals.push('Missing information');
    }

    // Safe fallback if no specific signals matched
    if (signals.length === 0) {
      signals.push('The score is based on the lead information provided and the patterns learned by the ML model.');
    }

    return signals.slice(0, 3);
  };

  return (
    <div className="predict-page">
      {/* Page Header */}
      <header className="page-header">
        <div className="page-header-container">
          <h1 className="page-main-title">Lead Scoring Engine</h1>
          <p className="page-main-subtitle">
            Enter lead attributes below to calculate conversion probability, evaluate lead score (0–100), and determine priority level.
          </p>
        </div>
      </header>

      <div className="predict-container">
        {/* Presets Toolbar */}
        <div className="presets-wrapper">
          <div className="presets-card">
            <span className="presets-title">Quick Presets:</span>
            <div className="presets-actions">
              <button
                type="button"
                className="preset-btn btn-preset-high"
                onClick={() => loadSample(HIGH_PRIORITY_SAMPLE)}
              >
                High-Potential Lead
              </button>
              <button
                type="button"
                className="preset-btn btn-preset-low"
                onClick={() => loadSample(LOW_PRIORITY_SAMPLE)}
              >
                Low-Potential Lead
              </button>
              <button
                type="button"
                className="preset-btn btn-preset-reset"
                onClick={resetForm}
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        <div className="predict-workspace-grid">
          {/* LEFT: LEAD INPUT FORM */}
          <section className="form-column">
            <form onSubmit={handleScoreLead} className="form-card">
              <div className="form-card-header">
                <h2 className="card-heading">Lead Attributes</h2>
                <span className="card-subheading">Lead profile attributes and engagement metrics</span>
              </div>

              {/* Section 1: Engagement */}
              <div className="form-section-block">
                <div className="section-header">
                  <Activity size={16} className="section-icon text-blue" />
                  <h3 className="section-heading">Engagement</h3>
                </div>
                <div className="fields-grid grid-cols-2">
                  <div className="field-group">
                    <label htmlFor="TotalVisits">Total Visits (Optional)</label>
                    <input
                      id="TotalVisits"
                      name="TotalVisits"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="e.g. 10"
                      value={formData.TotalVisits ?? ''}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="TotalTime">Time on Website (sec, Optional)</label>
                    <input
                      id="TotalTime"
                      name="Total Time Spent on Website"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="e.g. 850"
                      value={formData['Total Time Spent on Website'] ?? ''}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field-group full-width">
                    <label htmlFor="PageViews">Page Views Per Visit (Optional)</label>
                    <input
                      id="PageViews"
                      name="Page Views Per Visit"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="e.g. 4"
                      value={formData['Page Views Per Visit'] ?? ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Lead Profile */}
              <div className="form-section-block">
                <div className="section-header">
                  <UserCheck size={16} className="section-icon text-indigo" />
                  <h3 className="section-heading">Lead Profile</h3>
                </div>
                <div className="fields-grid grid-cols-2">
                  <div className="field-group">
                    <label htmlFor="LeadOrigin">Lead Origin</label>
                    <select
                      id="LeadOrigin"
                      name="Lead Origin"
                      value={formData['Lead Origin'] ?? ''}
                      onChange={handleChange}
                    >
                      <option value="Landing Page Submission">Landing Page Submission</option>
                      <option value="Lead Add Form">Lead Add Form</option>
                      <option value="API">API</option>
                      <option value="Lead Import">Lead Import</option>
                      <option value="Quick Add Form">Quick Add Form</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label htmlFor="LeadSource">Lead Source</label>
                    <select
                      id="LeadSource"
                      name="Lead Source"
                      value={formData['Lead Source'] ?? ''}
                      onChange={handleChange}
                    >
                      <option value="Direct Traffic">Direct Traffic</option>
                      <option value="Google">Google</option>
                      <option value="Organic Search">Organic Search</option>
                      <option value="Reference">Reference</option>
                      <option value="Olark Chat">Olark Chat</option>
                      <option value="Welingak Website">Welingak Website</option>
                      <option value="Referral Sites">Referral Sites</option>
                      <option value="Facebook">Facebook</option>
                      <option value="bing">bing</option>
                      <option value="Click2call">Click2call</option>
                      <option value="Live Chat">Live Chat</option>
                      <option value="Press_Release">Press Release</option>
                      <option value="WeLearn">WeLearn</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label htmlFor="Occupation">Current Occupation</label>
                    <select
                      id="Occupation"
                      name="What is your current occupation"
                      value={formData['What is your current occupation'] ?? ''}
                      onChange={handleChange}
                    >
                      <option value="Working Professional">Working Professional</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Student">Student</option>
                      <option value="Businessman">Businessman</option>
                      <option value="Housewife">Housewife</option>
                      <option value="Other">Other</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label htmlFor="Specialization">Specialization</label>
                    <select
                      id="Specialization"
                      name="Specialization"
                      value={formData.Specialization ?? ''}
                      onChange={handleChange}
                    >
                      <option value="Finance Management">Finance Management</option>
                      <option value="Human Resource Management">Human Resource Management</option>
                      <option value="Marketing Management">Marketing Management</option>
                      <option value="Operations Management">Operations Management</option>
                      <option value="Business Administration">Business Administration</option>
                      <option value="IT Projects Management">IT Projects Management</option>
                      <option value="Supply Chain Management">Supply Chain Management</option>
                      <option value="Banking, Investment And Insurance">Banking, Investment & Insurance</option>
                      <option value="Media and Advertising">Media and Advertising</option>
                      <option value="Travel and Tourism">Travel and Tourism</option>
                      <option value="International Business">International Business</option>
                      <option value="Healthcare Management">Healthcare Management</option>
                      <option value="Hospitality Management">Hospitality Management</option>
                      <option value="E-COMMERCE">E-COMMERCE</option>
                      <option value="Retail Management">Retail Management</option>
                      <option value="Rural and Agribusiness">Rural & Agribusiness</option>
                      <option value="E-Business">E-Business</option>
                      <option value="Services Excellence">Services Excellence</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label htmlFor="City">City</label>
                    <select
                      id="City"
                      name="City"
                      value={formData.City ?? ''}
                      onChange={handleChange}
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Thane & Outskirts">Thane & Outskirts</option>
                      <option value="Other Metro Cities">Other Metro Cities</option>
                      <option value="Other Cities of Maharashtra">Other Cities of Maharashtra</option>
                      <option value="Other Cities">Other Cities</option>
                      <option value="Tier II Cities">Tier II Cities</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label htmlFor="Country">Country</label>
                    <select
                      id="Country"
                      name="Country"
                      value={formData.Country ?? ''}
                      onChange={handleChange}
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Australia">Australia</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Qualification */}
              <div className="form-section-block">
                <div className="section-header">
                  <Target size={16} className="section-icon text-emerald" />
                  <h3 className="section-heading">Qualification</h3>
                </div>
                <div className="fields-grid grid-cols-2">
                  <div className="field-group">
                    <label htmlFor="LastNotableActivity">Last Notable Activity</label>
                    <select
                      id="LastNotableActivity"
                      name="Last Notable Activity"
                      value={formData['Last Notable Activity'] ?? ''}
                      onChange={handleChange}
                    >
                      <option value="SMS Sent">SMS Sent</option>
                      <option value="Email Opened">Email Opened</option>
                      <option value="Page Visited on Website">Page Visited on Website</option>
                      <option value="Olark Chat Conversation">Olark Chat Conversation</option>
                      <option value="Modified">Modified</option>
                      <option value="Email Link Clicked">Email Link Clicked</option>
                      <option value="Had a Phone Conversation">Had a Phone Conversation</option>
                      <option value="Email Bounced">Email Bounced</option>
                      <option value="Unsubscribed">Unsubscribed</option>
                      <option value="Unreachable">Unreachable</option>
                      <option value="Approached upfront">Approached upfront</option>
                      <option value="Email Received">Email Received</option>
                      <option value="Resubscribed to emails">Resubscribed to emails</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label htmlFor="HowHeard">How did you hear about course?</label>
                    <select
                      id="HowHeard"
                      name="How did you hear about X Education"
                      value={formData['How did you hear about X Education'] ?? ''}
                      onChange={handleChange}
                    >
                      <option value="Online Search">Online Search</option>
                      <option value="Word Of Mouth">Word Of Mouth</option>
                      <option value="Student of SomeSchool">Student of SomeSchool</option>
                      <option value="Multiple Sources">Multiple Sources</option>
                      <option value="Advertisements">Advertisements</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Email">Email</option>
                      <option value="SMS">SMS</option>
                      <option value="Other">Other</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>

                  <div className="field-group full-width">
                    <label htmlFor="CourseMatters">Course Priority Goal</label>
                    <select
                      id="CourseMatters"
                      name="What matters most to you in choosing a course"
                      value={formData['What matters most to you in choosing a course'] ?? ''}
                      onChange={handleChange}
                    >
                      <option value="Better Career Prospects">Better Career Prospects</option>
                      <option value="Flexibility & Convenience">Flexibility & Convenience</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 4: Communication Preferences */}
              <div className="form-section-block">
                <div className="section-header">
                  <Sliders size={16} className="section-icon text-purple" />
                  <h3 className="section-heading">Communication Preferences</h3>
                </div>
                <div className="fields-grid grid-cols-2">
                  <div className="field-group">
                    <label htmlFor="DoNotEmail">Do Not Email</label>
                    <select
                      id="DoNotEmail"
                      name="Do Not Email"
                      value={formData['Do Not Email'] ?? ''}
                      onChange={handleChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label htmlFor="DoNotCall">Do Not Call</label>
                    <select
                      id="DoNotCall"
                      name="Do Not Call"
                      value={formData['Do Not Call'] ?? ''}
                      onChange={handleChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label htmlFor="FreeInterviewCopy">Interview Copy Request</label>
                    <select
                      id="FreeInterviewCopy"
                      name="A free copy of Mastering The Interview"
                      value={formData['A free copy of Mastering The Interview'] ?? ''}
                      onChange={handleChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label htmlFor="SearchChannel">Search Channel</label>
                    <select
                      id="SearchChannel"
                      name="Search"
                      value={formData.Search ?? ''}
                      onChange={handleChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label htmlFor="DigitalAd">Digital Ad Referral</label>
                    <select
                      id="DigitalAd"
                      name="Digital Advertisement"
                      value={formData['Digital Advertisement'] ?? ''}
                      onChange={handleChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label htmlFor="Recommendations">Recommendations</label>
                    <select
                      id="Recommendations"
                      name="Through Recommendations"
                      value={formData['Through Recommendations'] ?? ''}
                      onChange={handleChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                      <option value="">Not provided</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="submit-bar">
                <button
                  type="submit"
                  className="score-cta-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="btn-loading-content">
                      <span className="btn-spinner"></span>
                      Scoring Lead...
                    </span>
                  ) : (
                    <span className="btn-content">
                      Score Lead <ArrowRight size={17} />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* RIGHT: PREDICTION RESULT */}
          <aside className="result-column">
            {error && (
              <div className="alert-card error-alert">
                <div className="alert-header">
                  <AlertCircle size={18} className="text-red" />
                  <h4>Prediction Error</h4>
                </div>
                <p className="alert-message">{error}</p>
              </div>
            )}

            {/* RESULT CARD — SHOWN ONLY AFTER SUCCESSFUL PREDICTION */}
            {result && !loading && (
              <div
                className="prediction-result-card"
                style={{
                  backgroundColor: getPriorityTheme(result.priority).bg,
                  borderColor: getPriorityTheme(result.priority).border,
                }}
              >
                <div className="result-top-bar">
                  <span className="result-badge-label">Lead Prediction</span>
                  <span
                    className="priority-pill"
                    style={{
                      backgroundColor: getPriorityTheme(result.priority).badgeBg,
                      color: getPriorityTheme(result.priority).badgeText,
                      borderColor: getPriorityTheme(result.priority).badgeBorder,
                    }}
                  >
                    {result.priority.toUpperCase()}
                  </span>
                </div>

                <div className="score-hero">
                  <div className="score-value-row">
                    <span
                      className="score-big-number"
                      style={{ color: getPriorityTheme(result.priority).text }}
                    >
                      {result.lead_score.toFixed(1)}
                    </span>
                    <span className="score-denominator">/ 100</span>
                  </div>
                  <span className="score-hero-label">Lead Score</span>
                </div>

                {/* Probability Gauge Visualization */}
                <div className="gauge-section">
                  <div className="gauge-header">
                    <span className="gauge-label">Conversion Probability</span>
                    <span className="gauge-percentage">
                      {(result.conversion_probability * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="gauge-track">
                    <div
                      className="gauge-fill"
                      style={{
                        width: `${Math.min(Math.max(result.conversion_probability * 100, 2), 100)}%`,
                        backgroundColor: getPriorityTheme(result.priority).barColor,
                      }}
                    ></div>
                  </div>
                  <div className="gauge-markers">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="result-metrics-grid">
                  <div className="result-metric-item">
                    <span className="metric-name">Conversion Probability</span>
                    <strong className="metric-val">
                      {(result.conversion_probability * 100).toFixed(2)}%
                    </strong>
                  </div>
                  <div className="result-metric-item">
                    <span className="metric-name">Priority</span>
                    <strong className="metric-val">{result.priority}</strong>
                  </div>
                </div>

                {/* Why this score? Signals */}
                {getWhyThisScoreSignals().length > 0 && (
                  <div className="signals-box">
                    <span className="signals-title">Why this score?</span>
                    <ul className="signals-list">
                      {getWhyThisScoreSignals().map((sig, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={13} className="signal-icon" />
                          <span>{sig}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Empty state when no prediction made yet */}
            {!result && !loading && !error && (
              <div className="idle-placeholder-card">
                <div className="idle-icon-wrapper">
                  <Target size={24} />
                </div>
                <h3 className="idle-title">Ready to Predict</h3>
                <p className="idle-description">
                  Fill in lead details on the left or select a sample preset above, then click <strong>Score Lead →</strong> to evaluate conversion potential.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
