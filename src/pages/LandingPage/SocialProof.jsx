import React from 'react';
import { motion } from 'framer-motion';
import './SocialProof.css';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const quotes = [
  {
    text: "Honestly, we had no idea which referral partners were actually good for us. Trilio showed us the hours of service each one brought in. Total game changer for where we spend our time.",
    name: "Agency Owner",
    role: "Home Care Services",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    text: "I'm never at my desk. I'm always out on tours or at events. I used to spend an hour every night just catching up on notes. Now I just talk on my way to the car and it's done.",
    name: "Community Sales Director",
    role: "Senior Living Community",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
  },
];

function SocialProof() {
  return (
    <motion.section
      className="social-proof"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <h3 className="social-proof-heading">What Teams in the Field Are Saying</h3>
        <motion.div
          className="social-proof-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {quotes.map((quote, i) => (
            <motion.div key={i} className="social-proof-card" variants={cardVariants}>
              <div className="social-proof-stars">★★★★★</div>
              <p className="social-proof-quote">"{quote.text}"</p>
              <div className="social-proof-author">
                <img
                  src={quote.avatar}
                  alt={quote.name}
                  className="social-proof-avatar"
                />
                <div className="social-proof-author-info">
                  <span className="social-proof-name">{quote.name}</span>
                  <span className="social-proof-role">{quote.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default SocialProof;
