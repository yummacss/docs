import { bleakHouse } from "@/constants/p";

export default function BackgroundAttachmentLocal() {
  return (
    <div
      className="o-auto ba-l bs-c ff-c fs-xxl fw-700 max-h-80 p-5 ta-c"
      style={{ backgroundImage: "url(/img/sea.jpg)" }}
    >
      {bleakHouse}
    </div>
  );
}
