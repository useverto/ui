export type DisplayTheme = "Light" | "Dark";

export interface ToastData {
  title: string;
  description: string;
  type?: "success" | "info" | "error" | "warning";
}
