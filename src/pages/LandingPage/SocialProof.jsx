import React from 'react';
import { motion } from 'framer-motion';
import './SocialProof.css';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const quotes = [
  {
    text: "Before Trilio, we were guessing which referral partners were worth our time. Now we know exactly which ones drive hours of service and we invest accordingly.",
    name: "Agency Owner",
    role: "Home Care Services",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
  },
  {
    text: "I'm never at my desk. I'm always out on tours or at events. I used to spend an hour every night just catching up on notes. Now I just talk on my way to the car and it's done.",
    name: "Community Sales Director",
    role: "Senior Living Community",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
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
