import Link from "next/link";
import type { CSSProperties } from "react";
import { ver } from "@/utils/version";
import { YummaCSSDark } from "../icons/yummacss-dark";

// Esteban's widest digit and its dot, at 1em, so the display version is sized to
// the band it sits in rather than to a guess that only holds for 4.1.2.
const span = [...ver].reduce((w, c) => w + (c === "." ? 0.135 : 0.55), 0);

const COLUMNS = [
  {
    title: "Docs",
    links: [
      { label: "Installation", href: "/docs/installation" },
      { label: "Configuration", href: "/docs/configuration" },
      { label: "Customization", href: "/docs/colors" },
      { label: "Handbook", href: "/docs/naming-convention" },
      { label: "Variants", href: "/docs/media-queries" },
    ],
  },
  {
    title: "Yumma UI",
    links: [
      { label: "Installation", href: "/ui/installation" },
      { label: "Forms", href: "/ui/components/autocomplete" },
      { label: "Display", href: "/ui/components/accordion" },
      { label: "Interactive", href: "/ui/components/button" },
      { label: "Overlays", href: "/ui/components/alert-dialog" },
      { label: "Application UI", href: "/ui/components/empty-state" },
    ],
  },
  {
    title: "Updates",
    links: [
      {
        label: "Changelog",
        href: "https://github.com/yummacss/yummacss/blob/main/CHANGELOG.md",
      },
      {
        label: "Releases",
        href: "https://github.com/yummacss/yummacss/releases",
      },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "GitHub", href: "https://github.com/yummacss/yummacss" },
      { label: "Twitter", href: "https://x.com/yummacss" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="btw:1 bc:border bg:page">
      <div className="mx:auto px:6 docs-container">
        <div className="d:f fd:c g:12 pt:14 @lg:fd:r @lg:g:18">
          <div className="d:f fd:c g:5 @lg:w:80">
            <YummaCSSDark className="d:b w:10 h:10 c:ink" />

            <div className="d:f fd:c g:2">
              <p className="m:0 c:ink/60 fs:sm">
                An atomic CSS framework with fixed scales for spacing, colors,
                type and radius. No arbitrary values.
              </p>
              <p className="m:0 c:ink/40 fs:xs">
                MIT licensed &middot; &copy; {new Date().getFullYear()} Yumma
                CSS
              </p>
            </div>
          </div>

          <div className="d:g f:1 g:8 gtc:1 @sm:gtc:2 @lg:gtc:4">
            {COLUMNS.map((column) => (
              <div key={column.title} className="d:f fd:c g:4">
                <h3 className="c:ink/90 fs:xs ls:5 tt:u">{column.title}</h3>
                <ul className="d:f fd:c g:3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="c:ink/60 fs:sm td:none h:c:accent fv:oc:ink fv:ow:2"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt:12 footer-version-band"
          style={{ "--span": span } as CSSProperties}
        >
          <span aria-hidden="true" className="d:b footer-version">
            {ver}
          </span>
        </div>
      </div>
    </footer>
  );
}
