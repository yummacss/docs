import path from "node:path";
import createMDX from "@next/mdx";
import { redirects } from "./redirects";
import eclipsa from "./src/themes/eclipsa.json";

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {
  themes: [eclipsa],
  borderRadius: "0",
  styleOverrides: {
    borderRadius: "0.15rem",
    frames: {
      borderRadius: "0",
      shadowColor: "transparent",
      tooltipSuccessBackground: "hsla(233, 32%, 28%, 1.00)",
      showCopyToClipboardButton: false,
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
  pageExtensions: ["tsx", "mdx"],
  async redirects() {
    return redirects;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      [path.resolve("src/plugins/rehype-registry.mjs"), {}],

      ["rehype-expressive-code", rehypeExpressiveCodeOptions],
    ],
  },
});

export default withMDX(nextConfig);
