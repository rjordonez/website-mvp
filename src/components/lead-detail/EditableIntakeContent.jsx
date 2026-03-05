import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { MapPin, User, Calendar, Heart, DollarSign, Clock, AlertTriangle, TrendingUp, ArrowRight, Pencil, Save, X, AlertCircle, Gift, Gem } from "lucide-react";
import { toast } from "@/hooks/use-toast";

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Icon className="h-4 w-4 text-primary" />
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
    </div>
  );
}

const sections = [
  { key: "situationSummary", icon: User, title: "Situation Summary", type: "list" },
  { key: "careNeeds", icon: Heart, title: "Care Needs", type: "list" },
  { key: "budgetFinancial", icon: DollarSign, title: "Budget & Financial", type: "list" },
  { key: "decisionMakers", icon: User, title: "Decision Makers", type: "list" },
  { key: "timeline", icon: Clock, title: "Timeline", type: "single" },
  { key: "preferences", icon: Heart, title: "Preferences", type: "list" },
  { key: "objections", icon: AlertTriangle, title: "Objections / Concerns", type: "list" },
  { key: "salesRepAssessment", icon: TrendingUp, title: "Sales Rep Assessment", type: "list" },
  { key: "nextStep", icon: ArrowRight, title: "Next Steps", type: "list" },
];

export default function EditableIntakeContent({ lead }) {
  const n = lead.intakeNote;
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [editingMustKnow, setEditingMustKnow] = useState(false);
  const [mustKnowDraft, setMustKnowDraft] = useState("");

  const startEditing = () => {
    const data = {};
    for (const sec of sections) {
      const val = n[sec.key];
      data[sec.key] = Array.isArray(val) ? val.join(". ") : val;
    }
    data.maritalStatus = lead.maritalStatus || "";
    data.specialDates = (lead.specialDates || []).map((sd) => `${sd.type}: ${sd.date}`).join(", ");
    setEditData(data);
    setEditing(true);
  };

  const handleSave = () => {
    // In production, this would persist to DB. For now, update in-memory.
    for (const sec of sections) {
      const newVal = editData[sec.key] || "";
      if (sec.type === "list") {
        n[sec.key] = newVal.split(/\.\s*/).filter(Boolean);
      } else {
        n[sec.key] = newVal;
      }
    }
    lead.maritalStatus = editData.maritalStatus || "";
    lead.specialDates = (editData.specialDates || "").split(",").map((s) => s.trim()).filter(Boolean).map((s) => {
      const [type, ...rest] = s.split(":");
      return { type: type.trim(), date: (rest.join(":") || "").trim() };
    });
    setEditing(false);
    toast({ title: "Intake note updated" });
  };

  const handleCancel = () => {
    setEditing(false);
    setEditData({});
  };

  const updateField = (key, value) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-5">
      {/* Must-Know Banner */}
      {(lead.mustKnow || editingMustKnow) && (
        <div className="rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-xs font-semibold text-warning">Must Know</p>
              {!editingMustKnow ? (
                <button
                  onClick={() => { setMustKnowDraft(lead.mustKnow || ""); setEditingMustKnow(true); }}
                  className="p-0.5 rounded hover:bg-warning/20 transition-colors"
                >
                  <Pencil className="h-3 w-3 text-warning" />
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingMustKnow(false)}
                    className="p-0.5 rounded hover:bg-warning/20 transition-colors"
                  >
                    <X className="h-3 w-3 text-warning" />
                  </button>
                  <button
                    onClick={() => { lead.mustKnow = mustKnowDraft.trim(); setEditingMustKnow(false); toast({ title: "Must Know updated" }); }}
                    className="p-0.5 rounded hover:bg-warning/20 transition-colors"
                  >
                    <Save className="h-3 w-3 text-warning" />
                  </button>
                </div>
              )}
            </div>
            {editingMustKnow ? (
              <Textarea
                value={mustKnowDraft}
                onChange={(e) => setMustKnowDraft(e.target.value)}
                className="text-sm min-h-[50px] bg-background/50 border-warning/30"
                autoFocus
              />
            ) : (
              <p className="text-sm text-foreground leading-relaxed">{lead.mustKnow}</p>
            )}
          </div>
        </div>
      )}

      {/* Header info (non-editable metadata) */}
      <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>Lead Source: <span className="text-foreground font-medium">{n.leadSource}</span></span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>Zipcode: <span className="text-foreground font-medium">{n.zipcode}</span></span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span>Caller: <span className="text-foreground font-medium">{n.caller}</span></span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{n.dateTime}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span>Assign To: <span className="text-foreground font-medium">{n.salesRep}</span></span>
        </div>
      </div>

      <div className="flex justify-end">
        {!editing ? (
          <Button variant="outline" size="sm" onClick={startEditing} className="text-xs">
            <Pencil className="h-3.5 w-3.5 mr-1" /> Edit Intake
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCancel} className="text-xs">
              <X className="h-3.5 w-3.5 mr-1" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSave} className="text-xs">
              <Save className="h-3.5 w-3.5 mr-1" /> Save
            </Button>
          </div>
        )}
      </div>

      <Separator />

      {/* Personal Info — editable */}
      <div>
        <SectionHeader icon={Gem} title="Marital Status" />
        {editing ? (
          <div className="pl-6">
            <input
              type="text"
              value={editData.maritalStatus || ""}
              onChange={(e) => updateField("maritalStatus", e.target.value)}
              placeholder="e.g. Single, Married, Widow"
              className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        ) : (
          <p className="pl-6 text-sm text-muted-foreground leading-relaxed">{lead.maritalStatus || "—"}</p>
        )}
      </div>
      <div>
        <SectionHeader icon={Gift} title="Special Dates" />
        {editing ? (
          <div className="pl-6">
            <input
              type="text"
              value={editData.specialDates || ""}
              onChange={(e) => updateField("specialDates", e.target.value)}
              placeholder="e.g. Birthday: Mar 15, Anniversary: Jun 18"
              className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        ) : (
          <p className="pl-6 text-sm text-muted-foreground leading-relaxed">
            {lead.specialDates && lead.specialDates.length > 0
              ? lead.specialDates.map((sd) => `${sd.type}: ${sd.date}`).join(" · ")
              : "—"}
          </p>
        )}
      </div>

      <Separator />

      {sections.map((sec) => {
        const val = n[sec.key];
        const displayText = Array.isArray(val) ? val.join(". ") + "." : val;

        return (
          <div key={sec.key}>
            <SectionHeader icon={sec.icon} title={sec.title} />
            {editing ? (
              <div className="pl-6">
                <Textarea
                  value={editData[sec.key] || ""}
                  onChange={(e) => updateField(sec.key, e.target.value)}
                  className="text-sm min-h-[60px]"
                />
              </div>
            ) : (
              <p className="pl-6 text-sm text-muted-foreground leading-relaxed">{displayText}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
