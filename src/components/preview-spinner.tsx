"use client";

import { useEffect, useState } from "react";

/**
 * Spinner for lazy registry preview loads.
 * Delayed so sub-~200ms loads keep a quiet reserved shell instead of a flash.
 */
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
      className="preview-spinner w-5 h-5"
      style={{ visibility: visible ? "visible" : "hidden" }}
    />
  );
}
