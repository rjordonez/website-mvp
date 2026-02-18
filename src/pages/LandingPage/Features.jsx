import React, { useState, useEffect } from 'react';
import './Features.css';

function Features() {
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecordingTime((prev) => (prev >= 10 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Never Miss A Call",
      description: "Our 24/7 agent ensures every inquiry becomes a lead in your system.",
      imageTitle: "Capture everything",
      imageDescription: "The call agent listens in or answers the phone if you can't. Then it uploads key details into the CRM, so you never have to write out full details again and your sales team can work more on closing leads."
    },
    {
      title: "Voice-first Note Taking",
      description: "Capture what matters instantly, without typing a word.",
      imageTitle: "Notes saved automatically to the CRM",
      imageDescription: "Speak your notes after tours or calls. They're automatically saved to the CRM, so you can refer back to specific details about each individual whenever you need them."
    },
    {
      title: "Detailed Family Profiles",
      description: "Track the context that helps you connect and convert.",
      imageTitle: "Build rich profiles that actually help you close",
      imageDescription: "Go beyond names and phone numbers. Capture decision makers, timeline, care needs, interests, and communication preferences. Because the details are what turn hesitation into a move-in."
    },
    {
      title: "Personalized Follow-ups",
      description: "Stay present without being pushy.",
      imageTitle: "Follow up, personally, not pushy",
      imageDescription: "Automated reminders based on real context. Personalized outreach tied to interests and timing. Respect how families want to communicate. Right message. Right time. Right channel."
    }
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <h2>Features</h2>
        <div className="features-list">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-header">
                <h3><span className="feature-number">{index + 1}</span> {feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="feature-image">
                {index === 0 ? (
                  <div className="first-feature-container">
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
                  <div className="notes-container-responsive">
                    <div className="audio-with-profile">
                      <div className="profile-circle">
                        <img src="/image2.png" alt="Barbara Johnson" className="profile-image" />
                      </div>
                      <div className="audio-visualizer">
                        <div className="audio-bar"></div>
                        <div className="audio-bar"></div>
                        <div className="audio-bar"></div>
                        <div className="audio-bar"></div>
                        <div className="audio-bar"></div>
                        <div className="audio-bar"></div>
                        <div className="audio-bar"></div>
                        <div className="audio-bar"></div>
                      </div>
                      <div className="recording-indicator">
                        <div className="recording-dot"></div>
                        <div className="recording-timer">{recordingTime}s</div>
                      </div>
                    </div>
                    <div className="arrow-container-notes">
                      <div className="arrow-right-responsive">→</div>
                      <div className="arrow-down-responsive">↓</div>
                    </div>
                    <div className="tour-notes-responsive">
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
                    <div className="timeline-card">
                      <div className="timeline-row">
                        <div className="timeline-step">
                          <div className="timeline-description">Trilio detects Martha (85, Female) may be needing senior living in 3 months</div>
                        </div>
                        <div className="timeline-step">
                          <div className="timeline-description">Martha mentioned she loves gardening and classical music during the call</div>
                        </div>
                        <div className="timeline-step">
                          <div className="timeline-description">Include invitation on music related community event or gardening workshop to engage Martha and her family</div>
                        </div>
                        <div className="timeline-step">
                          <div className="timeline-description"></div>
                        </div>
                      </div>
                      <div className="timeline-circles-row">
                        <div className="timeline-circle timeline-circle-active">Call</div>
                        <div className="timeline-connector"></div>
                        <div className="timeline-circle timeline-circle-active">Tour</div>
                        <div className="timeline-connector"></div>
                        <div className="timeline-circle timeline-circle-followup">Multiple follow-ups</div>
                        <div className="timeline-connector"></div>
                        <div className="timeline-circle timeline-circle-movein">Move in</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  "Image Placeholder"
                )}
              </div>
              <div className="feature-text">
                <h4>{feature.imageTitle}</h4>
                <p>{feature.imageDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
