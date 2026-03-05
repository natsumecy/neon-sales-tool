"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface SuccessModalProps {
  itemName: string;
  price: string;
  onContinue: () => void;
}

export function SuccessModal({
  itemName,
  price,
  onContinue,
}: SuccessModalProps) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Checkmark animation */}
      <div
        className="mb-6 flex size-20 items-center justify-center rounded-full transition-all duration-500"
        style={{
          backgroundColor: "var(--state-pass)",
          transform: animateIn ? "scale(1)" : "scale(0)",
          opacity: animateIn ? 1 : 0,
        }}
      >
        <Check className="size-10 text-white" strokeWidth={3} />
      </div>

      {/* Title */}
      <h2
        className="mb-2 text-[20px] font-bold transition-all delay-200 duration-500"
        style={{
          color: "var(--text-primary)",
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(10px)",
        }}
      >
        Payment successful!
      </h2>

      {/* Details */}
      <div
        className="mb-8 flex flex-col items-center gap-1 transition-all delay-300 duration-500"
        style={{
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(10px)",
        }}
      >
        <p
          className="text-[15px] font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {itemName}
        </p>
        <p
          className="text-[14px]"
          style={{ color: "var(--text-secondary)" }}
        >
          {price}
        </p>
      </div>

      {/* Receipt summary box */}
      <div
        className="mb-8 w-full rounded-xl border p-4 transition-all delay-400 duration-500"
        style={{
          borderColor: "var(--stroke-unselected)",
          backgroundColor: "var(--bg-selected)",
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(10px)",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[13px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Item
          </span>
          <span
            className="text-[13px] font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {itemName}
          </span>
        </div>
        <div
          className="my-2 h-px"
          style={{ backgroundColor: "var(--stroke-unselected)" }}
        />
        <div className="flex items-center justify-between">
          <span
            className="text-[13px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Total charged
          </span>
          <span
            className="text-[13px] font-bold"
            style={{ color: "var(--brand-accent)" }}
          >
            {price}
          </span>
        </div>
      </div>

      {/* Continue button */}
      <button
        type="button"
        onClick={onContinue}
        className="h-12 w-full rounded-xl text-[16px] font-semibold text-white transition-all delay-500 duration-500 active:scale-[0.98]"
        style={{
          backgroundColor: "var(--brand-accent)",
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(10px)",
        }}
      >
        Return to game
      </button>
    </div>
  );
}
