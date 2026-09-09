export function openUrl(url: string): void {
  if (process.platform === "darwin") {
    Bun.spawn(["open", url], { stdin: "ignore", stdout: "ignore", stderr: "ignore" });
    return;
  }
  if (process.platform === "win32") {
    Bun.spawn(["cmd", "/c", "start", "", url], {
      stdin: "ignore",
      stdout: "ignore",
      stderr: "ignore",
    });
    return;
  }
  Bun.spawn(["xdg-open", url], { stdin: "ignore", stdout: "ignore", stderr: "ignore" });
}
