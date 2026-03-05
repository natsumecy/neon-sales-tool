"use client";

import { useState } from "react";
import Link from "next/link";
import { Publisher, PublisherTokens } from "@/types/publisher";
import { DemoShell } from "@/components/demo/DemoShell";
import { TokenTable } from "@/components/builder/TokenTable";
import { ClaudePromptPanel } from "@/components/builder/ClaudePromptPanel";
import { ProductSelector } from "@/components/builder/ProductSelector";
import { PromoCodeConfig } from "@/components/builder/PromoCodeConfig";
import { OfferCardPicker } from "@/components/builder/OfferCardPicker";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ExternalLink,
  Palette,
  Package,
  Tag,
  Terminal,
  Info,
} from "lucide-react";

interface BuilderClientProps {
  publisher: Publisher;
  tokens: { light: PublisherTokens; dark: PublisherTokens } | null;
  assetsStatus: {
    screenshotLight: boolean;
    screenshotDark: boolean;
    logo: boolean;
  };
}

export function BuilderClient({
  publisher,
  tokens,
  assetsStatus,
}: BuilderClientProps) {
  const [tokenMode, setTokenMode] = useState<"light" | "dark">("light");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="border-b px-4 py-3 flex items-center justify-between bg-background">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-sm font-semibold">{publisher.name}</h1>
            <p className="text-xs text-muted-foreground">
              {publisher.gameName}
            </p>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono">
            {publisher.slug}
          </Badge>
        </div>
        <Button asChild size="sm">
          <Link href={`/demo/${publisher.slug}`} target="_blank">
            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
            Open demo
          </Link>
        </Button>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Left sidebar */}
        <div className="w-[380px] border-r overflow-y-auto p-4 flex-shrink-0">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="overview" className="text-xs">
                <Info className="h-3.5 w-3.5" />
              </TabsTrigger>
              <TabsTrigger value="tokens" className="text-xs">
                <Palette className="h-3.5 w-3.5" />
              </TabsTrigger>
              <TabsTrigger value="products" className="text-xs">
                <Package className="h-3.5 w-3.5" />
              </TabsTrigger>
              <TabsTrigger value="promo" className="text-xs">
                <Tag className="h-3.5 w-3.5" />
              </TabsTrigger>
              <TabsTrigger value="claude" className="text-xs">
                <Terminal className="h-3.5 w-3.5" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Name</label>
                  <p className="text-sm font-medium">{publisher.name}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">
                    Game
                  </label>
                  <p className="text-sm font-medium">{publisher.gameName}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Slug</label>
                  <p className="text-sm font-mono">{publisher.slug}</p>
                </div>
              </div>
              <div className="pt-2">
                <label className="text-xs text-muted-foreground mb-2 block">
                  Assets
                </label>
                <div className="space-y-1.5">
                  <AssetStatus
                    label="screenshot-light.png"
                    exists={assetsStatus.screenshotLight}
                    required
                  />
                  <AssetStatus
                    label="screenshot-dark.png"
                    exists={assetsStatus.screenshotDark}
                  />
                  <AssetStatus
                    label="logo.png"
                    exists={assetsStatus.logo}
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tokens" className="mt-4">
              {tokens ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setTokenMode("light")}
                      className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        tokenMode === "light"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground"
                      }`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setTokenMode("dark")}
                      className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        tokenMode === "dark"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground"
                      }`}
                    >
                      Dark
                      {tokens.dark.derived && (
                        <span className="ml-1 text-[10px] text-muted-foreground">
                          (derived)
                        </span>
                      )}
                    </button>
                  </div>
                  <TokenTable
                    slug={publisher.slug}
                    tokens={tokenMode === "light" ? tokens.light : tokens.dark}
                    mode={tokenMode}
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No tokens extracted yet. Run Claude Code to extract tokens from
                  screenshots.
                </p>
              )}
            </TabsContent>

            <TabsContent value="products" className="mt-4">
              <ProductSelector publisher={publisher} />
              <div className="mt-4">
                <OfferCardPicker publisher={publisher} />
              </div>
            </TabsContent>

            <TabsContent value="promo" className="mt-4">
              <PromoCodeConfig publisher={publisher} />
            </TabsContent>

            <TabsContent value="claude" className="mt-4">
              <ClaudePromptPanel
                publisher={publisher}
                assetsStatus={assetsStatus}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview area */}
        <div className="flex-1 flex items-center justify-center bg-muted/30 p-8 overflow-auto">
          <DemoShell publisher={publisher} />
        </div>
      </div>
    </div>
  );
}

function AssetStatus({
  label,
  exists,
  required,
}: {
  label: string;
  exists: boolean;
  required?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          exists
            ? "bg-green-500"
            : required
            ? "bg-red-500"
            : "bg-muted-foreground/30"
        }`}
      />
      <code className="text-xs font-mono">{label}</code>
      {required && !exists && (
        <span className="text-[10px] text-destructive">required</span>
      )}
      {exists && (
        <span className="text-[10px] text-muted-foreground">found</span>
      )}
    </div>
  );
}
