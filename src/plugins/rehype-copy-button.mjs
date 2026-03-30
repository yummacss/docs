const copySvg = {
  type: "element",
  tagName: "svg",
  properties: {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "none",
    viewBox: "0 0 16 16",
    className: ["ready"],
  },
  children: [
    {
      type: "element",
      tagName: "path",
      properties: {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M12 2.5H8A1.5 1.5 0 0 0 6.5 4v1H8a3 3 0 0 1 3 3v1.5h1A1.5 1.5 0 0 0 13.5 8V4A1.5 1.5 0 0 0 12 2.5M11 11h1a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H4a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3zM4 6.5h4A1.5 1.5 0 0 1 9.5 8v4A1.5 1.5 0 0 1 8 13.5H4A1.5 1.5 0 0 1 2.5 12V8A1.5 1.5 0 0 1 4 6.5",
        clipRule: "evenodd",
      },
      children: [],
    },
  ],
};

const checkSvg = {
  type: "element",
  tagName: "svg",
  properties: {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "none",
    viewBox: "0 0 16 16",
    className: ["success"],
  },
  children: [
    {
      type: "element",
      tagName: "path",
      properties: {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927 5.473-6.385a.75.75 0 0 1 1.057-.081",
        clipRule: "evenodd",
      },
      children: [],
    },
  ],
};

function visit(node, type, handler) {
  if (node.type === type) {
    handler(node);
  }
  if (node.children) {
    for (const child of node.children) {
      visit(child, type, handler);
    }
  }
}

export default function rehypeCopyButton() {
  return (tree) => {
    visit(tree, "element", (node) => {
      // rehype-pretty-code attaches this property to the figure element
      if (
        node.tagName === "figure" &&
        node.properties &&
        "data-rehype-pretty-code-figure" in node.properties
      ) {
        // Find the 'pre' tag inside figure
        const pre = node.children.find(
          (n) => n.type === "element" && n.tagName === "pre"
        );
        if (pre) {
          const button = {
            type: "element",
            tagName: "button",
            properties: {
              className: ["rehype-pretty-copy"],
              // Optional: Make it accessible
              ariaLabel: "Copy code",
            },
            children: [
              JSON.parse(JSON.stringify(copySvg)),
              JSON.parse(JSON.stringify(checkSvg)),
            ],
          };
          // Insert the button before the code block
          pre.children.unshift(button);
        }
      }
    });
  };
}
