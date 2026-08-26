"use client";

import { Button } from "@base-ui/react";
import { NavArrowDown } from "iconoir-react";
import { Fragment, useEffect, useState } from "react";
import PropDescription from "@/components/prop-description";
import * as registry from "@/registry";
import { typeOf } from "@/utils/props";

/** Props table from `src/registry/meta/<id>.json`; descriptions collapse per row. */
export default function PropsTable({ registryId }: { registryId: string }) {
  const [meta, setMeta] = useState<registry.RegistryMeta | null>(null);
  const [open, setOpen] = useState<Set<string>>(new Set());

  useEffect(() => {
    const importMeta = registry.getRegistryMeta(registryId);
    if (!importMeta) return;
    importMeta().then((module) => setMeta(module.default));
  }, [registryId]);

  if (!meta) return null;

  const toggle = (name: string) => {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="ox-auto my-6">
      <table className="w-100% bc-border bg-transparent bc-c">
        <thead className="bg-surface">
          <tr>
            {["Prop", "Type", "Default"].map((heading) => (
              <th
                key={heading}
                className="px-4 py-2 bc-border c-foreground bw-1 ta-l fw-500"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {meta.props.map((prop) => {
            const isOpen = open.has(prop.name);
            const hasDescription = Boolean(prop.description);
            return (
              <Fragment key={prop.name}>
                <tr>
                  <td className="p-0 bc-border bw-1 va-t ws-nw">
                    {hasDescription ? (
                      <Button
                        onClick={() => toggle(prop.name)}
                        aria-expanded={isOpen}
                        className="d-f ai-c g-2 px-4 py-2 w-100% bg-transparent bw-0 c-p ta-l fv:oo--1 fv:oc-indigo-5"
                      >
                        <NavArrowDown
                          className={`fs-0 w-3 h-3 c-foreground/40 tp-c tdu-150 ${isOpen ? "ro-36" : ""}`}
                          aria-hidden
                        />
                        <code className="c-foreground fs-md ff-m">{prop.name}</code>
                      </Button>
                    ) : (
                      <div className="px-4 py-2">
                        <code className="c-foreground fs-md ff-m">{prop.name}</code>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 bc-border bw-1 va-t">
                    <code className="c-foreground/50 fs-sm ff-m">
                      {typeOf(prop)}
                    </code>
                  </td>
                  <td className="px-4 py-2 bc-border bw-1 va-t ws-nw">
                    {prop.default === undefined ? (
                      <span className="c-foreground/30">-</span>
                    ) : (
                      <code className="c-foreground/50 fs-sm ff-m">
                        {JSON.stringify(prop.default)}
                      </code>
                    )}
                  </td>
                </tr>
                {isOpen && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 pt-2 pb-3 bc-border c-foreground/80 bw-1"
                    >
                      <div className="pl-5">
                        <PropDescription text={prop.description} />
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
