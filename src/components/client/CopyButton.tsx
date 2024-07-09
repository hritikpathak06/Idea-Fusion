"use client";
import { Button } from "@/components/ui/button";
import React from "react";

function CopyButton({ aiResponse }: any) {
  return (
    <div>
      <Button
        variant="ghost"
        className="text-primary bg-white"
        onClick={() => {
          navigator.clipboard.writeText(aiResponse),
            alert("Copied To Clipboard");
        }}
      >
        Copy
      </Button>
    </div>
  );
}

export default CopyButton;
