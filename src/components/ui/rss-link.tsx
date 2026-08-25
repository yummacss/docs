import { RssFeed } from "iconoir-react";
import Link from "next/link";

export default function RssLink() {
  return (
    <Link
      href="/blog/rss.xml"
      className="d-if ai-c g-2 w-fc c-accent-dim fs-sm td-none h:c-accent fv:oc-accent fv:ow-2"
    >
      <RssFeed className="w-4 h-4" />
      RSS feed
    </Link>
  );
}
