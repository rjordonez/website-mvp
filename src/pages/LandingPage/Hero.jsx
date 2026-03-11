import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const heroChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function Hero() {
  const scrollToICP = () => {
    const icpSection = document.getElementById('icp-paths');
    if (icpSection) {
      icpSection.scrollIntoView({ behavior: 'smooth' });
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
        <motion.div
          className="hero-content"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-backed" variants={heroChild}>
            <span className="hero-backed-label">BACKED BY:</span>
            <div className="hero-backed-logos">
              <img src="/techstars.png" alt="Techstars" className="hero-backed-logo hero-backed-logo-techstars" />
              <img src="/usc.png" alt="USC" className="hero-backed-logo hero-backed-logo-usc" />
            </div>
          </motion.div>
          <motion.h1 variants={heroChild}>The CRM Built for</motion.h1>
          <motion.h1 variants={heroChild} style={{ marginTop: '-0.5rem' }}>Senior Living Sales</motion.h1>
          <motion.p className="hero-subtitle" variants={heroChild}>Log by voice. Follow up automatically. Know which leads are worth your time. All from your phone.</motion.p>
          <motion.div className="hero-buttons" variants={heroChild}>
            <a href="https://calendly.com/jessie-trilio/30min" target="_blank" rel="noopener noreferrer" className="hero-btn">Book a Demo</a>
            <Link to="/demo" className="hero-btn-secondary">See How It Works</Link>
          </motion.div>
        </motion.div>
        <motion.button
          className="scroll-indicator"
          onClick={scrollToICP}
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
