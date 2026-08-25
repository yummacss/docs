import { RssFeed } from "iconoir-react";
import Link from "next/link";

export default function RssLink() {
  return (
    <Link
      href="/blog/rss.xml"
      className="d-if ai-c g-2 w-fc c-foreground/70 fs-sm td-none h:c-foreground fv:oc-foreground fv:ow-2"
    >
      <RssFeed className="w-4 h-4" />
      RSS feed
    </Link>
  );
}
