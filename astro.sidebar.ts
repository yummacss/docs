import type { StarlightUserConfig } from "@astrojs/starlight/types";

export const sidebar = [
  {
    label: "Get Started",
    items: [
      { label: "Installation", link: "docs/installation" },
      { label: "First Steps", link: "docs/first-steps" },
      { label: "Configuration", link: "docs/configuration" },
      { label: "Playground", link: "https://play.yummacss.com" },
      { label: "Resources", link: "/resources" },
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
    label: "Layout",
    autogenerate: { directory: "core/layout" },
  },
  {
    label: "Tables",
    autogenerate: { directory: "core/tables" },
  },
  // {
  //   label: "SVG",
  //   autogenerate: { directory: "core/svg" },
  // },
  // {
  //   label: "Transforms",
  //   items: [
  //     {
  //       label: "Transforms",
  //       autogenerate: {
  //         directory: "core/transforms",
  //       },
  //     },
  //   ],
  // },
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
] satisfies StarlightUserConfig["sidebar"];
