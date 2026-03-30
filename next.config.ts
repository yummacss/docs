import fs from "node:fs";
import path from "node:path";
import createMDX from "@next/mdx";
import { redirects } from "./redirects";

const eclipsa = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src/themes/eclipsa.json"), "utf8"),
);

const rehypePrettyCodeOptions = {
  theme: eclipsa,
  keepBackground: false,
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
      [path.resolve("src/plugins/rehype-meta-parser.mjs"), {}],
      ["rehype-pretty-code", rehypePrettyCodeOptions],
      [path.resolve("src/plugins/rehype-copy-button.mjs"), {}],
    ],
  },
});

export default withMDX(nextConfig);
