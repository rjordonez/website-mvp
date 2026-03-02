import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <div className="logo-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          Trilio
        </div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#solution">Features</a></li>
          <li><a href="#problem">The Challenge</a></li>
          <li><a href="#outcome">Outcomes</a></li>
          <li><a href="#who">Who It's For</a></li>
        </ul>
        <a href="https://calendly.com/jessie-trilio/30min" target="_blank" rel="noopener noreferrer" className="nav-cta">Book a demo</a>
      </div>
    </nav>
  );
}

export default Navbar;
