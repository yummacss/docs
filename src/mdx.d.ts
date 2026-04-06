declare module "*.mdx" {
  import type { ComponentProps, ComponentType } from "react";
  const MDXComponent: ComponentType<ComponentProps<"div">>;
  export default MDXComponent;
  export const meta: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
<<<<<<< HEAD
  export const toc: Array<{
    id: string;
    text: string;
    level: number;
  }>;
=======
>>>>>>> parent of b12b90cc (install and setup rehype-slug)
}
