export const redirects = [
  // Docs redirects
  {
    source: "/docs/colours",
    destination: "/docs/colors",
    permanent: true,
  },
  {
    source: "/docs/bottom-left-right-top",
    destination: "/docs/top-right-bottom-left",
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
    destination: "/docs/dimension",
    permanent: true,
  },
  {
    source: "/resources",
    destination: "/docs/installation",
    permanent: true,
  },
  {
    source: "/docs/dev-api",
    destination: "/docs/api-reference",
    permanent: true,
  },
  {
    source: "/docs/utility-classes",
    destination: "/docs/styling-elements",
    permanent: true,
  },
  ...[
    "/docs/api-reference",
    "/docs/core-package",
    "/docs/core-library",
    "/docs/core-module",
    "/docs/core-integration",
    "/docs/integration",
  ].map((source) => ({
    source,
    destination: "/docs/core-api",
    permanent: true,
  })),
  {
    source: "/docs/top-right-bottom-left",
    destination: "/docs/top",
    permanent: true,
  },

  // Framework guides
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
  // Blog redirects
  {
    source: "/blog/v0",
    destination: "/blog/yummacss-0.1",
    permanent: true,
  },
  {
    source: "/blog/v1",
    destination: "/blog/yummacss-1.2.0",
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
    source: "/blog/api-1.0.0",
    destination: "/blog/yummacss-api",
    permanent: true,
  },
  // Yumma UI redirects
  {
    source: "/components",
    destination: "/ui/components",
    permanent: true,
  },
];
