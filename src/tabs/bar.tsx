import { theme } from "../theme.ts";

export const TABS = [
  { name: "About", description: "who I am", value: 0 },
  { name: "Skills", description: "stack", value: 1 },
  { name: "Projects", description: "work", value: 2 },
  { name: "Contact", description: "links", value: 3 },
] as const;

export function TabBar({ tab }: { tab: number }) {
  const activeTab = TABS[tab] ?? TABS[0];

  return (
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
  );
}
