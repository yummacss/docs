interface Props {
  data: Record<string, unknown>;
}

/**
 * `JSON.stringify` does not escape `<`, so a value containing `</script>` -
 * a title or description, all of which come from frontmatter - would close
 * this element early and put the rest of the object into the document as
 * markup. Escaping it as `<` is still valid JSON and still parses as the
 * same string, so the structured data is unchanged.
 */
function serialize(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: the only way to emit a JSON-LD body in React, and `serialize` closes the one hole that makes it dangerous
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
