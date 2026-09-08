import { afterEach, describe, expect, test } from "bun:test";
import type { TestRendererSetup } from "@opentui/core/testing";
import { testRender } from "@opentui/react/test-utils";
import { App } from "./app.tsx";

const TERMINAL = { width: 100, height: 32 };

describe("Dev Card shell", () => {
  let setup: TestRendererSetup | undefined;

  afterEach(() => {
    if (setup && !setup.renderer.isDestroyed) {
      setup.renderer.destroy();
    }
  });

  test("frames the card with the package title", async () => {
    setup = await testRender(<App />, TERMINAL);
    const frame = await setup.waitForFrame((f) => f.includes("@sethyrung/portfolio"));
    expect(frame).toContain("@sethyrung/portfolio");
  });

  test("shows the owner's tagline beside the name banner", async () => {
    setup = await testRender(<App />, TERMINAL);
    const frame = await setup.waitForFrame((f) =>
      f.includes("Full Stack Developer / Cross-Platform Enthusiast"),
    );
    expect(frame).toContain("Full Stack Developer / Cross-Platform Enthusiast");
  });

  test("shows location in the header", async () => {
    setup = await testRender(<App />, TERMINAL);
    const frame = await setup.waitForFrame((f) => f.includes("Phnom Penh, Cambodia"));
    expect(frame).toContain("Phnom Penh, Cambodia");
    expect(frame).not.toContain("Full Stack Developer · Phnom Penh, Cambodia");
  });

  test("documents the key model on the frame", async () => {
    setup = await testRender(<App />, TERMINAL);
    const frame = await setup.waitForFrame((f) => f.includes("q/esc quit"));
    expect(frame).toContain("1-4 tabs");
    expect(frame).toContain("q/esc quit");
  });

  test("q stops the renderer", async () => {
    setup = await testRender(<App />, TERMINAL);
    await setup.flush();
    setup.mockInput.pressKey("q");
    await setup.waitFor(() => setup!.renderer.isDestroyed);
    expect(setup.renderer.isDestroyed).toBe(true);
  });

  test("Escape stops the renderer", async () => {
    setup = await testRender(<App />, TERMINAL);
    await setup.flush();
    setup.mockInput.pressEscape();
    // Lone ESC is held by the stdin parser until its 20ms timeout.
    await Bun.sleep(50);
    expect(setup.renderer.isDestroyed).toBe(true);
  });
});
