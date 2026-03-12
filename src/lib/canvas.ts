export type CanvasSize = {
  width: number;
  height: number;
  dpr: number;
};

export function getCanvasSize(target?: HTMLElement | null): CanvasSize {
  if (typeof window === "undefined") {
    return { width: 0, height: 0, dpr: 1 };
  }

  const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
  if (!target) {
    const viewport = window.visualViewport;
    const width = viewport ? Math.round(viewport.width) : window.innerWidth;
    const height = viewport ? Math.round(viewport.height) : window.innerHeight;
    return { width, height, dpr };
  }

  const rect = target.getBoundingClientRect();
  return { width: Math.round(rect.width), height: Math.round(rect.height), dpr };
}

export function prepareCanvas(
  canvas: HTMLCanvasElement,
  size: CanvasSize
): CanvasRenderingContext2D | null {
  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const displayWidth = Math.max(1, Math.floor(size.width * size.dpr));
  const displayHeight = Math.max(1, Math.floor(size.height * size.dpr));
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  canvas.style.width = `${size.width}px`;
  canvas.style.height = `${size.height}px`;
  context.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
  return context;
}

export function drawImageCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  clear = true
): void {
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;
  if (!imageWidth || !imageHeight || !width || !height) {
    return;
  }

  const scale = Math.max(width / imageWidth, height / imageHeight);
  const drawWidth = imageWidth * scale;
  const drawHeight = imageHeight * scale;
  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;

  if (clear) {
    context.clearRect(0, 0, width, height);
  }
  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}
