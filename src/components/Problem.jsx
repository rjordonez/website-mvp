import React from 'react';
import './Problem.css';

function Problem() {
  const problems = [
    "Inefficient workflows that waste time and resources?",
    "Lack of visibility into your team's performance?",
    "Difficulty scaling your operations as you grow?",
    "Disconnected tools that don't work together?"
  ];

  return (
    <section id="problem" className="problem">
      <div className="container">
        <h2>The Problem We Solve</h2>
        <div className="problem-content">
          <div className="problem-text">
            <h3>Are you struggling with...</h3>
            <ul>
              {problems.map((problem, index) => (
                <li key={index}>{problem}</li>
              ))}
            </ul>
            <p className="problem-highlight">
              We understand these challenges because we've been there too.
              That's why we built a solution that addresses each of these pain points.
            </p>
          </div>
          <div className="problem-image">
            <div className="placeholder-image">Problem Illustration</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Problem;
