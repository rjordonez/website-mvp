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

  return (
    <video
      ref={videoRef}
      src={src}
      className={`solution-preview${index === 0 ? ' solution-preview-zoomed' : ''}`}
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
      title: "Easy On the Go & Simple to Learn",
      description: "Log tours, calls, or meetings in a few taps or speak your notes out loud. So intuitive that even team members with no tech experience can start immediately.",
      video: "/1vid.mov"
    },
    {
      title: "Smart AI Assistant",
      description: "Your AI sidekick organizes notes, tracks family preferences, manages follow-ups, and surfaces insights exactly when you need them.",
      video: "/2vid.mov"
    },
    {
      title: "Follow-Ups on Autopilot",
      description: "Reminders, texts, and emails go out at the right time to keep every relationship moving forward without extra effort.",
      video: "/3vid.mov"
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Solution;
