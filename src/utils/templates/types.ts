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
  checkoutUrl: string;
  cover: string;
  screenshots: string[];
}
