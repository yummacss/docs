const docsRedirects = [
  {
    source: "/docs",
    destination: "/docs/installation",
    permanent: true,
  },
  {
    source: "/docs/base-styles",
    destination: "/docs/normalize",
    permanent: true,
  },
  {
    source: "/docs/colours",
    destination: "/docs/colors",
    permanent: true,
  },
  philosophy];

const blogRedirects = [
  {
    source: "/blog/v0",
    destination: "/blog/yummacss-0.1",
    permanent: true,
  },
  {
    source: "/blog/yummacss-1.0",
    destination: "/blog/yummacss-1.0.0",
    permanent: true,
  },
  {
    source: "/blog/v1",
    destination: "/blog/yummacss-1.2.0",
    permanent: true,
  },
  {
    source: "/blog/yummacss-2.0",
    destination: "/blog/yummacss-2.0.0",
    permanent: true,
  },
  {
    source: "/blog/v2",
    destination: "/blog/yummacss-2.1.0",
    permanent: true,
  },
  {
    source: "/blog/v3",
    destination: "/blog/yummacss-3.0.0",
    permanent: true,
  },
  {
    source: "/blog/yummacss-3.0",
    destination: "/blog/yummacss-3.0.0",
    permanent: true,
  },
];

const uiRedirects = [
  {
    source: "/ui/theming",
    destination: "/ui/components/customization",
    permanent: true,
  },
  {
    source: "/ui/components",
    destination: "/ui/installation",
    permanent: true,
  },
  {
    source: "/components",
    destination: "/ui/installation",
    permanent: true,
  },
  {
    source: "/ui",
    destination: "/ui/installation",
    permanent: true,
  },
  ...[
    "installation",
    "customization",
    "accordion",
    "autocomplete",
    "avatar",
    "button",
    "checkbox",
    "collapsible",
    "combobox",
    "context-menu",
    "dialog",
    "input",
    "menu",
    "menubar",
    "meter",
    "navigation-menu",
    "number-field",
    "popover",
    "preview-card",
    "progress",
    "radio",
    "select",
    "separator",
    "slider",
    "switch",
    "tabs",
    "toggle",
    "toolbar",
    "tooltip",
  ].map((slug) => ({
    source: `/ui/${slug}`,
    destination: `/ui/components/${slug}`,
    permanent: true,
  })),
];

export const redirects = [...docsRedirects, ...blogRedirects, ...uiRedirects];
