import { existsSync, readFileSync } from "node:fs";
import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from "@content-collections/core";
import type { ComponentType } from "react";
import { z } from "zod";
import { coverSchema, coverSpec, coverUrl, ogUrl } from "./src/utils/cover";
import {
  extractConfigKeys,
  extractReference,
} from "./src/utils/search-reference";
import { badgeFor } from "./src/utils/since";

// prop names only, so search carries a short list rather than the whole meta
const propsOf = (id: string): string[] => {
  const file = `src/registry/meta/${id}.json`;
  if (!existsSync(file)) return [];
  const meta = JSON.parse(readFileSync(file, "utf8"));
  return (meta.props ?? []).map((prop: { name: string }) => prop.name);
};

const docs = defineCollection({
  name: "docs",
  directory: "src/content/docs",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    since: z.string().optional(),
    content: z.string().optional(),
  }),
  transform: (doc) => ({
    ...doc,
    mdx: createDefaultImport<ComponentType>(
      `@/content/docs/${doc._meta.path}.mdx`,
    ),
    slug: doc._meta.path,
    wordCount: doc.content?.split(/\s+/).length ?? 0,
    // worked out here so the client gets a string, not the version lookup behind it
    badge: badgeFor(doc),
    reference: [
      ...extractReference(doc.content ?? ""),
      ...(doc._meta.path === "configuration"
        ? extractConfigKeys(doc.content ?? "")
        : []),
    ],
  }),
});

const ui = defineCollection({
  name: "ui",
  directory: "src/content/ui",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    primitive: z.union([z.boolean(), z.string()]).optional(),
    since: z.string().optional(),
    added: z.string().optional(),
    playground: z.boolean().optional(),
    content: z.string().optional(),
  }),
  transform: (doc) => ({
    ...doc,
    mdx: createDefaultImport<ComponentType>(
      `@/content/ui/${doc._meta.path}.mdx`,
    ),
    slug: doc._meta.path,
    wordCount: doc.content?.split(/\s+/).length ?? 0,
    badge: badgeFor(doc),
    reference: extractReference(doc.content ?? ""),
    props: propsOf(doc._meta.path),
  }),
});

const blog = defineCollection({
  name: "blog",
  directory: "src/content/blog",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    authors: z.array(z.string()),
    cover: coverSchema.optional(),
    // a YouTube video id, for a release with its own video
    video: z
      .string()
      .regex(/^[\w-]{11}$/)
      .optional(),
    draft: z.boolean().optional(),
    content: z.string(),
  }),
  transform: (doc) => ({
    ...doc,
    mdx: createDefaultImport<ComponentType>(
      `@/content/blog/${doc._meta.path}.mdx`,
    ),
    // a template becomes the url of the image drawn for it, so readers see a path either way
    cover: coverUrl(doc.cover, doc._meta.path),
    og: ogUrl(doc.cover, doc._meta.path),
    coverSpec: coverSpec(doc.cover, doc.title, doc.date),
  }),
});

export default defineConfig({
  content: [docs, ui, blog],
  hooks: {
    // the collections import every page's MDX, so a client import must fail the build (NOTES.md, "Menu bundle")
    writer: [
      ({ fileType, content }) => ({
        content:
          fileType === "javascript"
            ? content.replace("\n\n", '\n\nimport "server-only";\n')
            : content,
      }),
    ],
  },
});
