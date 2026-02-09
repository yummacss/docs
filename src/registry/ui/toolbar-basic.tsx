"use client";

import { Separator } from "@base-ui/react/separator";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar } from "@base-ui/react/toolbar";
import {
  TextBolderIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function ExampleToolbar() {
  return (
    <Toolbar.Root className="d-f ai-c g-1 br-2 bw-1 bc-silver-2 bg-white p-1">
      <ToggleGroup className="d-f g-1" aria-label="Text formatting">
        <Toggle
          aria-label="Bold"
          value="bold"
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
              <TextBolderIcon size={18} weight="bold" />
            </motion.button>
          )}
        />
        <Toggle
          aria-label="Italic"
          value="italic"
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
              <TextItalicIcon size={18} weight="bold" />
            </motion.button>
          )}
        />
        <Toggle
          aria-label="Underline"
          value="underline"
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
              <TextUnderlineIcon size={18} weight="bold" />
            </motion.button>
          )}
        />
        <Toggle
          aria-label="Strikethrough"
          value="strikethrough"
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
              <TextStrikethroughIcon size={18} weight="bold" />
            </motion.button>
          )}
        />
      </ToggleGroup>

      <Separator orientation="vertical" className="w-px h-5 bg-silver-3" />

      <Toolbar.Group className="d-f g-1" aria-label="Actions">
        <Toolbar.Button className="d-f h-9 ai-c jc-c px-3 br-1 bw-0 fs-sm fw-600 c-slate-8 us-none c-p bg-transparent h:bg-silver-1 h:c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
          Undo
        </Toolbar.Button>
        <Toolbar.Button className="d-f h-9 ai-c jc-c px-3 br-1 bw-0 fs-sm fw-600 c-slate-8 us-none c-p bg-transparent h:bg-silver-1 h:c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
          Redo
        </Toolbar.Button>
      </Toolbar.Group>
    </Toolbar.Root>
  );
}
