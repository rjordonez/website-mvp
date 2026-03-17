import { useState, useRef, useMemo, useCallback } from "react";
import { mockPipelineLeads } from "@/data/mockData";
import {
  Check, Calendar as CalendarIcon, Trash2,
  ChevronDown, ChevronRight, GripVertical,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// ── Constants ──────────────────────────────────────────────────────
const CURRENT_USER = "Alex Rivera";
const TODAY = new Date(2026, 1, 13); // demo: Feb 13, 2026
TODAY.setHours(0, 0, 0, 0);

const ALL_REPS = [
  { name: "Alex Rivera", initials: "AR", color: "hsl(160, 60%, 45%)" },
  { name: "Sarah Johnson", initials: "SJ", color: "hsl(205, 65%, 48%)" },
  { name: "Mike Peters", initials: "MP", color: "hsl(228, 80%, 65%)" },
  { name: "Emily Brown", initials: "EB", color: "hsl(38, 92%, 55%)" },
  { name: "David Kim", initials: "DK", color: "hsl(270, 50%, 55%)" },
];

const STAGE_LABELS = {
  inquiry: "Inquiry", connection: "Connection", pre_tour: "Pre-Tour",
  post_tour: "Post-Tour", deposit: "Deposit", move_in: "Move-in", declined: "Declined",
};

// ── Date helpers ───────────────────────────────────────────────────
function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function addDays(date, n) { const d = new Date(date); d.setDate(d.getDate() + n); d.setHours(0,0,0,0); return d; }
function getStartOfWeek(date) { const d = new Date(date); d.setHours(0,0,0,0); d.setDate(d.getDate() - d.getDay()); return d; }
function formatDueDate(date) {
  if (!date) return "";
  if (isSameDay(date, TODAY)) return "Today";
  if (isSameDay(date, addDays(TODAY, -1))) return "Yesterday";
  if (isSameDay(date, addDays(TODAY, 1))) return "Tomorrow";
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}
function daysDiff(date) {
  if (!date) return 999;
  const d = new Date(date); d.setHours(0,0,0,0);
  return Math.round((d - TODAY) / (1000*60*60*24));
}

// ── Section categorization ─────────────────────────────────────────
function categorize(task) {
  const diff = daysDiff(task.dueDate);
  if (diff < 0) return "overdue";
  if (diff === 0) return "today";
  const weekEnd = new Date(getStartOfWeek(TODAY)); weekEnd.setDate(weekEnd.getDate() + 6);
  if (task.dueDate <= weekEnd) return "this_week";
  return "later";
}

// Priority sort: high-value stages first, then by due date
const STAGE_WEIGHT = { deposit: 0, move_in: 0, post_tour: 1, pre_tour: 2, connection: 3, inquiry: 4, declined: 9 };
function taskSortKey(t) {
  const stageW = STAGE_WEIGHT[t.leadStage] ?? 5;
  const dateW = daysDiff(t.dueDate);
  return stageW * 1000 + dateW;
}

// ── Auto-generate tasks from leads ─────────────────────────────────
function generateTasks(leads) {
  const tasks = [];
  const seen = new Set();
  let nextPriority = 0;
  const add = (lead, text, type, dueDate, note) => {
    const key = `${lead.id}-${lead.stage}`;
    if (seen.has(key)) return;
    seen.add(key);
    tasks.push({
      id: `auto-${lead.id}-${lead.stage}`,
      text,
      type,
      dueDate,
      leadId: lead.id,
      leadName: lead.name,
      leadStage: lead.stage,
      assignee: lead.salesRep,
      note: note || "",
      done: false,
      completedAt: null,
      priority: nextPriority++,
    });
  };

  for (const lead of leads) {
    if (lead.stage === "declined") continue;
    const inquiryDate = lead.inquiryDate ? new Date(lead.inquiryDate + "T00:00:00") : TODAY;
    const lastContact = lead.lastContactDate ? new Date(lead.lastContactDate + "T00:00:00") : TODAY;

    switch (lead.stage) {
      case "inquiry":
        add(lead, "Make initial contact call", "call", inquiryDate,
          lead.intakeNote?.caller ? `Caller: ${lead.intakeNote.caller}` : "");
        break;
      case "connection":
        add(lead, "Schedule a tour", "tour", addDays(lastContact, 2),
          lead.intakeNote?.preferences?.[0] || "");
        break;
      case "pre_tour":
        add(lead, "Confirm care assessment with nursing", "care", addDays(lastContact, -1),
          `${lead.careLevel} — ${lead.facility}`);
        break;
      case "post_tour": {
        const postDiff = daysDiff(lastContact);
        if (postDiff <= -3) {
          add(lead, "Follow up on family decision", "follow_up", TODAY,
            "3+ days since tour with no response");
        } else {
          add(lead, "Send post-tour summary email", "follow_up", addDays(lastContact, 1),
            lead.intakeNote?.nextStep?.[0] || "");
        }
        break;
      }
      case "deposit":
        add(lead, "Send deposit paperwork", "docs", addDays(lastContact, 1),
          lead.intakeNote?.nextStep?.[0] || "");
        break;
      case "move_in":
        add(lead, "Send welcome packet and move-in checklist", "docs", lastContact,
          `Move-in: ${lead.nextActivity || ""}`);
        break;
    }
  }
  return tasks;
}

// ── Component ──────────────────────────────────────────────────────
export default function TasklistPage() {
  const autoTasks = useMemo(() => generateTasks(mockPipelineLeads), []);

  const [tasks, setTasks] = useState(autoTasks);
  const [newTaskText, setNewTaskText] = useState("");
  const [viewTab, setViewTab] = useState("mine"); // "mine" | "team"
  const [filterRep, setFilterRep] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({ this_week: true, later: true });
  const inputRef = useRef(null);

  // Filter tasks by view
  const visibleTasks = useMemo(() => {
    let filtered = tasks;
    if (viewTab === "mine") {
      filtered = filtered.filter((t) => t.assignee === CURRENT_USER);
    } else if (filterRep) {
      filtered = filtered.filter((t) => t.assignee === filterRep);
    }
    return filtered;
  }, [tasks, viewTab, filterRep]);

  const pending = visibleTasks.filter((t) => !t.done);
  const completed = visibleTasks.filter((t) => t.done);
  const completedToday = completed.filter((t) => t.completedAt && isSameDay(t.completedAt, TODAY));

  // Section buckets — sorted by manual priority, then auto-priority
  const sortTasks = (a, b) => (a.priority ?? 0) - (b.priority ?? 0);
  const overdueTasks = pending.filter((t) => categorize(t) === "overdue").sort(sortTasks);
  const todayTasks = pending.filter((t) => categorize(t) === "today").sort(sortTasks);
  const weekTasks = pending.filter((t) => categorize(t) === "this_week").sort(sortTasks);
  const laterTasks = pending.filter((t) => categorize(t) === "later").sort(sortTasks);

  // ── Handlers ─────────────────────────────────────
  const toggleDone = useCallback((taskId) => {
    setTasks((prev) => prev.map((t) => {
      if (t.id !== taskId) return t;
      const nowDone = !t.done;
      return { ...t, done: nowDone, completedAt: nowDone ? new Date(TODAY) : null };
    }));
  }, []);

  const setDueDate = useCallback((taskId, date) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, dueDate: date } : t)));
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  const addTask = useCallback(() => {
    if (!newTaskText.trim()) return;
    // Give new task the lowest priority number (top of Today)
    const minPriority = Math.min(0, ...tasks.map((t) => t.priority ?? 0));
    const newTask = {
      id: `manual-${Date.now()}`,
      text: newTaskText.trim(),
      type: "follow_up",
      dueDate: new Date(TODAY),
      leadId: null,
      leadName: null,
      leadStage: null,
      assignee: CURRENT_USER,
      note: "",
      done: false,
      completedAt: null,
      priority: minPriority - 1,
    };
    setTasks((prev) => [newTask, ...prev]);
    setNewTaskText("");
  }, [newTaskText, tasks]);

  const onDragEnd = useCallback((result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    // Only allow reorder within the same section
    if (source.droppableId !== destination.droppableId) return;
    if (source.index === destination.index) return;

    // Get the section's sorted task list
    const sectionMap = { overdue: overdueTasks, today: todayTasks, this_week: weekTasks, later: laterTasks };
    const sectionTasks = sectionMap[source.droppableId];
    if (!sectionTasks) return;

    const movedTask = sectionTasks[source.index];
    const targetTask = sectionTasks[destination.index];
    if (!movedTask || !targetTask) return;

    // Swap priorities
    setTasks((prev) => {
      const pA = prev.find((t) => t.id === movedTask.id)?.priority ?? 0;
      const pB = prev.find((t) => t.id === targetTask.id)?.priority ?? 0;
      return prev.map((t) => {
        if (t.id === movedTask.id) return { ...t, priority: pB };
        if (t.id === targetTask.id) return { ...t, priority: pA };
        return t;
      });
    });
  }, [overdueTasks, todayTasks, weekTasks, laterTasks]);

  const toggleSection = useCallback((id) => {
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // ── Sections config ──────────────────────────────
  const sections = [];
  if (overdueTasks.length > 0) sections.push({ id: "overdue", label: "Overdue", tasks: overdueTasks, accent: "text-destructive", dot: "bg-destructive" });
  sections.push({ id: "today", label: "Today", tasks: todayTasks, accent: "text-amber-600", dot: "bg-amber-500" });
  sections.push({ id: "this_week", label: "This Week", tasks: weekTasks, accent: "text-muted-foreground", dot: "bg-muted-foreground/50", collapsible: true });
  sections.push({ id: "later", label: "Later", tasks: laterTasks, accent: "text-muted-foreground", dot: "bg-muted-foreground/30", collapsible: true });

  return (
    <div className="flex flex-col h-full">
      {/* Top bar area */}
      <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
        <div>
          <h1 className="font-display text-lg font-semibold text-foreground">Tasklist</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Mine / Team toggle */}
          <div className="flex rounded-md border border-border overflow-hidden">
            <button
              onClick={() => { setViewTab("mine"); setFilterRep(""); }}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewTab === "mine" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
            >
              Mine
            </button>
            <button
              onClick={() => setViewTab("team")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewTab === "team" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
            >
              Team
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto p-6 space-y-4">
          {/* Summary bar */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{pending.length} pending</span>
            <span>{completedToday.length} completed today</span>
          </div>

          {/* Team filter */}
          {viewTab === "team" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Filter:</span>
              <button
                onClick={() => setFilterRep("")}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${!filterRep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
              >
                All
              </button>
              {ALL_REPS.map((r) => (
                <button
                  key={r.name}
                  onClick={() => setFilterRep(r.name)}
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${filterRep === r.name ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] text-white font-bold" style={{ backgroundColor: r.color }}>{r.initials}</span>
                  {r.name.split(" ")[0]}
                </button>
              ))}
            </div>
          )}

          {/* Quick add input — always visible */}
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-crm-sm">
            <input
              ref={inputRef}
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addTask(); }}
              placeholder="Add a task... press Enter to save"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {newTaskText && (
              <button onClick={addTask} className="rounded p-1 text-primary hover:bg-primary/10 transition-colors">
                <Check className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Task sections */}
          <DragDropContext onDragEnd={onDragEnd}>
            {sections.map((section) => {
              const isCollapsed = section.collapsible && collapsedSections[section.id];
              return (
                <div key={section.id}>
                  {/* Section header */}
                  <button
                    onClick={() => section.collapsible && toggleSection(section.id)}
                    className={`flex items-center gap-2 mb-1.5 w-full text-left ${section.collapsible ? "cursor-pointer" : "cursor-default"}`}
                  >
                    {section.collapsible && (
                      isCollapsed ? <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    {!section.collapsible && <span className={`h-2 w-2 rounded-full ${section.dot}`} />}
                    <h3 className={`text-xs font-semibold uppercase tracking-wider ${section.accent}`}>{section.label}</h3>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-[11px] font-medium text-muted-foreground">
                      {section.tasks.length}
                    </span>
                  </button>

                  {!isCollapsed && (
                    <Droppable droppableId={section.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="rounded-lg border border-border bg-card shadow-crm-sm mb-2"
                        >
                          {section.tasks.length === 0 ? (
                            <p className="text-xs text-muted-foreground text-center py-3">No tasks</p>
                          ) : (
                            section.tasks.map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(prov, snap) => (
                                  <div
                                    ref={prov.innerRef}
                                    {...prov.draggableProps}
                                    className={snap.isDragging ? "shadow-lg rounded-md bg-card" : ""}
                                  >
                                    <TaskRow
                                      task={task}
                                      onToggleDone={toggleDone}
                                      onSetDueDate={setDueDate}
                                      onDelete={deleteTask}
                                      dragHandleProps={prov.dragHandleProps}
                                      showAssignee={viewTab === "team"}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}
                </div>
              );
            })}
          </DragDropContext>

          {/* Completed section — collapsed toggle */}
          {completed.length > 0 && (
            <div>
              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {showCompleted ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                <span>Show completed ({completed.length})</span>
              </button>
              {showCompleted && (
                <div className="rounded-lg border border-border bg-card shadow-crm-sm mt-1.5">
                  {completed.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onToggleDone={toggleDone}
                      onSetDueDate={setDueDate}
                      onDelete={deleteTask}
                      showAssignee={viewTab === "team"}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Date Picker ────────────────────────────────────────────────────
function DatePicker({ date, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:bg-muted">
          <CalendarIcon className="h-3 w-3" />
          {date ? formatDueDate(date) : "Set date"}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => { onSelect(d); setOpen(false); }}
        />
      </PopoverContent>
    </Popover>
  );
}

// ── Assignee Avatar ────────────────────────────────────────────────
function RepAvatar({ name, size = "sm" }) {
  const rep = ALL_REPS.find((r) => r.name === name);
  if (!rep) return null;
  const sz = size === "sm" ? "h-5 w-5 text-[8px]" : "h-6 w-6 text-[9px]";
  return (
    <span
      className={`flex ${sz} items-center justify-center rounded-full text-white font-bold shrink-0`}
      style={{ backgroundColor: rep.color }}
      title={rep.name}
    >
      {rep.initials}
    </span>
  );
}

// ── Priority dot ───────────────────────────────────────────────────
function PriorityDot({ date }) {
  const diff = daysDiff(date);
  const color = diff < 0 ? "bg-destructive" : diff === 0 ? "bg-amber-500" : "bg-muted-foreground/30";
  return <span className={`h-2 w-2 rounded-full shrink-0 ${color}`} />;
}

// ── Task Row ───────────────────────────────────────────────────────
function TaskRow({ task, onToggleDone, onSetDueDate, onDelete, dragHandleProps, showAssignee }) {
  return (
    <div className={`border-b border-border last:border-b-0 transition-all ${task.done ? "opacity-40" : ""}`}>
      <div className={`group flex items-center gap-2 px-3 py-2.5 transition-colors ${!task.done ? "hover:bg-muted/40" : ""}`}>
        {/* Drag handle */}
        {dragHandleProps && !task.done && (
          <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing text-muted-foreground/30 hover:text-muted-foreground transition-colors">
            <GripVertical className="h-4 w-4" />
          </div>
        )}

        {/* Priority dot */}
        <PriorityDot date={task.dueDate} />

        {/* Checkbox */}
        <button
          onClick={() => onToggleDone(task.id)}
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all ${
            task.done ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30 hover:border-primary"
          }`}
        >
          {task.done && <Check className="h-2.5 w-2.5" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`text-sm truncate ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
              {task.text}
            </p>
          </div>
          {task.leadName && (
            <p className="text-[11px] text-muted-foreground truncate">
              {task.leadName}{task.leadStage ? ` · ${STAGE_LABELS[task.leadStage] || task.leadStage}` : ""}
            </p>
          )}
        </div>

        {/* Right side: tag, date, avatar */}
        <div className="flex items-center gap-2 shrink-0">
          <DatePicker date={task.dueDate} onSelect={(d) => onSetDueDate(task.id, d)} />
          {showAssignee && <RepAvatar name={task.assignee} />}
          <button
            onClick={() => onDelete(task.id)}
            className="rounded p-1 text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
            title="Delete task"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
