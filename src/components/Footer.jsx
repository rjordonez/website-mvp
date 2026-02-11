import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>YourBrand</h3>
            <p>Building the future of productivity</p>
          </div>
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#updates">Updates</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Connect</h4>
            <ul>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
              <li><a href="#github">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 YourBrand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
