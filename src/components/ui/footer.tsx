import { allDocs } from "content-collections";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Github, Twitter } from "@/icons";
import { registryMeta } from "@/registry";
import { yummaVersion } from "@/utils/version";
import { YummaCSSDark } from "../icons/yummacss-dark";

// A utility page is one that renders a <Reference>; the rest are guides.
const utilities = allDocs.filter((doc) =>
  doc.content?.includes("<Reference"),
).length;
const components = Object.keys(registryMeta).length;

// Esteban's widest digit and its dot, at 1em, so the display version is sized to
// the band it sits in rather than to a guess that only holds for 4.1.2.
const span = [...yummaVersion].reduce(
  (w, c) => w + (c === "." ? 0.135 : 0.55),
  0,
);

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
      { label: "Overlays", href: "/ui/components/alert-dialog" },
      { label: "Application UI", href: "/ui/components/empty-state" },
      { label: "Playground", href: "https://play.yummacss.com" },
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
];

const MARKS = [
  {
    label: "Yumma CSS on GitHub",
    href: "https://github.com/yummacss/yummacss",
    Icon: Github,
  },
  {
    label: "Yumma CSS on Twitter",
    href: "https://x.com/yummacss",
    Icon: Twitter,
  },
];

export default function Footer() {
  return (
    <footer className="btw:1 bc:border bg:page">
      <div className="mx:auto px:6 docs-container">
        <div className="d:f fd:c g:12 pt:14 @lg:fd:r @lg:g:18">
          <div className="d:f fd:c g:5 @lg:w:80">
            <YummaCSSDark className="d:b w:10 h:10" />

            <div className="d:f fd:c g:2">
              <p className="m:0 c:white/60 fs:sm">
                An atomic CSS framework. One grammar for every class, and a
                codemod for the ones you already wrote.
              </p>
              <p className="m:0 c:white/40 fs:xs">
                {utilities} utilities &middot; {components} components
              </p>
            </div>
          </div>

          <div className="d:g f:1 g:8 gtc:1 @sm:gtc:3">
            {COLUMNS.map((column) => (
              <div key={column.title} className="d:f fd:c g:4">
                <h3 className="c:white/90 fs:xs ls:5 tt:u">{column.title}</h3>
                <ul className="d:f fd:c g:3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="c:white/60 fs:sm td:none h:c:accent fv:oc:white fv:ow:2"
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
            {yummaVersion}
          </span>
        </div>
      </div>

      <div className="btw:1 bc:border">
        <div className="d:f mx:auto ai:c jc:sb g:4 px:6 py:4 docs-container">
          <span className="c:white/40 fs:xs">
            MIT licensed &middot; &copy; {new Date().getFullYear()} Yumma CSS
          </span>

          <div className="d:f ai:c g:4">
            {MARKS.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="d:f c:white fv:oc:white fv:ow:2"
              >
                <Icon className="w:5 h:5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
