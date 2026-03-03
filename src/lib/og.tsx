import { ImageResponse } from "next/og";

export async function fetchFont(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/esteban@5/files/esteban-latin-400-normal.woff",
    );
    return res.ok ? res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export function makeOGResponse(title: string, section: string, badge?: string) {
  return fetchFont().then(
    (font) =>
      new ImageResponse(
        <OGImage title={title} section={section} badge={badge} />,
        {
          width: 1200,
          height: 630,
          fonts: font
            ? [{ name: "Esteban", data: font, style: "normal", weight: 400 }]
            : [],
        },
      ),
  );
}

export function OGImage({
  title,
  section,
  badge,
}: {
  title: string;
  section: string;
  badge?: string;
}) {
  const titleSize = title.length > 35 ? 72 : title.length > 20 ? 88 : 104;
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        backgroundColor: "#1a1d2e",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        fontFamily: "Esteban, serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 40px)",
          display: "flex",
        }}
      />
      <h1
        style={{
          margin: 0,
          fontSize: titleSize,
          fontWeight: 400,
          color: "#ffffff",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          fontFamily: "Esteban, serif",
          zIndex: 1,
        }}
      >
        {title}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.08em",
              fontFamily: "sans-serif",
            }}
          >
            {section}
          </span>
          {badge && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "3px 12px",
                backgroundColor: "rgba(65,60,184,0.2)",
                border: "1px solid rgba(65,60,184,0.4)",
                borderRadius: 100,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: "#a8b4e8",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontFamily: "sans-serif",
                }}
              >
                {badge}
              </span>
            </div>
          )}
        </div>
        <svg
          aria-hidden="true"
          fill="none"
          height={72}
          viewBox="0 0 24 24"
          width={72}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="11" fill="white" />
          <path
            d="M3 12C3 7.00909 7.00909 3 12 3C16.9909 3 21 7.00909 21 12C21 16.9909 16.9909 21 12 21C7.00909 21 3 16.9909 3 12ZM12 4.63636C7.90909 4.63636 4.63636 7.90909 4.63636 12C4.63636 16.0909 7.90909 19.3636 12 19.3636C16.0909 19.3636 19.3636 16.0909 19.3636 12C19.3636 7.90909 16.0909 4.63636 12 4.63636ZM15.4364 7.90909C15.1091 7.90909 14.7818 8.07273 14.5364 8.31818L8.23636 14.6182C8.07273 14.7818 7.90909 15.1091 7.90909 15.4364C7.90909 15.7636 8.07273 16.1727 8.4 16.4182C9.38182 17.2364 10.6909 17.7273 12 17.7273C13.5545 17.7273 14.9455 17.1545 16.0091 16.0091C17.0727 14.9455 17.7273 13.4727 17.7273 12C17.7273 10.6909 17.2364 9.38182 16.4182 8.4C16.1727 8.07273 15.8455 7.90909 15.4364 7.90909Z"
            fill="#413cb8"
          />
        </svg>
      </div>
    </div>
  );
}
