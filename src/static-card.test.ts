import { describe, expect, test } from "bun:test";
import { formatStaticCard, MIN_TUI_COLUMNS, shouldRenderTui } from "./static-card.ts";

describe("shouldRenderTui", () => {
  test("rejects non-TTY stdout", () => {
    expect(shouldRenderTui({ isTTY: false, columns: 120 })).toBe(false);
  });

  test("rejects a TTY narrower than the minimum", () => {
    expect(shouldRenderTui({ isTTY: true, columns: MIN_TUI_COLUMNS - 1 })).toBe(false);
  });

  test("accepts a wide enough TTY", () => {
    expect(shouldRenderTui({ isTTY: true, columns: MIN_TUI_COLUMNS })).toBe(true);
  });
});

describe("formatStaticCard", () => {
  test("prints identity, contacts, and the npx/bunx invoke lines", () => {
    const card = formatStaticCard();
    expect(card).toContain("Sethy Rung");
    expect(card).toContain("Full Stack Developer / Cross-Platform Enthusiast");
    expect(card).toContain("Phnom Penh, Cambodia");
    expect(card).toContain("sethyrung.com");
    expect(card).toContain("rungsethyhk@gmail.com");
    expect(card).toContain("npx @sethyrung/portfolio");
    expect(card).toContain("bunx @sethyrung/portfolio");
  });
});
