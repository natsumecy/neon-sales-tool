"use client";

import { OfferCard as OfferCardType } from "@/types/publisher";

interface OfferCardProps {
  card: OfferCardType;
  onSelect?: () => void;
  isSelected?: boolean;
}

export function OfferCard({ card, onSelect, isSelected }: OfferCardProps) {
  const isHorizontal = card.layout === "horizontal";

  return (
    <button
      onClick={onSelect}
      className="w-full text-left transition-all duration-200 rounded-xl overflow-hidden"
      style={{
        background: isSelected
          ? "var(--bg-selected)"
          : "var(--bg-primary)",
        border: `2px solid ${
          isSelected
            ? "var(--stroke-item-summary)"
            : "var(--stroke-unselected)"
        }`,
        boxShadow: isSelected
          ? `0 0 var(--drop-shadow-blur) var(--drop-shadow-color)`
          : "none",
      }}
    >
      {isHorizontal ? (
        <div className="flex items-center gap-3 p-3">
          <div className="relative flex-shrink-0">
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center"
              style={{ background: "var(--bg-selected)" }}
            >
              <img
                src={`/assets/items/${card.itemAsset}.svg`}
                alt={card.itemName}
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="font-semibold text-sm truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {card.itemName}
              </span>
              {card.discountBadge && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    background: "var(--brand-accent)",
                    color: "#FFFFFF",
                  }}
                >
                  {card.discountBadge}
                </span>
              )}
            </div>
            <span
              className="text-sm font-bold mt-0.5 block"
              style={{ color: "var(--brand-accent)" }}
            >
              {card.price}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4 flex flex-col items-center text-center">
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center mb-3"
            style={{ background: "var(--bg-selected)" }}
          >
            <img
              src={`/assets/items/${card.itemAsset}.svg`}
              alt={card.itemName}
              className="w-14 h-14 object-contain"
            />
          </div>
          <span
            className="font-semibold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            {card.itemName}
          </span>
          <span
            className="text-sm font-bold mt-1"
            style={{ color: "var(--brand-accent)" }}
          >
            {card.price}
          </span>
        </div>
      )}
      {card.discountLabel && (
        <div
          className="text-[10px] font-bold uppercase tracking-wider text-center py-1"
          style={{
            background: "var(--brand-accent)",
            color: "#FFFFFF",
          }}
        >
          {card.discountLabel}
        </div>
      )}
    </button>
  );
}
