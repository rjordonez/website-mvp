import { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function BulkImportDialog({ open, onOpenChange, type = "leads" }) {
  const fileRef = useRef(null);
  const label = type === "leads" ? "Leads" : "Referral Partners";
  const sampleCount = type === "leads" ? "20 leads" : "10 partners";

  const handleUpload = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    toast({ title: "Import started", description: `Importing ${file.name}...` });
    // Demo: just close after brief delay
    setTimeout(() => {
      toast({ title: "Import complete", description: `Successfully imported from ${file.name}.` });
      onOpenChange(false);
    }, 1500);
    e.target.value = "";
  };

  const downloadSample = (format) => {
    toast({ title: `${format.toUpperCase()} downloaded`, description: `Sample ${format.toUpperCase()} template has been downloaded.` });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Import {label}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 flex flex-col items-center gap-3">
            <FileText className="h-10 w-10 text-muted-foreground/60" />
            <p className="text-sm text-muted-foreground text-center">
              Upload a CSV file to import {label.toLowerCase()}
            </p>
            <Button onClick={handleUpload} className="gap-2">
              <Upload className="h-4 w-4" /> Upload file
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Download sample{" "}
            <button onClick={() => downloadSample("csv")} className="text-primary font-medium hover:underline">CSV</button>
            {" "}or{" "}
            <button onClick={() => downloadSample("xlsx")} className="text-primary font-medium hover:underline">XLSX</button>
            {" "}({sampleCount})
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
