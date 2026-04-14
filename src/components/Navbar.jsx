import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashLink = (hash) => (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: hash } });
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.querySelector(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      window.history.replaceState({}, '');
    }
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className={`nav-container ${scrolled ? 'nav-scrolled' : 'nav-transparent'}`}>
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <div className="logo-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          Trilio
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li ref={dropdownRef} className="nav-dropdown">
            <button
              className="nav-dropdown-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Product
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginLeft: '4px',
                  transition: 'transform 0.2s',
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <Link to="/for/senior-living" onClick={() => setDropdownOpen(false)}>
                  For Senior Living Communities
                </Link>
                <Link to="/for/home-care" onClick={() => setDropdownOpen(false)}>
                  For Home Care Agencies
                </Link>
              </div>
            )}
          </li>
          <li><a href="#solution" onClick={handleHashLink('#solution')}>Features</a></li>
          <li><a href="#services" onClick={handleHashLink('#services')}>Services</a></li>
          <li><a href="#outcome" onClick={handleHashLink('#outcome')}>Outcomes</a></li>
        </ul>
        <a href="https://calendly.com/jessie-trilio/30min" target="_blank" rel="noopener noreferrer" className="nav-cta">Book a demo</a>

        <button
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/for/senior-living" onClick={() => setMobileMenuOpen(false)}>For Senior Living Communities</Link>
          <Link to="/for/home-care" onClick={() => setMobileMenuOpen(false)}>For Home Care Agencies</Link>
          <a href="#solution" onClick={handleHashLink('#solution')}>Features</a>
          <a href="#services" onClick={handleHashLink('#services')}>Services</a>
          <a href="#outcome" onClick={handleHashLink('#outcome')}>Outcomes</a>
          <a
            href="https://calendly.com/jessie-trilio/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu-cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a demo
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
