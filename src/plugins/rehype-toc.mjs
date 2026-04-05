export default function rehypeToc() {
  return (tree) => {
    const headings = [];

    visit(tree, "element", (node) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;

      const id = node.properties?.id;
      if (!id) return;

      const text = extractText(node);
      if (!text) return;

      headings.push({
        id,
        text,
        level: Number(node.tagName.charAt(1)),
      });
    });

    const exportValue = `export const toc = ${JSON.stringify(headings)};`;

    tree.children.push({
      type: "mdxjsEsm",
      value: exportValue,
      data: {
        estree: {
          type: "Program",
          body: [],
          sourceType: "module",
        },
      },
    });
  };
}

function extractText(node) {
  let text = "";
  if (node.type === "text") return node.value;
  if (node.children) {
    for (const child of node.children) {
      text += extractText(child);
    }
  }
  return text;
}

function visit(node, type, handler) {
  if (node.type === type) handler(node);
  if (node.children) {
    for (const child of node.children) {
      visit(child, type, handler);
    }
  }
}
