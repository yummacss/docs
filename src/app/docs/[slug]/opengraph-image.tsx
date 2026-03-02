import { ImageResponse } from "next/og";
import { YummaCSSDark } from "../../../components/icons/yummacss-dark";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const module = await import(`@/content/docs/${slug}.mdx`);
  const meta = module.meta;

  const title: string = meta?.title ?? "Documentation";
  const description: string = meta?.description ?? "";

  return new ImageResponse(
    <OGImage title={title} description={description} />,
    { width: 1200, height: 630 },
  );
}

function OGImage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
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
      {/* Subtle diagonal grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px)",
          display: "flex",
        }}
      />

      {/* Top section: title + description */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          maxWidth: 880,
          zIndex: 1,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 18,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Yumma CSS — Docs
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: title.length > 30 ? 64 : 80,
            fontWeight: 400,
            color: "#a8b4e8",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>
        {description ? (
          <p
            style={{
              margin: 0,
              fontSize: 26,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.5,
              maxWidth: 760,
            }}
          >
            {description}
          </p>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          zIndex: 1,
        }}
      >
        <YummaCSSDark style={{ width: 64, height: 64 }} />
      </div>
    </div>
  );
}
