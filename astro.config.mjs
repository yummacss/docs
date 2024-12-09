import { defineConfig } from "astro/config";
import { ExpressiveCodeTheme } from "@astrojs/starlight/expressive-code";
import AutoImport from "astro-auto-import";
import fs from "node:fs";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";
import starlightCoolerCredit from "starlight-cooler-credit";
import starlightLinksValidator from "starlight-links-validator";
import vercel from "@astrojs/vercel/serverless";

const theme = fs.readFileSync(
  new URL(`./theme.jsonc`, import.meta.url),
  "utf-8"
);

const ariakeTheme = ExpressiveCodeTheme.fromJSONString(theme);

export default defineConfig({
  site: "https://www.yummacss.com/",
  integrations: [
    starlight({
      title: "Yumma CSS",
      expressiveCode: {
        themes: [ariakeTheme],
        styleOverrides: {
          frames: {
            shadowColor: false,
          },
          textMarkers: {
            markHue: "hsl(176, 73%, 77%)",
            markBackground: "hsla(176, 73%, 77%, 0.100)",
          },
        },
      },
      favicon: "/favicon.ico",
      logo: {
        alt: "Yumma CSS Logo",
        dark: "/public/assets/vectors/dark-logo.svg",
        light: "/public/assets/vectors/light-logo.svg",
        replacesTitle: true,
      },
      plugins: [
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
        }),
        starlightBlog({
          authors: {
            Renildo: {
              name: "Renildo Pereira",
              picture: "https://avatars.githubusercontent.com/u/56491937?v=4",
              title: "Maintainer",
              url: "https://x.com/rrenildoo",
            },
          },
        }),
      ],
      editLink: {
        baseUrl: "https://github.com/yumma-lib/yumma-css-docs/tree/release/",
      },
      social: {
        github: "https://github.com/yumma-lib/yumma-css",
      },
      customCss: ["/src/styles/globals.css"],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            href: "/apple-icon.png",
            sizes: "180x180",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "/og.png",
          },
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Installation", link: "docs/installation" },
            { label: "Components", link: "/components" },
            { label: "Playground", link: "https://play.yummacss.com" },
            {
              label: "Walkthroughs",
              link: "https://www.youtube.com/@yummacss",
            },
          ],
        },
        // {
        // badge: "New",
        // label: "CLI",
        // autogenerate: { directory: "/cli" },
        // },
        {
          label: "Concepts",
          autogenerate: { directory: "/concepts" },
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
          label: "Interactions",
          autogenerate: { directory: "core/interactions" },
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
        //   label: "Transforms & Transitions",
        //   items: [
        //     {
        //       label: "Transforms",
        //       autogenerate: {
        //         directory: "core/transforms-transitions/transforms",
        //       },
        //     },
        //     {
        //       label: "Transitions",
        //       autogenerate: {
        //         directory: "core/transforms-transitions/transitions",
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
      ],
    }),
    AutoImport({
      imports: [
        "/src/components/Color.astro",
        "/src/components/Footer.astro",
        "/src/components/Hover.astro",
        "/src/components/Modifier.astro",
        "/src/components/Palette.astro",
        "/src/components/Preview.astro",
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
          "starlight-showcases": [
            "ShowcaseImage",
            "ShowcaseText",
            "ShowcaseYouTube",
          ],
          "/src/constants/card.ts": [
            "card",
            "minimalist",
            "elegant",
            "modern",
            "vibrant",
            "yummaCard",
          ],
          "starlight-package-managers": ["PackageManagers "],
          "/src/constants/guide": ["guide"],
        },
      ],
    }),
  ],

  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
