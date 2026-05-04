import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

const CSS_PATH = path.join(rootDir, "src/styles/out.css");
const UI_DIR = path.join(rootDir, "src/registry/ui");

console.log("🔍 Validating Yumma CSS classes...\n");

const cssContent = fs.readFileSync(CSS_PATH, "utf-8");

const validClasses = new Set();

const classRegex =
  /\.([a-zA-Z][a-zA-Z0-9:-]*(?:[/\\][a-zA-Z0-9/-]+)?(?:\\:[a-zA-Z0-9-]+(?:[/\\][a-zA-Z0-9/-]+)?)?)/g;
let match;
while ((match = classRegex.exec(cssContent)) !== null) {
  const raw = match[1];
  const className = raw.replace(/\\/g, "").replace(/\\:/g, ":");
  validClasses.add(className);
}

console.log(`📦 Found ${validClasses.size} valid CSS classes in out.css`);

const files = fs.readdirSync(UI_DIR).filter((f) => f.endsWith(".tsx"));

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
  for (const cls of classes) {
    const clsClean = cls.replace(/\\:/g, ":").replace(/\\/g, "");

    if (!validClasses.has(clsClean)) {
      const variantMatch = clsClean.match(/^([a-zA-Z]+):(.+)$/);
      if (variantMatch) {
        const baseVariant = variantMatch[1];
        const baseClass = variantMatch[2];

        if (!validClasses.has(baseClass)) {
          invalidClasses.push({ file, class: cls, clean: clsClean });
        }
      } else {
        const shortClass = clsClean.replace(/:.+$/, "");
        if (!validClasses.has(shortClass)) {
          invalidClasses.push({ file, class: cls, clean: clsClean });
        }
      }
    }
  }
}

if (invalidClasses.length === 0) {
  console.log("✅ All classes are valid!");
  process.exit(0);
} else {
  console.log(`❌ Found ${invalidClasses.length} invalid classes:\n`);

  const grouped = {};
  for (const item of invalidClasses) {
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
    "\n⚠️  These classes are not in Yumma CSS. Fix or replace with valid classes.",
  );
  process.exit(1);
}
