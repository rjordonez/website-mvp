import { useState, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import AppSidebar from "@/components/AppSidebar";
import ChatBubble from "@/components/ChatBubble";
import Dashboard from "@/pages/CRM/Dashboard";
import TasklistPage from "@/pages/CRM/TasklistPage";
import LeadsPage from "@/pages/CRM/LeadsPage";
import ChatbotPage from "@/pages/CRM/ChatbotPage";
import ReferrersPage from "@/pages/CRM/ReferrersPage";
import { ChatProvider } from "@/contexts/ChatContext";
import { mockPipelineLeads } from "@/data/mockData";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserPlus, ClipboardList, MessageSquare } from "lucide-react";
import '../../crm.css';

const queryClient = new QueryClient();

function CRMView() {
  const [currentPage, setCurrentPage] = useState('leads');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [leads, setLeads] = useState(mockPipelineLeads);
  const [autoOpenLeadId, setAutoOpenLeadId] = useState(null);
  const isMobile = useIsMobile();

  const handleAddLead = useCallback((lead, { autoOpen } = {}) => {
    setLeads((prev) => [...prev, lead]);
    if (autoOpen) {
      setAutoOpenLeadId(lead.id);
    }
  }, []);

  const handleAutoOpenHandled = useCallback(() => {
    setAutoOpenLeadId(null);
  }, []);

  const [mobileTab, setMobileTab] = useState('leads');

  const renderPage = () => {
    if (isMobile) {
      switch (mobileTab) {
        case 'tasklist':
          return <TasklistPage />;
        case 'chatbot':
          return <ChatbotPage />;
        case 'leads':
        default:
          return (
            <LeadsPage
              leads={leads}
              setLeads={setLeads}
              onAddLead={handleAddLead}
              autoOpenLeadId={autoOpenLeadId}
              onAutoOpenHandled={handleAutoOpenHandled}
            />
          );
      }
    }
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasklist':
        return <TasklistPage />;
      case 'leads':
        return (
          <LeadsPage
            leads={leads}
            setLeads={setLeads}
            onAddLead={handleAddLead}
            autoOpenLeadId={autoOpenLeadId}
            onAutoOpenHandled={handleAutoOpenHandled}
          />
        );
      case 'referrers':
        return <ReferrersPage />;
      case 'chatbot':
        return <ChatbotPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ChatProvider leads={leads}>
          <Toaster />
          <Sonner />
          <div className="flex h-screen overflow-hidden bg-background">
            {!isMobile && (
              <AppSidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                currentPage={currentPage}
                onNavigate={setCurrentPage}
              />
            )}
            <main className={`flex-1 overflow-auto ${isMobile ? "pb-14" : ""}`}>
              {renderPage()}
            </main>
            {isMobile && (
              <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-around border-t border-border bg-card">
                {[
                  { id: "leads", icon: UserPlus, label: "Leads" },
                  { id: "tasklist", icon: ClipboardList, label: "Tasks" },
                  { id: "chatbot", icon: MessageSquare, label: "AI" },
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setMobileTab(id)}
                    className={`flex flex-col items-center gap-0.5 px-4 py-1.5 text-[10px] font-medium transition-colors ${
                      mobileTab === id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </button>
                ))}
              </nav>
            )}
          </div>
          {!isMobile && (
            <ChatBubble currentPage={currentPage} onNavigate={setCurrentPage} />
          )}
        </ChatProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default CRMView;
