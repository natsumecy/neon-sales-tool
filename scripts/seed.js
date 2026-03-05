const fs = require("fs");
const path = require("path");

const PUBLISHERS_DIR = path.join(__dirname, "..", "publishers");
const IMG_DIR = path.join(__dirname, "..", "public", "img");

function generateCSS(slug, tokens, mode) {
  const selector =
    mode === "light"
      ? `[data-publisher="${slug}"]`
      : `[data-publisher="${slug}"][data-mode="dark"]`;
  return (
    `/* Auto-generated for ${slug} — ${mode} mode */\n\n${selector} {\n` +
    `  --brand-accent: #${tokens.brandAccent};\n` +
    `  --text-primary: #${tokens.textPrimary};\n` +
    `  --text-secondary: #${tokens.textSecondary};\n` +
    `  --text-disabled-opacity: ${(tokens.textDisabledOpacity ?? 30) / 100};\n` +
    `  --bg-primary: #${tokens.bgPrimary};\n` +
    `  --bg-selected: #${tokens.bgSelected};\n` +
    `  --bg-text-field: #${tokens.bgTextField};\n` +
    `  --stroke-unselected: #${tokens.strokeUnselected};\n` +
    `  --stroke-item-summary: #${tokens.strokeItemSummary};\n` +
    `  --state-pass: #${tokens.statePass};\n` +
    `  --state-forbidden: #${tokens.stateForbidden};\n` +
    `  --drop-shadow-blur: ${tokens.dropShadowBlur}px;\n` +
    `  --drop-shadow-color: #${tokens.dropShadowColor};\n` +
    `}\n`
  );
}

function writePublisher(config, lightTokens, darkTokens) {
  const pubDir = path.join(PUBLISHERS_DIR, config.slug);
  const imgPubDir = path.join(IMG_DIR, config.slug);

  fs.mkdirSync(pubDir, { recursive: true });
  fs.mkdirSync(imgPubDir, { recursive: true });

  // config.json
  fs.writeFileSync(
    path.join(pubDir, "config.json"),
    JSON.stringify(config, null, 2)
  );

  // tokens.json
  const tokens = { light: lightTokens, dark: darkTokens };
  fs.writeFileSync(
    path.join(pubDir, "tokens.json"),
    JSON.stringify(tokens, null, 2)
  );

  // CSS files
  fs.writeFileSync(
    path.join(pubDir, "tokens.light.css"),
    generateCSS(config.slug, lightTokens, "light")
  );
  fs.writeFileSync(
    path.join(pubDir, "tokens.dark.css"),
    generateCSS(config.slug, darkTokens, "dark")
  );

  console.log(`  ✓ ${config.slug} (${config.name} — ${config.gameName})`);
}

// ─── Seed Data ──────────────────────────────────────────────────────

const now = new Date().toISOString();

// 1. neon-default — Knights Quest, Neon purple theme
writePublisher(
  {
    slug: "neon-default",
    name: "Neon",
    gameName: "Knights Quest",
    createdAt: now,
    updatedAt: now,
    products: { webshop: true, directCheckout: true, webCheckout: true },
    preview: { passwordEnabled: false, password: "" },
    promo: { enabled: true, code: "DISCOUNT10", discountPercent: 10 },
    simulatedItem: {
      name: "1200 Gems",
      price: "$9.99",
      asset: "gems",
      discountLabel: "15% OFF",
    },
    freeGift: { name: "Bonus Chest x 1", asset: "chest" },
    offerCards: {
      generated: [
        {
          id: "gen-1",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountLabel: "BEST VALUE",
          discountBadge: "+30% MORE",
          itemName: "Royal Bundle + 5000 Gems",
          itemAsset: "gems",
          price: "$49.99",
          source: "generated",
        },
        {
          id: "gen-2",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountBadge: "+20% MORE",
          itemName: "2500 Gems",
          itemAsset: "gems",
          price: "$24.99",
          source: "generated",
        },
        {
          id: "gen-3",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountLabel: "MOST POPULAR",
          discountBadge: "+15% MORE",
          itemName: "1200 Gems",
          itemAsset: "gems",
          price: "$9.99",
          selected: true,
          source: "generated",
        },
        {
          id: "gen-4",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountBadge: "+10% MORE",
          itemName: "500 Gems",
          itemAsset: "gems",
          price: "$4.99",
          source: "generated",
        },
        {
          id: "gen-5",
          layout: "vertical",
          backgroundStyle: "gradient",
          discountLabel: "LIMITED",
          itemName: "Season Pass",
          itemAsset: "season-pass",
          price: "$14.99",
          source: "generated",
        },
      ],
      selected: [
        {
          id: "gen-1",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountLabel: "BEST VALUE",
          discountBadge: "+30% MORE",
          itemName: "Royal Bundle + 5000 Gems",
          itemAsset: "gems",
          price: "$49.99",
          source: "generated",
        },
        {
          id: "gen-2",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountBadge: "+20% MORE",
          itemName: "2500 Gems",
          itemAsset: "gems",
          price: "$24.99",
          source: "generated",
        },
        {
          id: "gen-3",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountLabel: "MOST POPULAR",
          discountBadge: "+15% MORE",
          itemName: "1200 Gems",
          itemAsset: "gems",
          price: "$9.99",
          selected: true,
          source: "generated",
        },
        {
          id: "gen-4",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountBadge: "+10% MORE",
          itemName: "500 Gems",
          itemAsset: "gems",
          price: "$4.99",
          source: "generated",
        },
        {
          id: "gen-5",
          layout: "vertical",
          backgroundStyle: "gradient",
          discountLabel: "LIMITED",
          itemName: "Season Pass",
          itemAsset: "season-pass",
          price: "$14.99",
          source: "generated",
        },
      ],
    },
    claudeCode: {
      lastRun: now,
      tokensExtracted: true,
      cardsGenerated: true,
    },
  },
  {
    brandAccent: "7C3AED",
    textPrimary: "18181B",
    textSecondary: "71717A",
    textDisabledOpacity: 30,
    bgPrimary: "FFFFFF",
    bgSelected: "F3F0FF",
    bgTextField: "F4F4F5",
    strokeUnselected: "E4E4E7",
    strokeItemSummary: "7C3AED",
    statePass: "00B937",
    stateForbidden: "FF1717",
    dropShadowBlur: 16,
    dropShadowColor: "E4E4E7",
    confidence: {
      brandAccent: 0.95,
      textPrimary: 0.95,
      textSecondary: 0.85,
      bgPrimary: 0.95,
      bgSelected: 0.8,
      bgTextField: 0.7,
      strokeUnselected: 0.7,
      strokeItemSummary: 0.6,
      dropShadowColor: 0.5,
    },
    manualOverrides: [],
  },
  {
    brandAccent: "7C3AED",
    textPrimary: "FAFAFA",
    textSecondary: "A1A1AA",
    textDisabledOpacity: 30,
    bgPrimary: "09090B",
    bgSelected: "1E1B2E",
    bgTextField: "27272A",
    strokeUnselected: "3F3F46",
    strokeItemSummary: "7C3AED",
    statePass: "00B937",
    stateForbidden: "FF1717",
    dropShadowBlur: 16,
    dropShadowColor: "27272A",
    confidence: {},
    manualOverrides: [],
    derived: true,
  }
);

// 2. krafton — Battlegrounds Mobile, indigo theme
writePublisher(
  {
    slug: "krafton",
    name: "KRAFTON",
    gameName: "Battlegrounds Mobile",
    createdAt: now,
    updatedAt: now,
    products: { webshop: true, directCheckout: true, webCheckout: true },
    preview: { passwordEnabled: false, password: "" },
    promo: { enabled: false, code: "", discountPercent: 0 },
    simulatedItem: {
      name: "950 UC",
      price: "$9.49",
      asset: "coins",
      discountLabel: "10% OFF",
    },
    freeGift: { name: "Free Crate x 2", asset: "chest" },
    offerCards: {
      generated: [
        {
          id: "k-1",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountLabel: "BEST VALUE",
          discountBadge: "+25% MORE",
          itemName: "Elite Pass + 4800 UC",
          itemAsset: "coins",
          price: "$44.99",
          source: "generated",
        },
        {
          id: "k-2",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountBadge: "+20% MORE",
          itemName: "1800 UC",
          itemAsset: "coins",
          price: "$18.49",
          source: "generated",
        },
        {
          id: "k-3",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountLabel: "MOST POPULAR",
          discountBadge: "+15% MORE",
          itemName: "950 UC",
          itemAsset: "coins",
          price: "$9.49",
          selected: true,
          source: "generated",
        },
        {
          id: "k-4",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountBadge: "+10% MORE",
          itemName: "420 UC",
          itemAsset: "coins",
          price: "$4.79",
          source: "generated",
        },
        {
          id: "k-5",
          layout: "horizontal",
          backgroundStyle: "flat",
          itemName: "180 UC",
          itemAsset: "coins",
          price: "$1.99",
          source: "generated",
        },
      ],
      selected: [
        {
          id: "k-1",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountLabel: "BEST VALUE",
          discountBadge: "+25% MORE",
          itemName: "Elite Pass + 4800 UC",
          itemAsset: "coins",
          price: "$44.99",
          source: "generated",
        },
        {
          id: "k-2",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountBadge: "+20% MORE",
          itemName: "1800 UC",
          itemAsset: "coins",
          price: "$18.49",
          source: "generated",
        },
        {
          id: "k-3",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountLabel: "MOST POPULAR",
          discountBadge: "+15% MORE",
          itemName: "950 UC",
          itemAsset: "coins",
          price: "$9.49",
          selected: true,
          source: "generated",
        },
        {
          id: "k-4",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountBadge: "+10% MORE",
          itemName: "420 UC",
          itemAsset: "coins",
          price: "$4.79",
          source: "generated",
        },
        {
          id: "k-5",
          layout: "horizontal",
          backgroundStyle: "flat",
          itemName: "180 UC",
          itemAsset: "coins",
          price: "$1.99",
          source: "generated",
        },
      ],
    },
    claudeCode: {
      lastRun: now,
      tokensExtracted: true,
      cardsGenerated: true,
    },
  },
  {
    brandAccent: "6366F1",
    textPrimary: "15171E",
    textSecondary: "6E727E",
    textDisabledOpacity: 30,
    bgPrimary: "FFFFFF",
    bgSelected: "EFF0FE",
    bgTextField: "F3F5F7",
    strokeUnselected: "D4D4D4",
    strokeItemSummary: "6366F1",
    statePass: "00B937",
    stateForbidden: "FF1717",
    dropShadowBlur: 16,
    dropShadowColor: "E5E5E5",
    confidence: {
      brandAccent: 0.95,
      textPrimary: 0.9,
      textSecondary: 0.8,
      bgPrimary: 0.95,
      bgSelected: 0.7,
      bgTextField: 0.6,
      strokeUnselected: 0.55,
      strokeItemSummary: 0.5,
      dropShadowColor: 0.4,
    },
    manualOverrides: [],
  },
  {
    brandAccent: "6366F1",
    textPrimary: "F5F5F5",
    textSecondary: "E5E5E5",
    textDisabledOpacity: 30,
    bgPrimary: "0D0D0D",
    bgSelected: "1A1A2E",
    bgTextField: "252525",
    strokeUnselected: "737373",
    strokeItemSummary: "6366F1",
    statePass: "00B937",
    stateForbidden: "FF1717",
    dropShadowBlur: 16,
    dropShadowColor: "404040",
    confidence: {},
    manualOverrides: [],
    derived: true,
  }
);

// 3. tfew — The Final Earth War, gold on dark navy theme
writePublisher(
  {
    slug: "tfew",
    name: "TFEW Studios",
    gameName: "The Final Earth War",
    createdAt: now,
    updatedAt: now,
    products: { webshop: true, directCheckout: true, webCheckout: false },
    preview: { passwordEnabled: true, password: "tfew2025" },
    promo: { enabled: false, code: "", discountPercent: 0 },
    simulatedItem: {
      name: "500 Crystals",
      price: "$7.99",
      asset: "crystals",
      discountLabel: "20% OFF",
    },
    freeGift: { name: "Rare Star x 3", asset: "stars" },
    offerCards: {
      generated: [
        {
          id: "t-1",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountLabel: "BEST VALUE",
          discountBadge: "+35% MORE",
          itemName: "Commander Pack + 2500 Crystals",
          itemAsset: "crystals",
          price: "$39.99",
          source: "generated",
        },
        {
          id: "t-2",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountBadge: "+20% MORE",
          itemName: "1000 Crystals",
          itemAsset: "crystals",
          price: "$14.99",
          source: "generated",
        },
        {
          id: "t-3",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountLabel: "MOST POPULAR",
          discountBadge: "+15% MORE",
          itemName: "500 Crystals",
          itemAsset: "crystals",
          price: "$7.99",
          selected: true,
          source: "generated",
        },
        {
          id: "t-4",
          layout: "horizontal",
          backgroundStyle: "flat",
          itemName: "200 Crystals",
          itemAsset: "crystals",
          price: "$2.99",
          source: "generated",
        },
        {
          id: "t-5",
          layout: "vertical",
          backgroundStyle: "gradient",
          discountLabel: "EXCLUSIVE",
          itemName: "War Season Pass",
          itemAsset: "season-pass",
          price: "$19.99",
          source: "generated",
        },
      ],
      selected: [
        {
          id: "t-1",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountLabel: "BEST VALUE",
          discountBadge: "+35% MORE",
          itemName: "Commander Pack + 2500 Crystals",
          itemAsset: "crystals",
          price: "$39.99",
          source: "generated",
        },
        {
          id: "t-2",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountBadge: "+20% MORE",
          itemName: "1000 Crystals",
          itemAsset: "crystals",
          price: "$14.99",
          source: "generated",
        },
        {
          id: "t-3",
          layout: "horizontal",
          backgroundStyle: "flat",
          discountLabel: "MOST POPULAR",
          discountBadge: "+15% MORE",
          itemName: "500 Crystals",
          itemAsset: "crystals",
          price: "$7.99",
          selected: true,
          source: "generated",
        },
        {
          id: "t-4",
          layout: "horizontal",
          backgroundStyle: "flat",
          itemName: "200 Crystals",
          itemAsset: "crystals",
          price: "$2.99",
          source: "generated",
        },
        {
          id: "t-5",
          layout: "vertical",
          backgroundStyle: "gradient",
          discountLabel: "EXCLUSIVE",
          itemName: "War Season Pass",
          itemAsset: "season-pass",
          price: "$19.99",
          source: "generated",
        },
      ],
    },
    claudeCode: {
      lastRun: now,
      tokensExtracted: true,
      cardsGenerated: true,
    },
  },
  {
    brandAccent: "D4A017",
    textPrimary: "F0E6D2",
    textSecondary: "A89B7E",
    textDisabledOpacity: 30,
    bgPrimary: "0A1628",
    bgSelected: "122240",
    bgTextField: "1A2D4A",
    strokeUnselected: "2A3F5F",
    strokeItemSummary: "D4A017",
    statePass: "00B937",
    stateForbidden: "FF1717",
    dropShadowBlur: 16,
    dropShadowColor: "05101E",
    confidence: {
      brandAccent: 0.9,
      textPrimary: 0.85,
      textSecondary: 0.75,
      bgPrimary: 0.9,
      bgSelected: 0.65,
      bgTextField: 0.6,
      strokeUnselected: 0.5,
      strokeItemSummary: 0.55,
      dropShadowColor: 0.4,
    },
    manualOverrides: [],
  },
  {
    brandAccent: "D4A017",
    textPrimary: "F5F5F5",
    textSecondary: "B8B8B8",
    textDisabledOpacity: 30,
    bgPrimary: "050D18",
    bgSelected: "0C1A30",
    bgTextField: "112240",
    strokeUnselected: "1E3050",
    strokeItemSummary: "D4A017",
    statePass: "00B937",
    stateForbidden: "FF1717",
    dropShadowBlur: 16,
    dropShadowColor: "020810",
    confidence: {},
    manualOverrides: [],
    derived: true,
  }
);

console.log("\nSeed complete! Run `npm run dev` and visit:");
console.log("  http://localhost:3000");
console.log("  http://localhost:3000/demo/neon-default");
console.log("  http://localhost:3000/demo/krafton");
console.log("  http://localhost:3000/demo/tfew (password: tfew2025)");
