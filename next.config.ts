import fs from "node:fs";
import createMDX from "@next/mdx";
import rehypeExpressiveCode, {
  ExpressiveCodeTheme,
} from "rehype-expressive-code";
import remarkGfm from "remark-gfm";

// Load your saved theme JSONC file here and create a theme from it
const jsoncString = fs.readFileSync(
  new URL(`./src/theme.json`, import.meta.url),
  "utf-8",
);
const eclipsa = ExpressiveCodeTheme.fromJSONString(jsoncString);

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {
  // Pass the theme to the `themes` option
  // (consider adding a dark and light theme for accessibility)
  themes: [eclipsa],
  borderRadius: "0rem",
  styleOverrides: {
    borderRadius: "0rem",
    collapsibleSections: {
      openBackgroundColorCollapsible: "hsla(231, 73%, 77%, 0.050)",
      closedBackgroundColor: "hsla(231, 73%, 77%, 0.100)",
    },
    frames: {
      borderRadius: "0rem",
      shadowColor: "transparent",
    },
    textMarkers: {
      delBackground: "hsla(0, 48%, 77%, 0.100)",
      delHue: "hsl(0, 48%, 77%)",
      insBackground: "hsla(127, 48%, 77%, 0.150)",
      insHue: "hsl(127, 48%, 77%)",
      markBackground: "hsla(231, 73%, 77%, 0.100)",
      markHue: "hsl(231, 73%, 77%)",
    },
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      // Blog redirects
      {
        source: "/blog/v0",
        destination: "/blog/yummacss-0.1",
        permanent: true,
      },
      {
        source: "/blog/v1",
        destination: "/blog/yummacss-1.1",
        permanent: true,
      },
      {
        source: "/blog/v2",
        destination: "/blog/yummacss-2.1",
        permanent: true,
      },
      {
        source: "/blog/v3",
        destination: "/blog/yummacss-3.0",
        permanent: true,
      },
      // UI Component redirects
      {
        source: "/components",
        destination: "/ui/introduction",
        permanent: true,
      },
      {
        source: "/ui",
        destination: "/ui/introduction",
        permanent: true,
      },
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
      {
        source: "/docs/cli",
        destination: "/docs/configuration",
        permanent: true,
      },
      {
        source: "/docs/config",
        destination: "/docs/configuration",
        permanent: true,
      },
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
        source: "/docs/dimension",
        destination: "/docs/dimensions",
        permanent: true,
      },
      {
        source: "/docs/dev-api",
        destination: "/docs/api-reference",
        permanent: true,
      },
      {
        source: "/docs/guides/react",
        destination: "/docs/installation",
        permanent: true,
      },
      // Framework guides
      {
        source: "/docs/guides/nextjs",
        destination: "/docs/installation",
        permanent: true,
      },
      {
        source: "/docs/guides/preact",
        destination: "/docs/installation",
        permanent: true,
      },
      {
        source: "/docs/guides/vue",
        destination: "/docs/installation",
        permanent: true,
      },
      {
        source: "/docs/guides/nuxtjs",
        destination: "/docs/installation",
        permanent: true,
      },
      {
        source: "/docs/guides/angular",
        destination: "/docs/installation",
        permanent: true,
      },
      {
        source: "/docs/guides/astro",
        destination: "/docs/installation",
        permanent: true,
      },
      {
        source: "/docs/guides/qwik",
        destination: "/docs/installation",
        permanent: true,
      },
      {
        source: "/docs/guides/solid",
        destination: "/docs/installation",
        permanent: true,
      },
      {
        source: "/docs/guides/svelte",
        destination: "/docs/installation",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      // The nested array structure is required to pass options
      // to a rehype plugin
      [rehypeExpressiveCode, rehypeExpressiveCodeOptions],
    ],
  },
});

export default withMDX(nextConfig);
