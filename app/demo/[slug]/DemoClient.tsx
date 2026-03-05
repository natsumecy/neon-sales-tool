"use client";

import { useState } from "react";
import { Publisher } from "@/types/publisher";
import { DemoShell } from "@/components/demo/DemoShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface DemoClientProps {
  publisher: Publisher;
  isRecordMode: boolean;
  requiresPassword: boolean;
  expectedPassword: string;
  initialPassword: string;
}

export function DemoClient({
  publisher,
  isRecordMode,
  requiresPassword,
  expectedPassword,
  initialPassword,
}: DemoClientProps) {
  const [authenticated, setAuthenticated] = useState(
    !requiresPassword || initialPassword === expectedPassword
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm space-y-4">
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <Lock className="h-5 w-5 text-muted-foreground" />
            </div>
            <h1 className="text-lg font-semibold">Password required</h1>
            <p className="text-sm text-muted-foreground text-center">
              Enter the password to view the {publisher.name} demo.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password === expectedPassword) {
                setAuthenticated(true);
                setError(false);
              } else {
                setError(true);
              }
            }}
            className="space-y-3"
          >
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              autoFocus
            />
            {error && (
              <p className="text-sm text-destructive">Incorrect password.</p>
            )}
            <Button type="submit" className="w-full">
              View demo
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (isRecordMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <DemoShell publisher={publisher} hideControls />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-background">
      {/* Neon branding */}
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-foreground">neon</span>
        </div>
        <span className="text-muted-foreground">|</span>
        <span className="text-muted-foreground text-sm">
          {publisher.name} — {publisher.gameName}
        </span>
      </div>

      <DemoShell publisher={publisher} />
    </div>
  );
}
