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
                {index === 0 ? (
                  <div className="first-highlight-container">
                    <div className="blob-section">
                      <div className="blob-container">
                        <div className="blob blob-1"></div>
                        <div className="blob blob-2"></div>
                        <div className="blob blob-3"></div>
                      </div>
                      <div className="script-text">
                        {"Hey! We just booked 3 qualified leads when you were away!".split('').map((char, i) => (
                          <span key={i} style={{animationDelay: `${i * 0.05}s`}}>{char}</span>
                        ))}
                      </div>
                    </div>
                    <div className="arrow-right-responsive">→</div>
                    <div className="arrow-down-responsive">↓</div>
                    <div className="lead-cards-responsive">
                      <div className="lead-card lead-card-1">
                        <div className="lead-cell">Sarah Johnson</div>
                        <div className="lead-cell">(555) 123-4567</div>
                        <div className="lead-cell">High Priority</div>
                        <div className="checkmark-circle">✔</div>
                      </div>
                      <div className="lead-card lead-card-2">
                        <div className="lead-cell">Michael Chen</div>
                        <div className="lead-cell">(555) 234-5678</div>
                        <div className="lead-cell">Qualified</div>
                        <div className="checkmark-circle">✔</div>
                      </div>
                      <div className="lead-card lead-card-3">
                        <div className="lead-cell">Emma Williams</div>
                        <div className="lead-cell">(555) 345-6789</div>
                        <div className="lead-cell">Follow Up</div>
                        <div className="checkmark-circle">✔</div>
                      </div>
                    </div>
                  </div>
                ) : index === 1 ? (
                  <div className="notes-container">
                    <div className="note-card">
                      <div className="note-header">Initial Call - Sarah Johnson</div>
                      <div className="note-timestamp">Today at 10:30 AM</div>
                      <div className="note-content">
                        <p className="note-paragraph">
                          Sarah called regarding memory care placement for her mother, Barbara (82). Key requirements:
                        </p>
                        <ul className="note-list">
                          <li>Needs specialized memory care support</li>
                          <li>Strong preference for private room</li>
                          <li>Budget: $5,000-$6,000/month</li>
                          <li>Timeline: Within next 2-3 weeks</li>
                        </ul>
                        <p className="note-paragraph">
                          Daughter will attend tour to help with decision. Scheduled for tomorrow at 2:00 PM.
                        </p>
                      </div>
                    </div>
                    <div className="note-card">
                      <div className="note-header">Tour Follow-Up - Barbara Johnson</div>
                      <div className="note-timestamp">Today at 3:45 PM</div>
                      <div className="note-content">
                        <p className="note-paragraph">
                          Completed facility tour with Barbara and Sarah. Very positive reception:
                        </p>
                        <ul className="note-list">
                          <li>Spent extended time in garden area - Barbara loved it</li>
                          <li>Asked detailed questions about meal plans and dietary options</li>
                          <li>Reviewed memory care programming - both impressed</li>
                          <li>Discussed move-in timeline</li>
                        </ul>
                        <p className="note-paragraph">
                          <strong>Next steps:</strong> Sarah will discuss with family this weekend. Follow up Monday morning.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : index === 2 ? (
                  <div className="crm-container">
                    <div className="crm-profile">
                      <div className="profile-main">
                        <div className="profile-avatar">BJ</div>
                        <div className="profile-info">
                          <div className="profile-name">Barbara Johnson</div>
                          <div className="profile-meta">Age 82 • Memory Care</div>
                        </div>
                      </div>
                      <div className="profile-section">
                        <div className="section-label">Decision Makers</div>
                        <div className="family-member">
                          <div className="member-avatar">SJ</div>
                          <div className="member-info">
                            <div className="member-name">Sarah Johnson</div>
                            <div className="member-role">Daughter • Primary Contact</div>
                          </div>
                        </div>
                        <div className="family-member">
                          <div className="member-avatar">MJ</div>
                          <div className="member-info">
                            <div className="member-name">Michael Johnson</div>
                            <div className="member-role">Son • Financial Decision Maker</div>
                          </div>
                        </div>
                      </div>
                      <div className="profile-details">
                        <div className="detail-row">
                          <span className="detail-label">Timeline:</span>
                          <span className="detail-value">2-3 weeks</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Budget:</span>
                          <span className="detail-value">$5,000-$6,000/mo</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Care Needs:</span>
                          <span className="detail-value">Memory care, Private room</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Interests:</span>
                          <span className="detail-value">Gardening, Classical music</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Preferred Contact:</span>
                          <span className="detail-value">Call daughter, Text OK</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : index === 3 ? (
                  <div className="followup-container">
                    <div className="followup-card">
                      <div className="followup-header">
                        <div className="followup-title">Upcoming Follow-ups</div>
                        <div className="autopilot-toggle">
                          <div className="toggle-switch">
                            <div className="toggle-track">
                              <div className="toggle-thumb"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="reminder-item">
                        <div className="reminder-time">Monday, 9:00 AM</div>
                        <div className="reminder-contact">Sarah Johnson</div>
                        <div className="reminder-context">Follow up after family discussion regarding memory care placement. Daughter mentioned they would decide over the weekend about timeline and budget finalization.</div>
                        <div className="reminder-action">
                          <span className="action-badge">Call</span>
                        </div>
                      </div>
                      <div className="reminder-item">
                        <div className="reminder-time">Wednesday, 2:00 PM</div>
                        <div className="reminder-contact">Barbara Johnson</div>
                        <div className="reminder-context">Check in 3 days after facility tour. Barbara expressed strong interest in garden activities and private room options. Good time to discuss next steps.</div>
                        <div className="reminder-action">
                          <span className="action-badge">Text</span>
                        </div>
                      </div>
                      <div className="reminder-item">
                        <div className="reminder-time">Friday, 10:00 AM</div>
                        <div className="reminder-contact">Michael Johnson</div>
                        <div className="reminder-context">Financial decision maker review. Send detailed pricing breakdown and available move-in dates. Prefers email communication for documentation.</div>
                        <div className="reminder-action">
                          <span className="action-badge">Email</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  "Image Placeholder"
                )}
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
