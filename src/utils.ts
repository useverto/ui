import { CSSProperties } from "react";
import { FloatingPosition } from "./types";
import ColorHash from "color-hash";

export function formatTime(time: Date, mobile = false): string {
  return new Intl.DateTimeFormat("en", {
    // @ts-ignore
    timeStyle: mobile ? undefined : "medium",
    dateStyle: "short"
  }).format(time);
}

export interface DefaultProps {
  className?: string;
  style?: CSSProperties;
}

export const getCssPosition = (position: FloatingPosition) =>
  position === "top"
    ? "bottom"
    : position === "bottom"
    ? "top"
    : position === "left"
    ? "right"
    : "left";

export type AssetType = "image" | "video" | "audio" | "other";
export type AssetTypeInfo = { type: AssetType; contentType: string };

export async function getAssetType(src: string): Promise<AssetTypeInfo> {
  const contentType = (await fetch(src)).headers.get("Content-Type");
  let type: AssetType = "other";

  if (contentType.match(/^image\//)) type = "image";
  else if (contentType.match(/^video\//)) type = "video";
  else if (contentType.match(/^audio\//)) type = "audio";

  return { type, contentType };
}

export function generateAvatarGradient(input: string) {
  const colorHash = new ColorHash({ saturation: 0.5 });
  const baseColor: string = colorHash.hex(input);

  return {
    baseColor,
    gradient: `linear-gradient(120deg, ${baseColor}44, ${baseColor}ff)`
  };
}

export function toKebab(str: string) {
  return str
    .replace(/\B([A-Z])(?=[a-z])/g, "-$1")
    .replace(/\B([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}
