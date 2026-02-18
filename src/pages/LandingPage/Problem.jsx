import React from 'react';
import './Problem.css';

function Problem() {
  const problems = [
    {
      title: "Senior living decisions don't happen on a schedule.",
      description: "Families call when something changes. A fall. A scare. A moment of clarity.",
      image: "/1.png"
    },
    {
      title: "But sales teams:",
      description: "Miss after-hours calls\nForget tour details\nLose context between shifts\nStruggle with long-term follow-up\n\nTraditional CRMs log data, not relationships.",
      image: "/2.png"
    },
    {
      title: "So leads slip through the cracks",
      description: "Not because you didn't care, but because the system wasn't built for this job.",
      image: "/3.png"
    }
  ];

  return (
    <section id="problem" className="problem">
      <div className="container">
        <h2>Problem</h2>
        <div className="problem-header">
          <h3>Why leads slip through the cracks</h3>
        </div>
        <div className="problem-grid">
          {problems.map((problem, index) => (
            <div key={index} className="problem-card">
              <div className="problem-text-content">
                <h4>{problem.title}</h4>
                <p>{problem.description}</p>
              </div>
              <div className="problem-image-container">
                <img src={problem.image} alt={problem.title} className="problem-image" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Problem;
