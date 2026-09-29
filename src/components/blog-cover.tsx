import type { CoverSpec } from "@/utils/cover";

// sampled from the covers drawn by hand, so a generated one sits beside them
const THEMES = {
  dark: { page: "#1a1d2e", ink: "#ffffff", tile: "#2a2d4c", edge: "#31365e" },
  light: { page: "#bec6f2", ink: "#21233e", tile: "#d3d8f7", edge: "#a9b2e6" },
};

const Yumma = () => (
  <svg
    aria-hidden="true"
    width="144"
    height="144"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="11" fill="#ffffff" />
    <path
      fill="#413cb8"
      d="M3 12C3 7 7 3 12 3C17 3 21 7 21 12C21 17 17 21 12 21C7 21 3 17 3 12ZM12 4.64C7.91 4.64 4.64 7.91 4.64 12C4.64 16.09 7.91 19.36 12 19.36C16.09 19.36 19.36 16.09 19.36 12C19.36 7.91 16.09 4.64 12 4.64ZM15.44 7.91C15.11 7.91 14.78 8.07 14.54 8.32L8.24 14.62C8.07 14.78 7.91 15.11 7.91 15.44C7.91 15.76 8.07 16.17 8.4 16.42C9.38 17.24 10.69 17.73 12 17.73C13.55 17.73 14.95 17.15 16.01 16.01C17.07 14.95 17.73 13.47 17.73 12C17.73 10.69 17.24 9.38 16.42 8.4C16.17 8.07 15.85 7.91 15.44 7.91Z"
    />
  </svg>
);

const MARKS = {
  "base-ui": (ink: string) => (
    <svg
      aria-hidden="true"
      width="102"
      height="144"
      viewBox="0 0 17 24"
      fill={ink}
    >
      <path d="M9.5 7.015A.477.477 0 0 0 9 7.5V23a8 8 0 0 0 .5-15.985ZM8 9.8V23c-4.418 0-8-3.94-8-8.8V1c4.418 0 8 3.94 8 8.8Z" />
    </svg>
  ),
};

/** The cover image for a post, drawn by `ImageResponse` at 1200 by 630. */
export default function BlogCover({ spec }: { spec: CoverSpec }) {
  const theme = THEMES[spec.theme];
  const frame = {
    display: "flex",
    width: "100%",
    height: "100%",
    background: theme.page,
    color: theme.ink,
    fontFamily: "Esteban",
  };

  if (spec.template === "release") {
    return (
      <div
        style={{
          ...frame,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 300,
        }}
      >
        {spec.text}
      </div>
    );
  }

  if (spec.template === "text") {
    return (
      <div
        style={{
          ...frame,
          alignItems: "flex-end",
          padding: 80,
          fontSize: 96,
          lineHeight: 1.05,
        }}
      >
        <div style={{ display: "flex", maxWidth: 900 }}>{spec.text}</div>
      </div>
    );
  }

  const tile = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 232,
    height: 232,
    borderRadius: 36,
    background: theme.tile,
    border: `2px solid ${theme.edge}`,
  };
  return (
    <div
      style={{
        ...frame,
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
      }}
    >
      <div style={tile}>
        <Yumma />
      </div>
      {spec.logos.map((name) => (
        <div key={name} style={tile}>
          {MARKS[name](spec.theme === "dark" ? "#ffffff" : theme.ink)}
        </div>
      ))}
    </div>
  );
}
