export default {
  source: ["./src/content/docs/**/*.{md,mdx}", "./src/components/**/*.astro", "./src/layouts/**/*.astro"],
  output: "./src/styles/out.css",
  buildOptions: {
    reset: false,
    minify: process.env.VERCEL_ENV === "production",
  },
};
