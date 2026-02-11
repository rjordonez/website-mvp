import React from 'react';
import './Overview.css';

function Overview() {
  const features = [
    {
      icon: "📊",
      title: "Analytics",
      description: "Track your progress with powerful analytics and insights"
    },
    {
      icon: "🚀",
      title: "Performance",
      description: "Lightning-fast performance that scales with your needs"
    },
    {
      icon: "🔒",
      title: "Security",
      description: "Enterprise-grade security to keep your data safe"
    }
  ];

  return (
    <section id="overview" className="overview">
      <div className="container">
        <h2>Overview</h2>
        <p className="section-description">
          Our platform provides everything you need to streamline your workflow,
          boost productivity, and achieve your goals faster than ever before.
        </p>
        <div className="overview-grid">
          {features.map((feature, index) => (
            <div key={index} className="overview-card">
              <div className="icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Overview;
