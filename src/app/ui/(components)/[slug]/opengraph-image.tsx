import { ImageResponse } from "next/og";
import { OGImage } from "@/app/docs/[slug]/opengraph-image";
import ogMeta from "@/generated/og-meta.json";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OGMeta = Record<string, { title: string; description: string }>;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const meta = (ogMeta as OGMeta)[`ui/${decodedSlug}`];

  const title = meta?.title || "Yumma UI";
  const description = meta?.description || "";
  const badge = decodedSlug.startsWith("templates")
    ? "Templates"
    : "Components";

  return new ImageResponse(
    <OGImage
      title={title}
      description={description}
      label="Yumma UI"
      badge={badge}
    />,
    { width: 1200, height: 630 },
  );
}
