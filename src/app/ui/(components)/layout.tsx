import LeftSidebarRouter from "@/components/ui/left-sidebar-router";
import Navbar from "@/components/ui/navbar";
import RightSidebarRouter from "@/components/ui/right-sidebar-router";

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Navbar showMobileSidebar />

      <main className="mx-auto px-6 sm-xxl">
        <div className="d-g gtc-1 g-8 lg:gtc-12">
          <LeftSidebarRouter />

          <div className="pt-12 lg:gc-s-6">
            <article className="max-w-none">{children}</article>
          </div>

          <RightSidebarRouter />
        </div>
      </main>
    </div>
  );
}
