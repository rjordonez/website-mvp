import React from 'react';
import './Highlights.css';

function Highlights() {
  const highlights = [
    {
      number: "01",
      title: "Easy Integration",
      description: "Seamlessly integrate with your existing tools and workflows in minutes"
    },
    {
      number: "02",
      title: "24/7 Support",
      description: "Our dedicated team is always here to help you succeed"
    },
    {
      number: "03",
      title: "Cost Effective",
      description: "Save money with our transparent pricing and no hidden fees"
    },
    {
      number: "04",
      title: "Proven Results",
      description: "Join thousands of satisfied customers who've achieved their goals"
    }
  ];

  return (
    <section id="highlights" className="highlights">
      <div className="container">
        <h2>Why Choose Us</h2>
        <div className="highlights-grid">
          {highlights.map((highlight, index) => (
            <div key={index} className="highlight-card">
              <span className="highlight-number">{highlight.number}</span>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Highlights;
