"use client";

import {
  BookOpen02Icon,
  GeometricShapes01Icon,
  Globe02Icon,
  LayerIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
  const isUIActive = pathname.startsWith("/ui");

  return (
    <div className="d-g g-2 w-fc h-fc">
      <Link
        href="/docs/installation"
        onClick={onLinkClick}
        className={`d-if ai-c g-4 ${isDocsActive ? "" : "team"}`}
      >
        <HugeiconsIcon
          icon={BookOpen02Icon}
          className={`d-4 ${isDocsActive ? "tc-white" : "tc-white/50 @h:tc-white"}`}
        />
        <span
          className={`fs-md ${isDocsActive ? "tc-white" : "tc-white/70 @h:tc-white"}`}
        >
          Documentation
        </span>
      </Link>
      <Link
        href="/ui/introduction"
        onClick={onLinkClick}
        rel="noopener noreferrer"
        className={`d-if ai-c g-4 ${isUIActive ? "" : "team"}`}
      >
        <HugeiconsIcon
          icon={LayerIcon}
          className={`d-4 ${isUIActive ? "tc-white" : "tc-white/50 @h:tc-white"}`}
        />
        <span
          className={`fs-md ${isUIActive ? "tc-white" : "tc-white/70 @h:tc-white"}`}
        >
          Components
        </span>
      </Link>
      <Link
        href="/docs/api-reference"
        onClick={onLinkClick}
        className={`d-if ai-c g-4 ${isApiReferenceActive ? "" : "team"}`}
      >
        <HugeiconsIcon
          icon={Globe02Icon}
          className={`d-4 ${isApiReferenceActive ? "tc-white" : "tc-white/50 @h:tc-white"}`}
        />
        <span
          className={`fs-md ${isApiReferenceActive ? "tc-white" : "tc-white/70 @h:tc-white"}`}
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
        <HugeiconsIcon
          icon={GeometricShapes01Icon}
          className={`d-4 tc-white/50 @h:tc-white`}
        />
        <span className="fs-md tc-white/70 @h:tc-white">Playground</span>
      </Link>
    </div>
  );
}
