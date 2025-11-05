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

  return (
    <div className="d-g g-2 w-fc h-fc">
      <div className="d-if ai-c g-4">
        <FileTextIcon className={isDocsActive ? "tc-white" : "tc-white/50"} />
        <Link
          className={`fs-md ${isDocsActive ? "tc-white" : "tc-white/70 h:tc-white"}`}
          href="/docs/installation"
          onClick={onLinkClick}
        >
          Documentation
        </Link>
      </div>
      <div className="d-if ai-c g-4">
        <GlobeIcon
          className={isApiReferenceActive ? "tc-white" : "tc-white/50"}
        />
        <Link
          className={`fs-md ${isApiReferenceActive ? "tc-white" : "tc-white/70 h:tc-white"}`}
          href="/docs/api-reference"
          onClick={onLinkClick}
        >
          API Reference
        </Link>
      </div>
      <div className="d-if ai-c g-4">
        <SwitchIcon className="tc-white/50" />
        <Link
          className="fs-md tc-white/70 h:tc-white"
          href="/ui/installation"
          onClick={onLinkClick}
          rel="noopener noreferrer"
        >
          Yumma UI
        </Link>
      </div>
      <div className="d-if ai-c g-4">
        <MixIcon className="tc-white/50" />
        <Link
          className="fs-md tc-white/70 h:tc-white"
          href="https://play.yummacss.com"
          onClick={onLinkClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          Playground
        </Link>
      </div>
    </div>
  );
}
