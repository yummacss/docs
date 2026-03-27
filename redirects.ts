const docsRedirects = [
  {
    source: "/docs/colours",
    destination: "/docs/colors",
    permanent: true,
  },
  ...["/docs/cli", "/docs/config"].map((source) => ({
    source,
    destination: "/docs/configuration",
    permanent: true,
  })),
  {
    source: "/docs/migration-guide",
    destination: "/docs/upgrading",
    permanent: true,
  },
  {
    source: "/docs/text-color",
    destination: "/docs/color",
    permanent: true,
  },
  {
    source: "/docs/dimensions",
    destination: "/docs/upgrading#removed-utilities",
    permanent: true,
  },
  {
    source: "/docs/spacing",
    destination: "/docs/upgrading#removed-utilities",
    permanent: true,
  },
  {
    source: "/resources",
    destination: "/docs/installation",
    permanent: true,
  },
  {
    source: "/docs/utility-classes",
    destination: "/docs/styling-elements",
    permanent: true,
  },
  {
    source: "/docs/code-editor",
    destination: "/docs/ide-support",
    permanent: true,
  },
  {
    source: "/docs/top-right-bottom-left",
    destination: "/docs/top",
    permanent: true,
  },
];

const frameworkRedirects = [
  ...[
    "react",
    "nextjs",
    "preact",
    "vue",
    "nuxtjs",
    "angular",
    "astro",
    "qwik",
    "solid",
    "svelte",
  ].map((framework) => ({
    source: `/docs/guides/${framework}`,
    destination: "/docs/installation",
    permanent: true,
  })),
];

const blogRedirects = [
  {
    source: "/blog/code-editor",
    destination: "/blog/intellisense",
    permanent: true,
  },
  {
    source: "/blog/v0",
    destination: "/blog/yummacss-0.1",
    permanent: true,
  },
  {
    source: "/blog/yummacss-1.0",
    destination: "/blog/yummacss-1.0.0",
    permanent: true,
  },
  {
    source: "/blog/v1",
    destination: "/blog/yummacss-1.2.0",
    permanent: true,
  },
  {
    source: "/blog/yummacss-2.0",
    destination: "/blog/yummacss-2.0.0",
    permanent: true,
  },
  {
    source: "/blog/v2",
    destination: "/blog/yummacss-2.1.0",
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
  {
    source: "/blog/api-1.0.0",
    destination: "/blog/yummacss-api",
    permanent: true,
  },
];

const uiRedirects = [
  {
    source: "/ui/theming",
    destination: "/ui/customization",
    permanent: true,
  },
  {
    source: "/components",
    destination: "/ui/components",
    permanent: true,
  },
  {
    source: "/ui",
    destination: "/ui/components",
    permanent: true,
  },
];

export const redirects = [
  ...docsRedirects,
  ...frameworkRedirects,
  ...blogRedirects,
  ...uiRedirects,
];
