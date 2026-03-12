import type { ReactElement } from "react";

import { site } from "@/data/site";

type NavbarProps = {
  className?: string;
};

export default function Navbar({ className }: NavbarProps): ReactElement {
  const rootClassName = [
    "fixed left-0 top-0 z-40 w-full bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={rootClassName}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/70">
          <span className="h-2 w-2 rounded-full bg-white/70" />
          <span>{site.name}</span>
        </div>
        <div className="hidden items-center gap-6 text-[0.65rem] uppercase tracking-[0.3em] text-white/45 sm:flex">
          <span>Portfolio</span>
        </div>
      </div>
      <div className="mx-auto h-px w-[92%] max-w-6xl bg-gradient-to-r from-transparent via-white/12 to-transparent" />
    </nav>
  );
}
