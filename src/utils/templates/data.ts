import type { Icon } from "@phosphor-icons/react";
import {
  ArticleIcon,
  BuildingOfficeIcon,
  FileDashedIcon,
  HouseIcon,
  LinkBreakIcon,
  PackageIcon,
  PasswordIcon,
  PhoneIcon,
  UserCircleDashedIcon,
} from "@phosphor-icons/react/dist/ssr";
import { templates } from "./templates";

// Page Icon Mapping

export const pageIconMap: Record<string, Icon> = {
  Home: HouseIcon,
  "404": LinkBreakIcon,
  "404 page": LinkBreakIcon,
  About: UserCircleDashedIcon,
  Services: PackageIcon,
  Work: BuildingOfficeIcon,
  Portfolio: FileDashedIcon,
  Pricing: FileDashedIcon,
  Process: FileDashedIcon,
  Blog: ArticleIcon,
  Article: ArticleIcon,
  Contact: PhoneIcon,
  "Sign In": PasswordIcon,
  "Sign Up": PasswordIcon,
};

export function getPageIcon(title: string): Icon {
  return pageIconMap[title] || FileDashedIcon;
}

// Template Support Resources

export const templateSupportResources = [
  { title: "Discord", url: "https://discord.gg/yummacss" },
  { title: "Refund Policy", url: "/ui/license#refund-policy" },
  {
    title: "Report Template",
    url: "https://github.com/yummacss/yummacss-docs/issues/new",
  },
];

// Helper Functions

export function getTemplateBySlug(slug: string) {
  return templates.find((t) => t.slug === slug);
}

export function getAllTemplateSlugs(): string[] {
  return templates.map((t) => t.slug);
}

export function getCheckoutUrl(slug: string): string {
  const template = getTemplateBySlug(slug);
  return template?.checkoutUrl || "#";
}
