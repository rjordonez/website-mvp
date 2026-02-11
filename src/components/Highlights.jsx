import React from 'react';
import './Highlights.css';

function Highlights() {
  const highlights = [
    {
      title: "Capture everything, instantly",
      description: "24/7 call agent answers every call and voicemail. Leads are logged automatically. No more 'we missed them after 5pm.' Every opportunity starts in the system.",
      imageTitle: "Never miss a call",
      imageDescription: "Our 24/7 agent ensures every inquiry becomes a lead in your system."
    },
    {
      title: "Speak your notes, don't type them",
      description: "Record notes by voice after tours or calls. Automatically transcribed and saved. Works on phone, tablet, or iPad — between appointments. If you can say it, it's captured.",
      imageTitle: "Voice-first updates",
      imageDescription: "Capture what matters while it's fresh, without typing a word."
    },
    {
      title: "Build rich profiles that actually help you close",
      description: "Go beyond names and phone numbers. Capture decision makers, timeline, care needs, interests, and communication preferences. Because the details are what turn hesitation into a move-in.",
      imageTitle: "Rich family profiles",
      imageDescription: "Track the context that helps you connect and convert."
    },
    {
      title: "Follow up, personally, not pushy",
      description: "Automated reminders based on real context. Personalized outreach tied to interests and timing. Respect how families want to communicate. Right message. Right time. Right channel.",
      imageTitle: "Smart follow-ups",
      imageDescription: "Stay present without being pushy."
    },
    {
      title: "Stay aligned across shifts and teams",
      description: "One shared source of truth for every lead. Any team member can step in with full context. No awkward handoffs or 'tell me again...' Your team stays in sync — even on hectic days.",
      imageTitle: "Team alignment",
      imageDescription: "Everyone has the full story, even mid-conversation."
    }
  ];

  return (
    <section id="highlights" className="highlights">
      <div className="container">
        <h2>Highlights</h2>
        <div className="highlights-list">
          {highlights.map((highlight, index) => (
            <div key={index} className="highlight-item">
              <div className="highlight-header">
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </div>
              <div className="highlight-image">
                Image Placeholder
              </div>
              <div className="highlight-text">
                <h4>{highlight.imageTitle}</h4>
                <p>{highlight.imageDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Highlights;
