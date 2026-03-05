# Neon Demo Tool — V1 File-Based Architecture

## Core Principle

No database. No API routes. No auth. Everything is files.
Claude Code reads screenshots, writes config files, CSS files, and component files.
The app runs in Next.js dev mode locally. Hot reload shows changes instantly.

---

## How It Works

1. Designer drops publisher assets into `public/img/[publisher-slug]/`
2. Designer opens the app, creates a publisher via a simple form (writes a JSON config file)
3. Designer copies the Claude Code prompt from the UI
4. Designer pastes it into Claude Code
5. Claude Code reads the screenshots, extracts tokens, writes CSS + config files
6. App hot-reloads, publisher demo is live at `/demo/[publisher-slug]`
7. Designer screen-records or shares the localhost URL over a screen share

---

## Tech Stack

- **Framework**: Next.js 15 App Router — Vercel v0 default template
- **UI**: shadcn/ui
- **Styling**: Tailwind CSS v4 + per-publisher CSS files
- **No database** — all data in JSON files
- **No auth** — runs locally, internal only
- **No API routes** — all reads/writes via filesystem
- **Server Actions** — used for any file write operations from the UI

---

## File Structure

```
/
├── app/
│   ├── page.tsx                          # Dashboard — lists all publishers
│   ├── publishers/
│   │   └── new/
│   │       └── page.tsx                  # New publisher form
│   ├── builder/
│   │   └── [slug]/
│   │       └── page.tsx                  # Builder UI for a publisher
│   └── demo/
│       └── [slug]/
│           └── page.tsx                  # The demo viewer (what sales reps record)
│
├── components/
│   ├── ui/                               # shadcn/ui
│   ├── builder/
│   │   ├── PublisherForm.tsx
│   │   ├── TokenTable.tsx
│   │   ├── TokenOverridePanel.tsx
│   │   ├── ProductSelector.tsx
│   │   ├── OfferCardPicker.tsx
│   │   ├── PromoCodeConfig.tsx
│   │   └── ClaudePromptPanel.tsx
│   ├── demo/
│   │   ├── DemoShell.tsx
│   │   ├── PhoneFrame.tsx
│   │   ├── DeviceFrameSwitcher.tsx
│   │   ├── ThemeModeSwitcher.tsx
│   │   └── ProductTabSwitcher.tsx
│   ├── webshop/
│   │   ├── WebshopShell.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── OfferCardGrid.tsx
│   │   └── OfferCard.tsx
│   └── checkout/
│       ├── CheckoutShell.tsx
│       ├── OrderSummary.tsx
│       ├── PromoCode.tsx
│       ├── PaymentMethodSelector.tsx
│       ├── ApplePaySheet.tsx
│       ├── CardPaymentSheet.tsx
│       ├── ProcessingState.tsx
│       ├── SuccessModal.tsx
│       ├── InGameSuccessOverlay.tsx
│       ├── PurchaseChoiceModal.tsx
│       ├── BrowserTransition.tsx
│       └── DirectCheckoutDrawer.tsx
│
├── hooks/
│   └── useDemoFlow.ts
│
├── lib/
│   ├── publishers.ts                     # Read/write publisher JSON files
│   ├── tokens.ts                         # Token helpers
│   ├── presets.ts                        # Preset offer card templates
│   └── files.ts                          # File path helpers
│
├── publishers/                           # ALL PUBLISHER DATA LIVES HERE
│   └── [publisher-slug]/
│       ├── config.json                   # Publisher config
│       ├── tokens.light.css              # Light mode CSS variables
│       ├── tokens.dark.css               # Dark mode CSS variables
│       └── tokens.json                   # Token values (for UI display + overrides)
│
├── public/
│   ├── img/
│   │   └── [publisher-slug]/
│   │       ├── screenshot-light.png
│   │       ├── screenshot-dark.png       # Optional
│   │       └── logo.png
│   └── assets/
│       └── items/
│           ├── coins.png
│           ├── gems.png
│           ├── hearts.png
│           ├── stars.png
│           ├── crystals.png
│           ├── season-pass.png
│           └── chest.png
│
├── types/
│   └── publisher.ts
│
└── CLAUDE.md
```

---

## Data Files — Per Publisher

### `publishers/[slug]/config.json`

This is the single source of truth for a publisher.
Claude Code writes this file. The UI also reads and writes this file.

```json
{
  "slug": "krafton",
  "name": "KRAFTON",
  "gameName": "Battlegrounds Mobile",
  "createdAt": "2025-03-01T00:00:00Z",
  "updatedAt": "2025-03-01T00:00:00Z",

  "products": {
    "webshop": true,
    "directCheckout": true,
    "webCheckout": true
  },

  "preview": {
    "passwordEnabled": false,
    "password": ""
  },

  "promo": {
    "enabled": false,
    "code": "",
    "discountPercent": 0
  },

  "simulatedItem": {
    "name": "950 Coins",
    "price": "$9.49",
    "asset": "coins",
    "discountLabel": "10% OFF"
  },

  "freeGift": {
    "name": "Free Bonus x 2",
    "asset": "gems"
  },

  "offerCards": {
    "generated": [],
    "selected": [
      {
        "id": "1",
        "layout": "horizontal",
        "backgroundStyle": "flat",
        "discountLabel": "BEST VALUE",
        "discountBadge": "+25% MORE",
        "itemName": "Lifetime + 5200 Coins",
        "itemAsset": "coins",
        "price": "$44.99",
        "source": "preset"
      }
    ]
  },

  "claudeCode": {
    "lastRun": null,
    "tokensExtracted": false,
    "cardsGenerated": false
  }
}
```

---

### `publishers/[slug]/tokens.json`

Written by Claude Code. Read by the UI to display the token table.
The UI can write overrides back to this file via server action.

```json
{
  "light": {
    "brandAccent": "6366F1",
    "textPrimary": "15171E",
    "textSecondary": "6E727E",
    "textDisabledOpacity": 30,
    "bgPrimary": "FFFFFF",
    "bgSelected": "EFF0FE",
    "bgTextField": "F3F5F7",
    "strokeUnselected": "D4D4D4",
    "strokeItemSummary": "6366F1",
    "statePass": "00B937",
    "stateForbidden": "FF1717",
    "dropShadowBlur": 16,
    "dropShadowColor": "E5E5E5",
    "confidence": {
      "brandAccent": 0.95,
      "textPrimary": 0.90,
      "textSecondary": 0.80,
      "bgPrimary": 0.95,
      "bgSelected": 0.70,
      "bgTextField": 0.60,
      "strokeUnselected": 0.55,
      "strokeItemSummary": 0.50,
      "dropShadowColor": 0.40
    },
    "manualOverrides": []
  },
  "dark": {
    "brandAccent": "6366F1",
    "textPrimary": "F5F5F5",
    "textSecondary": "E5E5E5",
    "textDisabledOpacity": 30,
    "bgPrimary": "0D0D0D",
    "bgSelected": "1A1A2E",
    "bgTextField": "252525",
    "strokeUnselected": "737373",
    "strokeItemSummary": "6366F1",
    "statePass": "00B937",
    "stateForbidden": "FF1717",
    "dropShadowBlur": 16,
    "dropShadowColor": "404040",
    "confidence": {},
    "manualOverrides": [],
    "derived": true
  }
}
```

---

### `publishers/[slug]/tokens.light.css`

Written by Claude Code. Imported directly in the demo page for that publisher.

```css
/* Auto-generated by Claude Code for KRAFTON */
/* Last updated: 2025-03-01 */

[data-publisher="krafton"] {
  --brand-accent: #6366F1;
  --text-primary: #15171E;
  --text-secondary: #6E727E;
  --text-disabled-opacity: 0.30;
  --bg-primary: #FFFFFF;
  --bg-selected: #EFF0FE;
  --bg-text-field: #F3F5F7;
  --stroke-unselected: #D4D4D4;
  --stroke-item-summary: #6366F1;
  --state-pass: #00B937;
  --state-forbidden: #FF1717;
  --drop-shadow-blur: 16px;
  --drop-shadow-color: #E5E5E5;
}
```

### `publishers/[slug]/tokens.dark.css`

```css
/* Auto-generated by Claude Code for KRAFTON — dark mode */

[data-publisher="krafton"][data-mode="dark"] {
  --brand-accent: #6366F1;
  --text-primary: #F5F5F5;
  --text-secondary: #E5E5E5;
  --text-disabled-opacity: 0.30;
  --bg-primary: #0D0D0D;
  --bg-selected: #1A1A2E;
  --bg-text-field: #252525;
  --stroke-unselected: #737373;
  --stroke-item-summary: #6366F1;
  --state-pass: #00B937;
  --state-forbidden: #FF1717;
  --drop-shadow-blur: 16px;
  --drop-shadow-color: #404040;
}
```

---

## `lib/publishers.ts` — File Read/Write Helpers

```typescript
import fs from "fs";
import path from "path";
import { Publisher, PublisherTokens } from "@/types/publisher";

const PUBLISHERS_DIR = path.join(process.cwd(), "publishers");

export function getPublisherSlugs(): string[] {
  if (!fs.existsSync(PUBLISHERS_DIR)) return [];
  return fs.readdirSync(PUBLISHERS_DIR).filter((f) =>
    fs.statSync(path.join(PUBLISHERS_DIR, f)).isDirectory()
  );
}

export function getPublisher(slug: string): Publisher | null {
  const configPath = path.join(PUBLISHERS_DIR, slug, "config.json");
  if (!fs.existsSync(configPath)) return null;
  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}

export function getAllPublishers(): Publisher[] {
  return getPublisherSlugs()
    .map((slug) => getPublisher(slug))
    .filter(Boolean) as Publisher[];
}

export function savePublisher(publisher: Publisher): void {
  const dir = path.join(PUBLISHERS_DIR, publisher.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "config.json"),
    JSON.stringify(publisher, null, 2)
  );
}

export function getTokens(slug: string): { light: PublisherTokens; dark: PublisherTokens } | null {
  const tokensPath = path.join(PUBLISHERS_DIR, slug, "tokens.json");
  if (!fs.existsSync(tokensPath)) return null;
  return JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
}

export function saveTokens(
  slug: string,
  tokens: { light: PublisherTokens; dark: PublisherTokens }
): void {
  const dir = path.join(PUBLISHERS_DIR, slug);
  fs.mkdirSync(dir, { recursive: true });
  // Write tokens.json
  fs.writeFileSync(path.join(dir, "tokens.json"), JSON.stringify(tokens, null, 2));
  // Write CSS files
  fs.writeFileSync(path.join(dir, "tokens.light.css"), generateCSS(slug, tokens.light, "light"));
  fs.writeFileSync(path.join(dir, "tokens.dark.css"), generateCSS(slug, tokens.dark, "dark"));
}

function generateCSS(slug: string, tokens: PublisherTokens, mode: "light" | "dark"): string {
  const selector = mode === "light"
    ? `[data-publisher="${slug}"]`
    : `[data-publisher="${slug}"][data-mode="dark"]`;
  return `/* Auto-generated for ${slug} — ${mode} mode */\n\n${selector} {\n` +
    `  --brand-accent: #${tokens.brandAccent};\n` +
    `  --text-primary: #${tokens.textPrimary};\n` +
    `  --text-secondary: #${tokens.textSecondary};\n` +
    `  --bg-primary: #${tokens.bgPrimary};\n` +
    `  --bg-selected: #${tokens.bgSelected};\n` +
    `  --bg-text-field: #${tokens.bgTextField};\n` +
    `  --stroke-unselected: #${tokens.strokeUnselected};\n` +
    `  --stroke-item-summary: #${tokens.strokeItemSummary};\n` +
    `  --state-pass: #${tokens.statePass};\n` +
    `  --state-forbidden: #${tokens.stateForbidden};\n` +
    `  --drop-shadow-blur: ${tokens.dropShadowBlur}px;\n` +
    `  --drop-shadow-color: #${tokens.dropShadowColor};\n` +
    `}\n`;
}
```

---

## `lib/files.ts` — Path Helpers

```typescript
export function publisherDir(slug: string) {
  return `publishers/${slug}`;
}

export function publisherImgDir(slug: string) {
  return `public/img/${slug}`;
}

export function screenshotLightPath(slug: string) {
  return `public/img/${slug}/screenshot-light.png`;
}

export function screenshotDarkPath(slug: string) {
  return `public/img/${slug}/screenshot-dark.png`;
}

export function logoPath(slug: string) {
  return `public/img/${slug}/logo.png`;
}

export function configPath(slug: string) {
  return `publishers/${slug}/config.json`;
}

export function tokensJsonPath(slug: string) {
  return `publishers/${slug}/tokens.json`;
}

export function tokensLightCSSPath(slug: string) {
  return `publishers/${slug}/tokens.light.css`;
}

export function tokensDarkCSSPath(slug: string) {
  return `publishers/${slug}/tokens.dark.css`;
}
```

---

## Pages

### `/` — Dashboard

Reads all `publishers/*/config.json` files at build/request time via `getAllPublishers()`.
Renders a grid of publisher cards. Each card shows:
- Logo (`/img/[slug]/logo.png`)
- Publisher name + game name
- Enabled product badges (Webshop / Direct / Web)
- "Builder" link + "Demo" link
- Last updated timestamp

### `/publishers/new` — New Publisher Form

Simple form. On submit, runs a server action that:
1. Creates `publishers/[slug]/` directory
2. Writes `config.json` with defaults
3. Creates `public/img/[slug]/` directory
4. Redirects to `/builder/[slug]`

No asset upload in this form. Designer manually drops files into
`public/img/[slug]/` before running Claude Code.

### `/builder/[slug]` — Builder

Reads `publishers/[slug]/config.json` and `publishers/[slug]/tokens.json`.

Left sidebar tabs:
- **Overview** — name, game, slug, asset file status (shows green/red whether screenshot-light.png, screenshot-dark.png, logo.png exist in `public/img/[slug]/`)
- **Tokens** — shows token table from `tokens.json`. Confidence dots per token. "Manually override" inline edit per row. Save writes back to `tokens.json` + regenerates CSS files via server action.
- **Products** — toggles + simulated item + free gift + offer card picker
- **Promo** — toggle, code, percent
- **Claude Code** — shows initiation prompt, copy button, asset checklist (are files in place?), last run info

Live preview of the demo in the main area.
Device / mode / product tab switchers at top.
"Open Demo" button → `/demo/[slug]` in new tab.

### `/demo/[slug]` — Demo Viewer

This is what sales reps screen-record and what prospects receive.

On load:
- Reads `publishers/[slug]/config.json`
- Dynamically imports `publishers/[slug]/tokens.light.css` and `publishers/[slug]/tokens.dark.css`
- Renders `DemoShell` with publisher data

`DemoShell` structure:
```
┌─────────────────────────────────────────┐
│  [Neon Logo — prominent, above frame]   │
│                                         │
│  [Webshop | Direct Checkout | Web Checkout] ← product tabs (only enabled ones)
│                                         │
│         ┌──────────────┐               │
│         │  PhoneFrame  │               │
│         │              │               │
│         └──────────────┘               │
│                                         │
│     [iPhone | Android]  [Light | Dark]  │  ← floating bottom bar
└─────────────────────────────────────────┘
```

`?record=true` hides Neon logo, tabs, and switchers. Phone frame only.

---

## CSS Loading in Demo Page

```typescript
// app/demo/[slug]/page.tsx

import { getPublisher } from "@/lib/publishers";
import { DemoShell } from "@/components/demo/DemoShell";

// Dynamically import publisher CSS
// Next.js will bundle these as static assets since they live in /publishers/
export default async function DemoPage({ params }: { params: { slug: string } }) {
  const publisher = getPublisher(params.slug);
  if (!publisher) notFound();

  return (
    <>
      {/* Inject publisher CSS variables */}
      <style>{`
        @import url('/publisher-css/${params.slug}/tokens.light.css');
        @import url('/publisher-css/${params.slug}/tokens.dark.css');
      `}</style>
      <DemoShell publisher={publisher} />
    </>
  );
}
```

Since CSS files are in `/publishers/[slug]/` (not `/public/`), serve them via a
Next.js route handler:

```typescript
// app/publisher-css/[slug]/[file]/route.ts

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string; file: string } }
) {
  const filePath = path.join(process.cwd(), "publishers", params.slug, params.file);
  if (!fs.existsSync(filePath)) {
    return new NextResponse("", { status: 404 });
  }
  const css = fs.readFileSync(filePath, "utf-8");
  return new NextResponse(css, {
    headers: { "Content-Type": "text/css" },
  });
}
```

---

## Demo Component — Token Application

The `PhoneFrame` root element gets `data-publisher` and `data-mode` attributes.
All checkout/webshop components use CSS variables. No props needed.

```tsx
// components/demo/PhoneFrame.tsx
<div
  data-publisher={publisher.slug}
  data-mode={mode}  // "light" | "dark" — toggled by ThemeModeSwitcher
  className="relative overflow-hidden"
  style={{ width: 375, height: 812, borderRadius: 44 }}
>
  {children}
</div>
```

Usage in any component:
```tsx
<div className="bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--stroke-unselected)]">
```

---

## Demo State Machine — `hooks/useDemoFlow.ts`

```typescript
export type DemoState =
  | "game"
  | "choice-modal"
  | "direct-drawer-open"
  | "apple-pay-sheet"
  | "card-payment-sheet"
  | "processing"
  | "checkout-success"
  | "in-game-success"
  | "browser-transition"
  | "web-checkout"
  | "browser-reverse-transition";

export type DemoProduct = "webshop" | "direct-checkout" | "web-checkout";

export function useDemoFlow(product: DemoProduct) {
  const [state, setState] = useState<DemoState>("game");

  const tap = () => {
    if (state === "game") setState("choice-modal");
  };

  const chooseWeb = () => {
    setState(product === "direct-checkout" ? "direct-drawer-open" : "browser-transition");
  };

  const chooseIAP = () => setState("game");

  const tapApplePay = () => setState("apple-pay-sheet");
  const tapCard = () => setState("card-payment-sheet");
  const confirmPay = () => {
    setState("processing");
    setTimeout(() => setState("checkout-success"), 1500);
  };
  const backToGame = () => {
    if (product === "web-checkout") {
      setState("browser-reverse-transition");
      setTimeout(() => setState("in-game-success"), 800);
    } else {
      setState("in-game-success");
    }
  };

  // Auto-advance browser transition
  useEffect(() => {
    if (state === "browser-transition") {
      const t = setTimeout(() => setState("web-checkout"), 1800);
      return () => clearTimeout(t);
    }
  }, [state]);

  // Auto-reset after in-game success
  useEffect(() => {
    if (state === "in-game-success") {
      const t = setTimeout(() => setState("game"), 2000);
      return () => clearTimeout(t);
    }
  }, [state]);

  return { state, tap, chooseWeb, chooseIAP, tapApplePay, tapCard, confirmPay, backToGame };
}
```

---

## CLAUDE.md

```markdown
# Neon Demo Tool — Claude Code Instructions

## What This Is
A file-based Next.js app. No database. No API. Everything is files.
When you create a mockup for a publisher, you read their screenshots and write
config files, CSS files, and JSON files. The app hot-reloads automatically.

## File Locations

Publisher data:        publishers/[slug]/
Publisher images:      public/img/[slug]/
Generic item assets:   public/assets/items/

## When Asked to Create a Mockup for [Publisher Name]

### Step 0 — Check assets exist
Confirm these files exist before doing anything:
  public/img/[publisher-slug]/screenshot-light.png   (required)
  public/img/[publisher-slug]/logo.png               (required)
  public/img/[publisher-slug]/screenshot-dark.png    (optional)

If required files are missing, stop and tell the designer which files to add.

### Step 1 — Read the screenshot
Analyze public/img/[publisher-slug]/screenshot-light.png.
Extract the following color tokens (all values: 6-digit hex, no #):

  brandAccent        Primary interactive/brand color. Buttons, CTAs, price tags,
                     selected states, highlights. Not white or black.
  textPrimary        Main readable text. Near-black in light mode.
  textSecondary      Muted/secondary text. Usually gray.
  bgPrimary          Main screen/page background.
  bgSelected         Card or selected item background. Slightly offset from bgPrimary.
  bgTextField        Input field background.
  strokeUnselected   Border color for unselected cards/inputs.
  strokeItemSummary  Accent border for highlighted cards. Often brandAccent at low
                     opacity — compute the resulting solid hex.
  dropShadowColor    Shadow color for elevated elements.

Also score confidence 0.0–1.0 per token. Be honest about uncertainty.

### Step 2 — Derive or extract dark tokens
If public/img/[publisher-slug]/screenshot-dark.png exists: extract same schema.
If not, derive dark tokens from light:
  bgPrimary         → darken heavily (target ~#0D0D0D to #1A1A1A range)
  bgSelected        → dark but slightly lighter than bgPrimary
  bgTextField       → slightly lighter than bgSelected
  textPrimary       → near-white (~#F5F5F5)
  textSecondary     → light gray (~#E5E5E5)
  brandAccent       → keep same as light
  strokeUnselected  → medium gray (~#737373)
  strokeItemSummary → brandAccent blended on dark bg — compute hex
  dropShadowColor   → dark gray (~#404040)
Set "derived": true in the dark token object.

### Step 3 — Analyze screenshot for offer cards
Look at the screenshot and determine:
  - What items are being sold (coins, gems, season pass, chest, etc.)
  - Approximate price tier (cheap/mid/premium)
  - Bundle naming pattern (if visible)
  - Visual style: casual/bright, dark/moody, fantasy, sci-fi, etc.

Generate 5 offer card configs that fit the game's item types and style.
Use itemAsset from: coins | gems | hearts | stars | crystals | season-pass | chest
Pick the best match. Adjust names and prices to feel authentic to this game.
Set "source": "generated" on all cards.

### Step 4 — Write files

Write publishers/[slug]/tokens.json:
{
  "light": { ...lightTokens, "confidence": {...}, "manualOverrides": [] },
  "dark": { ...darkTokens, "confidence": {}, "manualOverrides": [], "derived": true }
}

Write publishers/[slug]/tokens.light.css:
[data-publisher="[slug]"] {
  --brand-accent: #[brandAccent];
  --text-primary: #[textPrimary];
  --text-secondary: #[textSecondary];
  --bg-primary: #[bgPrimary];
  --bg-selected: #[bgSelected];
  --bg-text-field: #[bgTextField];
  --stroke-unselected: #[strokeUnselected];
  --stroke-item-summary: #[strokeItemSummary];
  --state-pass: #00B937;
  --state-forbidden: #FF1717;
  --drop-shadow-blur: 16px;
  --drop-shadow-color: #[dropShadowColor];
}

Write publishers/[slug]/tokens.dark.css:
[data-publisher="[slug]"][data-mode="dark"] {
  (same properties, dark values)
}

Update publishers/[slug]/config.json:
  - Set offerCards.generated to your 5 generated cards
  - Set offerCards.selected to the same 5 generated cards (default selection)
  - Set claudeCode.lastRun to current ISO timestamp
  - Set claudeCode.tokensExtracted to true
  - Set claudeCode.cardsGenerated to true

### Step 5 — Confirm

Report:
  - All extracted light token values with confidence scores
  - Any tokens with confidence < 0.5 (flag for manual review)
  - Whether dark tokens were extracted or derived
  - The 5 generated offer card configs
  - Where to view: open localhost:3000/demo/[slug] in browser

## Rules
- Never modify another publisher's files
- Never change anything in /components/, /app/, /hooks/, /lib/, or /types/
- Never modify CLAUDE.md
- Only write to publishers/[slug]/ folder
- If a required asset file is missing, stop and ask — do not proceed
- Do not invent colors. If unsure, set neutral fallback and confidence 0.
```

---

## Initiation Prompt Template

Shown in the Claude Code panel in the builder. Copy-paste into Claude Code.

```
Create a mockup for [Publisher Name] ([Game Name]).

Assets are in public/img/[publisher-slug]/.
Read CLAUDE.md for full instructions, then:
1. Check required assets exist
2. Extract color tokens from screenshot-light.png
3. Derive or extract dark mode tokens
4. Generate 5 offer card configs matching the game's style
5. Write tokens.json, tokens.light.css, tokens.dark.css, update config.json
6. Report token values, confidence flags, and generated cards

View at: localhost:3000/demo/[publisher-slug]
```

---

## Server Actions (UI → File Writes)

These replace API routes for UI-driven file writes.

```typescript
// app/actions/publishers.ts
"use server";

import { savePublisher, saveTokens, getPublisher } from "@/lib/publishers";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

// Create new publisher (from /publishers/new form)
export async function createPublisher(formData: FormData) {
  const slug = formData.get("slug") as string;
  const name = formData.get("name") as string;
  const gameName = formData.get("gameName") as string;

  // Create directories
  fs.mkdirSync(path.join(process.cwd(), "publishers", slug), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), "public", "img", slug), { recursive: true });

  // Write default config
  savePublisher({
    slug, name, gameName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    products: { webshop: true, directCheckout: true, webCheckout: true },
    preview: { passwordEnabled: false, password: "" },
    promo: { enabled: false, code: "", discountPercent: 0 },
    simulatedItem: { name: "950 Coins", price: "$9.49", asset: "coins", discountLabel: "10% OFF" },
    freeGift: { name: "Free Bonus x 2", asset: "gems" },
    offerCards: { generated: [], selected: [] },
    claudeCode: { lastRun: null, tokensExtracted: false, cardsGenerated: false },
  });

  revalidatePath("/");
  redirect(`/builder/${slug}`);
}

// Save token override from UI
export async function overrideToken(
  slug: string,
  mode: "light" | "dark",
  tokenKey: string,
  value: string
) {
  const tokensPath = path.join(process.cwd(), "publishers", slug, "tokens.json");
  const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
  tokens[mode][tokenKey] = value;
  if (!tokens[mode].manualOverrides.includes(tokenKey)) {
    tokens[mode].manualOverrides.push(tokenKey);
  }
  fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2));

  // Regenerate CSS
  const { saveTokens } = await import("@/lib/publishers");
  saveTokens(slug, tokens);

  revalidatePath(`/builder/${slug}`);
  revalidatePath(`/demo/${slug}`);
}

// Save config changes from builder UI
export async function updatePublisherConfig(slug: string, updates: Partial<Publisher>) {
  const publisher = getPublisher(slug);
  if (!publisher) throw new Error("Publisher not found");
  savePublisher({ ...publisher, ...updates, updatedAt: new Date().toISOString() });
  revalidatePath(`/builder/${slug}`);
  revalidatePath(`/demo/${slug}`);
}
```

---

## Preset Offer Cards

```typescript
// lib/presets.ts

export const PRESET_OFFER_CARDS = [
  { id: "preset-1", layout: "horizontal", backgroundStyle: "flat",
    discountLabel: "BEST VALUE", discountBadge: "+25% MORE",
    itemName: "Lifetime + 5200 Coins", itemAsset: "coins", price: "$44.99", source: "preset" },
  { id: "preset-2", layout: "horizontal", backgroundStyle: "flat",
    discountBadge: "+20% MORE",
    itemName: "Lifetime + 2000 Coins", itemAsset: "coins", price: "$18.49", source: "preset" },
  { id: "preset-3", layout: "horizontal", backgroundStyle: "flat",
    discountLabel: "MOST POPULAR", discountBadge: "+15% MORE",
    itemName: "950 Coins", itemAsset: "coins", price: "$9.49", selected: true, source: "preset" },
  { id: "preset-4", layout: "horizontal", backgroundStyle: "flat",
    discountBadge: "+10% MORE",
    itemName: "460 Coins", itemAsset: "coins", price: "$4.79", source: "preset" },
  { id: "preset-5", layout: "horizontal", backgroundStyle: "flat",
    itemName: "250 Coins", itemAsset: "coins", price: "$2.89", source: "preset" },
  { id: "preset-6", layout: "vertical", backgroundStyle: "gradient",
    discountLabel: "BEST VALUE",
    itemName: "Season Pass", itemAsset: "season-pass", price: "$9.99", source: "preset" },
  { id: "preset-7", layout: "horizontal", backgroundStyle: "textured",
    discountLabel: "MOST POPULAR", discountBadge: "+20% MORE",
    itemName: "1000 Gems", itemAsset: "gems", price: "$7.99", source: "preset" },
];
```

---

## Seed Publishers

Seed these by running `node scripts/seed.js` which writes the config + CSS files directly.
No DB migration needed.

**neon-default** — Knights Quest, Neon purple theme, password off, promo DISCOUNT10 10%
**krafton** — Battlegrounds Mobile, indigo theme, password off, promo off
**tfew** — The Final Earth War, gold on dark navy theme, password "tfew2025", promo off

Seed script writes:
- `publishers/[slug]/config.json`
- `publishers/[slug]/tokens.json`
- `publishers/[slug]/tokens.light.css`
- `publishers/[slug]/tokens.dark.css`

---

## `package.json` Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "seed": "node scripts/seed.js",
    "new-publisher": "node scripts/new-publisher.js"
  }
}
```

---

## Key Implementation Notes

1. **No database anywhere.** `publishers/` directory is the database. Each subdirectory is a row. `config.json` is the record. Reading is `fs.readFileSync`. Writing is `fs.writeFileSync`.

2. **CSS files are the token system.** `tokens.light.css` and `tokens.dark.css` are written by Claude Code and served via the route handler at `/publisher-css/[slug]/[file]`. Components never receive token values as props — they read from CSS variables via `var(--token-name)`.

3. **`data-publisher` + `data-mode` are the theme selectors.** Set on the `PhoneFrame` root. CSS cascades to all children. Switching mode just toggles `data-mode="dark"` on the frame root — no re-render of components needed.

4. **Claude Code is the AI layer.** It reads images and writes files. The UI has no Anthropic SDK dependency. No API keys needed in the app. Claude Code runs in the designer's local environment with its own access to the Anthropic API.

5. **Server actions handle all UI-driven writes.** Next.js Server Actions replace API routes for the builder UI. `revalidatePath` ensures the demo page reflects changes immediately after a token override or config change.

6. **`public/img/[slug]/` is manually managed.** Designers drop files there before running Claude Code. The builder UI shows a checklist of which asset files are present — green if found, red if missing. It does not handle uploads.

7. **Hot reload is the preview mechanism.** When Claude Code writes files, Next.js hot-reloads the demo page automatically. No refresh needed. This is the entire "preview" experience in v1.

8. **Offer card selection.** Claude Code writes to `offerCards.generated`. The OfferCardPicker in the builder shows both generated and preset templates. Sales rep selects and reorders → saved to `offerCards.selected`. The demo renders `selected` only.

9. **Password protection in file-based mode.** If `preview.passwordEnabled: true`, the demo page reads the password from `config.json` and compares directly (no bcrypt needed for local dev — plaintext comparison is fine). A simple `useState` gates the demo behind a password input rendered client-side.

10. **`?record=true` is the screen recording mode.** Hides Neon logo, product tabs, device/mode switchers. Phone frame only on a clean dark background. Designers use `localhost:3000/demo/[slug]?record=true` when recording for decks.
```