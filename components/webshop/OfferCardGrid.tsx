"use client";

import { useState } from "react";
import { OfferCard as OfferCardType } from "@/types/publisher";
import { OfferCard } from "./OfferCard";

interface OfferCardGridProps {
  cards: OfferCardType[];
  onSelect?: (card: OfferCardType) => void;
}

export function OfferCardGrid({ cards, onSelect }: OfferCardGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    cards.find((c) => c.selected)?.id ?? cards[0]?.id ?? null
  );

  const horizontalCards = cards.filter((c) => c.layout === "horizontal");
  const verticalCards = cards.filter((c) => c.layout === "vertical");

  const handleSelect = (card: OfferCardType) => {
    setSelectedId(card.id);
    onSelect?.(card);
  };

  return (
    <div className="px-4 space-y-3">
      {verticalCards.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {verticalCards.map((card) => (
            <OfferCard
              key={card.id}
              card={card}
              isSelected={selectedId === card.id}
              onSelect={() => handleSelect(card)}
            />
          ))}
        </div>
      )}
      <div className="space-y-2">
        {horizontalCards.map((card) => (
          <OfferCard
            key={card.id}
            card={card}
            isSelected={selectedId === card.id}
            onSelect={() => handleSelect(card)}
          />
        ))}
      </div>
    </div>
  );
}
