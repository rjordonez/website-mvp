import { useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ManualTab from "@/components/add-lead/ManualTab";

export default function AddLeadDialog({ open, onOpenChange, onLeadCreated, isMobile }) {
  const handleOpenChange = useCallback((newOpen) => {
    onOpenChange(newOpen);
  }, [onOpenChange]);

  const handleLeadCreated = useCallback((lead, opts) => {
    onLeadCreated?.(lead, opts);
    handleOpenChange(false);
  }, [onLeadCreated, handleOpenChange]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent fullScreen={isMobile} className={isMobile ? "" : "max-w-2xl max-h-[85vh] overflow-y-auto"}>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">Add New Lead</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <ManualTab onLeadCreated={handleLeadCreated} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
