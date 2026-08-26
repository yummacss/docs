import Navbar from "@/components/ui/navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <Navbar />

      {/* Same 12-col container as docs/UI; blog pages set their own column start. */}
      <main className="is-i mx-auto px-6 docs-container">
        <div className="d-g gtc-1 g-8 @lg:gtc-12">{children}</div>
      </main>
    </div>
  );
}
