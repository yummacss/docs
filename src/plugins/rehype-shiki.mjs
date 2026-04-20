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

export default function rehypeShikiPlugin(options = {}) {
  return rehypeShiki({
    theme: eclipsa,
    transformers: [
      transformerMetaPreserve(),
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
    ],
    ...options,
  });
}
