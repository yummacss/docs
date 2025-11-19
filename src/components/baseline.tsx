import bcd from "@mdn/browser-compat-data";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";

interface BaselineProps {
  /** Example: "css.properties.accent-color" */
  path: string;
}

export default function Baseline({ path }: BaselineProps) {
  // resolve feature from dot path
  const parts = path.split(".");
  let feature: any = bcd;

  for (const part of parts) {
    feature = feature?.[part];
    if (!feature) return null;
  }

  const compat = feature.__compat;
  if (!compat) return null;

  const baseline = compat.status?.baseline ?? "false";

  const isHigh = baseline === "high";
  const isLow = baseline === "low";

  const statusLabel = isHigh
    ? "Baseline: Widely available"
    : isLow
      ? "Baseline: Limited availability"
      : "Not Baseline";

  const statusColor = isHigh ? "tc-green" : isLow ? "tc-orange" : "tc-red";

  const StatusIcon = isHigh
    ? CheckCircledIcon
    : isLow
      ? ExclamationTriangleIcon
      : CrossCircledIcon;

  const support = compat.support || {};

  const browsers = [
    { key: "chrome", name: "Chrome", icon: CheckCircledIcon },
    { key: "edge", name: "Edge", icon: CheckCircledIcon },
    { key: "firefox", name: "Firefox", icon: CheckCircledIcon },
    { key: "safari", name: "Safari", icon: CheckCircledIcon },
  ].map((b) => {
    const entry = support[b.key];
    const version = Array.isArray(entry)
      ? entry[0]?.version_added
      : entry?.version_added;

    return {
      ...b,
      supported: typeof version === "string",
      version: typeof version === "string" ? version : undefined,
    };
  });

  return (
    <div
      className="mb-6 p-4 rd-2"
      style={{ backgroundColor: "#1a1d2e", border: "1px solid #232741" }}
    >
      <div className="d-f ai-c g-2 mb-4">
        <StatusIcon className={statusColor} />
        <h3 className="fs-lg fw-500 tc-white">{statusLabel}</h3>
      </div>

      <div className="d-g g-4 gtc-1 sm:gtc-2 md:gtc-4">
        {browsers.map((browser) => (
          <div key={browser.key} className="d-f ai-c g-2">
            <div className={browser.supported ? "tc-green" : "tc-red"}>
              {browser.supported ? <CheckCircledIcon /> : <CrossCircledIcon />}
            </div>
            <span className="tc-white/80">
              {browser.name}
              {browser.version ? ` ${browser.version}+` : " —"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
