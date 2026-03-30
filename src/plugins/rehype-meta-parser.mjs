export default function rehypeMetaParser() {
  return (tree) => {
    // We can just implement a simple visit function to avoid importing unist-util-visit
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

    visit(tree, "element", (node) => {
      if (node.tagName === "code") {
        // Try to get meta from properties or data
        let meta = "";
        
        // If meta exists on properties
        if (node.properties && typeof node.properties.meta === "string") {
          meta = node.properties.meta;
        } 
        // Or if it exists on data
        else if (node.data && typeof node.data.meta === "string") {
          meta = node.data.meta;
        }

        if (meta) {
          // Convert del={1-5} to {1-5}#del
          meta = meta.replace(/\bdel={([^}]+)}/g, "{$1}#del");
          
          // Convert ins={6} to {6}#ins
          meta = meta.replace(/\bins={([^}]+)}/g, "{$1}#ins");
          
          // Convert mark={4,5-7} to {4,5-7}#mark
          meta = meta.replace(/\bmark={([^}]+)}/g, "{$1}#mark");

          // Save it back
          if (node.properties && "meta" in node.properties) {
            node.properties.meta = meta;
          }
          if (node.data && "meta" in node.data) {
            node.data.meta = meta;
          }
        }
      }
    });
  };
}
