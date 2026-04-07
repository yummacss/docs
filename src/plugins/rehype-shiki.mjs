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

export default function rehypeShikiPlugin(options = {}) {
  return rehypeShiki({
    theme: eclipsa,
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
    ],
    ...options,
  });
}
