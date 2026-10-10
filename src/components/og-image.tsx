import type { CSSProperties, ReactNode } from "react";
import { OG_MARKS } from "./og-marks";

// The link preview for every page: a light canvas, the product's mark, and one
// selected layer. Drawn by ImageResponse at 1200 by 630. NOTES.md, "OG images".

const PAGE = "#f7f8fb";
const PANEL = "#ffffff";
const RULE = "#e3e6ef";
const TICK = "#8b91a3";
const INK = "#14171f";
const MUTED = "#6b7180";
const ACCENT = "#4c5fc7";
const BAR = 28;
const LEFT = 84;

export type OgProduct = "css" | "ui";

export type OgSpec =
  | {
      // two lines with one word selected, for a product's home
      kind: "home";
      product: OgProduct;
      before: string;
      word: string;
      second: string;
    }
  | {
      // the page title selected, for docs pages and components without a picture
      kind: "title";
      product: OgProduct;
      title: string;
      description?: string;
      classes?: string[];
    }
  | {
      // a blog post: the mark and its title, nothing else
      kind: "post";
      product: OgProduct;
      title: string;
    }
  | {
      // the component itself selected, from its screenshot
      kind: "component";
      title: string;
      description?: string;
      image: string;
      width: number;
      height: number;
    };

const box = (
  left: number,
  top: number,
  width: number,
  height: number,
  style: CSSProperties = {},
): CSSProperties => ({
  position: "absolute",
  left,
  top,
  width,
  height,
  ...style,
});

function Rulers() {
  const ticks: ReactNode[] = [];
  for (let i = 40; i < 1200; i += 40) {
    const n = i % 200 ? 9 : 16;
    ticks.push(
      <div key={`x${i}`} style={box(i, BAR - n, 2, n, { background: TICK })} />,
    );
    if (i < 630)
      ticks.push(
        <div
          key={`y${i}`}
          style={box(BAR - n, i, n, 2, { background: TICK })}
        />,
      );
  }
  return (
    <>
      <div
        style={box(0, 0, 1200, BAR, {
          background: PANEL,
          borderBottom: `1.5px solid ${RULE}`,
        })}
      />
      <div
        style={box(0, 0, BAR, 630, {
          background: PANEL,
          borderRight: `1.5px solid ${RULE}`,
        })}
      />
      {ticks}
    </>
  );
}

const HANDLE = 16;
const handle = (left: string, top: string): CSSProperties => ({
  position: "absolute",
  left,
  top,
  width: HANDLE,
  height: HANDLE,
  marginLeft: -HANDLE / 2 - 1.5,
  marginTop: -HANDLE / 2 - 1.5,
  background: "#ffffff",
  border: `3px solid ${ACCENT}`,
});

/** A selected layer: an outline, eight handles and a tag above. */
function TagIcon({ kind }: { kind: "text" | "component" }) {
  return kind === "text" ? (
    <span style={{ fontWeight: 400 }}>T</span>
  ) : (
    <div
      style={{
        width: 10,
        height: 10,
        border: "2px solid #ffffff",
        transform: "rotate(45deg)",
      }}
    />
  );
}

function Selected({
  tag,
  kind = "text",
  pad,
  children,
}: {
  tag: string;
  kind?: "text" | "component";
  pad: number;
  children: ReactNode;
}) {
  const spots = [
    ["0%", "0%"],
    ["50%", "0%"],
    ["100%", "0%"],
    ["0%", "50%"],
    ["100%", "50%"],
    ["0%", "100%"],
    ["50%", "100%"],
    ["100%", "100%"],
  ];
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        padding: pad,
        border: `3px solid ${ACCENT}`,
      }}
    >
      {children}
      {spots.map(([x, y]) => (
        <div key={`${x}${y}`} style={handle(x, y)} />
      ))}
      <div
        style={{
          position: "absolute",
          left: -3,
          top: -54,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "3px 10px",
          borderRadius: 4,
          background: ACCENT,
          color: "#ffffff",
          fontFamily: "Quattro",
          fontSize: 18,
          whiteSpace: "nowrap",
        }}
      >
        <TagIcon kind={kind} />
        {tag}
      </div>
    </div>
  );
}

const cursor = (
  <svg width="28" height="32" viewBox="0 0 28 32" aria-hidden="true">
    <path
      d="M2 2 L2 26 L8.5 20 L13 30 L17.5 28 L13 18.5 L22 18.5 Z"
      fill={INK}
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

// Esteban's average advance is about half its size, so a title fits by length
const titleSize = (text: string, width: number, max: number) =>
  Math.min(max, Math.floor(width / (text.length * 0.52)));

function Home({ spec }: { spec: Extract<OgSpec, { kind: "home" }> }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: LEFT,
          top: 306,
          display: "flex",
          flexDirection: "column",
          fontFamily: "Esteban",
          fontSize: 124,
          lineHeight: 1.02,
          color: INK,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span>{spec.before}</span>
          <div style={{ display: "flex", position: "relative" }}>
            <Selected tag={spec.word} pad={0}>
              <span style={{ padding: "0 8px" }}>{spec.word}</span>
            </Selected>
            <div
              style={{
                position: "absolute",
                right: -26,
                bottom: -30,
                display: "flex",
              }}
            >
              {cursor}
            </div>
          </div>
        </div>
        <span>{spec.second}</span>
      </div>
    </>
  );
}

function Title({ spec }: { spec: Extract<OgSpec, { kind: "title" }> }) {
  return (
    <div
      style={{
        position: "absolute",
        left: LEFT,
        top: 300,
        display: "flex",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <div style={{ display: "flex" }}>
        <Selected tag={spec.title} pad={14}>
          <span
            style={{
              fontFamily: "Esteban",
              fontSize: titleSize(spec.title, 960, 124),
              lineHeight: 1,
              color: INK,
            }}
          >
            {spec.title}
          </span>
        </Selected>
      </div>
      {spec.description && (
        <div
          style={{
            display: "flex",
            fontFamily: "Quattro",
            fontSize: 30,
            color: MUTED,
            maxWidth: 1000,
          }}
        >
          {spec.description}
        </div>
      )}
      {spec.classes?.length ? (
        <div style={{ display: "flex", gap: 12 }}>
          {spec.classes.map((name) => (
            <div
              key={name}
              style={{
                display: "flex",
                padding: "6px 14px",
                border: `2px solid ${ACCENT}`,
                borderRadius: 6,
                background: "#ffffff",
                color: ACCENT,
                fontFamily: "Quattro",
                fontSize: 20,
              }}
            >
              {name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Component({ spec }: { spec: Extract<OgSpec, { kind: "component" }> }) {
  // the screenshot fills at most a 400 by 290 box on the right
  const scale = Math.min(400 / spec.width, 290 / spec.height, 2.2);
  const width = Math.round(spec.width * scale);
  const height = Math.round(spec.height * scale);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: LEFT,
          top: 290,
          display: "flex",
          flexDirection: "column",
          gap: 30,
          width: 580,
        }}
      >
        <span
          style={{
            fontFamily: "Esteban",
            fontSize: titleSize(spec.title, 560, 104),
            lineHeight: 1.1,
            color: INK,
          }}
        >
          {spec.title}
        </span>
        {spec.description && (
          <span
            style={{
              fontFamily: "Quattro",
              fontSize: 26,
              lineHeight: 1.4,
              color: MUTED,
            }}
          >
            {spec.description}
          </span>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 1116 - width - 34,
          top: Math.max(110, 340 - height / 2),
          display: "flex",
        }}
      >
        <Selected tag={spec.title} kind="component" pad={14}>
          {/* biome-ignore lint/performance/noImgElement: ImageResponse draws a plain img */}
          <img src={spec.image} width={width} height={height} alt="" />
        </Selected>
      </div>
    </>
  );
}

function Post({ spec }: { spec: Extract<OgSpec, { kind: "post" }> }) {
  // one line when it fits at 96 or more, else words wrapped at 96. The words
  // are their own boxes, since the renderer would break after a dash
  const one = Math.floor(1032 / (spec.title.length * 0.58));
  const size = Math.min(140, Math.max(96, one));
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "space-between",
        width: 1200,
        height: 630,
        padding: LEFT,
        background: PAGE,
      }}
    >
      <div style={{ display: "flex" }}>{OG_MARKS[spec.product](160)}</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "0.25em",
          maxWidth: 1032,
          fontFamily: "Esteban",
          fontSize: size,
          lineHeight: 1.05,
          color: INK,
        }}
      >
        {spec.title.split(" ").map((word, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: a title repeats words
          <span key={i}>{word}</span>
        ))}
      </div>
    </div>
  );
}

export default function OgImage({ spec }: { spec: OgSpec }) {
  if (spec.kind === "post") return <Post spec={spec} />;
  const product = spec.kind === "component" ? "ui" : spec.product;
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: 1200,
        height: 630,
        background: PAGE,
      }}
    >
      <Rulers />
      <div
        style={{ position: "absolute", left: LEFT, top: 64, display: "flex" }}
      >
        {OG_MARKS[product](140)}
      </div>
      {spec.kind === "home" && <Home spec={spec} />}
      {spec.kind === "title" && <Title spec={spec} />}
      {spec.kind === "component" && <Component spec={spec} />}
    </div>
  );
}
