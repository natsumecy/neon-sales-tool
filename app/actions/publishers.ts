"use server";

import { savePublisher, getPublisher, saveTokens } from "@/lib/publishers";
import { Publisher } from "@/types/publisher";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";

export async function createPublisher(formData: FormData) {
  const slug = (formData.get("slug") as string).trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const name = formData.get("name") as string;
  const gameName = formData.get("gameName") as string;

  fs.mkdirSync(path.join(process.cwd(), "publishers", slug), {
    recursive: true,
  });
  fs.mkdirSync(path.join(process.cwd(), "public", "img", slug), {
    recursive: true,
  });

  savePublisher({
    slug,
    name,
    gameName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    products: { webshop: true, directCheckout: true, webCheckout: true },
    preview: { passwordEnabled: false, password: "" },
    promo: { enabled: false, code: "", discountPercent: 0 },
    simulatedItem: {
      name: "950 Coins",
      price: "$9.49",
      asset: "coins",
      discountLabel: "10% OFF",
    },
    freeGift: { name: "Free Bonus x 2", asset: "gems" },
    offerCards: { generated: [], selected: [] },
    claudeCode: {
      lastRun: null,
      tokensExtracted: false,
      cardsGenerated: false,
    },
  });

  revalidatePath("/");
  redirect(`/builder/${slug}`);
}

export async function overrideToken(
  slug: string,
  mode: "light" | "dark",
  tokenKey: string,
  value: string
) {
  const tokensPath = path.join(
    process.cwd(),
    "publishers",
    slug,
    "tokens.json"
  );
  if (!fs.existsSync(tokensPath)) throw new Error("Tokens not found");
  const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
  tokens[mode][tokenKey] = value;
  if (!tokens[mode].manualOverrides.includes(tokenKey)) {
    tokens[mode].manualOverrides.push(tokenKey);
  }
  saveTokens(slug, tokens);

  revalidatePath(`/builder/${slug}`);
  revalidatePath(`/demo/${slug}`);
}

export async function updatePublisherConfig(
  slug: string,
  updates: Partial<Publisher>
) {
  const publisher = getPublisher(slug);
  if (!publisher) throw new Error("Publisher not found");
  savePublisher({
    ...publisher,
    ...updates,
    updatedAt: new Date().toISOString(),
  });
  revalidatePath(`/builder/${slug}`);
  revalidatePath(`/demo/${slug}`);
  revalidatePath("/");
}
