export default {
  source: ["./src/**/*.{md,mdx}", "./src/content/docs/get-started/framework-guides.mdx", "./src/components/**/*.astro", "./src/layouts/**/*.astro"],
  output: "./src/styles/out.css",
  buildOptions: {
    reset: false,
    minify: process.env.VERCEL_ENV === "production",
  },
};
