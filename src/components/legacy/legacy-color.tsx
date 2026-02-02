"use client";

import tinycolor from "tinycolor2";

interface ColorClass {
  color: string;
  value: string;
}

interface Props {
  classPrefix: string;
  propNames: string[];
  data: ColorClass[];
}

const mixColors = (color1: string, color2: string, weight: number): string => {
  return tinycolor.mix(color1, color2, weight).toHexString();
};

const generateShades = (color: string) => {
  const lightShades: string[] = [];
  const darkShades: string[] = [];

  for (let i = 6; i >= 1; i--) {
    lightShades.push(mixColors(color, "white", i * 10));
  }

  const baseColor = color;

  for (let i = 1; i <= 6; i++) {
    darkShades.push(mixColors(color, "black", i * 10));
  }

  return { lightShades, baseColor, darkShades };
};

function generateClassData(
  classPrefix: string,
  propNames: string[],
  data: ColorClass[],
) {
  return data.flatMap((colorClass) => {
    const { lightShades, baseColor, darkShades } = generateShades(
      colorClass.value,
    );

    return [
      ...lightShades.map((shade, i) => ({
        classTitle: `${classPrefix}l-${colorClass.color}-${6 - i}`,
        properties: propNames.map(
          (propertyName) => `${propertyName}: ${shade};`,
        ),
        colorValue: shade,
      })),
      {
        classTitle: `${classPrefix}${colorClass.color}`,
        properties: propNames.map(
          (propertyName) => `${propertyName}: ${baseColor};`,
        ),
        colorValue: baseColor,
      },
      ...darkShades.map((shade, i) => ({
        classTitle: `${classPrefix}d-${colorClass.color}-${i + 1}`,
        properties: propNames.map(
          (propertyName) => `${propertyName}: ${shade};`,
        ),
        colorValue: shade,
      })),
    ];
  });
}

export default function LegacyColor({
  classPrefix,
  propNames,
  data,
}: Props) {
  const colorData = generateClassData(classPrefix, propNames, data);

  return (
    <div className="max-h-90 o-y-auto mb-6">
      <table className="w-full bc-c">
        <thead>
          <tr>
            <th
              className="fs-md fw-600 px-4 py-2 ta-l bw-1 c-white"
              style={{ borderColor: "#31365e80" }}
            >
              Class
            </th>
            <th
              className="fs-md fw-600 px-4 py-2 ta-l bw-1 c-white"
              style={{ borderColor: "#31365e80" }}
            >
              Styles
            </th>
          </tr>
        </thead>
        <tbody>
          {colorData.map((classItem, index) => (
            <tr key={`${classItem.classTitle}-${index}`}>
              <td
                className="px-4 py-2 bw-1 c-white/80"
                style={{ borderColor: "#31365e80" }}
              >
                <code className="fs-xs" style={{ color: "#dda2f6" }}>
                  {classItem.classTitle}
                </code>
              </td>
              <td
                className="px-4 py-2 bw-1 c-white/80"
                style={{ borderColor: "#31365e80" }}
              >
                <code className="fs-xs" style={{ color: "#bec6f2" }}>
                  {classItem.properties.join("\n")}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
