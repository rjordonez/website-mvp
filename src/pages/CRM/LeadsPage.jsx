import { useState, useMemo, useRef, useEffect } from "react";
import TopBar from "@/components/TopBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { User, Calendar, Heart, LayoutGrid, Table as TableIcon, ChevronDown, X, Phone, Mail, StickyNote, ArrowRightLeft, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import LeadDetailDialog from "@/components/LeadDetailDialog";
import AddLeadDialog from "@/components/AddLeadDialog";
import BulkImportDialog from "@/components/BulkImportDialog";
import CallDialog from "@/components/CallDialog";
import EmailComposeDialog from "@/components/EmailComposeDialog";

const stages = [
  { key: "inquiry", label: "Inquiry" },
  { key: "connection", label: "Connection" },
  { key: "pre_tour", label: "Pre-Tour" },
  { key: "post_tour", label: "Post-Tour" },
  { key: "deposit", label: "Deposit" },
  { key: "move_in", label: "Move-in" },
  { key: "declined", label: "Declined" },
];

const stageProgress = {
  inquiry: 10, connection: 25, pre_tour: 45, post_tour: 65, deposit: 85, move_in: 100, declined: 0,
};

const stageLabel = {
  inquiry: "Inquiry", connection: "Connection", pre_tour: "Pre-Tour", post_tour: "Post-Tour", deposit: "Deposit", move_in: "Move-in", declined: "Declined",
};

const careLevelColors = {
  "Assisted Living": "bg-info/10 text-info",
  "Independent Living": "bg-success/10 text-success",
  "Memory Care": "bg-warning/10 text-warning",
  "Skilled Nursing": "bg-destructive/10 text-destructive",
};

const scoreColors = {
  hot: "bg-destructive/15 text-destructive",
  warm: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  cold: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  nurture: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const sourceOptions = ["Digital Ads", "Event", "Phone Call", "Referral", "Walk-in", "Website"];
const careOptions = ["Assisted Living", "Independent Living", "Memory Care", "Skilled Nursing"];
const scoreOptions = ["cold", "hot", "nurture", "warm"];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

function formatRelativeDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const days = Math.floor(diffMs / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days <= 6) return `${days} days ago`;
  if (days <= 13) return "A week ago";
  if (days <= 27) return `${Math.floor(days / 7)} weeks ago`;
  if (days <= 59) return "A month ago";
  return `${Math.floor(days / 30)} months ago`;
}

const dateRangeOptions = [
  { label: "Today", days: 0 },
  { label: "Last 7 days", days: 7 },
  { label: "Last 14 days", days: 14 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 60 days", days: 60 },
  { label: "Last 90 days", days: 90 },
];

function DateRangeFilter({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isFiltered = value !== "all";

  const getDropdownPosition = () => {
    if (!triggerRef.current) return {};
    const rect = triggerRef.current.getBoundingClientRect();
    return {
      position: "fixed",
      top: rect.bottom + 4,
      left: Math.max(8, Math.min(rect.left, window.innerWidth - 180)),
    };
  };

  return (
    <div className="inline-flex items-center gap-1 cursor-pointer select-none">
      <div ref={triggerRef} className="inline-flex items-center gap-1" onClick={() => setOpen(!open)}>
        <span className={`whitespace-nowrap ${isFiltered ? "text-primary font-semibold" : ""}`}>{label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""} ${isFiltered ? "text-primary" : "text-muted-foreground"}`} />
      </div>
      {isFiltered && (
        <button onClick={(e) => { e.stopPropagation(); onChange("all"); }} className="ml-0.5 rounded-full p-0.5 hover:bg-muted">
          <X className="h-2.5 w-2.5 text-primary" />
        </button>
      )}
      {open && (
        <div ref={dropdownRef} style={getDropdownPosition()} className="z-50 rounded-md border border-border bg-popover shadow-lg py-1 min-w-[160px] max-h-[60vh] overflow-y-auto flex flex-col">
          <button
            onClick={(e) => { e.stopPropagation(); onChange("all"); setOpen(false); }}
            className={`w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors ${value === "all" ? "font-semibold text-primary" : "text-foreground"}`}
          >All</button>
          {dateRangeOptions.map((opt) => (
            <button
              key={opt.days}
              onClick={(e) => { e.stopPropagation(); onChange(opt.days); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors ${value === opt.days ? "font-semibold text-primary" : "text-foreground"}`}
            >{opt.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function HeaderFilter({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  const sortedOptions = useMemo(() => [...options].sort((a, b) => a.localeCompare(b)), [options]);

  useEffect(() => {
    const handler = (e) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isFiltered = value !== "all";

  const getDropdownPosition = () => {
    if (!triggerRef.current) return {};
    const rect = triggerRef.current.getBoundingClientRect();
    return {
      position: "fixed",
      top: rect.bottom + 4,
      left: Math.max(8, Math.min(rect.left, window.innerWidth - 180)),
    };
  };

  return (
    <div className="inline-flex items-center gap-1 cursor-pointer select-none">
      <div ref={triggerRef} className="inline-flex items-center gap-1" onClick={() => setOpen(!open)}>
        <span className={`whitespace-nowrap ${isFiltered ? "text-primary font-semibold" : ""}`}>{label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""} ${isFiltered ? "text-primary" : "text-muted-foreground"}`} />
      </div>
      {isFiltered && (
        <button onClick={(e) => { e.stopPropagation(); onChange("all"); }} className="ml-0.5 rounded-full p-0.5 hover:bg-muted">
          <X className="h-2.5 w-2.5 text-primary" />
        </button>
      )}
      {open && (
        <div ref={dropdownRef} style={getDropdownPosition()} className="z-50 rounded-md border border-border bg-popover shadow-lg py-1 min-w-[160px] max-h-[60vh] overflow-y-auto flex flex-col">
          <button
            onClick={(e) => { e.stopPropagation(); onChange("all"); setOpen(false); }}
            className={`w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors ${value === "all" ? "font-semibold text-primary" : "text-foreground"}`}
          >All</button>
          {sortedOptions.map((opt) => (
            <button
              key={opt}
              onClick={(e) => { e.stopPropagation(); onChange(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors ${value === opt ? "font-semibold text-primary" : "text-foreground"}`}
            >{opt}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function StageChangeModal({ lead, open, onOpenChange, onStageChange, isMobile }) {
  if (!lead) return null;

  const stageList = (
    <div className="space-y-1 p-4">
      {stages.map((stage) => (
        <button
          key={stage.key}
          onClick={() => {
            onStageChange(lead.id, stage.key);
            onOpenChange(false);
          }}
          className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
            lead.stage === stage.key
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted text-foreground"
          }`}
        >
          <span>{stage.label}</span>
          {lead.stage === stage.key && <Check className="h-4 w-4" />}
        </button>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Move {lead.name}</DrawerTitle>
          </DrawerHeader>
          {stageList}
          <div className="p-4 pt-0">
            <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Move {lead.name}</DialogTitle>
        </DialogHeader>
        {stageList}
      </DialogContent>
    </Dialog>
  );
}

export default function LeadsPage({ leads, setLeads, onAddLead, autoOpenLeadId, onAutoOpenHandled }) {
  const isMobile = useIsMobile();
  const [view, setView] = useState("table");
  const [selectedLead, setSelectedLead] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [filters, setFilters] = useState({ stage: "all", source: "all", careLevel: "all", salesRep: "all", score: "all", inquiryDate: "all", lastContact: "all" });
  const [stageChangeLead, setStageChangeLead] = useState(null);
  const [kanbanCareFilter, setKanbanCareFilter] = useState("all");

  // Decline reason dialog state
  const [declinePending, setDeclinePending] = useState(null); // { leadId, fromStage }
  const [declineReason, setDeclineReason] = useState("");

  // Call & Email dialog state
  const [callTarget, setCallTarget] = useState(null);
  const [emailTarget, setEmailTarget] = useState(null);

  // Auto-open lead detail dialog when autoOpenLeadId is set
  useEffect(() => {
    if (autoOpenLeadId) {
      const lead = leads.find((l) => l.id === autoOpenLeadId);
      if (lead) {
        setSelectedLead(lead);
        onAutoOpenHandled?.();
      }
    }
  }, [autoOpenLeadId, leads, onAutoOpenHandled]);

  const salesRepOptions = useMemo(() => [...new Set(leads.map((l) => l.salesRep))], [leads]);

  const filteredLeads = useMemo(() => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    return leads.filter((l) => {
      if (filters.stage !== "all" && l.stage !== filters.stage) return false;
      if (filters.source !== "all" && l.source !== filters.source) return false;
      if (filters.careLevel !== "all" && l.careLevel !== filters.careLevel) return false;
      if (filters.salesRep !== "all" && l.salesRep !== filters.salesRep) return false;
      if (filters.score !== "all" && l.score !== filters.score) return false;
      if (filters.inquiryDate !== "all" && l.inquiryDate) {
        const d = new Date(l.inquiryDate);
        const cutoff = new Date(now);
        cutoff.setDate(cutoff.getDate() - filters.inquiryDate);
        cutoff.setHours(0, 0, 0, 0);
        if (d < cutoff) return false;
      }
      if (filters.lastContact !== "all" && l.lastContactDate) {
        const d = new Date(l.lastContactDate);
        const cutoff = new Date(now);
        cutoff.setDate(cutoff.getDate() - filters.lastContact);
        cutoff.setHours(0, 0, 0, 0);
        if (d < cutoff) return false;
      }
      return true;
    });
  }, [leads, filters]);

  const logStageChange = (lead, fromStage, toStage) => {
    const fromLabel = stages.find((s) => s.key === fromStage)?.label || fromStage;
    const toLabel = stages.find((s) => s.key === toStage)?.label || toStage;
    const entry = {
      id: `${lead.id}-sc-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      type: "stage_change",
      title: `Moved to ${toLabel}`,
      description: `Lead advanced from ${fromLabel} to ${toLabel}.`,
      by: lead.salesRep || "System",
    };
    if (!lead.interactions) lead.interactions = [];
    lead.interactions.unshift(entry);
  };

  const applyStageChange = (leadId, newStage) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== leadId) return l;
        logStageChange(l, l.stage, newStage);
        return { ...l, stage: newStage };
      })
    );
  };

  const confirmDecline = () => {
    if (!declinePending) return;
    const lead = leads.find((l) => l.id === declinePending.leadId);
    if (lead) {
      const reason = declineReason.trim() || "No reason provided";
      if (!lead.interactions) lead.interactions = [];
      lead.interactions.unshift({
        id: `${lead.id}-decline-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        type: "stage_change",
        title: "Declined",
        description: `Lead declined. Reason: ${reason}`,
        by: lead.salesRep || "System",
      });
    }
    applyStageChange(declinePending.leadId, "declined");
    setDeclinePending(null);
    setDeclineReason("");
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceStage = source.droppableId;
    const destStage = destination.droppableId;
    if (sourceStage === destStage && source.index === destination.index) return;
    const sourceItems = leads.filter((l) => l.stage === sourceStage);
    const lead = sourceItems[source.index];
    if (destStage === "declined") {
      setDeclinePending({ leadId: lead.id, fromStage: sourceStage });
      return;
    }
    logStageChange(lead, sourceStage, destStage);
    const moved = { ...lead, stage: destStage };
    const withoutMoved = leads.filter((l) => l.id !== moved.id);
    const destItems = withoutMoved.filter((l) => l.stage === destStage);
    destItems.splice(destination.index, 0, moved);
    const otherLeads = withoutMoved.filter((l) => l.stage !== destStage);
    setLeads([...otherLeads, ...destItems]);
  };

  const handleStageChange = (leadId, newStage) => {
    if (newStage === "declined") {
      setDeclinePending({ leadId, fromStage: leads.find((l) => l.id === leadId)?.stage });
      return;
    }
    applyStageChange(leadId, newStage);
  };

  const handleCall = (lead) => {
    setCallTarget({ name: lead.name, phone: lead.contactPhone });
  };

  const handleEmail = (lead) => {
    setEmailTarget({ name: lead.name, email: lead.contactEmail });
  };

  // --- Mobile Kanban ---
  const renderMobileKanban = () => (
    <div className="space-y-4">
      {stages.map((stage) => {
        const stageLeads = filteredLeads.filter((l) => l.stage === stage.key);
        return (
          <div key={stage.key}>
            <div className="flex items-center gap-2 mb-2 px-1">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">{stage.label}</h3>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">{stageLeads.length}</span>
            </div>
            <div className="space-y-2">
              {stageLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-lg border border-border bg-card p-3 shadow-crm-sm"
                >
                  <div className="flex items-center justify-between">
                    <p
                      className="text-sm font-semibold text-foreground cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      {lead.name}
                    </p>
                    <button
                      onClick={() => setStageChangeLead(lead)}
                      className="p-1.5 rounded hover:bg-muted transition-colors"
                    >
                      <ArrowRightLeft className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Heart className="h-3 w-3 text-muted-foreground" />
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${careLevelColors[lead.careLevel]}`}>{lead.careLevel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatRelativeDate(lead.lastContactDate)}</span>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium capitalize ${scoreColors[lead.score] || ""}`}>{lead.score}</span>
                    </div>
                  </div>
                </div>
              ))}
              {stageLeads.length === 0 && (
                <div className="rounded-lg bg-muted/30 p-4 text-center text-xs text-muted-foreground">No leads</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  // --- Mobile Table (card list) ---
  const renderMobileTable = () => (
    <div className="space-y-2">
      {filteredLeads.map((lead) => (
        <div
          key={lead.id}
          onClick={() => setSelectedLead(lead)}
          className="rounded-lg border border-border bg-card p-3 shadow-crm-sm cursor-pointer active:bg-muted/50 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">{lead.name}</p>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${careLevelColors[lead.careLevel]}`}>{lead.careLevel}</span>
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <Progress value={stageProgress[lead.stage]} className="h-2 flex-1" />
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{stageLabel[lead.stage]}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{lead.source}</span>
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium capitalize ${scoreColors[lead.score] || ""}`}>{lead.score}</span>
            <span>{formatRelativeDate(lead.lastContactDate)}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Leads Pipeline"
        subtitle={`${filteredLeads.length} prospects`}
        action={{ label: "Add Lead", onClick: () => setAddOpen(true) }}
        secondaryAction={{ label: "Import", onClick: () => setImportOpen(true) }}
        isMobile={isMobile}
      />

      {/* View toggle */}
      <div className="flex items-center gap-2 px-4 pt-3">
        <button
          onClick={() => setView("kanban")}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            view === "kanban" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <LayoutGrid className="h-3.5 w-3.5" /> Kanban
        </button>
        <button
          onClick={() => setView("table")}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            view === "table" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <TableIcon className="h-3.5 w-3.5" /> Table
        </button>
        {view === "kanban" && !isMobile && (
          <div className="flex items-center gap-1.5 ml-4">
            <select
              value={kanbanCareFilter}
              onChange={(e) => setKanbanCareFilter(e.target.value)}
              className="h-7 rounded-md border border-border bg-background px-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Care Types</option>
              {careOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4">
        {view === "kanban" ? (
          isMobile ? (
            renderMobileKanban()
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex gap-3 min-w-max">
                {stages.map((stage) => {
                  const stageLeads = filteredLeads.filter((l) =>
                    l.stage === stage.key && (kanbanCareFilter === "all" || l.careLevel === kanbanCareFilter)
                  );
                  return (
                    <div key={stage.key} className="w-64 flex-shrink-0">
                      <div className="flex items-center gap-2 mb-3 px-1">
                        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">{stage.label}</h3>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">{stageLeads.length}</span>
                      </div>
                      <Droppable droppableId={stage.key}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`space-y-2 min-h-[200px] rounded-lg p-2 transition-colors ${snapshot.isDraggingOver ? "bg-primary/5" : "bg-muted/30"}`}
                          >
                            {stageLeads.map((lead, index) => (
                              <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => setSelectedLead(lead)}
                                    className={`rounded-lg border border-border bg-card p-3 shadow-crm-sm cursor-grab active:cursor-grabbing transition-shadow ${
                                      snapshot.isDragging ? "shadow-crm-lg rotate-1" : "hover:shadow-crm-md"
                                    }`}
                                  >
                                    <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                                    <div className="mt-2 space-y-1.5">
                                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <User className="h-3 w-3" />
                                        <span>{lead.contactPerson}{lead.contactRelation && ` (${lead.contactRelation})`}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5 text-xs">
                                        <Heart className="h-3 w-3 text-muted-foreground" />
                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${careLevelColors[lead.careLevel]}`}>{lead.careLevel}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Calendar className="h-3 w-3" />
                                        <span>{formatRelativeDate(lead.lastContactDate)}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium capitalize ${scoreColors[lead.score] || ""}`}>{lead.score}</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  );
                })}
              </div>
            </DragDropContext>
          )
        ) : (
          isMobile ? (
            renderMobileTable()
          ) : (
            <div className="rounded-lg border border-border bg-card overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px] sticky left-0 bg-card z-10 whitespace-nowrap">Prospect Name</TableHead>
                    <TableHead className="min-w-[90px] whitespace-nowrap">
                      <HeaderFilter label="Score" value={filters.score} options={scoreOptions} onChange={(v) => setFilters((f) => ({ ...f, score: v }))} />
                    </TableHead>
                    <TableHead className="min-w-[170px] whitespace-nowrap">
                      <HeaderFilter label="Stage" value={filters.stage} options={stages.map((s) => s.key)} onChange={(v) => setFilters((f) => ({ ...f, stage: v }))} />
                    </TableHead>
                    <TableHead className="min-w-[110px] whitespace-nowrap">
                      <HeaderFilter label="Source" value={filters.source} options={sourceOptions} onChange={(v) => setFilters((f) => ({ ...f, source: v }))} />
                    </TableHead>
                    <TableHead className="min-w-[130px] whitespace-nowrap">
                      <HeaderFilter label="Care Type" value={filters.careLevel} options={careOptions} onChange={(v) => setFilters((f) => ({ ...f, careLevel: v }))} />
                    </TableHead>
                    <TableHead className="min-w-[110px] whitespace-nowrap">
                      <HeaderFilter label="Assign To" value={filters.salesRep} options={salesRepOptions} onChange={(v) => setFilters((f) => ({ ...f, salesRep: v }))} />
                    </TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">Contact</TableHead>
                    <TableHead className="min-w-[95px] whitespace-nowrap">
                      <DateRangeFilter label="Inquiry Date" value={filters.inquiryDate} onChange={(v) => setFilters((f) => ({ ...f, inquiryDate: v }))} />
                    </TableHead>
                    <TableHead className="min-w-[95px] whitespace-nowrap">
                      <DateRangeFilter label="Last Contact" value={filters.lastContact} onChange={(v) => setFilters((f) => ({ ...f, lastContact: v }))} />
                    </TableHead>
                    <TableHead className="min-w-[180px] whitespace-nowrap">Next Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="cursor-pointer" onClick={() => setSelectedLead(lead)}>
                      <TableCell className="font-medium text-foreground sticky left-0 bg-card z-10 whitespace-nowrap">{lead.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize whitespace-nowrap ${scoreColors[lead.score] || ""}`}>{lead.score}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={stageProgress[lead.stage]} className="h-2 w-16" />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{stageLabel[lead.stage]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{lead.source}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${careLevelColors[lead.careLevel]}`}>{lead.careLevel}</span>
                      </TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{lead.salesRep}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">
                        {lead.contactPerson}{lead.contactRelation ? ` (${lead.contactRelation})` : ""}
                      </TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{formatDate(lead.inquiryDate)}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{formatRelativeDate(lead.lastContactDate)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{lead.nextActivity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )
        )}
      </div>

      <LeadDetailDialog
        lead={selectedLead}
        open={!!selectedLead}
        onOpenChange={(open) => !open && setSelectedLead(null)}
        onCall={(lead) => handleCall(lead)}
        onEmail={(lead) => handleEmail(lead)}
        isMobile={isMobile}
      />

      <AddLeadDialog open={addOpen} onOpenChange={setAddOpen} onLeadCreated={onAddLead} isMobile={isMobile} />
      <BulkImportDialog open={importOpen} onOpenChange={setImportOpen} type="leads" />

      <CallDialog
        open={!!callTarget}
        onOpenChange={(open) => !open && setCallTarget(null)}
        name={callTarget?.name || ""}
        phone={callTarget?.phone || ""}
      />

      <EmailComposeDialog
        open={!!emailTarget}
        onOpenChange={(open) => !open && setEmailTarget(null)}
        name={emailTarget?.name || ""}
        email={emailTarget?.email || ""}
      />

      <StageChangeModal
        lead={stageChangeLead}
        open={!!stageChangeLead}
        onOpenChange={(open) => !open && setStageChangeLead(null)}
        onStageChange={handleStageChange}
        isMobile={isMobile}
      />

      {/* Decline Reason Dialog */}
      <Dialog open={!!declinePending} onOpenChange={(open) => { if (!open) { setDeclinePending(null); setDeclineReason(""); } }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Reason for Declining</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-1">
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Why is this lead being declined?"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm min-h-[80px] resize-none focus:outline-none focus:ring-1 focus:ring-primary"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => { setDeclinePending(null); setDeclineReason(""); }}>Cancel</Button>
              <Button variant="destructive" size="sm" onClick={confirmDecline}>Decline</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {view === "kanban" && !isMobile && (
        <p className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 bg-muted/50 px-4 py-1.5 rounded-full backdrop-blur-sm">Drag and drop prospects to update their pipeline stage</p>
      )}
    </div>
  );
}
