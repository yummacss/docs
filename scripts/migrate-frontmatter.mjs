import fs from "node:fs";
import path from "node:path";

const contentDirs = ["src/content/docs", "src/content/ui", "src/content/blog"];
const extensions = [".mdx"];

function toYamlValue(value, indent = 0) {
  const pad = "  ".repeat(indent);
  if (typeof value === "string") {
    // Quote if contains special chars
    if (/[:\{\}\[\],&\*\?\|!%@`#]|^\s|\s$|^[>\-]/.test(value) || value.includes("\n")) {
      return JSON.stringify(value);
    }
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (value === null || value === undefined) {
    return "~";
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((v) => `${pad}- ${toYamlValue(v, indent + 1).trimStart()}`);
    return `\n${items.join("\n")}`;
  }
  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 0) return "{}";
    const lines = keys.map((k) => {
      const v = toYamlValue(value[k], indent + 1);
      const needsQuotes = /[:\{\}\[\],&\*\?\|!%@`#]/.test(k);
      const keyStr = needsQuotes ? JSON.stringify(k) : k;
      if (v.startsWith("\n")) {
        return `${pad}${keyStr}:${v}`;
      }
      return `${pad}${keyStr}: ${v}`;
    });
    return `\n${lines.join("\n")}`;
  }
  return String(value);
}

function objectToYaml(obj) {
  const keys = Object.keys(obj);
  return keys.map((k) => {
    const v = toYamlValue(obj[k], 0);
    const needsQuotes = /[:\{\}\[\],&\*\?\|!%@`#]/.test(k);
    const keyStr = needsQuotes ? JSON.stringify(k) : k;
    if (v.startsWith("\n")) {
      return `${keyStr}:${v}`;
    }
    return `${keyStr}: ${v}`;
  }).join("\n");
}

function parseMetaBlock(text) {
  const fn = new Function(`return (${text})`);
  return fn();
}

function extractMeta(content) {
  const match = content.match(/export\s+const\s+meta\s*=\s*(\{[\s\S]*?\});\r?\n?/);
  if (!match) return null;
  return { full: match[0], body: match[1], index: match.index };
}

function extractImportLines(content) {
  const imports = [];
  const lines = content.split("\n");
  let i = 0;
  // Only collect imports at the very top (before any non-import, non-empty line)
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i++;
      continue;
    }
    if (line.trim().startsWith("import ") || line.trim().startsWith("export type ") || line.trim().startsWith("import type ")) {
      imports.push(line);
      i++;
    } else {
      break;
    }
  }
  return imports;
}

async function migrateFile(filePath, dryRun = false) {
  const content = fs.readFileSync(filePath, "utf-8");
  
  // Skip if already has frontmatter
  if (content.startsWith("---")) {
    console.log(`  SKIP (already has frontmatter): ${filePath}`);
    return false;
  }

  const metaMatch = extractMeta(content);
  if (!metaMatch) {
    console.log(`  SKIP (no meta found): ${filePath}`);
    return false;
  }

  // Parse the meta object
  let metaObj;
  try {
    metaObj = parseMetaBlock(metaMatch.body);
  } catch (e) {
    console.error(`  ERROR parsing meta in ${filePath}: ${e.message}`);
    return false;
  }

  // Extract top-level imports
  const imports = extractImportLines(content);

  // Remove the meta block and everything before it (imports + blank lines)
  // that's already captured by extractImportLines
  let rest = content.slice(metaMatch.index + metaMatch.full.length);
  
  // Remove leading whitespace
  rest = rest.replace(/^\s+/, "");
  
  // If rest starts with ---\n, remove it (the separator between meta and content)
  if (rest.startsWith("---")) {
    rest = rest.replace(/^---\r?\n/, "");
    rest = rest.replace(/^\s+/, "");
  }

  // Build YAML frontmatter
  const yaml = objectToYaml(metaObj);
  
  // Build new file
  const eol = content.includes("\r\n") ? "\r\n" : "\n";
  const importBlock = imports.length > 0 ? imports.join(eol) + eol + eol : "";
  const newContent = `---${eol}${yaml}${eol}---${eol}${eol}${importBlock}${rest}${eol}`;

  if (dryRun) {
    console.log(`  WOULD CONVERT: ${filePath}`);
    return true;
  }

  fs.writeFileSync(filePath, newContent, "utf-8");
  console.log(`  CONVERTED: ${filePath}`);
  return true;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  let total = 0;
  let converted = 0;
  let skipped = 0;
  let errors = 0;

  for (const dir of contentDirs) {
    const absDir = path.resolve(dir);
    if (!fs.existsSync(absDir)) {
      console.log(`Directory not found: ${absDir}`);
      continue;
    }

    const files = fs.readdirSync(absDir).filter((f) => extensions.includes(path.extname(f)));
    
    for (const file of files) {
      const filePath = path.join(absDir, file);
      total++;
      try {
        const changed = await migrateFile(filePath, dryRun);
        if (changed === null) {
          // already had frontmatter
          skipped++;
        } else if (changed) {
          converted++;
        } else {
          skipped++;
        }
      } catch (e) {
        console.error(`  ERROR processing ${filePath}: ${e.message}`);
        errors++;
      }
    }
  }

  console.log(`\nTotal: ${total}, Converted: ${converted}, Skipped: ${skipped}, Errors: ${errors}`);
}

main().catch(console.error);
