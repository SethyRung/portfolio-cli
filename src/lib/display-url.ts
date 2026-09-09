export function displayUrl(url: string): string {
  if (url.startsWith("mailto:")) {
    return url.slice("mailto:".length);
  }
  return url.replace(/^https:\/\//, "").replace(/\/$/, "");
}
