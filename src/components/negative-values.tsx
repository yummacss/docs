import { Snowflake } from "@gravity-ui/icons";
import { type Category, getPrefix } from "../utils/yummacss";

interface Props {
  category: Category;
  name: string;
}

export default function NegativeValues({ category, name }: Props) {
  const prefix = getPrefix(category, name);

  return (
    <div className="mb-6 p-4 bc-clay bg-midnight bw-1 br-sm">
      <div className="d-f ai-c g-3 mb-3">
        <div className="d-f c-cornflower ai-c jc-c fs-0 p-2 bg-clay br-pill">
          <Snowflake className="w-5 h-5" />
        </div>
        <p className="c-white/70 fs-sm">
          Use the <code className="c-mauve px-1 bg-clay">--</code> syntax to
          apply negative numeric values.
        </p>
      </div>

      <div className="d-f ai-c g-2 p-3 bg-mirage br-sm">
        <span className="c-white/50 fs-xs">Syntax:</span>
        <code className="c-mauve fs-sm">{prefix}--*</code>
      </div>
    </div>
  );
}
