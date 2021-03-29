import { CSSProperties } from "react";

export function formatTime(time: Date): string {
  return new Intl.DateTimeFormat("en", {
    // @ts-ignore
    timeStyle: "medium",
    dateStyle: "short"
  }).format(time);
}

export function formatBalance(val: number | string) {
  val = String(val);
  const full = val.split(".")[0];
  if (full.length >= 10) return full;
  return val.slice(0, 10);
}

export interface DefaultProps {
  className?: string;
  style?: CSSProperties;
}
