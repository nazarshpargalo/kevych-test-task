function toMs(ts: number | string): number {
  const n = typeof ts === "string" ? Number(ts) : ts;
  if (!Number.isFinite(n)) return NaN;
  // If it's likely Unix seconds, convert to ms
  return n < 1e12 ? n * 1000 : n;
}

export function formatDateTime(
  timestamp: number | string,
  locale: string = "en-US"
) {
  const ms = toMs(timestamp);
  if (!Number.isFinite(ms)) return "-";
  try {
    return new Date(ms).toLocaleString(locale, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "-";
  }
}

// Convert Unix (ms or sec) → value suitable for <input type="datetime-local">
export function toDatetimeLocal(timestamp: number | string) {
  const ms = toMs(timestamp);
  if (!Number.isFinite(ms)) return "";
  const d = new Date(ms);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Convert <input type="datetime-local"> string → Unix ms
export function fromDatetimeLocal(value: string) {
  const ts = new Date(value).getTime();
  return Number.isNaN(ts) ? Date.now() : ts;
}
