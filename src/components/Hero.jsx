import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

function Hero() {
  const scrollToNext = () => {
    const backedSection = document.getElementById('backed');
    if (backedSection) {
      backedSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <p className="hero-subtitle">Voice-first CRM built for senior living sales teams.</p>
          <h1>Never miss a lead, from first call to move-in</h1>
          <div className="hero-bottom">
            <p className="hero-description">The final step in your sales workflow for retirement homes.</p>
            <div className="hero-buttons">
              <button className="hero-btn">Request a demo</button>
            </div>
          </div>
        </div>
        <motion.button
          className="scroll-indicator"
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L12 20M12 20L6 14M12 20L18 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
    </section>
  );
}

export default Hero;
