import { Chrome, Edge, Firefox, Safari } from "@ridemountainpig/svgl-react";
import { baselineFor } from "../utils/baseline";

const ICONS = {
  chrome: Chrome,
  edge: Edge,
  firefox: Firefox,
  safari: Safari,
} as const;

const TONE = {
  high: { text: "c:diff-add", bar: "bg:diff-add" },
  low: { text: "c:accent", bar: "bg:accent" },
  none: { text: "c:warning", bar: "bg:warning" },
} as const;

interface Props {
  path: string;
}

export default function Baseline({ path }: Props) {
  const baseline = baselineFor(path);
  if (!baseline) return null;

  const { level, label, browsers } = baseline;
  const tone = TONE[level || "none"];

  return (
    <div className="d:f fw:w ai:c jc:sb g:3 mb:6 py:3 px:4 bc:border bg:surface bw:1">
      <span className="d:f ai:c g:2 fs:sm">
        <code className={`ff:m ${tone.text}`}>baseline</code>
        <span className="c:ink/70">{label}</span>
      </span>
      <ul className="d:g gtc:4 g:1 w:100% @sm:w:auto">
        {browsers.map((browser) => {
          const Icon = ICONS[browser.key as keyof typeof ICONS];
          return (
            <li key={browser.key} className="d:f fd:c g:1 @sm:min-w:16">
              <span
                className={`d:f ai:c g:1 ff:m fs:xs ${browser.supported ? "c:ink/70" : "c:ink/40"}`}
              >
                <Icon
                  aria-label={browser.name}
                  className={`w:4 h:4 ${browser.supported ? "" : "fgr:100 o:50"}`}
                />
                {browser.version ?? "no"}
                {browser.desktopOnly && (
                  <span className="c:ink/40">desktop</span>
                )}
              </span>
              <span
                className={`h:1 ${browser.supported ? tone.bar : "bg:border"}`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
