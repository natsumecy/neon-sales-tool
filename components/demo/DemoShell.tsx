"use client";

import { useState } from "react";
import { Publisher } from "@/types/publisher";
import { DemoProduct, useDemoFlow } from "@/hooks/useDemoFlow";
import { PhoneFrame } from "./PhoneFrame";
import { DeviceFrameSwitcher } from "./DeviceFrameSwitcher";
import { ThemeModeSwitcher } from "./ThemeModeSwitcher";
import { ProductTabSwitcher } from "./ProductTabSwitcher";
import { WebshopShell } from "@/components/webshop/WebshopShell";
import { CheckoutShell } from "@/components/checkout/CheckoutShell";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PromoCode } from "@/components/checkout/PromoCode";
import { PaymentMethodSelector } from "@/components/checkout/PaymentMethodSelector";
import { ApplePaySheet } from "@/components/checkout/ApplePaySheet";
import { CardPaymentSheet } from "@/components/checkout/CardPaymentSheet";
import { ProcessingState } from "@/components/checkout/ProcessingState";
import { SuccessModal } from "@/components/checkout/SuccessModal";
import { InGameSuccessOverlay } from "@/components/checkout/InGameSuccessOverlay";
import { PurchaseChoiceModal } from "@/components/checkout/PurchaseChoiceModal";
import { BrowserTransition } from "@/components/checkout/BrowserTransition";
import { DirectCheckoutDrawer } from "@/components/checkout/DirectCheckoutDrawer";

interface DemoShellProps {
  publisher: Publisher;
  hideControls?: boolean;
}

export function DemoShell({ publisher, hideControls }: DemoShellProps) {
  const [device, setDevice] = useState<"iphone" | "android">("iphone");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [activeProduct, setActiveProduct] = useState<DemoProduct>(() => {
    if (publisher.products.webshop) return "webshop";
    if (publisher.products.directCheckout) return "direct-checkout";
    return "web-checkout";
  });
  const [paymentMethod, setPaymentMethod] = useState<"apple-pay" | "card">(
    "apple-pay"
  );

  const flow = useDemoFlow(activeProduct);

  const handleProductSwitch = (product: DemoProduct) => {
    setActiveProduct(product);
    flow.reset();
  };

  const renderContent = () => {
    // Browser transition overlay
    if (flow.state === "browser-transition") {
      return <BrowserTransition url={`${publisher.name.toLowerCase()}.neon.gg`} />;
    }

    if (flow.state === "browser-reverse-transition") {
      return <BrowserTransition reverse />;
    }

    // In-game success overlay
    if (flow.state === "in-game-success") {
      return (
        <InGameSuccessOverlay
          itemName={publisher.simulatedItem.name}
          asset={publisher.simulatedItem.asset}
        />
      );
    }

    // Processing overlay
    if (flow.state === "processing") {
      return <ProcessingState />;
    }

    // Success modal
    if (flow.state === "checkout-success") {
      return (
        <SuccessModal
          itemName={publisher.simulatedItem.name}
          price={publisher.simulatedItem.price}
          onContinue={flow.backToGame}
        />
      );
    }

    // Webshop product
    if (activeProduct === "webshop") {
      return (
        <div className="h-full relative">
          <WebshopShell publisher={publisher} onSelectItem={flow.tap} />
          {flow.state === "choice-modal" && (
            <PurchaseChoiceModal
              savings="30%"
              onChooseWeb={flow.chooseWeb}
              onChooseIAP={flow.chooseIAP}
              onClose={flow.chooseIAP}
            />
          )}
          {flow.state === "web-checkout" && (
            <div className="absolute inset-0 z-20">
              <CheckoutShell onBack={flow.reset}>
                <OrderSummary
                  itemName={publisher.simulatedItem.name}
                  price={publisher.simulatedItem.price}
                  asset={publisher.simulatedItem.asset}
                  discountLabel={publisher.simulatedItem.discountLabel}
                  freeGift={publisher.freeGift}
                />
                <PromoCode
                  enabled={publisher.promo.enabled}
                  validCode={publisher.promo.code}
                  discountPercent={publisher.promo.discountPercent}
                />
                <PaymentMethodSelector
                  selected={paymentMethod}
                  onSelect={setPaymentMethod}
                  device={device}
                />
                <div className="p-4 mt-4">
                  <button
                    onClick={() => {
                      if (paymentMethod === "apple-pay") flow.tapApplePay();
                      else flow.tapCard();
                    }}
                    className="w-full py-3 rounded-xl text-sm font-semibold"
                    style={{
                      background: "var(--brand-accent)",
                      color: "#FFFFFF",
                    }}
                  >
                    Continue to payment
                  </button>
                </div>
              </CheckoutShell>
            </div>
          )}
          {flow.state === "apple-pay-sheet" && (
            <ApplePaySheet
              amount={publisher.simulatedItem.price}
              merchantName={publisher.name}
              onConfirm={flow.confirmPay}
              onCancel={flow.reset}
            />
          )}
          {flow.state === "card-payment-sheet" && (
            <CardPaymentSheet
              amount={publisher.simulatedItem.price}
              onConfirm={flow.confirmPay}
              onCancel={flow.reset}
            />
          )}
        </div>
      );
    }

    // Direct checkout
    if (activeProduct === "direct-checkout") {
      return (
        <div className="h-full relative">
          <GamePlaceholder
            gameName={publisher.gameName}
            onTap={flow.tap}
          />
          {flow.state === "choice-modal" && (
            <PurchaseChoiceModal
              savings="30%"
              onChooseWeb={flow.chooseWeb}
              onChooseIAP={flow.chooseIAP}
              onClose={flow.chooseIAP}
            />
          )}
          {flow.state === "direct-drawer-open" && (
            <DirectCheckoutDrawer
              open
              publisher={publisher}
              onSelectPayment={(method) => {
                setPaymentMethod(method);
                if (method === "apple-pay") flow.tapApplePay();
                else flow.tapCard();
              }}
              onClose={flow.reset}
            />
          )}
          {flow.state === "apple-pay-sheet" && (
            <ApplePaySheet
              amount={publisher.simulatedItem.price}
              merchantName={publisher.name}
              onConfirm={flow.confirmPay}
              onCancel={flow.reset}
            />
          )}
          {flow.state === "card-payment-sheet" && (
            <CardPaymentSheet
              amount={publisher.simulatedItem.price}
              onConfirm={flow.confirmPay}
              onCancel={flow.reset}
            />
          )}
        </div>
      );
    }

    // Web checkout
    return (
      <div className="h-full relative">
        <GamePlaceholder
          gameName={publisher.gameName}
          onTap={flow.tap}
        />
        {flow.state === "choice-modal" && (
          <PurchaseChoiceModal
            savings="30%"
            onChooseWeb={flow.chooseWeb}
            onChooseIAP={flow.chooseIAP}
            onClose={flow.chooseIAP}
          />
        )}
        {flow.state === "web-checkout" && (
          <div className="absolute inset-0 z-20">
            <CheckoutShell onBack={flow.reset}>
              <OrderSummary
                itemName={publisher.simulatedItem.name}
                price={publisher.simulatedItem.price}
                asset={publisher.simulatedItem.asset}
                discountLabel={publisher.simulatedItem.discountLabel}
                freeGift={publisher.freeGift}
              />
              <PromoCode
                enabled={publisher.promo.enabled}
                validCode={publisher.promo.code}
                discountPercent={publisher.promo.discountPercent}
              />
              <PaymentMethodSelector
                selected={paymentMethod}
                onSelect={setPaymentMethod}
                device={device}
              />
              <div className="p-4 mt-4">
                <button
                  onClick={() => {
                    if (paymentMethod === "apple-pay") flow.tapApplePay();
                    else flow.tapCard();
                  }}
                  className="w-full py-3 rounded-xl text-sm font-semibold"
                  style={{
                    background: "var(--brand-accent)",
                    color: "#FFFFFF",
                  }}
                >
                  Continue to payment
                </button>
              </div>
            </CheckoutShell>
          </div>
        )}
        {flow.state === "apple-pay-sheet" && (
          <ApplePaySheet
            amount={publisher.simulatedItem.price}
            merchantName={publisher.name}
            onConfirm={flow.confirmPay}
            onCancel={flow.reset}
          />
        )}
        {flow.state === "card-payment-sheet" && (
          <CardPaymentSheet
            amount={publisher.simulatedItem.price}
            onConfirm={flow.confirmPay}
            onCancel={flow.reset}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Controls bar */}
      {!hideControls && (
        <>
          <ProductTabSwitcher
            products={publisher.products}
            active={activeProduct}
            onSwitch={handleProductSwitch}
          />
        </>
      )}

      {/* Phone frame */}
      <PhoneFrame slug={publisher.slug} mode={mode} device={device}>
        {renderContent()}
      </PhoneFrame>

      {/* Bottom controls */}
      {!hideControls && (
        <div className="flex items-center gap-4">
          <DeviceFrameSwitcher device={device} onSwitch={setDevice} />
          <ThemeModeSwitcher mode={mode} onSwitch={setMode} />
        </div>
      )}
    </div>
  );
}

/** Placeholder for in-game view */
function GamePlaceholder({
  gameName,
  onTap,
}: {
  gameName: string;
  onTap: () => void;
}) {
  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8 cursor-pointer"
      onClick={onTap}
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="w-24 h-24 rounded-2xl mb-6 flex items-center justify-center"
        style={{ background: "var(--bg-selected)" }}
      >
        <span
          className="text-4xl font-bold"
          style={{ color: "var(--brand-accent)" }}
        >
          {gameName.charAt(0)}
        </span>
      </div>
      <p
        className="text-lg font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {gameName}
      </p>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Tap anywhere to open the store
      </p>
      <div
        className="mt-8 px-6 py-3 rounded-xl text-sm font-semibold"
        style={{ background: "var(--brand-accent)", color: "#FFFFFF" }}
      >
        Open store
      </div>
    </div>
  );
}
