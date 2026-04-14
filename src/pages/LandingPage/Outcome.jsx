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

function FlowPill({ delay, inView, x, y, width, height, rx, textX, textY, fontSize, fontWeight = 500, stroke = '#d4d4c8', strokeWidth = 1, textFill = '#4b5563', children }) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ delay, duration: 0.45, ease: 'easeOut' }}
    >
      <rect x={x} y={y} width={width} height={height} rx={rx} fill="#ffffff" stroke={stroke} strokeWidth={strokeWidth} />
      <text x={textX} y={textY} textAnchor="middle" fontSize={fontSize} fill={textFill} fontWeight={fontWeight}>
        {children}
      </text>
    </motion.g>
  );
}

function FlowLine({ d, delay, inView }) {
  return (
    <motion.path
      d={d}
      stroke="#c9c7bc"
      strokeWidth="1.25"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeInOut' }}
    />
  );
}

function FlowChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const T = {
    leads: 0,
    linesOut: 0.35,
    fanPills: 0.7,
    linesIn: 1.15,
    trilio: 1.55,
    lineToFollowUp: 1.9,
    followUp: 2.1,
    lineToContract: 2.4,
    contract: 2.6,
  };

  return (
    <motion.div
      ref={ref}
      className="outcome-flow-wrapper"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="outcome-flow-heading">
        <h4>From lead to closed deal</h4>
        <p>Trilio pulls every source into one pipeline — so nothing slips through.</p>
      </div>
      <div className="outcome-flow-chart">
        <svg
          viewBox="0 0 1000 340"
          preserveAspectRatio="xMidYMid meet"
          className="outcome-flow-svg"
          role="img"
          aria-label="Flow chart: leads from multiple sources route into Trilio, which follows up and closes the deal"
        >
          <g fontFamily="Inter, system-ui, -apple-system, sans-serif">
            <FlowPill
              delay={T.leads} inView={inView}
              x={20} y={150} width={100} height={40} rx={20}
              textX={70} textY={175} fontSize={14} fontWeight={500}
              stroke="#1f2937" strokeWidth={1.5} textFill="#1f2937"
            >Leads</FlowPill>

            <FlowLine d="M 120 170 C 160 170, 180 50, 220 50" delay={T.linesOut} inView={inView} />
            <FlowLine d="M 120 170 C 160 170, 180 110, 220 110" delay={T.linesOut + 0.05} inView={inView} />
            <FlowLine d="M 120 170 L 220 170" delay={T.linesOut + 0.1} inView={inView} />
            <FlowLine d="M 120 170 C 160 170, 180 230, 220 230" delay={T.linesOut + 0.15} inView={inView} />
            <FlowLine d="M 120 170 C 160 170, 180 290, 220 290" delay={T.linesOut + 0.2} inView={inView} />

            <FlowPill
              delay={T.fanPills} inView={inView}
              x={220} y={32} width={200} height={36} rx={18}
              textX={320} textY={55} fontSize={13}
            >Meta Ads</FlowPill>
            <FlowPill
              delay={T.fanPills + 0.07} inView={inView}
              x={220} y={92} width={200} height={36} rx={18}
              textX={320} textY={115} fontSize={13}
            >A Place for Mom</FlowPill>
            <FlowPill
              delay={T.fanPills + 0.14} inView={inView}
              x={220} y={152} width={200} height={36} rx={18}
              textX={320} textY={175} fontSize={13}
            >Seniorly</FlowPill>
            <FlowPill
              delay={T.fanPills + 0.21} inView={inView}
              x={220} y={212} width={200} height={36} rx={18}
              textX={320} textY={235} fontSize={13}
            >Caring.com</FlowPill>
            <FlowPill
              delay={T.fanPills + 0.28} inView={inView}
              x={220} y={272} width={200} height={36} rx={18}
              textX={320} textY={295} fontSize={13}
            >Referrals</FlowPill>

            <FlowLine d="M 420 50 C 460 50, 470 170, 510 170" delay={T.linesIn} inView={inView} />
            <FlowLine d="M 420 110 C 460 110, 480 170, 510 170" delay={T.linesIn + 0.05} inView={inView} />
            <FlowLine d="M 420 170 L 510 170" delay={T.linesIn + 0.1} inView={inView} />
            <FlowLine d="M 420 230 C 460 230, 480 170, 510 170" delay={T.linesIn + 0.15} inView={inView} />
            <FlowLine d="M 420 290 C 460 290, 470 170, 510 170" delay={T.linesIn + 0.2} inView={inView} />

            <FlowPill
              delay={T.trilio} inView={inView}
              x={510} y={147} width={100} height={46} rx={10}
              textX={560} textY={176} fontSize={15} fontWeight={700}
              stroke="#4B6EF5" strokeWidth={2} textFill="#1f2937"
            >Trilio</FlowPill>

            <FlowLine d="M 610 170 L 650 170" delay={T.lineToFollowUp} inView={inView} />

            <FlowPill
              delay={T.followUp} inView={inView}
              x={650} y={152} width={170} height={36} rx={18}
              textX={735} textY={175} fontSize={13}
            >Follow-up & close</FlowPill>

            <FlowLine d="M 820 170 L 860 170" delay={T.lineToContract} inView={inView} />

            <FlowPill
              delay={T.contract} inView={inView}
              x={860} y={150} width={120} height={40} rx={20}
              textX={920} textY={175} fontSize={14} fontWeight={500}
              stroke="#1f2937" strokeWidth={1.5} textFill="#1f2937"
            >$10K+ Contract</FlowPill>
          </g>
        </svg>
      </div>
    </motion.div>
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
        <FlowChart />

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

        <div className="outcome-cta">
          <p className="outcome-cta-text">Ready to drive these results for your team?</p>
          <a
            href="https://calendly.com/jessie-trilio/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="outcome-cta-button"
          >
            Talk to us
          </a>
        </div>
      </div>
    </motion.section>
  );
}

export default Outcome;
