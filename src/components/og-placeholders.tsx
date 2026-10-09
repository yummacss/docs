import type { CSSProperties, ReactNode } from "react";

// Wireframes for the component link previews: a handful of shapes stand in for
// every component, so nothing has to be screenshotted. NOTES.md, "OG images".

const SURFACE = "#ffffff";
const BORDER = "#e3e6ef";
const BAR = "#dfe3f9";
const SOFT = "#eef0fc";
const ACCENT = "#4c5fc7";

const bar = (width: number, height = 19, background = BAR): CSSProperties => ({
  width,
  height,
  borderRadius: height / 2,
  background,
});

const panel = (style: CSSProperties = {}): CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  background: SURFACE,
  border: `2px solid ${BORDER}`,
  borderRadius: 19,
  ...style,
});

const Button = ({ primary = true, width = 150 }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width,
      height: 52,
      borderRadius: 12,
      background: primary ? ACCENT : SURFACE,
      border: primary ? "none" : `2px solid ${BORDER}`,
    }}
  >
    <div style={bar(width * 0.45, 12, primary ? "#c3caf0" : BAR)} />
  </div>
);

export const PLACEHOLDERS = {
  button: () => <Button width={270} />,
  field: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 19, width: 459 }}
    >
      <div style={bar(148)} />
      <div
        style={panel({
          height: 81,
          justifyContent: "center",
          padding: "0 20px",
          border: `2px solid ${ACCENT}`,
        })}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={bar(122, 19, "#c3caf0")} />
          <div style={{ width: 2, height: 38, background: ACCENT }} />
        </div>
      </div>
    </div>
  ),
  list: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 14, width: 432 }}
    >
      <div
        style={panel({
          height: 76,
          justifyContent: "center",
          padding: "0 20px",
        })}
      >
        <div style={bar(162)} />
      </div>
      <div style={panel({ padding: 14, gap: 5 })}>
        {[202, 162, 230, 135].map((width, i) => (
          <div
            key={width}
            style={{
              display: "flex",
              alignItems: "center",
              height: 62,
              padding: "0 14px",
              borderRadius: 11,
              background: i === 0 ? SOFT : "transparent",
            }}
          >
            <div style={bar(width, 19, i === 0 ? "#9aa6ec" : BAR)} />
          </div>
        ))}
      </div>
    </div>
  ),
  dialog: () => (
    <div style={panel({ width: 486, padding: 38, gap: 22 })}>
      <div style={bar(230, 24, "#9aa6ec")} />
      <div style={bar(392)} />
      <div style={bar(310)} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 16,
          marginTop: 14,
        }}
      >
        <Button primary={false} width={148} />
        <Button width={148} />
      </div>
    </div>
  ),
  choice: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 27 }}>
      {[true, false, true].map((on, i) => (
        <div
          key={`${i}${on}`}
          style={{ display: "flex", alignItems: "center", gap: 22 }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: on ? ACCENT : SURFACE,
              border: on ? "none" : `2px solid ${BORDER}`,
            }}
          />
          <div style={bar([216, 176, 256][i])} />
        </div>
      ))}
    </div>
  ),
  switch: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 27 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: 130,
          height: 70,
          padding: 8,
          borderRadius: 35,
          background: ACCENT,
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 27,
            background: SURFACE,
          }}
        />
      </div>
      <div style={bar(202)} />
    </div>
  ),
  progress: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 22, width: 486 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={bar(176)} />
        <div style={bar(68)} />
      </div>
      <div
        style={{
          display: "flex",
          height: 22,
          borderRadius: 11,
          background: BAR,
        }}
      >
        <div
          style={{
            width: "64%",
            height: 22,
            borderRadius: 11,
            background: ACCENT,
          }}
        />
      </div>
    </div>
  ),
  avatars: () => (
    <div style={{ display: "flex" }}>
      {["#9aa6ec", "#6b7cd8", "#4c5fc7", "#c3caf0"].map((color, i) => (
        <div
          key={color}
          style={{
            width: 119,
            height: 119,
            borderRadius: 59,
            marginLeft: i ? -30 : 0,
            background: color,
            border: `5px solid ${SURFACE}`,
          }}
        />
      ))}
    </div>
  ),
  group: () => (
    <div style={panel({ flexDirection: "row", padding: 8, gap: 8 })}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 130,
            height: 68,
            borderRadius: 12,
            background: i === 1 ? SOFT : "transparent",
          }}
        >
          <div style={bar(70, 16, i === 1 ? "#9aa6ec" : BAR)} />
        </div>
      ))}
    </div>
  ),
  card: () => (
    <div style={panel({ width: 459, padding: 38, gap: 22 })}>
      <div
        style={{ width: 76, height: 76, borderRadius: 19, background: SOFT }}
      />
      <div style={bar(243, 24, "#9aa6ec")} />
      <div style={bar(364)} />
      <div style={bar(284)} />
    </div>
  ),
} satisfies Record<string, () => ReactNode>;

export type Placeholder = keyof typeof PLACEHOLDERS;

// a component without an entry draws the card
const SHAPES: Record<string, Placeholder> = {
  button: "button",
  "file-upload": "card",
  field: "field",
  "number-field": "field",
  "otp-field": "field",
  textarea: "field",
  autocomplete: "list",
  combobox: "list",
  "context-menu": "list",
  menu: "list",
  menubar: "list",
  select: "list",
  accordion: "list",
  "alert-dialog": "dialog",
  dialog: "dialog",
  drawer: "dialog",
  popover: "dialog",
  onboarding: "dialog",
  checkbox: "choice",
  "checkbox-group": "choice",
  radio: "choice",
  switch: "switch",
  toggle: "switch",
  meter: "progress",
  progress: "progress",
  slider: "progress",
  avatar: "avatars",
  "avatar-stack": "avatars",
  "button-group": "group",
  "toggle-group": "group",
  tabs: "group",
  toolbar: "group",
  breadcrumb: "group",
};

export const placeholderFor = (slug: string): Placeholder =>
  SHAPES[slug] ?? "card";
