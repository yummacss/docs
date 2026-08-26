import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractClasses, validate } from "@yummacss/canon";
import config from "../yumma.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

// Custom classes defined in the docs' own CSS.
const ALLOWLIST = ["docs-container", "ff-e", "playground-rail"];

// Skip content/**/*.mdx; release posts use old class syntax.
const UI_SOURCE = [
  "./src/app/**/*.tsx",
  "./src/components/**/*.{ts,tsx}",
  "./src/registry/**/*.tsx",
  "./src/mdx-components.tsx",
];

console.log("🔍 Validating Yumma CSS classes...\n");

// 1. Every class in UI code must be part of the Yumma CSS canon.
const result = await validate({
  cwd: rootDir,
  config: { ...config, source: UI_SOURCE },
  allowlist: ALLOWLIST,
});

console.log(
  `📄 Scanned ${result.files} files, found ${result.classes} unique classes\n`,
);

let failed = false;

if (result.invalid.length > 0) {
  failed = true;
  console.log(
    `❌ Found ${result.invalid.length} classes that are not canon:\n`,
  );
  for (const { className, files } of result.invalid) {
    console.log(`  "${className}" found in:`);
    for (const file of files) {
      console.log(`    - ${path.relative(rootDir, file)}`);
    }
  }
}

// 2. Registry components must only use built-in Yumma CSS colors,
//    not docs-specific theme tokens.
const CUSTOM_THEME_COLORS = Object.keys(config.theme?.colors ?? {}).filter(
  (color) => color !== "percentage",
);

function usesCustomThemeColor(cls) {
  const stripped = cls
    .replace(/^@[a-z]+:/, "")
    .replace(/^[a-z]+::/, "")
    .replace(/^[a-z]+:/, "")
    .replace(/\/\d+$/, "");
  return CUSTOM_THEME_COLORS.some(
    (color) =>
      stripped === color ||
      stripped.endsWith(`-${color}`) ||
      stripped.includes(`-${color}/`),
  );
}

function getAllTsxFiles(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getAllTsxFiles(fullPath));
    } else if (item.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

// Classes in object literals (prop maps), invisible to className scans.
const LOOKS_LIKE_CLASS = /^[a-z@][a-z0-9@:/%.-]*$/i;

/** The body of every `const UPPER_SNAKE = ...` declaration, where class maps live. */
function classMapRegions(source) {
  const regions = [];
  for (const match of source.matchAll(/const\s+[A-Z][A-Z0-9_]*[^=]*=\s*/g)) {
    const start = match.index + match[0].length;
    if (source[start] === "{") {
      let depth = 0;
      for (let i = start; i < source.length; i++) {
        if (source[i] === "{") depth++;
        else if (source[i] === "}" && --depth === 0) {
          regions.push(source.slice(start, i + 1));
          break;
        }
      }
    } else {
      regions.push(source.slice(start, source.indexOf(";", start) + 1));
    }
  }
  return regions;
}

function classesInStringLiterals(source) {
  const found = new Set();

  const consider = (literal) => {
    const tokens = literal.split(/\s+/).filter(Boolean);
    for (const token of tokens) {
      if (LOOKS_LIKE_CLASS.test(token) && /[-:]/.test(token)) found.add(token);
    }
  };

  // Multi-token strings that look like class lists only.
  for (const [, literal] of source.matchAll(/"([^"\n]*)"/g)) {
    const tokens = literal.trim().split(/\s+/).filter(Boolean);
    if (tokens.length < 2) continue;
    if (tokens.every((t) => LOOKS_LIKE_CLASS.test(t) && /[-:]/.test(t))) {
      consider(literal);
    }
  }

  // Inside class maps, single tokens count as classes.
  for (const region of classMapRegions(source)) {
    for (const [, literal] of region.matchAll(/"([^"\n]*)"/g))
      consider(literal);
  }

  return found;
}

const literalOwners = new Map();
for (const file of getAllTsxFiles(path.join(rootDir, "src/registry"))) {
  for (const cls of classesInStringLiterals(fs.readFileSync(file, "utf-8"))) {
    const owners = literalOwners.get(cls) ?? [];
    owners.push(path.relative(rootDir, file));
    literalOwners.set(cls, owners);
  }
}

// Scan literal candidates via a throwaway file with one className.
const scratch = path.join(rootDir, ".canon-literals");
fs.mkdirSync(scratch, { recursive: true });
fs.writeFileSync(
  path.join(scratch, "literals.tsx"),
  `export const x = <div className="${[...literalOwners.keys()].join(" ")}" />;\n`,
);

let literalResult;
try {
  literalResult = await validate({
    cwd: rootDir,
    config: { ...config, source: ["./.canon-literals/literals.tsx"] },
    allowlist: ALLOWLIST,
  });
} finally {
  fs.rmSync(scratch, { recursive: true, force: true });
}

if (literalResult.invalid.length > 0) {
  failed = true;
  console.log(
    `\n❌ Found ${literalResult.invalid.length} invalid classes in registry object literals:\n`,
  );
  for (const { className } of literalResult.invalid) {
    console.log(`  "${className}" found in:`);
    for (const file of literalOwners.get(className) ?? []) {
      console.log(`    - ${file}`);
    }
  }
  console.log(
    "\n⚠️  These sit outside a className attribute, so the normal scan cannot see them.",
  );
}

const registryIssues = new Map();
for (const file of getAllTsxFiles(path.join(rootDir, "src/registry"))) {
  const classes = extractClasses(fs.readFileSync(file, "utf-8"));
  for (const cls of classes) {
    if (usesCustomThemeColor(cls)) {
      const entry = registryIssues.get(cls) ?? [];
      entry.push(path.relative(rootDir, file));
      registryIssues.set(cls, entry);
    }
  }
}

if (registryIssues.size > 0) {
  failed = true;
  console.log(
    `\n❌ Found ${registryIssues.size} registry classes using docs-specific theme tokens:\n`,
  );
  for (const [cls, files] of registryIssues) {
    console.log(`  "${cls}" found in:`);
    for (const file of files) {
      console.log(`    - ${file}`);
    }
  }
  console.log(
    "\n⚠️  Registry components must only use built-in Yumma CSS colors, not docs-specific theme tokens.",
  );
}

if (failed) {
  process.exit(1);
}

console.log("✅ All classes are valid!");
