import { expect, test } from "bun:test";
import { join } from "node:path";

const cli = join(import.meta.dir, "../bin/cli.js");

async function runCli(
  args: string[] = [],
  env: Record<string, string | undefined> = {},
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const spawnedEnv = { ...process.env, ...env };
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete spawnedEnv[key];
  }

  const proc = Bun.spawn([process.execPath, cli, ...args], {
    stdout: "pipe",
    stderr: "pipe",
    env: spawnedEnv,
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);
  return { stdout, stderr, exitCode };
}

function visible(text: string): string {
  return text.replace(/\u001B\[[0-9;]*[A-Za-z]/g, "");
}

test("sethyrung with no arguments prints the Dev Card on stdout and exits 0", async () => {
  const { stdout, stderr, exitCode } = await runCli();
  expect(exitCode).toBe(0);
  expect(stderr).toBe("");
  expect(visible(stdout)).toContain("Sethy Rung");
});

test("Dev Card shows name, Tagline, and follow-up links", async () => {
  const { stdout, exitCode } = await runCli();
  expect(exitCode).toBe(0);
  const text = visible(stdout);
  expect(text).toContain("Sethy Rung");
  expect(text).toContain("Full Stack Developer");
  expect(text).toContain("https://sethyrung.com");
  expect(text).toContain("https://github.com/sethyrung");
  expect(text).toContain("rungsethyhk@gmail.com");
  expect(text).not.toContain("Phnom Penh");
  expect(text).not.toMatch(/\bhe\/him\b/i);
  expect(text).not.toContain("InnoBlock");
});

test("Dev Card Hint maps Screens and lists Roles and Projects", async () => {
  const { stdout, exitCode } = await runCli();
  expect(exitCode).toBe(0);
  const text = visible(stdout);
  expect(text).toContain("sethyrung about");
  expect(text).toContain("sethyrung work");
  expect(text).toContain("sethyrung projects");
  expect(text).toContain("TTGreen");
  expect(text).toContain("03.2025—");
  expect(text).toContain("ttgreen");
  expect(text).toContain("Young Credit Bureau Program");
  expect(text).toContain("11.2023—12.2024");
  expect(text).toContain("ycbp");
  expect(text).toContain("Self-employed");
  expect(text).toContain("01.2024—");
  expect(text).toContain("self-employed");
  expect(text).toContain("Movies");
  expect(text).toContain("12.2025");
  expect(text).toContain("movies");
  expect(text).toContain("Helpdesk");
  expect(text).toContain("03.2026");
  expect(text).toContain("helpdesk");
  expect(text).toContain("The Angkor Times");
  expect(text).toContain("02.2025");
  expect(text).toContain("angkor-times");
  expect(text).toContain("Nuxt Boilerplate");
  expect(text).toContain("nuxt-boilerplate");
  expect(text).not.toContain("--help");
});

test("-h and --help print usage including Screen names and exit 0", async () => {
  for (const flag of ["-h", "--help"] as const) {
    const { stdout, stderr, exitCode } = await runCli([flag]);
    expect(exitCode).toBe(0);
    expect(stderr).toBe("");
    const text = visible(stdout);
    expect(text).toContain("sethyrung");
    expect(text).toContain("about");
    expect(text).toContain("work");
    expect(text).toContain("projects");
    expect(text).toMatch(/work .+slug/i);
    expect(text).toMatch(/projects .+slug/i);
  }
});

test("-v and --version print the package version and exit 0", async () => {
  const pkg = await Bun.file(join(import.meta.dir, "../package.json")).json();
  for (const flag of ["-v", "--version"] as const) {
    const { stdout, stderr, exitCode } = await runCli([flag]);
    expect(exitCode).toBe(0);
    expect(stderr).toBe("");
    expect(stdout.trim()).toBe(pkg.version);
  }
});

test("NO_COLOR yields no ANSI escape codes", async () => {
  const { stdout, stderr, exitCode } = await runCli([], { NO_COLOR: "1" });
  expect(exitCode).toBe(0);
  expect(stderr).toBe("");
  expect(stdout).not.toMatch(/\u001B\[/);
  expect(stdout).toContain("Sethy Rung");
});

test("sethyrung about prints the bio on stdout and exits 0", async () => {
  const { stdout, stderr, exitCode } = await runCli(["about"]);
  expect(exitCode).toBe(0);
  expect(stderr).toBe("");
  const text = visible(stdout);
  expect(text).toContain("web, mobile, and desktop");
  expect(text).toContain("Vue.js");
  expect(text).not.toContain("Royal University");
  expect(text).not.toContain("Credit Bureau Cambodia");
  expect(text).not.toContain("Full Stack Developer");
});

test("unknown Screen name lists known Screens on stderr and exits 1", async () => {
  const { stdout, stderr, exitCode } = await runCli(["contact"]);
  expect(exitCode).toBe(1);
  expect(stdout).toBe("");
  expect(stderr).toContain("about");
  expect(stderr).toContain("work");
  expect(stderr).toContain("projects");
  expect(stderr).not.toContain("help");
});

test("sethyrung about extra fails the same way as an unknown Screen", async () => {
  const { stdout, stderr, exitCode } = await runCli(["about", "extra"]);
  expect(exitCode).toBe(1);
  expect(stdout).toBe("");
  expect(stderr).toContain("about");
  expect(stderr).toContain("work");
  expect(stderr).toContain("projects");
});

test("sethyrung work prints the Work index on stdout and exits 0", async () => {
  const { stdout, stderr, exitCode } = await runCli(["work"]);
  expect(exitCode).toBe(0);
  expect(stderr).toBe("");
  const text = visible(stdout);
  expect(text).toContain("TTGreen");
  expect(text).toContain("03.2025—");
  expect(text).toContain("Young Credit Bureau Program");
  expect(text).toContain("11.2023—12.2024");
  expect(text).toContain("Self-employed");
  expect(text).toContain("01.2024—");
  expect(text).toContain("carbon management");
  expect(text).toContain("credit bureau");
  expect(text).toContain("full-stack");
  expect(text).not.toContain("TTGreenButton");
  expect(text).not.toContain("PE Agent");
});

test("sethyrung work <slug> prints that Role including Stack", async () => {
  const ttgreen = await runCli(["work", "ttgreen"]);
  expect(ttgreen.exitCode).toBe(0);
  const ttgreenText = visible(ttgreen.stdout);
  expect(ttgreenText).toContain("TTGreen");
  expect(ttgreenText).toContain("03.2025—");
  expect(ttgreenText).toContain("TTGreenButton");
  expect(ttgreenText).toContain("Vue 3");
  expect(ttgreenText).toContain("Tailwind CSS");

  const ycbp = await runCli(["work", "ycbp"]);
  expect(ycbp.exitCode).toBe(0);
  const ycbpText = visible(ycbp.stdout);
  expect(ycbpText).toContain("Young Credit Bureau Program");
  expect(ycbpText).toContain("11.2023—12.2024");
  expect(ycbpText).toContain("PE Agent");
  expect(ycbpText).toContain("Spring Boot");

  const self = await runCli(["work", "self-employed"]);
  expect(self.exitCode).toBe(0);
  const selfText = visible(self.stdout);
  expect(selfText).toContain("Self-employed");
  expect(selfText).toContain("01.2024—");
  expect(selfText).toContain("Portfolio Website");
  expect(selfText).toContain("Directus");
});

test("unknown Work slug lists known Role slugs on stderr and exits 1", async () => {
  const { stdout, stderr, exitCode } = await runCli(["work", "innoblock"]);
  expect(exitCode).toBe(1);
  expect(stdout).toBe("");
  expect(stderr).toContain("ttgreen");
  expect(stderr).toContain("ycbp");
  expect(stderr).toContain("self-employed");
});

test("extra tokens after a Role slug fail the same way", async () => {
  const { stdout, stderr, exitCode } = await runCli(["work", "ttgreen", "extra"]);
  expect(exitCode).toBe(1);
  expect(stdout).toBe("");
  expect(stderr).toContain("ttgreen");
  expect(stderr).toContain("ycbp");
  expect(stderr).toContain("self-employed");
});

test("sethyrung projects prints the Projects index on stdout and exits 0", async () => {
  const { stdout, stderr, exitCode } = await runCli(["projects"]);
  expect(exitCode).toBe(0);
  expect(stderr).toBe("");
  const text = visible(stdout);
  expect(text).toContain("Movies");
  expect(text).toContain("12.2025");
  expect(text).toContain("Helpdesk");
  expect(text).toContain("03.2026");
  expect(text).toContain("The Angkor Times");
  expect(text).toContain("02.2025");
  expect(text).toContain("Nuxt Boilerplate");
  expect(text).toContain("discovery");
  expect(text).toContain("ticket");
  expect(text).not.toContain("Keycloak OAuth2");
});

test("sethyrung projects <slug> prints that Project including Stack", async () => {
  const movies = await runCli(["projects", "movies"]);
  expect(movies.exitCode).toBe(0);
  const moviesText = visible(movies.stdout);
  expect(moviesText).toContain("Movies");
  expect(moviesText).toContain("12.2025");
  expect(moviesText).toContain("search");
  expect(moviesText).toContain("Nuxt");
  expect(moviesText).toContain("Tailwind CSS");

  const helpdesk = await runCli(["projects", "helpdesk"]);
  expect(helpdesk.exitCode).toBe(0);
  const helpdeskText = visible(helpdesk.stdout);
  expect(helpdeskText).toContain("Helpdesk");
  expect(helpdeskText).toContain("03.2026");
  expect(helpdeskText).toContain("Keycloak OAuth2");
  expect(helpdeskText).toContain("Spring Boot");

  const angkor = await runCli(["projects", "angkor-times"]);
  expect(angkor.exitCode).toBe(0);
  const angkorText = visible(angkor.stdout);
  expect(angkorText).toContain("The Angkor Times");
  expect(angkorText).toContain("Directus");

  const boilerplate = await runCli(["projects", "nuxt-boilerplate"]);
  expect(boilerplate.exitCode).toBe(0);
  const boilerplateText = visible(boilerplate.stdout);
  expect(boilerplateText).toContain("Nuxt Boilerplate");
  expect(boilerplateText).toContain("TypeScript");
});

test("unknown Projects slug lists known Project slugs on stderr and exits 1", async () => {
  const { stdout, stderr, exitCode } = await runCli(["projects", "glitch"]);
  expect(exitCode).toBe(1);
  expect(stdout).toBe("");
  expect(stderr).toContain("movies");
  expect(stderr).toContain("helpdesk");
  expect(stderr).toContain("angkor-times");
  expect(stderr).toContain("nuxt-boilerplate");
});

test("extra tokens after a Project slug fail the same way", async () => {
  const { stdout, stderr, exitCode } = await runCli(["projects", "movies", "extra"]);
  expect(exitCode).toBe(1);
  expect(stdout).toBe("");
  expect(stderr).toContain("movies");
  expect(stderr).toContain("helpdesk");
  expect(stderr).toContain("angkor-times");
  expect(stderr).toContain("nuxt-boilerplate");
});

test("the published CLI entry runs on Node", async () => {
  const build = Bun.spawnSync(["bun", "run", "build"], {
    cwd: join(import.meta.dir, ".."),
    stdout: "pipe",
    stderr: "pipe",
  });
  expect(build.exitCode).toBe(0);

  const proc = Bun.spawn(["node", cli], {
    cwd: join(import.meta.dir, ".."),
    stdout: "pipe",
    stderr: "pipe",
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);
  expect(exitCode).toBe(0);
  expect(stderr).toBe("");
  expect(visible(stdout)).toContain("Sethy Rung");
});
