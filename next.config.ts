import path from "node:path";
import createMDX from "@next/mdx";
import { redirects } from "./redirects";
import eclipsaTheme from "./src/themes/eclipsa.json";

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {
  // Pass the theme as a plain object
  themes: [eclipsaTheme],
  borderRadius: "0",
  styleOverrides: {
    borderRadius: "0",
    frames: {
      borderRadius: "0",
      shadowColor: "transparent",
      tooltipSuccessBackground: "hsla(233, 32%, 28%, 1.00)",
      // TODO: change copy icon color
    },
    textMarkers: {
      inlineMarkerBorderRadius: "0",
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
  options: {
    // Pass plugin names as strings for Turbopack compatibility
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      [path.resolve("src/plugins/rehype-registry.mjs"), {}],
      // The nested array structure is required to pass options
      // to a rehype plugin
      ["rehype-expressive-code", rehypeExpressiveCodeOptions],
    ],
  },
});

export default withMDX(nextConfig);
