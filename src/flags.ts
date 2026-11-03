/** Truthy ENABLE_* style flags: 1 / true / yes / on (case-insensitive). */
export function envFlag(value: string | undefined | null): boolean {
  if (!value) return false;
  const v = value.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes" || v === "on";
}
