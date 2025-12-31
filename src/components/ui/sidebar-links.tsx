"use client";

import {
  BookIcon,
  CubeIcon,
  GlobeSimpleIcon,
  NewspaperClippingIcon,
  SparkleIcon,
  StackSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinksProps {
  onLinkClick?: () => void;
}

export default function SidebarLinks({ onLinkClick }: SidebarLinksProps) {
  const pathname = usePathname();

  // check if we're on docs/* pages (excluding api-reference)
  const isDocsActive =
    pathname.startsWith("/docs") && pathname !== "/docs/api-reference";
  const isApiReferenceActive = pathname === "/docs/api-reference";
  const isComponentsActive =
    pathname.startsWith("/ui") && !pathname.startsWith("/ui/templates");

  return (
    <div className="d-g g-3 sm:g-2 w-fc h-fc">
      <Link
        href="/docs/installation"
        onClick={onLinkClick}
        className={`d-if ai-c g-4 ${isDocsActive ? "" : "team"}`}
      >
        <BookIcon
          className={`${isDocsActive ? "c-white" : "c-white/50 t:c-white"}`}
          size={20}
          weight="duotone"
        />
        <span
          className={`fs-md ${isDocsActive ? "c-white" : "c-white/70 t:c-white"}`}
        >
          Documentation
        </span>
      </Link>
      <Link href="/blog" onClick={onLinkClick} className="d-if ai-c g-4 team">
        <NewspaperClippingIcon
          className="c-white/50 t:c-white"
          size={20}
          weight="duotone"
        />
        <span className="fs-md c-white/70 t:c-white">Blog Articles</span>
      </Link>
      <Link
        href="/ui/components"
        onClick={onLinkClick}
        className={`d-if ai-c g-4 ${isComponentsActive ? "" : "team"}`}
      >
        <StackSimpleIcon
          className={`${isComponentsActive ? "c-white" : "c-white/50 t:c-white"}`}
          size={20}
          weight="duotone"
        />
        <span
          className={`fs-md ${isComponentsActive ? "c-white" : "c-white/70 t:c-white"}`}
        >
          Components
        </span>
      </Link>
      {/* <Link
        href="/ui/templates"
        onClick={onLinkClick}
        className={`d-if ai-c g-4 ${isTemplatesActive ? "" : "team"}`}
      >
        <SparkleIcon
          className={`${isTemplatesActive ? "c-white" : "c-white/50 t:c-white"}`}
          size={20}
          weight="duotone"
        />
        <span
          className={`fs-md ${isTemplatesActive ? "c-white" : "c-white/70 t:c-white"}`}
        >
          Templates
        </span>
      </Link> */}
      <Link
        href="/docs/api-reference"
        onClick={onLinkClick}
        className={`d-if ai-c g-4 ${isApiReferenceActive ? "" : "team"}`}
      >
        <GlobeSimpleIcon
          className={`${isApiReferenceActive ? "c-white" : "c-white/50 t:c-white"}`}
          size={20}
          weight="duotone"
        />
        <span
          className={`fs-md ${isApiReferenceActive ? "c-white" : "c-white/70 t:c-white"}`}
        >
          API Reference
        </span>
      </Link>
      <Link
        href="https://play.yummacss.com"
        onClick={onLinkClick}
        target="_blank"
        rel="noopener noreferrer"
        className="d-if ai-c g-4 team"
      >
        <CubeIcon
          className={`c-white/50 t:c-white`}
          size={20}
          weight="duotone"
        />
        <span className="fs-md c-white/70 t:c-white">Playground</span>
      </Link>
    </div>
  );
}
