import { defineConfig } from "astro/config";
import { ExpressiveCodeTheme } from "@astrojs/starlight/expressive-code";
import { sidebar } from "./astro.sidebar";
import AutoImport from "astro-auto-import";
import fs from "node:fs";
import liveCode from "astro-live-code";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";
import starlightCoolerCredit from "starlight-cooler-credit";
import starlightLinksValidator from "starlight-links-validator";
import vercel from "@astrojs/vercel/serverless";

const theme = fs.readFileSync(
  new URL(`./theme.jsonc`, import.meta.url),
  "utf-8"
);

const yummaTheme = ExpressiveCodeTheme.fromJSONString(theme);

export default defineConfig({
  integrations: [
    starlight({
      title: "Yumma CSS",
      expressiveCode: {
        themes: [yummaTheme],
        styleOverrides: {
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
      favicon: "/favicon.ico",
      logo: {
        alt: "Yumma CSS Logo",
        dark: "/public/trademark/logo-dark.png",
        light: "/public/trademark/logo-light.png",
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
            href: "/apple-touch-icon.png",
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
        "/src/components/Hover.astro",
        "/src/components/Modifier.astro",
        "/src/components/Palette.astro",
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
          "starlight-package-managers": ["PackageManagers "],
          "/src/constants/guides": ["guide"],
          "/src/constants/examples": [
            "abbreviatedSyntax",
            "tinyAndLightweight",
            "responsiveByDesignLarge",
            "responsiveByDesignMedium",
            "responsiveByDesignSmall",
            "responsiveByDesignXLarge",
            "responsiveByDesignXXLarge",
            "uiComponents",
          ],
        },
      ],
    }),
    liveCode({
      layout: "/src/layouts/default.astro",
    }),
  ],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
