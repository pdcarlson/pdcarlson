import { Sidebar } from "@/components/sidebar";
import { FooterBar } from "@/components/footer-bar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen lg:flex-row flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main id="main" tabIndex={-1} className="flex-1 outline-none">{children}</main>
        <FooterBar />
      </div>
    </div>
  );
}
