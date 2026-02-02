"use client";

import {
  Next,
  PNPM,
  Reactjs,
  TypeScript,
  YummaCSS,
} from "@react-symbols/icons/files";

import type * as React from "react";

// Stack icon mapping by keyword
const stackIconMap: Record<
  string,
  React.ComponentType<{
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
  }>
> = {
  "next.js": Next,
  react: Reactjs,
  yumma: YummaCSS,
  pnpm: PNPM,
  typescript: TypeScript,
};

function getIconForStack(stackItem: string): React.ComponentType<{
  size?: number;
  fill?: string;
  width?: number;
  height?: number;
}> | null {
  const lowerItem = stackItem.toLowerCase();
  for (const [key, icon] of Object.entries(stackIconMap)) {
    if (lowerItem.includes(key)) {
      return icon;
    }
  }
  return null;
}

interface Props {
  stack: string[];
}

export default function TemplateStack({ stack }: Props) {
  return (
    <div className="d-g gtc-2 md:gtc-3 g-4">
      {stack.map((item) => {
        const StackIcon = getIconForStack(item);

        return (
          <div
            key={item}
            className="p-4 bw-1 bc-white/10 bs-d br-0 d-f ai-c jc-c g-2 bg-black/10"
          >
            {StackIcon && <StackIcon width={24} height={24} />}
            <span className="fs-sm c-white">{item}</span>
          </div>
        );
      })}
    </div>
  );
}
