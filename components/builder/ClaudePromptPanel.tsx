"use client";

import { useState } from "react";
import { Publisher } from "@/types/publisher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, Terminal } from "lucide-react";

interface ClaudePromptPanelProps {
  publisher: Publisher;
  assetsStatus: {
    screenshotLight: boolean;
    screenshotDark: boolean;
    logo: boolean;
  };
}

export function ClaudePromptPanel({
  publisher,
  assetsStatus,
}: ClaudePromptPanelProps) {
  const [copied, setCopied] = useState(false);

  const prompt = `Create a mockup for ${publisher.name} (${publisher.gameName}).

Assets are in public/img/${publisher.slug}/.
Read CLAUDE.md for full instructions, then:
1. Check required assets exist
2. Extract color tokens from screenshot-light.png
3. Derive or extract dark mode tokens
4. Generate 5 offer card configs matching the game's style
5. Write tokens.json, tokens.light.css, tokens.dark.css, update config.json
6. Report token values, confidence flags, and generated cards

View at: localhost:3000/demo/${publisher.slug}`;

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            Asset checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <AssetRow
            label="screenshot-light.png"
            exists={assetsStatus.screenshotLight}
            required
          />
          <AssetRow
            label="screenshot-dark.png"
            exists={assetsStatus.screenshotDark}
          />
          <AssetRow
            label="logo.png"
            exists={assetsStatus.logo}
            required
          />
          <p className="text-xs text-muted-foreground mt-3">
            Drop files into{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-[11px]">
              public/img/{publisher.slug}/
            </code>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              Claude Code prompt
            </CardTitle>
            <Button size="sm" variant="outline" onClick={copyPrompt}>
              {copied ? (
                <>
                  <Check className="mr-1.5 h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1.5 h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono">
            {prompt}
          </pre>
        </CardContent>
      </Card>

      {publisher.claudeCode.lastRun && (
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>
                Last run:{" "}
                {new Date(publisher.claudeCode.lastRun).toLocaleString()}
              </span>
              {publisher.claudeCode.tokensExtracted && (
                <Badge variant="secondary" className="text-[10px]">
                  Tokens extracted
                </Badge>
              )}
              {publisher.claudeCode.cardsGenerated && (
                <Badge variant="secondary" className="text-[10px]">
                  Cards generated
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function AssetRow({
  label,
  exists,
  required,
}: {
  label: string;
  exists: boolean;
  required?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className={`w-2 h-2 rounded-full ${
          exists ? "bg-green-500" : required ? "bg-red-500" : "bg-muted-foreground/30"
        }`}
      />
      <code className="text-xs font-mono">{label}</code>
      {required && !exists && (
        <span className="text-[10px] text-destructive font-medium">
          Required
        </span>
      )}
    </div>
  );
}
