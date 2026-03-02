import React, { useState } from 'react';
import './FAQ.css';

function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  const toggle = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const personas = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" fill="#4B6EF5"/>
        </svg>
      ),
      title: "Community Sales Directors",
      description: "Managing multiple facilities, leading a sales team, and running group tours. Trilio keeps everything organized without slowing you down."
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 13H8v-3h2.5V7.5h3V10H16v3h-2.5v2.5h-3V13zM20 6h-4l-2-2H6L4 6H0v14h24V6h-4zm-8 13c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="#4B6EF5"/>
        </svg>
      ),
      title: "Home Care Sales Teams",
      description: "Tracking referrals, following up with families, and managing care plans. Trilio keeps everything in one place so nothing falls through."
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#4B6EF5"/>
        </svg>
      ),
      title: "Senior Placement Specialists",
      description: "Always on the go, juggling multiple leads and timelines. Trilio captures every detail and keeps follow-ups on track."
    }
  ];

  return (
    <section id="who" className="who-section">
      <div className="container">
        <div className="who-header">
          <h3>Who This Is For</h3>
          <p>Made for senior living sales professionals who build trust every day.</p>
        </div>
        <div className="accordion-list">
          {personas.map((item, index) => (
            <div key={index} className="accordion-item">
              <button
                className={`accordion-question ${openItem === index ? 'active' : ''}`}
                onClick={() => toggle(index)}
              >
                <span className="accordion-title-group">
                  <span className="accordion-title-icon">{item.icon}</span>
                  <span>{item.title}</span>
                </span>
                <span className="accordion-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`accordion-chevron ${openItem === index ? 'rotated' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
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
