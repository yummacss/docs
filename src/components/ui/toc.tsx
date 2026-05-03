"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ApiReference from "@/components/ui/api-reference";
import EditPage from "@/components/ui/edit-page";
import { findCurrentUIItemBySlug } from "@/utils/ui-sidebar";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const isBlogPost = pathname?.startsWith("/blog");
  const currentItem = findCurrentUIItemBySlug(pathname || "");

  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  // Re-scan headings whenever the route changes.
  // Small delay lets Next.js finish rendering the new page before we query the DOM.
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
      setActiveId("");

      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }

      if (items.length > 0) {
        intersectionObserverRef.current = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                setActiveId(entry.target.id);
              }
            }
          },
          { rootMargin: "0% 0% -80% 0%" },
        );

        for (const el of elements) {
          intersectionObserverRef.current.observe(el);
        }
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="d-none bc-white/10 blw-1 lg:d-b lg:gc-s-3">
      <div
        className="p-st t-20 oy-auto"
        style={{ maxHeight: "calc(100dvh - 5rem)" }}
      >
        <div className="px-8 pb-12">
          <h3 className="mb-4 c-silver-8 fs-xs fw-600 ls-2 tt-u">
            On this page
          </h3>
          <ul className="d-f fd-c g-2 fs-sm">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={heading.level === 4 ? "ml-4" : ""}
              >
                <Link
                  href={`#${heading.id}`}
                  className={`fv:oc-white fv:ow-2 ${activeId === heading.id ? "c-white" : "c-white/70 h:c-white"}`}
                >
                  {heading.text}
                </Link>
              </li>
            ))}
          </ul>
          {!isBlogPost && (
            <div className="d-f fd-c g-3 mt-8 pt-8">
              <EditPage />
              {currentItem?.primitive && <ApiReference />}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
