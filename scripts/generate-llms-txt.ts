import fs from "node:fs";
import path from "node:path";
import { type SidebarConfigItem, sidebarConfig } from "../src/utils/sidebar";

const DOCS_CONTENT_DIR = "./src/content/docs";
const OUTPUT_PATH = "./public/llms.txt";
const BASE_URL = "https://yummacss.com";

interface PageInfo {
  title: string;
  slug: string;
  description: string;
}

/**
 * Extract description from MDX file's meta export
 */
function extractDescription(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const match = content.match(/description:\s*["']([^"']+)["']/);
    return match?.[1] || "";
  } catch {
    return "";
  }
}

/**
 * Recursively extract all slugs from sidebar config
 */
function extractSlugsFromItems(items: SidebarConfigItem[]): string[] {
  const slugs: string[] = [];

  for (const item of items) {
    if (item.slug) {
      slugs.push(item.slug);
    }
    if ("children" in item && item.children) {
      slugs.push(...extractSlugsFromItems(item.children));
    }
    if ("items" in item && item.items) {
      slugs.push(...extractSlugsFromItems(item.items));
    }
  }

  return slugs;
}

/**
 * Get page info for docs
 */
function getDocsPages(): Map<string, PageInfo> {
  const pages = new Map<string, PageInfo>();

  for (const section of sidebarConfig) {
    const slugs = extractSlugsFromItems(section.items);

    for (const slug of slugs) {
      const filePath = path.join(DOCS_CONTENT_DIR, `${slug}.mdx`);
      const description = extractDescription(filePath);

      // Find the title from the sidebar config
      const findTitle = (items: SidebarConfigItem[]): string | null => {
        for (const item of items) {
          if (item.slug === slug) return item.title;
          if ("children" in item && item.children) {
            const found = findTitle(item.children);
            if (found) return found;
          }
          if ("items" in item && item.items) {
            const found = findTitle(item.items);
            if (found) return found;
          }
        }
        return null;
      };

      const title = findTitle(section.items) || slug;
      pages.set(slug, { title, slug, description });
    }
  }

  return pages;
}

/**
 * Generate section content for llms.txt
 */
function generateSection(
  sectionTitle: string,
  items: SidebarConfigItem[],
  pages: Map<string, PageInfo>,
  urlPrefix: string,
): string {
  const lines: string[] = [];
  const slugs = extractSlugsFromItems(items);

  for (const slug of slugs) {
    const page = pages.get(slug);
    if (page) {
      const url = `${BASE_URL}${urlPrefix}/${slug}`;
      const description =
        page.description || `Documentation for ${page.title}.`;
      lines.push(`- [${page.title}](${url}): ${description}`);
    }
  }

  return lines.length > 0 ? `## ${sectionTitle}\n\n${lines.join("\n")}` : "";
}

/**
 * Main function to generate llms.txt
 */
function generateLlmsTxt(): void {
  const docsPages = getDocsPages();

  const sections: string[] = [];

  // Header
  const header =
    "# Yumma CSS\nThis is the documentation for the `yummacss` package.\nAn atomic CSS framework with abbreviated class names.";

  sections.push(header);

  // Generate docs sections
  for (const section of sidebarConfig) {
    const content = generateSection(
      section.title,
      section.items,
      docsPages,
      "/docs",
    );
    if (content) sections.push(content);
  }

  // Full reference
  sections.push(
    "## Full Reference\n- [Full Reference](https://raw.githubusercontent.com/yumma-lib/yumma-css-docs/main/AGENTS.md): Comprehensive reference with examples and common patterns for AI systems.",
  );

  // Write output
  const output = `${sections.join("\n\n")}\n`;
  fs.writeFileSync(OUTPUT_PATH, output);
  console.log(`Output successful with ${docsPages.size} docs pages`);
}

generateLlmsTxt();
