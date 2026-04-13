"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ApiReference from "@/components/ui/api-reference";
import EditPage from "@/components/ui/edit-page";
import { findCurrentUIPageInfo } from "@/utils/ui-sidebar";

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
  const uiPageInfo = findCurrentUIPageInfo(pathname || "");
  const isBaseComponent = uiPageInfo?.sectionTitle === "Base components";

  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function updateHeadings() {
      const elements = Array.from(
        document.querySelectorAll("article h2, article h3, main h2, main h3"),
      ).filter((element) => !element.closest("[data-meta]"));

      const items: TocItem[] = elements
        .filter((element) => element.id)
        .map((element) => ({
          id: element.id,
          text: element.textContent || "",
          level: Number(element.tagName.charAt(1)),
        }));

      setHeadings((prev) => {
        const prevJson = JSON.stringify(prev);
        const nextJson = JSON.stringify(items);
        if (prevJson === nextJson) return prev;

        // Only rewire the IntersectionObserver when headings actually changed
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

          for (const element of elements) {
            if (element.id) {
              intersectionObserverRef.current.observe(element);
            }
          }
        }

        return items;
      });
    }

    updateHeadings();

    const mutationObserver = new MutationObserver(() => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(updateHeadings, 100);
    });

    const mainElement = document.querySelector("main") || document.body;
    mutationObserver.observe(mainElement, {
      childList: true,
      subtree: true,
      // characterData removed — fired on every text node change, too aggressive
    });

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      mutationObserver.disconnect();
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="d-none bc-white/10 blw-1 lg:d-b lg:gc-s-3">
      <div
        className="p-st t-20 oy-auto"
        style={{
          maxHeight: "calc(100dvh - 5rem)",
        }}
      >
        <div className="px-8 pb-12">
          <h3 className="mb-4 c-silver-8 fs-xs fw-600 ls-2 tt-u">
            On this page
          </h3>
          <ul className="d-f fd-c g-2 fs-sm">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;

              return (
                <li
                  key={heading.id}
                  className={heading.level === 3 ? "ml-4" : ""}
                >
                  <Link
                    href={`#${heading.id}`}
                    className={`fv:oc-white fv:ow-2 ${isActive ? "c-white" : "c-white/70 h:c-white"}`}
                  >
                    {heading.text}
                  </Link>
                </li>
              );
            })}
          </ul>
          {!isBlogPost && (
            <div className="d-f fd-c g-3 mt-8 pt-8">
              <EditPage />
              {isBaseComponent && <ApiReference />}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}