import React, { useState } from 'react';
import './FAQ.css';

function FAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What makes your product unique?",
      answer: "Our product stands out through innovative features and user-centric design."
    },
    {
      question: "How do I get started?",
      answer: "Simply sign up for an account and follow our onboarding guide."
    },
    {
      question: "What is your pricing model?",
      answer: "We offer flexible pricing plans to suit different needs and budgets."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes, we provide 24/7 customer support via email and chat."
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
              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
