import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import './Outcome.css';

function CountUp({ value, duration = 1.5 }) {
  const match = value.match(/^(\d+\.?\d*)(.*)$/);
  const targetNum = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * targetNum));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, targetNum, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function AccentBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="outcome-accent-bar-wrapper">
      <motion.div
        className="outcome-accent-bar"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      />
    </div>
  );
}

const stats = [
  {
    number: '6',
    suffix: ' hrs',
    label: 'Saved per week',
    supporting: 'Less time on notes, logging, and admin. More time with families and referral partners.',
  },
  {
    number: '40',
    suffix: '%',
    label: 'More Closed Deals',
    supporting: 'From leads that were going cold before the next follow-up ever happened.',
  },
  {
    number: '2',
    suffix: 'x',
    label: 'Faster response time',
    supporting: 'Your team follows up before competing communities and agencies even open their laptop.',
  },
];

function Outcome() {
  {/* Commented out: "Meet Trilio" benefits section
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
  */}

  return (
    <motion.section
      id="outcome"
      className="outcome"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <div className="outcome-header">
          <h3>Designed to Drive These Results</h3>
        </div>
        {/* Commented out: "Meet Trilio, Your Sales Team's Sidekick" block and flip cards
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
        */}

        <motion.div
          className="outcome-stats-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="outcome-stat-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
            >
              <span className="outcome-stat-number-lg">
                <CountUp value={`${stat.number}${stat.suffix}`} />
              </span>
              <AccentBar />
              <span className="outcome-stat-label-lg">{stat.label}</span>
              <p className="outcome-stat-supporting">{stat.supporting}</p>
            </motion.div>
          ))}
        </motion.div>
{/* Removed disclaimer */}
      </div>
    </motion.section>
  );
}

export default Outcome;
