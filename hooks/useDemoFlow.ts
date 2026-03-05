"use client";

import { useState, useEffect, useCallback } from "react";

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

  const tap = useCallback(() => {
    if (state === "game") setState("choice-modal");
  }, [state]);

  const chooseWeb = useCallback(() => {
    if (product === "direct-checkout") {
      setState("direct-drawer-open");
    } else if (product === "web-checkout") {
      setState("browser-transition");
    } else {
      // webshop — go straight to web checkout view
      setState("web-checkout");
    }
  }, [product]);

  const chooseIAP = useCallback(() => {
    setState("game");
  }, []);

  const tapApplePay = useCallback(() => {
    setState("apple-pay-sheet");
  }, []);

  const tapCard = useCallback(() => {
    setState("card-payment-sheet");
  }, []);

  const confirmPay = useCallback(() => {
    setState("processing");
    setTimeout(() => setState("checkout-success"), 1500);
  }, []);

  const backToGame = useCallback(() => {
    if (product === "web-checkout") {
      setState("browser-reverse-transition");
      setTimeout(() => setState("in-game-success"), 800);
    } else {
      setState("in-game-success");
    }
  }, [product]);

  const reset = useCallback(() => {
    setState("game");
  }, []);

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
      const t = setTimeout(() => setState("game"), 2500);
      return () => clearTimeout(t);
    }
  }, [state]);

  // Auto-advance browser reverse transition
  useEffect(() => {
    if (state === "browser-reverse-transition") {
      const t = setTimeout(() => setState("in-game-success"), 800);
      return () => clearTimeout(t);
    }
  }, [state]);

  return {
    state,
    tap,
    chooseWeb,
    chooseIAP,
    tapApplePay,
    tapCard,
    confirmPay,
    backToGame,
    reset,
  };
}
