import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import SkipLink from "@/components/ui/skip-link";

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h:dvh c:ink">
      <SkipLink />
      <Navbar />

      <main
        id="main"
        className="is:i mx:auto px:6 max-w:clamp(40rem,80vw,96rem)"
      >
        <div className="d:g gtc:1 g:8 @lg:gtc:12">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
