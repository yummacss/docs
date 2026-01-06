"use client";

import Link from "next/link";

export default function TemplatesLegalSidebar() {
  return (
    <aside className="d-none lg:d-b lg:gc-s-3 blw-1 bc-white/5">
      <div
        className="p-st o-y-auto"
        style={{
          top: "6rem",
          maxHeight: "calc(100vh - 6rem)",
        }}
      >
        <div className="px-8">
          <h3 className="fs-md fw-400 tt-c mb-4 c-white">Useful Links</h3>
          <ul className="d-f fd-c g-3 fs-sm">
            <li>
              <Link href="#" className="c-white/70 h:c-white">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="#" className="c-white/70 h:c-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="c-white/70 h:c-white">
                Report Bug
              </Link>
            </li>
          </ul>

          <div className="mt-8 pt-6 btw-1 bc-white/10">
            <h3 className="fs-md fw-400 tt-c mb-4 c-white">Support</h3>
            <ul className="d-f fd-c g-3 fs-sm">
              <li>
                <Link
                  href="https://discord.gg/yummacss"
                  target="_blank"
                  className="c-white/70 h:c-white"
                >
                  Discord Community
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/yumma-css/yumma-css-docs/discussions"
                  target="_blank"
                  className="c-white/70 h:c-white"
                >
                  GitHub Discussions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
