"use client";

import Link from "next/link";

export default function TemplatesLegalSidebar() {
  return (
    <aside className="d-none bc-white/10 blw-1 lg:d-b lg:gc-s-3">
      <div
        className="p-st t-20 o-y-auto"
        style={{
          maxHeight: "calc(100vh - 3rem)",
        }}
      >
        <div className="px-8 pb-12">
          <h3 className="mb-4 c-white fs-md fw-400 tt-c">Useful Links</h3>
          <ul className="d-f fd-c g-3 fs-sm">
            <li>
              <Link
                href="/ui/license"
                className="c-white/70 h:c-white fv:oc-indigo-4 fv:ow-2"
              >
                License
              </Link>
            </li>
            <li>
              <Link
                href="/ui/privacy"
                className="c-white/70 h:c-white fv:oc-indigo-4 fv:ow-2"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="https://discord.gg/yummacss"
                target="_blank"
                className="c-white/70 h:c-white fv:oc-indigo-4 fv:ow-2"
              >
                Discord Community
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
