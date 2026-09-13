// What `yummaui init` writes when you take its defaults
// (`ui/src/commands/init.ts`). Four places print a path or a command built from
// these, so the CLI's defaults are read from one file rather than retyped.
// `.mjs` so the remark plugin and the registry generator can import it too.

export const CLI = "yummaui";
export const COMPONENTS_DIR = "components/ui";
export const ALIAS = "@";

/** Where `yummaui add <id>` writes the file. */
export function targetPath(id) {
  return `${COMPONENTS_DIR}/${id}.tsx`;
}

/** What a file of your own imports the installed component by. */
export function importPath(id) {
  return `${ALIAS}/${COMPONENTS_DIR}/${id}`;
}

/** `pnpm dlx`, `npx` and friends, in front of the CLI. */
export function addCommand(runner, id) {
  return `${runner} ${CLI} add ${id}`;
}
