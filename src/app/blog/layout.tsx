import Navbar from "@/components/ui/navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <Navbar />

      {/* Same shape as the docs & UI layouts: one container, one 12-column
          grid, and each page places itself into it. Blog has no sidebar, so
          there is no rail to push content rightwards & the pages set their own
          column start instead. */}
      <main className="is-i mx-auto px-6 docs-container">
        <div className="d-g gtc-1 g-8 @lg:gtc-12">{children}</div>
      </main>
    </div>
  );
}
