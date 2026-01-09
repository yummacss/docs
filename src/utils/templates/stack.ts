import type { TemplateStackItem } from "./types";

export const templateStack: Record<string, TemplateStackItem[]> = {
  neutra: [
    { id: "nextjs", title: "Next.js", version: "16.1" },
    { id: "react", title: "React", version: "19.2" },
    { id: "yummacss", title: "Yumma CSS", version: "3.7" },
    { id: "pnpm", title: "pnpm", version: "10.27" },
    { id: "typescript", title: "TypeScript", version: "5.0" },
  ],
};

export function getTemplateStack(slug: string): TemplateStackItem[] {
  return templateStack[slug] || [];
}
