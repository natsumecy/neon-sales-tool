"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ApplePaySheetProps {
  amount: string;
  merchantName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ApplePaySheet({
  amount,
  merchantName,
  onConfirm,
  onCancel,
}: ApplePaySheetProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  function handleCancel() {
    setVisible(false);
    setTimeout(onCancel, 300);
  }

  function handleConfirm() {
    setVisible(false);
    setTimeout(onConfirm, 300);
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Dark overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          opacity: visible ? 1 : 0,
        }}
        onClick={handleCancel}
      />

      {/* Sheet */}
      <div
        className="relative z-10 rounded-t-2xl bg-[#1C1C1E] transition-transform duration-300 ease-out"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#38383A] px-4 py-3">
          <button
            type="button"
            onClick={handleCancel}
            className="text-[14px] font-medium text-[#0A84FF]"
          >
            Cancel
          </button>
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="size-4 fill-white">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.51-3.23 0-1.44.64-2.2.45-3.06-.4C3.79 16.17 4.36 9.05 8.93 8.78c1.27.07 2.15.72 2.9.76.97-.2 1.9-.89 3.01-.8 1.28.1 2.24.6 2.87 1.52-2.64 1.57-2.01 5.03.36 6-.5 1.33-.98 2.63-2.02 4.02zM12.07 8.7c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <span className="text-[14px] font-semibold text-white">Pay</span>
          </div>
          <div className="w-[52px]" />
        </div>

        {/* Payment details */}
        <div className="px-4 py-4">
          {/* Merchant */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[13px] text-[#8E8E93]">
              {merchantName}
            </span>
            <span className="text-[20px] font-bold text-white">
              {amount}
            </span>
          </div>

          {/* Card info */}
          <div className="mb-4 flex items-center justify-between rounded-lg bg-[#2C2C2E] px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded bg-[#1A1F71] text-[7px] font-bold text-white">
                VISA
              </div>
              <span className="text-[14px] text-white">
                Visa ****4242
              </span>
            </div>
            <span className="text-[12px] text-[#0A84FF]">Change</span>
          </div>

          {/* Pay with section */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <span className="text-[13px] text-[#8E8E93]">
              Confirm with side button
            </span>

            {/* Simulated side button / confirm gesture */}
            <button
              type="button"
              onClick={handleConfirm}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-white transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="#000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <circle cx="12" cy="16" r="1" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-[16px] font-semibold text-black">
                  Pay with Face ID
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom safe area */}
        <div className="h-6" />
      </div>
    </div>
  );
}
