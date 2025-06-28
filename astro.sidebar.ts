export const sidebar = [
  {
    label: "Documentation",
    link: "docs/installation",
    icon: "open-book",
    items: [
      { label: "Get started", items: ["docs/installation", "docs/first-steps", "docs/upgrade-guide"] },
      { label: "Base styles", autogenerate: { directory: "core/base-styles" } },
      { label: "Backgrounds", autogenerate: { directory: "core/backgrounds" } },
      {
        label: "Borders & Outlines",
        items: [
          { label: "Borders", autogenerate: { directory: "core/borders-outlines/borders" } },
          { label: "Outlines", autogenerate: { directory: "core/borders-outlines/outlines" } },
        ],
      },
      { label: "Box model", autogenerate: { directory: "core/box-model" } },
      { label: "Colors", autogenerate: { directory: "core/colors" } },
      {
        label: "Flexbox & Grid",
        items: [
          { label: "Flexbox", autogenerate: { directory: "core/flexbox-grid/flexbox" } },
          { label: "Grid", autogenerate: { directory: "core/flexbox-grid/grid" } },
        ],
      },
      { label: "Effects", autogenerate: { directory: "core/effects" } },
      { label: "Interactivity", autogenerate: { directory: "core/interactivity" } },
      { label: "Positioning", autogenerate: { directory: "core/positioning" } },
      { label: "Tables", autogenerate: { directory: "core/tables" } },
      { label: "SVG", autogenerate: { directory: "core/svg" } },
      { label: "Transforms", autogenerate: { directory: "core/transforms" } },
      {
        label: "Typography",
        items: [
          { label: "Font", autogenerate: { directory: "core/typography/font" } },
          { label: "Text", autogenerate: { directory: "core/typography/text" } },
        ],
      },
    ],
  },
  {
    label: "Components",
    link: "ui/installation",
    icon: "puzzle",
    badge: "SOON",
    items: [
      { label: "Get Started", autogenerate: { directory: "core-ui/get-started" } },
      { label: "Essentials", autogenerate: { directory: "core-ui/essentials" } },
      { label: "Forms", autogenerate: { directory: "core-ui/forms" } },
      { label: "List  & Tables", autogenerate: { directory: "core-ui/list-tables" } },
      { label: "Navigation", autogenerate: { directory: "core-ui/navigation" } },
      { label: "Sections", autogenerate: { directory: "core-ui/sections" } },
    ],
  },
  {
    label: "Setup guides",
    link: "docs/guides/angular",
    icon: "setting",
    items: [{ label: "Framework guides", autogenerate: { directory: "setup-guides" } }],
  },
  {
    label: "Playground",
    link: "https://play.yummacss.com",
    icon: "seti:html",
  },
];
