"use client";

import { PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EditPage() {
  const pathname = usePathname();
  const url = `https://github.com/yumma-css/yumma-css-docs/blob/release/src/content${pathname.replace(/\/$/, "")}.mdx`;

  return (
    <div className="mt-8 pt-8 btw-1 bc-white/5">
      <Link
        href={url}
        className="d-f ai-c g-2 fs-sm c-white/70 h:c-white td-none"
      >
        <PencilSimpleIcon size={16} weight="duotone" />
        <span>Edit this page</span>
      </Link>
    </div>
  );
}
