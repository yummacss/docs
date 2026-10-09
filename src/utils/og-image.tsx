import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { allBlogs, allDocs, allUis } from "content-collections";
import { ImageResponse } from "next/og";
import OgImage, { type OgSpec } from "@/components/og-image";
import { placeholderFor } from "@/components/og-placeholders";
import { type Category, getReferenceData } from "@/utils/yummacss";

export const HOME_OG: Record<"css" | "ui", OgSpec> = {
  css: {
    kind: "home",
    product: "css",
    before: "Get faster at",
    word: "CSS",
    second: "while you use it.",
  },
  ui: {
    kind: "home",
    product: "ui",
    before: "Yumma",
    word: "UI",
    second: "for React",
  },
};

/** The first classes a utility page lists, read from its first Reference. */
function pageClasses(content = ""): string[] {
  const match = content.match(
    /<Reference category="([^"]+)" name="([^"]+)" \/>/,
  );
  if (!match) return [];
  const data = getReferenceData(match[1] as Category, match[2]);
  return data?.rows.slice(0, 5).map((row) => row.className) ?? [];
}

export function docsOg(slug: string): OgSpec | null {
  const doc = allDocs.find((d) => d._meta.path === slug);
  if (!doc) return null;
  return {
    kind: "title",
    product: "css",
    title: doc.title,
    description: doc.description,
    classes: pageClasses(doc.content),
  };
}

export function blogOg(slug: string): OgSpec | null {
  const post = allBlogs.find((p) => p._meta.path === slug);
  if (!post) return null;
  const product = post.coverSpec?.product === "Yumma UI" ? "ui" : "css";
  return { kind: "post", product, title: post.title };
}

export function uiOg(slug: string): OgSpec | null {
  const ui = allUis.find((u) => u._meta.path === slug);
  if (!ui) return null;
  // a guide page, not a component, keeps the title layout
  if (!existsSync(join(process.cwd(), "src/registry/meta", `${slug}.json`))) {
    return {
      kind: "title",
      product: "ui",
      title: ui.title,
      description: ui.description,
    };
  }
  return {
    kind: "component",
    title: ui.title,
    description: ui.description,
    placeholder: placeholderFor(slug),
  };
}

export async function ogImage(spec: OgSpec | null) {
  if (!spec) return new Response("Not found", { status: 404 });

  const font = (file: string) =>
    readFile(join(process.cwd(), "node_modules/@fontsource", file));
  const [esteban, quattro] = await Promise.all([
    font("esteban/files/esteban-latin-400-normal.woff"),
    font("ia-writer-quattro/files/ia-writer-quattro-latin-400-normal.woff"),
  ]);

  return new ImageResponse(<OgImage spec={spec} />, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Esteban", data: esteban, weight: 400, style: "normal" },
      { name: "Quattro", data: quattro, weight: 400, style: "normal" },
    ],
  });
}
