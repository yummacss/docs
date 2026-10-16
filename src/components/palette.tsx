"use client";

import { Button } from "@base-ui/react";
import { useState } from "react";
import tinycolor from "tinycolor2";
import { generateShades, SHADE_LABELS } from "@/utils/colors";

interface ColorItem {
  name: string;
  color: string;
}

interface Props {
  data: ColorItem[];
  scale?: string[];
  whitePercentage?: number;
  blackPercentage?: number;
}

/** One paint chip per family: each shade prints its number & hex, Base twice as tall. */
export default function Palette({
  data,
  scale = SHADE_LABELS,
  whitePercentage = 14,
  blackPercentage = 14,
}: Props) {
  return (
    <ul
      className="d:g g:2 my:6"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(104px, 1fr))" }}
    >
      {data.map((item) => {
        const shades = generateShades(
          item.color,
          whitePercentage,
          blackPercentage,
        );
        const family = item.name.toLowerCase();
        return (
          <li
            key={item.name}
            className="d:f fd:c p:1 bc:border bg:surface bw:1"
          >
            {shades.map((shade, index) => (
              <Shade
                key={scale[index]}
                shade={shade}
                label={scale[index]}
                name={
                  scale[index] === "Base" ? family : `${family}-${scale[index]}`
                }
              />
            ))}
            <span className="pt:2 px:1 pb:1 ff:display c:ink fs:md">
              {item.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function Shade({
  shade,
  label,
  name,
}: {
  shade: string;
  label: string;
  name: string;
}) {
  const [copied, setCopied] = useState(false);
  const hex = tinycolor(shade).toHexString().toUpperCase();
  const base = label === "Base";

  const handleClick = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      onClick={handleClick}
      aria-label={`${name}: ${hex}${copied ? ", copied" : ""}`}
      className={`d:f ai:c jc:sb g:1 px:1 bw:0 ff:m fs:xs c:p fv:oc:ink fv:oo:2 fv:ow:2 ${base ? "h:8 fw:500" : "h:4"} ${tinycolor(shade).isLight() ? "c:black" : "c:white"}`}
      style={{ backgroundColor: shade }}
    >
      <span>{base ? "base" : label}</span>
      <span>{copied ? "Copied" : hex.slice(1)}</span>
    </Button>
  );
}
