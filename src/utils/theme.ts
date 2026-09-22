export const THEME_KEY = "yumma-theme";

export type Theme = "dark" | "light" | "auto";

/** The order the toggle steps through. Dark is the default with nothing stored. */
export const THEMES: Theme[] = ["dark", "light", "auto"];

/**
 * Runs before the body paints, so a stored theme never flashes dark. Dark is
 * the CSS default, so only light and auto write the attribute.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)});if(t==="light"||t==="auto"){document.documentElement.dataset.theme=t}}catch(e){}})()`;
