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
