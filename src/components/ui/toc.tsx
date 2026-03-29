"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname changes trigger toc refresh
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3, main h2, main h3"),
    ).filter((element) => {
      return !element.closest("[data-meta]");
    });

    const items: TocItem[] = elements
      .filter((element) => element.id) // only include headings with IDs
      .map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.charAt(1)),
      }));

    setHeadings(items);

    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    elements.forEach((element) => {
      if (element.id) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="d-none bc-white/10 blw-1 lg:d-b lg:gc-s-3">
      <div
        className="p-st t-20 o-y-auto"
        style={{
          maxHeight: "calc(100vh - 3rem)",
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
            <div className="d-f fd-c g-3 mt-8 pt-8 bc-white/10 btw-1">
              <EditPage />
              {isBaseComponent && <ApiReference />}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
