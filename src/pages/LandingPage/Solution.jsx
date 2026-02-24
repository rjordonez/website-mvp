import React from 'react';
import './Solution.css';

function Solution() {
  const features = [
    {
      title: "Mobile-first & easy to use",
      description: <>Log tours, calls, or meetings in just 1–2 taps — capturing every detail has never been easier.<br /><br />Whether you're on the road or visiting places, all important info is recorded without extra time on the desk.</>
    },
    {
      title: "AI assistant, acts on your data",
      description: <>Your notes, family preferences, and follow-ups are automatically organized, summarized, and surfaced when you need them.<br /><br />This lets you focus on building trust and staying present, instead of hunting through data.</>
    },
    {
      title: "Follow-ups on autopilot",
      description: <>Reminders, texts, and emails are sent at the right time so no lead or detail slips through the cracks.<br /><br />You stay consistent with families without extra work, keeping every relationship moving forward.</>
    }
  ];

  return (
    <section id="solution" className="solution">
      <div className="container">
        <h2>Why It's Different</h2>
        <div className="solution-header">
          <h3>Built for the real world of senior living sales</h3>
        </div>
        <div className="solution-grid">
          {features.map((feature, index) => (
            <div key={index} className="solution-card">
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Solution;
