"use client";

import type { Icon } from "@phosphor-icons/react";
import {
  AtomIcon,
  BookIcon,
  FlaskIcon,
  NewspaperClippingIcon,
  SparkleIcon,
  StackSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLink {
  title: string;
  href: string;
  icon: Icon;
  external?: boolean;
  isActive?: (pathname: string) => boolean;
}

const sidebarLinks: SidebarLink[] = [
  {
    title: "Documentation",
    href: "/docs/installation",
    icon: BookIcon,
    isActive: (pathname) =>
      pathname.startsWith("/docs") && pathname !== "/docs/core-module",
  },
  {
    title: "Core Module",
    href: "/docs/core-module",
    icon: AtomIcon,
    isActive: (pathname) => pathname === "/docs/core-module",
  },
  {
    title: "Blog Articles",
    href: "/blog",
    icon: NewspaperClippingIcon,
    isActive: (pathname) => pathname.startsWith("/blog"),
  },
  {
    title: "Components",
    href: "/ui/components",
    icon: StackSimpleIcon,
    isActive: (pathname) =>
      pathname.startsWith("/ui") &&
      !pathname.startsWith("/ui/templates") &&
      !["/ui/license", "/ui/privacy", "/ui/terms"].includes(pathname),
  },
  {
    title: "Templates",
    href: "/ui/templates",
    icon: SparkleIcon,
    isActive: (pathname) =>
      pathname.startsWith("/ui/templates") ||
      ["/ui/license", "/ui/privacy", "/ui/terms"].includes(pathname),
  },
  {
    title: "Playground",
    href: "https://play.yummacss.com",
    icon: FlaskIcon,
    external: true,
  },
];

interface SidebarLinksProps {
  onLinkClick?: () => void;
}

export default function SidebarLinks({ onLinkClick }: SidebarLinksProps) {
  const pathname = usePathname();

  return (
    <div className="d-g g-3 w-full h-fc sm:g-2">
      {sidebarLinks.map((link) => {
        const isActive = link.isActive?.(pathname) ?? false;
        const IconComponent = link.icon;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={`d-if ai-c g-4 us-none fv:oc-white fv:oo-2 fv:ow-2 fv:os-s ${isActive ? "" : "team"}`}
            {...(link.external && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
          >
            <IconComponent
              className={isActive ? "c-white" : "c-white/50 t:c-white"}
              size={20}
              weight="duotone"
            />
            <span
              className={`fs-md ${isActive ? "c-white" : "c-white/70 t:c-white"}`}
            >
              {link.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
