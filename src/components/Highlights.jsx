import React from 'react';
import './Highlights.css';

function Highlights() {
  const highlights = [
    {
      title: "Never miss a call",
      description: "Our 24/7 agent ensures every inquiry becomes a lead in your system.",
      imageTitle: "Capture everything, instantly",
      imageDescription: "24/7 call agent answers every call and voicemail. Leads are logged automatically. No more 'we missed them after 5pm.' Every opportunity starts in the system."
    },
    {
      title: "Voice-first updates",
      description: "Capture what matters while it's fresh, without typing a word.",
      imageTitle: "Speak your notes, don't type them",
      imageDescription: "Record notes by voice after tours or calls. Automatically transcribed and saved. Works on phone, tablet, or iPad between appointments. If you can say it, it's captured."
    },
    {
      title: "Rich family profiles",
      description: "Track the context that helps you connect and convert.",
      imageTitle: "Build rich profiles that actually help you close",
      imageDescription: "Go beyond names and phone numbers. Capture decision makers, timeline, care needs, interests, and communication preferences. Because the details are what turn hesitation into a move-in."
    },
    {
      title: "Smart follow-ups",
      description: "Stay present without being pushy.",
      imageTitle: "Follow up, personally, not pushy",
      imageDescription: "Automated reminders based on real context. Personalized outreach tied to interests and timing. Respect how families want to communicate. Right message. Right time. Right channel."
    },
    {
      title: "Team alignment",
      description: "Everyone has the full story, even mid-conversation.",
      imageTitle: "Stay aligned across shifts and teams",
      imageDescription: "One shared source of truth for every lead. Any team member can step in with full context. No awkward handoffs or 'tell me again...' Your team stays in sync even on hectic days."
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
                <h3><span className="highlight-number">{index + 1}</span> {highlight.title}</h3>
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
