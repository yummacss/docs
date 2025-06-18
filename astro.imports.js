import { ExpressiveCodeTheme } from "@astrojs/starlight/expressive-code";
import { sidebar } from "./astro.sidebar";
import AutoImport from "astro-auto-import";
import fs from "node:fs";
import liveCode from "astro-live-code";
import starlightBlog from "starlight-blog";
import starlightCoolerCredit from "starlight-cooler-credit";
import starlightLinksValidator from "starlight-links-validator";
import vercel from "@astrojs/vercel";

const midnight = fs.readFileSync(new URL(`./midnight.json`, import.meta.url), "utf-8");
const midnightTheme = ExpressiveCodeTheme.fromJSONString(midnight);

// prettier-ignore
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
