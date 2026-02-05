import { bleakHouse } from "@/constants/p";

export default function BackgroundAttachmentScroll() {
  return (
    <div
      className="o-auto ba-s bs-c ff-c fs-xxl fw-700 max-h-80 p-5 ta-c"
      style={{ backgroundImage: "url(/img/sea.jpg)" }}
    >
      {bleakHouse}
    </div>
  );
}
