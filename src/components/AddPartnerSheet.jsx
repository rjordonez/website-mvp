import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { mockReferrers } from "@/data/mockData";

const partnerTypes = ["Hospital", "Physician", "Social Worker", "Local Communities", "Insurance", "Home Health"];

export default function AddPartnerSheet({ open, onOpenChange, onAdd }) {
  const [isNewPartner, setIsNewPartner] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [form, setForm] = useState({
    partnerName: "",
    organization: "",
    contactPerson: "",
    title: "",
    email: "",
    phone: "",
    type: "",
    notes: "",
  });

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const existingPartners = mockReferrers;

  const handleSelectPartner = (id) => {
    setSelectedPartnerId(id);
    if (id) {
      const p = existingPartners.find((r) => r.id === id);
      if (p) {
        update("partnerName", p.name);
        update("organization", p.organization);
        update("type", p.type);
      }
    }
  };

  const toggleNewPartner = () => {
    setIsNewPartner(!isNewPartner);
    setSelectedPartnerId("");
    setForm({ partnerName: "", organization: "", contactPerson: "", title: "", email: "", phone: "", type: "", notes: "" });
  };

  const isValid = (isNewPartner ? form.partnerName : selectedPartnerId) && form.contactPerson && form.email && form.type;

  const handleSubmit = () => {
    if (!isValid) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    const partnerName = isNewPartner ? form.partnerName : existingPartners.find((r) => r.id === selectedPartnerId)?.name || form.partnerName;
    const org = isNewPartner ? form.organization : existingPartners.find((r) => r.id === selectedPartnerId)?.organization || "";

    const newPartner = {
      id: `ref-${Date.now()}`,
      name: partnerName,
      organization: org || partnerName,
      type: form.type,
      contactPerson: form.contactPerson,
      phone: form.phone,
      email: form.email,
      score: "warm",
      notes: form.notes,
      contacts: [{ name: form.contactPerson, role: form.title || form.type, phone: form.phone, email: form.email }],
      referredLeadIds: [],
      serviceHoursRequested: 0,
      commissionRate: 0,
      totalCommission: 0,
      status: "active",
      lastReferralDate: new Date().toISOString().split("T")[0],
    };

    onAdd(newPartner);
    setForm({ partnerName: "", organization: "", contactPerson: "", title: "", email: "", phone: "", type: "", notes: "" });
    setSelectedPartnerId("");
    setIsNewPartner(false);
    onOpenChange(false);
    toast({ title: "Partner added", description: `${form.contactPerson} at ${partnerName} has been added.` });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Referral Partner</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {/* Partner Name — dropdown or new */}
          <div className="space-y-1.5">
            <Label className="text-xs">Partner Name *</Label>
            {isNewPartner ? (
              <div className="flex items-center gap-2">
                <Input
                  placeholder="New partner name"
                  value={form.partnerName}
                  onChange={(e) => update("partnerName", e.target.value)}
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="icon" className="shrink-0 h-9 w-9" onClick={toggleNewPartner} title="Select existing">
                  <Plus className="h-4 w-4 rotate-45" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Select value={selectedPartnerId} onValueChange={handleSelectPartner}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select partner" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingPartners.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" size="icon" className="shrink-0 h-9 w-9" onClick={toggleNewPartner} title="Add new partner">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Organization — only for new partners */}
          {isNewPartner && (
            <div className="space-y-1.5">
              <Label className="text-xs">Organization</Label>
              <Input placeholder="e.g. Valley Medical Group" value={form.organization} onChange={(e) => update("organization", e.target.value)} />
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-xs">Primary Contact Person *</Label>
            <Input value={form.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Title</Label>
            <Input placeholder="e.g. Case Manager, Director of Nursing" value={form.title} onChange={(e) => update("title", e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Email *</Label>
            <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Phone</Label>
            <Input placeholder="" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Partner Type *</Label>
            <Select value={form.type} onValueChange={(v) => update("type", v)}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                {partnerTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Notes</Label>
            <Textarea placeholder="How we connected, referral preferences..." value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleSubmit} disabled={!isValid}>Add Partner</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
