"use client";

import { Smartphone, Tablet } from "lucide-react";

interface DeviceFrameSwitcherProps {
  device: "iphone" | "android";
  onSwitch: (device: "iphone" | "android") => void;
}

export function DeviceFrameSwitcher({
  device,
  onSwitch,
}: DeviceFrameSwitcherProps) {
  return (
    <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
      <button
        onClick={() => onSwitch("iphone")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
          device === "iphone"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Smartphone className="h-3.5 w-3.5" />
        iPhone
      </button>
      <button
        onClick={() => onSwitch("android")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
          device === "android"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Tablet className="h-3.5 w-3.5" />
        Android
      </button>
    </div>
  );
}
