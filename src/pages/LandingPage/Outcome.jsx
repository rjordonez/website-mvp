import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Outcome.css';

function Outcome() {
  const [flipped, setFlipped] = useState([false, false, false]);

  const benefits = [
    {
      title: "More time building relationships",
      back: "Spend less time on admin and more time where it matters, with families who need your guidance."
    },
    {
      title: "Families feel supported",
      back: "Every family feels remembered and cared for because your follow-ups are timely, personal, and consistent."
    },
    {
      title: <>No lead slips through<br />the cracks</>,
      back: "Automated follow-ups and smart reminders mean higher conversions and stronger trust with every prospect."
    }
  ];

  const handleFlip = (index) => {
    setFlipped(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="outcome" className="outcome">
      <div className="container">
        <div className="outcome-header">
          <h3>Meet Trilio, Your Sales Team's Sidekick</h3>
          <p>Trilio drives measurable results for your team.</p>
        </div>
        <motion.div
          className="outcome-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className={`outcome-flip ${flipped[index] ? 'flipped' : ''}`}
              variants={cardVariants}
              onClick={() => handleFlip(index)}
            >
              <div className="outcome-flip-inner">
                <div className="outcome-flip-front">
                  <h4>{benefit.title}</h4>
                  <span className="outcome-flip-hint">Click to learn more</span>
                </div>
                <div className="outcome-flip-back">
                  <p>{benefit.back}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="outcome-stat"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="outcome-stat-item">
            <span className="outcome-stat-number">3x</span>
            <span className="outcome-stat-label">faster follow-ups</span>
          </div>
          <div className="outcome-stat-divider" />
          <div className="outcome-stat-item">
            <span className="outcome-stat-number">50%</span>
            <span className="outcome-stat-label">less time on admin</span>
          </div>
          <div className="outcome-stat-divider" />
          <div className="outcome-stat-item">
            <span className="outcome-stat-number">2x</span>
            <span className="outcome-stat-label">more family touchpoints</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Outcome;
