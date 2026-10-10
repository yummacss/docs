"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { YummaCSSMark } from "../icons/yummacss-mark";

/** The mark links home; a right-click opens the brand page, which is what someone right-clicking a logo is after. */
export default function HomeMark({ className }: { className: string }) {
  const router = useRouter();
  return (
    <Link
      href="/"
      onContextMenu={(event) => {
        event.preventDefault();
        router.push("/docs/brand");
      }}
      className="d:b w:fc fv:oc:ink fv:ow:2"
    >
      <YummaCSSMark className={className} />
    </Link>
  );
}
