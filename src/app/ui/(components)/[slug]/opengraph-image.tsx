import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  let title = "Yumma UI";
  let description = "";
  let sectionLabel = "Components";

  try {
    const module = await import(`@/content/ui/${decodedSlug}.mdx`);
    const meta = module.meta;
    title = meta?.title ?? "Yumma UI";
    description = meta?.description ?? "";
    sectionLabel = decodedSlug.startsWith("templates")
      ? "Templates"
      : "Components";
  } catch {
    // fallback values already set above
  }

  return new ImageResponse(
    <OGImageUI
      title={title}
      description={description}
      sectionLabel={sectionLabel}
    />,
    { width: 1200, height: 630 },
  );
}

function OGImageUI({
  title,
  description,
  sectionLabel,
}: {
  title: string;
  description: string;
  sectionLabel: string;
}) {
  const titleFontSize = title.length > 40 ? 52 : title.length > 25 ? 64 : 80;

  return (
    <div
      style={{
        width: 1200,
        height: 630,
        backgroundColor: "#1e2039",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Diagonal grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px)",
          display: "flex",
        }}
      />

      {/* Top: section label + badge + title + description */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 900,
          zIndex: 1,
        }}
      >
        {/* Label row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Yumma UI
          </span>
          {/* Divider dot */}
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              display: "flex",
            }}
          />
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "3px 12px",
              backgroundColor: "rgba(65, 60, 184, 0.2)",
              border: "1px solid rgba(65, 60, 184, 0.45)",
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
              }}
            >
              {sectionLabel}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            margin: 0,
            fontSize: titleFontSize,
            fontWeight: 400,
            color: "#a8b4e8",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>

        {/* Description */}
        {description ? (
          <p
            style={{
              margin: 0,
              fontSize: 24,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.55,
              maxWidth: 780,
            }}
          >
            {description}
          </p>
        ) : null}
      </div>

      {/* Bottom right: logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          zIndex: 1,
        }}
      >
        <YummaCSSDarkLogo size={64} />
      </div>
    </div>
  );
}

function YummaCSSDarkLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="11" fill="white" />
      <path
        d="M3 12C3 7.00909 7.00909 3 12 3C16.9909 3 21 7.00909 21 12C21 16.9909 16.9909 21 12 21C7.00909 21 3 16.9909 3 12ZM12 4.63636C7.90909 4.63636 4.63636 7.90909 4.63636 12C4.63636 16.0909 7.90909 19.3636 12 19.3636C16.0909 19.3636 19.3636 16.0909 19.3636 12C19.3636 7.90909 16.0909 4.63636 12 4.63636ZM15.4364 7.90909C15.1091 7.90909 14.7818 8.07273 14.5364 8.31818L8.23636 14.6182C8.07273 14.7818 7.90909 15.1091 7.90909 15.4364C7.90909 15.7636 8.07273 16.1727 8.4 16.4182C9.38182 17.2364 10.6909 17.7273 12 17.7273C13.5545 17.7273 14.9455 17.1545 16.0091 16.0091C17.0727 14.9455 17.7273 13.4727 17.7273 12C17.7273 10.6909 17.2364 9.38182 16.4182 8.4C16.1727 8.07273 15.8455 7.90909 15.4364 7.90909Z"
        fill="#413cb8"
      />
    </svg>
  );
}