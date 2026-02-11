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
          className="blur-orb blur-orb-2"
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
          className="blur-orb blur-orb-3"
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
      </div>
    </section>
  );
}

export default Hero;
