import { ContactForm } from "@/components/contact-form";
import { DrawUnderlineLink } from "@/components/draw-underline-link";
import { home } from "@/content/home";

export function ContactBlock() {
  const { head, body, email, links } = home.contact;

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_460px] lg:gap-[88px]">
      <div>
        <h2 className="font-display text-contact-head text-fg">
          {head}
          <span className="text-flare">.</span>
        </h2>

        <p className="mt-6 text-body-lg lg:text-contact-body text-fg-75 max-w-[520px]">
          {body}
        </p>

        <p className="mt-8 font-display italic text-email">
          <DrawUnderlineLink
            href={`mailto:${email}`}
            className="lg:[--dul-weight:3px]"
          >
            {email}
          </DrawUnderlineLink>
        </p>

        <div className="mt-10 hidden lg:flex gap-[26px] text-nav-link">
          {links.map((link) => (
            <DrawUnderlineLink
              key={link.href}
              href={link.href}
              tone="sage"
              external={link.href.startsWith("http")}
            >
              {link.label}
            </DrawUnderlineLink>
          ))}
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
