import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import createMDX from "@next/mdx";
import { redirects } from "./redirects";
import eclipsaTheme from "./src/themes/eclipsa.json";

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {
  // Pass the theme as a plain object
  themes: [eclipsaTheme],
  borderRadius: "0",
  // Plugins must be at the root level, not inside styleOverrides
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  defaultProps: {
    // Change the default style of collapsible sections
    collapseStyle: "collapsible-start",
    // Disable line numbers by default
    showLineNumbers: false,
  },
  styleOverrides: {
    borderRadius: "0",
    collapsibleSections: {
      closedBackgroundColor: "hsla(231, 73%, 77%, 0.100)",
      openBackgroundColorCollapsible: "hsla(231, 73%, 77%, 0.050)",
    },
    frames: {
      borderRadius: "0",
      inlineButtonBackground: "#ffffff",
      inlineButtonBackgroundActiveOpacity: "0.3",
      inlineButtonBackgroundHoverOrFocusOpacity: "0.2",
      inlineButtonBackgroundIdleOpacity: "0",
      inlineButtonBorder: "#ffffff",
      inlineButtonBorderOpacity: "0.4",
      inlineButtonForeground: "#ffffff",
      shadowColor: "transparent",
      tooltipSuccessBackground: "#31365e",
      tooltipSuccessForeground: "white",
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
      // The nested array structure is required to pass options
      // to a rehype plugin
      ["rehype-expressive-code", rehypeExpressiveCodeOptions],
    ],
  },
});

export default withMDX(nextConfig);
