"use client";

import { useEffect, useState } from "react";

interface ClassProps {
  name: string;
}

interface ClassData {
  utility: string;
  property: string[];
}

const Class: React.FC<ClassProps> = ({ name }: ClassProps) => {
  const [data, setData] = useState<ClassData[]>([]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!name || typeof name !== "string") {
      setErrMsg("Invalid or missing 'name' property");
      return;
    }
    const slug = encodeURIComponent(name);
    fetch(`https://get.yummacss.com/api/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(`The API responded with: ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        setErrMsg(err instanceof Error ? err.message : String(err));
      });
  }, [name]);

  return (
    <div className="max-h-90 overflow-y-auto">
      <table>
        <thead>
          <tr>
            <th className="fs-md fw-600">Utility</th>
            <th className="fs-md fw-600">Properties</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <p className="fs-sm">{item.utility}</p>
                </td>
                <td>
                  <code>{item.property.join(" ")}</code>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} title={errMsg}>
                Failed to load data. Please try again later.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Class;
