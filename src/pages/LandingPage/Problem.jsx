import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Problem.css';

function Problem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const problems = [
    {
      text: "Families' needs change frequently",
      detail: "What a family wants today may shift tomorrow. Without a system that adapts, important context gets lost."
    },
    {
      text: "Follow-ups are hard to track across multiple prospects",
      detail: "Juggling dozens of families at different stages means details slip through the cracks."
    },
    {
      text: "Sales teams are on the move with limited time to capture details",
      detail: "Between tours, calls, and events, there's little time to sit at a desk and log notes."
    }
  ];

  const startAutoPlay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % problems.length);
    }, 4000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = (index) => {
    setActiveIndex(index);
    startAutoPlay();
  };

  return (
    <section id="problem" className="problem">
      <div className="container">
        <div className="problem-header">
          <h3>Senior Living Sales Is the Hardest Sale</h3>
          <p>Every conversation is personal, timelines are unpredictable,<br />and trust is earned one family at a time.</p>
        </div>
        <div className="problem-carousel">
          <div className="problem-nav">
            {problems.map((problem, index) => (
              <button
                key={index}
                className={`problem-nav-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleClick(index)}
              >
                <span className="problem-x">✕</span>
                <span>{problem.text}</span>
              </button>
            ))}
          </div>
          <div className="problem-detail">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="problem-detail-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <p>{problems[activeIndex].detail}</p>
              </motion.div>
            </AnimatePresence>
            <div className="problem-progress">
              {problems.map((_, index) => (
                <div
                  key={index}
                  className={`problem-progress-dot ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => handleClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Problem;
