import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { about } from "@/content/about";

export const metadata = { title: "About & Contact" };

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About & Contact" intro={about.intro} />

      <section className="bg-surface px-8 sm:px-16 lg:px-24 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="eyebrow mb-8">About Me</div>
            <p className="font-display text-[22px] leading-[32px] text-fg">{about.bio.lead}</p>
            <p className="mt-8 text-[16px] leading-[26px] text-muted">{about.bio.rest}</p>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
