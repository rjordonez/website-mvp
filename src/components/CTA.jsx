import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import './CTA.css';

function CTA() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 20,
    stiffness: 100
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 10], {
    clamp: false
  });

  return (
    <section className="cta">
      <div className="cta-container">
        <motion.div
          className="cta-card"
          style={{ y: velocityFactor }}
        >
          <div className="cta-content">
            <h2>Revolutionize your sales operations for</h2>
            <ul className="cta-list">
              <li>Senior living placement specialists</li>
              <li>Assisted living locators</li>
              <li>In-home care & hospice referral teams</li>
              <li>High-performing sales directors inside communities</li>
            </ul>
          </div>
          <a href="https://calendly.com/jessie-trilio/30min" target="_blank" rel="noopener noreferrer" className="cta-button">Book Call</a>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;
