"use client";

import { Combobox } from "@base-ui/react/combobox";
import { Check, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

function ItemIcon({ selected }: { selected: boolean }) {
  return selected ? (
    <Check className="fs-0 w-4 h-4 c-indigo-6" />
  ) : (
    <Check className="fs-0 w-4 h-4 c-transparent" />
  );
}

export default function ComboboxMultiple() {
  const [open, setOpen] = React.useState(false);

  return (
    <Combobox.Root multiple items={skills} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2 c-slate-10 fs-sm">
        <label htmlFor="skills-input" className="fw-600">
          Skills
        </label>
        <div className="d-f fw-w ai-c g-1 min-h-10 w-72 px-2 py-1 bg-white bc-silver-3 bw-1 br-md fw:os-s fw:ow-2 fw:oo-2 fw:oc-indigo-6">
          <Combobox.Chips className="d-c g-1">
            {
              ((chip: string) => (
                <Combobox.Chip
                  key={chip}
                  className="d-f ai-c g-1 px-2 py-0 h-6 bg-indigo-1 bc-indigo-2 c-indigo-7 bw-1 br-pill fs-xs fw-500"
                >
                  {chip}
                  <Combobox.ChipRemove
                    className="d-f b-0 ai-c jc-c p-0 bg-transparent c-indigo-5 c-p h:c-indigo-8"
                    aria-label={`Remove ${chip}`}
                  >
                    <Xmark className="w-3 h-3" />
                  </Combobox.ChipRemove>
                </Combobox.Chip>
              )) as unknown as React.ReactNode
            }
          </Combobox.Chips>
          <Combobox.Input
            id="skills-input"
            placeholder="Search skills..."
            className="f-1 min-w-16 h-7 px-1 bg-transparent c-slate-10 fs-md"
          />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <Combobox.Portal keepMounted>
            <Combobox.Positioner className="ow-0" sideOffset={12}>
              <Combobox.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                }
                className="o-h w-72 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-lg"
              >
                <Combobox.List className="oy-auto py-1 max-h-56 ow-0">
                  {(skill: string) => (
                    <Combobox.Item
                      key={skill}
                      value={skill}
                      render={(props, state) => (
                        <div
                          {...props}
                          className={`d-f ai-c g-2 py-2 px-3 fs-sm c-slate-8 us-none c-d c-p br-sm mx-1 ${
                            state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                          }`}
                        >
                          <ItemIcon selected={state.selected} />
                          <span className="fg-1">{skill}</span>
                        </div>
                      )}
                    />
                  )}
                </Combobox.List>
                <Combobox.Empty className="c-slate-6 fs-sm">
                  <div className="py-4 px-4">No skills found.</div>
                </Combobox.Empty>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        )}
      </AnimatePresence>
    </Combobox.Root>
  );
}

const skills = [
  "CSS",
  "GraphQL",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "React",
  "SCSS",
  "TypeScript",
  "Yumma CSS",
];
