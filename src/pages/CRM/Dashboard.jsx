import TopBar from "@/components/TopBar";
import { leadSourceData, funnelData, mockPipelineLeads } from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Users, CalendarDays, TrendingUp, Home } from "lucide-react";

const neutralPalette = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--muted-foreground))",
  "hsl(152, 30%, 65%)",
  "hsl(210, 15%, 75%)",
];

const metrics = [
  { label: "Active Leads", value: 24, icon: Users, change: "+12%", positive: true },
  { label: "Tours This Week", value: 8, icon: CalendarDays, change: "-5%", positive: false },
  { label: "Occupancy Rate", value: "87%", icon: Home, change: "+3%", positive: true },
  { label: "Move-ins (MTD)", value: 5, icon: TrendingUp, change: "+25%", positive: true },
];

export default function Dashboard() {
  const totalLeads = leadSourceData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex flex-col h-full">
      <TopBar title="Dashboard" subtitle="At a glance overview" />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-card p-4 shadow-crm-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">{m.label}</span>
                <m.icon className="h-4 w-4 text-muted-foreground/60" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{m.value}</p>
              <span className={`text-xs font-medium ${m.positive ? "text-primary" : "text-destructive"}`}>
                {m.change} vs last month
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lead Source Pie Chart */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-crm-sm">
            <h3 className="font-display text-sm font-semibold text-foreground mb-1">Lead Sources</h3>
            <p className="text-xs text-muted-foreground mb-4">{totalLeads} total leads this month</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {leadSourceData.map((_, index) => (
                      <Cell key={index} fill={neutralPalette[index % neutralPalette.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value} leads (${((value / totalLeads) * 100).toFixed(0)}%)`, name]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {leadSourceData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: neutralPalette[i % neutralPalette.length] }} />
                  <span className="text-muted-foreground">{d.name}</span>
                  <span className="ml-auto font-medium text-foreground">{((d.value / totalLeads) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Funnel + Conversion KPIs */}
          <div className="space-y-4">
            {/* Funnel */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-crm-sm">
              <h3 className="font-display text-sm font-semibold text-foreground mb-1">Sales Funnel</h3>
              <p className="text-xs text-muted-foreground mb-4">New inquiries month-to-date</p>
              <div className="flex flex-col items-center gap-1">
                {funnelData.map((stage, i) => {
                  const maxWidth = 100;
                  const minWidth = 35;
                  const pct = maxWidth - ((maxWidth - minWidth) / (funnelData.length - 1)) * i;
                  return (
                    <div
                      key={stage.stage}
                      className="flex items-center justify-center text-xs font-medium text-primary-foreground py-2 rounded transition-all"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: `hsl(var(--primary) / ${1 - i * 0.12})`,
                      }}
                    >
                      {stage.stage} ({stage.count})
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conversion KPIs */}
            <div className="grid grid-cols-3 gap-3">
              <ConversionCard
                label="Inquiry → Tour"
                value={((funnelData[2].count / funnelData[0].count) * 100)}
                goal={30}
              />
              <ConversionCard
                label="Inquiry → MI"
                value={((funnelData[5].count / funnelData[0].count) * 100)}
                goal={10}
              />
              <ConversionCard
                label="Tour → MI"
                value={funnelData[2].count > 0 ? ((funnelData[5].count / funnelData[2].count) * 100) : 0}
                goal={35}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversionCard({ label, value, goal }: { label: string; value: number; goal: number }) {
  const aboveGoal = value >= goal;
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-crm-sm text-center">
      <p className="text-[11px] text-muted-foreground mb-1">{label}</p>
      <p className="font-display text-xl font-bold text-foreground">{value.toFixed(0)}%</p>
      <p className={`text-[11px] font-medium mt-0.5 ${aboveGoal ? "text-primary" : "text-destructive"}`}>
        {aboveGoal ? "↑" : "↓"} Goal: {goal}%
      </p>
    </div>
  );
}
