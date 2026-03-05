"use client";

interface PhoneFrameProps {
  slug: string;
  mode: "light" | "dark";
  device: "iphone" | "android";
  children: React.ReactNode;
}

export function PhoneFrame({ slug, mode, device, children }: PhoneFrameProps) {
  const isIphone = device === "iphone";

  return (
    <div className="relative">
      {/* Device outer shell */}
      <div
        className={`relative overflow-hidden bg-black ${
          isIphone ? "rounded-[44px]" : "rounded-[24px]"
        }`}
        style={{
          width: 375,
          height: 812,
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        }}
      >
        {/* Status bar */}
        <div
          className="relative z-10 flex items-center justify-between px-6 pt-3 pb-1"
          style={{
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
          }}
          data-publisher={slug}
          data-mode={mode}
        >
          <span className="text-xs font-semibold">9:41</span>
          {isIphone && (
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[126px] h-[34px] bg-black rounded-b-[18px]" />
          )}
          <div className="flex items-center gap-1">
            <div className="flex gap-[2px]">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-sm"
                  style={{
                    height: 4 + i * 2,
                    background: "var(--text-primary)",
                    opacity: i <= 3 ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
            <svg width="15" height="10" viewBox="0 0 15 10" className="ml-1">
              <path
                d="M1 7.5C3.5 3.5 7.5 3.5 7.5 3.5C7.5 3.5 11.5 3.5 14 7.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <div
              className="w-6 h-3 rounded-sm border ml-1 relative"
              style={{ borderColor: "var(--text-primary)" }}
            >
              <div
                className="absolute inset-[1px] rounded-[1px]"
                style={{ background: "var(--text-primary)", width: "70%" }}
              />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div
          className="relative flex-1 overflow-hidden"
          data-publisher={slug}
          data-mode={mode}
          style={{
            height: "calc(100% - 44px)",
            background: "var(--bg-primary)",
          }}
        >
          {children}
        </div>

        {/* Home indicator (iPhone) */}
        {isIphone && (
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full"
            style={{ background: "var(--text-primary)", opacity: 0.2 }}
          />
        )}
      </div>
    </div>
  );
}
