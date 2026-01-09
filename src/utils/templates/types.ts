// Template Support Resources

export interface TemplateSupport {
  title: string;
  url: string;
}

// Template Features

export interface TemplateFeature {
  id: string;
  title: string;
  description: string;
}

// Template Stack

export interface TemplateStackItem {
  id: string;
  title: string;
  version: string;
}

// Template Page & Framework

export interface TemplatePage {
  path: string;
  title: string;
}

export interface TemplateFramework {
  name: string;
  version?: string;
}

// Template Status

export type TemplateStatus = "available" | "coming-soon";

// Template Interface

export interface Template {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  status: TemplateStatus;
  templateVersion: string;
  frameworks: TemplateFramework[];
  stack: string[];
  version: string;
  pages: TemplatePage[];
  previewUrl: string;
  purchaseUrl: string;
  cover: string;
  screenshots: string[];
}
