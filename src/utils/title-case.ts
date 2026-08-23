/** `alert-dialog` -> `Alert Dialog`, the label a human reads in a list. */
export function titleCase(id: string): string {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
