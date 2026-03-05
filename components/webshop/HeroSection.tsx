"use client";

interface HeroSectionProps {
  publisherName: string;
  gameName: string;
  logoSrc?: string;
}

export function HeroSection({
  publisherName,
  gameName,
  logoSrc,
}: HeroSectionProps) {
  return (
    <div
      className="relative px-4 pt-6 pb-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="flex items-center gap-3 mb-3">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={publisherName}
            className="w-12 h-12 rounded-xl object-contain"
            style={{
              background: "var(--bg-selected)",
              border: "1px solid var(--stroke-unselected)",
            }}
          />
        ) : (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
            style={{
              background: "var(--bg-selected)",
              color: "var(--brand-accent)",
              border: "1px solid var(--stroke-unselected)",
            }}
          >
            {publisherName.charAt(0)}
          </div>
        )}
        <div>
          <h1
            className="text-xl font-bold leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {gameName}
          </h1>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            {publisherName} Store
          </p>
        </div>
      </div>
      <div
        className="h-px w-full"
        style={{ background: "var(--stroke-unselected)" }}
      />
    </div>
  );
}
