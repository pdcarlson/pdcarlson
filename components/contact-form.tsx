"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

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
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "send failed");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="eyebrow">Get in touch</div>

      <Field label="Name" name="name" type="text" placeholder="Your full name" required />
      <Field label="Email" name="email" type="email" placeholder="email@address.com" required />
      <Field label="Message" name="message" textarea placeholder="Enter your message here..." required />

      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-accent text-on-accent py-4 text-[14px] tracking-eyebrow uppercase hover:bg-accent-strong disabled:opacity-60 transition-colors"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>

      {status === "ok" && (
        <p className="text-[14px] text-fg" role="status">Thanks. I'll get back to you shortly.</p>
      )}
      {status === "error" && (
        <p className="text-[14px] text-fg" role="alert">
          Couldn't send — try emailing me directly instead.{error ? ` (${error})` : ""}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={4}
          className="bg-transparent border-b border-fg/10 focus:border-accent-strong py-2 text-[16px] text-fg placeholder:text-subtle outline-none resize-y"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className="bg-transparent border-b border-fg/10 focus:border-accent-strong py-2 text-[16px] text-fg placeholder:text-subtle outline-none"
        />
      )}
    </label>
  );
}
