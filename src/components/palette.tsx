"use client";

import { Tooltip } from "@base-ui/react";
import { useState } from "react";
import tinycolor from "tinycolor2";

interface ColorItem {
  name: string;
  color: string;
}

interface PaletteProps {
  data: ColorItem[];
}

const SHADE_LABELS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "Base",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const generateShades = (color: string): string[] => {
  const percentage = 14;
  const shades: string[] = [];

  for (let i = 1; i <= 6; i++) {
    const weight = (7 - i) * percentage;
    const mixedColor = tinycolor.mix(color, "white", weight);
    shades.push(mixedColor.toHexString());
  }

  shades.push(tinycolor(color).toHexString());

  for (let i = 1; i <= 6; i++) {
    const weight = i * percentage;
    const mixedColor = tinycolor.mix(color, "black", weight);
    shades.push(mixedColor.toHexString());
  }

  return shades;
};

const getBorderColor = (color: string): string => {
  const luminance = tinycolor(color).getLuminance();

  if (luminance > 0.9) {
    return "1px solid rgba(0, 0, 0, 0.1)";
  }

  if (luminance < 0.1) {
    return "1px solid rgba(255, 255, 255, 0.1)";
  }

  return "none";
};

export default function Palette({ data }: PaletteProps) {
  return (
    <div className="d-f fd-c g-2">
      <div className="d-none lg:d-f fd-c g-1 ai-c md:fd-r md:ai-c">
        <div className="ws-nw ta-c min-w-fc md:min-w-16 d-f ai-c mr-2" />
        <div className="d-g g-1 my-2 w-full gtc-2 sm:gtc-4 md:gtc-6 lg:gtc-13 f-1">
          {SHADE_LABELS.map((label) => (
            <div
              key={`header-${label}`}
              className="d-f ai-c jc-c c-white fs-xs"
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {data.map((colorItem) => {
        const shades = generateShades(colorItem.color);
        return (
          <div
            key={colorItem.name}
            className="d-f fd-c g-1 ai-c md:fd-r md:ai-c"
          >
            <p className="ws-nw ta-c min-w-fc md:min-w-16 d-f ai-c mr-2 c-white">
              {colorItem.name}
            </p>
            <div className="d-g g-1 my-2 w-full gtc-2 sm:gtc-4 md:gtc-6 lg:gtc-13 f-1">
              {shades.map((shade, index) => (
                <ColorSwatch
                  key={`${colorItem.name}-${index}`}
                  name={colorItem.name}
                  shade={shade}
                  label={SHADE_LABELS[index]}
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

  const handleClick = async (e: React.MouseEvent) => {
    const hex = tinycolor(shade).toHexString().toUpperCase();
    const rgb = tinycolor(shade).toRgbString();

    if (e.shiftKey) {
      await navigator.clipboard.writeText(rgb);
    } else {
      await navigator.clipboard.writeText(hex);
    }

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
        className="h-12 w-full c-p md:h-10 p-r"
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
            className="d-f fd-c px-2 py-1 c-white fs-xs"
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
            <Tooltip.Arrow
              className="d-f"
              style={{
                bottom: "-8px",
                transform: "rotate(180deg)",
              }}
            >
              <ArrowSvg />
            </Tooltip.Arrow>
            {showCopied ? "Copied!" : `${name} ${label}`}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function ArrowSvg() {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        fill="#21243f"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        fill="#31365e"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        fill="#21243f"
      />
      <title>Arrow</title>
    </svg>
  );
}
