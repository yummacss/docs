"use client";

import { useState } from "react";
import tinycolor from "tinycolor2";

interface ColorItem {
  name: string;
  color: string;
}

interface PaletteProps {
  data: ColorItem[];
}

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

const borderColor = (color: string): string => {
  const textColor = tinycolor(color);
  const luminanceColor = textColor.getLuminance();

  if (luminanceColor > 0.9) {
    return "1px solid rgba(0, 0, 0, 0.1)";
  }

  if (luminanceColor < 0.1) {
    return "1px solid rgba(255, 255, 255, 0.1)";
  }

  return "none";
};

export default function Palette({ data }: PaletteProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="d-f fd-c">
      <div className="d-none lg:d-g fs-xs ta-c gtc-14">
        <div />
        {Array.from({ length: 13 }, (_, i) => {
          const label = i === 6 ? "Base" : i < 6 ? i + 1 : i;
          return <div key={`header-${label}`}>{label}</div>;
        })}
      </div>

      {data.map((colorItem) => {
        const shades = generateShades(colorItem.color);
        return (
          <div
            key={colorItem.name}
            className="d-f fd-c g-1 ai-c md:fd-r md:ai-c"
          >
            <p className="fs-sm ws-nw ta-c fw-500 min-w-fc md:min-w-16 jc-c d-f ai-c mr-2">
              {colorItem.name}
            </p>
            <div className="d-g g-1 my-2 w-full gtc-2 sm:gtc-4 md:gtc-6 lg:gtc-13 f-1">
              {shades.map((shade) => (
                <button
                  key={`${colorItem.name}-${shade}`}
                  type="button"
                  className="h-12 w-full c-p md:h-10 p-r"
                  style={{
                    backgroundColor: shade,
                    border: borderColor(shade),
                  }}
                  onClick={() => handleCopyColor(shade)}
                  title={shade}
                  aria-label={`Copy ${shade}`}
                >
                  {copiedColor === shade && (
                    <span className="p-a i-0 d-f ai-c jc-c w-full h-full tc-white fs-xs fw-500">
                      Copied!
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
