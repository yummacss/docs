import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Github, Page } from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";
import { parseChangelog, type Release } from "@/utils/changelog";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "Every Yumma CSS release, with what was added, changed, fixed & removed.",
};

/**
 * The changelog is copied in from the monorepo by the update-yummacss workflow
 * on every release, so this reads a local file rather than fetching at build
 * time. Nothing here reaches the client graph, which is why the `node:fs`
 * import is safe.
 */
function releases(): Release[] {
  const path = join(process.cwd(), "src/data/changelog.md");
  return parseChangelog(readFileSync(path, "utf-8"));
}

const BOLD = /\*\*([^*]+)\*\*/;
const LINK = /\[([^\]]+)\]\(([^)]+)\)/;

/**
 * A run of backticks opens a code span that closes on a run of the same length,
 * which is how CommonMark lets a code span contain a backtick. One changelog
 * entry relies on it: ``{`...`}``. Matching a single pair instead would split
 * that in the wrong place & leave stray backticks on the page.
 */
const CODE = /(`+)([\s\S]*?)\1/;

type Piece = { at: number; length: number; node: React.ReactNode };

/** Renders the inline markdown the changelog uses: bold, code & links. */
function inline(text: string, keyPrefix = ""): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let rest = text;
  let index = 0;

  while (rest) {
    const key = `${keyPrefix}-${index++}`;
    const found: Piece[] = [];

    const bold = rest.match(BOLD);
    if (bold?.index !== undefined) {
      found.push({
        at: bold.index,
        length: bold[0].length,
        node: (
          <strong key={key} className="c-white fw-600">
            {bold[1]}
          </strong>
        ),
      });
    }

    const code = rest.match(CODE);
    if (code?.index !== undefined) {
      found.push({
        at: code.index,
        length: code[0].length,
        node: (
          <code key={key} className="c-code fs-md ff-m">
            {code[2]}
          </code>
        ),
      });
    }

    const link = rest.match(LINK);
    if (link?.index !== undefined) {
      found.push({
        at: link.index,
        length: link[0].length,
        node: (
          <a
            key={key}
            href={link[2]}
            target="_blank"
            rel="noreferrer"
            className="c-accent h:td-u fv:oc-white fv:ow-2"
          >
            {link[1]}
          </a>
        ),
      });
    }

    if (found.length === 0) {
      nodes.push(rest);
      break;
    }

    const next = found.reduce((a, b) => (a.at <= b.at ? a : b));

    if (next.at > 0) nodes.push(rest.slice(0, next.at));
    nodes.push(next.node);

    rest = rest.slice(next.at + next.length);
  }

  return nodes;
}

function formatDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Added & Removed borrow the diff colours the code blocks already use, so the
 * palette says the same thing in both places. Changed & Fixed stay neutral:
 * colouring all four would make every release a rainbow & mean nothing.
 */
const GROUP_COLORS: Record<string, string> = {
  Added: "c-diff-add",
  Removed: "c-diff-remove",
};

export default function ReleasesPage() {
  const all = releases();

  return (
    <div className="py-20">
      <header className="mb-16">
        <h1 className="mb-3 c-white fs-4xl fw-400 lh-1 ff-e @lg:fs-5xl">
          Releases
        </h1>
        <p className="mb-6 c-white/70 fs-lg lh-5">
          Every Yumma CSS release, newest first.
        </p>
        <div className="d-f ai-c g-4 fw-w">
          <Link
            href="/releases.md"
            className="d-if ai-c g-2 c-white/70 fs-sm td-none h:c-white fv:oc-white fv:ow-2"
          >
            <Page className="w-4 h-4" />
            View as markdown
          </Link>
          <a
            href="https://github.com/yummacss/yummacss/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noreferrer"
            className="d-if ai-c g-2 c-white/70 fs-sm td-none h:c-white fv:oc-white fv:ow-2"
          >
            <Github className="w-4 h-4" />
            Full changelog
          </a>
        </div>
      </header>

      <div className="d-f fd-c">
        {all.map((release, index) => {
          const date = formatDate(release.date);
          const isLatest = index === 0;

          return (
            <section
              key={release.version}
              className="d-f p-r g-6 pb-10 bc-border blw-1"
            >
              {/* Square marker rather than a dot: every angle on this site is sharp. */}
              <span className="p-a t-1 bg-accent-dim w-2 h-2 ml--1" />

              <div className="d-f fd-c g-4 pl-6 w-100%">
                <div className="d-f fd-c g-2">
                  {date && <span className="c-white/50 fs-sm">{date}</span>}
                  <div className="d-f ai-c g-3 fw-w">
                    <h2
                      id={release.version}
                      className="c-white fs-xxl fw-400 lh-1 ff-e"
                    >
                      {release.url ? (
                        <a
                          href={release.url}
                          target="_blank"
                          rel="noreferrer"
                          className="c-white td-none h:c-accent fv:oc-white fv:ow-2"
                        >
                          {release.version}
                        </a>
                      ) : (
                        release.version
                      )}
                    </h2>
                    {isLatest && (
                      <span className="px-2 py-1 bc-accent-dim/50 bg-accent-dim/10 c-accent bw-1 fs-xs ls-2 tt-u">
                        Latest
                      </span>
                    )}
                  </div>
                </div>

                <div className="d-f fd-c g-5 p-6 bc-border bg-surface bw-1">
                  {release.groups.map((group) => (
                    <div key={group.title} className="d-f fd-c g-3">
                      <h3
                        className={`fs-xs ls-2 tt-u ${GROUP_COLORS[group.title] ?? "c-silver-8"}`}
                      >
                        {group.title}
                      </h3>
                      <ul className="d-f fd-c g-3">
                        {group.entries.map((entry) => (
                          <li
                            key={entry.slice(0, 80)}
                            className="c-white/80 fs-sm lh-5"
                          >
                            {inline(entry, release.version)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
