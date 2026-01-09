"use client";

import type { Icon } from "@phosphor-icons/react";
import type * as React from "react";

export interface BuiltWithItem {
  title: string;
  version: string;
  icon: Icon | React.ComponentType<{ width?: number; height?: number }>;
}

interface BuiltWithProps {
  items: BuiltWithItem[];
  className?: string;
}

export default function BuiltWith({ items, className = "" }: BuiltWithProps) {
  return (
    <div className={`d-g gtc-2 md:gtc-3 g-4 ${className}`}>
      {items.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.title}
            className="p-4 bw-1 bc-white/10 bs-d br-0 d-f ai-c jc-c g-2 bg-black/10"
          >
            <IconComponent width={20} height={20} />
            <span className="fs-sm c-white">
              {item.title} {item.version}
            </span>
          </div>
        );
      })}
    </div>
  );
}
