"use client";

import { useState } from "react";
import { PublisherTokens } from "@/types/publisher";
import { TOKEN_LABELS, COLOR_TOKENS, confidenceColor, confidenceLabel } from "@/lib/tokens";
import { overrideToken } from "@/app/actions/publishers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Pencil, X } from "lucide-react";

interface TokenTableProps {
  slug: string;
  tokens: PublisherTokens;
  mode: "light" | "dark";
}

export function TokenTable({ slug, tokens, mode }: TokenTableProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (key: string, currentValue: string) => {
    setEditingKey(key);
    setEditValue(currentValue);
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditValue("");
  };

  const saveEdit = async () => {
    if (!editingKey) return;
    await overrideToken(slug, mode, editingKey, editValue);
    setEditingKey(null);
    setEditValue("");
  };

  return (
    <div className="space-y-1">
      {COLOR_TOKENS.map((key) => {
        const value = tokens[key as keyof PublisherTokens] as string;
        const confidence = tokens.confidence?.[key as keyof typeof tokens.confidence] as
          | number
          | undefined;
        const isOverridden = tokens.manualOverrides?.includes(key);
        const isEditing = editingKey === key;

        return (
          <div
            key={key}
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/50 group"
          >
            {/* Color swatch */}
            <div
              className="w-6 h-6 rounded-md border border-border flex-shrink-0"
              style={{ background: `#${value}` }}
            />

            {/* Label */}
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium">
                {TOKEN_LABELS[key] || key}
              </span>
              {isOverridden && (
                <span className="ml-1.5 text-[10px] text-muted-foreground bg-muted px-1 py-0.5 rounded">
                  overridden
                </span>
              )}
            </div>

            {/* Value / Edit */}
            {isEditing ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">#</span>
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value.replace(/[^a-fA-F0-9]/g, "").slice(0, 6))}
                  className="h-7 w-20 text-xs font-mono"
                  autoFocus
                />
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={saveEdit}>
                  <Check className="h-3.5 w-3.5" />
                </Button>
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={cancelEdit}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <code className="text-xs text-muted-foreground font-mono">
                  #{value}
                </code>
                {confidence !== undefined && (
                  <span
                    className={`text-[10px] font-medium ${confidenceColor(confidence)}`}
                    title={`${(confidence * 100).toFixed(0)}% confidence`}
                  >
                    {confidenceLabel(confidence)}
                  </span>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => startEdit(key, value)}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
