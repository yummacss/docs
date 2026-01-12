import type { Template } from "./types";

export const templates: Template[] = [
  // Neutra
  {
    slug: "neutra",
    name: "Neutra",
    tagline: "Design Agency",
    description:
      "This template is designed for agencies and studios, and it showcases a minimal grayscale theme.",
    price: 19,
    status: "available",
    stack: [
      "Next.js 16.1",
      "React 19.2",
      "Yumma CSS 3.7",
      "pnpm 10.27",
      "TypeScript 5.0",
    ],
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
    checkout: {
      singleProject:
        "#",
      unlimitedProjects:
        "#",
    },
    cover: "/img/templates/neutra/preview.png",
    screenshots: [
      "/img/templates/neutra/home.png",
      "/img/templates/neutra/pricing.png",
      "/img/templates/neutra/process.png",
      "/img/templates/neutra/work.png",
    ],
  },
  // Blueprint
  {
    slug: "Blueprint",
    name: "Blueprint",
    tagline: "Developer Portfolio",
    description:
      "A dark, code-focused portfolio template for developers and engineers.",
    price: 19,
    status: "coming-soon",
    stack: [
      "Next.js 16.1",
      "React 19.2",
      "Yumma CSS 3.7",
      "pnpm 10.27",
      "TypeScript 5.0",
    ],
    pages: [],
    previewUrl: "#",
    checkout: {
      singleProject: "#",
      unlimitedProjects: "#",
    },
    cover: "/img/templates/placeholder.png",
    screenshots: [],
  },
  // Solar
  {
    slug: "Solar",
    name: "Solar",
    tagline: "SaaS Landing",
    description:
      "A bright, conversion-focused landing page for SaaS products and startups.",
    price: 19,
    status: "coming-soon",
    stack: [
      "Next.js 16.1",
      "React 19.2",
      "Yumma CSS 3.7",
      "pnpm 10.27",
      "TypeScript 5.0",
    ],
    pages: [],
    previewUrl: "#",
    checkout: {
      singleProject: "#",
      unlimitedProjects: "#",
    },
    cover: "/img/templates/placeholder.png",
    screenshots: [],
  },
  // Aria
  {
    slug: "Aria",
    name: "Aria",
    tagline: "Documentation",
    description:
      "A clean documentation template for open source projects and developer tools.",
    price: 19,
    status: "coming-soon",
    stack: [
      "Next.js 16.1",
      "React 19.2",
      "Yumma CSS 3.7",
      "pnpm 10.27",
      "TypeScript 5.0",
    ],
    pages: [],
    previewUrl: "#",
    checkout: {
      singleProject: "#",
      unlimitedProjects: "#",
    },
    cover: "/img/templates/placeholder.png",
    screenshots: [],
  },
];
