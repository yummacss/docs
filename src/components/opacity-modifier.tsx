"use client";

import { EyedropperIcon } from "@phosphor-icons/react";
import { type Category, getPrefix } from "../utils/yummacss";

interface Props {
  category: Category;
  name: string;
}

export default function OpacityModifier({ category, name }: Props) {
  const prefix = getPrefix(category, name);

  return (
    <div className="mb-6 p-4 bc-border bg-surface bw-1">
      <div className="d-f ai-c g-3 mb-3">
        <div className="d-f ai-c jc-c fs-0 p-2 bg-border c-accent-dim">
          <EyedropperIcon className="w-5 h-5" />
        </div>
        <p className="c-white/70 fs-sm">
          Append <code className="px-1 bg-border c-code">/(opacity)</code> to
          any color utility to control its transparency level.
        </p>
      </div>

      <div className="d-f ai-c g-2 p-3 bg-page">
        <span className="c-white/50 fs-xs">Syntax:</span>
        <code className="c-code fs-sm">{prefix}-(color)/(opacity)</code>
      </div>
    </div>
  );
}
