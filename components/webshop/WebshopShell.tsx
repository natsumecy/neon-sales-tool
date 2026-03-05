"use client";

import { Publisher } from "@/types/publisher";
import { HeroSection } from "./HeroSection";
import { SectionHeader } from "./SectionHeader";
import { OfferCardGrid } from "./OfferCardGrid";

interface WebshopShellProps {
  publisher: Publisher;
  onSelectItem?: () => void;
}

export function WebshopShell({ publisher, onSelectItem }: WebshopShellProps) {
  const cards =
    publisher.offerCards.selected.length > 0
      ? publisher.offerCards.selected
      : publisher.offerCards.generated;

  return (
    <div
      className="h-full flex flex-col overflow-y-auto"
      style={{ background: "var(--bg-primary)" }}
    >
      <HeroSection
        publisherName={publisher.name}
        gameName={publisher.gameName}
        logoSrc={`/img/${publisher.slug}/logo.png`}
      />
      <SectionHeader
        title="Special offers"
        subtitle="Limited time deals just for you"
      />
      {cards.length > 0 ? (
        <OfferCardGrid cards={cards} onSelect={() => onSelectItem?.()} />
      ) : (
        <div className="flex-1 flex items-center justify-center px-4">
          <p
            className="text-sm text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            No offer cards configured yet. Run Claude Code to generate cards, or
            add them in the Builder.
          </p>
        </div>
      )}
      <div className="p-4 mt-auto">
        <button
          onClick={onSelectItem}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-colors"
          style={{
            background: "var(--brand-accent)",
            color: "#FFFFFF",
          }}
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
