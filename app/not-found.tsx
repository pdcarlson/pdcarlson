import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { FooterBar } from "@/components/footer-bar";

export default function NotFound() {
  return (
    <div className="flex min-h-screen lg:flex-row flex-col">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-8 sm:px-16 lg:px-24 py-32">
          <div className="eyebrow mb-6">404</div>
          <h1 className="font-display text-[64px] leading-[72px] text-fg max-w-2xl">
            That page isn't here.
          </h1>
          <p className="mt-6 text-[18px] leading-[28px] text-subtle max-w-xl">
            Maybe it moved, maybe it never existed. Either way, the rest of the site is one click away.
          </p>
          <Link
            href="/"
            className="mt-12 inline-flex items-center px-10 py-4 text-[14px] tracking-eyebrow uppercase bg-accent text-on-accent hover:bg-accent-strong transition-colors"
          >
            Back home
          </Link>
        </main>
        <FooterBar />
      </div>
    </div>
  );
}
