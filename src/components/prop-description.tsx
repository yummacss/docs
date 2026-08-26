/**
 * A schema description, rendered.
 *
 * Descriptions are written as markdown, and the only markup any of them needs
 * is inline code. Rendering the backticks rather than running a markdown
 * pipeline keeps the schema readable as prose in the JSON file.
 *
 * Shared because the props table and the playground's rail document the same
 * strings, and two renderers would eventually disagree about backticks.
 */
export default function PropDescription({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <>
      {text
        .split("`")
        .map((value, index) => ({
          id: `${index}-${value}`,
          value,
          code: index % 2,
        }))
        .map((segment) =>
          segment.code ? (
            <code key={segment.id} className="c-code fs-sm ff-m">
              {segment.value}
            </code>
          ) : (
            segment.value
          ),
        )}
    </>
  );
}
