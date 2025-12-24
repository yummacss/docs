"use client";

import { PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EditPage() {
  const pathname = usePathname();
  const githubUrl = `https://github.com/yumma-lib/yumma-css-docs/blob/release/src/content${pathname.replace(/\/$/, "")}.mdx`;

  return (
    <div className="mt-8 pt-8 bt-1 bc-white/5">
      <Link
        href={githubUrl}
        className="d-f ai-c g-2 fs-sm tc-white/70 h:tc-white td-none"
      >
        <PencilSimpleIcon size={16} weight="duotone" />
        <span>Edit this page</span>
      </Link>
    </div>
  );
}
