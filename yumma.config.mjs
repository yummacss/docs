/** @type {import('@yummacss/nitro').Config} */
export default {
  source: [
    "./src/**/*.{ts,tsx}",
    "./src/registry/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}",
    "./src/mdx-components.tsx",
  ],
  output: "./src/styles/out.css",
  buildOptions: {
    reset: true,
    minify: process.env.VERCEL_ENV === "production",
  },
};
