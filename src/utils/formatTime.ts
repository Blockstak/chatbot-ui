export function formatHourAgo(timestamp: number) {
  const current = Date.now();

  const diff = current - timestamp;

  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours === 0) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }
}
