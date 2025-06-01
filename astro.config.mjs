import { defineConfig } from "astro/config";
import config from "./astro.imports.js";
import starlight from "@astrojs/starlight";

import starlightBlog from "starlight-blog";
import starlightLinksValidator from "starlight-links-validator";

export default defineConfig({
  integrations: [
    starlight({
      title: "Yumma CSS",
      favicon: "/favicon.ico",
      logo: {
        alt: "Yumma CSS Logo",
        dark: "/public/trademark/logo-dark.png",
        light: "/public/trademark/logo-light.png",
        replacesTitle: true,
      },

      customCss: ["@fontsource-variable/outfit", "/src/styles/custom.css", "/src/styles/yumma.css"],
      components: {
        Banner: "./src/components/starlight/Banner.astro",
        Hero: "./src/components/starlight/Index.astro",
        PageTitle: "./src/components/starlight/PageTitle.astro",
      },

      plugins: [
        starlightLinksValidator(),
        starlightBlog({
          recentPostCount: 3,
          authors: {
            Renildo: {
              name: "Renildo Pereira",
              picture: "https://avatars.githubusercontent.com/u/56491937?v=4",
              title: "Creator",
              url: "https://x.com/rrenildoo",
            },
          },
        }),
      ],

      expressiveCode: {
        themes: [config.midnightTheme],
        styleOverrides: {
          collapsibleSections: {
            openBackgroundColorCollapsible: "hsla(231, 73%, 77%, 0.050)",
            closedBackgroundColor: "hsla(231, 73%, 77%, 0.100)",
          },
          frames: {
            shadowColor: "transparent",
          },
          textMarkers: {
            delBackground: "hsla(0, 48%, 77%, 0.100)",
            delHue: "hsl(0, 48%, 77%)",
            insBackground: "hsla(127, 48%, 77%, 0.150)",
            insHue: "hsl(127, 48%, 77%)",
            markBackground: "hsla(231, 73%, 77%, 0.100)",
            markHue: "hsl(231, 73%, 77%)",
          },
        },
      },

      editLink: {
        baseUrl: "https://github.com/yumma-lib/yumma-css-docs/tree/release/",
      },

      social: [{ icon: "github", label: "GitHub", href: "https://github.com/yumma-lib/yumma-css" }],

      head: [
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/favicon/apple-touch-icon.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            content: "/og.png",
            property: "og:image",
          },
        },
      ],

      sidebar: config.sidebar,
    }),

    config.AutoImport({
      imports: [
        "/src/components/Class.astro",
        "/src/components/Guide.astro",
        "/src/components/HoverModifier.astro",
        "/src/components/legacy/LegacyClass.astro",
        "/src/components/legacy/LegacyColor.astro",
        "/src/components/legacy/LegacyPalette.astro",
        "/src/components/MediaModifier.astro",
        "/src/components/Note.astro",
        "/src/components/Palette.astro",
        {
          "@astrojs/starlight/components": ["Aside", "Card", "CardGrid", "Code", "FileTree", "Icon", "LinkButton", "LinkCard", "Steps", "TabItem", "Tabs"],
          "starlight-package-managers": ["PackageManagers"],
          "starlight-showcases": ["ShowcaseImage", "ShowcaseText", "ShowcaseYouTube"],
        },
      ],
    }),

    config.liveCode({
      layout: "/src/layouts/default.astro",
    }),
  ],

  redirects: {
    // blog related
    "/blog/v0": "/blog/yummacss-0.1",
    "/blog/v1": "/blog/yummacss-1.1",
    "/blog/v2": "/blog/yummacss-2.1",
    "/blog/v3": "/blog/yummacss-3.0",

    // docs related
    "/docs": "/docs/installation",
    "/docs/build-css": "/docs/first-steps#building-styles",
    "/docs/colors": "/docs/first-steps#color-palette",
    "/docs/colours": "/docs/first-steps#color-palette",
    "docs/configuration": "/docs/first-steps#get-started-with-yumma-cli",
    "docs/cli": "/docs/first-steps#get-started-with-yumma-cli",
    "/docs/direction": "/docs/bottom-left-right-top",
    "/docs/modifiers": "/docs/first-steps#breakpoints-modifiers",
    "/docs/next": "/blog/yummacss-3.0",
    "/docs/setup": "/docs/first-steps",
    "/docs/utilities": "/docs/build-css",

    // ui related
    "/ui": "/components",
  },

  devToolbar: {
    enabled: false,
  },

  output: "server",
  adapter: config.vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
