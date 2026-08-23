/**
 * `<ComponentPreview>` ids whose demo is driven live rather than fixed at the
 * schema's example: a control strip appears under the canvas, and moving one
 * updates the canvas and the snippet together.
 *
 * A pilot set rather than every registry id: the control strip only knows how
 * to drive `enum` / `boolean` / `string` / `number` props - the same flat
 * subset `props-table.tsx` can already document without a `typeName`. Adding
 * an id here is how a component's demo graduates into being interactive, not
 * a build step.
 */
export const INTERACTIVE_PREVIEW_IDS: string[] = [
  "button",
  "field",
  "toggle",
  "avatar",
  "badge",
];
