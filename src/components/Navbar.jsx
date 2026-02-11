import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">YourBrand</div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#problem">Problem</a></li>
          <li><a href="#highlights">Highlights</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#footer">Contact</a></li>
        </ul>
        <button className="cta-button">Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;
