import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Upload, FileAudio } from "lucide-react";

export default function AddLeadDialog({ open, onOpenChange }) {
  const [tab, setTab] = useState("manual");
  const [audioFile, setAudioFile] = useState(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">Add New Lead</DialogTitle>
          <p className="text-xs text-muted-foreground">Enter details manually or upload a call recording to auto-fill.</p>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="recording" className="flex items-center gap-1.5">
              <Mic className="h-3.5 w-3.5" />
              From Recording
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Prospect Name</Label>
                <Input placeholder="e.g. Margaret Chen" className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Contact Person</Label>
                <Input placeholder="e.g. Lisa Chen" className="h-9 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Relation</Label>
                <Input placeholder="e.g. Daughter" className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Zipcode</Label>
                <Input placeholder="e.g. 90007" className="h-9 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Care Type</Label>
                <Select>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Select care type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assisted">Assisted Living</SelectItem>
                    <SelectItem value="independent">Independent Living</SelectItem>
                    <SelectItem value="memory">Memory Care</SelectItem>
                    <SelectItem value="skilled">Skilled Nursing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Source</Label>
                <Select>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital_ads">Digital Ads</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="walkin">Walk-in</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Facility</Label>
                <Select>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Select facility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunrise">Sunrise Gardens</SelectItem>
                    <SelectItem value="oakwood">Oakwood Manor</SelectItem>
                    <SelectItem value="lakeside">Lakeside Living</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Sales Rep</Label>
                <Select>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Select rep" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alex">Alex Rivera</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="mike">Mike Peters</SelectItem>
                    <SelectItem value="emily">Emily Brown</SelectItem>
                    <SelectItem value="david">David Kim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Situation Summary</Label>
              <Textarea placeholder="Brief description of the prospect's situation..." className="text-sm min-h-[60px]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Budget Range</Label>
                <Input placeholder="e.g. $4,000–$6,000/mo" className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Timeline</Label>
                <Input placeholder="e.g. Within 2 months" className="h-9 text-sm" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Notes / Objections</Label>
              <Textarea placeholder="Any concerns, objections, or additional notes..." className="text-sm min-h-[60px]" />
            </div>

            <Button className="w-full" size="sm">
              Add Lead
            </Button>
          </TabsContent>

          <TabsContent value="recording" className="mt-4 space-y-4">
            <div className="rounded-lg border-2 border-dashed border-border bg-muted/20 p-8 text-center">
              <FileAudio className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-sm font-medium text-foreground mb-1">Upload a call recording</p>
              <p className="text-xs text-muted-foreground mb-4">
                AI will transcribe and auto-fill all intake fields
              </p>

              <label className="inline-flex items-center gap-2 cursor-pointer rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                <Upload className="h-3.5 w-3.5" />
                Choose Audio File
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                />
              </label>

              {audioFile && (
                <p className="mt-3 text-xs text-foreground font-medium">
                  📎 {audioFile.name}
                </p>
              )}
            </div>

            <p className="text-[11px] text-muted-foreground text-center">
              Supports MP3, WAV, M4A • Max 20MB • AI transcription fills all fields automatically
            </p>

            <Button className="w-full" size="sm" disabled={!audioFile}>
              <Mic className="h-3.5 w-3.5 mr-1.5" />
              Transcribe & Create Lead
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
