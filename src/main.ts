import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { renderAnsi } from "@comark/ansi";
import pkg from "../package.json" with { type: "json" };
import { catalog, identity, links, project, role, stack, usage } from "./components.ts";

const PACKAGE = "@sethyrung/portfolio";

function launcherBin(): string {
  const ua = process.env.npm_config_user_agent ?? "";
  if (ua.startsWith("npm/")) return `npx ${PACKAGE}`;
  if (ua.startsWith("bun/")) return `bunx ${PACKAGE}`;
  return "sethyrung";
}

function pad(text: string, width: number): string {
  return text.length >= width ? text : `${text}${" ".repeat(width - text.length)}`;
}

function helpText(): string {
  const bin = launcherBin();
  const row = (argv: string, meaning: string) => `  ${pad(argv, 24)}${meaning}`;
  return [
    "USAGE",
    `  ${bin} [command]`,
    "",
    "COMMANDS",
    row("(none)", "Dev Card"),
    row("about", "Bio"),
    row("work [role]", "Work index, or a Role"),
    row("projects [project]", "Projects index, or a Project"),
    "",
    "FLAGS",
    row("-h, --help", "Show usage"),
    row("-v, --version", "Show version"),
    "",
  ].join("\n");
}

function resolveContentDir(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [join(here, "content"), join(here, "../src/content")];
  for (const dir of candidates) {
    if (existsSync(join(dir, "card.md"))) return dir;
  }
  throw new Error("Screen content not found");
}

const contentDir = resolveContentDir();

function slugsIn(folder: string): string[] {
  return readdirSync(join(contentDir, folder))
    .filter((name) => name.endsWith(".md") && name !== "index.md")
    .map((name) => name.slice(0, -3))
    .sort();
}

async function printScreen(relativePath: string): Promise<void> {
  const width = process.stdout.isTTY ? (process.stdout.columns ?? 80) : 80;
  const markdown = readFileSync(join(contentDir, relativePath), "utf8");
  const output = await renderAnsi(markdown, {
    width,
    components: { catalog, identity, links, project, role, stack, usage },
    data: { bin: launcherBin() },
  });
  process.stdout.write(output);
}

const argv = process.argv.slice(2);
const flag = argv[0];
if (flag === "-h" || flag === "--help") {
  process.stdout.write(helpText());
  process.exit(0);
}
if (flag === "-v" || flag === "--version") {
  process.stdout.write(`${pkg.version}\n`);
  process.exit(0);
}

const SCREENS = ["about", "work", "projects"] as const;
const screen = argv[0];
if (screen !== undefined && !(SCREENS as readonly string[]).includes(screen)) {
  process.stderr.write(`Unknown screen "${screen}". Known screens: ${SCREENS.join(", ")}\n`);
  process.exit(1);
}
if (screen === "about") {
  if (argv[1] !== undefined) {
    process.stderr.write(`Unknown screen "${argv[1]}". Known screens: ${SCREENS.join(", ")}\n`);
    process.exit(1);
  }
  await printScreen("about.md");
} else if (screen === "work") {
  const slug = argv[1];
  const roles = slugsIn("work");
  if (slug === undefined) {
    await printScreen("work/index.md");
  } else if (!roles.includes(slug) || argv[2] !== undefined) {
    process.stderr.write(`Unknown role "${argv[2] ?? slug}". Known roles: ${roles.join(", ")}\n`);
    process.exit(1);
  } else {
    await printScreen(`work/${slug}.md`);
  }
} else if (screen === "projects") {
  const slug = argv[1];
  const projects = slugsIn("projects");
  if (slug === undefined) {
    await printScreen("projects/index.md");
  } else if (!projects.includes(slug) || argv[2] !== undefined) {
    process.stderr.write(
      `Unknown project "${argv[2] ?? slug}". Known projects: ${projects.join(", ")}\n`,
    );
    process.exit(1);
  } else {
    await printScreen(`projects/${slug}.md`);
  }
} else {
  await printScreen("card.md");
}
