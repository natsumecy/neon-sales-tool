export interface Publisher {
  slug: string;
  name: string;
  gameName: string;
  createdAt: string;
  updatedAt: string;

  products: {
    webshop: boolean;
    directCheckout: boolean;
    webCheckout: boolean;
  };

  preview: {
    passwordEnabled: boolean;
    password: string;
  };

  promo: {
    enabled: boolean;
    code: string;
    discountPercent: number;
  };

  simulatedItem: {
    name: string;
    price: string;
    asset: string;
    discountLabel: string;
  };

  freeGift: {
    name: string;
    asset: string;
  };

  offerCards: {
    generated: OfferCard[];
    selected: OfferCard[];
  };

  claudeCode: {
    lastRun: string | null;
    tokensExtracted: boolean;
    cardsGenerated: boolean;
  };
}

export interface OfferCard {
  id: string;
  layout: "horizontal" | "vertical";
  backgroundStyle: "flat" | "gradient" | "textured";
  discountLabel?: string;
  discountBadge?: string;
  itemName: string;
  itemAsset: string;
  price: string;
  selected?: boolean;
  source: "preset" | "generated";
}

export interface TokenConfidence {
  brandAccent?: number;
  textPrimary?: number;
  textSecondary?: number;
  bgPrimary?: number;
  bgSelected?: number;
  bgTextField?: number;
  strokeUnselected?: number;
  strokeItemSummary?: number;
  dropShadowColor?: number;
}

export interface PublisherTokens {
  brandAccent: string;
  textPrimary: string;
  textSecondary: string;
  textDisabledOpacity: number;
  bgPrimary: string;
  bgSelected: string;
  bgTextField: string;
  strokeUnselected: string;
  strokeItemSummary: string;
  statePass: string;
  stateForbidden: string;
  dropShadowBlur: number;
  dropShadowColor: string;
  confidence: TokenConfidence;
  manualOverrides: string[];
  derived?: boolean;
}

export type ItemAsset =
  | "coins"
  | "gems"
  | "hearts"
  | "stars"
  | "crystals"
  | "season-pass"
  | "chest";
