"use client";

import { ChevronLeft } from "lucide-react";

interface CheckoutShellProps {
  children: React.ReactNode;
  onBack?: () => void;
}

export function CheckoutShell({ children, onBack }: CheckoutShellProps) {
  return (
    <div className="flex h-full flex-col bg-[var(--bg-primary)]">
      {/* Top navigation bar */}
      <div
        className="flex h-12 shrink-0 items-center border-b border-[var(--stroke-unselected)] px-3"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <button
          type="button"
          onClick={onBack}
          className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--bg-selected)]"
          aria-label="Go back"
        >
          <ChevronLeft
            className="size-5"
            style={{ color: "var(--brand-accent)" }}
          />
        </button>
        <h1
          className="flex-1 text-center text-[15px] font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Checkout
        </h1>
        {/* Spacer to balance the back button */}
        <div className="size-8" />
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {children}
      </div>
    </div>
  );
}
