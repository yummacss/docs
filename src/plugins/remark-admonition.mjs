import { visit } from "unist-util-visit";

/**
 * Turns `:::note[Title]` container directives into `<Admonition>`.
 *
 * `remark-directive` parses the `:::` syntax into a `containerDirective` node
 * & stops there; this maps the ones we recognize onto the component. Anything
 * else is left as a directive node, which renders as nothing, so a typo shows
 * up as a missing block rather than as a wrong-colored one.
 *
 * The label in brackets is parsed as the directive's first child when it is
 * tagged `directiveLabel`. It is lifted onto the `title` prop & removed from
 * the body, or it would render twice.
 */
const KINDS = new Set(["note", "warning", "success"]);

export default function remarkAdmonition() {
  return (tree) => {
    visit(tree, "containerDirective", (node) => {
      if (!KINDS.has(node.name)) return;

      const [first] = node.children;
      const labelled = first?.data?.directiveLabel === true;
      const title = labelled ? toText(first) : undefined;

      if (labelled) node.children = node.children.slice(1);

      node.data = {
        ...node.data,
        hName: "Admonition",
        hProperties: { kind: node.name, ...(title ? { title } : {}) },
      };
    });
  };
}

function toText(node) {
  if (node.value) return node.value;
  return (node.children ?? []).map(toText).join("");
}
