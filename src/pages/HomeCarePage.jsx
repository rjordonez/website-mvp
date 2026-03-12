import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';

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
    <div ref={ref} style={{ width: '60px', height: '3px', margin: '1.25rem 0', overflow: 'hidden' }}>
      <motion.div
        style={{ width: '100%', height: '100%', background: '#4B6EF5', transformOrigin: 'left center' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      />
    </div>
  );
}

const heroStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const heroChild = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const sectionStyle = {
  padding: '8rem 2rem',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const labelStyle = {
  fontSize: '0.8rem',
  letterSpacing: '0.1em',
  color: '#4B6EF5',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginBottom: '0.75rem',
};

const sectionHeadingStyle = {
  fontSize: '2.5rem',
  color: '#1f2937',
  fontWeight: 300,
  fontFamily: "'Playfair Display', serif",
  margin: '0 0 0.75rem',
};

const sectionSubtextStyle = {
  fontSize: '1.05rem',
  color: '#6b7280',
  lineHeight: 1.6,
  maxWidth: '700px',
};

const iconContainerStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  background: '#eef2ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const featureIconStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '10px',
  background: '#eef2ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1rem',
};

// Pain point icons
const IconHandshake = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.22 19.85c-.18.18-.5.21-.71 0L5.08 13.4a2.96 2.96 0 010-4.19l3.53-3.53c.59-.59 1.53-.59 2.12 0l.71.71-2.83 2.83c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0l2.83-2.83.71.71c.59.59.59 1.53 0 2.12l-2.76 2.76z" fill="#4B6EF5"/>
    <path d="M21.07 11.07l-3.53 3.53c-.59.59-1.53.59-2.12 0l-.71-.71 2.83-2.83c.78-.78.78-2.05 0-2.83s-2.05-.78-2.83 0L11.88 11l-.71-.71c-.59-.59-.59-1.53 0-2.12l3.53-3.53a2.96 2.96 0 014.19 0l2.18 2.18a2.96 2.96 0 010 4.25z" fill="#4B6EF5"/>
  </svg>
);

const IconSpeed = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0012 4c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" fill="#4B6EF5"/>
  </svg>
);

const IconMobile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" fill="#4B6EF5"/>
  </svg>
);

const IconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" fill="#4B6EF5"/>
  </svg>
);

// Feature icons
const IconMic = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="#4B6EF5"/>
    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#4B6EF5"/>
  </svg>
);

const IconChart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" fill="#4B6EF5"/>
  </svg>
);

const IconBrain = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#4B6EF5"/>
  </svg>
);

const IconBolt = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z" fill="#4B6EF5"/>
  </svg>
);

// Play button icon for video placeholder
const PlayIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="23" stroke="#d1d5db" strokeWidth="2" fill="white"/>
    <path d="M19 15l14 9-14 9V15z" fill="#d1d5db"/>
  </svg>
);

function FeatureVideo({ src }) {
  const videoRef = useRef(null);
  const inView = useInView(videoRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  if (src) {
    return (
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        disablePictureInPicture
        style={{
          width: '100%',
          borderRadius: '16px',
          background: '#f3f4f6',
          objectFit: 'cover',
        }}
      />
    );
  }

  return (
    <div style={{
      width: '100%',
      aspectRatio: '16 / 9',
      borderRadius: '12px',
      background: '#f3f4f6',
      border: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
    }}>
      <PlayIcon />
      <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 500, letterSpacing: '0.02em' }}>
        Feature Demo
      </span>
    </div>
  );
}

function PainCardCarousel({ painPoints, labelStyle, sectionHeadingStyle, sectionSubtextStyle }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (i) => {
    setDirection(i > activeIndex ? 1 : -1);
    setActiveIndex(i);
  };

  const goNext = () => {
    if (activeIndex < painPoints.length - 1) {
      setDirection(1);
      setActiveIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleDragEnd = (e, info) => {
    if (info.offset.x < -50 && activeIndex < painPoints.length - 1) {
      setDirection(1);
      setActiveIndex((prev) => prev + 1);
    } else if (info.offset.x > 50 && activeIndex > 0) {
      setDirection(-1);
      setActiveIndex((prev) => prev - 1);
    }
  };

  const variants = {
    enter: (d) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -100 : 100, opacity: 0 }),
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid #e5e7eb',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    zIndex: 10,
  };

  return (
    <section className="hc-pain-section" style={{ padding: '8rem 1rem', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="hc-label" style={labelStyle}>WHY HOME CARE SALES IS HARD</p>
          <h3 className="hc-pain-heading" style={sectionHeadingStyle}>Your Business Runs on Referrals.<br />Keeping Up With Them Is Another Story.</h3>
          <p className="hc-pain-subtext" style={{ ...sectionSubtextStyle, margin: '0.75rem auto 0' }}>
            You run ads. But your best clients come from referrals. And when you're always in the field, those relationships are hard to keep up with.
          </p>
        </motion.div>

        <div className="hc-pain-carousel-wrap" style={{ maxWidth: '672px', margin: '0 auto', position: 'relative' }}>
          {/* Left arrow */}
          <button
            onClick={goPrev}
            className="hc-pain-arrow hc-pain-arrow-left"
            style={{ ...arrowStyle, left: '-60px', opacity: activeIndex === 0 ? 0.3 : 1, pointerEvents: activeIndex === 0 ? 'none' : 'auto' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={goNext}
            className="hc-pain-arrow hc-pain-arrow-right"
            style={{ ...arrowStyle, right: '-60px', opacity: activeIndex === painPoints.length - 1 ? 0.3 : 1, pointerEvents: activeIndex === painPoints.length - 1 ? 'none' : 'auto' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Card */}
          <div style={{ overflow: 'hidden', borderRadius: '16px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="hc-pain-card"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)',
                  border: '1px solid #f3f4f6',
                  borderTop: '4px solid #4B6EF5',
                  padding: '3rem',
                  textAlign: 'center',
                  cursor: 'grab',
                }}
              >
                <p className="hc-pain-card-text" style={{ fontSize: '1.1rem', color: '#1f2937', lineHeight: 1.8, margin: 0 }}>
                  {painPoints[activeIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.5rem' }}>
            {painPoints.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: '2px solid #4B6EF5',
                  background: i === activeIndex ? '#4B6EF5' : 'transparent',
                  transition: 'background 0.2s ease',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeCarePage() {
  const painPoints = [
    { text: <>Miss one follow-up and a referral partner goes quiet.</> },
    { text: <>Families in crisis call three agencies.<br />The one who calls back first gets the client.</> },
    { text: <>There is no time to log intake notes between visits.<br />Details get lost.</> },
    { text: <>You know how many referrals you get.<br />You have no idea which ones are actually worth your time.</> },
  ];

  const features = [
    {
      icon: <IconMic />,
      title: 'Log Every Intake in Seconds',
      description: "Speak your notes on the way to your car. Diagnosis, hours needed, urgency, family dynamics. All captured automatically.",
      quote: '"I used to write notes on my hand. Now I just talk to my phone."',
      videoSrc: '/5vid.mov',
    },
    {
      icon: <IconChart />,
      title: 'Stop Tracking Volume. Start Tracking Value.',
      description: "See conversion rate and hours of service per referral partner. Know exactly who is sending real clients and who is just sending noise.",
      quote: '"We dropped a hospital we chased for a year and doubled down on two social workers. Revenue went up 40%."',
      videoSrc: '/HomeCareDemoB.mov',
    },
    {
      icon: <IconBrain />,
      title: 'Walk Into Every Call Fully Prepared',
      description: "Before every call, Trilio surfaces who this person is, what they need, and where you left off. You never ask the same question twice.",
      quote: '"Families notice when you remember them. That is how you win over a cheaper agency."',
      videoSrc: '/HomeCareDemo3.mov',
    },
    {
      icon: <IconBolt />,
      title: 'Be the First to Follow Up. Every Time.',
      description: "The moment you log a lead, Trilio sends a personal follow-up automatically. Stay top of mind without the manual effort.",
      quote: '"We went from a day to minutes. Our conversion rate doubled."',
      videoSrc: '/3vid.mov',
    },
  ];

  const stats = [
    { number: '5+', label: 'hours saved per week', sublabel: 'on intake logging and admin' },
    { number: '2x', label: 'conversion rate', sublabel: 'by responding faster than competing agencies' },
    { number: '100%', label: 'focus on the right partners', sublabel: 'know which referral sources generate the most revenue' },
  ];

  return (
    <>
      <style>{`
        .mobile-cta-text { display: none; }
        .desktop-cta-text { display: inline; }
        @media (max-width: 768px) {
          .mobile-cta-text { display: inline !important; }
          .desktop-cta-text { display: none !important; }
          .hc-hero-section {
            height: auto !important;
            min-height: auto !important;
            padding: 0.25rem !important;
          }
          .hc-hero-blue-inner {
            height: auto !important;
            min-height: 70vh !important;
            padding: 4rem 1rem !important;
          }
          .hc-hero-inner {
            padding: 1rem !important;
          }
          .hc-hero-h1 {
            font-size: clamp(1.75rem, 7vw, 4.5rem) !important;
            line-height: 1.1 !important;
            text-wrap: balance !important;
            max-width: 90% !important;
          }
          .hc-hero-subtitle {
            font-size: clamp(0.85rem, 3.5vw, 1.15rem) !important;
            text-wrap: balance !important;
            max-width: 85% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .hc-hero-cta {
            width: 100% !important;
            text-align: center !important;
            box-sizing: border-box !important;
            padding: 0.8rem 2rem !important;
            font-size: 0.8rem !important;
          }
          .hc-hero-badge {
            font-size: 0.75rem !important;
          }
          .hc-pain-section {
            padding: 3rem 1rem !important;
          }
          .hc-pain-heading {
            font-size: clamp(1.5rem, 5vw, 2.5rem) !important;
            text-wrap: balance !important;
            max-width: 95% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .hc-pain-subtext {
            font-size: clamp(0.85rem, 3.5vw, 1.05rem) !important;
            text-wrap: balance !important;
            max-width: 92% !important;
          }
          .hc-pain-carousel-wrap {
            max-width: 100% !important;
          }
          .hc-pain-card {
            padding: 1.5rem 1rem !important;
          }
          .hc-pain-card-text {
            font-size: 0.9rem !important;
            text-wrap: balance !important;
            max-width: 95% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .hc-pain-arrow {
            width: 32px !important;
            height: 32px !important;
          }
          .hc-pain-arrow-left {
            left: 4px !important;
          }
          .hc-pain-arrow-right {
            right: 4px !important;
          }
          .hc-features-section {
            padding: 3rem 1rem !important;
          }
          .hc-section-heading {
            font-size: clamp(1.5rem, 5vw, 2.5rem) !important;
            text-wrap: balance !important;
          }
          .hc-feature-row {
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .hc-feature-text {
            order: 2 !important;
          }
          .hc-feature-video {
            order: 1 !important;
          }
          .hc-feature-title {
            font-size: clamp(1.1rem, 4.5vw, 1.5rem) !important;
            text-wrap: balance !important;
          }
          .hc-feature-desc {
            font-size: 0.9rem !important;
            max-width: 100% !important;
          }
          .hc-feature-quote {
            font-size: 0.85rem !important;
            max-width: 100% !important;
          }
          .hc-outcomes-section {
            padding: 3rem 1rem !important;
          }
          .hc-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .hc-stat-number {
            font-size: 3rem !important;
          }
          .hc-stat-label {
            font-size: 1rem !important;
            text-wrap: balance !important;
          }
          .hc-stat-sublabel {
            font-size: 0.85rem !important;
            text-wrap: balance !important;
            max-width: 280px !important;
          }
          .hc-stat-disclaimer {
            font-size: 0.75rem !important;
          }
          .hc-cta-section {
            padding: 0 0.25rem !important;
            margin-bottom: 0.25rem !important;
          }
          .hc-cta-inner {
            padding: 3rem 1rem !important;
          }
          .hc-cta-heading {
            font-size: clamp(1.5rem, 5vw, 2.5rem) !important;
            text-wrap: balance !important;
            max-width: 90% !important;
          }
          .hc-cta-subtext {
            font-size: clamp(0.85rem, 3.5vw, 1.05rem) !important;
            text-wrap: balance !important;
            max-width: 90% !important;
          }
          .hc-cta-button {
            width: 100% !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
          .hc-label {
            font-size: 0.7rem !important;
          }
        }
      `}</style>

      {/* Hero */}
      <section className="hc-hero-section" style={{
        background: 'white',
        width: '100vw',
        height: '80vh',
        marginLeft: 'calc(-50vw + 50%)',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div className="hc-hero-blue-inner" style={{
          width: 'calc(100% - 1rem)',
          height: 'calc(100% - 1rem)',
          background: '#4B6EF5',
          borderRadius: '6px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            opacity: 0.08, pointerEvents: 'none', zIndex: 1,
          }} />
          <motion.div
            style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.6, zIndex: 10, width: '500px', height: '500px', background: 'rgba(80, 180, 150, 0.3)', top: '10%', left: '5%' }}
            animate={{ x: [0, 400, -300, 200, 0], y: [0, -300, 250, -100, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.6, zIndex: 10, width: '600px', height: '600px', background: 'rgba(60, 140, 200, 0.35)', bottom: '5%', right: '10%' }}
            animate={{ x: [0, -400, 300, -150, 0], y: [0, 300, -250, 150, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="hc-hero-inner"
            style={{
              position: 'relative', zIndex: 21, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textAlign: 'center',
              padding: '0 2rem',
            }}
          >
            <motion.span variants={heroChild} className="hc-hero-badge" style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              padding: '0.4rem 1.25rem',
              borderRadius: '100px',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}>
              Built for Home Care Agencies
            </motion.span>
            <motion.h1 variants={heroChild} className="hc-hero-h1" style={{
              color: 'white', fontSize: '4.5rem', textAlign: 'center', maxWidth: '900px',
              fontWeight: 100, lineHeight: 1, fontFamily: "'Playfair Display', serif",
              letterSpacing: '-0.02em', margin: 0,
            }}>
              More Clients. Better Referral Partners. Less Admin.
            </motion.h1>
            <motion.p variants={heroChild} className="hc-hero-subtitle" style={{
              color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', textAlign: 'center',
              maxWidth: '650px', lineHeight: 1.5, margin: 0,
            }}>
              Log intakes by voice, follow up automatically, and know exactly which partners are worth your time.
            </motion.p>
            <motion.div variants={heroChild}>
              <a href="https://calendly.com/jessie-trilio/30min" target="_blank" rel="noopener noreferrer" className="hc-hero-cta" style={{
                background: 'white', color: 'black', border: 'none', padding: '1rem 2.5rem',
                borderRadius: '4px', fontSize: '1rem', fontWeight: 400, textDecoration: 'none',
                display: 'inline-block', marginTop: '1rem',
              }}>
                <span className="mobile-cta-text">Book a Demo</span>
                <span className="desktop-cta-text">Book a Demo for Your Agency</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <PainCardCarousel painPoints={painPoints} labelStyle={labelStyle} sectionHeadingStyle={sectionHeadingStyle} sectionSubtextStyle={sectionSubtextStyle} />

      {/* Features */}
      <section className="hc-features-section" style={{ ...sectionStyle, background: '#f9fafb' }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="hc-label" style={labelStyle}>THE PLATFORM</p>
            <h3 className="hc-section-heading" style={sectionHeadingStyle}>Built for Teams That Are Always on the Go.</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', maxWidth: '960px', margin: '0 auto' }}>
            {features.map((feature, i) => (
              <div
                key={i}
                className="hc-feature-row"
                style={{
                  display: 'flex',
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                  gap: '3rem',
                  alignItems: 'center',
                }}
              >
                <motion.div
                  className="hc-feature-text"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ flex: 1 }}
                >
                  <h4 className="hc-feature-title" style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1f2937', margin: '0 0 1rem' }}>
                    {feature.title}
                  </h4>
                  <p className="hc-feature-desc" style={{ fontSize: '1.05rem', color: '#6b7280', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
                    {feature.description}
                  </p>
                  <blockquote className="hc-feature-quote" style={{
                    borderLeft: '3px solid #4B6EF5', paddingLeft: '1rem',
                    fontStyle: 'italic', color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6, margin: 0,
                  }}>
                    {feature.quote}
                  </blockquote>
                </motion.div>
                <motion.div
                  className="hc-feature-video"
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                  style={{ flex: 1, overflow: 'hidden', borderRadius: '12px' }}
                >
                  <FeatureVideo src={feature.videoSrc} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="hc-outcomes-section" style={{ ...sectionStyle, background: 'white', padding: '8rem 2rem' }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h3 className="hc-section-heading" style={sectionHeadingStyle}>Measurable Results</h3>
          </div>
          <motion.div
            className="hc-stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem',
              maxWidth: '1100px', margin: '0 auto',
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1.5rem' }}
              >
                <span className="hc-stat-number" style={{ fontSize: '4.5rem', fontWeight: 700, color: '#4B6EF5', lineHeight: 1 }}>
                  <CountUp value={stat.number} />
                </span>
                <AccentBar />
                <span className="hc-stat-label" style={{ fontSize: '1.15rem', color: '#1f2937', fontWeight: 600, marginBottom: '0.5rem' }}>{stat.label}</span>
                <p className="hc-stat-sublabel" style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.6, margin: 0, maxWidth: '320px' }}>{stat.sublabel}</p>
              </motion.div>
            ))}
          </motion.div>
          <p className="hc-stat-disclaimer" style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9ca3af', marginTop: '3rem' }}>
            Based on early customer results. Individual results may vary.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="hc-cta-section" style={{ background: 'white', padding: '0 0.5rem', marginBottom: '0.5rem' }}>
        <div className="hc-cta-inner" style={{
          background: '#4B6EF5', borderRadius: '6px', position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            opacity: 0.08, pointerEvents: 'none', zIndex: 1,
          }} />
          <motion.div
            style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.6, zIndex: 2, width: '400px', height: '400px', background: 'rgba(80, 180, 150, 0.3)', top: '-10%', left: '5%' }}
            animate={{ x: [0, 200, -150, 100, 0], y: [0, -150, 100, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.6, zIndex: 2, width: '450px', height: '450px', background: 'rgba(60, 140, 200, 0.35)', bottom: '-10%', right: '10%' }}
            animate={{ x: [0, -200, 150, -80, 0], y: [0, 100, -150, 80, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div style={{
            position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '1.25rem',
          }}>
            <h2 className="hc-cta-heading" style={{
              color: 'white', fontSize: '2.5rem', textAlign: 'center', fontWeight: 300,
              lineHeight: 1.1, fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em',
              margin: 0, maxWidth: '600px',
            }}>
              More Clients. Better Partners.<br /> Less Admin.
            </h2>
            <p className="hc-cta-subtext" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', textAlign: 'center', margin: 0 }}>
              Book a 20-minute demo and see exactly how it works for your agency.
            </p>
            <a href="https://calendly.com/jessie-trilio/30min" target="_blank" rel="noopener noreferrer" className="hc-cta-button" style={{
              background: 'white', color: 'black', border: 'none', padding: '1rem 2.5rem',
              borderRadius: '4px', fontSize: '1rem', fontWeight: 400, textDecoration: 'none',
              display: 'inline-block',
            }}>
              Book Your Demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeCarePage;
