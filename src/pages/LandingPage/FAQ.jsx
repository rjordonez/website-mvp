import React, { useState } from 'react';
import './FAQ.css';

function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  const toggle = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const personas = [
    {
      title: "Community Sales Directors",
      description: "Managing multiple facilities, leading a sales team, attending community events, and running group tours. You need a system that keeps everything organized without slowing you down."
    },
    {
      title: "Home care sales teams",
      description: "Tracking referrals, following up with families, and managing care plans. You need a system that keeps everything in one place so nothing falls through the cracks."
    },
    {
      title: "Senior placement specialists",
      description: "Always on the go, constantly following up with families, juggling multiple leads and timelines. You need an assistant that captures every detail for you and keeps follow-ups on track."
    }
  ];

  return (
    <section id="who" className="who-section">
      <div className="container">
        <h2 className="who-label">Who This Is For</h2>
        <div className="who-header">
          <h3>Made for people who build trust every day</h3>
        </div>
        <div className="accordion-list">
          {personas.map((item, index) => (
            <div key={index} className="accordion-item">
              <button
                className={`accordion-question ${openItem === index ? 'active' : ''}`}
                onClick={() => toggle(index)}
              >
                <span>{item.title}</span>
                <span className="accordion-icon">{openItem === index ? '−' : '+'}</span>
              </button>
              <div className={`accordion-answer ${openItem === index ? 'open' : ''}`}>
                <div className="accordion-answer-content">
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
