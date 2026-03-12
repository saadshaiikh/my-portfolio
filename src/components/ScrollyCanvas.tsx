"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ReactElement } from "react";

import { getCanvasSize, prepareCanvas, drawImageCover } from "@/lib/canvas";
import { buildSequence } from "@/lib/sequence";
import Overlay from "@/components/Overlay";

type ScrollyCanvasProps = {
  className?: string;
};

export default function ScrollyCanvas({ className }: ScrollyCanvasProps): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(-1);
  const lastRenderKeyRef = useRef<string>("");
  const firstFrameDrawnRef = useRef(false);
  const sizeRef = useRef(getCanvasSize());
  const metricsRef = useRef({ top: 0, height: 0, maxScroll: 1 });

  const frames = useMemo(
    () =>
      buildSequence({
        frameCount: 40,
        pathPrefix: "/sequence",
        filePrefix: "ezgif-frame-",
        padLength: 3,
        startIndex: 1,
        extension: "png",
      }),
    []
  );

  const getNearestLoaded = (index: number): number | null => {
    const loaded = loadedRef.current;
    if (!loaded.length) {
      return null;
    }

    if (loaded[index]) {
      return index;
    }

    const lastFrame = lastFrameRef.current;
    if (lastFrame >= 0 && loaded[lastFrame]) {
      return lastFrame;
    }

    for (let offset = 1; offset < loaded.length; offset += 1) {
      const before = index - offset;
      const after = index + offset;
      if (before >= 0 && loaded[before]) {
        return before;
      }
      if (after < loaded.length && loaded[after]) {
        return after;
      }
    }

    return null;
  };

  const updateMetrics = () => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const size = getCanvasSize();
    sizeRef.current = size;
    metricsRef.current = {
      top: rect.top + scrollY,
      height: rect.height,
      maxScroll: Math.max(1, rect.height - size.height),
    };
  };

  const drawFrame = (targetIndex: number, force = false) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const size = sizeRef.current;
    const context = prepareCanvas(canvas, size);
    if (!context) {
      return;
    }

    const clampedIndex = clamp(targetIndex, 0, frames.length - 1);
    const lowerIndex = Math.floor(clampedIndex);
    const upperIndex = Math.min(lowerIndex + 1, frames.length - 1);
    const alpha = clampedIndex - lowerIndex;
    const alphaBucket = Math.round(alpha * 100);

    const primaryIndex = getNearestLoaded(lowerIndex);
    if (primaryIndex === null) {
      return;
    }
    const secondaryIndex = getNearestLoaded(upperIndex);

    const renderKey = `${primaryIndex}:${secondaryIndex ?? "x"}:${alphaBucket}`;
    if (!force && renderKey === lastRenderKeyRef.current) {
      return;
    }

    context.clearRect(0, 0, size.width, size.height);
    context.globalAlpha = 1;
    const primaryImage = imagesRef.current[primaryIndex];
    if (primaryImage) {
      drawImageCover(context, primaryImage, size.width, size.height, false);
    }

    if (
      secondaryIndex !== null &&
      secondaryIndex !== primaryIndex &&
      alphaBucket > 0 &&
      alpha < 1
    ) {
      const secondaryImage = imagesRef.current[secondaryIndex];
      if (secondaryImage) {
        context.globalAlpha = alpha;
        drawImageCover(context, secondaryImage, size.width, size.height, false);
      }
    }

    context.globalAlpha = 1;
    lastFrameRef.current = primaryIndex;
    lastRenderKeyRef.current = renderKey;
  };

  const updateFrameFromScroll = (force = false) => {
    const { top, maxScroll } = metricsRef.current;
    const scrollY = window.scrollY || window.pageYOffset;
    const progress = clamp((scrollY - top) / maxScroll, 0, 1);
    const targetIndex = progress * (frames.length - 1);
    drawFrame(targetIndex, force);
  };

  useEffect(() => {
    updateMetrics();
    const images = frames.map((frame) => {
      const image = new Image();
      image.decoding = "async";
      image.src = frame.src;
      return image;
    });

    imagesRef.current = images;
    loadedRef.current = new Array(images.length).fill(false);

    images.forEach((image, index) => {
      const handleLoad = async (success: boolean) => {
        if (success && "decode" in image) {
          try {
            await image.decode();
          } catch {
            // Ignore decode failures; fallback to normal draw.
          }
        }

        loadedRef.current[index] = success;
        if (success && index === 0 && !firstFrameDrawnRef.current) {
          firstFrameDrawnRef.current = true;
          drawFrame(0);
        } else {
          updateFrameFromScroll(true);
        }
      };

      if (image.complete) {
        void handleLoad(image.naturalWidth > 0);
      } else {
        image.onload = () => {
          void handleLoad(true);
        };
        image.onerror = () => {
          void handleLoad(false);
        };
      }
    });

    return () => {
      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [frames]);

  useEffect(() => {
    const handleResize = () => {
      updateMetrics();
      updateFrameFromScroll(true);
    };

    const tick = () => {
      updateFrameFromScroll();
      rafRef.current = window.requestAnimationFrame(tick);
    };

    updateMetrics();
    updateFrameFromScroll(true);
    rafRef.current = window.requestAnimationFrame(tick);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      viewport?.removeEventListener("resize", handleResize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [frames]);

  const rootClassName = ["scrolly-canvas", "bg-[#121212]", className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName} ref={containerRef} style={{ position: "relative", height: "500vh" }}>
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-10 bg-gradient-to-b from-black/90 via-black/40 to-transparent" />
      <Overlay scrollTarget={containerRef} className="absolute inset-0 z-20" />
      <canvas
        ref={canvasRef}
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "block",
          backgroundColor: "#121212",
        }}
      />
    </div>
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
