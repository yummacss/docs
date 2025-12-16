import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import createMDX from "@next/mdx";
import { redirects } from "./redirects";
import eclipsaTheme from "./src/themes/eclipsa.json";

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {
  // Pass the theme as a plain object
  themes: [eclipsaTheme],
  borderRadius: "0rem",
  // Plugins must be at the root level, not inside styleOverrides
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  defaultProps: {
    // Disable line numbers by default
    showLineNumbers: false,
  },
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
  options: {
    // Pass plugin names as strings for Turbopack compatibility
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      // The nested array structure is required to pass options
      // to a rehype plugin
      ["rehype-expressive-code", rehypeExpressiveCodeOptions],
    ],
  },
});

export default withMDX(nextConfig);
