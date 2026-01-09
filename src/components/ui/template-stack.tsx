"use client";

import { YummaCSS } from "@react-symbols/icons";
import type * as React from "react";
import { SiNextdotjs, SiPnpm, SiReact, SiTypescript } from "react-icons/si";
import type { TemplateStackItem } from "@/utils/templates";

// Default stack icon mapping
const defaultStackIconMap: Record<
  string,
  React.ComponentType<{
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
  }>
> = {
  nextjs: SiNextdotjs,
  react: SiReact,
  yummacss: YummaCSS,
  pnpm: SiPnpm,
  typescript: SiTypescript,
};

interface TemplateStackProps {
  stack: TemplateStackItem[];
  iconMap?: Record<
    string,
    React.ComponentType<{
      size?: number;
      fill?: string;
      width?: number;
      height?: number;
    }>
  >;
}

export default function TemplateStack({
  stack,
  iconMap = defaultStackIconMap,
}: TemplateStackProps) {
  return (
    <div className="d-g gtc-2 md:gtc-3 g-4">
      {stack.map((item) => {
        const StackIcon = iconMap[item.id];

        return (
          <div
            key={item.id}
            className="p-4 bw-1 bc-white/10 bs-d br-0 d-f ai-c jc-c g-2 bg-black/10"
          >
            {StackIcon && (
              <StackIcon size={20} width={20} height={20} fill="white" />
            )}
            <span className="fs-sm c-white">
              {item.title} {item.version}
            </span>
          </div>
        );
      })}
    </div>
  );
}
