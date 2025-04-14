export default {
  // prettier-ignore
  source: [
    "./src/content/docs/**/*.{mdx,md}",
    "./src/components/**/*.astro",
    "./src/layouts/**/*.astro"
  ],
  output: "./src/styles/yumma.css",
  buildOptions: {
    reset: false,
    minify: false,
  },
};
