import React, { useState } from 'react';
import './FAQ.css';

function FAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the 24/7 call agent work?",
      answer: "Our AI-powered agent answers every call and voicemail, even after hours. Every inquiry is automatically logged as a lead in your system, so you never miss an opportunity, whether it's 3pm or 3am."
    },
    {
      question: "Can I use voice to capture notes instead of typing?",
      answer: "Yes! Simply record your notes by voice after tours or calls. Everything is automatically transcribed and saved to the contact's profile. Works on your phone, tablet, or iPad. If you can say it, it's captured."
    },
    {
      question: "How does autopilot mode help with follow-ups?",
      answer: "Autopilot mode creates personalized follow-up reminders based on real context from your conversations. It suggests the right message, timing, and communication channel for each family, so you can stay present without being pushy."
    }
  ];

  return (
    <section id="faq" className="faq">
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
              </button>
              <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
                <div className="faq-answer-content">
                  <p>{faq.answer}</p>
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
