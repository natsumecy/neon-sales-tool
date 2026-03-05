"use client";

import { DemoProduct } from "@/hooks/useDemoFlow";

interface ProductTabSwitcherProps {
  products: {
    webshop: boolean;
    directCheckout: boolean;
    webCheckout: boolean;
  };
  active: DemoProduct;
  onSwitch: (product: DemoProduct) => void;
}

const PRODUCT_LABELS: Record<DemoProduct, string> = {
  webshop: "Webshop",
  "direct-checkout": "Direct checkout",
  "web-checkout": "Web checkout",
};

export function ProductTabSwitcher({
  products,
  active,
  onSwitch,
}: ProductTabSwitcherProps) {
  const enabledProducts: DemoProduct[] = [];
  if (products.webshop) enabledProducts.push("webshop");
  if (products.directCheckout) enabledProducts.push("direct-checkout");
  if (products.webCheckout) enabledProducts.push("web-checkout");

  if (enabledProducts.length <= 1) return null;

  return (
    <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
      {enabledProducts.map((product) => (
        <button
          key={product}
          onClick={() => onSwitch(product)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            active === product
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {PRODUCT_LABELS[product]}
        </button>
      ))}
    </div>
  );
}
