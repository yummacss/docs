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
// Import theme JSON; no `node:fs` (this file reaches client chunks).
import eclipsa from "@/themes/eclipsa.json";

const theme = eclipsa as unknown as ThemeRegistrationAny;
const THEME_NAME = eclipsa.name ?? "eclipsa";

/** Fine-grained Shiki core with only site grammars and JS regex engine (no WASM). */
let highlighter: HighlighterCore | null = null;

function get(): HighlighterCore {
  if (!highlighter) {
    highlighter = createHighlighterCoreSync({
      themes: [theme],
      // js/mjs -> javascript; bash -> shellscript; yml -> yaml.
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

/** Highlight code and return HTML for `<pre>`; unknown langs fall back to plain text. */
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
