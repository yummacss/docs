import type { Icon } from "@phosphor-icons/react";
import {
  ArticleIcon,
  FileIcon,
  HouseIcon,
  PasswordIcon,
  PhoneIcon,
} from "@phosphor-icons/react/dist/ssr";
import { templates } from "./templates";

// Page Icon Mapping

export const pageIconMap: Record<string, Icon> = {
  Home: HouseIcon,
  "404": FileIcon,
  "404 page": FileIcon,
  About: FileIcon,
  Services: FileIcon,
  Work: FileIcon,
  Portfolio: FileIcon,
  Pricing: FileIcon,
  Process: FileIcon,
  Blog: ArticleIcon,
  Article: ArticleIcon,
  Contact: PhoneIcon,
  "Sign In": PasswordIcon,
  "Sign Up": PasswordIcon,
};

export function getPageIcon(title: string): Icon {
  return pageIconMap[title] || FileIcon;
}

// Template Support Resources

export const templateSupportResources = [
  { title: "Discord", url: "https://discord.gg/yummacss" },
  { title: "Refund Policy", url: "/ui/license#refund-policy" },
  {
    title: "Report Template",
    url: "https://github.com/yumma-css/yumma-css-docs/issues/new",
  },
];

// Helper Functions

export function getTemplateBySlug(slug: string) {
  return templates.find((t) => t.slug === slug);
}

export function getAllTemplateSlugs(): string[] {
  return templates.map((t) => t.slug);
}

export function getSingleProjectUrl(slug: string): string {
  const template = getTemplateBySlug(slug);
  return template?.checkout.singleProject || "#";
}

export function getUnlimitedProjectsUrl(slug: string): string {
  const template = getTemplateBySlug(slug);
  return template?.checkout.unlimitedProjects || "#";
}
