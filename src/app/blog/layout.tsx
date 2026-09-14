import Navbar from "@/components/ui/navbar";
import SkipLink from "@/components/ui/skip-link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh c-white">
      <SkipLink />
      <Navbar />

      <main id="main" className="is-i mx-auto px-6 docs-container">
        <div className="d-g gtc-1 g-8 @lg:gtc-12">{children}</div>
      </main>
    </div>
  );
}
