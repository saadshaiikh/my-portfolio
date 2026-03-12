"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import type { ReactElement, RefObject } from "react";

import { site } from "@/data/site";

type OverlayProps = {
  className?: string;
  scrollTarget: RefObject<HTMLElement | null>;
};

export default function Overlay({ className, scrollTarget }: OverlayProps): ReactElement {
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start start", "end end"],
  });

  const parallax = useTransform(scrollYProgress, [0, 1], [12, -12]);

  const section1Opacity = useTransform(scrollYProgress, [0.02, 0.24, 0.4], [0, 1, 0]);
  const section1Y = useTransform(scrollYProgress, [0.02, 0.24, 0.4], [28, 0, -28]);

  const section2Opacity = useTransform(scrollYProgress, [0.34, 0.56, 0.76], [0, 1, 0]);
  const section2Y = useTransform(scrollYProgress, [0.34, 0.56, 0.76], [28, 0, -28]);

  const section3Opacity = useTransform(scrollYProgress, [0.7, 0.88, 1], [0, 1, 0]);
  const section3Y = useTransform(scrollYProgress, [0.7, 0.88, 1], [28, 0, -28]);

  const rootClassName = ["overlay-layer pointer-events-none", className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      <motion.div
        className="sticky top-0 z-20 flex h-screen w-full items-center justify-center"
        style={{ y: parallax }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85" />
        <div className="relative z-10 h-full w-full">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: section1Opacity, y: section1Y }}
          >
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 text-center sm:px-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60 drop-shadow-[0_6px_18px_rgba(0,0,0,0.65)]">
                {site.name}
              </p>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white drop-shadow-[0_10px_26px_rgba(0,0,0,0.6)] sm:text-4xl md:text-5xl">
                {site.headline}
              </h1>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: section2Opacity, y: section2Y }}
          >
            <div className="w-full px-6 sm:px-12 lg:px-20">
              <div className="max-w-2xl text-left">
                <p className="text-2xl font-medium leading-snug text-white/90 drop-shadow-[0_10px_26px_rgba(0,0,0,0.6)] sm:text-3xl md:text-4xl">
                  {site.hero.statementOne}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: section3Opacity, y: section3Y }}
          >
            <div className="w-full px-6 sm:px-12 lg:px-20">
              <div className="ml-auto max-w-2xl text-right">
                <p className="text-2xl font-medium leading-snug text-white/90 drop-shadow-[0_10px_26px_rgba(0,0,0,0.6)] sm:text-3xl md:text-4xl">
                  {site.hero.statementTwo}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
