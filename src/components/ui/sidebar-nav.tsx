"use client";

import { ArrowUpRight } from "iconoir-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  slug: string;
  title: string;
}

/** A route rather than a content page, so it carries its own href. */
interface NavLink {
  title: string;
  href: string;
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
  links?: NavLink[];
}

export default function SidebarNav({ sections, basePath, links }: Props) {
  const pathname = usePathname();

  return (
    <aside className="d-none @lg:d-b @lg:gc-s-3">
      <div
        // 146 links come to roughly 5.7 screens in this window, so the nav is
        // its own scroll region. `ob-c` keeps reaching its end from scrolling
        // the page underneath it.
        className="d-f p-st t-20 oy-auto ob-c fd-c g-8 pb-12"
        style={{ maxHeight: "calc(100dvh - 5rem)" }}
      >
        {sections.map((section) => (
          <div key={section.title} className="d-f fd-c g-3">
            <h3 className="c-silver-8 fs-xs ls-2 tt-u">{section.title}</h3>
            <ul className="d-f fd-c g-2">
              {section.entries.map((entry) => {
                if ("slug" in entry) {
                  const href = `${basePath}/${entry.slug}`;
                  const isActive = pathname === href;
                  return (
                    <li key={entry.slug}>
                      <Link
                        href={href}
                        className={`d-if ai-c g-3 fs-sm us-none fv:oc-foreground fv:oo-2 fv:ow-2 ${isActive ? "c-accent td-u tds-d" : "c-foreground/70 h:c-accent"}`}
                      >
                        {entry.title}
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
                              className={`d-if ai-c g-3 fs-sm us-none fv:oc-foreground fv:oo-2 fv:ow-2 ${isActive ? "c-accent td-u tds-d" : "c-foreground/70 h:c-accent"}`}
                            >
                              {child.title}
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

        {links && links.length > 0 && (
          <div className="d-f fd-c g-3">
            <h3 className="c-silver-8 fs-xs ls-2 tt-u">Resources</h3>
            <ul className="d-f fd-c g-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="d-if ai-c g-2 c-foreground/70 fs-sm us-none h:c-accent fv:oc-foreground fv:oo-2 fv:ow-2"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 c-foreground/40" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
