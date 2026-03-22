import { CursorClickIcon } from "@phosphor-icons/react/dist/ssr";

interface Props {
  prefix: string;
}

export default function HoverVariant({ prefix }: Props) {
  return (
    <div className="mb-6 p-4 bc-clay bg-midnight bw-1 br-sm">
      <div className="d-f ai-c g-3 mb-3">
        <div className="d-f c-cornflower ai-c jc-c fs-0 p-2 bg-clay br-pill">
          <CursorClickIcon size={20} weight="duotone" />
        </div>
        <p className="c-white/70 fs-sm">
          Add the <code className="c-mauve px-1 bg-clay">h:</code> prefix to
          apply styles only when the user hovers over the element.
        </p>
      </div>

      <div className="d-f ai-c g-2 p-3 br-sm bg-mirage">
        <span className="c-white/50 fs-xs">Syntax:</span>
        <code className="c-mauve fs-sm">h:{prefix}-*</code>
      </div>
    </div>
  );
}
