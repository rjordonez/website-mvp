import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, User, Heart, DollarSign, Clock, AlertTriangle, TrendingUp, ArrowRight, Pencil, X, AlertCircle, Gem, Stethoscope, Users, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

/* ── Inline editable field (single line) ── */
function EditableField({ value, onSave, placeholder }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const ref = useRef(null);
  const saving = useRef(false);

  const start = () => { setDraft(value || ""); saving.current = false; setEditing(true); };

  useEffect(() => { if (editing && ref.current) ref.current.focus(); }, [editing]);

  const commit = () => {
    if (saving.current) return;
    saving.current = true;
    onSave(draft.trim());
    setEditing(false);
  };

  const onKey = (e) => {
    if (e.key === "Enter") { e.preventDefault(); ref.current?.blur(); }
    if (e.key === "Escape") { saving.current = true; setEditing(false); }
  };

  if (editing) {
    return (
      <input
        ref={ref}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={onKey}
        placeholder={placeholder}
        className="w-full text-sm text-foreground bg-background/50 border border-dashed border-muted-foreground/25 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-primary"
      />
    );
  }

  return (
    <div className="group/field flex items-center gap-1.5 min-h-[28px]">
      <span className={`text-sm flex-1 ${value ? "text-foreground" : "text-muted-foreground/50 italic"}`}>
        {value || placeholder || "—"}
      </span>
      <button onClick={start} className="opacity-0 group-hover/field:opacity-100 p-0.5 rounded hover:bg-muted transition-all shrink-0">
        <Pencil className="h-3 w-3 text-muted-foreground" />
      </button>
    </div>
  );
}

/* ── Inline editable text area (multi-line) ── */
function EditableTextArea({ value, onSave, sectionType }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const ref = useRef(null);
  const saving = useRef(false);

  const start = () => { setDraft(value || ""); saving.current = false; setEditing(true); };

  useEffect(() => {
    if (editing && ref.current) {
      const el = ref.current;
      el.focus();
      el.selectionStart = el.selectionEnd = el.value.length;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }, [editing]);

  const commit = () => {
    if (saving.current) return;
    saving.current = true;
    const trimmed = draft.trim();
    const newVal = sectionType === "list" ? trimmed.split(/\.\s*/).filter(Boolean) : trimmed;
    onSave(newVal);
    setEditing(false);
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ref.current?.blur(); }
    if (e.key === "Escape") { saving.current = true; setEditing(false); }
  };

  if (editing) {
    return (
      <textarea
        ref={ref}
        value={draft}
        onChange={(e) => { setDraft(e.target.value); e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
        onBlur={commit}
        onKeyDown={onKey}
        className="w-full text-sm text-foreground leading-relaxed bg-background/50 border border-dashed border-muted-foreground/25 rounded px-2 py-1.5 outline-none resize-none focus:ring-1 focus:ring-primary"
        rows={1}
      />
    );
  }

  return (
    <div className="group/field flex items-start gap-1.5">
      <p className={`text-sm leading-relaxed flex-1 ${value ? "text-muted-foreground" : "text-muted-foreground/50 italic"}`}>
        {value || "Click to add..."}
      </p>
      <button onClick={start} className="opacity-0 group-hover/field:opacity-100 p-0.5 rounded hover:bg-muted transition-all shrink-0 mt-0.5">
        <Pencil className="h-3 w-3 text-muted-foreground" />
      </button>
    </div>
  );
}

/* ── Row for header grid ── */
function InfoRow({ icon: Icon, label, value, onSave }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <span className="text-xs text-muted-foreground shrink-0 w-16">{label}</span>
      <div className="flex-1 min-w-0">
        <EditableField value={value} onSave={onSave} placeholder={`Add ${label.toLowerCase()}`} />
      </div>
    </div>
  );
}

/* ── Section card with labeled field ── */
function NoteField({ icon: Icon, label, value, onSave, sectionType }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-primary/70" />
        <span className="text-xs font-medium text-foreground">{label}</span>
      </div>
      <EditableTextArea value={value} onSave={onSave} sectionType={sectionType} />
    </div>
  );
}

export default function EditableIntakeContent({ lead }) {
  const n = lead.intakeNote;
  const [editingMustKnow, setEditingMustKnow] = useState(false);
  const [mustKnowDraft, setMustKnowDraft] = useState("");
  const [headerFields, setHeaderFields] = useState({
    leadSource: n.leadSource || "",
    zipcode: n.zipcode || "",
    caller: n.caller || "",
    salesRep: n.salesRep || "",
  });

  const buildPersonalInfo = () => {
    const parts = [];
    if (lead.maritalStatus) parts.push(lead.maritalStatus);
    if (lead.specialDates && lead.specialDates.length > 0) {
      parts.push(lead.specialDates.map((sd) => `${sd.type}: ${sd.date}`).join(", "));
    }
    return parts.join(". ");
  };
  const [personalInfo, setPersonalInfo] = useState(buildPersonalInfo);

  const sections = {
    situationSummary: { type: "list" },
    careNeeds: { type: "list" },
    budgetFinancial: { type: "list" },
    decisionMakers: { type: "list" },
    timeline: { type: "single" },
    preferences: { type: "list" },
    objections: { type: "list" },
    salesRepAssessment: { type: "list" },
    nextStep: { type: "list" },
  };

  const [intakeState, setIntakeState] = useState(() => {
    const init = {};
    for (const [key, sec] of Object.entries(sections)) {
      const val = n[key];
      init[key] = Array.isArray(val) ? val.join(". ") + "." : val || "";
    }
    return init;
  });

  const handleSave = (key, newVal) => {
    n[key] = newVal;
    const display = Array.isArray(newVal) ? newVal.join(". ") + "." : newVal || "";
    setIntakeState((prev) => ({ ...prev, [key]: display }));
  };

  const saveHeaderField = (field, val) => {
    n[field] = val;
    setHeaderFields((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="space-y-3">
      {/* Must-Know Banner */}
      {(lead.mustKnow || editingMustKnow) && (
        <div className="rounded-lg border border-warning/30 bg-warning/10 px-3 py-2.5 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-warning">Must Know</span>
              {!editingMustKnow ? (
                <button onClick={() => { setMustKnowDraft(lead.mustKnow || ""); setEditingMustKnow(true); }} className="p-0.5 rounded hover:bg-warning/20">
                  <Pencil className="h-3 w-3 text-warning" />
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <button onClick={() => setEditingMustKnow(false)} className="p-0.5 rounded hover:bg-warning/20">
                    <X className="h-3 w-3 text-warning" />
                  </button>
                  <button
                    onClick={() => { lead.mustKnow = mustKnowDraft.trim(); setEditingMustKnow(false); toast({ title: "Updated" }); }}
                    className="text-[10px] font-medium text-warning hover:underline"
                  >Save</button>
                </div>
              )}
            </div>
            {editingMustKnow ? (
              <Textarea value={mustKnowDraft} onChange={(e) => setMustKnowDraft(e.target.value)} className="text-sm min-h-[40px] mt-1 bg-background/50 border-warning/30" autoFocus />
            ) : (
              <p className="text-sm text-foreground leading-relaxed mt-0.5">{lead.mustKnow}</p>
            )}
          </div>
        </div>
      )}

      {/* Lead Info Grid */}
      <div className="rounded-lg bg-muted/40 px-3 py-2 grid grid-cols-2 gap-x-4">
        <InfoRow icon={MapPin} label="Source" value={headerFields.leadSource} onSave={(v) => saveHeaderField("leadSource", v)} />
        <InfoRow icon={MapPin} label="Zipcode" value={headerFields.zipcode} onSave={(v) => saveHeaderField("zipcode", v)} />
        <InfoRow icon={User} label="Caller" value={headerFields.caller} onSave={(v) => saveHeaderField("caller", v)} />
        <InfoRow icon={User} label="Assign" value={headerFields.salesRep} onSave={(v) => saveHeaderField("salesRep", v)} />
      </div>

      {/* Personal Info */}
      <div className="px-1">
        <NoteField
          icon={Gem}
          label="Personal"
          value={personalInfo}
          onSave={(val) => {
            const trimmed = typeof val === "string" ? val : val.join(". ");
            setPersonalInfo(trimmed);
            const parts = trimmed.split(/\.\s*/);
            lead.maritalStatus = parts[0] || "";
            const datesStr = parts.slice(1).join(". ").trim();
            lead.specialDates = datesStr
              ? datesStr.split(",").map((s) => s.trim()).filter(Boolean).map((s) => {
                  const [type, ...rest] = s.split(":");
                  return { type: type.trim(), date: (rest.join(":") || "").trim() };
                })
              : [];
          }}
          sectionType="single"
        />
      </div>

      {/* Sales Notes */}
      <div className="rounded-lg border border-border p-3 space-y-3">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Sales Notes</span>
        </div>
        <NoteField icon={TrendingUp} label="Assessment" value={intakeState.salesRepAssessment} onSave={(v) => handleSave("salesRepAssessment", v)} sectionType="list" />
        <NoteField icon={ArrowRight} label="Next Steps" value={intakeState.nextStep} onSave={(v) => handleSave("nextStep", v)} sectionType="list" />
      </div>

      {/* Assessment */}
      <div className="rounded-lg border border-border p-3 space-y-3">
        <div className="flex items-center gap-1.5">
          <Stethoscope className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Assessment</span>
        </div>
        <NoteField icon={User} label="Situation" value={intakeState.situationSummary} onSave={(v) => handleSave("situationSummary", v)} sectionType="list" />
        <NoteField icon={Heart} label="Care Needs" value={intakeState.careNeeds} onSave={(v) => handleSave("careNeeds", v)} sectionType="list" />
        <NoteField icon={Clock} label="Timeline" value={intakeState.timeline} onSave={(v) => handleSave("timeline", v)} sectionType="single" />
      </div>

      {/* Financial & Decision */}
      <div className="rounded-lg border border-border p-3 space-y-3">
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Financial & Decision</span>
        </div>
        <NoteField icon={DollarSign} label="Budget" value={intakeState.budgetFinancial} onSave={(v) => handleSave("budgetFinancial", v)} sectionType="list" />
        <NoteField icon={Users} label="Decision Makers" value={intakeState.decisionMakers} onSave={(v) => handleSave("decisionMakers", v)} sectionType="list" />
      </div>

      {/* Preferences & Concerns */}
      <div className="rounded-lg border border-border p-3 space-y-3">
        <div className="flex items-center gap-1.5">
          <Heart className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Preferences & Concerns</span>
        </div>
        <NoteField icon={Heart} label="Preferences" value={intakeState.preferences} onSave={(v) => handleSave("preferences", v)} sectionType="list" />
        <NoteField icon={AlertTriangle} label="Concerns" value={intakeState.objections} onSave={(v) => handleSave("objections", v)} sectionType="list" />
      </div>
    </div>
  );
}
