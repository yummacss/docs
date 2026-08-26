import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { extractProperties } from "./src/utils/doc-properties";

const docsRedirects = [
  {
    source: "/docs",
    destination: "/docs/installation",
    permanent: true,
  },
  {
    source: "/docs/base-styles",
    destination: "/docs/normalize",
    permanent: true,
  },
  {
    source: "/docs/naming",
    destination: "/docs/naming-convention",
    permanent: true,
  },
  // IntelliSense retired; canon is the replacement.
  {
    source: "/docs/ide-support",
    destination: "/docs/canon",
    permanent: true,
  },
  {
    source: "/docs/intellisense",
    destination: "/docs/canon",
    permanent: true,
  },
  // Packages index split; send to installation.
  {
    source: "/docs/packages",
    destination: "/docs/installation",
    permanent: true,
  },
  {
    source: "/blog/yummacss-intellisense",
    destination: "/docs/canon",
    permanent: true,
  },
  {
    source: "/docs/colours",
    destination: "/docs/colors",
    permanent: true,
  },
  {
    source: "/docs/gtc",
    destination: "/docs/grid-template-columns",
    permanent: true,
  },
  {
    source: "/docs/gtr",
    destination: "/docs/grid-template-rows",
    permanent: true,
  },
];

const DOCS_DIR = join(process.cwd(), "src/content/docs");

/** Redirects for properties merged into a parent docs page. */
function mergedPageRedirects() {
  const files = readdirSync(DOCS_DIR).filter((f) => f.endsWith(".mdx"));
  const pages = new Set(files.map((f) => f.replace(/\.mdx$/, "")));

  return files.flatMap((file) => {
    const root = file.replace(/\.mdx$/, "");
    const content = readFileSync(join(DOCS_DIR, file), "utf8");
    return extractProperties(content)
      .filter(({ name }) => !pages.has(name))
      .map(({ name, anchor }) => ({
        source: `/docs/${name}`,
        destination: `/docs/${root}#${anchor}`,
        permanent: true,
      }));
  });
}

const mergedRedirects = mergedPageRedirects();

const RELEASE_TAG = "https://github.com/yummacss/yummacss/releases/tag";

/** Removed minor release posts redirect to their GitHub release tags. */
const removedReleasePosts = [
  "0.1.0",
  "1.1.0",
  "1.2.0",
  "2.1.0",
  "3.1.0",
  "3.2.0",
  "3.3.0",
  "3.4.0",
  "3.5.0",
  "3.6.0",
  "3.7.0",
  "3.9.0",
  "3.10.0",
  "3.11.0",
  "3.15.0",
  "3.16.0",
  "3.20.0",
  "3.21.0",
  "3.22.0",
  "3.23.0",
  "3.26.0",
];

const blogRedirects = [
  // `/blog/v0` -> release tag (post slug was `yummacss-0.1.0`).
  {
    source: "/blog/v0",
    destination: `${RELEASE_TAG}/v0.1.0`,
    permanent: true,
  },
  {
    source: "/blog/yummacss-1.0",
    destination: "/blog/yummacss-1.0.0",
    permanent: true,
  },
  {
    source: "/blog/v1",
    destination: `${RELEASE_TAG}/v1.2.0`,
    permanent: true,
  },
  {
    source: "/blog/yummacss-2.0",
    destination: "/blog/yummacss-2.0.0",
    permanent: true,
  },
  {
    source: "/blog/v2",
    destination: `${RELEASE_TAG}/v2.1.0`,
    permanent: true,
  },
  {
    source: "/blog/v3",
    destination: "/blog/yummacss-3.0.0",
    permanent: true,
  },
  {
    source: "/blog/yummacss-3.0",
    destination: "/blog/yummacss-3.0.0",
    permanent: true,
  },
  ...removedReleasePosts.map((version) => ({
    source: `/blog/yummacss-${version}`,
    destination: `${RELEASE_TAG}/v${version}`,
    permanent: true,
  })),
];

const uiRedirects = [
  {
    source: "/ui/theming",
    destination: "/ui/components/customization",
    permanent: true,
  },
  // `/ui/installation` is not a route; pages live under `/ui/components/`.
  {
    source: "/ui/components",
    destination: "/ui/components/installation",
    permanent: true,
  },
  {
    source: "/components",
    destination: "/ui/components/installation",
    permanent: true,
  },
  {
    source: "/ui",
    destination: "/ui/components/installation",
    permanent: true,
  },
  ...[
    "installation",
    "customization",
    "accordion",
    "autocomplete",
    "avatar",
    "button",
    "checkbox",
    "collapsible",
    "combobox",
    "context-menu",
    "dialog",
    "input",
    "menu",
    "menubar",
    "meter",
    "navigation-menu",
    "number-field",
    "popover",
    "preview-card",
    "progress",
    "radio",
    "select",
    "separator",
    "slider",
    "switch",
    "tabs",
    "toggle",
    "toolbar",
    "tooltip",
  ].map((slug) => ({
    source: `/ui/${slug}`,
    destination: `/ui/components/${slug}`,
    permanent: true,
  })),
];

export const redirects = [
  ...docsRedirects,
  ...mergedRedirects,
  ...blogRedirects,
  ...uiRedirects,
];
