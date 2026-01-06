export interface TemplatePage {
  path: string;
  title: string;
}

export interface TemplateFramework {
  name: string;
  version?: string;
}

export interface Template {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  templateVersion: string;
  frameworks: TemplateFramework[];
  stack: string[];
  version: string;
  pages: TemplatePage[];
  pageCount: number;
  previewUrl: string;
  purchaseUrl: string;
  screenshots: string[];
}

export interface License {
  name: string;
  price: number;
  currency: string;
  features: string[];
}

export const licenses: License[] = [
  {
    name: "Personal",
    price: 19,
    currency: "EUR",
    features: [
      "Use in one commercial or personal project",
      "Modify code freely",
      "Use inside a client project",
      "Lifetime use",
      "Lifetime updates",
    ],
  },
  {
    name: "Commercial",
    price: 49,
    currency: "EUR",
    features: [
      "Use in unlimited projects",
      "Use commercially",
      "Modify code freely",
      "Lifetime use",
      "Lifetime updates",
    ],
  },
];

export const templates: Template[] = [
  {
    slug: "neutra",
    name: "Neutra",
    tagline: "Simple yet modern landing page",
    description:
      "A clean, minimal landing page template with a navbar, rating section, call-to-action, and logo section. Perfect for SaaS products, apps, or any modern web project.",
    price: 19,
    currency: "EUR",
    templateVersion: "1.0.0",
    frameworks: [
      { name: "Next.js", version: "16" },
      { name: "React", version: "19" },
    ],
    stack: ["Next.js 16", "React 19", "Yumma CSS 3", "Phosphor Icons"],
    version: "3.7.0",
    pageCount: 8,
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
    previewUrl: "#",
    purchaseUrl: "#",
    screenshots: [
      "/img/templates/neutra/home.png",
      "/img/templates/neutra/pricing.png",
      "/img/templates/neutra/process.png",
      "/img/templates/neutra/work.png",
    ],
  },
];

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getAllTemplateSlugs(): string[] {
  return templates.map((t) => t.slug);
}
