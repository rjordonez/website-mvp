import React from 'react';
import { motion } from 'framer-motion';
import './CTA.css';

function CTA() {
  return (
    <section className="cta">
      <div className="cta-inner">
        <motion.div
          className="cta-orb cta-orb-1"
          animate={{ x: [0, 200, -150, 100, 0], y: [0, -150, 100, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="cta-orb cta-orb-2"
          animate={{ x: [0, -200, 150, -80, 0], y: [0, 100, -150, 80, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="cta-orb cta-orb-3"
          animate={{ x: [0, 150, -200, 60, 0], y: [0, -100, 150, -80, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="cta-inner-noise"></div>
        <div className="cta-content">
          <h2>Focus on families.<br />We'll handle the details.</h2>
          <a href="https://calendly.com/jessie-trilio/30min" target="_blank" rel="noopener noreferrer" className="cta-button">Book a demo</a>
        </div>
      </div>
    </section>
  );
}

export default CTA;
