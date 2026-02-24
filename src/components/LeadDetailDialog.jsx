import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, Calendar, User, DollarSign, Heart, AlertTriangle, TrendingUp, ArrowRight, Sparkles, Loader2, Eye, ThumbsUp, ThumbsDown, Target, BarChart3, CheckCircle2, MessageSquare, ArrowRightLeft, Users, Plus, Headphones } from "lucide-react";

import { toast } from "@/hooks/use-toast";
import AudioNoteRecorder from "@/components/lead-detail/AudioNoteRecorder";
import EditableIntakeContent from "@/components/lead-detail/EditableIntakeContent";
import CallTranscriptContent from "@/components/lead-detail/CallTranscriptContent";

const careLevelColors = {
  "Assisted Living": "bg-info/10 text-info border-info/20",
  "Independent Living": "bg-success/10 text-success border-success/20",
  "Memory Care": "bg-warning/10 text-warning border-warning/20",
  "Skilled Nursing": "bg-destructive/10 text-destructive border-destructive/20",
};

const stageLabel = {
  inquiry: "Inquiry",
  connection: "Connection",
  pre_tour: "Post-Assessment",
  post_tour: "Post-Tour",
  deposit: "Deposit",
  move_in: "Move-in",
};

function Section({ icon: Icon, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      </div>
      <div className="pl-6">{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function generateMockSummary(lead) {
  const n = lead.intakeNote;
  const pt = lead.postTourNote;

  let summary = `**${lead.name}** is a ${lead.careLevel.toLowerCase()} prospect currently in the **${stageLabel[lead.stage]}** stage. ${n.caller} reached out via ${n.leadSource.toLowerCase()}.

**Key situation:** ${n.situationSummary[0]}. ${n.situationSummary.length > 1 ? n.situationSummary[1] + "." : ""}

**Care needs** include ${n.careNeeds.slice(0, 3).join(", ").toLowerCase()}. The family's budget is ${n.budgetFinancial[0].toLowerCase()}.

**Decision makers:** ${n.decisionMakers.join("; ")}. **Timeline:** ${n.timeline.toLowerCase()}.

**Main concerns:** ${n.objections.join("; ").toLowerCase()}.`;

  if (pt) {
    summary += `

**Post-tour update:** Tour on ${pt.tourDate} with ${pt.attendees}. ${pt.firstImpressions[0]}. ${pt.emotionalSignals[0]}. Probability to close: ${pt.probabilityToClose}. Next step: ${pt.nextStepScheduled}.`;
  }

  summary += `

**Sales assessment:** ${n.salesRepAssessment.join(". ")}. **Next steps:** ${n.nextStep.join("; ")}.`;

  return summary;
}

// IntakeNoteContent moved to EditableIntakeContent component

function PostTourNoteContent({ lead }) {
  const pt = lead.postTourNote;
  if (!pt) return <p className="text-sm text-muted-foreground italic">No post-tour note available.</p>;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-3.5 w-3.5" /><span>Tour Date: <span className="text-foreground font-medium">{pt.tourDate}</span></span></div>
        <div className="flex items-center gap-2 text-muted-foreground"><User className="h-3.5 w-3.5" /><span>Guide: <span className="text-foreground font-medium">{pt.tourGuide}</span></span></div>
        <div className="flex items-center gap-2 text-muted-foreground col-span-2"><User className="h-3.5 w-3.5" /><span>Attendees: <span className="text-foreground font-medium">{pt.attendees}</span></span></div>
      </div>
      <Separator />
      <Section icon={Eye} title="First Impressions"><BulletList items={pt.firstImpressions} /></Section>
      <Section icon={Heart} title="Emotional Signals"><BulletList items={pt.emotionalSignals} /></Section>
      <Section icon={ThumbsUp} title="Likes"><BulletList items={pt.likes} /></Section>
      <Section icon={AlertTriangle} title="Concerns Raised"><BulletList items={pt.concernsRaised} /></Section>
      <Section icon={DollarSign} title="Pricing Reaction"><BulletList items={pt.pricingReaction} /></Section>
      <Section icon={Target} title="Buying Signals"><BulletList items={pt.buyingSignals} /></Section>
      <Section icon={ThumbsDown} title="Risk Signals"><BulletList items={pt.riskSignals} /></Section>
      <Section icon={TrendingUp} title="Sales Rep Assessment"><BulletList items={pt.salesRepAssessment} /></Section>
      <Section icon={BarChart3} title="Probability to Close"><p className="text-sm text-muted-foreground font-medium">{pt.probabilityToClose}</p></Section>
      <Section icon={CheckCircle2} title="Follow-Up Actions"><BulletList items={pt.followUpActions} /></Section>
      <Section icon={ArrowRight} title="Next Step Scheduled"><p className="text-sm text-muted-foreground font-medium">{pt.nextStepScheduled}</p></Section>
    </div>
  );
}

const interactionIcons = {
  call: Phone,
  email: Mail,
  tour: Eye,
  note: MessageSquare,
  stage_change: ArrowRightLeft,
  meeting: Users,
};

const interactionColors = {
  call: "bg-info/10 text-info",
  email: "bg-primary/10 text-primary",
  tour: "bg-success/10 text-success",
  note: "bg-warning/10 text-warning",
  stage_change: "bg-muted text-muted-foreground",
  meeting: "bg-accent text-accent-foreground",
};

function formatTimelineDate(dateStr) {
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

function TimelineContent({ interactions, onAddNote }) {
  const [addingNote, setAddingNote] = useState(false);

  return (
    <div className="space-y-4">
      {!addingNote ? (
        <Button variant="outline" size="sm" className="w-full" onClick={() => setAddingNote(true)}>
          <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Note
        </Button>
      ) : (
        <AudioNoteRecorder onAddNote={(note) => { onAddNote(note); setAddingNote(false); }} onCancel={() => setAddingNote(false)} />
      )}

      {/* Timeline */}
      <div className="relative space-y-0">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
        {interactions.map((entry) => {
          const Icon = interactionIcons[entry.type];
          const colorClass = interactionColors[entry.type];
          return (
            <div key={entry.id} className="relative flex gap-3 pb-4">
              <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colorClass}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 pt-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{entry.title}</span>
                  <span className="text-[10px] text-muted-foreground">{formatTimelineDate(entry.date)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{entry.description}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">by {entry.by}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LeadDetailDialog({ lead, open, onOpenChange, onCall, onEmail, isMobile }) {
  const [aiSummary, setAiSummary] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [localInteractions, setLocalInteractions] = useState([]);

  // Sync interactions when lead changes
  const interactions = lead ? [...localInteractions.filter(n => n.id.startsWith("note-")), ...lead.interactions] : [];

  if (!lead) return null;

  const hasPostTour = !!lead.postTourNote;

  const handleAiSummary = () => {
    setAiLoading(true);
    setAiSummary(null);
    setTimeout(() => {
      setAiSummary(generateMockSummary(lead));
      setAiLoading(false);
    }, 1500);
  };

  const handleClose = (openState) => {
    if (!openState) {
      setAiSummary(null);
      setAiLoading(false);
    }
    onOpenChange(openState);
  };

  const handleAddNote = (note) => {
    setLocalInteractions((prev) => [note, ...prev]);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent fullScreen={isMobile} className={isMobile ? "" : "max-w-2xl max-h-[85vh] overflow-y-auto"}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Phone className="h-3 w-3" />
              <span>{hasPostTour ? "Post-Tour Note — After First Visit" : "First Call Note — Prospect Intake"}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAiSummary}
              disabled={aiLoading}
              className="flex items-center gap-1.5 text-xs"
            >
              {aiLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              )}
              AI Summary
            </Button>
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">{lead.name}</DialogTitle>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <button
              onClick={() => onCall?.(lead)}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Phone className="h-3 w-3" />{lead.contactPhone}
            </button>
            <button
              onClick={() => onEmail?.(lead)}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Mail className="h-3 w-3" />{lead.contactEmail}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className={careLevelColors[lead.careLevel]}>{lead.careLevel}</Badge>
            <Badge variant="secondary">{stageLabel[lead.stage]}</Badge>
            <Badge variant="secondary">{lead.source}</Badge>
            <Badge variant="secondary">PIC: {lead.salesRep}</Badge>
          </div>
        </DialogHeader>

        {/* AI Summary */}
        {(aiLoading || aiSummary) && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold text-foreground">AI Summary</h4>
            </div>
            {aiLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing prospect data...
              </div>
            ) : (
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {aiSummary?.split("**").map((part, i) =>
                  i % 2 === 1 ? (
                    <strong key={i} className="text-foreground font-medium">{part}</strong>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
            )}
          </div>
        )}

        <Tabs defaultValue={hasPostTour ? "post_tour" : "intake"} className="mt-2">
          <TabsList className={`w-full grid ${hasPostTour ? "grid-cols-4" : "grid-cols-3"}`}>
            {hasPostTour && <TabsTrigger value="post_tour">🏡 Post-Tour</TabsTrigger>}
            <TabsTrigger value="intake">☎️ Intake</TabsTrigger>
            <TabsTrigger value="timeline">📋 Activity Log</TabsTrigger>
            <TabsTrigger value="recordings">🎧 Recordings</TabsTrigger>
          </TabsList>
          {hasPostTour && (
            <TabsContent value="post_tour" className="mt-4">
              <PostTourNoteContent lead={lead} />
            </TabsContent>
          )}
          <TabsContent value="intake" className="mt-4">
            <EditableIntakeContent lead={lead} />
          </TabsContent>
          <TabsContent value="timeline" className="mt-4">
            <TimelineContent interactions={interactions} onAddNote={handleAddNote} />
          </TabsContent>
          <TabsContent value="recordings" className="mt-4">
            <CallTranscriptContent transcripts={lead.callTranscripts || []} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
