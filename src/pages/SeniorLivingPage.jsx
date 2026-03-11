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
  padding: '6rem 2rem',
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
const IconRefresh = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8A5.87 5.87 0 016 12c0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" fill="#4B6EF5"/>
  </svg>
);

const IconHourglass = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z" fill="#4B6EF5"/>
  </svg>
);

const IconMobile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" fill="#4B6EF5"/>
  </svg>
);

const IconVisibility = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#4B6EF5"/>
  </svg>
);

// Feature icons
const IconMic = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="#4B6EF5"/>
    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#4B6EF5"/>
  </svg>
);

const IconBolt = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z" fill="#4B6EF5"/>
  </svg>
);

const IconChart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" fill="#4B6EF5"/>
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
          aspectRatio: '16 / 9',
          borderRadius: '12px',
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

function PainCardCarousel({ painPoints, labelStyle, sectionHeadingStyle, sectionSubtextStyle, label, headline, subtext }) {
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
    <section className="sl-pain-section" style={{ padding: '8rem 1rem', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="sl-label" style={labelStyle}>{label}</p>
          <h3 className="sl-section-heading" style={sectionHeadingStyle}>{headline}</h3>
          <p className="sl-section-subtext" style={{ ...sectionSubtextStyle, margin: '0.75rem auto 0' }}>{subtext}</p>
        </motion.div>

        <div className="sl-pain-card-container" style={{ maxWidth: '672px', margin: '0 auto', position: 'relative' }}>
          <button
            className="sl-pain-arrow sl-pain-arrow-left"
            onClick={goPrev}
            style={{ ...arrowStyle, left: '-60px', opacity: activeIndex === 0 ? 0.3 : 1, pointerEvents: activeIndex === 0 ? 'none' : 'auto' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <button
            className="sl-pain-arrow sl-pain-arrow-right"
            onClick={goNext}
            style={{ ...arrowStyle, right: '-60px', opacity: activeIndex === painPoints.length - 1 ? 0.3 : 1, pointerEvents: activeIndex === painPoints.length - 1 ? 'none' : 'auto' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

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
                className="sl-pain-card"
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
                <p style={{ fontSize: '1.1rem', color: '#1f2937', lineHeight: 1.8, margin: 0 }}>
                  {painPoints[activeIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

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

function SeniorLivingPage() {
  const painPoints = [
    { text: "A prospect who wasn't ready six months ago might be ready today. Nobody flagged it." },
    { text: "One busy week and a warm lead quietly goes cold." },
    { text: "Between tours, events, and calls, there is no time to sit and log notes." },
    { text: "Directors have no clear view of pipeline health, follow-up gaps, or where move-ins are being lost." },
  ];

  const features = [
    {
      icon: <IconMic />,
      title: 'Log Every Tour in Seconds',
      description: "Speak your notes on the way to the next appointment. Preferences, concerns, timeline, decision makers. All captured automatically.",
      quote: '"I used to lose half my notes before I sat down to type. Now I just talk."',
      videoSrc: '/5vid.mov',
    },
    {
      icon: <IconBolt />,
      title: 'Keep Every Prospect Warm for the Entire Decision Window',
      description: "A family tours today but won't decide for months. Trilio sends the right message at the right time so your community stays top of mind without anyone tracking it manually.",
      quote: '"We moved in 3 families this quarter who toured 4 months ago. Autopilot kept them warm."',
      videoSrc: '/SeniorLivingDemoB.mov',
    },
    {
      icon: <IconChart />,
      title: "See Where You Are Losing Move-Ins Before It's Too Late",
      description: "Know where prospects are going quiet, which funnel stage has the most drop-off, and which reps are converting. Close the leakage before it hits occupancy.",
      quote: '"I used to find out a lead went cold when the family called to say they chose someone else. Now I see it coming."',
      videoSrc: '/4vid.mov',
    },
  ];

  const stats = [
    { number: '3x', label: 'faster follow-ups', sublabel: 'after every tour' },
    { number: '50%', label: 'less time', sublabel: 'on logging and admin' },
    { number: '100%', label: 'visibility', sublabel: 'into pipeline health and team performance' },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .sl-hero { height: auto !important; min-height: 70vh !important; }
          .sl-hero-headline { font-size: 2rem !important; max-width: 100% !important; }
          .sl-hero-sub { font-size: 0.95rem !important; }
          .sl-hero-content { padding: 0 1rem !important; gap: 1rem !important; }
          .sl-hero-cta { width: 100% !important; text-align: center !important; }
          .sl-hero-cta a { display: block !important; width: 100% !important; box-sizing: border-box !important; }
          .sl-section { padding: 3rem 1rem !important; }
          .sl-section-heading { font-size: 1.5rem !important; }
          .sl-section-subtext { font-size: 0.9rem !important; }
          .sl-label { font-size: 0.75rem !important; }
          .sl-features-container { gap: 2.5rem !important; }
          .sl-feature-row { flex-direction: column !important; gap: 1.5rem !important; }
          .sl-feature-title { font-size: 1.25rem !important; }
          .sl-feature-desc { font-size: 0.9rem !important; }
          .sl-feature-quote { font-size: 0.85rem !important; }
          .sl-stats-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .sl-stat-number { font-size: 3rem !important; }
          .sl-stat-label { font-size: 1rem !important; }
          .sl-stat-sublabel { font-size: 0.85rem !important; }
          .sl-cta-section { padding: 0 0.5rem !important; }
          .sl-cta-inner { padding: 3rem 1rem !important; }
          .sl-cta-heading { font-size: 1.5rem !important; }
          .sl-cta-sub { font-size: 0.9rem !important; }
          .sl-cta-btn { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; }
          .sl-disclaimer { font-size: 0.75rem !important; margin-top: 2rem !important; }
          .sl-pain-section { padding: 3rem 1rem !important; }
          .sl-pain-card-container { max-width: 100% !important; }
          .sl-pain-card { padding: 1.5rem 1rem !important; }
          .sl-pain-card p { font-size: 0.9rem !important; }
          .sl-pain-arrow { width: 32px !important; height: 32px !important; }
          .sl-pain-arrow-left { left: -4px !important; }
          .sl-pain-arrow-right { right: -4px !important; }
          .sl-body-text { font-size: 0.9rem !important; }
        }
      `}</style>
      {/* Hero */}
      <section className="sl-hero" style={{
        background: 'white',
        width: '100vw',
        height: '80vh',
        marginLeft: 'calc(-50vw + 50%)',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
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
            className="sl-hero-content"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            style={{
              position: 'relative', zIndex: 21, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textAlign: 'center',
              padding: '0 2rem',
            }}
          >
            <motion.span variants={heroChild} style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              padding: '0.4rem 1.25rem',
              borderRadius: '100px',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}>
              Built for Senior Living Communities
            </motion.span>
            <motion.h1 className="sl-hero-headline" variants={heroChild} style={{
              color: 'white', fontSize: '4.5rem', textAlign: 'center', maxWidth: '800px',
              fontWeight: 100, lineHeight: 1, fontFamily: "'Playfair Display', serif",
              letterSpacing: '-0.02em', margin: 0,
            }}>
              Turn Long Sales Cycles Into More Move-Ins
            </motion.h1>
            <motion.p className="sl-hero-sub" variants={heroChild} style={{
              color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', textAlign: 'center',
              maxWidth: '600px', lineHeight: 1.5, margin: 0,
            }}>
              Trilio keeps every prospect moving forward<br />from first inquiry to move-in day, without your team sitting at a desk.
            </motion.p>
            <motion.div className="sl-hero-cta" variants={heroChild}>
              <a href="https://calendly.com/jessie-trilio/30min" target="_blank" rel="noopener noreferrer" style={{
                background: 'white', color: 'black', border: 'none', padding: '1rem 2.5rem',
                borderRadius: '4px', fontSize: '1rem', fontWeight: 400, textDecoration: 'none',
                display: 'inline-block', marginTop: '1rem',
              }}>
                Book a Demo for Your Community
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <PainCardCarousel
        painPoints={painPoints}
        labelStyle={labelStyle}
        sectionHeadingStyle={sectionHeadingStyle}
        sectionSubtextStyle={sectionSubtextStyle}
        label="WHY SENIOR LIVING SALES IS HARD"
        headline={<>The Longest Sale in the Most Personal Industry.</>}
        subtext="Every conversation is personal. Timelines are unpredictable. Trust is earned one family at a time. And with dozens of prospects at different stages, details slip."
      />

      {/* Features */}
      <section className="sl-section" style={{ ...sectionStyle, background: '#f9fafb' }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="sl-label" style={labelStyle}>THE PLATFORM</p>
            <h3 className="sl-section-heading" style={sectionHeadingStyle}>Built for Teams That Are Always on the Go.</h3>
          </div>
          <div className="sl-features-container" style={{ display: 'flex', flexDirection: 'column', gap: '4rem', maxWidth: '960px', margin: '0 auto' }}>
            {features.map((feature, i) => (
              <div
                key={i}
                className="sl-feature-row"
                style={{
                  display: 'flex',
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                  gap: '3rem',
                  alignItems: 'center',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ flex: 1 }}
                >
                  <h4 className="sl-feature-title" style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1f2937', margin: '0 0 1rem' }}>
                    {feature.title}
                  </h4>
                  <p className="sl-feature-desc" style={{ fontSize: '1.05rem', color: '#6b7280', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
                    {feature.description}
                  </p>
                  <blockquote className="sl-feature-quote" style={{
                    borderLeft: '3px solid #4B6EF5', paddingLeft: '1rem',
                    fontStyle: 'italic', color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6, margin: 0,
                  }}>
                    {feature.quote}
                  </blockquote>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                  style={{ flex: 1 }}
                >
                  <FeatureVideo src={feature.videoSrc} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="sl-section" style={{ ...sectionStyle, background: 'white', padding: '8rem 2rem' }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h3 className="sl-section-heading" style={sectionHeadingStyle}>Measurable Results</h3>
          </div>
          <motion.div
            className="sl-stats-grid"
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
                <span className="sl-stat-number" style={{ fontSize: '4.5rem', fontWeight: 700, color: '#4B6EF5', lineHeight: 1 }}>
                  <CountUp value={stat.number} />
                </span>
                <AccentBar />
                <span className="sl-stat-label" style={{ fontSize: '1.15rem', color: '#1f2937', fontWeight: 600, marginBottom: '0.5rem' }}>{stat.label}</span>
                <p className="sl-stat-sublabel" style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.6, margin: 0, maxWidth: '320px' }}>{stat.sublabel}</p>
              </motion.div>
            ))}
          </motion.div>
          <p className="sl-disclaimer" style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9ca3af', marginTop: '3rem' }}>
            Based on early customer results. Individual results may vary.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="sl-cta-section" style={{ background: 'white', padding: '0 0.5rem', marginBottom: '0.5rem' }}>
        <div className="sl-cta-inner" style={{
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
            <h2 className="sl-cta-heading" style={{
              color: 'white', fontSize: '2.5rem', textAlign: 'center', fontWeight: 300,
              lineHeight: 1.1, fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em',
              margin: 0, maxWidth: '600px',
            }}>
              Ready to Fill More Rooms?
            </h2>
            <p className="sl-cta-sub" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', textAlign: 'center', margin: 0 }}>
              See how Trilio helps senior living communities close more move-ins and keep every prospect moving forward.
            </p>
            <a className="sl-cta-btn" href="https://calendly.com/jessie-trilio/30min" target="_blank" rel="noopener noreferrer" style={{
              background: 'white', color: 'black', border: 'none', padding: '1rem 2.5rem',
              borderRadius: '4px', fontSize: '1rem', fontWeight: 400, textDecoration: 'none',
              display: 'inline-block',
            }}>
              Book Your Community Demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default SeniorLivingPage;
