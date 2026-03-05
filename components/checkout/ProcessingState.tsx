"use client";

import { Loader2 } from "lucide-react";

interface ProcessingStateProps {
  message?: string;
}

export function ProcessingState({
  message = "Processing payment...",
}: ProcessingStateProps) {
  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinning loader */}
        <div className="relative">
          <Loader2
            className="size-10 animate-spin"
            style={{ color: "var(--brand-accent)" }}
          />
        </div>

        {/* Message */}
        <p
          className="text-[15px] font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {message}
        </p>

        {/* Subtle secondary text */}
        <p
          className="text-[12px]"
          style={{ color: "var(--text-secondary)" }}
        >
          Please do not close this window
        </p>
      </div>
    </div>
  );
}
