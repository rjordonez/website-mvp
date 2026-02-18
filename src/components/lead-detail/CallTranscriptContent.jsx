import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Phone } from "lucide-react";

export default function CallTranscriptContent({ transcripts }) {
  if (!transcripts || transcripts.length === 0) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground italic">No call transcripts available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transcripts.map((item, index) => (
        <div key={index} className="space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {item.timestamp || "Recent call"}
            </span>
            {item.duration && (
              <Badge variant="outline" className="text-xs">
                {item.duration}
              </Badge>
            )}
          </div>
          <div className="text-sm text-foreground whitespace-pre-wrap bg-muted/30 p-3 rounded-md">
            {item.transcript || "No transcript available"}
          </div>
        </div>
      ))}
    </div>
  );
}
