"use client";

import { CreditCard } from "lucide-react";

interface PaymentMethodSelectorProps {
  selected: "apple-pay" | "card";
  onSelect: (method: "apple-pay" | "card") => void;
  device?: "iphone" | "android";
}

function ApplePayLogo() {
  return (
    <span className="flex items-center gap-0.5 text-[15px] font-semibold">
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="currentColor"
        style={{ color: "var(--text-primary)" }}
      >
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.51-3.23 0-1.44.64-2.2.45-3.06-.4C3.79 16.17 4.36 9.05 8.93 8.78c1.27.07 2.15.72 2.9.76.97-.2 1.9-.89 3.01-.8 1.28.1 2.24.6 2.87 1.52-2.64 1.57-2.01 5.03.36 6 -.5 1.33-.98 2.63-2.02 4.02zM12.07 8.7c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
      Pay
    </span>
  );
}

function GooglePayLogo() {
  return (
    <span className="flex items-center gap-1 text-[15px] font-semibold">
      <svg viewBox="0 0 24 24" className="size-5" fill="none">
        <path
          d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
          fill="var(--text-primary)"
        />
      </svg>
      Pay
    </span>
  );
}

export function PaymentMethodSelector({
  selected,
  onSelect,
  device = "iphone",
}: PaymentMethodSelectorProps) {
  const isApple = device === "iphone";
  const digitalWalletLabel = isApple ? "Apple Pay" : "Google Pay";

  return (
    <div className="px-4 py-2">
      <h2
        className="mb-3 text-[13px] font-semibold uppercase tracking-wide"
        style={{ color: "var(--text-secondary)" }}
      >
        Payment method
      </h2>

      <div className="flex flex-col gap-2">
        {/* Digital wallet option */}
        <button
          type="button"
          onClick={() => onSelect("apple-pay")}
          className="flex items-center gap-3 rounded-xl border-2 p-3.5 transition-all duration-200"
          style={{
            borderColor:
              selected === "apple-pay"
                ? "var(--brand-accent)"
                : "var(--stroke-unselected)",
            backgroundColor:
              selected === "apple-pay"
                ? "var(--bg-selected)"
                : "transparent",
          }}
        >
          {/* Radio indicator */}
          <div
            className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
            style={{
              borderColor:
                selected === "apple-pay"
                  ? "var(--brand-accent)"
                  : "var(--stroke-unselected)",
            }}
          >
            {selected === "apple-pay" && (
              <div
                className="size-2.5 rounded-full"
                style={{ backgroundColor: "var(--brand-accent)" }}
              />
            )}
          </div>

          <div className="flex flex-1 items-center gap-2">
            {isApple ? <ApplePayLogo /> : <GooglePayLogo />}
          </div>

          <span
            className="text-[12px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {digitalWalletLabel}
          </span>
        </button>

        {/* Credit/Debit Card option */}
        <button
          type="button"
          onClick={() => onSelect("card")}
          className="flex items-center gap-3 rounded-xl border-2 p-3.5 transition-all duration-200"
          style={{
            borderColor:
              selected === "card"
                ? "var(--brand-accent)"
                : "var(--stroke-unselected)",
            backgroundColor:
              selected === "card"
                ? "var(--bg-selected)"
                : "transparent",
          }}
        >
          {/* Radio indicator */}
          <div
            className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
            style={{
              borderColor:
                selected === "card"
                  ? "var(--brand-accent)"
                  : "var(--stroke-unselected)",
            }}
          >
            {selected === "card" && (
              <div
                className="size-2.5 rounded-full"
                style={{ backgroundColor: "var(--brand-accent)" }}
              />
            )}
          </div>

          <div className="flex flex-1 items-center gap-2">
            <CreditCard
              className="size-5"
              style={{ color: "var(--text-primary)" }}
            />
            <span
              className="text-[15px] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Credit / debit card
            </span>
          </div>

          {/* Card brand icons */}
          <div className="flex items-center gap-1">
            <div className="flex size-6 items-center justify-center rounded bg-[#1A1F71] text-[8px] font-bold text-white">
              VISA
            </div>
            <div className="flex size-6 items-center justify-center rounded bg-[#EB001B]">
              <div className="flex">
                <div className="size-2.5 rounded-full bg-[#EB001B]" />
                <div className="-ml-1 size-2.5 rounded-full bg-[#F79E1B] opacity-80" />
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
