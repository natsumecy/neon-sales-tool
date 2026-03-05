"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Check, Tag } from "lucide-react";

interface PromoCodeProps {
  enabled: boolean;
  validCode: string;
  discountPercent: number;
  onApply?: (applied: boolean) => void;
}

export function PromoCode({
  enabled,
  validCode,
  discountPercent,
  onApply,
}: PromoCodeProps) {
  const [expanded, setExpanded] = useState(false);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState(false);

  if (!enabled) return null;

  function handleApply() {
    if (code.trim().toUpperCase() === validCode.toUpperCase()) {
      setApplied(true);
      setError(false);
      onApply?.(true);
    } else {
      setError(true);
      setApplied(false);
      onApply?.(false);
    }
  }

  function handleRemove() {
    setApplied(false);
    setCode("");
    setError(false);
    onApply?.(false);
  }

  return (
    <div className="px-4 pb-2">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 rounded-lg py-2 transition-colors"
      >
        <Tag
          className="size-4"
          style={{ color: "var(--text-secondary)" }}
        />
        <span
          className="flex-1 text-left text-[14px] font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Promo code
        </span>
        {expanded ? (
          <ChevronUp
            className="size-4"
            style={{ color: "var(--text-secondary)" }}
          />
        ) : (
          <ChevronDown
            className="size-4"
            style={{ color: "var(--text-secondary)" }}
          />
        )}
      </button>

      {/* Expandable content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: expanded ? "120px" : "0px",
          opacity: expanded ? 1 : 0,
        }}
      >
        {applied ? (
          /* Success state */
          <div
            className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5"
            style={{ backgroundColor: "var(--bg-selected)" }}
          >
            <Check
              className="size-4 shrink-0"
              style={{ color: "var(--state-pass)" }}
            />
            <span
              className="flex-1 text-[13px] font-medium"
              style={{ color: "var(--state-pass)" }}
            >
              {discountPercent}% discount applied
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-[13px] font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Remove
            </button>
          </div>
        ) : (
          /* Input state */
          <div className="mt-1 flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(false);
                }}
                placeholder="Enter code"
                className="h-10 w-full rounded-lg border px-3 text-[14px] outline-none transition-colors"
                style={{
                  backgroundColor: "var(--bg-text-field)",
                  borderColor: error
                    ? "var(--state-forbidden)"
                    : "var(--stroke-unselected)",
                  color: "var(--text-primary)",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleApply();
                }}
              />
              {error && (
                <p
                  className="absolute -bottom-4.5 left-0 text-[11px]"
                  style={{ color: "var(--state-forbidden)" }}
                >
                  Invalid promo code
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleApply}
              disabled={!code.trim()}
              className="h-10 rounded-lg px-4 text-[14px] font-semibold text-white transition-opacity disabled:opacity-40"
              style={{ backgroundColor: "var(--brand-accent)" }}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
