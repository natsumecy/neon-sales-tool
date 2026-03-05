"use client";

import { useState, useEffect } from "react";
import { Lock, ChevronLeft, Share, RotateCw } from "lucide-react";

interface BrowserTransitionProps {
  url?: string;
  reverse?: boolean;
}

export function BrowserTransition({
  url = "checkout.example.com",
  reverse = false,
}: BrowserTransitionProps) {
  const [phase, setPhase] = useState<"enter" | "loading" | "done">("enter");

  useEffect(() => {
    // Phase 1: Slide in the browser chrome
    const loadingTimer = setTimeout(
      () => setPhase("loading"),
      reverse ? 100 : 400
    );
    // Phase 2: Loading bar completes
    const doneTimer = setTimeout(
      () => setPhase("done"),
      reverse ? 600 : 1200
    );
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(doneTimer);
    };
  }, [reverse]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col overflow-hidden bg-[#F2F2F7]">
      {/* Loading progress bar at top */}
      <div className="relative h-0.5 w-full bg-[#E5E5EA]">
        <div
          className="absolute inset-y-0 left-0 bg-[#007AFF] transition-all"
          style={{
            width:
              phase === "enter"
                ? "0%"
                : phase === "loading"
                  ? "70%"
                  : "100%",
            transitionDuration:
              phase === "loading" ? "800ms" : "200ms",
            transitionTimingFunction: "ease-out",
          }}
        />
      </div>

      {/* Safari-style browser chrome */}
      <div
        className="shrink-0 transition-transform duration-300 ease-out"
        style={{
          transform:
            reverse
              ? phase === "enter"
                ? "translateY(0)"
                : "translateY(-100%)"
              : phase === "enter"
                ? "translateY(-100%)"
                : "translateY(0)",
        }}
      >
        {/* Status bar area */}
        <div className="flex h-6 items-center justify-between bg-[#F2F2F7] px-6">
          <span className="text-[12px] font-semibold text-black">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex items-end gap-0.5">
              {[3, 5, 7, 9].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-sm bg-black"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            <span className="ml-1 text-[11px] font-semibold text-black">
              5G
            </span>
            <div className="ml-1 h-[10px] w-[22px] rounded-sm border border-black/30">
              <div className="ml-px mt-px h-[6px] w-[16px] rounded-sm bg-black" />
            </div>
          </div>
        </div>

        {/* Address bar */}
        <div className="bg-[#F2F2F7] px-3 pb-2">
          <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 shadow-sm">
            <Lock className="size-3 text-[#8E8E93]" />
            <span className="flex-1 truncate text-center text-[13px] text-[#1C1C1E]">
              {url}
            </span>
            <RotateCw className="size-3 text-[#8E8E93]" />
          </div>
        </div>
      </div>

      {/* Content area (mostly transparent / transitions out) */}
      <div
        className="flex-1 transition-opacity duration-500"
        style={{
          opacity: phase === "done" ? 0 : 1,
          backgroundColor: "#F2F2F7",
        }}
      />

      {/* Bottom toolbar */}
      <div
        className="flex shrink-0 items-center justify-between bg-[#F2F2F7] px-6 py-2 transition-transform duration-300 ease-out"
        style={{
          transform:
            reverse
              ? phase === "enter"
                ? "translateY(0)"
                : "translateY(100%)"
              : phase === "enter"
                ? "translateY(100%)"
                : "translateY(0)",
        }}
      >
        <ChevronLeft className="size-5 text-[#007AFF]" />
        <div className="flex items-center gap-6">
          <Share className="size-4 text-[#007AFF]" />
        </div>
      </div>
    </div>
  );
}
