import { readFileSync } from "node:fs";
import { join } from "node:path";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

const eclipsa = JSON.parse(
  readFileSync(join(process.cwd(), "src/themes/eclipsa.json"), "utf-8"),
);

/**
 * Transformer that copies the raw meta string onto the output <pre> element
 * as a `data-meta` attribute so downstream rehype plugins can read it.
 */
function transformerMetaPreserve() {
  return {
    name: "meta-preserve",
    pre(node) {
      const raw = this.options?.meta?.__raw;
      if (raw) {
        node.properties = node.properties || {};
        node.properties["data-meta"] = raw;
      }
      return node;
    },
  };
}

/**
 * Cached plugin instance.
 *
 * rehypeShiki() internally calls createHighlighter() which loads language
 * grammars and theme data — an expensive operation. By building the plugin
 * once at module evaluation time and returning the same instance on every
 * call, we avoid re-initialising Shiki for each of the 262 MDX files.
 *
 * The module is evaluated once per Next.js build worker, so this is safe.
 */
const shikiPluginInstance = rehypeShiki({
  theme: eclipsa,
  transformers: [
    transformerMetaPreserve(),
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationWordHighlight(),
  ],
});

export default function rehypeShikiPlugin(_options = {}) {
  // Always return the same instance — options are baked in above.
  return shikiPluginInstance;
}
