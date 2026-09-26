"use client";

import { useEffect, useState } from "react";

export default function PreviewSpinner({
  delayMs = 200,
}: {
  delayMs?: number;
}) {
  const [visible, setVisible] = useState(delayMs <= 0);

  useEffect(() => {
    if (delayMs <= 0) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const id = window.setTimeout(() => setVisible(true), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs]);

  return (
    <div
      role="status"
      aria-label="Loading preview"
      className={`w:5 h:5 bw:2 bc:silver-2 btc:silver-7 br:50% an:spin adu:700 atf:l aic:inf ${visible ? "v:v" : "v:h"}`}
    />
  );
}
