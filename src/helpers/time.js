export function formatTime(time) {
  const minutes = Math.floor((time / 60000) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  return `${minutes.toFixed(0).toString().padStart(2, "0")}:${seconds
    .toFixed(0)
    .toString()
    .padStart(2, "0")}`;
}
