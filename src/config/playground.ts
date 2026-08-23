/**
 * The `/ui/playground` component list, grouped the same way `sidebarConfig.ui`
 * groups the doc pages, so switching between the two feels like the same
 * catalog rather than a second, differently-sorted one.
 *
 * A pilot set rather than all 86: the control panel only knows how to drive
 * `enum` / `boolean` / `string` / `number` props, and every id here was picked
 * because its whole prop surface is exactly that. Widening this list is how a
 * component graduates into the playground, not a build step.
 */
export interface PlaygroundGroup {
  title: string;
  ids: string[];
}

export const PLAYGROUND_GROUPS: PlaygroundGroup[] = [
  { title: "Interactive", ids: ["button"] },
  { title: "Forms", ids: ["field", "toggle"] },
  { title: "Display", ids: ["avatar", "badge"] },
];

export const PLAYGROUND_IDS: string[] = PLAYGROUND_GROUPS.flatMap(
  (group) => group.ids,
);

export const DEFAULT_PLAYGROUND_ID = "button";
