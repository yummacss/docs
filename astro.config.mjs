import { defineConfig } from "astro/config";
import { ExpressiveCodeTheme } from "@astrojs/starlight/expressive-code";
import { sidebar } from "./astro.sidebar";
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
  integrations: [
    starlight({
      title: "Yumma CSS",
      expressiveCode: {
        themes: [ariakeTheme],
        styleOverrides: {
          frames: {
            shadowColor: "transparent",
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
        discord: "https://discord.gg/yummacss",
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
      sidebar,
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
