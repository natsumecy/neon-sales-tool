"use client";

import { useState } from "react";
import { Publisher, OfferCard } from "@/types/publisher";
import { PRESET_OFFER_CARDS } from "@/lib/presets";
import { updatePublisherConfig } from "@/app/actions/publishers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, X } from "lucide-react";

interface OfferCardPickerProps {
  publisher: Publisher;
}

export function OfferCardPicker({ publisher }: OfferCardPickerProps) {
  const [saving, setSaving] = useState(false);
  const selectedIds = new Set(publisher.offerCards.selected.map((c) => c.id));

  const allCards = [
    ...publisher.offerCards.generated,
    ...PRESET_OFFER_CARDS.filter(
      (p) => !publisher.offerCards.generated.some((g) => g.id === p.id)
    ),
  ];

  const toggleCard = async (card: OfferCard) => {
    setSaving(true);
    const isSelected = selectedIds.has(card.id);
    const newSelected = isSelected
      ? publisher.offerCards.selected.filter((c) => c.id !== card.id)
      : [...publisher.offerCards.selected, card];

    await updatePublisherConfig(publisher.slug, {
      offerCards: { ...publisher.offerCards, selected: newSelected },
    });
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      {publisher.offerCards.selected.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">
              Selected cards ({publisher.offerCards.selected.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {publisher.offerCards.selected.map((card) => (
              <div
                key={card.id}
                className="flex items-center gap-3 p-2 rounded-lg border"
              >
                <img
                  src={`/assets/items/${card.itemAsset}.svg`}
                  alt={card.itemAsset}
                  className="w-8 h-8"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {card.itemName}
                  </p>
                  <p className="text-xs text-muted-foreground">{card.price}</p>
                </div>
                <Badge variant="outline" className="text-[10px] flex-shrink-0">
                  {card.source}
                </Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 flex-shrink-0"
                  onClick={() => toggleCard(card)}
                  disabled={saving}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Available cards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {allCards.map((card) => {
            const isSelected = selectedIds.has(card.id);
            return (
              <div
                key={card.id}
                className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-muted border-primary/20"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => toggleCard(card)}
              >
                <img
                  src={`/assets/items/${card.itemAsset}.svg`}
                  alt={card.itemAsset}
                  className="w-8 h-8"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {card.itemName}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {card.price}
                    </span>
                    {card.discountLabel && (
                      <span className="text-[10px] text-muted-foreground">
                        {card.discountLabel}
                      </span>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] flex-shrink-0">
                  {card.source}
                </Badge>
                {isSelected ? (
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                ) : (
                  <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </div>
            );
          })}
          {allCards.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">
              No cards available. Run Claude Code to generate offer cards, or
              select from presets above.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
