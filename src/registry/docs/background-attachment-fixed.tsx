import { bleakHouse } from "@/constants/p";

export default function BackgroundAttachmentFixed() {
  return (
    <div
      className="o-auto ba-f bs-c ff-c fs-xxl fw-700 max-h-80 p-5 ta-c"
      style={{ backgroundImage: "url(/img/sea.jpg)" }}
    >
      {bleakHouse}
    </div>
  );
}
