import Button from "./button";
import Separator from "./separator";

export default function ButtonGroup() {
  return (
    <div className="d-f br-lg o-h bg-white bw-1 bc-silver-2">
      <Button variant="ghost" size="md" shape="square" style={{ flex: 1 }}>
        Day
      </Button>
      <Separator orientation="vertical" />
      <Button variant="ghost" size="md" shape="square" style={{ flex: 1 }}>
        Month
      </Button>
      <Separator orientation="vertical" />
      <Button variant="ghost" size="md" shape="square" style={{ flex: 1 }}>
        Year
      </Button>
    </div>
  );
}
