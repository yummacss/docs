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

export function makeOGResponse(
  title: string,
  section: string,
  badge?: string,
  description?: string,
) {
  return fetchFont().then(
    (font) =>
      new ImageResponse(
        <OGImage
          title={title}
          section={section}
          badge={badge}
          description={description}
        />,
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
  description,
}: {
  title: string;
  section: string;
  badge?: string;
  description?: string;
}) {
  const titleSize = title.length > 35 ? 64 : title.length > 20 ? 80 : 96;

  const sectionLabel: Record<string, string> = {
    "/": "yummacss.com",
    "/docs": "yummacss.com/docs",
    "/blog": "yummacss.com/blog",
    "/ui": "yummacss.com/ui",
  };

  const urlLabel = sectionLabel[section] ?? `yummacss.com${section}`;

  return (
    <div
      style={{
        width: 1200,
        height: 630,
        backgroundColor: "#151724",
        display: "flex",
        flexDirection: "row",
        fontFamily: "Esteban, serif",
        overflow: "hidden",
      }}
    >
      {/* Left: main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
        }}
      >
        {/* Top: URL left, badge right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg
              aria-hidden="true"
              fill="none"
              height={24}
              viewBox="0 0 24 24"
              width={24}
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="11" fill="white" />
              <path
                d="M3 12C3 7.00909 7.00909 3 12 3C16.9909 3 21 7.00909 21 12C21 16.9909 16.9909 21 12 21C7.00909 21 3 16.9909 3 12ZM12 4.63636C7.90909 4.63636 4.63636 7.90909 4.63636 12C4.63636 16.0909 7.90909 19.3636 12 19.3636C16.0909 19.3636 19.3636 16.0909 19.3636 12C19.3636 7.90909 16.0909 4.63636 12 4.63636ZM15.4364 7.90909C15.1091 7.90909 14.7818 8.07273 14.5364 8.31818L8.23636 14.6182C8.07273 14.7818 7.90909 15.1091 7.90909 15.4364C7.90909 15.7636 8.07273 16.1727 8.4 16.4182C9.38182 17.2364 10.6909 17.7273 12 17.7273C13.5545 17.7273 14.9455 17.1545 16.0091 16.0091C17.0727 14.9455 17.7273 13.4727 17.7273 12C17.7273 10.6909 17.2364 9.38182 16.4182 8.4C16.1727 8.07273 15.8455 7.90909 15.4364 7.90909Z"
                fill="#413cb8"
              />
            </svg>
            <span
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.45)",
                fontFamily: "sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              {urlLabel}
            </span>
          </div>

          {badge && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px 14px",
                backgroundColor: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.4)",
                borderRadius: 100,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: "#a5b4fc",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "sans-serif",
                  fontWeight: 500,
                }}
              >
                {badge}
              </span>
            </div>
          )}
        </div>

        {/* Bottom: section pill + title + description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {section !== "/" && (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "4px 12px",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 100,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "sans-serif",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {section.replace("/", "")}
                </span>
              </div>
            </div>
          )}

          <h1
            style={{
              margin: 0,
              fontSize: titleSize,
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontFamily: "Esteban, serif",
            }}
          >
            {title}
          </h1>

          {description && (
            <span
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.45)",
                fontFamily: "sans-serif",
                lineHeight: 1.4,
                maxWidth: 600,
              }}
            >
              {description}
            </span>
          )}
        </div>
      </div>

      {/* Right: hatch pattern sidebar */}
      <div
        style={{
          width: 280,
          display: "flex",
          backgroundColor: "#151724",
          backgroundImage:
            "repeating-linear-gradient(45deg, #232741 0, #232741 1px, #151724 0, #151724 50%)",
          backgroundSize: "10px 10px",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
        }}
      />
    </div>
  );
}
