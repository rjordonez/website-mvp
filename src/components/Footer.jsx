import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-outer">
        <motion.div
          className="footer-blur-orb footer-blur-orb-1"
          animate={{
            x: [0, 300, -200, 0],
            y: [0, -250, 200, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="footer-blur-orb footer-blur-orb-2"
          animate={{
            x: [0, -300, 250, 0],
            y: [0, 250, -200, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="footer-blur-orb footer-blur-orb-3"
          animate={{
            x: [0, 200, -300, 0],
            y: [0, -200, 250, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="footer-inner">
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
