#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const entry = join(dirname(fileURLToPath(import.meta.url)), "../src/index.tsx");

if (typeof process.versions.bun === "string") {
  await import(pathToFileURL(entry).href);
} else {
  const bun = process.platform === "win32" ? "bun.cmd" : "bun";
  const result = spawnSync(bun, [entry, ...process.argv.slice(2)], {
    stdio: "inherit",
    env: process.env,
  });
  if (result.error) {
    if (result.error.code === "ENOENT") {
      console.error("This Dev Card requires Bun. Install it from https://bun.sh");
      console.error("Then run: bunx @sethyrung/portfolio");
      process.exit(1);
    }
    console.error(result.error.message);
    process.exit(1);
  }
  process.exit(result.status ?? 1);
}
