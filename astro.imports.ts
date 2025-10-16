import fs from "node:fs";
import { ExpressiveCodeTheme } from "@astrojs/starlight/expressive-code";
import vercel from "@astrojs/vercel";
import AutoImport from "astro-auto-import";
import liveCode from "astro-live-code";
import starlightBlog from "starlight-blog";
import starlightCoolerCredit from "starlight-cooler-credit";
import starlightLinksValidator from "starlight-links-validator";
import { sidebar } from "./astro.sidebar";

const theme = fs.readFileSync(
	new URL(`./src/theme.json`, import.meta.url),
	"utf-8",
);
const midnightTheme = ExpressiveCodeTheme.fromJSONString(theme);

export default {
	sidebar,
	AutoImport,
	liveCode,
	starlightBlog,
	starlightCoolerCredit,
	starlightLinksValidator,
	vercel,
	midnightTheme,
};
