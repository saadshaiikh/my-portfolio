import type { ReactElement } from "react";

import { projects } from "@/data/projects";

type ProjectsProps = {
  className?: string;
};

export default function Projects({ className }: ProjectsProps): ReactElement {
  return (
    <section className={className}>
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Projects</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              Selected work and experiments
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            return (
            <article
              key={project.id}
              className={[
                "group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10",
                isFeatured ? "md:col-span-2 md:p-8" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="space-y-4">
                <h3 className={`font-semibold text-white/90 ${isFeatured ? "text-2xl" : "text-xl"}`}>
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65">{project.summary}</p>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-white/55"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.links && project.links.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={`${project.id}-${link.label}`}
                        href={link.href}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40 hover:text-white"
                      >
                        {link.label}
                        <span className="text-white/40">↗</span>
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
