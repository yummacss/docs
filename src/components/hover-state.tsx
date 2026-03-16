import { CursorClickIcon } from "@phosphor-icons/react/dist/ssr";

interface Props {
  prefix: string;
}

export default function HoverVariant({ prefix }: Props) {
  return (
    <div
      className="mb-6 p-4 br-1 bg-midnight bc-obsidian"
    >
      <div className="d-f ai-c g-3 mb-3">
        <div
          className="d-f ai-c jc-c fs-0 p-2 br-pill bg-obsidian"
          style={{ color: "#9aa6ef" }}
        >
          <CursorClickIcon size={20} weight="duotone" />
        </div>
        <p className="c-white/70 fs-sm">
          Add the{" "}
          <code
            className="px-1 bg-obsidian c-amethyst"
          >
            h:
          </code>{" "}
          prefix to apply styles only when the user hovers over the element.
        </p>
      </div>

      <div
        className="d-f ai-c g-2 p-3 br-1"
        style={{ backgroundColor: "#14162380" }}
      >
        <span className="c-white/50 fs-xs">Syntax:</span>
        <code className="fs-sm c-amethyst">
          h:{prefix}-*
        </code>
      </div>
    </div>
  );
}
