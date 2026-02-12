"use client";

import {
  BaseUIDark,
  MotionDark,
  Nextjs,
  PnpmDark,
  ReactDark,
} from "@ridemountainpig/svgl-react";
import type * as React from "react";
import { YummaCSSDark } from "../../icons/yummacss-dark";

// Stack icon mapping by keyword
const stackIconMap: Record<string, React.ComponentType<any>> = {
  "next.js": Nextjs,
  react: ReactDark,
  yumma: YummaCSSDark,
  pnpm: PnpmDark,
  "base ui": BaseUIDark,
  motion: MotionDark,
};

function getIconForStack(stackItem: string): React.ComponentType<any> | null {
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
            className="p-4 bw-1 bc-white/10 br-0 d-f ai-c jc-c g-2"
            style={{ backgroundColor: "#21243f", borderColor: "#31365e" }}
          >
            {StackIcon && <StackIcon className="d-6" />}
            <span className="fs-sm c-white">{item}</span>
          </div>
        );
      })}
    </div>
  );
}
