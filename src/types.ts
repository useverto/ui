export type DisplayTheme = "Light" | "Dark";

export interface ToastData {
  title?: string;
  description: string;
  duration: number;
  type?: "success" | "info" | "error" | "warning";
}

export type FloatingPosition = "top" | "bottom" | "left" | "right";
