import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sparkles, Menu, X, ArrowRight, Zap, Target, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="dark-navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-brand" onClick={closeMobileMenu}>
          <div className="nav-brand-badge">
            <Sparkles size={16} />
          </div>
          <span className="nav-brand-text">
            LeadScore <span className="nav-brand-accent">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            Home
          </NavLink>
          <NavLink
            to="/predict"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            Score a Lead
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            About Model
          </NavLink>
        </nav>

        {/* Desktop Quick CTA */}
        <div className="nav-desktop-cta">
          <Link to="/predict" className="nav-cta-btn">
            <span>Score Lead</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}
            onClick={closeMobileMenu}
          >
            <Zap size={16} />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/predict"
            className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}
            onClick={closeMobileMenu}
          >
            <Target size={16} />
            <span>Score a Lead</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}
            onClick={closeMobileMenu}
          >
            <BookOpen size={16} />
            <span>About Model</span>
          </NavLink>
          <div className="mobile-cta-wrapper">
            <Link to="/predict" className="mobile-cta-btn" onClick={closeMobileMenu}>
              Score a Lead Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
