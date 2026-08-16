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
  // IntelliSense was retired 2026-08-16; canon covers the validation half.
  // `/docs/ide-support` already redirected here, so leaving it pointed at the
  // deleted page would have turned an existing permanent redirect into a 404.
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

const RELEASE_TAG = "https://github.com/yummacss/yummacss/releases/tag";

/**
 * Release posts for minor versions were removed - the changelog & the GitHub
 * release for each tag already carry that content, and maintaining a post per
 * minor was not worth the time.
 *
 * Each one redirects to its own release rather than to a generic listing, so a
 * bookmarked link still lands on the notes it pointed at. Every tag below is
 * verified to exist.
 */
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
  // `/blog/v0` pointed at `/blog/yummacss-0.1`, which never existed - the file
  // was `yummacss-0.1.0`. It now resolves to that version's release.
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
  {
    source: "/ui/components",
    destination: "/ui/installation",
    permanent: true,
  },
  {
    source: "/components",
    destination: "/ui/installation",
    permanent: true,
  },
  {
    source: "/ui",
    destination: "/ui/installation",
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

export const redirects = [...docsRedirects, ...blogRedirects, ...uiRedirects];
