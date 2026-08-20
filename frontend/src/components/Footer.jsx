import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-brand-tag">
          <Sparkles size={14} className="footer-sparkle" />
          <span className="footer-text">LeadScore AI · React · FastAPI · XGBoost</span>
        </div>
      </div>
    </footer>
  );
}
