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
    order: z.number().optional(),
    updated: z.boolean().optional(),
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
    order: z.number().optional(),
    updated: z.boolean().optional(),
    primitive: z.string().optional(),
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
