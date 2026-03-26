"use client";

import { Pencil } from "@gravity-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EditPage() {
  const pathname = usePathname();
  const url = `https://github.com/yummacss/docs/blob/release/src/content${pathname.replace(/\/$/, "")}.mdx`;

  return (
    <Link
      href={url}
      className="d-if c-white/70 ai-c g-2 w-fc fs-sm td-none h:c-white fv:oc-white fv:ow-2"
    >
      <Pencil className="w-4 h-4" />
      Edit this page
    </Link>
  );
}
