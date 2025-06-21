export const sidebar = [
  {
    label: "Get Started",
    items: [
      { label: "Installation", link: "docs/installation" },
      { label: "First Steps", link: "docs/first-steps" },
      { label: "Color System", link: "docs/first-steps#color-system" },
      { label: "Upgrade Guide", link: "docs/upgrade-guide" },
      { label: "Playground", link: "https://play.yummacss.com" },
    ],
  },
  {
    label: "Base Styles",
    items: [{ label: "Stylecent", link: "docs/stylecent" }],
  },
  {
    label: "Backgrounds",
    autogenerate: { directory: "core/backgrounds" },
  },
  {
    label: "Borders & Outlines",
    items: [
      {
        label: "Borders",
        autogenerate: { directory: "core/borders-outlines/borders" },
      },
      {
        label: "Outlines",
        autogenerate: { directory: "core/borders-outlines/outlines" },
      },
    ],
  },
  {
    label: "Box Model",
    autogenerate: { directory: "core/box-model" },
  },
  {
    label: "Colors",
    autogenerate: { directory: "core/colors" },
  },
  {
    label: "Flexbox & Grid",
    items: [
      {
        label: "Flexbox",
        autogenerate: { directory: "core/flexbox-grid/flexbox" },
      },
      {
        label: "Grid",
        autogenerate: { directory: "core/flexbox-grid/grid" },
      },
    ],
  },
  {
    label: "Effects",
    autogenerate: { directory: "core/effects" },
  },
  {
    label: "Interactivity",
    autogenerate: { directory: "core/interactivity" },
  },
  {
    label: "Positioning",
    autogenerate: { directory: "core/positioning" },
  },
  {
    label: "Tables",
    autogenerate: { directory: "core/tables" },
  },
  {
    label: "SVG",
    autogenerate: { directory: "core/svg" },
  },
  {
    label: "Transforms",
    autogenerate: { directory: "core/transforms" },
  },
  {
    label: "Typography",
    items: [
      {
        label: "Font",
        autogenerate: { directory: "core/typography/font" },
      },
      {
        label: "Text",
        autogenerate: { directory: "core/typography/text" },
      },
    ],
  },
];
