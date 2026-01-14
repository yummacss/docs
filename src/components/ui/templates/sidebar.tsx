"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { templates } from "@/utils/templates";
import SidebarLinks from "./sidebar-links";

export default function TemplatesSidebar() {
  const pathname = usePathname();

  return (
    <aside className="d-none lg:d-b lg:gc-s-3">
      <div
        className="p-st t-24 d-f fd-c g-8 o-y-auto"
        style={{
          maxHeight: "calc(100vh - 6rem)",
        }}
      >
        <SidebarLinks />

        <div className="d-f fd-c g-4">
          <h3 className="fs-md fw-400 tt-c ls-5 c-white">Templates</h3>
          <ul className="d-f ml-4 fd-c g-2">
            <li>
              <Link
                href="/ui/templates"
                className={`d-f ai-c g-3 fs-md ${
                  pathname === "/ui/templates"
                    ? "c-white"
                    : "c-white/70 h:c-white"
                }`}
              >
                Browse Templates
              </Link>
            </li>
            {templates.map((template) => {
              const href = `/ui/templates/${template.slug}`;
              const isActive = pathname === href;

              return (
                <li key={template.slug}>
                  <Link
                    href={href}
                    className={`d-f ai-c g-3 fs-md ${
                      isActive ? "c-white" : "c-white/70 h:c-white"
                    }`}
                  >
                    {template.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
