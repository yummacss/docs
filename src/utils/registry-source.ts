import fs from "node:fs";
import path from "node:path";
import type { RegistryMeta } from "@/registry";
import type { MetaResolver, RegistryResolver } from "@/utils/mdx-markdown";

/**
 * Reads a registry component's source off disk for the `.md` routes.
 *
 * SERVER ONLY. This imports `node:fs`, so it must never become reachable from
 * `mdx-components.tsx` or any client component: that leak is what kept the
 * playground from deploying & failed the first docs OOM fix. It is deliberately
 * separate from `mdx-markdown.ts`, which stays client-safe & takes this as an
 * injected function.
 *
 * The lookup order mirrors `src/plugins/rehype-registry.mjs` exactly - ui
 * first, then docs - so the markdown routes resolve the same file the rendered
 * page does. If the two ever disagree, the page and its `.md` would silently
 * show different code.
 */
const ROOTS = ["ui", "docs"] as const;

const cache = new Map<string, string | null>();
const metaCache = new Map<string, RegistryMeta | null>();
const isDev = process.env.NODE_ENV !== "production";

// Registry ids are flat slugs. A traversal here would read arbitrary files off
// the server, so anything else is rejected outright.
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

/**
 * The prop schema for a component that has one, so the `.md` route can state
 * the API rather than leaving a reader to infer it from the implementation.
 * Only migrated components have a schema; the rest return null and are unchanged.
 */
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
