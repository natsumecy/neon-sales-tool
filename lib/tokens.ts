import { PublisherTokens } from "@/types/publisher";

export const TOKEN_LABELS: Record<string, string> = {
  brandAccent: "Brand accent",
  textPrimary: "Text primary",
  textSecondary: "Text secondary",
  textDisabledOpacity: "Text disabled opacity",
  bgPrimary: "Background primary",
  bgSelected: "Background selected",
  bgTextField: "Background text field",
  strokeUnselected: "Stroke unselected",
  strokeItemSummary: "Stroke item summary",
  statePass: "State pass",
  stateForbidden: "State forbidden",
  dropShadowBlur: "Drop shadow blur",
  dropShadowColor: "Drop shadow color",
};

export const COLOR_TOKENS = [
  "brandAccent",
  "textPrimary",
  "textSecondary",
  "bgPrimary",
  "bgSelected",
  "bgTextField",
  "strokeUnselected",
  "strokeItemSummary",
  "statePass",
  "stateForbidden",
  "dropShadowColor",
] as const;

export const NUMERIC_TOKENS = [
  "textDisabledOpacity",
  "dropShadowBlur",
] as const;

export function getDefaultLightTokens(): PublisherTokens {
  return {
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
    confidence: {},
    manualOverrides: [],
  };
}

export function getDefaultDarkTokens(): PublisherTokens {
  return {
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
  };
}

export function confidenceColor(score: number): string {
  if (score >= 0.8) return "text-green-600";
  if (score >= 0.5) return "text-yellow-600";
  return "text-red-600";
}

export function confidenceLabel(score: number): string {
  if (score >= 0.8) return "High";
  if (score >= 0.5) return "Medium";
  return "Low";
}
