// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightBlog from "starlight-blog";
import starlightLinksValidator from "starlight-links-validator";
import starlightSidebarTopics from "starlight-sidebar-topics";
import config from "./astro.imports.js";

export default defineConfig({
	integrations: [
		starlight({
			title: "Yumma CSS",
			description:
				"A CLI-first CSS framework for the web with abbreviated styles.",
			titleDelimiter: " - ",
			favicon: "/favicon.ico",
			logo: {
				alt: "Yumma CSS Logo",
				dark: "/src/assets/trademark/logo-dark.png",
				light: "/src/assets/trademark/logo-light.png",
				replacesTitle: true,
			},

			markdown: {
				headingLinks: false,
			},

			customCss: [
				"/src/styles/custom.css",
				"/src/styles/out.css",
				"@fontsource-variable/outfit",
			],
			components: {
				Banner: "./src/components/starlight/Banner.astro",
				Hero: "./src/components/starlight/Index.astro",
				PageTitle: "./src/components/starlight/PageTitle.astro",
			},

			plugins: [
				starlightLinksValidator(),
				starlightSidebarTopics(config.sidebar, {
					exclude: ["/blog", "/blog/**/*", "/docs/guides", "/docs/guides/**/*"],
				}),
				starlightBlog({
					recentPostCount: 35,
					postCount: 7,
					authors: {
						Renildo: {
							name: "Renildo Pereira",
							picture: "https://avatars.githubusercontent.com/u/56491937?v=4",
							title: "@rrenildoo",
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

			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/yumma-lib/yumma-css",
				},
			],

			head: [
				{
					tag: "link",
					attrs: {
						rel: "apple-touch-icon",
						sizes: "180x180",
						href: "/apple-icon.png",
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
		}),
		config.AutoImport({
			imports: [
				"/src/components/BreakpointVariant.astro",
				"/src/components/HoverVariant.astro",
				"/src/components/legacy/LegacyClass.astro",
				"/src/components/legacy/LegacyColor.astro",
				"/src/components/legacy/LegacyPalette.astro",
				"/src/components/Note.astro",
				"/src/components/Palette.astro",
				"src/components/Class.astro",
				{
					"@astrojs/starlight/components": [
						"Card",
						"CardGrid",
						"Code",
						"FileTree",
						"LinkCard",
						"Steps",
						"TabItem",
						"Tabs",
					],
					"starlight-package-managers": ["PackageManagers"],
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
		"/blog/v3": "/blog/yummacss-3.5",

		// docs related
		"/docs": "/docs/installation",
		"/docs/build-css": "/docs/foundations#cli-commands",
		"/docs/colours": "/docs/foundations/colors",
		"/docs/direction": "/docs/top-right-bottom-left",
		"/docs/foundations/responsive-design": "/docs/foundations/media-queries",
		"/docs/foundations/variants": "/docs/foundations/pseudo-classes",
		"docs/bottom-left-right-top": "/docs/top-right-bottom-left",
		"docs/cli": "/docs/foundations/configuration",
		"docs/configuration": "/docs/foundations/config",
		"docs/installation#framework-guides": "/docs/framework-guides",
		"docs/text-color": "/docs/color",

		// ui related
		"/components": "/docs/ui/installation/",
		"/core-ui": "/docs/ui/installation/",
		"/ui-library": "/docs/ui/installation/",
		"/ui": "/docs/ui/installation/",
		"/ui/components": "/docs/ui/installation/",
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
