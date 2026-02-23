"use client";

import { PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EditPage() {
  const pathname = usePathname();
  const url = `https://github.com/yummacss/yummacss-docs/blob/release/src/content${pathname.replace(/\/$/, "")}.mdx`;

  return (
    <Link
      href={url}
      className="d-if c-white/70 ai-c g-2 fs-sm td-none h:c-white fv:oc-white fv:ow-2"
    >
      <PencilSimpleIcon size={16} weight="duotone" />
      <span>Edit this page</span>
    </Link>
  );
}
