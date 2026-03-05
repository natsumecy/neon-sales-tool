"use client";

import { useState, useEffect } from "react";
import { X, CreditCard, Lock } from "lucide-react";

interface CardPaymentSheetProps {
  amount: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CardPaymentSheet({
  amount,
  onConfirm,
  onCancel,
}: CardPaymentSheetProps) {
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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity: visible ? 1 : 0,
        }}
        onClick={handleCancel}
      />

      {/* Sheet */}
      <div
        className="relative z-10 rounded-t-2xl transition-transform duration-300 ease-out"
        style={{
          backgroundColor: "var(--bg-primary)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b px-4 py-3"
          style={{ borderColor: "var(--stroke-unselected)" }}
        >
          <h3
            className="text-[16px] font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Card payment
          </h3>
          <button
            type="button"
            onClick={handleCancel}
            className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-[var(--bg-selected)]"
          >
            <X
              className="size-4"
              style={{ color: "var(--text-secondary)" }}
            />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3 px-4 py-4">
          {/* Card Number */}
          <div>
            <label
              className="mb-1 block text-[12px] font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Card number
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value="4242 4242 4242 4242"
                className="h-10 w-full rounded-lg border pl-3 pr-10 text-[14px] outline-none"
                style={{
                  backgroundColor: "var(--bg-text-field)",
                  borderColor: "var(--stroke-unselected)",
                  color: "var(--text-primary)",
                }}
              />
              <CreditCard
                className="absolute right-3 top-1/2 size-4 -translate-y-1/2"
                style={{ color: "var(--text-secondary)" }}
              />
            </div>
          </div>

          {/* Expiry + CVV */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label
                className="mb-1 block text-[12px] font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Expiry date
              </label>
              <input
                type="text"
                readOnly
                value="12/28"
                className="h-10 w-full rounded-lg border px-3 text-[14px] outline-none"
                style={{
                  backgroundColor: "var(--bg-text-field)",
                  borderColor: "var(--stroke-unselected)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div className="w-24">
              <label
                className="mb-1 block text-[12px] font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                CVV
              </label>
              <input
                type="text"
                readOnly
                value="123"
                className="h-10 w-full rounded-lg border px-3 text-[14px] outline-none"
                style={{
                  backgroundColor: "var(--bg-text-field)",
                  borderColor: "var(--stroke-unselected)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <label
              className="mb-1 block text-[12px] font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Cardholder name
            </label>
            <input
              type="text"
              readOnly
              value="Demo User"
              className="h-10 w-full rounded-lg border px-3 text-[14px] outline-none"
              style={{
                backgroundColor: "var(--bg-text-field)",
                borderColor: "var(--stroke-unselected)",
                color: "var(--text-primary)",
              }}
            />
          </div>
        </div>

        {/* Pay button */}
        <div className="px-4 pb-4">
          <button
            type="button"
            onClick={handleConfirm}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
            style={{ backgroundColor: "var(--brand-accent)" }}
          >
            <Lock className="size-4" />
            Pay {amount}
          </button>
          <div className="mt-2 flex items-center justify-center gap-1">
            <Lock
              className="size-3"
              style={{ color: "var(--text-secondary)" }}
            />
            <span
              className="text-[11px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Secured with 256-bit SSL encryption
            </span>
          </div>
        </div>

        {/* Bottom safe area */}
        <div className="h-4" />
      </div>
    </div>
  );
}
