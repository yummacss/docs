declare module "*.mdx" {
  import type { ComponentProps, ComponentType } from "react";
  const MDXComponent: ComponentType<ComponentProps<"div">>;
  export default MDXComponent;
  export const meta: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
  export const toc: Array<{
    id: string;
    text: string;
    level: number;
  }>;
}
