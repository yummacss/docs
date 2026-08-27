/**
 * A page's description, with "Base UI" as the link to the primitive.
 *
 * The link used to be a row of its own in the rail. The description already
 * says which primitive a component is built on, so the words are there to be
 * linked & a separate line of chrome saying the same thing is one more thing
 * to lay out. A reader looks at the description first, which is where the way
 * out to Base UI's own reference belongs.
 */
export default function Description({
  text,
  /**
   * `true` derives the Base UI slug from the page's own route, which only
   * works when the two names match (Switch -> switch). A string is the real
   * slug where they diverge: Textarea is built on Field's `render` prop, not
   * on a "Textarea" primitive, which does not exist.
   */
  primitive,
  slug,
}: {
  text?: string;
  primitive?: boolean | string;
  slug: string;
}) {
  if (!text) return null;

  const marker = "Base UI";
  const at = primitive ? text.indexOf(marker) : -1;

  if (at < 0) return <>{text}</>;

  const name = typeof primitive === "string" ? primitive : slug;

  return (
    <>
      {text.slice(0, at)}
      <a
        href={`https://base-ui.com/react/components/${name}#api-reference`}
        target="_blank"
        rel="noopener noreferrer"
        className="c-accent td-u h:c-white fv:oc-white fv:ow-2"
      >
        {marker}
      </a>
      {text.slice(at + marker.length)}
    </>
  );
}
