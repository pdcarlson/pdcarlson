import { Sidebar } from "@/components/sidebar";
import { FooterBar } from "@/components/footer-bar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen lg:flex-row flex-col">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1">{children}</main>
        <FooterBar />
      </div>
    </div>
  );
}
