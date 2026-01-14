// Template Features

export interface TemplateFeature {
  id: string;
  title: string;
  description: string;
}

// Template Page

export interface TemplatePage {
  path: string;
  title: string;
}

// Template Checkout URLs per license type

export interface TemplateCheckout {
  singleProject: string;
  unlimitedProjects: string;
}

// Template Interface

export interface Template {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  stack: string[];
  pages: TemplatePage[];
  previewUrl: string;
  checkout: TemplateCheckout;
  cover: string;
  screenshots: string[];
}
