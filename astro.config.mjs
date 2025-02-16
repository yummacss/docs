import { defineConfig } from "astro/config";
import { ExpressiveCodeTheme } from "@astrojs/starlight/expressive-code";
import { sidebar } from "./astro.sidebar";
import AutoImport from "astro-auto-import";
import fs from "node:fs";
import liveCode from "astro-live-code";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";
import starlightCoolerCredit from "starlight-cooler-credit";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightLinksValidator from "starlight-links-validator";
import vercel from "@astrojs/vercel";

const theme = fs.readFileSync(new URL(`./theme.jsonc`, import.meta.url), "utf-8");

const yummaTheme = ExpressiveCodeTheme.fromJSONString(theme);

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
        PageTitle: "./src/components/PageTitle.astro",
      },

      plugins: [
        starlightHeadingBadges(),
        starlightLinksValidator(),
        starlightCoolerCredit({
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
        starlightBlog({
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
        themes: [yummaTheme],
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
      sidebar, // astro.sidebar.ts
    }),

    AutoImport({
      imports: [
        "/src/components/Class.astro",
        "/src/components/Color.astro",
        "/src/components/Message.astro",
        "/src/components/Modifier.astro",
        "/src/components/Palette.astro",
        "/src/components/Palette2.astro",
        "/src/components/Utility.astro",
        {
          "@astrojs/starlight/components": [
            "Aside",
            "Card",
            "CardGrid",
            "Code",
            "FileTree",
            "Icon",
            "LinkButton",
            "LinkCard",
            "Steps",
            "TabItem",
            "Tabs",
          ],
          "starlight-showcases": ["ShowcaseImage", "ShowcaseText", "ShowcaseYouTube"],
          "/src/constants/guides": ["guide"],
          "/src/constants/examples": [
            "abbreviatedSyntax",
            "responsiveByDesignLarge",
            "responsiveByDesignMedium",
            "responsiveByDesignSmall",
            "responsiveByDesignXLarge",
            "responsiveByDesignXXLarge",
            "tinyAndLightweight",
            "uiComponents",
          ],
        },
      ],
    }),

    liveCode({
      layout: "/src/layouts/default.astro",
    }),
  ],

  redirects: {
    // prevent broken links on the web
    "/docs": "/docs/installation",
    "/docs/build-css": "/docs/first-steps#building-styles",
    "/docs/colors": "/docs/first-steps#applying-color-utilities",
    "/docs/modifiers": "/docs/first-steps#applying-utilities-conditionally",
    "/docs/spacing": "/docs/spacing-between",

    // prepare for v3
    "/docs/direction": "/docs/bottom-left-right-top",
    "/docs/utilities": "/docs/build-css",
  },

  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
