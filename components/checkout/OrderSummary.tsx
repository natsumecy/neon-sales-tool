"use client";

import Image from "next/image";

interface OrderSummaryProps {
  itemName: string;
  price: string;
  asset: string;
  discountLabel?: string;
  freeGift?: { name: string; asset: string };
}

export function OrderSummary({
  itemName,
  price,
  asset,
  discountLabel,
  freeGift,
}: OrderSummaryProps) {
  return (
    <div className="px-4 py-4">
      <h2
        className="mb-3 text-[13px] font-semibold uppercase tracking-wide"
        style={{ color: "var(--text-secondary)" }}
      >
        Order summary
      </h2>

      {/* Main item */}
      <div
        className="flex items-center gap-3 rounded-xl border-2 p-3 transition-all"
        style={{
          borderColor: "var(--stroke-item-summary)",
          backgroundColor: "var(--bg-selected)",
        }}
      >
        <div className="relative flex size-14 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-primary)]">
          <Image
            src={`/assets/items/${asset}.svg`}
            alt={itemName}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[15px] font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {itemName}
          </p>
          <div className="flex items-center gap-2">
            <span
              className="text-[15px] font-bold"
              style={{ color: "var(--brand-accent)" }}
            >
              {price}
            </span>
            {discountLabel && (
              <span
                className="rounded-md px-1.5 py-0.5 text-[11px] font-semibold text-white"
                style={{ backgroundColor: "var(--brand-accent)" }}
              >
                {discountLabel}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Free gift */}
      {freeGift && (
        <div
          className="mt-2 flex items-center gap-3 rounded-xl border p-3 transition-all"
          style={{
            borderColor: "var(--stroke-unselected)",
            backgroundColor: "var(--bg-selected)",
          }}
        >
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-primary)]">
            <Image
              src={`/assets/items/${freeGift.asset}.svg`}
              alt={freeGift.name}
              width={28}
              height={28}
              className="object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="truncate text-[13px] font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {freeGift.name}
            </p>
          </div>

          <span
            className="shrink-0 rounded-md px-2 py-0.5 text-[11px] font-bold"
            style={{
              backgroundColor: "var(--state-pass)",
              color: "#fff",
            }}
          >
            FREE
          </span>
        </div>
      )}
    </div>
  );
}
