export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

import ogMeta from "@/generated/og-meta.json";
import { makeOGResponse } from "@/lib/og";

type M = Record<string, { title: string; description: string }>;
export default async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return makeOGResponse(
    (ogMeta as M)[`docs/${slug}`]?.title || "Documentation",
    "/docs",
    undefined,
    (ogMeta as M)[`docs/${slug}`]?.description,
  );
};
