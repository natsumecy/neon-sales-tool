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

export function getTokens(
  slug: string
): { light: PublisherTokens; dark: PublisherTokens } | null {
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
  fs.writeFileSync(
    path.join(dir, "tokens.json"),
    JSON.stringify(tokens, null, 2)
  );
  fs.writeFileSync(
    path.join(dir, "tokens.light.css"),
    generateCSS(slug, tokens.light, "light")
  );
  fs.writeFileSync(
    path.join(dir, "tokens.dark.css"),
    generateCSS(slug, tokens.dark, "dark")
  );
}

function generateCSS(
  slug: string,
  tokens: PublisherTokens,
  mode: "light" | "dark"
): string {
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
