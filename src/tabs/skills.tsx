import {
  TECH_CATEGORIES,
  profile,
  type TechCategory,
  type TechStackEntry,
} from "../config/profile.ts";
import { theme } from "../theme.ts";

const CATEGORY_ACCENT: Record<TechCategory, string> = {
  Frontend: theme.mauve,
  Backend: theme.green,
  Database: theme.blue,
  Tools: theme.peach,
  Mobile: theme.teal,
};

function skillsByCategory(entries: readonly TechStackEntry[]) {
  return TECH_CATEGORIES.map((category) => ({
    category,
    accent: CATEGORY_ACCENT[category],
    items: entries.filter((entry) => entry.category === category).map((entry) => entry.title),
  }));
}

export function SkillsTab() {
  return (
    <box flexDirection="row" flexWrap="wrap" gap={1} flexGrow={1}>
      {skillsByCategory(profile.techStack).map((group) => (
        <box
          key={group.category}
          border
          borderStyle="rounded"
          borderColor={group.accent}
          title={` ${group.category} `}
          titleColor={group.accent}
          padding={1}
          width="32%"
          backgroundColor="transparent"
        >
          {group.items.map((item) => (
            <text key={item} fg={group.accent}>
              {item}
            </text>
          ))}
        </box>
      ))}
    </box>
  );
}
