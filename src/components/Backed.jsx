import React from 'react';
import './Backed.css';

function Backed() {
  return (
    <section className="backed">
      <div className="container">
        <p className="backed-label">BACKED BY:</p>
        <div className="backed-logos">
          <img src="/techstars.png" alt="Techstars" className="backed-logo" />
          <img src="/usc.png" alt="USC" className="backed-logo" />
        </div>
      </div>
    </section>
  );
}

export default Backed;
