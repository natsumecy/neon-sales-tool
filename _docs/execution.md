# Neon Demo Tool — Execution summary

Everything described in `plan.md` has been implemented. This document covers what was built, how it works, and how to use it.

---

## Tech stack (as implemented)

- **Framework**: Next.js 16 App Router (plan referenced v15; project uses v16)
- **React**: 19
- **UI library**: shadcn/ui (new-york style, 60+ components pre-installed)
- **Styling**: Tailwind CSS v4 + per-publisher CSS custom property files
- **Data store**: File system — `publishers/` directory, no database
- **Auth**: None — local-only tool
- **API routes**: One route handler for serving publisher CSS; all writes via server actions

---

## File structure

```
app/
├── page.tsx                                 # Dashboard — lists all publishers
├── actions/publishers.ts                    # Server actions (create, override, update)
├── publisher-css/[slug]/[file]/route.ts     # Route handler — serves publisher CSS files
├── publishers/new/page.tsx                  # New publisher form
├── builder/[slug]/
│   ├── page.tsx                             # Server component — loads data, injects CSS
│   └── BuilderClient.tsx                    # Client component — 5-tab sidebar + live preview
└── demo/[slug]/
    ├── page.tsx                             # Server component — injects publisher CSS
    └── DemoClient.tsx                       # Client component — password gate, record mode

components/
├── builder/
│   ├── TokenTable.tsx                       # Editable token table with confidence indicators
│   ├── ClaudePromptPanel.tsx                # Copy-able prompt + asset checklist
│   ├── ProductSelector.tsx                  # Product toggles + item/gift config
│   ├── PromoCodeConfig.tsx                  # Promo toggle + code/percent fields
│   └── OfferCardPicker.tsx                  # Select from generated cards + presets
├── demo/
│   ├── DemoShell.tsx                        # Main orchestrator — manages all demo state
│   ├── PhoneFrame.tsx                       # Phone chrome with data-publisher/data-mode attrs
│   ├── DeviceFrameSwitcher.tsx              # iPhone / Android segmented control
│   ├── ThemeModeSwitcher.tsx                # Light / Dark segmented control
│   └── ProductTabSwitcher.tsx              # Webshop / Direct / Web tabs
├── webshop/
│   ├── WebshopShell.tsx                     # Container — hero + offer grid + buy button
│   ├── HeroSection.tsx                      # Publisher logo + game name
│   ├── SectionHeader.tsx                    # Section title
│   ├── OfferCardGrid.tsx                    # Selectable offer card list
│   └── OfferCard.tsx                        # Individual card (horizontal/vertical layouts)
└── checkout/
    ├── CheckoutShell.tsx                    # Nav bar + scrollable content container
    ├── OrderSummary.tsx                     # Selected item + optional free gift
    ├── PromoCode.tsx                        # Collapsible promo input with validation
    ├── PaymentMethodSelector.tsx            # Apple Pay / Google Pay + card radio
    ├── ApplePaySheet.tsx                    # iOS-style dark slide-up with Face ID
    ├── CardPaymentSheet.tsx                 # Pre-filled card form slide-up
    ├── ProcessingState.tsx                  # Full-screen spinner overlay
    ├── SuccessModal.tsx                     # Animated checkmark + receipt
    ├── InGameSuccessOverlay.tsx             # Celebratory sparkles + glow effect
    ├── PurchaseChoiceModal.tsx              # Bottom sheet — web vs in-app purchase
    ├── BrowserTransition.tsx                # Safari chrome animation with loading bar
    └── DirectCheckoutDrawer.tsx             # Compact bottom drawer checkout

hooks/
└── useDemoFlow.ts                           # Demo state machine (11 states, 3 products)

lib/
├── publishers.ts                            # File read/write helpers
├── tokens.ts                                # Token labels, defaults, confidence helpers
├── presets.ts                               # 7 preset offer card templates
└── files.ts                                 # Path helpers for publisher directories

types/
└── publisher.ts                             # Core interfaces (Publisher, OfferCard, Tokens, etc.)

publishers/                                  # DATA STORE — each subdirectory is a publisher
├── neon-default/                            # config.json + tokens.json + CSS files
├── krafton/
└── tfew/

public/assets/items/                         # 7 placeholder SVG icons
├── coins.svg, gems.svg, hearts.svg, stars.svg
├── crystals.svg, season-pass.svg, chest.svg

scripts/
└── seed.js                                  # Seeds 3 publishers with full config + tokens

CLAUDE.md                                    # Instructions for Claude Code to create mockups
```

---

## How it works

### Theming via CSS custom properties

Every publisher gets its own CSS files (`tokens.light.css` and `tokens.dark.css`). These define 13 CSS custom properties scoped to `[data-publisher="slug"]` and `[data-publisher="slug"][data-mode="dark"]`.

The `PhoneFrame` component sets `data-publisher` and `data-mode` on its root div. All child components (webshop, checkout, etc.) reference these variables directly — e.g. `style={{ color: "var(--text-primary)" }}`. No token values are passed as props.

Switching between light and dark mode just toggles the `data-mode` attribute. CSS cascade handles the rest.

**Token list:**
| Variable | Purpose |
|---|---|
| `--brand-accent` | Primary interactive/brand color |
| `--text-primary` | Main readable text |
| `--text-secondary` | Muted/secondary text |
| `--bg-primary` | Page background |
| `--bg-selected` | Selected card/item background |
| `--bg-text-field` | Input field background |
| `--stroke-unselected` | Border for unselected elements |
| `--stroke-item-summary` | Accent border for highlighted cards |
| `--state-pass` | Success state (green) |
| `--state-forbidden` | Error state (red) |
| `--drop-shadow-blur` | Shadow blur radius |
| `--drop-shadow-color` | Shadow color |

### CSS serving

Publisher CSS files live in `publishers/[slug]/` (outside `public/`). A Next.js route handler at `/publisher-css/[slug]/[file]` serves them with `Content-Type: text/css` and no-cache headers. The demo page injects these via `dangerouslySetInnerHTML` in a `<style>` tag with `@import` rules.

### Demo state machine

`useDemoFlow` manages the interactive demo with 11 states and 3 product types:

```
States: game → choice-modal → direct-drawer-open | browser-transition
        → apple-pay-sheet | card-payment-sheet → processing
        → checkout-success → in-game-success → (auto-reset to game)

Products: webshop, direct-checkout, web-checkout
```

Each product type follows a slightly different path through the states. The web-checkout path includes a browser transition animation (Safari chrome with loading bar). The in-game success state auto-resets to the game view after 2 seconds.

### Server actions

Three server actions handle all UI-driven file writes:

1. **`createPublisher`** — Creates directories, writes default `config.json`, redirects to builder
2. **`overrideToken`** — Updates a single token value in `tokens.json`, regenerates CSS files
3. **`updatePublisherConfig`** — Merges partial config updates, writes `config.json`

All actions call `revalidatePath()` so the demo and builder pages reflect changes immediately.

### Password protection

When `preview.passwordEnabled` is true in a publisher's config, the demo page renders a password input instead of the demo. Password comparison is plaintext (sufficient for local-only use). The password can be bypassed via URL param: `?password=the-password`.

### Record mode

Appending `?record=true` to any demo URL hides the Neon branding, product tabs, and device/theme switchers. Only the phone frame renders on a dark background — clean for screen recording.

---

## Seed data

Three publishers are seeded via `npm run seed`:

| Publisher | Game | Brand color | Password | Promo |
|---|---|---|---|---|
| neon-default | Knights Quest | Purple `#7C3AED` | None | `DISCOUNT10` (10%) |
| krafton | Battlegrounds Mobile | Indigo `#6366F1` | None | None |
| tfew | The Final Earth War | Gold `#D4A017` | `tfew2025` | None |

Each publisher gets a complete `config.json`, `tokens.json`, `tokens.light.css`, and `tokens.dark.css`. The seed script also writes 5 offer cards per publisher.

---

## How to use

### Initial setup

```bash
npm install
npm run seed     # Creates 3 publishers in publishers/
npm run dev      # Start dev server
```

### Creating a new publisher via UI

1. Go to `localhost:3000`
2. Click "New publisher"
3. Fill in name, game name, slug
4. Redirected to builder at `/builder/[slug]`

### Creating a new publisher via Claude Code

1. Create the publisher via the UI first (or manually create directories)
2. Drop assets into `public/img/[slug]/`:
   - `screenshot-light.png` (required)
   - `logo.png` (required)
   - `screenshot-dark.png` (optional)
3. Open the builder, go to the "Claude Code" tab
4. Copy the initiation prompt
5. Paste into Claude Code
6. Claude Code reads `CLAUDE.md`, analyzes screenshots, writes token files
7. App hot-reloads — demo is live at `/demo/[slug]`

### Using the builder

The builder at `/builder/[slug]` has 5 sidebar tabs:

- **Overview** — Publisher info + asset file status (green/red indicators)
- **Tokens** — Token table with confidence dots; click to override any value
- **Products** — Toggle webshop/direct/web checkout; configure simulated item + free gift
- **Promo** — Toggle promo code, set code string and discount percent
- **Claude Code** — Copy initiation prompt, see asset checklist, last run status

The main area shows a live preview of the demo with device/mode/product switchers.

### Viewing the demo

- **Normal mode**: `localhost:3000/demo/[slug]` — Neon branding, product tabs, device/theme switchers
- **Record mode**: `localhost:3000/demo/[slug]?record=true` — Phone frame only, dark background
- **Password bypass**: `localhost:3000/demo/[slug]?password=the-password`

---

## Conventions

- **Sentence case everywhere** — All UI text uses sentence case. No title case. Proper nouns (Apple Pay, Google Pay, Face ID, Claude Code) and ALL CAPS labels (BEST VALUE, FREE) are kept as-is.
- **CSS variables over props** — Token values are never passed as component props. Components read from `var(--token-name)`.
- **File-based data** — The `publishers/` directory is the database. Each subdirectory is a record.
- **No API routes for writes** — All UI-driven writes use Next.js server actions.
- **Placeholder SVGs** — Item assets (`public/assets/items/`) are simple colored SVG shapes. Replace with real assets as needed.

---

## Deviations from plan

The implementation follows the plan with these minor differences:

1. **Next.js 16** instead of 15 — The v0 scaffold uses Next.js 16. No functional difference for this project.
2. **SVG assets** instead of PNG — Item assets use SVG placeholders instead of the PNG files mentioned in the plan. SVG is lighter and scales better.
3. **`PublisherForm` merged into the new publisher page** — Rather than a separate `PublisherForm.tsx` component, the form is inline in `app/publishers/new/page.tsx` since it's only used once.
4. **`TokenOverridePanel` merged into `TokenTable`** — Override editing is inline in the token table rows rather than a separate panel component.
5. **CSS injection via `dangerouslySetInnerHTML`** — The demo page injects publisher CSS via a style tag with `@import` rules rather than a `<link>` tag, for more reliable hot-reload behavior.
