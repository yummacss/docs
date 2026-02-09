"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import {
  DotsNineIcon,
  ListBulletsIcon,
  ListIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function ExampleToggleGroup() {
  return (
    <ToggleGroup
      defaultValue={["grid"]}
      className="d-f br-2 bw-1 bc-silver-2 bg-white p-1 g-1"
    >
      <Toggle
        aria-label="Compact list"
        value="compact-list"
        className={(state) =>
          `d-f d-9 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
            state.pressed
              ? "bg-indigo c-white"
              : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
          }`
        }
        render={(props) => (
          <motion.button
            type="button"
            {...props}
            whileTap={{ y: 1 }}
            transition={{ type: "spring", stiffness: 800, damping: 35 }}
          >
            <ListIcon size={18} weight="bold" />
          </motion.button>
        )}
      />
      <Toggle
        aria-label="Default list"
        value="default-list"
        className={(state) =>
          `d-f d-9 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
            state.pressed
              ? "bg-indigo c-white"
              : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
          }`
        }
        render={(props) => (
          <motion.button
            type="button"
            {...props}
            whileTap={{ y: 1 }}
            transition={{ type: "spring", stiffness: 800, damping: 35 }}
          >
            <ListBulletsIcon size={18} weight="bold" />
          </motion.button>
        )}
      />
      <Toggle
        aria-label="Compact grid"
        value="compact-grid"
        className={(state) =>
          `d-f d-9 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
            state.pressed
              ? "bg-indigo c-white"
              : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
          }`
        }
        render={(props) => (
          <motion.button
            type="button"
            {...props}
            whileTap={{ y: 1 }}
            transition={{ type: "spring", stiffness: 800, damping: 35 }}
          >
            <DotsNineIcon size={18} weight="bold" />
          </motion.button>
        )}
      />
      <Toggle
        aria-label="Default grid"
        value="default-grid"
        className={(state) =>
          `d-f d-9 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
            state.pressed
              ? "bg-indigo c-white"
              : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
          }`
        }
        render={(props) => (
          <motion.button
            type="button"
            {...props}
            whileTap={{ y: 1 }}
            transition={{ type: "spring", stiffness: 800, damping: 35 }}
          >
            <SquaresFourIcon size={18} weight="bold" />
          </motion.button>
        )}
      />
    </ToggleGroup>
  );
}
