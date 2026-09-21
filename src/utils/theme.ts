export const THEME_KEY = "yumma-theme";

export type Theme = "dark" | "light";

/**
 * Runs before the body paints, so a stored light theme never flashes dark.
 * Dark is the CSS default, so only light writes the attribute.
 */
export const THEME_SCRIPT = `(function(){try{if(localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)})==="light"){document.documentElement.dataset.theme="light"}}catch(e){}})()`;
