import {
  createHighlighterCoreSync,
  type HighlighterCore,
  hastToHtml,
  isPlainLang,
  isSpecialLang,
  type ThemeRegistrationAny,
} from "@shikijs/core";
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript";
import css from "@shikijs/langs/css";
import html from "@shikijs/langs/html";
import javascript from "@shikijs/langs/javascript";
import json from "@shikijs/langs/json";
import jsx from "@shikijs/langs/jsx";
import shellscript from "@shikijs/langs/shellscript";
import tsx from "@shikijs/langs/tsx";
import typescript from "@shikijs/langs/typescript";
import yaml from "@shikijs/langs/yaml";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import type { Element, Root } from "hast";
import { decorateCodeHast } from "@/lib/code-decorate.mjs";
// Imported as a module rather than read from disk. This file is reachable from
// client chunks via mdx-components, and a node:fs import there is exactly the
// leak that kept the playground from deploying.
import eclipsa from "@/themes/eclipsa.json";

const theme = eclipsa as unknown as ThemeRegistrationAny;
const THEME_NAME = eclipsa.name ?? "eclipsa";

/**
 * The fine-grained core, not `@shikijs/rehype`.
 *
 * The bundled entry carries an index of all 332 grammars & spins up an
 * Oniguruma WASM instance per highlighter; `langs` narrowed what was tokenized
 * but never what was loaded. Only the 9 grammars the site actually uses are
 * imported here, and the JS regex engine means no WASM at all. Output is
 * byte-identical to the bundled path, verified across ts, css, html, bash,
 * tsx & mjs.
 */
let highlighter: HighlighterCore | null = null;

function get(): HighlighterCore {
  if (!highlighter) {
    highlighter = createHighlighterCoreSync({
      themes: [theme],
      // js & mjs alias to javascript; bash aliases to shellscript; yml aliases
      // to yaml. The aliases come from the grammar files, so the canonical set
      // is enough.
      langs: [
        html,
        css,
        tsx,
        typescript,
        javascript,
        jsx,
        shellscript,
        json,
        yaml,
      ],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighter;
}

/**
 * Highlight a code string & return HTML for the <pre> element.
 *
 * Unknown or missing languages fall back to plain text rather than throwing,
 * so a stray fence label cannot fail a build.
 */
export function highlight(
  code: string,
  lang?: string,
  meta?: string,
  title?: string,
): string {
  const shiki = get();

  let resolved = lang || "text";
  if (!isPlainLang(resolved) && !isSpecialLang(resolved)) {
    if (!shiki.getLoadedLanguages().includes(resolved)) resolved = "text";
  }

  const hast: Root = shiki.codeToHast(code, {
    lang: resolved,
    theme: THEME_NAME,
    meta: { __raw: meta ?? "" },
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
    ],
  });

  const pre = hast.children.find(
    (c): c is Element => c.type === "element" && c.tagName === "pre",
  );
  if (pre) decorateCodeHast(pre, meta ?? "", title ?? null);

  return hastToHtml(hast);
}
