import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import AppSidebar from "@/components/AppSidebar";
import Dashboard from "@/pages/CRM/Dashboard";
import LeadsPage from "@/pages/CRM/LeadsPage";
import ToursPage from "@/pages/CRM/ToursPage";
import FollowUpPage from "@/pages/CRM/FollowUpPage";
import '../../crm.css';

const queryClient = new QueryClient();

function CRMView({ onBack, formData, recordingData, summaryData }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Create demo lead from session data
  const demoLead = React.useMemo(() => {
    if (!formData || !summaryData) return null;

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleString();

    // Format intake note as structured object
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
      nextStep: ["Follow-up call scheduled", "Review AI transcript and analysis"]
    };

    return {
      id: "demo-lead-1",
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
      intakeNote: intakeNote,
      interactions: [],
      callTranscripts: recordingData ? [{
        transcript: recordingData.transcription || summaryData.transcription || "No transcript available",
        timestamp: timeStr,
        duration: "N/A"
      }] : []
    };
  }, [formData, recordingData, summaryData]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadsPage demoLead={demoLead} />;
      case 'tours':
        return <ToursPage />;
      case 'follow-up':
        return <FollowUpPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="flex h-screen overflow-hidden bg-background">
          <AppSidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          />
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default CRMView;
