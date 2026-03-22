import {
  DeviceMobileCameraIcon,
  DeviceTabletSpeakerIcon,
  LaptopIcon,
  MonitorIcon,
} from "@phosphor-icons/react/dist/ssr";

interface Props {
  prefix: string;
}

const breakpoints = [
  {
    prefix: "sm",
    label: "Small",
    minWidth: "640px",
    icon: DeviceMobileCameraIcon,
  },
  {
    prefix: "md",
    label: "Medium",
    minWidth: "768px",
    icon: DeviceTabletSpeakerIcon,
  },
  { prefix: "lg", label: "Large", minWidth: "1024px", icon: LaptopIcon },
  {
    prefix: "xxl",
    label: "Extra Large",
    minWidth: "1536px",
    icon: MonitorIcon,
  },
] as const;

export default function ResponsiveVariant({ prefix }: Props) {
  return (
    <div className="d-g gtc-1 g-3 mb-6 sm:gtc-2">
      {breakpoints.map((bp) => (
        <div
          key={bp.prefix}
          className="d-f ai-c g-3 p-3 bc-clay bg-midnight bw-1 br-sm"
        >
          <bp.icon size={24} weight="duotone" className="c-cornflower fs-0" />
          <div className="f-1">
            <code className="d-b c-mauve mb-1 fs-sm">
              {bp.prefix}:{prefix}-*
            </code>
            <div className="d-f ai-c jc-sb">
              <span className="c-white/70 fs-xs">{bp.label}</span>
              <span className="c-white/40 fs-xs">≥{bp.minWidth}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
