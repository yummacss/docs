#!/usr/bin/env node
/**
 * scripts/generate-registry.mjs
 *
 * Scans src/registry/ui/ and writes
 * src/registry/index.ts with a static dynamic() import for every file.
 *
 * Run manually whenever you add or remove registry files:
 *   node scripts/generate-registry.mjs
 *
 * Or add to package.json scripts:
 *   "registry": "node scripts/generate-registry.mjs"
 */

import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const cwd = process.cwd();
const uiDir = join(cwd, "src/registry/ui");
const outFile = join(cwd, "src/registry/index.ts");

function getIds(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"))
    .map((f) => basename(f, f.endsWith(".tsx") ? ".tsx" : ".ts"));
}

const uiIds = getIds(uiDir);

const uiLines = uiIds
  .map((id) => `  "${id}": dynamic(() => import("./ui/${id}"), { ssr: true }),`)
  .join("\n");

const output = `/**
 * AUTO-GENERATED — do not edit by hand.
 * Run: node scripts/generate-registry.mjs
 *
 * Every dynamic() call is at module level so Next.js (Webpack + Turbopack)
 * can statically analyse and bundle each chunk once at build time.
 */

import dynamic from "next/dynamic";

// ---------------------------------------------------------------------------
// UI registry
// ---------------------------------------------------------------------------

const uiRegistry = {
${uiLines}
} as const;

// ---------------------------------------------------------------------------
// Combined export
// ---------------------------------------------------------------------------

export const registry = {
  ...uiRegistry,
} as const;

export type RegistryId = keyof typeof registry;

export function getRegistryComponent(id: string) {
  return (registry as Record<string, ReturnType<typeof dynamic>>)[id] ?? null;
}
`;

writeFileSync(outFile, output, "utf-8");
console.log(
  `✓ Registry generated: ${uiIds.length} Yumma UI components → src/registry/index.ts`,
);
