import { generateId } from "./doc-properties";

/** A flag, an option or a config key, found on a page at build time. */
export type ReferenceEntry = {
  title: string;
  description: string;
  anchor: string;
};

// tables whose first column names something you type: a flag, an option, a field
const NAMED_BY = new Set(["flag", "option", "field"]);

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());

const plain = (text: string) => text.replace(/`/g, "").trim();

const heading = (line: string) => /^(#{2,4})\s+(.+?)\s*$/.exec(line);

export function extractReference(content: string): ReferenceEntry[] {
  const out: ReferenceEntry[] = [];
  const lines = content.split("\n");
  let anchor = "";
  let fence = false;
  let columns: string[] | null = null;

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) fence = !fence;
    if (fence) continue;

    const h = heading(line);
    if (h) anchor = generateId(plain(h[2]));

    if (!line.trimStart().startsWith("|")) {
      columns = null;
      continue;
    }
    if (!columns) {
      columns = cells(line).map((cell) => cell.toLowerCase());
      continue;
    }
    if (/^\|[\s|:-]+\|?$/.test(line.trim())) continue;
    if (!NAMED_BY.has(columns[0])) continue;

    const row = cells(line);
    if (!row[0].startsWith("`")) continue;
    const description = plain(
      [...row].reverse().find((cell, i) => cell && i < row.length - 1) ?? "",
    );
    out.push({ title: plain(row[0]), description, anchor });
  }

  return out;
}

/**
 * `yumma.config.mjs` keys, from the headings under Set Up on the configuration
 * page: `### Source` is `source`, and a `####` under `### Theme` is `theme.*`.
 */
export function extractConfigKeys(content: string): ReferenceEntry[] {
  const out: ReferenceEntry[] = [];
  let section = "";
  let parent = "";
  let fence = false;

  for (const line of content.split("\n")) {
    if (line.trimStart().startsWith("```")) fence = !fence;
    if (fence) continue;

    const h = heading(line);
    if (!h) continue;
    const [, hashes, text] = h;
    const name = plain(text);

    if (hashes === "##") {
      section = name;
      continue;
    }
    if (section !== "Set Up") continue;

    const key = name.toLowerCase().replace(/\s+/g, "");
    if (hashes === "###") parent = key;
    out.push({
      title: hashes === "####" ? `${parent}.${key}` : key,
      description: "yumma.config.mjs",
      anchor: generateId(name),
    });
  }

  return out;
}
