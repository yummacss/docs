/**
 * Parses the monorepo CHANGELOG.md into releases.
 *
 * Deliberately pure: it takes the file's contents as a string & never reads
 * from disk. `node:fs` in a module that anything client-side can reach is what
 * broke the docs build once already, so the read stays in the route that needs
 * it.
 *
 * The format is Keep a Changelog:
 *
 *   ## [3.29.2] - 2026-07-29
 *   ### Fixed
 *   - **[runtime]** Something was wrong.
 *
 *   [3.29.2]: https://github.com/yummacss/yummacss/compare/v3.29.1...v3.29.2
 */

export interface ChangelogGroup {
  /** "Added", "Changed", "Fixed" or "Removed". */
  title: string;
  entries: string[];
}

export interface Release {
  version: string;
  /** Absent on `[Unreleased]`. */
  date?: string;
  /** The compare or tag URL from the link definitions at the end of the file. */
  url?: string;
  groups: ChangelogGroup[];
}

const VERSION_HEADING = /^##\s+\[([^\]]+)\](?:\s+-\s+(\S+))?/;

// Two or three hashes. A group is normally `### Changed`, but 3.24.7 writes
// `## Changed`, & matching only `###` orphaned its single entry & dropped it.
// Version headings are tested first & always carry brackets, so they cannot be
// mistaken for a group.
const GROUP_HEADING = /^#{2,3}\s+(.+?)\s*$/;
const LIST_ITEM = /^-\s+(.*)$/;
const LINK_DEFINITION = /^\[([^\]]+)\]:\s*(\S+)/;

// One release is titled `### Fix` rather than `### Fixed`. Normalising here
// keeps the page from showing a group of one.
const GROUP_ALIASES: Record<string, string> = { Fix: "Fixed" };

export function parseChangelog(source: string): Release[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");

  const releases: Release[] = [];
  const urls = new Map<string, string>();

  let release: Release | null = null;
  let group: ChangelogGroup | null = null;

  for (const line of lines) {
    const link = line.match(LINK_DEFINITION);
    if (link) {
      urls.set(link[1], link[2]);
      continue;
    }

    const version = line.match(VERSION_HEADING);
    if (version) {
      release = { version: version[1], date: version[2], groups: [] };
      releases.push(release);
      group = null;
      continue;
    }

    if (!release) continue;

    const heading = line.match(GROUP_HEADING);
    if (heading) {
      const title = GROUP_ALIASES[heading[1]] ?? heading[1];
      group = release.groups.find((g) => g.title === title) ?? null;
      if (!group) {
        group = { title, entries: [] };
        release.groups.push(group);
      }
      continue;
    }

    const item = line.match(LIST_ITEM);
    if (item && group) {
      group.entries.push(item[1].trim());
      continue;
    }

    // A wrapped entry continues the previous one.
    if (line.trim() && group?.entries.length) {
      group.entries[group.entries.length - 1] += ` ${line.trim()}`;
    }
  }

  for (const entry of releases) {
    const url = urls.get(entry.version);
    if (url) entry.url = url;
  }

  // An empty `[Unreleased]` heading is bookkeeping, not a release.
  return releases.filter((r) => r.groups.length > 0);
}
