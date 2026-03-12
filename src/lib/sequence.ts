export type SequenceFrame = {
  index: number;
  src: string;
};

export type SequenceConfig = {
  frameCount: number;
  pathPrefix: string;
  filePrefix?: string;
  padLength?: number;
  startIndex?: number;
  extension: string;
};

export function buildSequence(config: SequenceConfig): SequenceFrame[] {
  const normalizedPrefix = normalizePrefix(config.pathPrefix);
  const padLength = config.padLength ?? 0;
  const startIndex = config.startIndex ?? 0;
  const filePrefix = config.filePrefix ?? "";

  return Array.from({ length: config.frameCount }, (_, index) => {
    const frameNumber = startIndex + index;
    const padded = padLength > 0 ? String(frameNumber).padStart(padLength, "0") : String(frameNumber);
    const fileName = `${filePrefix}${padded}.${config.extension}`;
    return {
      index,
      src: normalizedPrefix ? `${normalizedPrefix}/${fileName}` : `/${fileName}`,
    };
  });
}

function normalizePrefix(prefix: string): string {
  if (!prefix) {
    return "";
  }
  return prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
}
