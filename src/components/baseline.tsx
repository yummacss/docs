import bcd from "@mdn/browser-compat-data";
import { CheckCircledIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface BaselineProps {
  /**
   * The BCD path to the feature (e.g., "css.properties.accent-color")
   */
  path: string;
}

interface BrowserSupport {
  name: string;
  supported: boolean;
  version?: string;
}

export default function Baseline({ path }: BaselineProps) {
  // Navigate through the BCD object using the path
  const pathParts = path.split(".");
  let feature: any = bcd;

  for (const part of pathParts) {
    feature = feature?.[part];
    if (!feature) {
      return null; // Feature not found
    }
  }

  // Extract browser support data
  const support = feature.__compat?.support;
  if (!support) {
    return null; // No support data available
  }

  const browsers: BrowserSupport[] = [
    {
      name: "Chrome",
      supported: !!support.chrome?.version_added,
      version: support.chrome?.version_added,
    },
    {
      name: "Edge",
      supported: !!support.edge?.version_added,
      version: support.edge?.version_added,
    },
    {
      name: "Firefox",
      supported: !!support.firefox?.version_added,
      version: support.firefox?.version_added,
    },
    {
      name: "Safari",
      supported: !!support.safari?.version_added,
      version: support.safari?.version_added,
    },
  ];

  return (
    <div className="mb-6 p-4 b-1" style={{ backgroundColor: "#1a1d2e", borderColor: "#232741" }}>
      <h3 className="fs-lg fw-500 mb-3 tc-white">Browser Support</h3>
      <div className="d-g g-4 gtc-1 sm:gtc-2 md:gtc-4">
        {browsers.map((browser) => (
          <div key={browser.name} className="d-f ai-c g-2">
            <div className={browser.supported ? "tc-green" : "tc-orange"}>
              {browser.supported ? <CheckCircledIcon /> : <ExclamationTriangleIcon />}
            </div>
            <span className="tc-white/80">
              {browser.name}
              {browser.supported && browser.version && ` ${browser.version}+`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

