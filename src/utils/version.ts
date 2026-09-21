import { dependencies } from "../../package.json";

// The version the site is built against. `pnpm upd` moves it.
export const yummaVersion = dependencies.yummacss.replace(/^\D+/, "");
