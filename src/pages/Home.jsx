import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from './LandingPage/Hero';
import Solution from './LandingPage/Solution';
import Outcome from './LandingPage/Outcome';
import SocialProof from './LandingPage/SocialProof';
import CTA from './LandingPage/CTA';

const IconBuilding = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" fill="#4B6EF5"/>
  </svg>
);

const IconHome = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#4B6EF5"/>
  </svg>
);

const iconContainerStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '10px',
  background: '#eef2ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const icpPaths = [
  {
    icon: <IconBuilding />,
    title: 'Senior Living Communities',
    description: 'Nurture families over long decision timelines without letting anything slip.',
    link: '/for/senior-living',
  },
  {
    icon: <IconHome />,
    title: 'Home Care Agencies',
    description: 'Respond fast, convert more referrals, and focus on partners that grow your revenue.',
    link: '/for/home-care',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function Home() {
  return (
    <>
      <Hero />

      {/* ICP Paths */}
      <section id="icp-paths" style={{ padding: '6rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h3 style={{
              fontSize: '2.5rem',
              color: '#1f2937',
              fontWeight: 300,
              fontFamily: "'Playfair Display', serif",
              margin: 0,
            }}>Who Is Trilio For?</h3>
{/* Removed subtext */}
          </div>
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {icpPaths.map((icp) => (
              <motion.div
                key={icp.title}
                variants={cardVariants}
                style={{
                  background: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  padding: '3rem 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}
              >
                <div style={iconContainerStyle}>{icp.icon}</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#1f2937',
                  margin: 0,
                }}>{icp.title}</h3>
                <p style={{
                  fontSize: '1.05rem',
                  color: '#6b7280',
                  lineHeight: 1.6,
                  margin: 0,
                }}>{icp.description}</p>
                <Link
                  to={icp.link}
                  style={{
                    color: '#4B6EF5',
                    fontWeight: 500,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    marginTop: '0.5rem',
                    transition: 'opacity 0.2s',
                  }}
                >
                  See More →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Solution />
      <Outcome />
      <SocialProof />
      <CTA />
    </>
  );
}

export default Home;
