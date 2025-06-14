import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import ecTwoSlash from "expressive-code-twoslash";

/** @type {import('@astrojs/starlight/expressive-code').StarlightExpressiveCodeOptions} */
export default {
  plugins: [pluginCollapsibleSections(), ecTwoSlash()],
  defaultProps: { collapseStyle: "collapsible-start" },
};

ecTwoSlash({
  explicitTrigger: true,
  includeJsDoc: true,
  allowNonStandardJsDocTags: false,
  languages: ["ts", "tsx"],
  twoslashOptions: {},
});
