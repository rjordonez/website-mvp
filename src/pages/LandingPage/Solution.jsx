import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Solution.css';

function Solution() {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: "Easy On the Go & Simple to Learn",
      description: "Log tours, calls, or meetings in a few taps or speak your notes out loud. So intuitive that even team members with no tech experience can start immediately.",
      image: "/1.png"
    },
    {
      title: "Smart AI Assistant",
      description: "Your AI sidekick organizes notes, tracks family preferences, manages follow-ups, and surfaces insights exactly when you need them.",
      image: "/2.png"
    },
    {
      title: "Follow-Ups on Autopilot",
      description: "Reminders, texts, and emails go out at the right time to keep every relationship moving forward without extra effort.",
      image: "/3.png"
    }
  ];

  return (
    <section id="solution" className="solution">
      <div className="container">
        <div className="solution-header">
          <h3>Why Senior Living Sales Teams Choose Trilio</h3>
          <p>Built for the real world of senior living sales, where trust matters,<br />timelines change, and emotions run high.</p>
        </div>
        <div className="solution-split">
          <div className="solution-left">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`solution-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <h4>{feature.title}</h4>
                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      className="solution-item-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p>{feature.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div className="solution-right">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={features[activeIndex].image}
                alt={features[activeIndex].title}
                className="solution-preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Solution;
