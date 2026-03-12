import type { ReactElement } from "react";

import { aboutContent } from "@/data/about";

type AboutProps = {
  className?: string;
};

export default function About({ className }: AboutProps): ReactElement {
  return (
    <section className={className}>
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">{aboutContent.eyebrow}</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              {aboutContent.title}
            </h2>
            <p className="text-base leading-relaxed text-white/70 sm:text-lg">{aboutContent.body}</p>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                {aboutContent.focus.label}
              </p>
              <p className="mt-2 text-lg font-medium text-white/85">{aboutContent.focus.value}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                {aboutContent.location.label}
              </p>
              <p className="mt-2 text-lg font-medium text-white/85">{aboutContent.location.value}</p>
            </div>
            <div className="grid gap-3">
              {aboutContent.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
