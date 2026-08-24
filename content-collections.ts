import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from "@content-collections/core";
import type { ComponentType } from "react";
import { z } from "zod";

const docs = defineCollection({
  name: "docs",
  directory: "src/content/docs",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    content: z.string().optional(),
  }),
  transform: (doc) => ({
    ...doc,
    mdx: createDefaultImport<ComponentType>(
      `@/content/docs/${doc._meta.path}.mdx`,
    ),
    slug: doc._meta.path,
    wordCount: doc.content?.split(/\s+/).length ?? 0,
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
    // Whether the page drives its component from the controls in the right
    // rail instead of listing a props table. Opt-in per page: the rail is
    // wired to `<ComponentPlayground />`, so showing it beside a page that
    // still renders a static preview would give a reader controls that do
    // nothing.
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
    cover: z.string().optional(),
    // Drafts render in dev so they can be previewed, & are excluded from
    // every production surface. See SHOW_DRAFTS in src/utils/blog.ts.
    draft: z.boolean().optional(),
    content: z.string(),
  }),
  transform: (doc) => ({
    ...doc,
    mdx: createDefaultImport<ComponentType>(
      `@/content/blog/${doc._meta.path}.mdx`,
    ),
  }),
});

export default defineConfig({
  content: [docs, ui, blog],
});
