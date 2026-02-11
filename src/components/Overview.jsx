import React from 'react';
import './Overview.css';

function Overview() {
  const features = [
    {
      title: "Capture every lead",
      description: "Remember what actually matters. Build rich profiles that go beyond basic contact info to capture the details that help you connect."
    },
    {
      title: "Follow up the right way, at the right time",
      description: "Stay present even when families aren't ready yet. Personalized reminders help you nurture relationships without letting anyone slip away."
    },
    {
      title: "All without adding more work to your day",
      description: "We make sure nothing falls through the cracks. Voice-first design means updates happen naturally, not as another task on your list."
    }
  ];

  return (
    <section id="overview" className="overview">
      <div className="container">
        <h2>Overview</h2>
        <div className="overview-header">
          <h3>What is Billy?</h3>
          <p>From the first phone call to the day they move in, we help you</p>
        </div>
        <div className="overview-grid">
          {features.map((feature, index) => (
            <div key={index} className="overview-card">
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Overview;
