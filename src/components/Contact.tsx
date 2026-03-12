import type { ReactElement } from "react";

import { contactContent } from "@/data/contact";

type ContactProps = {
  className?: string;
};

export default function Contact({ className }: ContactProps): ReactElement {
  return (
    <section className={className}>
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">{contactContent.eyebrow}</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              {contactContent.title}
            </h2>
            <p className="text-base leading-relaxed text-white/70 sm:text-lg">{contactContent.body}</p>
            <a
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.35em] text-white/80 transition hover:border-white/50 hover:text-white"
              href={contactContent.cta.href}
            >
              {contactContent.cta.label}
              <span className="text-white/40">↗</span>
            </a>
          </div>
          <div className="grid gap-4">
            {contactContent.links.map((link) => (
              <a
                key={link.label}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/30 hover:bg-white/10"
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">{link.label}</p>
                <p className="mt-2 text-sm font-medium text-white/85">{link.value}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
