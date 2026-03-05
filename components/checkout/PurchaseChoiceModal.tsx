"use client";

import { useState, useEffect } from "react";
import { X, Globe, Smartphone } from "lucide-react";

interface PurchaseChoiceModalProps {
  savings?: string;
  onChooseWeb: () => void;
  onChooseIAP: () => void;
  onClose: () => void;
}

export function PurchaseChoiceModal({
  savings,
  onChooseWeb,
  onChooseIAP,
  onClose,
}: PurchaseChoiceModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  function handleWeb() {
    setVisible(false);
    setTimeout(onChooseWeb, 300);
  }

  function handleIAP() {
    setVisible(false);
    setTimeout(onChooseIAP, 300);
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
        onClick={handleClose}
      />

      {/* Bottom sheet */}
      <div
        className="relative z-10 rounded-t-2xl px-4 pb-8 pt-4 transition-transform duration-300 ease-out"
        style={{
          backgroundColor: "var(--bg-primary)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        {/* Drag handle */}
        <div className="mb-3 flex justify-center">
          <div
            className="h-1 w-10 rounded-full"
            style={{ backgroundColor: "var(--stroke-unselected)" }}
          />
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 flex size-7 items-center justify-center rounded-full transition-colors hover:bg-[var(--bg-selected)]"
        >
          <X
            className="size-4"
            style={{ color: "var(--text-secondary)" }}
          />
        </button>

        {/* Title */}
        <h3
          className="mb-1 text-center text-[17px] font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Choose how to buy
        </h3>
        <p
          className="mb-5 text-center text-[13px]"
          style={{ color: "var(--text-secondary)" }}
        >
          Select your preferred purchase method
        </p>

        {/* Buy on Web — primary option */}
        <button
          type="button"
          onClick={handleWeb}
          className="mb-3 flex w-full items-center gap-3 rounded-xl border-2 p-4 transition-all active:scale-[0.98]"
          style={{
            borderColor: "var(--brand-accent)",
            backgroundColor: "var(--bg-selected)",
          }}
        >
          <div
            className="flex size-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--brand-accent)" }}
          >
            <Globe className="size-5 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p
              className="text-[15px] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Buy on web
            </p>
            {savings && (
              <p
                className="text-[13px] font-medium"
                style={{ color: "var(--brand-accent)" }}
              >
                Save {savings}
              </p>
            )}
          </div>
          {savings && (
            <span
              className="shrink-0 rounded-lg px-2 py-1 text-[12px] font-bold text-white"
              style={{ backgroundColor: "var(--brand-accent)" }}
            >
              BEST DEAL
            </span>
          )}
        </button>

        {/* Buy In-App — secondary option */}
        <button
          type="button"
          onClick={handleIAP}
          className="flex w-full items-center gap-3 rounded-xl border p-4 transition-all active:scale-[0.98]"
          style={{
            borderColor: "var(--stroke-unselected)",
          }}
        >
          <div
            className="flex size-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--bg-selected)" }}
          >
            <Smartphone
              className="size-5"
              style={{ color: "var(--text-secondary)" }}
            />
          </div>
          <div className="flex-1 text-left">
            <p
              className="text-[15px] font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Buy in-app
            </p>
            <p
              className="text-[13px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Standard price
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
