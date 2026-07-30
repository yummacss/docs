import fs from "node:fs";
import path from "node:path";
import type { RegistryResolver } from "@/utils/mdx-markdown";

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
const isDev = process.env.NODE_ENV !== "production";

export const resolveRegistrySource: RegistryResolver = (registryId) => {
  // A traversal here would read arbitrary files off the server. Registry ids
  // are flat slugs, so anything else is rejected outright.
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(registryId)) return null;

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
