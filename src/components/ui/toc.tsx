"use client";

import { Separator } from "@base-ui/react";
import { allUis } from "content-collections";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ApiReference from "@/components/ui/api-reference";
import ChangelogLink from "@/components/ui/changelog-link";
import EditPage from "@/components/ui/edit-page";
import RssLink from "@/components/ui/rss-link";
import ViewMarkdown from "@/components/ui/view-markdown";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocItem[]>([]);
  // The listing and a post both live under /blog but want different footers,
  // so the trailing slash is what separates them.
  const isBlogIndex = pathname === "/blog";
  const isBlogPost = pathname?.startsWith("/blog/");
  let slug = (pathname || "").replace(/^\/ui\/components\//, "");
  slug = slug.replace(/^\/ui\//, "").replace(/\/$/, "");
  const currentUI = allUis.find((u) => u._meta.path === slug);

  // biome-ignore lint/correctness/useExhaustiveDependencies: need this useEffect to re-run this on route change to update the headings
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = Array.from(
        document.querySelectorAll("article h2, article h3, main h2, main h3"),
      ).filter((el) => !el.closest("[data-meta]") && el.id);

      const items: TocItem[] = elements.map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: Number(el.tagName.charAt(1)),
      }));

      setHeadings(items);
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="d-none bc-border blw-1 @lg:d-b @lg:gc-s-3">
      <div
        className="p-st t-20 oy-auto"
        style={{ maxHeight: "calc(100dvh - 5rem)" }}
      >
        <div className="px-8 pb-12">
          <h3 className="mb-4 c-silver-8 fs-xs fw-600 ls-2 tt-u">
            {isBlogIndex ? "Archive" : "On this page"}
          </h3>
          <ul className="d-f fd-c g-2 fs-sm">
            {headings.map((heading) => (
              <li key={heading.id}>
                <Link
                  href={`#${heading.id}`}
                  className={`c-foreground/70 h:c-foreground fv:oc-foreground fv:ow-2 ${heading.level === 3 ? "ml-4" : ""}`}
                >
                  {heading.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-f fd-c g-3 mt-8 pt-8">
            {isBlogIndex ? (
              <RssLink />
            ) : isBlogPost ? (
              <ChangelogLink />
            ) : (
              <>
                <EditPage />
                <ViewMarkdown />
                <Separator />
                {currentUI?.primitive && (
                  <ApiReference primitive={currentUI.primitive} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
