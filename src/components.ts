import { resolveAttribute, type NodeHandler } from "comark/render";

function paint(colors: boolean, code: string, text: string): string {
  if (!colors || text === "") return text;
  return `${code}${text}\x1b[0m`;
}

function pad(text: string, width: number): string {
  return text.length >= width ? text : `${text}${" ".repeat(width - text.length)}`;
}

function wrap(text: string, width: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line === "" ? word : `${line} ${word}`;
    if (next.length > width && line !== "") {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line !== "") lines.push(line);
  return lines.length === 0 ? [""] : lines;
}

function displayPeriod(period: string): string {
  if (period.endsWith("—")) return `${period}now`;
  if (/^\d{2}\.\d{4}$/.test(period)) return `${period}—now`;
  return period;
}

function textOf(node: unknown): string {
  if (typeof node === "string") return node;
  if (!Array.isArray(node) || node[0] === null) return "";
  return node.slice(2).map(textOf).join("");
}

function findAnchors(node: unknown): { label: string; href: string }[] {
  if (typeof node === "string" || !Array.isArray(node) || node[0] === null) return [];
  if (node[0] === "a") {
    const href = String((node[1] as { href?: unknown }).href ?? "");
    return [{ label: textOf(node).trim(), href }];
  }
  return node.slice(2).flatMap(findAnchors);
}

function listItems(node: unknown): string[] {
  if (typeof node === "string" || !Array.isArray(node) || node[0] === null) return [];
  if (node[0] === "li") {
    const label = textOf(node).trim();
    return label === "" ? [] : [label];
  }
  return node.slice(2).flatMap(listItems);
}

export const identity: NodeHandler = (node, state) => {
  const name = String(resolveAttribute(node[1], state.renderData, "name") ?? "");
  const tagline = String(resolveAttribute(node[1], state.renderData, "tagline") ?? "");
  const colors = Boolean(state.context.colors);
  const header = paint(colors, "\x1b[1m", "NAME");
  const who =
    tagline === ""
      ? paint(colors, "\x1b[1m", name)
      : `${paint(colors, "\x1b[1m", name)} — ${paint(colors, "\x1b[2m", tagline)}`;
  return `${header}\n       ${who}\n\n`;
};

export const usage: NodeHandler = async (node, state) => {
  const bin = String(state.data.bin ?? "sethyrung");
  const colors = Boolean(state.context.colors);
  const header = paint(colors, "\x1b[1m", "USAGE");
  const extras = (await state.flow(node, state))
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const lines = [bin, ...extras.map((line) => `${bin} ${line}`)];
  return `${header}\n${lines.map((line) => `       ${line}`).join("\n")}\n\n`;
};

export const links: NodeHandler = (node, state) => {
  const colors = Boolean(state.context.colors);
  const header = paint(colors, "\x1b[1m", "LINKS");
  const rows = findAnchors(node).map(({ label, href }) => {
    const url = href.replace(/^mailto:/, "");
    return `       ${pad(label, 10)}${url}`;
  });
  return rows.length === 0 ? "" : `${header}\n${rows.join("\n")}\n\n`;
};

export const catalog: NodeHandler = async (node, state) => {
  const title = String(resolveAttribute(node[1], state.renderData, "title") ?? "");
  const colors = Boolean(state.context.colors);
  const header = paint(colors, "\x1b[1m", title);
  const body = (await state.flow(node, state)).trimEnd();
  return body === "" ? `${header}\n\n` : `${header}\n${body}\n\n`;
};

export const fact: NodeHandler = async (node, state) => {
  const label = String(resolveAttribute(node[1], state.renderData, "label") ?? "");
  const colors = Boolean(state.context.colors);
  const items = listItems(node);
  let lines: string[];
  if (items.length > 0) {
    lines = [];
    for (let i = 0; i < items.length; i += 4) {
      lines.push(items.slice(i, i + 4).join("  "));
    }
  } else {
    const value = (await state.flow(node, state)).trim();
    lines = value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .flatMap((line) => wrap(line, 60));
    if (lines.length === 0) lines = [""];
  }
  const first = `${paint(colors, "\x1b[1m", `  ${pad(label, 10)}`)}${lines[0]}`;
  const rest = lines.slice(1).map((line) => `            ${line}`);
  return `${[first, ...rest].join("\n")}\n`;
};

const titledPeriod: NodeHandler = async (node, state) => {
  const title = String(resolveAttribute(node[1], state.renderData, "title") ?? "");
  const period = displayPeriod(String(resolveAttribute(node[1], state.renderData, "period") ?? ""));
  const slug = String(resolveAttribute(node[1], state.renderData, "slug") ?? "");
  const colors = Boolean(state.context.colors);
  if (slug !== "") {
    return `       ${pad(slug, 18)}${pad(title, 32)}${period}\n`;
  }
  const heading = `${paint(colors, "\x1b[1m", title)}  ${paint(colors, "\x1b[2m", period)}`;
  const body = (await state.flow(node, state)).trim();
  return body === "" ? `${heading}\n\n` : `${heading}\n${body}\n\n`;
};

export const role: NodeHandler = titledPeriod;
export const project: NodeHandler = titledPeriod;

export const stack: NodeHandler = async (node, state) => {
  const body = (await state.flow(node, state)).trim();
  const colors = Boolean(state.context.colors);
  const label = paint(colors, "\x1b[1m", "Stack");
  return body === "" ? "" : `${label}  ${body}\n`;
};
