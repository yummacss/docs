import { SealCheck, Sparkles, TriangleExclamation } from "@gravity-ui/icons";
import { Chrome, Edge, Firefox, Safari } from "@ridemountainpig/svgl-react";
import data from "web-features/data.json";

interface FeatureStatus {
  baseline: false | "low" | "high";
  support: {
    chrome?: string;
    chrome_android?: string;
    edge?: string;
    firefox?: string;
    firefox_android?: string;
    safari?: string;
    safari_ios?: string;
  };
}

interface FeatureData {
  compat_features?: string[];
  status?: FeatureStatus;
}

const { features } = data as {
  features: Record<string, FeatureData>;
};

interface Props {
  /** Example: "css.properties.accent-color" */
  path: string;
}

export default function Baseline({ path }: Props) {
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

  const statusColor = isHigh ? "c-green" : isLow ? "c-green-5" : "c-yellow";

  const StatusIcon = isHigh
    ? SealCheck
    : isLow
      ? Sparkles
      : TriangleExclamation;

  const support = status.support || {};

  const browsers = [
    {
      key: "chrome",
      name: "Chrome",
      icon: Chrome,
      mobileKey: "chrome_android",
    },
    { key: "edge", name: "Edge", icon: Edge, mobileKey: null },
    {
      key: "firefox",
      name: "Firefox",
      icon: Firefox,
      mobileKey: "firefox_android",
    },
    { key: "safari", name: "Safari", icon: Safari, mobileKey: "safari_ios" },
  ].map((b) => {
    const desktopVersion = support[b.key as keyof typeof support];
    const mobileVersion = b.mobileKey
      ? support[b.mobileKey as keyof typeof support]
      : undefined;

    const isSupported = !!desktopVersion;
    const isDesktopOnly = isSupported && b.mobileKey !== null && !mobileVersion;

    return {
      ...b,
      supported: isSupported,
      desktopOnly: isDesktopOnly,
      version: desktopVersion,
    };
  });

  return (
    <div className="mb-6 p-4 bc-clay bg-midnight bw-1">
      <div className="mb-4">
        <div className="d-f ai-c g-2 mb-2">
          <StatusIcon className={`${statusColor} w-5 h-5`} />
          <h3 className="c-white fs-lg fw-500">{statusLabel}</h3>
        </div>
        <p className="c-white/70">{statusDescription}</p>
      </div>

      <div className="d-g g-4 gtc-1 sm:gtc-2 md:gtc-4">
        {browsers.map((browser) => (
          <div key={browser.key} className="d-f ai-c g-2">
            <div
              className="d-f ai-c jc-c w-6 h-6"
              style={{
                filter: !browser.supported ? "grayscale(1)" : "none",
                opacity: !browser.supported ? 0.5 : 1,
              }}
            >
              <browser.icon className="w-100% h-100%" />
            </div>
            <div className="d-f fd-c">
              <span
                className="c-white/80"
                style={{ opacity: !browser.supported ? 0.5 : 1 }}
              >
                {browser.name}
              </span>
              {browser.desktopOnly && (
                <span className="c-white/50 fs-xs">Desktop only</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
