import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractClasses, validate } from "@yummacss/canon";
import config from "../yumma.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

// Custom classes defined in the docs' own CSS.
const ALLOWLIST = ["docs-container", "ff-e"];

// Only UI code is validated - content/**/*.mdx contains historical
// class syntax in old release posts.
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
  console.log(`❌ Found ${result.invalid.length} classes that are not canon:\n`);
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
