import React from 'react';
import './Problem.css';

function Problem() {
  const problems = [
    "Decisions are unpredictable and deeply personal",
    "Relationships take time to build",
    "Sales teams are always on the move, too busy to log notes"
  ];

  return (
    <section id="problem" className="problem">
      <div className="container">
        <h2>The Challenge</h2>
        <div className="problem-header">
          <h3>Why senior living sales is so hard?</h3>
        </div>
        <div className="problem-pills">
          {problems.map((problem, index) => (
            <div key={index} className="problem-pill">
              <span className="problem-x">✕</span>
              <span>{problem}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Problem;
