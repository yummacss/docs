"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  slug: string;
  title: string;
  updated?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface NavSection {
  title: string;
  entries: (NavItem | NavGroup)[];
}

interface Props {
  sections: NavSection[];
  basePath: string;
}

export default function SidebarNav({ sections, basePath }: Props) {
  const pathname = usePathname();

  return (
    <aside className="d-none @lg:d-b @lg:gc-s-3">
      <div
        className="d-f p-st t-20 oy-auto fd-c g-8 pb-12"
        style={{ maxHeight: "calc(100dvh - 5rem)" }}
      >
        {sections.map((section) => (
          <div key={section.title} className="d-f fd-c g-3">
            <h3 className="c-silver-8 fs-xs fw-600 ls-2 tt-u">
              {section.title}
            </h3>
            <ul className="d-f fd-c g-2">
              {section.entries.map((entry) => {
                if ("slug" in entry) {
                  const href = `${basePath}/${entry.slug}`;
                  const isActive = pathname === href;
                  return (
                    <li key={entry.slug}>
                      <Link
                        href={href}
                        className={`d-if ai-c g-3 fs-sm us-none fv:oc-white fv:oo-2 fv:ow-2 ${isActive ? "c-white fw-600" : "c-white/70 h:c-white"}`}
                      >
                        {entry.title}
                        {entry.updated && (
                          <span className="w-2 h-2 ml-auto bg-accent" />
                        )}
                      </Link>
                    </li>
                  );
                }

                const group = entry as NavGroup;
                return (
                  <li key={group.title} className="d-f fd-c g-2">
                    <span className="c-silver-9 fs-sm">{group.title}</span>
                    <ul className="d-f fd-c g-1">
                      {group.items.map((child) => {
                        const href = `${basePath}/${child.slug}`;
                        const isActive = pathname === href;
                        return (
                          <li key={child.slug}>
                            <Link
                              href={href}
                              className={`d-if ai-c g-3 fs-sm us-none fv:oc-white fv:oo-2 fv:ow-2 ${isActive ? "c-white fw-600" : "c-white/70 h:c-white"}`}
                            >
                              {child.title}
                              {child.updated && (
                                <span className="w-2 h-2 ml-auto bg-accent" />
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
