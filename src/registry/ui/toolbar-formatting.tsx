"use client";

import { Bold, Italic, Strikethrough, Underline } from "iconoir-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function ToolbarFormatting() {
  const [active, setActive] = useState<string[]>(["bold"]);

  const toggle = (value: string) => {
    setActive((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <div className="d-f g-1 p-2 bg-white bc-silver-2 br-md bw-1">
      {[
        { value: "bold", Icon: Bold },
        { value: "italic", Icon: Italic },
        { value: "underline", Icon: Underline },
        { value: "strikethrough", Icon: Strikethrough },
      ].map(({ value, Icon }) => {
        const pressed = active.includes(value);
        return (
          <motion.button
            key={value}
            onClick={() => toggle(value)}
            whileTap={{ scale: 0.92 }}
            className={`d-f ai-c jc-c w-9 h-9 bw-0 br-md us-none c-p fv:oo-2 fv:oc-indigo-3 ${
              pressed
                ? "bg-indigo-1 bc-indigo-2 c-indigo-7 bw-1"
                : "bg-transparent c-slate-7 h:bg-silver-1 h:c-slate-10"
            }`}
          >
            <Icon className="w-5 h-5" />
          </motion.button>
        );
      })}
    </div>
  );
}
