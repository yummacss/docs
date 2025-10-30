"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // getting all h2 and h3 headings from the main content, excluding frontmatter
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3, main h2, main h3"),
    ).filter((element) => {
      // we exclude headings that are inside the frontmatter
      return !element.closest("[data-frontmatter]");
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

    // intersection Observer for active heading
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
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="lg:gc-s-3 bl-1 bc-white/5">
      <div
        className="p-st o-y-auto"
        style={{
          top: "6rem",
          maxHeight: "calc(100vh - 6rem)",
          paddingTop: "2rem",
        }}
      >
        <div className="px-8">
          <h3 className="fs-sm fw-400 tt-u mb-3 tc-white">On this page</h3>
          <ul className="d-f fd-c ml-4 g-2 fs-sm">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;

              return (
                <li
                  key={heading.id}
                  className={heading.level === 3 ? "ml-4" : ""}
                >
                  <a
                    href={`#${heading.id}`}
                    className={isActive ? "tc-white" : "tc-white/70 h:tc-white"}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
