"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface InGameSuccessOverlayProps {
  itemName: string;
  asset: string;
}

const SPARKLE_KEYFRAMES = `
@keyframes checkout-sparkle-fade {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.5);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
}
`;

export function InGameSuccessOverlay({
  itemName,
  asset,
}: InGameSuccessOverlayProps) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black/80">
      {/* Inject keyframes */}
      <style dangerouslySetInnerHTML={{ __html: SPARKLE_KEYFRAMES }} />

      {/* Radial glow effect */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
        style={{
          width: animateIn ? "300px" : "0px",
          height: animateIn ? "300px" : "0px",
          background:
            "radial-gradient(circle, var(--brand-accent) 0%, transparent 70%)",
          opacity: animateIn ? 0.25 : 0,
          borderRadius: "50%",
        }}
      />

      {/* Sparkle particles */}
      {animateIn && (
        <>
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * 360;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 80;
            const y = Math.sin(rad) * 80;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 size-1.5 rounded-full"
                style={{
                  backgroundColor: "var(--brand-accent)",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  opacity: 0,
                  animation: `checkout-sparkle-fade 1.5s ${i * 0.1}s ease-out forwards`,
                }}
              />
            );
          })}
        </>
      )}

      {/* Title */}
      <div
        className="mb-6 transition-all delay-100 duration-700"
        style={{
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(-20px)",
        }}
      >
        <h2
          className="text-center text-[22px] font-black uppercase tracking-wider"
          style={{ color: "var(--brand-accent)" }}
        >
          Item received!
        </h2>
      </div>

      {/* Item icon with glow */}
      <div
        className="relative mb-6 transition-all delay-300 duration-700"
        style={{
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "scale(1)" : "scale(0.5)",
        }}
      >
        {/* Glow ring behind item */}
        <div
          className="absolute -inset-4 rounded-full"
          style={{
            boxShadow:
              "0 0 40px 10px var(--brand-accent), 0 0 80px 20px var(--brand-accent)",
            opacity: 0.3,
          }}
        />

        <div
          className="relative flex size-28 items-center justify-center rounded-2xl border-2"
          style={{
            borderColor: "var(--brand-accent)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            boxShadow: "0 0 20px var(--drop-shadow-color)",
          }}
        >
          <Image
            src={`/assets/items/${asset}.svg`}
            alt={itemName}
            width={72}
            height={72}
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Item name */}
      <p
        className="text-center text-[18px] font-bold transition-all delay-500 duration-700"
        style={{
          color: "#FFFFFF",
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(10px)",
        }}
      >
        {itemName}
      </p>

      {/* Subtitle */}
      <p
        className="mt-1 text-[13px] transition-all duration-700"
        style={{
          color: "rgba(255, 255, 255, 0.6)",
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(10px)",
          transitionDelay: "600ms",
        }}
      >
        Added to your inventory
      </p>
    </div>
  );
}
