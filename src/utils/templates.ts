export interface TemplateFeature {
  title: string;
  description: string;
}

export interface TemplateBadge {
  label: string;
  variant: "default" | "success" | "warning";
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
  yummacssVersion: string;
  features: TemplateFeature[];
  badges: TemplateBadge[];
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
    yummacssVersion: "3.6.2",
    features: [
      {
        title: "Responsive Navbar",
        description: "Mobile-friendly navigation with smooth animations",
      },
      {
        title: "Rating Section",
        description: "Showcase social proof with star ratings",
      },
      {
        title: "Call-to-Action",
        description: "Eye-catching CTA section to convert visitors",
      },
      {
        title: "Logo Section",
        description: "Display trusted brands and partners",
      },
      {
        title: "Dark & Light Variants",
        description: "Includes both colorful and grayscale versions",
      },
      {
        title: "Fully Customizable",
        description: "Easy to modify colors, content, and layout",
      },
    ],
    badges: [
      { label: "SEO", variant: "default" },
      { label: "WCAG-AA", variant: "success" },
      { label: "SSR-ready", variant: "default" },
    ],
    previewUrl: "#",
    purchaseUrl: "#",
    screenshots: ["/templates/neutra-01.png", "/templates/neutra-02.png"],
  },
];

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getAllTemplateSlugs(): string[] {
  return templates.map((t) => t.slug);
}
