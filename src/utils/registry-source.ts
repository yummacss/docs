import fs from "node:fs";
import path from "node:path";
import type { RegistryMeta } from "@/registry";
import type { MetaResolver, RegistryResolver } from "@/utils/mdx-markdown";

// SERVER ONLY: `node:fs`; must not reach client bundles.
const ROOTS = ["ui", "docs"] as const;

const cache = new Map<string, string | null>();
const metaCache = new Map<string, RegistryMeta | null>();
const isDev = process.env.NODE_ENV !== "production";

// Flat slug ids only; rejects path traversal.
const ID = /^[a-z0-9][a-z0-9-]*$/i;

export const resolveRegistrySource: RegistryResolver = (registryId) => {
  if (!ID.test(registryId)) return null;

  if (!isDev && cache.has(registryId)) return cache.get(registryId) ?? null;

  let source: string | null = null;
  for (const root of ROOTS) {
    const file = path.join(
      process.cwd(),
      "src",
      "registry",
      root,
      `${registryId}.tsx`,
    );
    if (fs.existsSync(file)) {
      source = fs.readFileSync(file, "utf-8");
      break;
    }
  }

  if (!isDev) cache.set(registryId, source);
  return source;
};

/** Prop schema for `.md` routes; null when the component has no meta file. */
export const resolveRegistryMeta: MetaResolver = (registryId) => {
  if (!ID.test(registryId)) return null;

  if (!isDev && metaCache.has(registryId)) {
    return metaCache.get(registryId) ?? null;
  }

  const file = path.join(
    process.cwd(),
    "src",
    "registry",
    "meta",
    `${registryId}.json`,
  );

  let meta: RegistryMeta | null = null;
  if (fs.existsSync(file)) {
    meta = JSON.parse(fs.readFileSync(file, "utf-8")) as RegistryMeta;
  }

  if (!isDev) metaCache.set(registryId, meta);
  return meta;
};
