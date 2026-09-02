export function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return String(date);
}

export function dateValue(date) {
  if (date instanceof Date && !Number.isNaN(date.getTime())) {
    return date.getTime();
  }
  const t = new Date(date).getTime();
  return Number.isNaN(t) ? 0 : t;
}
