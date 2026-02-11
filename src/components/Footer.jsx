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
                <h4>Pages</h4>
                <ul>
                  <li><a href="#hero">Home</a></li>
                  <li><a href="#problem">Problem</a></li>
                  <li><a href="#overview">Overview</a></li>
                  <li><a href="#highlights">Highlights</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#faq">FAQ</a></li>
                  <li><a href="mailto:jessie.growth@gmail.com">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 Trilio</p>
            </div>
          </div>
        </div>
        <div className="footer-logo-large">
          <div className="footer-logo-dots-large">
            <span className="footer-dot-large"></span>
            <span className="footer-dot-large"></span>
            <span className="footer-dot-large"></span>
          </div>
          Trilio
        </div>
      </div>
    </footer>
  );
}

export default Footer;
