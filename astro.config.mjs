import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import config from "./astro.imports.js";

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
      customCss: ["/src/styles/globals.css"],
      components: {
        // Hero: "./src/components/Hero.astro",
        PageTitle: "./src/components/PageTitle.astro",
      },
      plugins: [
        config.starlightHeadingBadges(),
        config.starlightLinksValidator(),
        config.starlightCoolerCredit({
          credit: {
            title: {
              en: "Yumma CSS v3.0",
            },
            href: "https://www.yummacss.com/docs/next",
            description: {
              en: "Take a look at what's coming in the next version of Yumma CSS.",
            },
          },
          showImage: false,
        }),
        config.starlightBlog({
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
      social: {
        github: "https://github.com/yumma-lib/yumma-css",
      },
      head: [
        {
          tag: "link",
          attrs: {
            href: "/favicon.ico",
            rel: "icon",
            type: "image/x-icon",
          },
        },
        {
          tag: "link",
          attrs: {
            href: "/favicon.png",
            rel: "icon",
            type: "image/png",
          },
        },
        {
          tag: "link",
          attrs: {
            href: "/apple-touch-icon.png",
            rel: "apple-touch-icon",
            sizes: "180x180",
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
      sidebar: config.sidebar, // from astro.sidebar.ts
    }),

    config.AutoImport({
      imports: [
        "/src/components/Class.astro",
        "/src/components/Color.astro",
        "/src/components/Decorator.astro",
        "/src/components/Modifier.astro",
        "/src/components/Palette.astro",
        "/src/components/Palette2.astro",
        "/src/components/Utility.astro",
        {
          "@astrojs/starlight/components": ["Aside", "Card", "CardGrid", "Code", "FileTree", "Icon", "LinkButton", "LinkCard", "Steps", "TabItem", "Tabs"],
          "starlight-showcases": ["ShowcaseImage", "ShowcaseText", "ShowcaseYouTube"],
        },
      ],
    }),

    config.liveCode({
      layout: "/src/layouts/default.astro",
    }),
  ],

  redirects: {
    "/docs": "/docs/installation",
    "/docs/build-css": "/docs/first-steps#building-styles",
    "/docs/colors": "/docs/first-steps#color-palette",
    "/docs/colours": "/docs/first-steps#color-palette",
    "/docs/modifiers": "/docs/first-steps#breakpoints-modifiers",
    "/docs/spacing": "/docs/spacing-between",
    "/docs/direction": "/docs/bottom-left-right-top",
    "/docs/utilities": "/docs/build-css",
  },

  output: "server",
  adapter: config.vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
