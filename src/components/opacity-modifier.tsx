import { DropHalfIcon } from "@phosphor-icons/react/dist/ssr";

interface Props {
  prefix: string;
}

export default function OpacityModifier({ prefix }: Props) {
  return (
    <div className="mb-6 p-4 bc-clay bg-midnight bw-1 br-1">
      <div className="d-f ai-c g-3 mb-3">
        <div className="d-f c-cornflower ai-c jc-c fs-0 p-2 bg-clay br-pill">
          <DropHalfIcon size={20} weight="duotone" />
        </div>
        <p className="c-white/70 fs-sm">
          Append <code className="c-mauve px-1 bg-clay">/[opacity]</code> to any
          color utility to control its transparency level.
        </p>
      </div>

      <div className="d-f ai-c g-2 p-3 bg-mirage br-1">
        <span className="c-white/50 fs-xs">Syntax:</span>
        <code className="c-mauve fs-sm">{prefix}-[color]/[0-100]</code>
      </div>
    </div>
  );
}
