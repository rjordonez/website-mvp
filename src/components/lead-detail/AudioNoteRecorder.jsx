import React from 'react';
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";

export default function AudioNoteRecorder({ onTranscriptGenerated }) {
  const [recording, setRecording] = React.useState(false);

  const handleToggle = () => {
    setRecording(!recording);
    if (recording && onTranscriptGenerated) {
      // Placeholder: would call actual speech-to-text API
      onTranscriptGenerated("Sample audio note transcript");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant={recording ? "destructive" : "outline"}
        onClick={handleToggle}
      >
        {recording ? <Square className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
        {recording ? "Stop Recording" : "Record Note"}
      </Button>
      {recording && <span className="text-sm text-muted-foreground animate-pulse">Recording...</span>}
    </div>
  );
}
