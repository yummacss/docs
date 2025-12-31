import {
  ChecksIcon,
  SealCheckIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  WarningIcon,
} from "@phosphor-icons/react/dist/ssr";
import data from "web-features/data.json";

interface FeatureStatus {
  baseline: false | "low" | "high";
  support: {
    chrome?: string;
    edge?: string;
    firefox?: string;
    safari?: string;
  };
}

interface FeatureData {
  compat_features?: string[];
  status?: FeatureStatus;
}

const { features } = data as {
  features: Record<string, FeatureData>;
};

interface BaselineProps {
  /** Example: "css.properties.accent-color" */
  path: string;
}

export default function Baseline({ path }: BaselineProps) {
  // Find feature that contains this BCD key
  const matchingFeature = Object.entries(features).find(([, feature]) => {
    // Type guard: only FeatureData has compat_features
    if ("compat_features" in feature) {
      return feature.compat_features?.includes(path);
    }
    return false;
  });

  if (!matchingFeature) return null;

  const [, feature] = matchingFeature;

  // Type guard: only FeatureData has status
  if (!("status" in feature)) return null;

  const status = feature.status;
  if (!status) return null;

  const baseline = status.baseline;
  const isHigh = baseline === "high";
  const isLow = baseline === "low";

  const statusLabel = isHigh
    ? "Widely available"
    : isLow
      ? "Newly available"
      : "Limited availability";

  const statusDescription = isHigh
    ? "This feature is well established and works across many devices and browser versions."
    : isLow
      ? "This feature works across the latest devices and browser versions. This feature might not work in older devices or browsers."
      : "This feature does not work in some of the most widely-used browsers.";

  const statusColor = isHigh ? "c-white" : isLow ? "c-white" : "c-white";

  const StatusIcon = isHigh ? SealCheckIcon : isLow ? ChecksIcon : WarningIcon;

  const support = status.support || {};

  const browsers = [
    { key: "chrome", name: "Chrome" },
    { key: "edge", name: "Edge" },
    { key: "firefox", name: "Firefox" },
    { key: "safari", name: "Safari" },
  ].map((b) => {
    const version = support[b.key as keyof typeof support];

    return {
      ...b,
      supported: !!version,
      version: version,
    };
  });

  return (
    <div
      className="mb-6 p-4 rd-2"
      style={{ backgroundColor: "#1a1d2e", border: "1px solid #232741" }}
    >
      <div className="mb-4">
        <div className="d-f ai-c g-2 mb-2">
          <StatusIcon className={statusColor} size={20} weight="duotone" />
          <h3 className="fs-lg fw-500 c-white">{statusLabel}</h3>
        </div>
        <p className="c-white/70">{statusDescription}</p>
      </div>

      <div className="d-g g-4 gtc-1 sm:gtc-2 md:gtc-4">
        {browsers.map((browser) => (
          <div key={browser.key} className="d-f ai-c g-2">
            <div className={browser.supported ? "c-white" : "c-red"}>
              {browser.supported ? (
                <ThumbsUpIcon size={20} weight="duotone" />
              ) : (
                <ThumbsDownIcon size={20} />
              )}
            </div>
            <span className="c-white/80">{browser.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
