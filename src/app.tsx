import { useState } from "react";
import { useKeyboard, useRenderer } from "@opentui/react";
import { profile } from "./config/profile.ts";
import { AboutTab } from "./tabs/about.tsx";
import { TabBar, TABS } from "./tabs/bar.tsx";
import { ContactTab } from "./tabs/contact.tsx";
import { ProjectsTab } from "./tabs/projects.tsx";
import { SkillsTab } from "./tabs/skills.tsx";
import { theme } from "./theme.ts";

const HINT = "1-4 tabs · ←/→ cycle · ↑/↓ select · enter open · q/esc quit";

export function App({ openUrl }: { openUrl?: (url: string) => void } = {}) {
  const renderer = useRenderer();
  const [tab, setTab] = useState(0);

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
    if (key.name === "tab") {
      key.preventDefault();
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
      backgroundColor="transparent"
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
      <TabBar tab={tab} />
      <box key={tab} flexGrow={1} marginTop={1}>
        {tab === 0 ? (
          <AboutTab />
        ) : tab === 1 ? (
          <SkillsTab />
        ) : tab === 2 ? (
          <ProjectsTab openUrl={openUrl} />
        ) : tab === 3 ? (
          <ContactTab openUrl={openUrl} />
        ) : null}
      </box>
    </box>
  );
}
