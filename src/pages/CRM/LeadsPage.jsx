import { useState, useMemo, useRef, useEffect } from "react";
import TopBar from "@/components/TopBar";
import { mockPipelineLeads } from "@/data/mockData";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { User, Calendar, Heart, LayoutGrid, Table as TableIcon, ChevronDown, X, Phone, Mail, StickyNote } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LeadDetailDialog from "@/components/LeadDetailDialog";
import AddLeadDialog from "@/components/AddLeadDialog";
import CallDialog from "@/components/CallDialog";
import EmailComposeDialog from "@/components/EmailComposeDialog";

const stages = [
  { key: "inquiry", label: "Inquiry" },
  { key: "connection", label: "Connection" },
  { key: "pre_tour", label: "Pre-Tour" },
  { key: "post_tour", label: "Post-Tour" },
  { key: "deposit", label: "Deposit" },
  { key: "move_in", label: "Move-in" },
];

const stageProgress = {
  inquiry: 10, connection: 25, pre_tour: 45, post_tour: 65, deposit: 85, move_in: 100,
};

const stageLabel = {
  inquiry: "Inquiry", connection: "Connection", pre_tour: "Pre-Tour", post_tour: "Post-Tour", deposit: "Deposit", move_in: "Move-in",
};

const careLevelColors = {
  "Assisted Living": "bg-info/10 text-info",
  "Independent Living": "bg-success/10 text-success",
  "Memory Care": "bg-warning/10 text-warning",
  "Skilled Nursing": "bg-destructive/10 text-destructive",
};

const sourceOptions = ["Digital Ads", "Website", "Phone Call", "Walk-in", "Referral"];
const careOptions = ["Assisted Living", "Independent Living", "Memory Care", "Skilled Nursing"];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

function HeaderFilter({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isFiltered = value !== "all";

  return (
    <div ref={ref} className="relative inline-flex items-center gap-1 cursor-pointer select-none" onClick={() => setOpen(!open)}>
      <span className={`whitespace-nowrap ${isFiltered ? "text-primary font-semibold" : ""}`}>{label}</span>
      <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""} ${isFiltered ? "text-primary" : "text-muted-foreground"}`} />
      {isFiltered && (
        <button onClick={(e) => { e.stopPropagation(); onChange("all"); }} className="ml-0.5 rounded-full p-0.5 hover:bg-muted">
          <X className="h-2.5 w-2.5 text-primary" />
        </button>
      )}
      {open && (
        <div className="absolute top-full left-0 mt-1 z-30 rounded-md border border-border bg-popover shadow-md py-1 min-w-[140px]">
          <button
            onClick={(e) => { e.stopPropagation(); onChange("all"); setOpen(false); }}
            className={`w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors ${value === "all" ? "font-semibold text-primary" : "text-foreground"}`}
          >All</button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={(e) => { e.stopPropagation(); onChange(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors ${value === opt ? "font-semibold text-primary" : "text-foreground"}`}
            >{opt}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LeadsPage({ demoLead }) {
  const [leads, setLeads] = useState(() => {
    // Add demo lead after Donald Brown (last lead) if it exists
    return demoLead ? [...mockPipelineLeads, demoLead] : mockPipelineLeads;
  });
  const [view, setView] = useState("kanban");
  const [selectedLead, setSelectedLead] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [filters, setFilters] = useState({ stage: "all", source: "all", careLevel: "all", salesRep: "all" });

  // Call & Email dialog state
  const [callTarget, setCallTarget] = useState(null);
  const [emailTarget, setEmailTarget] = useState(null);

  const salesRepOptions = useMemo(() => [...new Set(leads.map((l) => l.salesRep))], [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (filters.stage !== "all" && l.stage !== filters.stage) return false;
      if (filters.source !== "all" && l.source !== filters.source) return false;
      if (filters.careLevel !== "all" && l.careLevel !== filters.careLevel) return false;
      if (filters.salesRep !== "all" && l.salesRep !== filters.salesRep) return false;
      return true;
    });
  }, [leads, filters]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceStage = source.droppableId;
    const destStage = destination.droppableId;
    const updated = [...leads];
    const sourceItems = updated.filter((l) => l.stage === sourceStage);
    const [moved] = sourceItems.splice(source.index, 1);
    moved.stage = destStage;
    const withoutMoved = updated.filter((l) => l.id !== moved.id);
    const destItems = withoutMoved.filter((l) => l.stage === destStage);
    destItems.splice(destination.index, 0, moved);
    const otherLeads = withoutMoved.filter((l) => l.stage !== destStage);
    setLeads([...otherLeads, ...destItems]);
  };

  const handleCall = (lead) => {
    setCallTarget({ name: lead.name, phone: lead.contactPhone });
  };

  const handleEmail = (lead) => {
    setEmailTarget({ name: lead.name, email: lead.contactEmail });
  };

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Leads Pipeline"
        subtitle={`${filteredLeads.length} prospects`}
        action={{ label: "Add Lead", onClick: () => setAddOpen(true) }}
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
      </div>

      <div className="flex-1 overflow-auto p-4">
        {view === "kanban" ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-3 min-w-max">
              {stages.map((stage) => {
                const stageLeads = filteredLeads.filter((l) => l.stage === stage.key);
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
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                                    <div className="flex items-center gap-0.5">
                                      <TooltipProvider delayDuration={200}>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <button
                                              onClick={(e) => { e.stopPropagation(); handleCall(lead); }}
                                              className="p-1 rounded hover:bg-muted transition-colors"
                                            >
                                              <Phone className="h-3 w-3 text-muted-foreground hover:text-primary" />
                                            </button>
                                          </TooltipTrigger>
                                          <TooltipContent side="top" className="text-xs">{lead.contactPhone}</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <button
                                              onClick={(e) => { e.stopPropagation(); handleEmail(lead); }}
                                              className="p-1 rounded hover:bg-muted transition-colors"
                                            >
                                              <Mail className="h-3 w-3 text-muted-foreground hover:text-primary" />
                                            </button>
                                          </TooltipTrigger>
                                          <TooltipContent side="top" className="text-xs">{lead.contactEmail}</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <button
                                              onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}
                                              className="p-1 rounded hover:bg-muted transition-colors"
                                            >
                                              <StickyNote className="h-3 w-3 text-muted-foreground hover:text-primary" />
                                            </button>
                                          </TooltipTrigger>
                                          <TooltipContent side="top" className="text-xs">View notes</TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  </div>
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
                                      <span>{formatDate(lead.lastContactDate)}</span>
                                    </div>
                                    <div className="text-[10px] text-muted-foreground/70">PIC: {lead.salesRep}</div>
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
        ) : (
          <div className="rounded-lg border border-border bg-card overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px] sticky left-0 bg-card z-10 whitespace-nowrap">Prospect Name</TableHead>
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
                    <HeaderFilter label="PIC" value={filters.salesRep} options={salesRepOptions} onChange={(v) => setFilters((f) => ({ ...f, salesRep: v }))} />
                  </TableHead>
                  <TableHead className="min-w-[120px] whitespace-nowrap">Point of Contact</TableHead>
                  <TableHead className="min-w-[95px] whitespace-nowrap">Inquiry Date</TableHead>
                  <TableHead className="min-w-[95px] whitespace-nowrap">Initial Contact</TableHead>
                  <TableHead className="min-w-[95px] whitespace-nowrap">Last Contact</TableHead>
                  <TableHead className="min-w-[180px] whitespace-nowrap">Next Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="cursor-pointer" onClick={() => setSelectedLead(lead)}>
                    <TableCell className="font-medium text-foreground sticky left-0 bg-card z-10 whitespace-nowrap">{lead.name}</TableCell>
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
                    <TableCell className="text-muted-foreground whitespace-nowrap">{formatDate(lead.initialContact)}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{formatDate(lead.lastContactDate)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{lead.nextActivity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <LeadDetailDialog
        lead={selectedLead}
        open={!!selectedLead}
        onOpenChange={(open) => !open && setSelectedLead(null)}
        onCall={(lead) => handleCall(lead)}
        onEmail={(lead) => handleEmail(lead)}
      />

      <AddLeadDialog open={addOpen} onOpenChange={setAddOpen} />

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
    </div>
  );
}
