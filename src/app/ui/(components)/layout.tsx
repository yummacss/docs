import ConditionalLeftSidebar from "@/components/ui/conditional-left-sidebar";
import ConditionalRightSidebar from "@/components/ui/conditional-right-sidebar";
import MobileBreadcrumb from "@/components/ui/mobile-breadcrumb";
import Navbar from "@/components/ui/navbar";

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <MobileBreadcrumb />

      <main className="~sm-xxl mx-auto px-6">
        <div className="d-g gtc-1 lg:gtc-12 g-8">
          <ConditionalLeftSidebar />

          <div className="lg:gc-s-6 pt-26 lg:pt-14">
            <article className="max-w-none">{children}</article>
          </div>

          <ConditionalRightSidebar />
        </div>
      </main>
    </div>
  );
}
