"use client";

import {
  FileTextIcon,
  GlobeIcon,
  MixIcon,
  SwitchIcon,
} from "@radix-ui/react-icons";
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
        <FileTextIcon
          className={
            isDocsActive ? "tc-white" : "tc-white/50 @h:tc-white"
          }
        />
        <span
          className={`fs-md ${isDocsActive ? "tc-white" : "tc-white/70 @h:tc-white"}`}
        >
          Documentation
        </span>
      </Link>
      <Link
        href="/docs/api-reference"
        onClick={onLinkClick}
        className={`d-if ai-c g-4 ${isApiReferenceActive ? "" : "team"}`}
      >
        <GlobeIcon
          className={
            isApiReferenceActive ? "tc-white" : "tc-white/50 @h:tc-white"
          }
        />
        <span
          className={`fs-md ${isApiReferenceActive ? "tc-white" : "tc-white/70 @h:tc-white"}`}
        >
          API Reference
        </span>
      </Link>
      <Link
        href="/ui/introduction"
        onClick={onLinkClick}
        rel="noopener noreferrer"
        className={`d-if ai-c g-4 ${isUIActive ? "" : "team"}`}
      >
        <SwitchIcon
          className={isUIActive ? "tc-white" : "tc-white/50 @h:tc-white"}
        />
        <span
          className={`fs-md ${isUIActive ? "tc-white" : "tc-white/70 @h:tc-white"}`}
        >
          Yumma UI
        </span>
      </Link>
      <Link
        href="https://play.yummacss.com"
        onClick={onLinkClick}
        target="_blank"
        rel="noopener noreferrer"
        className="d-if ai-c g-4 team"
      >
        <MixIcon className="tc-white/50 @h:tc-white" />
        <span className="fs-md tc-white/70 @h:tc-white">Playground</span>
      </Link>
    </div>
  );
}
