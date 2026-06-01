import fs from "node:fs";

const content = fs.readFileSync("src/content/blog/hello-yumma-ui.mdx", "utf-8");

// Check if it already has frontmatter
console.log("Starts with ---:", content.startsWith("---"));
console.log("First 20 chars:", JSON.stringify(content.slice(0, 20)));

// If it has frontmatter, let's also check the original (via git)
if (content.startsWith("---")) {
  console.log("File already converted. Checking git for original...");
}
