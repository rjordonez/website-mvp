/**
 * Creates a PipelineLead object from session data (formData, recordingData, summaryData).
 * Used by RecordingTab and DemoTab to build leads from demo/recording flows.
 */
export function createLeadFromSession({ formData, recordingData, summaryData, id }) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleString();

  const intakeNote = {
    leadSource: "AI Demo Session",
    zipcode: "90001",
    caller: `${formData.firstName} ${formData.lastName} (${formData.situation || 'Self'})`,
    dateTime: timeStr,
    salesRep: "AI Agent",
    situationSummary: summaryData.keyPoints || ["No key points recorded"],
    careNeeds: summaryData.concerns || ["No concerns recorded"],
    budgetFinancial: ["Budget to be discussed during follow-up"],
    decisionMakers: [`${formData.firstName} ${formData.lastName}`],
    timeline: "To be determined",
    preferences: summaryData.smallThings || ["No preferences recorded"],
    objections: ["None recorded yet"],
    salesRepAssessment: ["AI-generated lead from demo session", "Requires human follow-up"],
    nextStep: ["Follow-up call scheduled", "Review AI transcript and analysis"],
  };

  return {
    id: id || `lead-${Date.now()}`,
    name: `${formData.firstName} ${formData.lastName}`,
    contactPerson: `${formData.firstName} ${formData.lastName}`,
    contactRelation: "Self",
    contactPhone: formData.phone,
    contactEmail: formData.email,
    careLevel: formData.situation?.includes('Memory') ? 'Memory Care' :
               formData.situation?.includes('Skilled') ? 'Skilled Nursing' :
               formData.situation?.includes('Independent') ? 'Independent Living' :
               'Assisted Living',
    lastContactDate: dateStr,
    facility: "Sunrise Gardens",
    stage: "inquiry",
    source: "Phone Call",
    inquiryDate: dateStr,
    initialContact: dateStr,
    nextActivity: "Follow-up call scheduled",
    salesRep: "AI Agent",
    intakeNote,
    interactions: [],
    callTranscripts: recordingData ? [{
      transcript: recordingData.transcription || summaryData.transcription || "No transcript available",
      timestamp: timeStr,
      duration: "N/A",
      audioBlob: recordingData.audioBlob || null,
    }] : [],
  };
}
