import { useState } from "react";
import { useKeyboard, useRenderer } from "@opentui/react";
import { profile } from "./config/profile.ts";
import { theme } from "./theme.ts";

const HINT = "1-4 tabs · ←/→ cycle · ↑/↓ select · enter open · q/esc quit";

function aboutBullets(markdown: string): string[] {
  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).replaceAll("**", ""));
}

const TABS = [
  { name: "About", description: "who I am", value: 0 },
  { name: "Skills", description: "stack", value: 1 },
  { name: "Projects", description: "work", value: 2 },
  { name: "Contact", description: "links", value: 3 },
] as const;

export function App() {
  const renderer = useRenderer();
  const [tab, setTab] = useState(0);
  const activeTab = TABS[tab] ?? TABS[0];

  useKeyboard((key) => {
    if (renderer.isDestroyed) {
      return;
    }
    if (key.name === "q" || key.name === "escape") {
      renderer.destroy();
      return;
    }
    if (key.name === "left") {
      setTab((current) => (current + TABS.length - 1) % TABS.length);
      return;
    }
    if (key.name === "right") {
      setTab((current) => (current + 1) % TABS.length);
      return;
    }
    if (key.name >= "1" && key.name <= "4") {
      setTab(Number(key.name) - 1);
    }
  });

  return (
    <box
      flexDirection="column"
      flexGrow={1}
      backgroundColor={theme.base}
      border
      borderStyle="rounded"
      borderColor={theme.mauve}
      title=" @sethyrung/portfolio "
      titleColor={theme.mauve}
      bottomTitle={` ${HINT} `}
      bottomTitleAlignment="left"
      padding={1}
    >
      <box flexDirection="row" alignItems="flex-end" gap={2}>
        <ascii-font font="tiny" text={profile.displayName} color={theme.mauve} />
        <box flexDirection="column" flexGrow={1} justifyContent="flex-end">
          <text fg={theme.teal}>{profile.taglines.join(" / ")}</text>
          <text fg={theme.subtext}>{profile.location}</text>
        </box>
      </box>
      <box marginTop={1} flexDirection="column">
        <box flexDirection="row">
          {TABS.map((item, index) => {
            const active = index === tab;
            return (
              <box key={item.name} width={18}>
                <text fg={active ? theme.mauve : theme.subtext}> {item.name}</text>
                <text fg={theme.mauve}>{active ? ` ${"━".repeat(item.name.length)}` : " "}</text>
              </box>
            );
          })}
        </box>
        <text fg={theme.blue}> {activeTab.description}</text>
      </box>
      <box key={tab} flexGrow={1} marginTop={1}>
        {tab === 0 ? (
          <box flexDirection="row" gap={1} flexGrow={1}>
            <box
              flexGrow={1}
              border
              borderStyle="rounded"
              borderColor={theme.blue}
              title=" Identity "
              titleColor={theme.blue}
              padding={1}
              backgroundColor={theme.mantle}
            >
              <text fg={theme.text}>{profile.bio}</text>
              <text />
              <text fg={theme.peach}>{profile.jobTitle}</text>
              <text fg={theme.subtext}>{profile.employer}</text>
              <text fg={theme.subtext}>{profile.location}</text>
              <text />
              <text fg={theme.green}>{profile.education.degree}</text>
              <text fg={theme.subtext}>{profile.education.school}</text>
              <text fg={theme.subtext}>{profile.education.years}</text>
            </box>
            <box
              flexGrow={2}
              border
              borderStyle="rounded"
              borderColor={theme.teal}
              title=" About "
              titleColor={theme.teal}
              padding={1}
              backgroundColor={theme.mantle}
            >
              {aboutBullets(profile.about).map((bullet) => (
                <text key={bullet} fg={theme.text}>
                  • {bullet}
                </text>
              ))}
            </box>
          </box>
        ) : null}
      </box>
    </box>
  );
}
