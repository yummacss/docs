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
  badge?: string;
  isNew?: boolean;
  external?: boolean;
  isActive?: (pathname: string) => boolean;
}

const sidebarLinks: SidebarLink[] = [
  {
    title: "Documentation",
    href: "/docs/installation",
    icon: BookIcon,
    isActive: (pathname) =>
      pathname.startsWith("/docs") && pathname !== "/docs/core-package",
  },
  {
    title: "Core Package",
    href: "/docs/core-package",
    isNew: true,
    icon: AtomIcon,
    isActive: (pathname) => pathname === "/docs/core-package",
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
    isNew: true,
    isActive: (pathname) =>
      pathname.startsWith("/ui") &&
      !pathname.startsWith("/ui/templates") &&
      !["/ui/license", "/ui/privacy", "/ui/terms"].includes(pathname),
  },
  {
    title: "Templates",
    href: "/ui/templates",
    icon: SparkleIcon,
    isNew: true,
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
    <div className="d-g g-3 sm:g-2 w-fc h-fc">
      {sidebarLinks.map((link) => {
        const isActive = link.isActive?.(pathname) ?? false;
        const IconComponent = link.icon;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={`d-if ai-c g-4 ${isActive ? "" : "team"}`}
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
            {(link.isNew || link.badge) && (
              <span className="fs-xs px-2 py-1 bg-white/10 rad-2 c-white/70">
                {link.isNew ? "New" : link.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
