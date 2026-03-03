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
  const meta = (ogMeta as OGMeta)[`blog/${slug}`];

  return new ImageResponse(
    <OGImage
      title={meta?.title || "Blog"}
      description={meta?.description || ""}
      label="Yumma CSS — Blog"
    />,
    { width: 1200, height: 630 },
  );
}
