import React from 'react';
import './Overview.css';

function Overview() {
  const features = [
    {
      title: "Feature One",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."
    },
    {
      title: "Feature Two",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."
    },
    {
      title: "Feature Three",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."
    }
  ];

  return (
    <section id="overview" className="overview">
      <div className="container">
        <h2>Overview</h2>
        <div className="overview-header">
          <h3>What is Billy?</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
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
