import Link from "next/link";

export default function Banner() {
  return (
    <div className="p-r o-h mb-8">
      <div className="rainbow p-a i-0" />
      <div className="p-r d-f ai-c jc-c py-3 px-4 fs-sm fw-500 tc-white bf-b-sm">
        <Link href="/blog/yummacss-3.5.0">Yumma CSS 3.5 is live! 🎉</Link>
      </div>
    </div>
  );
}
