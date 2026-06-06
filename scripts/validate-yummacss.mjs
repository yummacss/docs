import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  coreUtils,
  mediaQueries,
  opacity,
  pseudoClasses,
  pseudoElements,
} from "@yummacss/core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const CSS_PATH = path.join(rootDir, "src/styles/out.css");
const UI_DIR = path.join(rootDir, "src");

console.log("🔍 Validating Yumma CSS classes...\n");

const cssContent = fs.readFileSync(CSS_PATH, "utf-8");

const compiledClasses = new Set();

const classRegex =
  /\.((?:\\@|[a-zA-Z@])[a-zA-Z0-9:-]*(?:[/\\][a-zA-Z0-9/%-]+)?(?:\\:[a-zA-Z0-9-]+(?:[/\\][a-zA-Z0-9/%-]+)?)?)/g;
let match;
while ((match = classRegex.exec(cssContent)) !== null) {
  const raw = match[1];
  const className = raw.replace(/\\/g, "").replace(/\\:/g, ":");
  if (className) {
    compiledClasses.add(className);
  }
}

console.log(`📦 From out.css: ${compiledClasses.size} compiled class names`);

const utils = coreUtils();

const coreClasses = new Set();
for (const utility of Object.values(utils)) {
  for (const valueKey of Object.keys(utility.values)) {
    coreClasses.add(`${utility.prefix}-${valueKey}`);
  }
}

console.log(`📦 From @yummacss/core: ${coreClasses.size} core class names`);

const allClasses = new Set();
for (const cls of coreClasses) allClasses.add(cls);
for (const cls of compiledClasses) allClasses.add(cls);

console.log(`📦 Merged: ${allClasses.size} total valid classes\n`);

const KNOWN_VALID = new Set(["ff-e"]);

// Custom theme color names from yumma.config.mjs — docs-specific only
const CUSTOM_THEME_COLORS = [
  "accent-dim",
  "diff-add",
  "diff-remove",
  "accent",
  "border",
  "code",
  "page",
  "surface",
];

const pcPrefixes = new Set(pseudoClasses.map((pc) => pc.prefix));
const pePrefixes = new Set(pseudoElements.map((pe) => pe.prefix));
const mqPrefixes = new Set(mediaQueries.map((mq) => mq.prefix));
const opPrefixes = new Set(opacity.map((op) => op.prefix));

function usesCustomThemeColor(cls) {
  const stripped = cls
    .replace(/^@[a-z]+:/, "")
    .replace(/^[a-z]+::/, "")
    .replace(/^[a-z]+:/, "")
    .replace(/\/\d+$/, "")
    .replace(/:\d+$/, "");
  return CUSTOM_THEME_COLORS.some(
    (color) =>
      stripped === color ||
      stripped.endsWith(`-${color}`) ||
      stripped.includes(`-${color}/`),
  );
}

function isValidClass(cls) {
  if (allClasses.has(cls)) return true;
  if (KNOWN_VALID.has(cls)) return true;

  const pcMatch = cls.match(/^([a-z]+):([a-z].+)$/);
  if (pcMatch && pcPrefixes.has(pcMatch[1])) return allClasses.has(pcMatch[2]);

  const peMatch = cls.match(/^([a-z]+)::(.+)$/);
  if (peMatch && pePrefixes.has(peMatch[1])) return allClasses.has(peMatch[2]);

  const mqMatch = cls.match(/^@([a-z]+):(.+)$/);
  if (mqMatch && mqPrefixes.has(mqMatch[1])) return allClasses.has(mqMatch[2]);

  const opMatch = cls.match(/^(.+):(\d+)$/);
  if (opMatch && opPrefixes.has(opMatch[2])) return allClasses.has(opMatch[1]);

  return false;
}

function getAllTsxFiles(dir, baseDir) {
  let files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(getAllTsxFiles(fullPath, baseDir));
    } else if (item.endsWith(".tsx")) {
      files.push(path.relative(baseDir, fullPath));
    }
  }
  return files;
}

const files = getAllTsxFiles(UI_DIR, UI_DIR).filter(
  (f) => !f.includes("node_modules") && !f.includes(".next"),
);

const allClassesFound = new Map();
const invalidClasses = [];

function extractClassesFromFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const classes = new Set();

  const classNameRegex = /className\s*=\s*(?:"([^"]+)"|`([^`]+)`|{[^}]+})/g;
  let match;

  while ((match = classNameRegex.exec(content)) !== null) {
    const classString = match[1] || match[2];
    if (!classString) continue;

    const extracted = classString
      .replace(/\$\{[^}]+\}/g, "")
      .replace(/\$\{[^}]+\?[^:]+:[^}]+\}/g, "")
      .replace(/\?[^:]+:[^}]+/g, "")
      .trim();

    const parts = extracted.split(/\s+/);
    for (const part of parts) {
      const cleaned = part.trim();
      if (cleaned) {
        classes.add(cleaned);
      }
    }
  }

  return classes;
}

for (const file of files) {
  const filePath = path.join(UI_DIR, file);
  const classes = extractClassesFromFile(filePath);
  allClassesFound.set(file, classes);
}

const totalClasses = Array.from(allClassesFound.values()).reduce(
  (sum, set) => sum + set.size,
  0,
);
console.log(
  `📄 Scanned ${files.length} files, found ${totalClasses} class references\n`,
);

for (const [file, classes] of allClassesFound) {
  const inRegistry = file.startsWith("registry");
  for (const cls of classes) {
    const clsClean = cls.replace(/\\:/g, ":").replace(/\\/g, "");

    if (!isValidClass(clsClean)) {
      invalidClasses.push({ file, class: cls, clean: clsClean });
    } else if (inRegistry && usesCustomThemeColor(clsClean)) {
      invalidClasses.push({ file, class: cls, clean: clsClean });
    }
  }
}

if (invalidClasses.length === 0) {
  console.log("✅ All classes are valid!");
  process.exit(0);
} else {
  const registryIssues = invalidClasses.filter((i) =>
    i.file.startsWith("registry"),
  );
  const docsIssues = invalidClasses.filter(
    (i) => !i.file.startsWith("registry"),
  );

  if (registryIssues.length > 0) {
    console.log(
      `❌ Found ${registryIssues.length} registry files using docs-specific theme tokens:\n`,
    );
    const grouped = {};
    for (const item of registryIssues) {
      if (!grouped[item.clean]) {
        grouped[item.clean] = [];
      }
      grouped[item.clean].push(item.file);
    }
    for (const [cls, fileList] of Object.entries(grouped)) {
      console.log(`  "${cls}" found in:`);
      for (const file of fileList) {
        console.log(`    - ${file}`);
      }
    }
    console.log(
      "\n⚠️  Registry components must only use built-in Yumma CSS colors, not docs-specific theme tokens.",
    );
  }

  if (docsIssues.length > 0) {
    console.log(
      `\n❌ Found ${docsIssues.length} invalid classes in docs files:\n`,
    );
    const grouped = {};
    for (const item of docsIssues) {
      if (!grouped[item.clean]) {
        grouped[item.clean] = [];
      }
      grouped[item.clean].push(item.file);
    }
    for (const [cls, fileList] of Object.entries(grouped)) {
      console.log(`  "${cls}" found in:`);
      for (const file of fileList) {
        console.log(`    - ${file}`);
      }
    }
  }

  process.exit(1);
}
