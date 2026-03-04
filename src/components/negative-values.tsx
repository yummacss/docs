import { ThermometerColdIcon } from "@phosphor-icons/react/dist/ssr";

interface Props {
  prefix: string;
}

export default function NegativeValues({ prefix }: Props) {
  return (
    <div
      className="mb-6 p-4 br-1"
      style={{ backgroundColor: "#1a1d2e", border: "1px solid #232741" }}
    >
      <div className="d-f ai-c g-3 mb-3">
        <div
          className="d-f ai-c jc-c fs-0 p-2 br-pill"
          style={{ backgroundColor: "#232741", color: "#9aa6ef" }}
        >
          <ThermometerColdIcon size={20} weight="duotone" />
        </div>
        <p className="c-white/70 fs-sm">
          Use the{" "}
          <code
            className="px-1"
            style={{ backgroundColor: "#232741", color: "#dda2f6" }}
          >
            --
          </code>{" "}
          syntax to apply negative numeric values.
        </p>
      </div>

      <div
        className="d-f ai-c g-2 p-3 br-1"
        style={{ backgroundColor: "#14162380" }}
      >
        <span className="c-white/50 fs-xs">Syntax:</span>
        <code className="fs-sm" style={{ color: "#dda2f6" }}>
          {prefix}--*
        </code>
      </div>
    </div>
  );
}
