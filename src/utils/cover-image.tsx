import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { allBlogs } from "content-collections";
import { ImageResponse } from "next/og";
import BlogCover from "@/components/blog-cover";

/** Every post with a cover, as route params. */
export function coverParams() {
  return allBlogs
    .filter((post) => post.coverSpec)
    .map((post) => ({ slug: post._meta.path }));
}

/** A post's cover as a PNG. `brand` adds the product mark for link previews. */
export async function coverImage(slug: string, brand: boolean) {
  const spec = allBlogs.find((post) => post._meta.path === slug)?.coverSpec;
  if (!spec) return new Response("Not found", { status: 404 });

  const font = (file: string) =>
    readFile(join(process.cwd(), "node_modules/@fontsource", file));
  const [esteban, quattro] = await Promise.all([
    font("esteban/files/esteban-latin-400-normal.woff"),
    font("ia-writer-quattro/files/ia-writer-quattro-latin-400-normal.woff"),
  ]);

  return new ImageResponse(<BlogCover spec={spec} brand={brand} />, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Esteban", data: esteban, weight: 400, style: "normal" },
      { name: "Quattro", data: quattro, weight: 400, style: "normal" },
    ],
  });
}
