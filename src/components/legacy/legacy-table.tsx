"use client";

interface ClassItem {
  className: string;
  properties: string[];
}

interface AdditionalClass {
  name: string;
  value: string;
}

interface LegacyTableProps {
  additionalClasses?: AdditionalClass[];
  classPrefix: string;
  data?: ClassItem[];
  incrementName?: string;
  incrementValue: number;
  incrementPrefix?: number;
  propNames: string[];
  range: number;
  unit?: string;
  excludeZero?: boolean;
  round?: number;
}

function generateClassData(
  classPrefix: string,
  propNames: string[],
  range: number,
  incrementValue: number,
  incrementPrefix?: number,
  unit?: string,
  additionalClasses?: AdditionalClass[],
  excludeZero?: boolean,
  round?: number,
  incrementName?: string,
): ClassItem[] {
  const data: ClassItem[] = [];
  const startIndex = excludeZero ? 1 : 0;

  for (let i = startIndex; i <= range; i++) {
    const properties = propNames.map((propertyName) => {
      let value = incrementName
        ? incrementName.replace(/%i/g, `${i * incrementValue}`)
        : unit
          ? `${i * incrementValue}${unit}`
          : `${i * incrementValue}`;

      if (round !== undefined) {
        value = parseFloat(value).toFixed(round);
      }

      return `${propertyName}: ${value};`;
    });

    const className = incrementPrefix
      ? `${classPrefix}${i * incrementPrefix}`
      : `${classPrefix}${i * 1}`;

    data.push({ className, properties });
  }

  if (additionalClasses) {
    additionalClasses.forEach((additionalClass) => {
      const properties = propNames.map(
        (propertyName) => `${propertyName}: ${additionalClass.value};`,
      );
      data.push({
        className: `${classPrefix}${additionalClass.name}`,
        properties,
      });
    });
  }

  return data;
}

export default function LegacyTable({
  additionalClasses,
  classPrefix,
  data,
  incrementName,
  incrementValue,
  incrementPrefix,
  propNames,
  range,
  unit,
  excludeZero,
  round,
}: LegacyTableProps) {
  const codeData =
    data ||
    generateClassData(
      classPrefix,
      propNames,
      range,
      incrementValue,
      incrementPrefix,
      unit,
      additionalClasses,
      excludeZero,
      round,
      incrementName,
    );

  return (
    <div className="max-h-90 o-y-auto mb-6">
      <table className="w-full bc-c" style={{ backgroundColor: "#21243fa6" }}>
        <thead>
          <tr>
            <th
              className="fs-md fw-600 px-4 py-2 ta-l b-1 tc-white"
              style={{ borderColor: "#31365e" }}
            >
              Class
            </th>
            <th
              className="fs-md fw-600 px-4 py-2 ta-l b-1 tc-white"
              style={{ borderColor: "#31365e" }}
            >
              Style
            </th>
          </tr>
        </thead>
        <tbody>
          {codeData.map((classItem, index) => (
            <tr key={`${classItem.className}-${index}`}>
              <td
                className="px-4 py-2 b-1 tc-white/80"
                style={{ borderColor: "#31365e" }}
              >
                <code
                  className="px-2 py-1"
                  style={{ backgroundColor: "#31365e" }}
                >
                  {classItem.className}
                </code>
              </td>
              <td
                className="px-4 py-2 b-1 tc-white/80"
                style={{ borderColor: "#31365e" }}
              >
                <code className="fs-sm">{classItem.properties.join("\n")}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
