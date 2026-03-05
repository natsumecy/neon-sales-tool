"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { OrderSummary } from "./OrderSummary";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { PromoCode } from "./PromoCode";

interface DirectCheckoutDrawerProps {
  open: boolean;
  publisher: {
    simulatedItem: {
      name: string;
      price: string;
      asset: string;
      discountLabel: string;
    };
    freeGift: { name: string; asset: string };
    promo: { enabled: boolean; code: string; discountPercent: number };
  };
  onSelectPayment: (method: "apple-pay" | "card") => void;
  onClose: () => void;
}

export function DirectCheckoutDrawer({
  open,
  publisher,
  onSelectPayment,
  onClose,
}: DirectCheckoutDrawerProps) {
  const [visible, setVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"apple-pay" | "card">(
    "apple-pay"
  );

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [open]);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  function handleSelectMethod(method: "apple-pay" | "card") {
    setSelectedMethod(method);
  }

  function handlePay() {
    onSelectPayment(selectedMethod);
  }

  if (!open && !visible) return null;

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

      {/* Drawer */}
      <div
        className="relative z-10 max-h-[85%] overflow-y-auto rounded-t-2xl transition-transform duration-300 ease-out"
        style={{
          backgroundColor: "var(--bg-primary)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        {/* Drag handle + close */}
        <div className="sticky top-0 z-10" style={{ backgroundColor: "var(--bg-primary)" }}>
          <div className="flex items-center justify-between px-4 pb-1 pt-3">
            <div className="w-7" />
            <div
              className="h-1 w-10 rounded-full"
              style={{ backgroundColor: "var(--stroke-unselected)" }}
            />
            <button
              type="button"
              onClick={handleClose}
              className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-[var(--bg-selected)]"
            >
              <X
                className="size-4"
                style={{ color: "var(--text-secondary)" }}
              />
            </button>
          </div>

          <h2
            className="px-4 pb-2 text-center text-[17px] font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Quick checkout
          </h2>
        </div>

        {/* Order Summary */}
        <OrderSummary
          itemName={publisher.simulatedItem.name}
          price={publisher.simulatedItem.price}
          asset={publisher.simulatedItem.asset}
          discountLabel={publisher.simulatedItem.discountLabel}
          freeGift={
            publisher.freeGift.name
              ? publisher.freeGift
              : undefined
          }
        />

        {/* Promo Code */}
        <PromoCode
          enabled={publisher.promo.enabled}
          validCode={publisher.promo.code}
          discountPercent={publisher.promo.discountPercent}
        />

        {/* Divider */}
        <div
          className="mx-4 my-1 h-px"
          style={{ backgroundColor: "var(--stroke-unselected)" }}
        />

        {/* Payment Method Selector */}
        <PaymentMethodSelector
          selected={selectedMethod}
          onSelect={handleSelectMethod}
        />

        {/* Pay button */}
        <div className="px-4 pb-6 pt-3">
          <button
            type="button"
            onClick={handlePay}
            className="flex h-12 w-full items-center justify-center rounded-xl text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
            style={{ backgroundColor: "var(--brand-accent)" }}
          >
            Pay {publisher.simulatedItem.price}
          </button>
        </div>
      </div>
    </div>
  );
}
