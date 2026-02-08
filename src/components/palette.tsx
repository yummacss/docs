"use client";

import { Tooltip } from "@base-ui/react";
import { useState } from "react";
import tinycolor from "tinycolor2";
import { generateShades, getBorderColor, SHADE_LABELS } from "@/utils/colors";

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

export default function Palette({
  data,
  scale = SHADE_LABELS,
  whitePercentage = 14,
  blackPercentage = 14,
}: Props) {
  return (
    <div className="d-f fd-c g-1">
      <div className="d-none lg:d-f fd-c g-1 ai-c md:fd-r md:ai-c">
        <div className="ws-nw ta-c min-w-fc md:min-w-16 d-f ai-c mr-2" />
        <div
          className="d-g g-1 my-2 w-full f-1"
          style={{
            gridTemplateColumns: `repeat(${scale.length}, minmax(0, 1fr))`,
          }}
        >
          {scale.map((label, index) => (
            <div
              key={`header-${label}-${index}`}
              className="d-f ai-c jc-c c-white fs-sm"
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {data.map((colorItem) => {
        const shades = generateShades(
          colorItem.color,
          whitePercentage,
          blackPercentage,
        );
        return (
          <div
            key={colorItem.name}
            className="d-f fd-c g-1 ai-c md:fd-r md:ai-c"
          >
            <p className="ws-nw ta-c min-w-fc md:min-w-16 d-f ai-c mr-2 c-white fs-sm">
              {colorItem.name}
            </p>
            <div
              className="d-g g-1 w-full f-1"
              style={{
                gridTemplateColumns: `repeat(${scale.length}, minmax(0, 1fr))`,
              }}
            >
              {shades.map((shade, index) => (
                <ColorSwatch
                  key={`${colorItem.name}-${index}`}
                  name={colorItem.name}
                  shade={shade}
                  label={scale[index]}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ColorSwatch({
  name,
  shade,
  label,
}: {
  name: string;
  shade: string;
  label: string;
}) {
  const [showCopied, setShowCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleClick = async () => {
    const hex = tinycolor(shade).toHexString().toUpperCase();
    await navigator.clipboard.writeText(hex);

    setShowCopied(true);
    setTooltipOpen(true);
    setTimeout(() => {
      setShowCopied(false);
      setTooltipOpen(false);
    }, 1500);
  };

  const handleMouseEnter = () => {
    setTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    if (!showCopied) {
      setTooltipOpen(false);
    }
  };

  return (
    <Tooltip.Root open={tooltipOpen} onOpenChange={setTooltipOpen}>
      <Tooltip.Trigger
        className="w-full c-p p-r ar-1/1 br-1"
        style={{
          backgroundColor: shade,
          border: getBorderColor(shade),
          outline: "none",
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={`${name} ${label}: ${shade}`}
      />
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={10}>
          <Tooltip.Popup
            className="d-f fd-c px-2 py-1 c-white fs-xs br-1"
            style={{
              backgroundColor: "#21243f",
              border: "1px solid #31365e",
              transformOrigin: "bottom center",
              transition: !showCopied
                ? "transform 200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
              opacity: tooltipOpen ? 1 : 0,
              transform: tooltipOpen ? "scale(1)" : "scale(0.9)",
              pointerEvents: tooltipOpen ? "auto" : "none",
            }}
          >
            <Tooltip.Arrow className="d-f"></Tooltip.Arrow>
            {showCopied ? "Copied!" : `${name} ${label}`}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
