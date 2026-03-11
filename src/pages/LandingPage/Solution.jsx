import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Solution.css';

function SolutionVideo({ src, index }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.currentTime = 0;

    if (index === 1) {
      el.playbackRate = 1.5;
    }

    el.play().catch(() => {});

    if (index === 0) {
      const handleTimeUpdate = () => {
        if (el.currentTime >= 6) {
          el.currentTime = 0;
        }
      };
      el.addEventListener('timeupdate', handleTimeUpdate);
      return () => el.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, [src, index]);

  if (!src) {
    return (
      <div className="solution-preview solution-placeholder">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="23" stroke="#d1d5db" strokeWidth="2" fill="white"/>
          <path d="M19 15l14 9-14 9V15z" fill="#d1d5db"/>
        </svg>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 500, marginTop: '0.75rem' }}>
          Product Demo Coming Soon
        </span>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      className={`solution-preview${index === 1 ? ' solution-preview-cropped' : ''}`}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
    />
  );
}

function Solution() {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: "Voice-First Logging",
      description: "On a tour, at an event, between calls. Speak your notes out loud and Trilio logs everything instantly. No typing. No desk. No end-of-day catch-up.",
      video: "/5vid.mov"
    },
    {
      title: "AI Assistant",
      description: "Every detail from every conversation, remembered. Walk into every call knowing exactly who you are talking to, what matters to them, and where you left off.",
      video: "/2vid.mov"
    },
    {
      title: "Follow-Ups on Autopilot",
      description: "Reminders, texts, and emails go out at the right time to keep every relationship moving forward. No manual tracking. No leads going cold. No effort required.",
      video: "/3vid.mov"
    },
    {
      title: "Performance Insights",
      description: "See your full sales motion at a glance. Spot follow-up gaps, track team activity, and make decisions based on what is actually working.",
      video: "/4vid.mov"
    }
  ];

  return (
    <motion.section
      id="solution"
      className="solution"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <div className="solution-header">
          <h3>Finally, a CRM That Works the Way You Do.</h3>
          <p>Built for the real world of senior living sales,<br />where trust matters, timelines shift, and every family is different.</p>
        </div>
        <div className="solution-split">
          <motion.div
            className="solution-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
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
          </motion.div>
          <motion.div
            className="solution-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="solution-video-wrapper"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <SolutionVideo
                  src={features[activeIndex].video}
                  index={activeIndex}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Solution;
