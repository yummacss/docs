export default {
  source: [
    "./src/**/*.{ts,tsx}",
    "./src/mdx-components.tsx",
    "./src/content/**/*.{md,mdx}",
  ],
  output: "./src/styles/out.css",
  buildOptions: {
    reset: true,
    minify: process.env.VERCEL_ENV === "production",
  },
};
