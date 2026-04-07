"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronRight } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

export default function ExampleCollapsible() {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="d-f fd-c w-64 bg-white bc-silver-3 bw-1 br-lg o-h"
    >
      <Collapsible.Trigger className="d-f b-0 ai-c jc-sb g-2 w-full px-4 py-3 bg-transparent ta-l c-p h:bg-silver-1">
        <span className="fs-sm fw-600 c-slate-9">
          {systemRequirements.title}
        </span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="d-f"
        >
          <ChevronRight className="w-4 h-4 c-slate-4" />
        </motion.span>
      </Collapsible.Trigger>

      <Collapsible.Panel
        keepMounted
        render={(props) => (
          <motion.div
            {...(props as HTMLMotionProps<"div">)}
            initial={false}
            animate={
              open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            className="d-b o-h"
          />
        )}
      >
        <div className="d-f fd-c g-2 px-4 py-3 btw-1 bc-silver-3 fs-sm c-slate-6 lh-4">
          {systemRequirements.items.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

const systemRequirements = {
  title: "System requirements",
  items: ["Node.js 18 or later", "macOS, Windows, or Linux", "4GB RAM minimum"],
};
