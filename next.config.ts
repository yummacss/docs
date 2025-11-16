import createMDX from "@next/mdx";
import fs from "node:fs";
import rehypeExpressiveCode, { ExpressiveCodeTheme } from "rehype-expressive-code";
import remarkGfm from "remark-gfm";
import { redirects } from "./redirects";

// Load your saved theme JSONC file here and create a theme from it
const jsoncString = fs.readFileSync(new URL(`./src/theme.json`, import.meta.url), "utf-8");
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
      inlineMarkerBorderRadius: "0rem",
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
    return redirects;
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
