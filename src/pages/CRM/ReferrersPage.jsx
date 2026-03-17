import { useState, useMemo } from "react";
import TopBar from "@/components/TopBar";
import { mockReferrers, mockPipelineLeads } from "@/data/mockData";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Building2, User, Phone, Mail,
  TrendingUp, ChevronRight, Users, FileText, ExternalLink, ArrowUpDown, ArrowUpRight, ArrowDownRight, Handshake,
} from "lucide-react";
import LeadDetailDialog from "@/components/LeadDetailDialog";
import AddPartnerSheet from "@/components/AddPartnerSheet";
import BulkImportDialog from "@/components/BulkImportDialog";

const stageLabels = {
  inquiry: "Inquiry", connection: "Connection", pre_tour: "Pre-Tour",
  post_tour: "Post-Tour", deposit: "Deposit", move_in: "Move-in",
};

export default function ReferrersPage() {
  const [selectedReferrer, setSelectedReferrer] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const [filterPartner, setFilterPartner] = useState("all");
  const [filterStage, setFilterStage] = useState("all");
  const [filterRep, setFilterRep] = useState("all");
  const [filterCare, setFilterCare] = useState("all");
  const [addPartnerOpen, setAddPartnerOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [localReferrers, setLocalReferrers] = useState(mockReferrers);

  const totalReferrals = localReferrers.reduce((s, r) => s + r.referredLeadIds.length, 0);
  const activePartners = localReferrers.filter((r) => r.status === "active").length;

  // Referrer snapshot KPIs
  const referralLeads = mockPipelineLeads.filter(l => l.source === "Referral");
  const referralCalled = referralLeads.filter(l => ["connection", "pre_tour", "post_tour", "deposit", "move_in"].includes(l.stage));
  const referralClosed = referralLeads.filter(l => ["deposit", "move_in"].includes(l.stage));
  const convRefToCall = referralLeads.length > 0 ? Math.round((referralCalled.length / referralLeads.length) * 100) : 0;
  const convRefToClose = referralLeads.length > 0 ? Math.round((referralClosed.length / referralLeads.length) * 100) : 0;
  const convCallToClose = referralCalled.length > 0 ? Math.round((referralClosed.length / referralCalled.length) * 100) : 0;

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  // Flatten: one row per contact person
  const flattenedRows = useMemo(() => {
    const rows = [];
    localReferrers.forEach((r) => {
      const referredLeads = mockPipelineLeads.filter((l) => r.referredLeadIds.includes(l.id));
      const closed = referredLeads.filter((l) => ["deposit", "move_in"].includes(l.stage)).length;
      const convRate = referredLeads.length > 0 ? Math.round((closed / referredLeads.length) * 100) : 0;
      const contacts = r.contacts && r.contacts.length > 0
        ? r.contacts
        : [{ name: r.contactPerson, role: r.type, phone: r.phone, email: r.email }];
      contacts.forEach((c, i) => {
        rows.push({
          rowId: `${r.id}-c${i}`,
          contactName: c.name,
          contactRole: c.role,
          contactPhone: c.phone || r.phone,
          type: r.type,
          partnerName: r.name,
          organization: r.organization,
          referralCount: r.referredLeadIds.length,
          convRate,
          referrer: r,
        });
      });
    });
    return rows;
  }, [localReferrers]);

  const sorted = useMemo(() => {
    const arr = [...flattenedRows];
    const dir = sortDir === "asc" ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortKey) {
        case "name": return dir * a.partnerName.localeCompare(b.partnerName);
        case "type": return dir * a.type.localeCompare(b.type);
        case "contact": return dir * a.contactName.localeCompare(b.contactName);
        case "referrals": return dir * (a.referralCount - b.referralCount);
        default: return 0;
      }
    });
    return arr;
  }, [sortKey, sortDir, flattenedRows]);

  // All referred leads across all partners with hours
  const allReferredLeads = useMemo(() => {
    const leads = [];
    localReferrers.forEach(r => {
      r.referredLeadIds.forEach(id => {
        const lead = mockPipelineLeads.find(l => l.id === id);
        if (lead) {
          leads.push({ ...lead, rowKey: `${r.id}-${lead.id}`, partnerName: r.name, partnerId: r.id, partnerContact: r.contactPerson });
        }
      });
    });
    return leads;
  }, [localReferrers]);

  // Filter options
  const uniquePartners = [...new Set(allReferredLeads.map(l => l.partnerName))];
  const uniqueStages = [...new Set(allReferredLeads.map(l => l.stage))];
  const uniqueReps = [...new Set(allReferredLeads.map(l => l.salesRep))];
  const uniqueCare = [...new Set(allReferredLeads.map(l => l.careLevel))];

  const filteredLeads = useMemo(() => {
    return allReferredLeads.filter(l =>
      (filterPartner === "all" || l.partnerName === filterPartner) &&
      (filterStage === "all" || l.stage === filterStage) &&
      (filterRep === "all" || l.salesRep === filterRep) &&
      (filterCare === "all" || l.careLevel === filterCare)
    );
  }, [allReferredLeads, filterPartner, filterStage, filterRep, filterCare]);


  const SortableHead = ({ label, sortKeyVal }) => (
    <TableHead className="cursor-pointer select-none hover:text-foreground transition-colors" onClick={() => toggleSort(sortKeyVal)}>
      <span className="inline-flex items-center gap-1">
        {label}
        <ArrowUpDown className={`h-3 w-3 ${sortKey === sortKeyVal ? "text-foreground" : "text-muted-foreground/40"}`} />
      </span>
    </TableHead>
  );

  return (
    <div className="flex flex-col h-full">
      <TopBar title="Referral Management" subtitle="Partner organizations and contacts" action={{ label: "Add Partner", onClick: () => setAddPartnerOpen(true) }} secondaryAction={{ label: "Import", onClick: () => setImportOpen(true) }} />
      <div className="flex-1 overflow-auto p-6 space-y-6">

        {/* Referrer Snapshot */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <SnapshotKPI icon={Users} label="Active Partners" value={activePartners} />
          <SnapshotKPI icon={TrendingUp} label="Total Referrals" value={totalReferrals} />
          <SnapshotKPI label="Ref → Call" value={`${convRefToCall}%`} prev={55} current={convRefToCall} />
          <SnapshotKPI label="Ref → Close" value={`${convRefToClose}%`} prev={20} current={convRefToClose} />
          <SnapshotKPI label="Call → Close" value={`${convCallToClose}%`} prev={30} current={convCallToClose} />
        </div>

        {/* Partners table */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Handshake className="h-4 w-4 text-primary" />
            Partners ({localReferrers.length})
          </h3>
          <div className="rounded-lg border border-border bg-card shadow-crm-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableHead label="Contact" sortKeyVal="contact" />
                  <SortableHead label="Type" sortKeyVal="type" />
                  <SortableHead label="Partner" sortKeyVal="name" />
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-center cursor-pointer select-none hover:text-foreground transition-colors" onClick={() => toggleSort("referrals")}>
                    <span className="inline-flex items-center gap-1 justify-center">
                      Referrals
                      <ArrowUpDown className={`h-3 w-3 ${sortKey === "referrals" ? "text-foreground" : "text-muted-foreground/40"}`} />
                    </span>
                  </TableHead>
                  <TableHead className="text-center">Conversion</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((row) => {
                  const convColor = row.convRate >= 40 ? "text-emerald-600" : row.convRate >= 20 ? "text-amber-600" : "text-red-500";
                  return (
                  <TableRow key={row.rowId} className="cursor-pointer" onClick={() => setSelectedReferrer(row.referrer)}>
                    <TableCell>
                      <p className="text-sm font-medium text-foreground">{row.contactName}</p>
                      <p className="text-xs text-muted-foreground">{row.contactRole}</p>
                    </TableCell>
                    <TableCell><span className="text-sm text-muted-foreground">{row.type}</span></TableCell>
                    <TableCell>
                      <p className="font-medium text-foreground text-sm">{row.partnerName}</p>
                      <p className="text-xs text-muted-foreground">{row.organization}</p>
                    </TableCell>
                    <TableCell><span className="text-sm text-muted-foreground">{row.contactPhone}</span></TableCell>
                    <TableCell className="text-center">
                      <span className="font-display font-semibold text-foreground">{row.referralCount}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-display font-semibold ${convColor}`}>{row.convRate}%</span>
                    </TableCell>
                    <TableCell><ChevronRight className="h-4 w-4 text-muted-foreground" /></TableCell>
                  </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Referred Leads Table */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-primary" />
            Referred Leads ({filteredLeads.length})
          </h3>
          <div className="rounded-lg border border-border bg-card shadow-crm-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>
                    <Select value={filterPartner} onValueChange={setFilterPartner}>
                      <SelectTrigger className="h-7 text-xs border-0 bg-transparent shadow-none px-0 w-auto min-w-[80px]">
                        <SelectValue placeholder="Contact" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Contacts</SelectItem>
                        {uniquePartners.map(p => {
                          const ref = localReferrers.find(r => r.name === p);
                          return <SelectItem key={p} value={p}>{ref ? ref.contactPerson : p}</SelectItem>;
                        })}
                      </SelectContent>
                    </Select>
                  </TableHead>
                  <TableHead>
                    <Select value={filterStage} onValueChange={setFilterStage}>
                      <SelectTrigger className="h-7 text-xs border-0 bg-transparent shadow-none px-0 w-auto min-w-[70px]">
                        <SelectValue placeholder="Stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        {uniqueStages.map(s => <SelectItem key={s} value={s}>{stageLabels[s]}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableHead>
                  <TableHead>
                    <Select value={filterRep} onValueChange={setFilterRep}>
                      <SelectTrigger className="h-7 text-xs border-0 bg-transparent shadow-none px-0 w-auto min-w-[80px]">
                        <SelectValue placeholder="Sales Rep" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Reps</SelectItem>
                        {uniqueReps.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableHead>
                  <TableHead>
                    <Select value={filterCare} onValueChange={setFilterCare}>
                      <SelectTrigger className="h-7 text-xs border-0 bg-transparent shadow-none px-0 w-auto min-w-[80px]">
                        <SelectValue placeholder="Care Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {uniqueCare.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.rowKey} className="cursor-pointer" onClick={() => setSelectedLead(lead)}>
                    <TableCell>
                      <p className="text-sm font-medium text-primary underline underline-offset-2">{lead.name}</p>
                    </TableCell>
                    <TableCell><span className="text-sm text-muted-foreground">{lead.partnerContact}</span></TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[11px]">{stageLabels[lead.stage]}</Badge>
                    </TableCell>
                    <TableCell><span className="text-sm text-foreground">{lead.salesRep}</span></TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[11px]">{lead.careLevel}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Referrer Detail Dialog */}
      {selectedReferrer && (
        <ReferrerDetailDialog
          referrer={selectedReferrer}
          open={!!selectedReferrer}
          onClose={() => setSelectedReferrer(null)}
          onLeadClick={(lead) => { setSelectedReferrer(null); setSelectedLead(lead); }}
        />
      )}

      {/* Lead Detail Dialog */}
      <LeadDetailDialog lead={selectedLead} open={!!selectedLead} onOpenChange={(open) => { if (!open) setSelectedLead(null); }} />

      {/* Add Partner Sheet */}
      <AddPartnerSheet
        open={addPartnerOpen}
        onOpenChange={setAddPartnerOpen}
        onAdd={(partner) => setLocalReferrers(prev => [...prev, partner])}
      />

      <BulkImportDialog open={importOpen} onOpenChange={setImportOpen} type="partners" />
    </div>
  );
}

function SnapshotKPI({ icon: Icon, label, value, prev, current }) {
  const hasDiff = prev !== undefined && current !== undefined;
  const diff = hasDiff ? current - prev : 0;
  const up = diff >= 0;
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-crm-sm text-center">
      <div className="flex items-center justify-center gap-1.5 mb-1">
        {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground/60" />}
        <span className="text-[11px] text-muted-foreground font-medium">{label}</span>
      </div>
      <p className="font-display text-xl font-bold text-foreground">{value}</p>
      {hasDiff && (
        <p className={`text-[10px] font-medium flex items-center justify-center gap-0.5 ${up ? "text-primary" : "text-destructive"}`}>
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {up ? "+" : ""}{diff}% vs prev
        </p>
      )}
    </div>
  );
}

function ReferrerDetailDialog({ referrer, open, onClose, onLeadClick }) {
  const referredLeads = mockPipelineLeads.filter((l) => referrer.referredLeadIds.includes(l.id));
  const closedCount = referredLeads.filter((l) => ["deposit", "move_in"].includes(l.stage)).length;
  const convRate = referredLeads.length > 0 ? Math.round((closedCount / referredLeads.length) * 100) : 0;
  const convColor = convRate >= 40 ? "text-emerald-600" : convRate >= 20 ? "text-amber-600" : "text-red-500";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            {referrer.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          {/* Contact person + type */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">{referrer.contactPerson}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground ml-5.5">
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{referrer.phone}</span>
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{referrer.email}</span>
              <span className="flex items-center gap-1"><FileText className="h-3 w-3" />{referrer.type}</span>
            </div>
          </div>

          {/* Snapshot: Total Referrals + Conversion Rate */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <p className="text-[11px] text-muted-foreground">Total Referrals</p>
              <p className="font-display text-xl font-bold text-foreground">{referredLeads.length}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <p className="text-[11px] text-muted-foreground">Conversion Rate</p>
              <p className={`font-display text-xl font-bold ${convColor}`}>{convRate}%</p>
            </div>
          </div>

          {/* Referred Leads */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <ExternalLink className="h-4 w-4" /> Referred Leads ({referredLeads.length})
            </h4>
            {referredLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No leads referred yet</p>
            ) : (
              <div className="space-y-2">
                {referredLeads.map((lead) => (
                  <div key={lead.id} className="rounded-lg border border-border p-3 flex items-center justify-between cursor-pointer hover:bg-muted/40 transition-colors" onClick={() => onLeadClick(lead)}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-primary underline underline-offset-2">{lead.name}</p>
                        <Badge variant="outline" className="text-[10px]">{stageLabels[lead.stage]}</Badge>
                        <Badge variant="secondary" className="text-[10px]">{lead.careLevel}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <User className="h-3 w-3" /> Sales Rep: <span className="font-medium text-foreground">{lead.salesRep}</span>
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="rounded-lg bg-muted/30 border border-border p-3">
            <p className="text-xs font-medium text-foreground mb-1">Notes</p>
            <p className="text-xs text-muted-foreground">{referrer.notes}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <div>
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}
