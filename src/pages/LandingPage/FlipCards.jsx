import React, { useState } from 'react';
import './FlipCards.css';

function FlipCards() {
  const [flipped, setFlipped] = useState([false, false, false]);

  const cards = [
    {
      front: "80% of deals need 5+ follow-ups",
      back: "Yet most salespeople stop after the first"
    },
    {
      front: "Most CRMs are desktop-first",
      back: "But sale teams spend 60\u201380% of their day outside the office, leaving little time to log data."
    },
    {
      front: "Inefficient CRM is costly",
      back: "It costs hundreds of hours per rep per year, tens of thousands in lost productivity"
    }
  ];

  const handleFlip = (index) => {
    setFlipped(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <section className="flip-cards-section">
      <div className="container">
        <div className="flip-cards-grid">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`flip-card ${flipped[index] ? 'flipped' : ''}`}
              onClick={() => handleFlip(index)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <span className="flip-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3L5 6.99H8V14H10V6.99H13L9 3ZM16 17.01V10H14V17.01H11L15 21L19 17.01H16Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <p>{card.front}</p>
                </div>
                <div className="flip-card-back">
                  <span className="flip-icon flip-icon-back">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3L5 6.99H8V14H10V6.99H13L9 3ZM16 17.01V10H14V17.01H11L15 21L19 17.01H16Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <p>{card.back}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FlipCards;
