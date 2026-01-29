"use client";

import Link from "next/link";

export default function TemplatesLegalSidebar() {
  return (
    <aside className="d-none lg:d-b lg:gc-s-3 blw-1 bc-white/5">
      <div
        className="p-st t-24 o-y-auto"
        style={{
          maxHeight: "calc(100vh - 6rem)",
        }}
      >
        <div className="px-8 pb-12">
          <h3 className="fs-md fw-400 tt-c mb-4 c-white">Useful Links</h3>
          <ul className="d-f fd-c g-3 fs-sm">
            <li>
              <Link href="/ui/license" className="c-white/70 h:c-white">
                License
              </Link>
            </li>
            <li>
              <Link href="/ui/privacy" className="c-white/70 h:c-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="https://discord.gg/yummacss"
                target="_blank"
                className="c-white/70 h:c-white"
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
