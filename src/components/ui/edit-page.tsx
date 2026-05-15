"use client";

import { FileTextIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EditPage() {
  const pathname = usePathname();
  let contentPath = pathname.replace(/\/$/, "");
  if (
    contentPath.startsWith("/ui/components/") &&
    contentPath !== "/ui/components"
  ) {
    contentPath = `/ui/${contentPath.replace(/^\/ui\/components\//, "")}`;
  }
  const url = `https://github.com/yummacss/docs/blob/release/src/content${contentPath}.mdx`;

  return (
    <Link
      href={url}
      className="d-if ai-c g-2 w-fc c-white/70 fs-sm td-none h:c-white fv:oc-white fv:ow-2"
    >
      <FileTextIcon className="w-4 h-4" />
      Edit this page
    </Link>
  );
}
