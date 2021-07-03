import { CSSProperties, useEffect, useState } from "react";
import { FloatingPosition } from "./types";

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
