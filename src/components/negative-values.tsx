"use client";

import { ThermometerColdIcon } from "@phosphor-icons/react";
import { type Category, getPrefix } from "../utils/yummacss";

interface Props {
  category: Category;
  name: string;
}

export default function NegativeValues({ category, name }: Props) {
  const prefix = getPrefix(category, name);

  return (
    <div className="mb-6 p-4 bc-clay bg-midnight bw-1">
      <div className="d-f ai-c g-3 mb-3">
        <div className="d-f ai-c jc-c fs-0 p-2 bg-clay c-cornflower">
          <ThermometerColdIcon className="w-5 h-5" />
        </div>
        <p className="c-white/70 fs-sm">
          Use the <code className="px-1 bg-clay c-mauve">--</code> syntax to
          apply negative numeric values.
        </p>
      </div>

      <div className="d-f ai-c g-2 p-3 bg-mirage">
        <span className="c-white/50 fs-xs">Syntax:</span>
        <code className="c-mauve fs-sm">{prefix}--(value)</code>
      </div>
    </div>
  );
}
