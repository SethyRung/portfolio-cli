import { useKeyboard, useRenderer } from "@opentui/react";
import { profile } from "./config/profile.ts";
import { theme } from "./theme.ts";

const HINT = "1-4 tabs · ←/→ cycle · ↑/↓ select · enter open · q/esc quit";

export function App() {
  const renderer = useRenderer();

  useKeyboard((key) => {
    if (renderer.isDestroyed) {
      return;
    }
    if (key.name === "q" || key.name === "escape") {
      renderer.destroy();
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
      <box flexGrow={1} />
    </box>
  );
}
