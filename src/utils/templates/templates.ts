import type { Template } from "./types";

export const templates: Template[] = [
  // Neutra
  {
    slug: "neutra",
    name: "Neutra",
    tagline: "Design Agency",
    description:
      "This template is designed for agencies and studios, and it showcases a minimal grayscale theme.",
    price: 6,
    stack: ["Next.js 16.1", "React 19.2", "Yumma CSS 3.7"],
    pages: [
      { path: "/src/app/page.tsx", title: "Home" },
      { path: "/src/app/about/page.tsx", title: "About" },
      { path: "/src/app/services/page.tsx", title: "Services" },
      { path: "/src/app/work/page.tsx", title: "Work" },
      { path: "/src/app/portfolio/page.tsx", title: "Portfolio" },
      { path: "/src/app/pricing/page.tsx", title: "Pricing" },
      { path: "/src/app/process/page.tsx", title: "Process" },
      { path: "/src/app/not-found.tsx", title: "404 page" },
    ],
    previewUrl: "https://neutra.yummacss.com/",
    checkoutUrl:
      "https://buy.polar.sh/polar_cl_ix7aUTxqMXOmYG2DT38aC1XS5bEWzjN5mteDs02H30E",
    cover: "/templates/neutra/preview.png",
    screenshots: [
      "/templates/neutra/home.png",
      "/templates/neutra/pricing.png",
      "/templates/neutra/process.png",
      "/templates/neutra/work.png",
    ],
  },
];
