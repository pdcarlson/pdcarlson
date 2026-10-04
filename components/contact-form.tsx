"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { DrawUnderlineLink } from "@/components/draw-underline-link";
import { home } from "@/content/home";

type Status = "idle" | "sending" | "ok" | "error";

const copy = home.contact.form;

const fieldBase =
  "w-full bg-field-fill border border-fg-40 focus:border-flare px-4 py-3 text-contact-body text-fg placeholder:text-fg-50 [transition:border-color_var(--motion-swap)]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      honeypot: String(data.get("company") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`http ${res.status}`);
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="block">
        <span className="sr-only">Name</span>
        <input
          name="name"
          type="text"
          required
          placeholder={copy.namePlaceholder}
          className={fieldBase}
          onInvalid={(e) => e.currentTarget.setCustomValidity(copy.validation.name)}
          onInput={(e) => e.currentTarget.setCustomValidity("")}
        />
      </label>

      <label className="block">
        <span className="sr-only">Email</span>
        <input
          name="email"
          type="email"
          required
          placeholder={copy.emailPlaceholder}
          className={fieldBase}
          onInvalid={(e) => e.currentTarget.setCustomValidity(copy.validation.email)}
          onInput={(e) => e.currentTarget.setCustomValidity("")}
        />
      </label>

      <label className="block">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          placeholder={copy.messagePlaceholder}
          className={`${fieldBase} min-h-[110px] lg:min-h-[132px] resize-none`}
          onInvalid={(e) => e.currentTarget.setCustomValidity(copy.validation.message)}
          onInput={(e) => e.currentTarget.setCustomValidity("")}
        />
      </label>

      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-sage text-bg hover:bg-flare focus-visible:bg-flare py-3 text-resume-btn disabled:opacity-60 [transition:background-color_var(--motion-swap)]"
      >
        {status === "sending" ? copy.submittingLabel : copy.submitLabel}
      </button>

      <p className="hidden lg:block text-caption text-fg-50">{copy.helper}</p>

      {status === "ok" && (
        <p className="text-caption text-fg-75" role="status">
          {copy.successMessage}
        </p>
      )}
      {status === "error" && (
        <p className="text-caption text-fg-75" role="alert">
          {copy.errorMessage}
          <DrawUnderlineLink
            href={`mailto:${home.contact.email}`}
            tone="sage"
          >
            {home.contact.email}
          </DrawUnderlineLink>
        </p>
      )}
    </form>
  );
}
