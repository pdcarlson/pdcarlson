import { Nav } from "@/components/nav";
import { FooterBar } from "@/components/footer-bar";

// Shared by the (site) layout and not-found.tsx, which sits outside that group.
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:bg-sage focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <FooterBar />
    </div>
  );
}
