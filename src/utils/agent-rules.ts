import {
  colorTheme,
  mediaQueries,
  pseudoClasses,
  pseudoElements,
} from "@yummacss/core";

export const SITE = "https://yummacss.com";

/** The syntax, as `/llms.txt` and `/agents.md` both teach it. */
export const SYNTAX = [
  "- A class is property initials, a colon, value initials: `d:f` is `display: flex`, `jc:sb` is `justify-content: space-between`.",
  "- Numbers and scales keep their position: `p:4` is `padding: 1rem` (one step is 0.25rem), `fs:lg`, `fw:600`. `none` and `auto` stay whole: `d:none`.",
  "- Variants go first, each followed by a colon: `h:bg:indigo-7` on hover, `@md:d:f` from the md breakpoint, `b::c:indigo` on `::before`. They stack: `@sm:h:bg:red`.",
  "- Opacity follows a slash: `bg:red-5/50`. A negative value takes a minus after the colon: `ml:-4`.",
  "- There are no arbitrary values: `w:37px` is not a class. A value off the scale is a CSS function with no spaces: `max-h:calc(100dvh-5rem)`, `w:var(--width)`.",
  "- Yumma is a name, not a theme. There is no `yum-` prefix and no dash between property and value.",
];

const list = (
  items: readonly { prefix: string; value: string }[],
  before: string,
  after: string,
) =>
  items
    .map(({ prefix, value }) => `\`${before}${prefix}${after}\` ${value}`)
    .join(", ");

const breakpoints = mediaQueries.filter(({ value }) =>
  value.startsWith("@media (min-width"),
);
const containers = mediaQueries.filter(({ value }) =>
  value.startsWith("@container"),
);
const atRules = mediaQueries.filter(
  (query) => !breakpoints.includes(query) && !containers.includes(query),
);

/** The rules file a project adds for its coding agents, served at `/agents.md`. */
export function agentRules(): string {
  return [
    "# Yumma CSS",
    "",
    `This project styles with Yumma CSS (${SITE}). Write its classes, not another library's, and check them before you finish.`,
    "",
    "## Syntax",
    "",
    ...SYNTAX,
    "",
    "## Values",
    "",
    "- Spacing and sizing run from `0` to `384`, in steps of 0.25rem: `w:96` is `24rem`. Percentages and viewport units are values too: `w:100%`, `h:dvh`.",
    `- Colors: ${Object.keys(colorTheme).join(", ")}, plus \`white\`, \`black\` and \`transparent\`. Each has a base and twelve shades: \`1\` to \`6\` lighter, \`7\` to \`12\` darker, as in \`bg:indigo\`, \`bg:indigo-2\`, \`c:slate-10\`.`,
    `- Breakpoints, from that width up: ${list(breakpoints, "@", ":")}.`,
    `- Container queries, on a child of an element with \`ct:is\`: ${list(containers, "@", ":")}.`,
    `- Other at-rules: ${list(atRules, "@", ":")}.`,
    `- States: ${list(pseudoClasses, "", ":")}.`,
    `- Pseudo-elements: ${list(pseudoElements, "", "::")}.`,
    "- Colors, breakpoints and states the project adds live in `yumma.config.mjs` under `theme`. Read it before using a name that is not listed here.",
    "",
    "## Check",
    "",
    "- After editing classes, run `pnpm dlx yummacss lint`. It lists every class Yumma CSS does not generate, with the closest one that exists. Use the suggestion; do not keep a class it reports.",
    "- In a project that uses Oxlint, the `@yummacss/lint` rules report the same in the editor, and `no-inline-styles` names the class for a property set in `style`.",
    `- Every utility has a page named after its CSS property, as plain text: ${SITE}/docs/justify-content.md. The index is ${SITE}/llms.txt.`,
    "",
  ].join("\n");
}
