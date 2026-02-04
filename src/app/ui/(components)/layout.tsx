import LeftSidebarRouter from "@/components/ui/left-sidebar-router";
import MobileBreadcrumb from "@/components/ui/mobile-breadcrumb";
import Navbar from "@/components/ui/navbar";
import RightSidebarRouter from "@/components/ui/right-sidebar-router";

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <MobileBreadcrumb />

      <main className="sm-xxl mx-auto px-6">
        <div className="d-g gtc-1 lg:gtc-12 g-8">
          <LeftSidebarRouter />

          <div className="lg:gc-s-6 pt-24 lg:pt-12">
            <article className="max-w-none">{children}</article>
          </div>

          <RightSidebarRouter />
        </div>
      </main>
    </div>
  );
}
