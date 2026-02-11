import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <motion.div
          className="blur-orb blur-orb-1"
          animate={{
            x: [0, 400, -300, 200, 0],
            y: [0, -300, 250, -100, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="blur-orb blur-orb-2"
          animate={{
            x: [0, -400, 300, -150, 0],
            y: [0, 300, -250, 150, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="blur-orb blur-orb-3"
          animate={{
            x: [0, 250, -400, 100, 0],
            y: [0, -250, 300, -150, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="blur-orb blur-orb-4"
          animate={{
            x: [0, -350, 200, -100, 0],
            y: [0, 200, -300, 100, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="blur-orb blur-orb-5"
          animate={{
            x: [0, 300, -250, 150, 0],
            y: [0, -200, 350, -100, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="blur-orb blur-orb-6"
          animate={{
            x: [0, -200, 350, -100, 0],
            y: [0, 250, -200, 150, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="hero-content">
          <p className="hero-subtitle">The final step in your sales workflow for retirement homes.</p>
          <h1>Never miss a lead, from first call to move-in</h1>
          <div className="hero-bottom">
            <p className="hero-description">A voice-first, mobile CRM with rich profiles, personalized follow-up, and 24/7 call coverage built for senior living sales.</p>
            <div className="hero-buttons">
              <button className="hero-btn">Request a demo</button>
              <button className="hero-btn">Join early waitlist</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
