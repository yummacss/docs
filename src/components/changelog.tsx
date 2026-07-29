import { ArrowUpRight } from "iconoir-react";
import { GitHub } from "@/components/icons/icons";

const CHANGELOG_URL =
  "https://github.com/yummacss/yummacss/blob/main/CHANGELOG.md";

interface Props {
  /**
   * Names the release in the card title, e.g. "3.0.0".
   *
   * Not used to build an anchor. Keep a Changelog headings read
   * `## [3.0.0] - 2025-04-14`, so the GitHub fragment carries the release
   * date too & cannot be derived from the version alone. Linking the file
   * lands the reader on a document already ordered by release.
   */
  version?: string;
  children?: React.ReactNode;
}

export default function Changelog({ version, children }: Props) {
  return (
    <a
      href={CHANGELOG_URL}
      target="_blank"
      rel="noreferrer"
      className="d-f ai-c g-4 my-6 p-4 bc-border bg-surface bw-1 td-none h:bc-accent-dim fv:oc-white fv:ow-2 tp-c tdu-150 ttf-io"
    >
      <span className="d-f ai-c jc-c fs-0 w-10 h-10">
        <GitHub className="w-5 h-5" />
      </span>

      <span className="d-f fd-c g-1">
        <span className="c-white fw-500">
          {version ? `Everything in ${version}` : "The full changelog"}
        </span>
        <span className="c-white/60 fs-sm">
          {children ??
            "Every addition, change, removal & fix, kept per release in the monorepo changelog."}
        </span>
      </span>

      <ArrowUpRight className="fs-0 w-5 h-5 ml-auto c-white/40" />
    </a>
  );
}
