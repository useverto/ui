export function formatTime(time: Date): string {
  return new Intl.DateTimeFormat("en", {
    // @ts-ignore
    timeStyle: "medium",
    dateStyle: "short"
  }).format(time);
}
