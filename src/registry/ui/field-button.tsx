"use client";

import { Button } from "@base-ui/react/button";
import { Field } from "@base-ui/react/field";
import { Search } from "lucide-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function FieldButton() {
  return (
    <Field.Root className="d-f fd-c g-2">
      <label htmlFor="field-btn-input" className="c-slate-10 fs-sm fw-500">
        Search tasks
      </label>
      <div className="d-f p-r ai-c">
        <Field.Control
          id="field-btn-input"
          type="text"
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="h-10 w-64 pl-4 pr-12 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
        />
        <div className="d-f p-a r-1 ai-c jc-c">
          <Button
            aria-label="Search"
            className="d-f ai-c jc-c w-8 h-8 bg-silver-1 c-slate-6 bw-0 br-md us-none c-p h:bg-silver-2 h:c-slate-10"
            render={(props) => (
              <motion.button
                type="button"
                {...(props as HTMLMotionProps<"button">)}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Field.Root>
  );
}
