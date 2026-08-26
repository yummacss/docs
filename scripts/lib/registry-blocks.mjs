/** Editorial list of installable compositions (not prop-demo examples). */
export const BLOCKS = new Set([
  // Compositions.
  "avatar-edit",
  "avatar-stacked",
  "button-group",
  "button-group-icon",
  "button-group-pill",
  "button-group-pill-label",
  "checkbox-group-label",
  "dialog-edit-profile",
  "dialog-nested",
  "dialog-new-task",
  "dialog-send-invite",
  "dialog-share-task",
  "dialog-sign-in",
  "dialog-sign-up",
  "field-button",
  "preview-card-compact",
  "preview-card-multiple",
  "rating-feedback",

  // Recipes with logic beyond assembly.
  "autocomplete-loading",
  "checkbox-group-nested-parent",
  "checkbox-parent",
  "field-password",
  "popover-color-palette",
  "toggle-color-picker",
  "toggle-group",
]);

export function isBlock(id) {
  return BLOCKS.has(id);
}
