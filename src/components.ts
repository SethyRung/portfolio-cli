import { resolveAttribute, type NodeHandler } from "comark/render";

function paint(colors: boolean, code: string, text: string): string {
  if (!colors || text === "") return text;
  return `${code}${text}\x1b[0m`;
}

export const identity: NodeHandler = (node, state) => {
  const name = String(resolveAttribute(node[1], state.renderData, "name") ?? "");
  const tagline = String(resolveAttribute(node[1], state.renderData, "tagline") ?? "");
  const colors = Boolean(state.context.colors);
  return `${paint(colors, "\x1b[1m", name)}\n${paint(colors, "\x1b[2m", tagline)}\n\n`;
};

export const links: NodeHandler = async (node, state) => {
  const body = (await state.flow(node, state)).trim();
  return body === "" ? "" : `${body}\n\n`;
};

const titledPeriod: NodeHandler = async (node, state) => {
  const title = String(resolveAttribute(node[1], state.renderData, "title") ?? "");
  const period = String(resolveAttribute(node[1], state.renderData, "period") ?? "");
  const colors = Boolean(state.context.colors);
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
