import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CTA.css';

function CTA() {
  return (
    <motion.section
      className="cta"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
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
          <h2>See It for Yourself</h2>
          <p className="cta-subtitle">A quick 20-minute demo. We will show you exactly how it works for your team.</p>
          <a href="https://calendly.com/jessie-trilio/30min" target="_blank" rel="noopener noreferrer" className="cta-button">Book a Demo</a>
        </div>
      </div>
    </motion.section>
  );
}

export default CTA;
