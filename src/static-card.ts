import { profile } from "./config/profile.ts";
import { displayUrl } from "./lib/display-url.ts";
import { theme } from "./theme.ts";

export const MIN_TUI_COLUMNS = 60;

export function shouldRenderTui(
  stdout: { readonly isTTY?: boolean; readonly columns?: number } = process.stdout,
): boolean {
  return Boolean(stdout.isTTY) && (stdout.columns ?? 0) >= MIN_TUI_COLUMNS;
}

function rgb(hex: string, text: string): string {
  const n = Number.parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `\x1b[38;2;${r};${g};${b}m${text}\x1b[0m`;
}

export function formatStaticCard(): string {
  const email = Buffer.from(profile.email, "base64").toString("utf8");
  const contacts = [
    ...profile.contacts.map((contact) => [contact.title, displayUrl(contact.url)] as const),
    ["Email", email] as const,
  ];
  const titleWidth = Math.max(...contacts.map(([title]) => title.length));

  const lines = [
    rgb(theme.mauve, profile.displayName),
    rgb(theme.teal, profile.taglines.join(" / ")),
    rgb(theme.subtext, profile.location),
    "",
    rgb(theme.peach, `${profile.jobTitle} · ${profile.employer}`),
    rgb(
      theme.green,
      `${profile.education.degree} · ${profile.education.school} · ${profile.education.years}`,
    ),
    "",
    rgb(theme.text, profile.bio),
    "",
    ...contacts.map(
      ([title, value]) =>
        `${rgb(theme.blue, title.padEnd(titleWidth))}  ${rgb(theme.subtext, value)}`,
    ),
    "",
    rgb(theme.subtext, "npx @sethyrung/portfolio  ·  bunx @sethyrung/portfolio"),
  ];

  return `${lines.join("\n")}\n`;
}

export function printStaticCard(out: { write(chunk: string): void } = process.stdout): void {
  out.write(formatStaticCard());
}
