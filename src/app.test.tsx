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

describe("Top Tabs Layout", () => {
  let setup: TestRendererSetup | undefined;

  afterEach(() => {
    if (setup && !setup.renderer.isDestroyed) {
      setup.renderer.destroy();
    }
  });

  test("lists About, Skills, Projects, and Contact with About active", async () => {
    setup = await testRender(<App />, TERMINAL);
    const frame = await setup.waitForFrame((f) => f.includes("who I am"));
    expect(frame).toContain("About");
    expect(frame).toContain("Skills");
    expect(frame).toContain("Projects");
    expect(frame).toContain("Contact");
    expect(frame).toContain("who I am");
  });

  test("About shows identity highlights from the profile", async () => {
    setup = await testRender(<App />, TERMINAL);
    const frame = await setup.waitForFrame((f) => f.includes("InnoBlock Technology"));
    expect(frame).toContain("Identity");
    expect(frame).toContain("Building software across web");
    expect(frame).toContain("InnoBlock Technology");
    expect(frame).toContain("BSc Computer Science");
    expect(frame).toContain("Royal University of Phnom Penh");
    expect(frame).toContain("2019");
    expect(frame).toContain("2023");
  });

  test("About bullets are plain text with markdown stripped", async () => {
    setup = await testRender(<App />, TERMINAL);
    const frame = await setup.waitForFrame((f) => f.includes("Software Developer working across"));
    expect(frame).toContain("Software Developer working across");
    expect(frame).toContain("Vue.js, Nuxt.js, TypeScript");
    expect(frame).toContain("turning ideas into");
    expect(frame).not.toContain("**");
  });

  test("number keys 1-4 jump to the corresponding tab", async () => {
    setup = await testRender(<App />, TERMINAL);
    await setup.waitForFrame((f) => f.includes("who I am"));

    setup.mockInput.pressKey("2");
    let frame = await setup.waitForFrame((f) => f.includes("stack"));
    expect(frame).toContain("stack");
    expect(frame).not.toContain("who I am");
    expect(frame).not.toContain("InnoBlock Technology");

    setup.mockInput.pressKey("3");
    frame = await setup.waitForFrame((f) => f.includes("work") && !f.includes("who I am"));
    expect(frame).not.toContain("stack");
    expect(frame).not.toContain("links");
    expect(frame).not.toContain("InnoBlock Technology");

    setup.mockInput.pressKey("4");
    frame = await setup.waitForFrame((f) => f.includes("links"));
    expect(frame).toContain("links");
    expect(frame).not.toContain("who I am");
    expect(frame).not.toContain("InnoBlock Technology");

    setup.mockInput.pressKey("1");
    frame = await setup.waitForFrame((f) => f.includes("who I am"));
    expect(frame).toContain("who I am");
    expect(frame).toContain("InnoBlock Technology");
  });

  test("Left and Right arrows cycle tabs, wrapping at the ends", async () => {
    setup = await testRender(<App />, TERMINAL);
    await setup.waitForFrame((f) => f.includes("who I am"));

    setup.mockInput.pressArrow("left");
    let frame = await setup.waitForFrame((f) => f.includes("links"));
    expect(frame).toContain("links");
    expect(frame).not.toContain("who I am");
    expect(frame).not.toContain("InnoBlock Technology");

    setup.mockInput.pressArrow("right");
    frame = await setup.waitForFrame((f) => f.includes("who I am"));
    expect(frame).toContain("who I am");
    expect(frame).toContain("InnoBlock Technology");

    setup.mockInput.pressArrow("right");
    frame = await setup.waitForFrame((f) => f.includes("stack"));
    expect(frame).not.toContain("who I am");
    expect(frame).not.toContain("InnoBlock Technology");
  });
});

describe("Skills tab", () => {
  let setup: TestRendererSetup | undefined;

  afterEach(() => {
    if (setup && !setup.renderer.isDestroyed) {
      setup.renderer.destroy();
    }
  });

  test("shows tech-stack group headings", async () => {
    setup = await testRender(<App />, TERMINAL);
    await setup.waitForFrame((f) => f.includes("who I am"));
    setup.mockInput.pressKey("2");
    const frame = await setup.waitForFrame((f) => f.includes("Frontend"));
    expect(frame).toContain("Frontend");
    expect(frame).toContain("Backend");
    expect(frame).toContain("Database");
    expect(frame).toContain("Tools");
    expect(frame).toContain("Mobile");
  });

  test("lists every tech-stack entry from the profile", async () => {
    setup = await testRender(<App />, TERMINAL);
    await setup.waitForFrame((f) => f.includes("who I am"));
    setup.mockInput.pressKey("2");
    const frame = await setup.waitForFrame((f) => f.includes("Frontend") && f.includes("GSAP"));
    expect(frame).toContain("Vue.js");
    expect(frame).toContain("Nuxt.js");
    expect(frame).toContain("React");
    expect(frame).toContain("TypeScript");
    expect(frame).toContain("Tailwind CSS");
    expect(frame).toContain("GSAP");
    expect(frame).toContain("Node.js");
    expect(frame).toContain("Bun");
    expect(frame).toContain("Spring Boot");
    expect(frame).toContain("NestJS");
    expect(frame).toContain("FastAPI");
    expect(frame).toContain("Directus");
    expect(frame).toContain("PostgreSQL");
    expect(frame).toContain("SQL Server");
    expect(frame).toContain("MongoDB");
    expect(frame).toContain("Vite");
    expect(frame).toContain("Docker");
    expect(frame).toContain("Git");
    expect(frame).toContain("Kotlin");
    expect(frame).toContain("Flutter");
  });
});

describe("Projects tab", () => {
  let setup: TestRendererSetup | undefined;

  afterEach(() => {
    if (setup && !setup.renderer.isDestroyed) {
      setup.renderer.destroy();
    }
  });

  test("lists projects and shows the selected repo and live URLs", async () => {
    setup = await testRender(<App />, TERMINAL);
    await setup.waitForFrame((f) => f.includes("who I am"));
    setup.mockInput.pressKey("3");
    const frame = await setup.waitForFrame((f) => f.includes("Movies"));
    expect(frame).toContain("Movies");
    expect(frame).toContain("Helpdesk");
    expect(frame).toContain("The Angkor Times");
    expect(frame).toContain("movies.sethyrung.com");
    expect(frame).toContain("enter opens live");
    expect(frame).not.toContain("Asset Management Backend");
    expect(frame).not.toContain("Chongkran Backend");
    expect(frame).not.toContain("EasyPay Backend");
  });

  test("Down moves the project selection", async () => {
    setup = await testRender(<App />, TERMINAL);
    await setup.waitForFrame((f) => f.includes("who I am"));
    setup.mockInput.pressKey("3");
    await setup.waitForFrame((f) => f.includes("enter opens live"));
    setup.mockInput.pressArrow("down");
    const frame = await setup.waitForFrame((f) => f.includes("live —"));
    expect(frame).toContain("Helpdesk");
    expect(frame).toContain("live —");
    expect(frame).not.toContain("movies.sethyrung.com");
  });

  test("Enter opens live when it exists, otherwise the repo", async () => {
    const opened: string[] = [];
    setup = await testRender(<App openUrl={(url) => opened.push(url)} />, TERMINAL);
    await setup.waitForFrame((f) => f.includes("who I am"));
    setup.mockInput.pressKey("3");
    await setup.waitForFrame((f) => f.includes("Movies"));
    setup.mockInput.pressEnter();
    expect(opened).toEqual(["https://movies.sethyrung.com"]);

    setup.mockInput.pressArrow("down");
    await setup.waitForFrame((f) => f.includes("live —"));
    setup.mockInput.pressEnter();
    expect(opened).toEqual([
      "https://movies.sethyrung.com",
      "https://github.com/SethyRung/helpdesk",
    ]);
  });

  test("Tab chooses repo instead of live before Enter", async () => {
    const opened: string[] = [];
    setup = await testRender(<App openUrl={(url) => opened.push(url)} />, TERMINAL);
    await setup.waitForFrame((f) => f.includes("who I am"));
    setup.mockInput.pressKey("3");
    await setup.waitForFrame((f) => f.includes("enter opens live"));
    setup.mockInput.pressTab();
    await setup.waitForFrame((f) => f.includes("enter opens repo"));
    setup.mockInput.pressEnter();
    expect(opened).toEqual(["https://github.com/SethyRung/movies"]);
  });
});
